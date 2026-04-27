import type { Metadata } from "next";
import { OZZY_CONTACT_EMAIL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "About",
  description: "About Ozzy Fox — tattoo philosophy, studio standards, and what to expect.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto min-w-0 max-w-3xl px-3 py-12 sm:px-4 sm:py-16">
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--pink)]">Artist</p>
      <h1 className="break-words font-[family-name:var(--font-syne)] text-3xl font-bold min-[400px]:text-4xl sm:text-5xl">
        Ozzy Fox
      </h1>
      <div className="mt-8 space-y-4 text-sm leading-relaxed text-white/90">
        <p>
          Ozzy builds tattoos with a cyber-luxe edge: bold composition, obsessive line quality, and healed-first thinking
          so your piece stays strong for years.
        </p>
        <p>
          This site is built to respect your time — clear booking, transparent deposit policy, and an AI concierge for
          the questions that don’t need to wait on DMs.
        </p>
        <p className="text-muted">
          Replace this copy with Ozzy’s real bio, awards, guest spots, and studio location when you’re ready.
        </p>
        <p>
          Bookings and questions:{" "}
          <a className="text-[var(--pink)] underline-offset-4 hover:underline" href={`mailto:${OZZY_CONTACT_EMAIL}`}>
            {OZZY_CONTACT_EMAIL}
          </a>
        </p>
      </div>
    </div>
  );
}
