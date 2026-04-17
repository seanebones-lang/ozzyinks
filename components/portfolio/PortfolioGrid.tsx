"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { PORTFOLIO_ITEMS, type PortfolioItem } from "@/lib/portfolio-data";
import { cn } from "@/lib/utils";

const styles = Array.from(new Set(PORTFOLIO_ITEMS.map((i) => i.style)));

export function PortfolioGrid() {
  const [filter, setFilter] = useState<string>("All");
  const [lightbox, setLightbox] = useState<PortfolioItem | null>(null);

  const items = useMemo(() => {
    if (filter === "All") return PORTFOLIO_ITEMS;
    return PORTFOLIO_ITEMS.filter((i) => i.style === filter);
  }, [filter]);

  return (
    <div className="min-w-0 space-y-6 sm:space-y-8">
      <div className="-mx-1 flex max-w-full gap-2 overflow-x-auto overscroll-x-contain px-1 pb-1 [-ms-overflow-style:none] [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0 [&::-webkit-scrollbar]:hidden">
        <FilterChip active={filter === "All"} onClick={() => setFilter("All")}>
          All
        </FilterChip>
        {styles.map((s) => (
          <FilterChip key={s} active={filter === s} onClick={() => setFilter(s)}>
            {s}
          </FilterChip>
        ))}
      </div>
      <div className="grid grid-cols-1 gap-4 min-[480px]:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setLightbox(item)}
            className="group relative overflow-hidden rounded-2xl border border-white/10 bg-panel text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--pink)]"
          >
            <div className="card-ink-frame relative aspect-[4/5]">
              <Image
                src={item.src}
                alt={item.title}
                fill
                className="object-cover transition duration-700 ease-out group-hover:scale-110"
                sizes="(max-width:480px) 100vw, (max-width:1024px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-90 transition duration-500 group-hover:opacity-100" />
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--pink)]/12 via-transparent to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />
              <div className="absolute bottom-0 left-0 right-0 space-y-1 p-4">
                <p className="font-[family-name:var(--font-syne)] text-lg font-semibold text-white transition group-hover:text-white">
                  {item.title}
                </p>
                <p className="text-xs text-muted">
                  {item.style} · {item.placement} · {item.healed ? "Healed" : "Fresh"}
                </p>
              </div>
            </div>
          </button>
        ))}
      </div>
      {lightbox ? (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-3 pt-[max(0.75rem,env(safe-area-inset-top))] pb-[max(0.75rem,env(safe-area-inset-bottom))] pl-[max(0.75rem,env(safe-area-inset-left))] pr-[max(0.75rem,env(safe-area-inset-right))] backdrop-blur-sm sm:p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Portfolio preview"
          onClick={() => setLightbox(null)}
        >
          <div
            className="relative max-h-[min(92dvh,calc(100svh-1.5rem))] w-full max-w-4xl overflow-hidden rounded-2xl border border-white/15 bg-panel"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-[4/3] w-full">
              <Image src={lightbox.src} alt={lightbox.title} fill className="object-contain bg-black" sizes="100vw" />
            </div>
            <div className="border-t border-white/10 p-3 sm:p-4">
              <p className="break-words font-[family-name:var(--font-syne)] text-lg font-semibold sm:text-xl">
                {lightbox.title}
              </p>
              <p className="mt-1 text-sm text-muted">
                {lightbox.style} · {lightbox.placement} · {lightbox.healed ? "Healed" : "Fresh"}
              </p>
            </div>
            <button
              type="button"
              className="absolute right-2 top-2 flex min-h-11 min-w-11 items-center justify-center rounded-full border border-white/25 bg-black/70 px-3 text-sm text-white sm:right-3 sm:top-3"
              onClick={() => setLightbox(null)}
            >
              Close
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function FilterChip({ children, active, onClick }: { children: React.ReactNode; active: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "shrink-0 rounded-full border px-4 py-2.5 text-xs font-semibold uppercase tracking-wide transition min-[480px]:py-1.5",
        active
          ? "border-[var(--pink)] bg-[var(--pink)]/15 text-[var(--pink)]"
          : "border-white/15 text-muted hover:border-white/30 hover:text-white",
      )}
    >
      {children}
    </button>
  );
}
