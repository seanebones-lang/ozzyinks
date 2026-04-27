import { Resend } from "resend";
import { OZZY_CONTACT_EMAIL } from "@/lib/constants";
import type { BookingRecord } from "@/types/booking";

function notifyTo(): string {
  return process.env.CONTACT_NOTIFY_EMAIL?.trim() || OZZY_CONTACT_EMAIL;
}

function fromAddress(): string {
  return (
    process.env.RESEND_FROM_EMAIL?.trim() || `Ozzy Fox site <onboarding@resend.dev>`
  );
}

function getResend(): Resend | null {
  const key = process.env.RESEND_API_KEY?.trim();
  if (!key) return null;
  return new Resend(key);
}

function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function sendBookingSubmittedEmail(record: BookingRecord): Promise<boolean> {
  const resend = getResend();
  const subject = `[Ozzy site] New booking ${record.id}`;
  const lines = [
    `Booking ID: ${record.id}`,
    `Name: ${record.fullName}`,
    `Email: ${record.email}`,
    `Phone: ${record.phone}`,
    "",
    `Concept: ${record.concept}`,
    `Placement: ${record.placement}`,
    `Size: ${record.estimatedSize}`,
    `Style: ${record.styleDirection}`,
    `Budget: ${record.budgetRange}`,
    `Timeline: ${record.timeline}`,
    `Availability: ${record.availability}`,
    record.notes ? `\nNotes:\n${record.notes}` : "",
    record.referenceUrls?.length
      ? `\nReferences:\n${record.referenceUrls.join("\n")}`
      : "",
  ];
  const text = lines.filter(Boolean).join("\n");
  const html = `<pre style="font-family:system-ui,sans-serif;white-space:pre-wrap">${esc(text)}</pre>`;

  if (!resend) {
    console.warn("[notify-email] RESEND_API_KEY missing; booking not emailed:", record.id);
    return false;
  }

  const { error } = await resend.emails.send({
    from: fromAddress(),
    to: [notifyTo()],
    subject,
    text,
    html,
  });
  if (error) {
    console.error("[notify-email] booking send failed:", error);
    return false;
  }
  return true;
}

export async function sendArtistLeadEmail(data: {
  name: string;
  email: string;
  studioOrCity: string;
  message?: string;
}): Promise<boolean> {
  const resend = getResend();
  const subject = `[Ozzy site] Artist site inquiry — ${data.name}`;
  const text = [
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    `Studio or city: ${data.studioOrCity}`,
    data.message ? `\nMessage:\n${data.message}` : "",
  ].join("\n");
  const html = `<pre style="font-family:system-ui,sans-serif;white-space:pre-wrap">${esc(text)}</pre>`;

  if (!resend) {
    console.warn("[notify-email] RESEND_API_KEY missing; artist lead not emailed:", data);
    return false;
  }

  const { error } = await resend.emails.send({
    from: fromAddress(),
    to: [notifyTo()],
    subject,
    text,
    html,
  });
  if (error) {
    console.error("[notify-email] artist lead send failed:", error);
    return false;
  }
  return true;
}

export async function sendDepositPaidEmail(booking: BookingRecord): Promise<boolean> {
  const resend = getResend();
  const subject = `[Ozzy site] Deposit paid — ${booking.id}`;
  const text = [
    `Booking ID: ${booking.id}`,
    `Name: ${booking.fullName}`,
    `Email: ${booking.email}`,
    `Phone: ${booking.phone}`,
    "",
    `Concept (summary): ${booking.concept.slice(0, 200)}${booking.concept.length > 200 ? "…" : ""}`,
  ].join("\n");
  const html = `<pre style="font-family:system-ui,sans-serif;white-space:pre-wrap">${esc(text)}</pre>`;

  if (!resend) {
    console.warn("[notify-email] RESEND_API_KEY missing; deposit alert not emailed:", booking.id);
    return false;
  }

  const { error } = await resend.emails.send({
    from: fromAddress(),
    to: [notifyTo()],
    subject,
    text,
    html,
  });
  if (error) {
    console.error("[notify-email] deposit send failed:", error);
    return false;
  }
  return true;
}
