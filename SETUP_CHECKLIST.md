# Ozzy Inks — setup checklist

Work through this when you are ready to connect Sanity, email, and production.

## Sanity CMS

1. Create or open a project at [sanity.io/manage](https://www.sanity.io/manage).
2. Copy **Project ID** and **Dataset** (usually `production`).
3. Add to `.env.local` (and your host, e.g. Vercel):
   - `NEXT_PUBLIC_SANITY_PROJECT_ID`
   - `NEXT_PUBLIC_SANITY_DATASET`
4. In Sanity **API → CORS origins**, add `http://localhost:3000` and your **production site URL**.
5. **Published Studio (recommended for clients):** **https://ozzinks.sanity.studio** — share this link; redeploy after schema changes with `npm run studio:deploy`.  
   **Optional:** embedded **`/studio`** on your Next.js site when Vercel is working.
6. Re-upload portfolio images into Sanity. Files in `/public` are not synced automatically.

## Sanity → Next.js cache (webhooks)

7. Generate a long random string for **`SANITY_REVALIDATE_SECRET`**; set it in `.env.local` and production env.
8. In Sanity **API → Webhooks**, create a webhook:
   - **URL:** `https://YOUR_PRODUCTION_DOMAIN/api/revalidate/sanity`
   - **Method:** POST
   - **Secret:** same value as `SANITY_REVALIDATE_SECRET`
   - Enable the document operations you want (create / update / delete).

## Email (Resend → Ozzy)

9. Sign up at [resend.com](https://resend.com) and create an **API key** → `RESEND_API_KEY`.
10. Verify a **sending domain** and set **`RESEND_FROM_EMAIL`** (e.g. `Ozzy Fox <bookings@yourdomain.com>`). It must match a verified sender/domain in Resend.
11. Confirm the **recipient** inbox: the site defaults to **Ozzyfox444@gmail.com** in code. Optional override: **`CONTACT_NOTIFY_EMAIL`**.
12. Deploy environment variables and redeploy, then test:
    - **Book** form submission
    - **Deposit** flow (if Stripe is live), for the deposit-paid email
    - **Artist lead** form (homepage strip)

## Site / deploy

13. Set **`NEXT_PUBLIC_SITE_URL`** to your real URL (metadata / Open Graph).
14. After deploy, smoke-test **`/studio`**, **`/portfolio`**, **`/journal`**, **`/schedule`**, **`/artwork`**, **`/book`**, and the footer email link.

## Optional

15. Update any internal docs that still mention `BOOKING_RECIPIENT_EMAIL`; notifications use Resend and **`CONTACT_NOTIFY_EMAIL`** (optional) plus **`OZZY_CONTACT_EMAIL`** in `lib/constants.ts`.

## Reference: `.env.example`

See the repo root **`.env.example`** for all variable names, including Stripe, Redis, xAI, and analytics.
