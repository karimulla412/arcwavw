import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/audit";
import { isRazorpayConfigured, verifySignature } from "@/lib/razorpay";

export const runtime = "nodejs";

/**
 * Verify a payment.
 *
 * — When Razorpay keys are configured, this expects the Razorpay checkout.js
 *   response: { paymentId, razorpay_payment_id, razorpay_order_id,
 *   razorpay_signature }. The signature is verified with HMAC SHA256 using
 *   the Key Secret. Only verified payments are marked "success".
 * — When keys are NOT configured, this falls back to MOCK mode: any
 *   { paymentId } is auto-verified (the original dev behaviour).
 *
 * After a successful verification, the rest of the carry-forward / membership
 * activation logic from the original implementation runs unchanged.
 */
export async function POST(req: NextRequest) {
  try {
    const b = (await req.json()) as {
      paymentId?: string;
      // Razorpay checkout.js response fields:
      razorpay_payment_id?: string;
      razorpay_order_id?: string;
      razorpay_signature?: string;
      // Mock-mode legacy field:
      gatewayTxnId?: string;
    };
    if (!b.paymentId) {
      return NextResponse.json({ error: "paymentId is required" }, { status: 400 });
    }

    const existing = await db.payment.findUnique({ where: { id: b.paymentId } });
    if (!existing) {
      return NextResponse.json({ error: "Payment not found" }, { status: 404 });
    }

    // ----- Razorpay signature verification -----
    if (isRazorpayConfigured() && existing.gateway === "razorpay") {
      const ok = verifySignature({
        orderId: b.razorpay_order_id ?? existing.gatewayTxnId,
        paymentId: b.razorpay_payment_id,
        signature: b.razorpay_signature,
      });
      if (!ok) {
        // Mark the payment as failed and bail.
        await db.payment.update({
          where: { id: existing.id },
          data: { status: "failed" },
        });
        return NextResponse.json(
          { error: "Payment signature verification failed" },
          { status: 400 }
        );
      }
    }

    const invoiceUrl = `/invoices/${existing.id}`;

    let newMembershipId: string | null = null;
    let carryForwardApplied = 0;

    const gatewayTxnId =
      b.razorpay_payment_id ||
      b.gatewayTxnId ||
      existing.gatewayTxnId ||
      `mock_${Date.now()}`;

    const payment = await db.payment.update({
      where: { id: existing.id },
      data: {
        status: "success",
        gatewayTxnId,
        invoiceUrl,
      },
    });

    // If this paid for a membership, activate it.
    if (payment.membershipId) {
      const m = await db.membership.findUnique({ where: { id: payment.membershipId } });
      if (m && m.status !== "active") {
        await db.membership.update({
          where: { id: m.id },
          data: { status: "active" },
        });
      }
      newMembershipId = payment.membershipId;
    } else if (payment.planId) {
      // No existing membership — create one from the plan.
      const plan = await db.pricingPlan.findUnique({ where: { id: payment.planId } });
      if (plan && plan.type === "membership") {
        const start = new Date();
        const end = new Date(start);
        end.setMonth(end.getMonth() + plan.durationMonths);

        // ----- Carry-forward candidate lookup -----
        const todayISO = start.toISOString().slice(0, 10);
        const thirtyDaysAgo = new Date(start);
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        const thirtyDaysAgoISO = thirtyDaysAgo.toISOString().slice(0, 10);
        const thirtyDaysAhead = new Date(start);
        thirtyDaysAhead.setDate(thirtyDaysAhead.getDate() + 30);
        const thirtyDaysAheadISO = thirtyDaysAhead.toISOString().slice(0, 10);

        const previousCandidates = await db.membership.findMany({
          where: {
            OR: [
              { userId: payment.userId || undefined },
              { phone: payment.customerPhone || undefined },
            ],
            status: { in: ["active", "expired"] },
            endDate: { gte: thirtyDaysAgoISO, lte: thirtyDaysAheadISO },
          },
          orderBy: { createdAt: "desc" },
        });

        let carryForwardCount = 0;
        let previousMembershipId: string | null = null;
        if (previousCandidates.length > 0) {
          const prev = previousCandidates[0];
          const unused = Math.max(
            0,
            prev.totalClasses + prev.bonusClasses - prev.usedClasses
          );
          const maxAllowed = plan.carryForward || 0;
          carryForwardCount = maxAllowed > 0 ? Math.min(unused, maxAllowed) : 0;
          if (carryForwardCount > 0) {
            previousMembershipId = prev.id;
          }
        }

        // ----- Duplicate guard -----
        const blockingExisting = await db.membership.findFirst({
          where: {
            OR: [
              { userId: payment.userId || undefined },
              { phone: payment.customerPhone || undefined },
            ],
            planId: plan.id,
            status: "active",
            endDate: { gt: thirtyDaysAheadISO },
          },
        });

        if (blockingExisting) {
          newMembershipId = blockingExisting.id;
        } else {
          const newTotalClasses = plan.totalClasses + carryForwardCount;
          const notes =
            carryForwardCount > 0
              ? `Carried forward ${carryForwardCount} sessions from previous membership${previousMembershipId ? ` (id: ${previousMembershipId})` : ""}`
              : null;

          const created = await db.membership.create({
            data: {
              name: payment.customerName,
              phone: payment.customerPhone,
              email: payment.customerEmail || null,
              userId: payment.userId || null,
              planId: plan.id,
              planName: plan.name,
              startDate: todayISO,
              endDate: end.toISOString().slice(0, 10),
              classesPerWeek: plan.classesPerWeek,
              totalClasses: newTotalClasses,
              usedClasses: 0,
              bonusClasses: plan.bonusClasses,
              carryForward: plan.carryForward,
              notes,
              status: "active",
              lockedDates: "[]",
            },
          });

          await db.payment.update({
            where: { id: payment.id },
            data: { membershipId: created.id },
          });
          newMembershipId = created.id;
          carryForwardApplied = carryForwardCount;

          if (previousMembershipId && previousMembershipId !== created.id) {
            try {
              await db.membership.update({
                where: { id: previousMembershipId },
                data: { status: "expired" },
              });
            } catch {
              // best-effort — never block the renewal on this update
            }
          }
        }
      }
    }

    // In-app notification log for the buyer.
    try {
      const note =
        carryForwardApplied > 0
          ? `Your payment of ₹${payment.amount} has been received. ${carryForwardApplied} session(s) carried forward from your previous membership. Invoice: ${invoiceUrl}`
          : `Your payment of ₹${payment.amount} has been received. Invoice: ${invoiceUrl}`;
      await db.notificationLog.create({
        data: {
          userId: payment.userId || null,
          channel: "in-app",
          type: "payment_success",
          recipient: payment.customerEmail || payment.customerPhone,
          subject: "Payment successful",
          message: note,
          status: "sent",
        },
      });
    } catch {
      // best-effort
    }

    return NextResponse.json({
      ok: true,
      payment,
      membershipId: newMembershipId,
      carryForward: carryForwardApplied,
    });
  } catch (e: any) {
    return NextResponse.json(
      { error: e.message || "Server error" },
      { status: 500 }
    );
  }
}
