import { NextResponse } from "next/server";
import { z } from "zod";
import { DEPOSIT_AMOUNT_CENTS } from "@/lib/constants";
import { getBooking, updateBookingStatus } from "@/lib/booking-repository";
import { getStripe } from "@/lib/stripe";

const bodySchema = z.object({
  bookingId: z.string().min(6),
  email: z.string().email().optional(),
});

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const parsed = bodySchema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, code: "VALIDATION_ERROR", message: "Invalid payload", fields: {} },
        { status: 400 },
      );
    }

    const { bookingId, email } = parsed.data;
    const booking = await getBooking(bookingId);
    if (!booking) {
      return NextResponse.json(
        { ok: false, code: "BOOKING_NOT_FOUND", message: "Booking not found" },
        { status: 404 },
      );
    }

    const stripe = getStripe();
    const site = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      customer_email: email || booking.email,
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "Tattoo session deposit — Ozzy Fox",
              description: `Non-refundable $100 deposit for booking ${bookingId}. Applied to final session total.`,
            },
            unit_amount: DEPOSIT_AMOUNT_CENTS,
          },
          quantity: 1,
        },
      ],
      success_url: `${site}/book/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${site}/book?canceled=1`,
      metadata: {
        bookingId,
        type: "tattoo_deposit",
      },
    });

    await updateBookingStatus(bookingId, "deposit_pending");

    return NextResponse.json({
      ok: true,
      checkoutUrl: session.url,
      sessionId: session.id,
    });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Deposit error";
    if (message.includes("STRIPE_SECRET_KEY")) {
      return NextResponse.json(
        { ok: false, code: "STRIPE_NOT_CONFIGURED", message: "Payments are not configured" },
        { status: 503 },
      );
    }
    return NextResponse.json({ ok: false, code: "SERVER_ERROR", message }, { status: 500 });
  }
}
