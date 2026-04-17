import type { Metadata } from "next";
import Link from "next/link";
import { DepositSuccessTracker } from "./success-tracker";

export const metadata: Metadata = {
  title: "Deposit complete",
  description: "Thank you — your deposit was received.",
};

type Props = { searchParams: Promise<{ session_id?: string }> };

export default async function BookSuccessPage({ searchParams }: Props) {
  const sp = await searchParams;
  const sessionId = sp.session_id;
  return (
    <div className="mx-auto min-w-0 max-w-lg px-3 py-16 text-center sm:px-4 sm:py-24">
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--pink)]">Stripe</p>
      <h1 className="mt-2 break-words font-[family-name:var(--font-syne)] text-2xl font-bold min-[400px]:text-3xl">
        Thank you
      </h1>
      <p className="mt-4 text-sm text-muted">
        Your deposit payment was submitted. Ozzy will follow up with scheduling and prep details.
      </p>
      {sessionId ? <DepositSuccessTracker /> : null}
      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
        <Link
          href="/"
          className="inline-flex min-h-11 items-center justify-center rounded-full border border-white/15 px-6 py-2.5 text-sm font-medium text-white hover:border-[var(--pink)]"
        >
          Back home
        </Link>
        <Link
          href="/portfolio"
          className="inline-flex min-h-11 items-center justify-center rounded-full bg-[var(--pink)] px-6 py-2.5 text-sm font-medium text-black hover:brightness-110"
        >
          View portfolio
        </Link>
      </div>
    </div>
  );
}
