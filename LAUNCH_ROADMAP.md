# Launch roadmap — production-ready Ozzyinks

This document is the **ordered path** from “code in GitHub” to **real bookings, deposits, and concierge** in production, plus **hosting choices** and **rough cost expectations**. Dollar amounts are **estimates** (US, 2026); vendor pricing changes—verify on each provider’s site before budgeting.

---

## Suggested hosting stack

| Layer | Recommendation | Why |
|--------|----------------|-----|
| **App (Next.js)** | [Vercel](https://vercel.com) | Native Next.js integration, preview URLs, env vars, serverless API routes already match this repo. |
| **Booking storage** | [Upstash Redis](https://upstash.com) | REST Redis works from Vercel functions without connection-pool pain; **required** so `bookingId` survives across instances (in-memory `Map` breaks on serverless). |
| **Payments** | [Stripe](https://stripe.com) | Checkout + webhooks; already integrated (`/api/deposit`, `/api/stripe/webhook`). |
| **AI concierge** | [xAI](https://x.ai) | Grok API; already integrated (`XAI_API_KEY`, `/api/ai/voice-chat`). |
| **Email to artist** (not wired in code yet) | [Resend](https://resend.com) or similar | Send on new booking / deposit; `.env.example` has `BOOKING_RECIPIENT_EMAIL` placeholder only. |
| **Domain** | Registrar + Vercel DNS | Point apex/`www` to Vercel; set `NEXT_PUBLIC_SITE_URL` to canonical HTTPS URL. |

Alternatives: **Netlify** or **Cloudflare Workers** can host Next.js with adapters, but this project is optimized for **Vercel + Route Handlers** with minimal migration work.

---

## Estimated costs (ongoing)

| Item | Ballpark | Notes |
|------|-----------|--------|
| **Vercel Hobby** | **$0**/mo | Personal/hobby; check [current limits](https://vercel.com/pricing). Commercial studio sites often use **Pro ~$20/mo**/seat for team features, analytics, and higher limits. |
| **Upstash Redis** | **$0–10+**/mo | Free tier often enough for low traffic; scales with commands/storage. |
| **Stripe** | **Per transaction** | US cards commonly **2.9% + $0.30** per successful charge (see Stripe pricing); **no monthly fee** for standard Checkout. |
| **xAI (Grok)** | **Usage-based** | Depends on model and tokens; budget **$5–50+/mo** for light concierge traffic, more if heavy voice + long threads—monitor in xAI dashboard. |
| **Resend (optional)** | **$0–20**/mo | Free tier for low email volume; paid for higher sends. |
| **Domain** | **~$10–20/yr** | Registrar-dependent. |

**One-time / rare:** Stripe may have payout schedules; no large upfront for this stack beyond domain registration.

---

## Phase 0 — Repository and access

1. Ensure Git remote points at the canonical GitHub repo (`origin`).
2. Grant deploy access: Vercel GitHub app installed on the org/user that owns the repo.
3. Decide who owns Stripe, xAI, and Upstash accounts (studio vs agency).

**Done when:** `main` builds on Vercel (or local `npm run build` passes).

---

## Phase 1 — Deploy the app (no secrets yet)

1. Import the GitHub repo in Vercel; framework **Next.js**; root = repo root.
2. First deploy can use placeholder envs; fix build if any env is required at build time (this app generally builds without secrets).
3. Set **`NEXT_PUBLIC_SITE_URL`** to the **production** URL (e.g. `https://www.ozzyinks.com`). Used for Stripe success/cancel URLs.

**Done when:** Home, portfolio, book, and policies pages load over HTTPS on the preview or production URL.

---

## Phase 2 — Booking persistence (critical for serverless)

1. Create an **Upstash** Redis database (same region as Vercel if possible).
2. In Vercel project settings, add:
   - `UPSTASH_REDIS_REST_URL`
   - `UPSTASH_REDIS_REST_TOKEN`
3. Redeploy.

**Why:** Without Redis, bookings live in process memory and **deposit checkout can 404** (`BOOKING_NOT_FOUND`) when another serverless instance handles `/api/deposit`.

**Done when:** Submit booking on production → pay deposit (test mode) → same `bookingId` resolves in logs/webhook.

---

## Phase 3 — Stripe (deposits + webhook)

1. Create/use a **Stripe** account; get **secret key** (test then live).
2. Vercel env: `STRIPE_SECRET_KEY`.
3. Implement webhook endpoint in Stripe Dashboard:  
   `https://<your-domain>/api/stripe/webhook`  
   Event: **`checkout.session.completed`** (matches [`app/api/stripe/webhook/route.ts`](./app/api/stripe/webhook/route.ts)).
4. Copy signing secret → Vercel env: `STRIPE_WEBHOOK_SECRET`.
5. Test mode: use [test cards](https://stripe.com/docs/testing); confirm redirect to `/book/success` and webhook marks booking **`deposit_paid`** (check Upstash key or server logs).
6. Switch to **live** keys and live webhook when ready for real money.

**Done when:** Real or test $100 Checkout completes and webhook returns 200; booking status updates.

---

## Phase 4 — xAI (Fox Concierge)

1. Obtain **xAI API key**; set `XAI_API_KEY` in Vercel (server-only, never `NEXT_PUBLIC_`).
2. Optional: `XAI_MODEL` (default in code is `grok-4`; alternatives like `grok-4.20` per xAI docs).
3. Smoke-test `/` chat: text replies; voice depends on browser **Web Speech API** (no extra backend for recognition—only Grok calls hit your API).

**Done when:** Concierge answers without 500s; tune copy/system prompt in code if needed.

---

## Phase 5 — Artist actually receives bookings (recommended)

Today, successful `POST /api/booking` **logs** server-side; **`BOOKING_RECIPIENT_EMAIL` is not implemented** in code.

1. Choose provider (e.g. Resend).
2. Add server-side send after `saveBooking` in [`app/api/booking/route.ts`](./app/api/booking/route.ts) (and optionally on `deposit_paid` via webhook).
3. Document data retention in `/policies` to match the mail provider.

**Done when:** Ozzy (or inbox) receives an email per submission with fields + `bookingId`.

---

## Phase 6 — Hardening and launch QA

1. Walk through [QA_LAUNCH.md](./QA_LAUNCH.md) on the **production** URL.
2. Plan **rate limits** for `/api/booking` and `/api/ai/voice-chat` if exposed to abuse (Vercel Firewall, middleware, or Upstash rate limit—see QA doc).
3. Set **`NEXT_PUBLIC_GA_MEASUREMENT_ID`** if using GA (optional).
4. Legal: confirm `/policies` with local counsel for Texas/studio reality.

**Done when:** Checklist signed off and domain is the public URL.

---

## Quick env reference

See [`.env.example`](./.env.example). Minimum for **full happy path** in production:

- `NEXT_PUBLIC_SITE_URL`
- `UPSTASH_REDIS_REST_URL` + `UPSTASH_REDIS_REST_TOKEN`
- `STRIPE_SECRET_KEY` + `STRIPE_WEBHOOK_SECRET`
- `XAI_API_KEY` (for concierge)

Optional: `NEXT_PUBLIC_GA_MEASUREMENT_ID`, future email integration variables.

---

## Support docs

- [BUILD_GUIDE.md](./BUILD_GUIDE.md) — product and engineering context  
- [QA_LAUNCH.md](./QA_LAUNCH.md) — pre-launch QA checklist  
