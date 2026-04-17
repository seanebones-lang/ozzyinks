import type { Metadata } from "next";
import Link from "next/link";
import { BookingIntakeForm } from "@/components/booking/BookingIntakeForm";

export const metadata: Metadata = {
  title: "Book",
  description: "Submit a tattoo project request and pay a $100 deposit after approval.",
};

type Props = { searchParams: Promise<{ canceled?: string }> };

export default async function BookPage({ searchParams }: Props) {
  const sp = await searchParams;
  const canceled = sp.canceled === "1";
  return (
    <div className="mx-auto min-w-0 max-w-3xl px-3 py-12 sm:px-4 sm:py-16">
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--pink)]">Booking</p>
      <h1 className="break-words font-[family-name:var(--font-syne)] text-3xl font-bold min-[400px]:text-4xl sm:text-5xl">
        Start your tattoo project
      </h1>
      <p className="mt-3 text-sm leading-relaxed text-muted">
        Tell Ozzy about your idea and we’ll review your request within 1–2 business days. Approved projects receive a
        secure deposit link to lock the session. Read{" "}
        <Link href="/policies" className="text-[var(--pink)] underline-offset-4 hover:underline">
          policies
        </Link>{" "}
        before you submit.
      </p>
      {canceled ? (
        <p className="mt-4 rounded-xl border border-amber-500/40 bg-amber-500/10 px-4 py-3 text-sm text-amber-100">
          Checkout was canceled — you can retry the deposit anytime from this page after your request is submitted.
        </p>
      ) : null}
      <div className="mt-8 glass-panel rounded-3xl p-4 sm:mt-10 sm:p-6 md:p-8">
        <BookingIntakeForm />
      </div>
    </div>
  );
}
