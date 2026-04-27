import { NextResponse } from "next/server";
import { saveBooking } from "@/lib/booking-repository";
import { sendBookingSubmittedEmail } from "@/lib/notify-email";
import type { BookingRecord } from "@/types/booking";
import { bookingSchema } from "@/lib/validation/booking";

function makeId() {
  return `bk_${crypto.randomUUID().replace(/-/g, "").slice(0, 16)}`;
}

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const parsed = bookingSchema.safeParse(json);

    if (!parsed.success) {
      const fields: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        const path = issue.path.join(".") || "form";
        fields[path] = issue.message;
      }
      return NextResponse.json(
        { ok: false, code: "VALIDATION_ERROR", message: "Invalid payload", fields },
        { status: 400 },
      );
    }

    const data = parsed.data;

    const id = makeId();
    const record: BookingRecord = {
      id,
      status: "submitted",
      createdAt: new Date().toISOString(),
      fullName: data.fullName,
      email: data.email,
      phone: data.phone,
      concept: data.concept,
      placement: data.placement,
      estimatedSize: data.estimatedSize,
      styleDirection: data.styleDirection,
      budgetRange: data.budgetRange,
      timeline: data.timeline,
      availability: data.availability,
      notes: data.notes,
      referenceUrls: data.referenceUrls,
    };

    await saveBooking(record);

    console.info("[booking]", JSON.stringify({ id, email: record.email, concept: record.concept.slice(0, 80) }));

    const emailed = await sendBookingSubmittedEmail(record);

    return NextResponse.json({
      ok: true,
      bookingId: id,
      status: "submitted" satisfies BookingRecord["status"],
      notifyEmailSent: emailed,
    });
  } catch {
    return NextResponse.json(
      { ok: false, code: "SERVER_ERROR", message: "Could not submit booking" },
      { status: 500 },
    );
  }
}
