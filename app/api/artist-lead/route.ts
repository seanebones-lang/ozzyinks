import { NextResponse } from "next/server";
import { z } from "zod";
import { sendArtistLeadEmail } from "@/lib/notify-email";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  studioOrCity: z.string().min(2),
  message: z.string().max(2000).optional(),
});

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const parsed = schema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json({ ok: false, code: "VALIDATION_ERROR", message: "Invalid payload" }, { status: 400 });
    }
    console.info("[artist-lead]", JSON.stringify(parsed.data));
    const emailed = await sendArtistLeadEmail(parsed.data);
    if (!emailed && !process.env.RESEND_API_KEY?.trim()) {
      return NextResponse.json(
        {
          ok: false,
          code: "EMAIL_NOT_CONFIGURED",
          message: "Email delivery is not configured on the server.",
        },
        { status: 503 },
      );
    }
    if (!emailed) {
      return NextResponse.json({ ok: false, code: "EMAIL_SEND_FAILED", message: "Could not send message." }, { status: 502 });
    }
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, code: "SERVER_ERROR" }, { status: 500 });
  }
}
