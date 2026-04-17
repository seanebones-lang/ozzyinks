# Ozzyinks — Ozzy Fox cyber-luxe artist site

Next.js 16 (App Router) + Tailwind CSS + Stripe + xAI (Grok) concierge.

## Scripts

```bash
npm run dev    # local dev
npm run build  # production build
npm run start  # serve production
npm run lint   # ESLint
```

## Environment

Copy [`.env.example`](./.env.example) to `.env.local` and fill values for your deployment.

- **xAI:** `XAI_API_KEY`, optional `XAI_MODEL` (default `grok-2-latest`)
- **Stripe:** `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` (publishable key for future client-side Stripe.js if needed)
- **Site URL:** `NEXT_PUBLIC_SITE_URL` (canonical, used in Stripe success/cancel URLs)
- **Optional persistence:** `UPSTASH_REDIS_REST_URL` + `UPSTASH_REDIS_REST_TOKEN` so booking records survive across serverless invocations and deposit webhooks can resolve `bookingId`

## Features

- Portfolio gallery with filters + lightbox
- Multi-step booking form with Zod validation + honeypot
- `$100` USD Stripe Checkout deposit (`/api/deposit` + webhook)
- Fox Concierge chat (text + browser speech recognition) via `/api/ai/voice-chat`
- Social links (Facebook + Instagram) and Nexteleven attribution in footer + chat panel
- Nexteleven showcase strip + artist lead form (`/api/artist-lead`)

## Docs

- [LAUNCH_ROADMAP.md](./LAUNCH_ROADMAP.md) — phased rollout, hosting, and estimated costs
- [BUILD_GUIDE.md](./BUILD_GUIDE.md) — full product + engineering spec
- [QA_LAUNCH.md](./QA_LAUNCH.md) — pre-launch QA checklist

## Attribution

- Site footer: **Made by Nexteleven** → [nextelevenstudios.online](https://nextelevenstudios.online)
- Chat panel: **Powered by Nexteleven** → same URL
