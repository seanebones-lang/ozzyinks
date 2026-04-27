import { revalidatePath } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";

/**
 * Sanity → API → Webhooks: point your deployment URL here with POST,
 * secret = SANITY_REVALIDATE_SECRET, and enable create/update/delete.
 */
export async function POST(req: NextRequest) {
  try {
    const secret = process.env.SANITY_REVALIDATE_SECRET?.trim();
    if (!secret) {
      return NextResponse.json({ message: "SANITY_REVALIDATE_SECRET not configured" }, { status: 503 });
    }

    const { isValidSignature, body } = await parseBody(req, secret, true);

    if (!isValidSignature) {
      return NextResponse.json({ message: "Invalid signature" }, { status: 401 });
    }

    revalidatePath("/", "layout");

    const docType =
      body && typeof body === "object" && "_type" in body ? String((body as { _type: unknown })._type) : null;

    return NextResponse.json({ revalidated: true, documentType: docType, at: Date.now() });
  } catch (e) {
    console.error("[sanity revalidate]", e);
    return NextResponse.json({ message: "Webhook handler error" }, { status: 500 });
  }
}
