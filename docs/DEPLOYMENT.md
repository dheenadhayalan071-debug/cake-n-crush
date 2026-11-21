# Deployment — Vercel

The repository is deployment-ready. Nothing below has been executed on Vercel from this
environment, so no deployment is claimed as verified.

---

## 1. One-time setup

```bash
npm install
npm run verify     # audit → 146 tests → production build
```

Then push to GitHub and, in Vercel:

1. **Add New → Project → Import** the repository.
2. Framework preset: **Vite** (auto-detected).
3. Build command: `npm run build` · Output: `dist` · Install: `npm install`.
   (`vercel.json` already declares these, plus the SPA rewrite.)
4. **Environment variables →** add:

   | Key | Value | Environments |
   | --- | ----- | ------------ |
   | `VITE_SITE_URL` | `https://your-domain.com` (no trailing slash) | Production, Preview |

   Omitting it builds against the documented placeholder `https://cakencrush.example.com`.
5. **Deploy.**

`npm run build` automatically runs, in order:

- `scripts/build-images.mjs` — regenerates responsive WebP + the image manifest,
- `scripts/build-seo.mjs` — writes `sitemap.xml` and `robots.txt` for `VITE_SITE_URL`,
- `vite build` — emits `dist/`.

Because images and the SEO files are generated during the build, a fresh clone deploys
correctly without committing any build output.

## 2. Routing & headers (`vercel.json`)

- SPA rewrite: everything except real files (`/assets/*`, `/fonts/*`, `robots.txt`,
  `sitemap.xml`, favicon) falls back to `index.html`, so `/menu`, `/custom-cakes`, … work on
  refresh and deep links.
- `/assets/*` and `/fonts/*` → `Cache-Control: public, max-age=31536000, immutable`.
- Global `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`,
  `X-Frame-Options: SAMEORIGIN`.

## 3. Domain

1. Buy the domain (e.g. `cakencrush.in`).
2. Vercel → **Settings → Domains → Add**, follow the DNS instructions (`A`/`CNAME`).
3. Verify HTTPS is issued (automatic).
4. Set `VITE_SITE_URL` to the final URL, then **Redeploy** so canonical URLs, OG tags,
   `sitemap.xml` and `robots.txt` all switch from the placeholder.
5. Confirm `https://your-domain.com/sitemap.xml` and `/robots.txt` show the real domain.

## 4. Pre-launch checklist

- [ ] `npm run verify` passes locally (audit, 146 tests, build).
- [ ] `VITE_SITE_URL` set in Vercel and the deployment redeployed after setting it.
- [ ] Real domain resolves over HTTPS; `www` → apex (or vice versa) redirects once.
- [ ] Click-to-call works from a real phone (`tel:+918838159344`).
- [ ] WhatsApp link opens a chat with the pre-filled message on a real device.
- [ ] Send one custom-cake enquiry end to end and confirm the bakery receives it.
- [ ] Google Maps directions open at the correct address.
- [ ] Owner has approved every price (see [`OWNER-APPROVAL.md`](OWNER-APPROVAL.md)).
- [ ] Logo and product photography replaced, or the illustrative labels accepted.
- [ ] Opening hours / Swiggy / Zomato / social URLs added if available (or left pending).
- [ ] Sitemap submitted in Google Search Console; six URLs indexed.
- [ ] Lighthouse run on mobile for `/` and `/menu` (see QA report for what to expect).
- [ ] 404 route checked on the live domain.
- [ ] Optional: enable Vercel Analytics or Search Console monitoring.

## 5. Post-launch (first month)

- Replace placeholder imagery with real photography — the single biggest improvement to
  conversion and image search.
- Add verified reviews to `src/data/testimonials.js`.
- Review the WhatsApp enquiries received and adjust the custom-cake form fields to match
  what the bakery actually needs to quote.

## 6. Rollback

Vercel keeps every deployment immutable. **Deployments → previous build → Promote to
Production** reverts instantly; no database or state to restore.

## 7. Alternative hosts

The output in `dist/` is static. Netlify, Cloudflare Pages or GitHub Pages work with a
single rewrite rule (`/* → /index.html`) — only the sitemap/robots URL and canonical base
need the equivalent `VITE_SITE_URL` set at build time.
