import Link from "next/link";
import { SOCIAL } from "@/lib/constants";
import { NextelevenSignature } from "@/components/branding/NextelevenSignature";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-white/10 bg-black/40 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl min-w-0 flex-col gap-8 px-3 py-10 sm:flex-row sm:items-start sm:justify-between sm:px-4 sm:py-12">
        <div className="min-w-0 space-y-3">
          <p className="font-[family-name:var(--font-syne)] text-lg font-semibold tracking-tight text-white">
            Ozzy Fox
          </p>
          <p className="max-w-sm text-sm text-muted">Cyber-luxe tattoo art. Bookings, deposits, and custom work.</p>
          <div className="flex flex-col gap-1 text-sm min-[480px]:flex-row min-[480px]:flex-wrap min-[480px]:gap-x-6 min-[480px]:gap-y-2">
            <a
              href={SOCIAL.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="min-h-11 py-2 text-muted transition hover:text-accent min-[480px]:min-h-0 min-[480px]:py-0"
            >
              Instagram
            </a>
            <a
              href={SOCIAL.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="min-h-11 py-2 text-muted transition hover:text-accent min-[480px]:min-h-0 min-[480px]:py-0"
            >
              Facebook
            </a>
            <Link
              href="/policies"
              className="min-h-11 py-2 text-muted transition hover:text-accent min-[480px]:min-h-0 min-[480px]:py-0"
            >
              Policies
            </Link>
            <Link href="/faq" className="min-h-11 py-2 text-muted transition hover:text-accent min-[480px]:min-h-0 min-[480px]:py-0">
              FAQ
            </Link>
          </div>
        </div>
        <div className="flex min-w-0 flex-col gap-3 text-sm text-muted">
          <Link href="/book" className="min-h-11 py-2 text-white transition hover:text-accent sm:min-h-0 sm:py-0">
            Book + deposit
          </Link>
          <NextelevenSignature variant="footer" />
          <p className="text-xs text-muted/80">High-performance websites for artists.</p>
        </div>
      </div>
    </footer>
  );
}
