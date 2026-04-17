import Link from "next/link";

export function StickyBookCta() {
  return (
    <Link
      href="/book"
      className="fixed z-[85] inline-flex min-h-11 items-center rounded-full border border-white/15 bg-black/70 px-5 py-2.5 text-xs font-semibold uppercase tracking-wide text-white shadow-lg backdrop-blur-md transition hover:border-[var(--pink)]/60 hover:text-[var(--pink)] active:scale-[0.98]"
      style={{
        bottom: "max(1.25rem, env(safe-area-inset-bottom, 0px))",
        left: "max(1.25rem, env(safe-area-inset-left, 0px))",
      }}
    >
      Book
    </Link>
  );
}
