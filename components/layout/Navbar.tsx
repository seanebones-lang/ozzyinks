"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { trackEvent } from "@/lib/analytics";

/** Desktop + mobile: every Sanity-managed section plus site pages (matches Studio desk order after Home). */
const navLinks = [
  { href: "/", label: "Home" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/artwork", label: "Available custom artwork" },
  { href: "/journal", label: "Journal" },
  { href: "/schedule#guest-spots", label: "Guest spots" },
  { href: "/book#immediate-openings", label: "Immediate openings" },
  { href: "/schedule#special-events", label: "Special events" },
  { href: "/book", label: "Book" },
  { href: "/about", label: "About" },
  { href: "/faq", label: "FAQ" },
] as const;

function isActiveRoute(pathname: string, href: string) {
  const base = href.split("#")[0] || href;
  if (base === "/") return pathname === "/";
  return pathname === base || pathname.startsWith(`${base}/`);
}

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#050508]/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center gap-2 px-3 py-2 sm:gap-3 sm:px-4 md:min-h-16 md:gap-4">
        <Link
          href="/"
          className="inline-flex shrink-0 items-center py-2 font-[family-name:var(--font-syne)] text-base font-bold tracking-tight text-white sm:text-lg"
        >
          Ozzy<span className="text-[var(--pink)]">.</span>Fox
        </Link>

        {/* Desktop/tablet: full nav, horizontal scroll on narrow widths */}
        <nav
          className="isolate hidden min-w-0 min-h-11 flex-1 items-center md:flex"
          aria-label="Primary"
        >
          <div
            className={cn(
              "flex max-w-full flex-nowrap items-center gap-x-3 gap-y-2 overflow-x-auto overscroll-x-contain py-1 pl-1 pr-2 [scrollbar-width:thin]",
              "[&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-white/15 [&::-webkit-scrollbar-track]:bg-transparent",
            )}
          >
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={cn(
                  "shrink-0 whitespace-nowrap px-2 py-1.5 text-xs font-medium transition hover:text-[var(--pink)] lg:text-sm",
                  isActiveRoute(pathname, l.href) ? "text-[var(--pink)]" : "text-muted",
                )}
              >
                {l.label}
              </Link>
            ))}
          </div>
        </nav>

        <div className="ml-auto flex shrink-0 items-center gap-2">
          <Button
            type="button"
            size="sm"
            className="hidden md:inline-flex"
            onClick={() => {
              trackEvent("hero_cta_click");
              router.push("/book");
            }}
          >
            Book + deposit
          </Button>
          <button
            type="button"
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg border border-white/15 p-2 text-white md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open ? (
        <div className="max-h-[min(78dvh,calc(100dvh-3.5rem))] overflow-y-auto overscroll-y-contain border-t border-white/10 bg-[#050508]/95 px-4 py-4 md:hidden">
          <p className="mb-3 px-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-muted">Site &amp; Sanity content</p>
          <div className="flex flex-col gap-0.5">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "min-h-11 rounded-lg px-2 py-2.5 text-sm font-medium transition active:bg-white/5",
                  isActiveRoute(pathname, l.href) ? "text-[var(--pink)]" : "text-white/90",
                )}
              >
                {l.label}
              </Link>
            ))}
            <Button
              type="button"
              className="mt-3 w-full"
              onClick={() => {
                setOpen(false);
                trackEvent("hero_cta_click");
                router.push("/book");
              }}
            >
              Book + deposit
            </Button>
          </div>
        </div>
      ) : null}
    </header>
  );
}
