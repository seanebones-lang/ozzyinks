# Sanity Studio — link for your client

## Primary link (published on Sanity — use this)

**https://ozzinks.sanity.studio**

This is the hosted Studio (works on phone and desktop). Invite your client in [Sanity Manage](https://www.sanity.io/manage) so they can sign in.

---

## Optional: embedded Studio on your site

Your Next.js app also serves Studio at **`/studio`** when the site is deployed:

```text
https://YOUR_DOMAIN/studio
```

Example: **https://ozzinks.com/studio** (only works if that deployment is live and routing is correct).

Local dev: `http://localhost:3000/studio`

---

## Give the client access

1. Open [sanity.io/manage](https://www.sanity.io/manage) and select this project (**na90lju6**).
2. Go to **Project settings** (or **Team / Invites**, depending on UI).
3. **Invite** the client’s email with role **Editor** (enough to edit content) or **Administrator** if they should manage the project too.
4. They open **https://ozzinks.sanity.studio**, sign in with that email, and use **Vision** in the sidebar only if you want them running GROQ queries (optional).

---

## Redeploy Studio after schema changes

From the repo root (with `NEXT_PUBLIC_SANITY_*` set, e.g. in `.env.local`):

```bash
npm run studio:deploy
```

Or: `npx sanity deploy -y --url=ozzinks`
