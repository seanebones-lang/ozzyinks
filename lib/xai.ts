import type { ChatMessage } from "@/types/chat";

const XAI_BASE = "https://api.x.ai/v1";

export const FOX_CONCIERGE_SYSTEM_PROMPT = `You are Fox Concierge, the AI assistant for tattoo artist Ozzy Fox (Ozzyinks).
Tone: confident, friendly, concise, studio-appropriate. 2–5 sentences unless the user asks for more detail.

You can help with: tattoo ideas and direction, placement and sizing guidance at a high level, booking steps, deposit policy explanation, general prep and aftercare basics, and what to expect from the process.

Rules:
- Never promise specific availability or exact dates before Ozzy manually approves a request.
- Never give medical advice or diagnose skin conditions; tell the user to consult a licensed professional.
- Do not invent prices; if asked for exact pricing, explain it depends on size, detail, and time, and offer to guide them to the booking form.
- If the user is ready to book or asks how to book, suggest they use the "Book" page and offer to summarize what info to include.
- Keep answers grounded; if unsure, say Ozzy will confirm directly.

Studio deposit policy for reference: $100 non-refundable deposit applies to approved bookings and goes toward the final session total. Reschedule with at least 48 hours notice when possible.`;

export async function createChatCompletion(messages: ChatMessage[]) {
  const key = process.env.XAI_API_KEY;
  const model = process.env.XAI_MODEL || "grok-4";
  if (!key) {
    throw new Error("XAI_API_KEY is not configured");
  }

  const res = await fetch(`${XAI_BASE}/chat/completions`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      messages: [{ role: "system", content: FOX_CONCIERGE_SYSTEM_PROMPT }, ...messages],
      temperature: 0.7,
      max_tokens: 512,
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`xAI error ${res.status}: ${text.slice(0, 500)}`);
  }

  const data = (await res.json()) as {
    choices?: Array<{ message?: { content?: string } }>;
  };
  const reply = data.choices?.[0]?.message?.content?.trim();
  if (!reply) {
    throw new Error("Empty response from xAI");
  }
  return reply;
}
