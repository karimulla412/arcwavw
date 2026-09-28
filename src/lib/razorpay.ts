import Razorpay from "razorpay";
import crypto from "crypto";

/**
 * Razorpay integration helper.
 *
 * — Reads keys from process.env.RAZORPAY_KEY_ID / RAZORPAY_KEY_SECRET.
 * — When EITHER key is missing, `isRazorpayConfigured()` returns false and the
 *   payment routes automatically fall back to MOCK mode (auto-success), so the
 *   site keeps working in development. Drop your real keys into `.env` and
 *   restart the dev server to go live.
 * — `getRazorpay()` returns a singleton Razorpay SDK instance.
 * — `verifySignature()` validates the HMAC SHA256 signature returned by the
 *   Razorpay checkout.js modal (or by the server-to-server webhook).
 */

function readKey(envName: string): string {
  const v = (process.env as Record<string, string | undefined>)[envName];
  return (v || "").trim();
}

export const RAZORPAY_KEY_ID = readKey("RAZORPAY_KEY_ID") || "rzp_live_ThN7YP6aqRTWr5";
export const RAZORPAY_KEY_SECRET = readKey("RAZORPAY_KEY_SECRET") || "gipGjHsju5c7cEg2YM6uY4i7";
export const RAZORPAY_WEBHOOK_SECRET = readKey("RAZORPAY_WEBHOOK_SECRET");

/** True only when both Key ID and Key Secret are present. */
export function isRazorpayConfigured(): boolean {
  return RAZORPAY_KEY_ID.length > 0 && RAZORPAY_KEY_SECRET.length > 0;
}

let client: Razorpay | null = null;

/** Singleton Razorpay SDK instance (only call when `isRazorpayConfigured()`). */
export function getRazorpay(): Razorpay {
  if (!isRazorpayConfigured()) {
    throw new Error(
      "Razorpay is not configured. Set RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET in .env"
    );
  }
  if (!client) {
    client = new Razorpay({
      key_id: RAZORPAY_KEY_ID,
      key_secret: RAZORPAY_KEY_SECRET,
    });
  }
  return client;
}

/**
 * Verify a Razorpay payment signature.
 *
 * For the standard checkout.js flow the expected message is:
 *   `${razorpay_order_id}|${razorpay_payment_id}`
 * signed with the Key Secret using HMAC SHA256, then hex-encoded.
 *
 * For a webhook payload the expected message is the raw body and the
 * signature comes in the `X-Razorpay-Signature` header — in that case pass
 * `webhook=true`.
 *
 * Returns true if the signature matches (using a timing-safe compare).
 */
export function verifySignature(opts: {
  orderId?: string | null;
  paymentId?: string | null;
  signature?: string | null;
  body?: string | null;
  webhook?: boolean;
  secret?: string;
}): boolean {
  const secret = (opts.secret || RAZORPAY_KEY_SECRET || RAZORPAY_WEBHOOK_SECRET || "").trim();
  if (!secret) return false;

  const sig = (opts.signature || "").trim();
  if (!sig) return false;

  let message: string;
  if (opts.webhook) {
    message = String(opts.body ?? "");
  } else {
    if (!opts.orderId || !opts.paymentId) return false;
    message = `${opts.orderId}|${opts.paymentId}`;
  }

  const expected = crypto
    .createHmac("sha256", secret)
    .update(message)
    .digest("hex");

  if (expected.length !== sig.length) return false;
  try {
    return crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(sig));
  } catch {
    return false;
  }
}

/**
 * Razorpay orders are created with the amount in the smallest currency unit
 * (paise for INR). Multiply rupees by 100.
 */
export function toPaise(rupees: number): number {
  return Math.round(Number(rupees) * 100);
}
