export type ChatMessage = {
  role: "user" | "assistant" | "system";
  content: string;
};

export type ChatAction = "none" | "offer_booking_handoff";
