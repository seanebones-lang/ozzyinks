# Webhooks & production setup (automated portions)

Sanity CMS and site URL vars are aligned for **Production** on Vercel project `ozzyinks`.

## Sanity Studio CORS

These origins allow the embedded API client to talk to Sanity:

- `https://ozzinks.com`
- `https://www.ozzinks.com`
- `http://localhost:3000`
- `https://ozzinks.sanity.studio`
- (legacy) `localhost:3333` if present

(Re-run `npx sanity cors add …` after adding staging domains.)

## Cache revalidation (Sanity → Next.js)

1. In **[sanity.io/manage](https://www.sanity.io/manage)** → Project **na90lju6** → **API** → **Webhooks** → **Create webhook**
2. **URL:** `https://www.ozzinks.com/api/revalidate/sanity`  
   (Use `http://localhost:3000/...` only for manual local testing.)
3. **Dataset:** Production (or whichever you publish to).
4. **Trigger:** Create / Update / Delete for the document types you use.
5. **HTTP:** POST  
6. **Secret:** Paste the exact value saved in **Vercel → ozzyinks → Settings → Environment Variables → `SANITY_REVALIDATE_SECRET`** (Production).  
   Locally you should have the **same** value in `.env.local` (gitignored) if you hit the webhook from dev tunnel tools.

Retrieve without printing to shell history:

```bash
vercel env pull .env.vercel.pull --environment=production --yes
# open file, copy SANITY_REVALIDATE_SECRET, then rm .env.vercel.pull
```

## Stripe, Resend, xAI

These remain **manual**: add keys in Vercel and locally from `.env.example`. Emails stay disabled until **`RESEND_API_KEY`** (+ verified **`RESEND_FROM_EMAIL`**) exist.
