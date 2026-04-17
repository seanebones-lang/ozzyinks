import type { ReactNode } from "react";
import { Cpu, Gauge, Mic2, Sparkles } from "lucide-react";

export function NextelevenCaseStudyStrip() {
  return (
    <section className="relative min-w-0 overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#120612] via-[#08080c] to-[#050508] p-5 sm:p-8 md:p-10">
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/2 bg-[radial-gradient(circle_at_70%_30%,rgba(255,45,166,0.22),transparent_55%)]" />
      <div className="relative grid min-w-0 gap-8 lg:grid-cols-[1.1fr_minmax(0,0.9fr)] lg:items-center">
        <div className="min-w-0 space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--pink)]">Built by Nexteleven</p>
          <h2 className="break-words font-[family-name:var(--font-syne)] text-xl font-bold min-[400px]:text-2xl sm:text-3xl">
            Showcase-grade artist web
          </h2>
          <p className="text-sm text-muted">
            This build demonstrates cinematic UI, conversion-first booking, Stripe deposits, and an xAI voice + text
            concierge — engineered for tattoo studios that want a premium digital presence.
          </p>
          <ul className="grid gap-3 sm:grid-cols-2">
            <CaseBullet icon={<Gauge className="h-4 w-4" />} title="Performance-first" text="Optimized media, sharp motion, and Core Web Vitals discipline." />
            <CaseBullet icon={<Mic2 className="h-4 w-4" />} title="Voice + text AI" text="Natural concierge with booking handoff and guardrails." />
            <CaseBullet icon={<Sparkles className="h-4 w-4" />} title="Conversion UX" text="Portfolio hero, trust stack, and deposit-ready flow." />
            <CaseBullet icon={<Cpu className="h-4 w-4" />} title="Modern stack" text="Next.js 16 App Router on Vercel with typed APIs." />
          </ul>
        </div>
        <div className="glass-panel min-w-0 rounded-2xl p-5 sm:p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-muted">Process</p>
          <ol className="mt-4 space-y-4 text-sm text-white/90">
            <li>
              <span className="font-semibold text-[var(--pink)]">01</span> Brand direction — palette, type, motion language.
            </li>
            <li>
              <span className="font-semibold text-[var(--pink)]">02</span> Conversion architecture — booking, deposits, trust.
            </li>
            <li>
              <span className="font-semibold text-[var(--pink)]">03</span> AI enablement — concierge, analytics, iteration loop.
            </li>
          </ol>
        </div>
      </div>
    </section>
  );
}

function CaseBullet({ icon, title, text }: { icon: ReactNode; title: string; text: string }) {
  return (
    <li className="flex gap-3 rounded-2xl border border-white/10 bg-black/30 p-4">
      <div className="mt-0.5 text-[var(--pink)]">{icon}</div>
      <div className="min-w-0">
        <p className="text-sm font-semibold text-white">{title}</p>
        <p className="mt-1 text-xs text-muted">{text}</p>
      </div>
    </li>
  );
}
