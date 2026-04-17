"use client";

import { Camera, Share2 } from "lucide-react";
import { SOCIAL } from "@/lib/constants";
import { trackEvent } from "@/lib/analytics";

export function SocialWall() {
  return (
    <section className="glass-panel neon-ring relative min-w-0 overflow-hidden rounded-3xl p-5 sm:p-8 md:p-10">
      <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-[var(--pink)]/20 blur-3xl" />
      <div className="relative space-y-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--pink)]">Social</p>
          <h2 className="mt-2 break-words font-[family-name:var(--font-syne)] text-xl font-bold min-[400px]:text-2xl sm:text-3xl">
            Follow the work
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-muted">
            Daily drops, healed shots, and behind-the-scenes process. Tap through — booking still happens on this site
            so nothing gets lost in DMs.
          </p>
        </div>
        <div className="flex flex-col gap-3 min-[520px]:flex-row min-[520px]:flex-wrap">
          <a
            href={SOCIAL.instagram}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent("social_click_instagram")}
            className="inline-flex min-h-[3.25rem] w-full items-center gap-3 rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-medium text-white transition hover:border-[var(--pink)]/60 hover:bg-white/10 min-[520px]:w-auto"
          >
            <Camera className="h-5 w-5 shrink-0 text-[var(--pink)]" aria-hidden />
            <span className="min-w-0">Instagram — @ozzinks</span>
          </a>
          <a
            href={SOCIAL.facebook}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent("social_click_facebook")}
            className="inline-flex min-h-[3.25rem] w-full items-center gap-3 rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-medium text-white transition hover:border-[var(--pink)]/60 hover:bg-white/10 min-[520px]:w-auto"
          >
            <Share2 className="h-5 w-5 shrink-0 text-[var(--pink)]" aria-hidden />
            <span className="min-w-0">Facebook — Ozzy Fox</span>
          </a>
        </div>
      </div>
    </section>
  );
}
