import { NextResponse } from "next/server";
import { bookingSchema } from "@/lib/validation/booking";
import { saveBooking } from "@/lib/booking-repository";
import type { BookingRecord } from "@/types/booking";

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

    // Optional: notify artist (Resend, etc.) — log for ops visibility
    console.info("[booking]", JSON.stringify({ id, email: record.email, concept: record.concept.slice(0, 80) }));

    return NextResponse.json({ ok: true, bookingId: id, status: "submitted" satisfies BookingRecord["status"] });
  } catch {
    return NextResponse.json(
      { ok: false, code: "SERVER_ERROR", message: "Could not submit booking" },
      { status: 500 },
    );
  }
}
