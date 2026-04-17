import type { Metadata } from "next";
import { PortfolioGrid } from "@/components/portfolio/PortfolioGrid";

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Browse Ozzy Fox tattoo portfolio — styles, placements, healed and fresh work.",
};

export default function PortfolioPage() {
  return (
    <div className="mx-auto min-w-0 max-w-6xl px-3 py-12 sm:px-4 sm:py-16">
      <header className="mb-8 max-w-2xl min-w-0 sm:mb-10">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--pink)]">Gallery</p>
        <h1 className="break-words font-[family-name:var(--font-syne)] text-3xl font-bold min-[400px]:text-4xl sm:text-5xl">
          Portfolio
        </h1>
        <p className="mt-3 text-sm text-muted">
          Filter by style, open a piece for a closer look, and bring references when you book.
        </p>
      </header>
      <PortfolioGrid />
    </div>
  );
}
