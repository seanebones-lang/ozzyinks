import { NextResponse } from "next/server";
import { z } from "zod";
import { createChatCompletion } from "@/lib/xai";
import type { ChatAction, ChatMessage } from "@/types/chat";

const messageSchema = z.object({
  role: z.enum(["user", "assistant"]),
  content: z.string().min(1).max(8000),
});

const bodySchema = z.object({
  messages: z.array(messageSchema).max(40),
  transcript: z.string().max(8000).optional(),
});

function inferAction(lastUser: string): ChatAction {
  const t = lastUser.toLowerCase();
  if (
    t.includes("book") ||
    t.includes("deposit") ||
    t.includes("appointment") ||
    t.includes("schedule")
  ) {
    return "offer_booking_handoff";
  }
  return "none";
}

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const parsed = bodySchema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, code: "VALIDATION_ERROR", message: "Invalid payload" },
        { status: 400 },
      );
    }

    if (!process.env.XAI_API_KEY) {
      return NextResponse.json(
        {
          ok: true,
          reply:
            "AI is offline right now — head to the Book page to send your tattoo request, or message Ozzy on Instagram @ozzinks.",
          action: "offer_booking_handoff" as ChatAction,
        },
        { status: 200 },
      );
    }

    const { messages, transcript } = parsed.data;
    const chatMessages: ChatMessage[] = [...messages];
    if (transcript?.trim()) {
      chatMessages.push({ role: "user", content: transcript.trim() });
    }

    const lastUser = [...chatMessages].reverse().find((m) => m.role === "user")?.content ?? "";
    const reply = await createChatCompletion(chatMessages);
    const action = inferAction(lastUser);

    return NextResponse.json({ ok: true, reply, action });
  } catch (e) {
    const message = e instanceof Error ? e.message : "AI error";
    return NextResponse.json({ ok: false, code: "AI_ERROR", message }, { status: 500 });
  }
}
