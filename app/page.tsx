import Link from "next/link";
import { HeroReel } from "@/components/hero/HeroReel";
import { Reveal } from "@/components/motion/Reveal";
import { SocialWall } from "@/components/social/SocialWall";
import { NextelevenCaseStudyStrip } from "@/components/showcase/NextelevenCaseStudyStrip";
import { ArtistLeadCTA } from "@/components/showcase/ArtistLeadCTA";
import { PORTFOLIO_ITEMS } from "@/lib/portfolio-data";
import Image from "next/image";
import { cn } from "@/lib/utils";

const btnOutline =
  "inline-flex min-h-11 items-center justify-center rounded-full border border-white/15 px-6 py-2.5 text-sm font-medium text-white transition hover:border-[var(--pink)] hover:text-[var(--pink)] active:scale-[0.99]";
const btnPrimary =
  "inline-flex min-h-12 w-full items-center justify-center rounded-full bg-[var(--pink)] px-8 py-3.5 text-base font-medium text-black shadow-[0_0_40px_rgba(255,45,166,0.25)] transition hover:brightness-110 active:scale-[0.99] sm:w-auto";

export default function HomePage() {
  const teaser = PORTFOLIO_ITEMS.slice(0, 3);
  return (
    <>
      <HeroReel />
      <Reveal>
        <section className="mx-auto max-w-6xl min-w-0 space-y-8 px-3 py-12 sm:px-4 sm:py-16">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--pink)]">Portfolio</p>
            <h2 className="break-words font-[family-name:var(--font-syne)] text-2xl font-bold min-[400px]:text-3xl sm:text-4xl">
              Selected work
            </h2>
            <p className="mt-2 max-w-xl text-sm text-muted">A taste of the direction — full gallery lives on the portfolio page.</p>
          </div>
          <Link href="/portfolio" className={cn(btnOutline, "min-h-11 w-full justify-center sm:w-auto")}>
            Open portfolio
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-4 min-[520px]:grid-cols-2 md:grid-cols-3">
          {teaser.map((item) => (
            <Link
              key={item.id}
              href="/portfolio"
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-panel"
            >
              <div className="card-ink-frame relative aspect-[4/5]">
                <Image
                  src={item.src}
                  alt={item.title}
                  fill
                  className="object-cover transition duration-700 ease-out group-hover:scale-110"
                  sizes="(max-width:520px) 100vw, (max-width:1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-90 transition group-hover:opacity-100" />
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--pink)]/10 via-transparent to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />
                <p className="absolute bottom-3 left-3 font-[family-name:var(--font-syne)] text-lg font-semibold transition group-hover:text-white">
                  {item.title}
                </p>
              </div>
            </Link>
          ))}
        </div>
        </section>
      </Reveal>
      <Reveal delay={0.06}>
        <section className="mx-auto max-w-6xl min-w-0 px-3 pb-12 sm:px-4 sm:pb-16">
        <div className="glass-panel rounded-3xl p-5 sm:p-8 md:p-10">
          <h2 className="break-words font-[family-name:var(--font-syne)] text-xl font-bold min-[400px]:text-2xl sm:text-3xl">
            How booking works
          </h2>
          <ol className="mt-6 grid gap-4 text-sm text-white/90 sm:grid-cols-2 lg:grid-cols-4">
            <Step n="01" title="Send request" text="Tell us your idea, placement, style, and timeline." />
            <Step n="02" title="Artist review" text="Ozzy reviews fit and creative direction." />
            <Step n="03" title="$100 deposit" text="Approved projects lock with a secure deposit." />
            <Step n="04" title="Session locked" text="You’ll get prep guidance and next steps." />
          </ol>
          <div className="mt-8">
            <Link href="/book" className={cn(btnPrimary)}>
              Start your tattoo project
            </Link>
          </div>
        </div>
        </section>
      </Reveal>
      <Reveal delay={0.1}>
        <section className="mx-auto max-w-6xl min-w-0 space-y-6 px-3 pb-12 sm:px-4 sm:pb-16">
          <SocialWall />
        </section>
      </Reveal>
      <Reveal delay={0.14}>
        <section className="mx-auto max-w-6xl min-w-0 space-y-6 px-3 pb-20 sm:px-4">
          <NextelevenCaseStudyStrip />
          <ArtistLeadCTA />
        </section>
      </Reveal>
    </>
  );
}

function Step({ n, title, text }: { n: string; title: string; text: string }) {
  return (
    <li className="rounded-2xl border border-white/10 bg-black/30 p-4 transition duration-300 hover:-translate-y-0.5 hover:border-[var(--pink)]/25 hover:shadow-[0_12px_40px_rgba(0,0,0,0.35)]">
      <p className="text-xs font-semibold text-[var(--pink)]">{n}</p>
      <p className="mt-2 font-semibold text-white">{title}</p>
      <p className="mt-1 text-xs text-muted">{text}</p>
    </li>
  );
}
