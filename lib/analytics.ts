"use client";

type EventName =
  | "hero_cta_click"
  | "booking_form_started"
  | "booking_form_submitted"
  | "booking_form_validation_error"
  | "deposit_checkout_opened"
  | "deposit_paid_success"
  | "chatbot_opened"
  | "chatbot_message_sent"
  | "chatbot_booking_handoff_clicked"
  | "social_click_facebook"
  | "social_click_instagram"
  | "nexteleven_artist_cta_click"
  | "nexteleven_lead_submitted";

export function trackEvent(name: EventName, props?: Record<string, string | number | boolean>) {
  if (typeof window === "undefined") return;
  const payload = { name, ...props };
  // Vercel Analytics custom events (if supported in runtime)
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const va = (window as any).va;
    if (typeof va === "function") {
      va("event", { name, ...props });
    }
  } catch {
    /* ignore */
  }
  if (process.env.NODE_ENV === "development") {
    console.debug("[analytics]", payload);
  }
}
