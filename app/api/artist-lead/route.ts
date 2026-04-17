import { NextResponse } from "next/server";
import { z } from "zod";

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
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, code: "SERVER_ERROR" }, { status: 500 });
  }
}
