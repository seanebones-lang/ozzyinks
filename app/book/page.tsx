import type { Metadata } from "next";
import Link from "next/link";
import { PrimeCraftBookingEmbed } from "@/components/booking/PrimeCraftBookingEmbed";
import { fetchImmediateOpenings } from "@/lib/sanity/fetch";

export const metadata: Metadata = {
  title: "Book",
  description:
    "Reserve your OzzInks tattoo session through PrimeCraft — secure intake, approval, and checkout in one flow.",
};

export const revalidate = 60;

export default async function BookPage() {
  const openings = await fetchImmediateOpenings();
  return (
    <div className="mx-auto min-w-0 max-w-5xl px-3 py-12 sm:px-4 sm:py-16">
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--pink)]">Booking</p>
      <h1 className="break-words font-[family-name:var(--font-syne)] text-3xl font-bold min-[400px]:text-4xl sm:text-5xl">
        Book your session
      </h1>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
        Complete your request in the secure booking flow below (powered by{" "}
        <a
          href="https://primecraft.mothership-ai.com"
          className="text-[var(--pink)] underline-offset-4 hover:underline"
          rel="noreferrer noopener"
          target="_blank"
        >
          PrimeCraft
        </a>
        ). Review{" "}
        <Link href="/policies" className="text-[var(--pink)] underline-offset-4 hover:underline">
          policies
        </Link>{" "}
        before you continue.
      </p>
      {openings?.length ? (
        <section
          id="immediate-openings"
          className="mt-8 scroll-mt-28 rounded-2xl border border-[var(--pink)]/35 bg-[var(--pink)]/10 p-5 sm:p-6"
          aria-label="Immediate openings"
        >
          <h2 className="font-[family-name:var(--font-syne)] text-lg font-semibold text-white">Immediate openings</h2>
          <ul className="mt-4 space-y-4">
            {openings.map((o) => (
              <li key={o.id} className="border-t border-white/10 pt-4 first:border-t-0 first:pt-0">
                <p className="font-medium text-white">{o.title}</p>
                {o.sessionDate ? <p className="mt-1 text-sm text-[var(--pink)]">{o.sessionDate}</p> : null}
                {o.blurb ? <p className="mt-2 text-sm text-muted">{o.blurb}</p> : null}
              </li>
            ))}
          </ul>
        </section>
      ) : null}
      <PrimeCraftBookingEmbed />
    </div>
  );
}
