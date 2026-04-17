"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";
import { PORTFOLIO_ITEMS } from "@/lib/portfolio-data";
import { Button } from "@/components/ui/Button";
import { trackEvent } from "@/lib/analytics";

export function HeroReel() {
  const router = useRouter();
  const reduce = useReducedMotion();
  const items = PORTFOLIO_ITEMS.slice(0, 4);

  return (
    <section className="relative overflow-hidden border-b border-white/10">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="hero-mesh-blob hero-mesh-blob--a" aria-hidden />
        <div className="hero-mesh-blob hero-mesh-blob--b" aria-hidden />
        <div className="hero-mesh-blob hero-mesh-blob--c" aria-hidden />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,45,166,0.2),transparent_50%)]" />
      </div>
      <div className="mx-auto grid max-w-6xl min-w-0 gap-8 px-3 py-12 sm:gap-10 sm:px-4 sm:py-16 lg:grid-cols-2 lg:items-center lg:py-24">
        <div className="relative z-10 min-w-0 space-y-5 sm:space-y-6">
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="hero-eyebrow-glow text-xs font-semibold uppercase tracking-[0.35em] text-[var(--pink)]"
          >
            Ozzyinks · Cyber-luxe
          </motion.p>
          <motion.h1
            initial={reduce ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.05 }}
            className="break-words font-[family-name:var(--font-syne)] text-3xl font-bold leading-[1.08] tracking-tight min-[400px]:text-4xl sm:text-5xl lg:text-6xl"
          >
            <span className="text-gradient-animated">Ink that hits different.</span>
          </motion.h1>
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="max-w-xl text-base leading-relaxed text-muted sm:text-lg"
          >
            Custom tattooing and original artwork by Ozzy Fox—a second-generation artist who grew up in the shop. Her
            father, Troy &ldquo;Rabbit&rdquo; Fox, is remembered as a legend across the Dallas–Fort Worth tattoo
            community.
            Appointments and consultations are available. All tattoo bookings require a $100 non-refundable deposit to
            secure your session.
          </motion.p>
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.15 }}
            className="flex flex-wrap gap-3 [&>button]:min-w-0 [&>button]:flex-1 min-[480px]:[&>button]:flex-none"
          >
            <Button
              type="button"
              size="lg"
              onClick={() => {
                trackEvent("hero_cta_click");
                router.push("/book");
              }}
            >
              Start your project
            </Button>
            <Button type="button" size="lg" variant="outline" onClick={() => router.push("/portfolio")}>
              View portfolio
            </Button>
          </motion.div>
        </div>
        <motion.div
          initial={reduce ? false : { opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative z-10 grid min-w-0 grid-cols-2 gap-2 sm:gap-3"
        >
          {items.map((item, i) => (
            <motion.div
              key={item.id}
              whileHover={reduce ? undefined : { scale: 1.03, y: -4 }}
              whileTap={reduce ? undefined : { scale: 0.99 }}
              transition={{ type: "spring", stiffness: 280, damping: 22 }}
              className={`group ${cnFrame(i)}`}
            >
              <div className="card-ink-frame relative aspect-[4/5] overflow-hidden rounded-2xl border border-white/10 bg-panel">
                <Image
                  src={item.src}
                  alt={item.title}
                  fill
                  className="object-cover transition duration-700 ease-out group-hover:scale-110"
                  sizes="(max-width:640px) 45vw, (max-width:1024px) 25vw, 20vw"
                  priority={i < 2}
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent opacity-90 transition group-hover:opacity-100" />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[var(--pink)]/10 via-transparent to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />
                <p className="absolute bottom-3 left-3 right-3 text-xs font-medium text-white/90 transition group-hover:text-white">
                  {item.title}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function cnFrame(i: number) {
  // Subtle stagger on large screens only; small viewports stay flush to avoid overflow.
  if (i === 0) return "origin-bottom-right";
  if (i === 1) return "origin-bottom-left max-lg:translate-y-0 lg:translate-y-6";
  if (i === 2) return "origin-top-right max-lg:translate-y-0 lg:-translate-y-4";
  return "origin-top-left max-lg:translate-y-0 lg:translate-y-2";
}
