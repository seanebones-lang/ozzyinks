"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { trackEvent } from "@/lib/analytics";

const links = [
  { href: "/", label: "Home" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/book", label: "Book" },
  { href: "/about", label: "About" },
  { href: "/faq", label: "FAQ" },
];

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#050508]/80 backdrop-blur-xl">
      <div className="mx-auto flex h-14 min-h-14 max-w-6xl items-center justify-between gap-2 px-3 sm:h-16 sm:min-h-16 sm:gap-4 sm:px-4">
        <Link
          href="/"
          className="min-w-0 shrink truncate font-[family-name:var(--font-syne)] text-base font-bold tracking-tight text-white sm:text-lg"
        >
          Ozzy<span className="text-[var(--pink)]">.</span>Fox
        </Link>
        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={cn(
                "text-sm font-medium transition hover:text-[var(--pink)]",
                pathname === l.href ? "text-[var(--pink)]" : "text-muted",
              )}
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="hidden md:block">
          <Button
            type="button"
            size="sm"
            onClick={() => {
              trackEvent("hero_cta_click");
              router.push("/book");
            }}
          >
            Book + deposit
          </Button>
        </div>
        <button
          type="button"
          className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg border border-white/15 p-2 text-white md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      {open ? (
        <div className="max-h-[min(70dvh,calc(100dvh-3.5rem))] overflow-y-auto overscroll-y-contain border-t border-white/10 bg-[#050508]/95 px-4 py-4 md:hidden">
          <div className="flex flex-col gap-1">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="min-h-11 rounded-lg px-2 py-2.5 text-sm font-medium text-white/90 active:bg-white/5"
              >
                {l.label}
              </Link>
            ))}
            <Button
              type="button"
              className="w-full"
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
