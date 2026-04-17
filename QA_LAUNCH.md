# QA & launch checklist — Ozzyinks

Use this before pointing a production domain at Vercel.

## Functional

- [ ] Home hero, portfolio teaser, booking CTA, social wall, Nexteleven sections render
- [ ] `/portfolio` filters + lightbox open/close + keyboard focus returns after close
- [ ] `/book` multi-step form validates required fields and consent checkboxes
- [ ] Honeypot field stays hidden; spam submission rejected if filled
- [ ] Successful booking returns `bookingId` and shows deposit card
- [ ] `/api/deposit` creates Stripe Checkout when `STRIPE_SECRET_KEY` is set
- [ ] Stripe webhook (`/api/stripe/webhook`) verifies signature and marks `deposit_paid` when Redis/memory has booking (set Upstash for production)
- [ ] `/book/success` loads after test payment; analytics event `deposit_paid_success` fires (client)
- [ ] Fox Concierge opens/closes; text messages work; voice capture degrades gracefully if unsupported
- [ ] Footer: **Made by Nexteleven** link works (new tab)
- [ ] Chat footer: **Powered by Nexteleven** link works (new tab)
- [ ] Instagram + Facebook outbound links match canonical URLs

## Accessibility (WCAG-oriented)

- [ ] Tab through nav, mobile menu, forms, chat, lightbox close control
- [ ] Visible focus rings on interactive elements
- [ ] `prefers-reduced-motion`: no disorienting motion (hero/chat)
- [ ] Sufficient contrast for pink accent on black backgrounds

## Performance

- [ ] Lighthouse (mobile) on `/`, `/book`, `/portfolio` — target Performance ≥ 95, A11y ≥ 95 where feasible
- [ ] LCP image priority sane on hero (`priority` on first images only)
- [ ] No blocking console errors on primary flows

## Security

- [ ] No secret keys in client bundles (`XAI_API_KEY`, `STRIPE_SECRET_KEY`, webhook secret server-only)
- [ ] Stripe webhook rejects unsigned payloads
- [ ] Rate limiting planned or enabled at edge for `/api/ai/voice-chat` and `/api/booking` (add if abused)

## Compliance / copy

- [ ] `/policies` matches studio legal requirements (local counsel review)
- [ ] Age + deposit + cancellation acknowledgements match live studio policy
- [ ] Privacy section matches actual data retention and email provider (if added)

## Post-launch (day 1 / 7)

- [ ] Verify analytics events in Vercel / GA (if configured)
- [ ] Review first real inquiries and tune FAQ + Fox Concierge system prompt
- [ ] Capture screenshots + Lighthouse for Nexteleven case study
