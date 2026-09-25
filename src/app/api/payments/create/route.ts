import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/audit";
import { getUserId } from "@/lib/auth";
import {
  getRazorpay,
  isRazorpayConfigured,
  RAZORPAY_KEY_ID,
  toPaise,
} from "@/lib/razorpay";

export const runtime = "nodejs";

/**
 * Create a payment order.
 *
 * — When Razorpay keys are configured in `.env`, a real Razorpay Order is
 *   created and the response includes { orderId, amount, currency, keyId }
 *   so the client can open the Razorpay checkout.js modal.
 * — When keys are NOT configured, it falls back to MOCK mode: just persists
 *   a Payment row with status="pending" and returns { paymentId, amount }.
 *
 * Request body:
 *   { planId?, customerName, customerEmail?, customerPhone, userId?, membershipId?, bookingId?, amount? }
 */
export async function POST(req: NextRequest) {
  try {
    const b = (await req.json()) as {
      planId?: string;
      customerName?: string;
      customerEmail?: string;
      customerPhone?: string;
      userId?: string;
      membershipId?: string;
      bookingId?: string;
      amount?: number;
    };

    const customerName = (b.customerName || "").trim();
    const customerPhone = (b.customerPhone || "").trim();
    if (!customerName || !customerPhone) {
      return NextResponse.json(
        { error: "customerName and customerPhone are required" },
        { status: 400 }
      );
    }

    // Resolve amount — prefer an explicit amount, else fall back to the plan price.
    let amount =
      typeof b.amount === "number" && Number.isFinite(b.amount) ? b.amount : 0;

    if (!amount && b.planId) {
      const plan = await db.pricingPlan.findUnique({ where: { id: b.planId } });
      if (plan) amount = plan.price;
    }

    if (!amount || amount <= 0) {
      return NextResponse.json(
        { error: "Could not determine a valid amount for this payment" },
        { status: 400 }
      );
    }

    // Resolve userId — prefer the explicit field, else the logged-in user cookie.
    let userId = b.userId || null;
    if (!userId) {
      const cookieUserId = await getUserId();
      if (cookieUserId) userId = cookieUserId;
    }

    const currency = "INR";

    // ---------- Razorpay path ----------
    if (isRazorpayConfigured()) {
      const rzp = getRazorpay();
      const order = await rzp.orders.create({
        amount: toPaise(amount),
        currency,
        receipt: `arcwave_${Date.now()}`,
        notes: {
          customerName,
          customerPhone,
          customerEmail: b.customerEmail || "",
          planId: b.planId || "",
          userId: userId || "",
        },
      });

      // Persist a Payment row linked to the Razorpay order id.
      const payment = await db.payment.create({
        data: {
          userId: userId || null,
          membershipId: b.membershipId || null,
          planId: b.planId || null,
          bookingId: b.bookingId || null,
          amount,
          currency,
          status: "pending",
          gateway: "razorpay",
          gatewayTxnId: String(order.id), // razorpay_order_id
          customerName,
          customerEmail: b.customerEmail || null,
          customerPhone,
        },
      });

      return NextResponse.json({
        ok: true,
        mode: "razorpay",
        paymentId: payment.id,
        orderId: order.id,
        amount,
        currency,
        keyId: RAZORPAY_KEY_ID,
      });
    }

    // ---------- Mock fallback (keys not yet configured) ----------
    const payment = await db.payment.create({
      data: {
        userId: userId || null,
        membershipId: b.membershipId || null,
        planId: b.planId || null,
        bookingId: b.bookingId || null,
        amount,
        currency,
        status: "pending",
        gateway: "mock",
        customerName,
        customerEmail: b.customerEmail || null,
        customerPhone,
      },
    });

    return NextResponse.json({ ok: true, mode: "mock", paymentId: payment.id, amount });
  } catch (e: any) {
    return NextResponse.json(
      { error: e.message || "Server error" },
      { status: 500 }
    );
  }
}
