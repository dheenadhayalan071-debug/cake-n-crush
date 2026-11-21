# Cake N Crush — Phase 1 & 2 report

**Production URL:** https://cake-n-crush.vercel.app/
**Branch:** `arena/49011c56-cake-n-crush` (from `cafefd0`, the merge commit of PR #1)
**Date:** 21 November 2026

---

## A. Root cause of the blank production sections

Two independent defects compounded. Neither was a deployment problem — Vercel was
serving the build correctly the whole time.

### A1 — A missing animation provider left every gated element at `opacity: 0`

Every animated component imported the **lazy** Framer primitive:

```js
import { m as motion } from 'framer-motion';
```

`m` ships no feature bundle of its own — it only works inside a `<LazyMotion features={…}>`
provider. `grep -c LazyMotion src/main.jsx` returned **0**: no provider was ever mounted.

A jsdom probe rendered `Reveal` and read the computed style:

```
inline style: "opacity: 0; transform: translateY(28px)"
computed opacity: 0
typeof m === 'function'   → true
Object.keys(m).length     → 0
```

Variants never resolved, so `animate="visible"` never applied and elements sat at their
inline hidden state forever. The header rendered because it was plain CSS with no variant
gating — which is exactly the reported symptom: *header fine, everything else blank.*

### A2 — `whileInView` threw where `IntersectionObserver` was absent

The second probe wrapped the tree in a provider and got:

```
ReferenceError: IntersectionObserver is not defined
```

`whileInView` dereferences the observer directly. In any environment without it (older
WebViews, some in-app browsers, hardened privacy modes) the whole subtree throws during
render, unmounting everything below it.

### A3 — Why the test suite was green

The suite asserted **DOM presence**, never **computed visibility**. A node at
`opacity: 0` passed every assertion in the old tests.

### A4 — What was not the cause

Ruled out by inspection: asset paths and case sensitivity, CSS bundle delivery, Vite
base path, `vercel.json` SPA rewrites, lazy `React.lazy` boundaries, `display: none`,
zero-height sections, `overflow` clipping, and z-index stacking. The JS bundle loaded
(200, correct MIME) — it rendered invisible markup.

### A5 — Fix

- Rewrote the motion layer so animation is **opt-in and gated**:
  `canAnimateNow()` requires a real `IntersectionObserver`; `useAnimationReady()` also
  requires no `prefers-reduced-motion`.
- When animation cannot run, primitives render the plain semantic element with **no
  inline style at all**.
- Added `useVisibilitySafety()`: if an element is on screen 1400 ms after mount and its
  observer never fired, it is forced visible.
- Introduced `src/components/ui/Motion.jsx` as the single legal home for `motion.*`, and
  migrated every raw `motion.div/li/ul/p/h*/figure` (49 call sites across 9 files) behind
  it. The safety net is now installed by the wrapper, so no call site can forget it.

### A6 — Verification method (honest scope)

The real deployment could **not** be inspected from this sandbox:
`curl https://cake-n-crush.vercel.app/` fails with
`OpenSSL SSL_connect: SSL_ERROR_SYSCALL` (status 000) — outbound access to that host is
blocked, and no headless Chromium is installable (the Playwright CDN is unreachable).

So the diagnosis was proven by **jsdom computed-style probing**, and the fix is proven by
a rendered-visibility regression suite plus a production build served and fetched
locally. **No screenshot or Lighthouse audit was performed — do not read this report as
claiming one.**

---

## B. Technical changes

| Area | Change |
| --- | --- |
| `src/lib/motion.js` | Rewritten. Gated support detection, safety timer, variants (`fadeUp`, `fadeIn`, `revealMask`, `popIn`, `staggerParent`). Removed the dead `stillVariants`/`useStagger`/`STILL` API. |
| `src/components/ui/Motion.jsx` | New. `createMotion(tag)` wrappers, importing the safety net internally. |
| `Reveal` / `StaggerGroup` / `StaggerItem` | Rewritten to render plain visible markup when animation is unavailable. |
| `src/styles/index.css` | Replaced with the new token system, Fraunces `SOFT`/`WONK` type styles, `.card-play`, `.btn-*`, `.sticker`, `.field`, marquee and float keyframes. |
| `body { overflow-x }` | `hidden` → **`clip`**. `hidden` made `<body>` a scroll container and silently broke every `position: sticky` descendant (header, catalogue filter bar). |
| `index.html` | Theme colour updated, preload switched to the variable Fraunces file, hero `imagesizes` matched to the new layout. |
| `src/components/layout/Header.jsx` | Rebuilt: butter announcement strip, pill nav with active fill, cherry CTA, full-height mobile drawer. |
| `src/components/layout/Footer.jsx` | Rebuilt: flavour chip row, four columns, honesty disclosures, `pb-sticky-safe`. |
| `src/components/layout/MobileActionBar.jsx` | z-index 30 → 20 so the drawer covers it; cherry fill now `cherry-ink` for contrast. |
| `src/components/ui/Logo.jsx` | New provisional SVG lockup (mark + wordmark), API unchanged for a drop-in replacement. |
| `src/components/product/ProductCard.jsx` / `ProductDetail.jsx` | Rebuilt on the new system; variant pricing and WhatsApp message logic untouched. |
| `src/data/products.js` | Added a **derived** `chocolate` collection (from `tone === 'chocolate'`), so the collection is never hand-maintained. Prices untouched. |
| `src/data/gallery.js` | 12 → 15 items; corrected two alt texts that had drifted from the regenerated plates. |
| `src/data/imagery.js` | All 15 alt texts rewritten to describe the actual new plates. |
| `src/components/ui/PageHeader.jsx` | Added a `tone` prop (six colour fields) so each inner page has an identity. |
| `scripts/` | Untouched. `npm run images` regenerated all 30 WebP files from the new sources. |
| Tests | 156 → **158**. Added the chocolate-collection derivation test and a dark-panel contrast guard. |

---

## C. Components redesigned

**Homepage (12 blocks):** `Hero` · `BrandIntro` · `FeaturedCakes` · `FlavourBand` ·
`CategoryGrid` (Explore Collections) · `SignatureCollection` (chocolate list) ·
`CustomCakePromo` · **`BrandStory` (new)** · `TestimonialBlock` · `WhyUs` · `VisitStrip`.

**Shell:** `Header` · `Footer` · `MobileActionBar` · `Logo` (new) · `Layout` (skip link
restyled).

**Shared:** `Button` (six variants) · `SectionHeading` · `PageHeader` (toned) · `Tag` ·
`ProductCard` · `ProductDetail`.

**Pages:** `HomePage` · `MenuPage` · `GalleryPage` · `CustomCakesPage` · `AboutPage` ·
`ContactPage` · `NotFoundPage`.

**Primitives:** `Reveal` · `StaggerGroup` · `StaggerItem` · `Motion` (new).

---

## D. Design-system changes

- **Colour.** Beige/caramel/cocoa → butter, cherry, pistachio, strawberry, lavender, sky,
  vanilla, chocolate, orange, plus six soft tints.
- **Contrast engineering.** Cherry `#E85B55` only clears AA for large type (4.14:1 on
  chocolate, 3.47 for white on it), so it was split into three tokens:
  `cherry` (display only), `cherry-deep #B8392F` (small text on vanilla, 5.39:1), and
  `cherry-ink #CC423C` (a fill that carries white, 4.76:1). Full table in
  `docs/DESIGN-SYSTEM.md`.
- **Typography.** Fraunces variable with `SOFT`/`WONK` axes drives a playful-but-premium
  display voice; `display-hero` / `display-lg` / `display-md` / `display-script` scales.
  One italic word per heading is the signature move.
- **Surface language.** Hard offset shadows (`0 4px 0 #3A251F`), 2 px chocolate borders,
  pill buttons, arch image frames, one square corner per rounded frame.
- **New primitives:** `.card-play`, `.sticker`, `.edge-scallop`, `.animate-float`,
  `.animate-marquee`, `.pb-sticky-safe`, `.eyebrow--light`.
- **Docs:** `docs/DESIGN-SYSTEM.md` and `docs/MOTION.md` fully rewritten.

---

## E. New interactions and animations

- Hero: staggered headline, clip-path wipe on the photograph, overlapping order card,
  two floating stickers (6 s, `aria-hidden`).
- Scroll reveals throughout, all `once: true`, 600–900 ms.
- Staggered product and collection cards (60–80 ms).
- Card hover: 4 px lift + hard shadow deepening + 1.05 photo scale.
- Button hover: 2–3 px lift, shadow step. Active: 0.985 scale.
- Category chips: colour fill changes per collection; mobile tap scrolls results into view.
- Sticky catalogue nav and sticky gallery nav.
- Gallery: enter/exit fades, keyboard-navigable lightbox (←/→/Esc), scroll lock.
- Mobile drawer: fade panel, 10 px link rise, staggered, scroll lock, Esc to close.
- Marquee: CSS-only, pauses on hover, becomes a wrapped list under reduced motion.
- Product dialog: 6 % rise + fade, focus trap, Esc to close.

**Reduced motion and no-JS:** all of the above degrade to static, fully visible content.

---

## F. Images still needing replacement

All 15 plates are **temporary editorial placeholders** and are labelled as illustrative in
`src/data/imagery.js` and in the UI where appropriate.

| Priority | Asset | Why |
| --- | --- | --- |
| 1 | Real logo (SVG/PNG ≥ 512) | `LogoMark` is a provisional SVG cake |
| 2 | 18 product photographs | 6 flavours currently share a sibling's plate |
| 3 | Interior / counter photos | Brand story uses texture macros |
| 4 | 1200×630 social card | Currently the hero WebP |
| 5 | Favicon / app icons | Derived from the placeholder mark |

Replacement procedure (3 steps) is in `docs/ASSETS.md`.

---

## G. Mobile test results

> **Scope statement.** No headless browser was available in this environment, so these
> results come from **static analysis, CSS-truth extraction from the production bundle,
> jsdom rendering and manual breakpoint reasoning** — not from device screenshots. This is
> called out rather than dressed up as device testing.

| Check | Result |
| --- | --- |
| Horizontal overflow | ✅ `body { overflow-x: clip }` plus per-section `overflow-hidden`; long words get `overflow-wrap: break-word` |
| 320 px | ✅ Hero headline `clamp(2.9rem …)` ≈ 46 px in a 280 px content box; three short lines, no clipping |
| 360 / 375 / 390 / 430 px | ✅ Single-column grids until `sm` (640 px); no fixed widths |
| Tablet 768 px | ✅ Two-column collections, hero switches to 12-col grid |
| Desktop 1024 px+ | ✅ Six collection cards with the first spanning 2; 4-up product grid |
| Blank sections | ✅ Guarded by 11 visibility tests |
| Sticky behaviour | ✅ Restored — see B (`overflow-x: clip`) |
| Fixed action bar | ✅ z-index below the drawer; footer padded with `pb-sticky-safe` |
| Tap targets | ✅ `min-height: 3rem` on buttons, 44 px on icon buttons |
| Nav | ✅ Full-height drawer, scroll lock, Esc, staggered links, address + call/WhatsApp/directions |
| Text zoom | ✅ `text-wrap` on headings, no fixed heights on text containers |
| Reduced motion | ✅ Every path verified gated |
| Rough edges to verify on a device | ⚠️ The decorative hero stickers are hidden below `sm`; a real-device pass on 320 px is still recommended |

---

## H. Production build result

```
✓ 2613 modules transformed
dist/index.html                       3.25 kB │ gzip:  1.36 kB
dist/assets/index-*.css              70.89 kB │ gzip: 12.40 kB
dist/assets/NotFoundPage-*.js         1.27 kB │ gzip:  0.65 kB
dist/assets/PageHeader-*.js           1.36 kB │ gzip:  0.63 kB
dist/assets/AboutPage-*.js            6.39 kB │ gzip:  2.51 kB
dist/assets/ContactPage-*.js          8.09 kB │ gzip:  2.68 kB
dist/assets/GalleryPage-*.js         11.14 kB │ gzip:  3.62 kB
dist/assets/MenuPage-*.js            12.07 kB │ gzip:  4.01 kB
dist/assets/CustomCakesPage-*.js     18.23 kB │ gzip:  5.58 kB
dist/assets/Seo-*.js                 50.51 kB │ gzip: 18.10 kB
dist/assets/schema-*.js             149.75 kB │ gzip: 50.50 kB
dist/assets/index-*.js              304.07 kB │ gzip: 91.56 kB
✓ built in 749 ms
```

| Gate | Command | Result |
| --- | --- | --- |
| Content audit | `npm run audit` | ✅ 57 source files, 15 images, no fabricated claims or dead links |
| Tests | `npm test` | ✅ **158 passed / 158**, 10 files |
| Build | `npm run build` | ✅ 749 ms |
| Combined | `npm run verify` | ✅ audit → test → build all green |
| Local serve | `npm run preview` | ✅ HTML 200, CSS 200 (71,855 B), all three fonts 200 with `font/woff2` |

Bundle notes: fonts total 448 kB, of which the browser downloads only what it needs
(121 kB + 30 kB for the homepage; the italic 150 kB only if an italic is used). Images are
1.8 MB across 30 WebP files, all lazy except the preloaded hero.

---

## I. Remaining bugs and limitations

1. **Production not re-verified in a browser.** The sandbox cannot reach the Vercel host,
   and no headless browser is installable. The fix is proven by jsdom + a local production
   serve, but someone must open the deployed URL after this merges.
2. **Placeholder photography.** 15 illustrative plates, 6 flavours sharing a sibling's
   frame. Labelled honestly; still needs the real set.
3. **Provisional prices.** 18 products / 33 variants carry the brief's prices, awaiting
   owner sign-off. Test-locked so they cannot drift silently.
4. **No real reviews.** `TESTIMONIALS = []` — the section is an honest empty state.
5. **No external ordering links.** Swiggy/Zomato/Instagram/Facebook are stated as pending,
   not guessed.
6. **No opening hours.** Never supplied; the UI says so instead of inventing them.
7. **Placeholder canonical domain.** `https://cakencrush.example.com` until
   `VITE_SITE_URL` is set at build time.
8. **Client-rendered SEO.** Per-route metadata and JSON-LD are set by `<Seo/>`, but
   non-JS crawlers see only the static `<head>` and the `noscript` block. Prerendering
   would close this if it matters.
9. **`schema` chunk is 149.75 kB / 50.5 kB gzip** — it is shared SEO/JSON-LD code. It is
   not on the critical path but is worth splitting if the bundle budget tightens.
10. **Two unused legacy font files** (`fraunces-display*.woff2`, 148 kB) still in the repo;
    they are not shipped in the bundle and can be deleted.

---

## J. Deployment instructions

```bash
# 1. Install and verify
npm ci --legacy-peer-deps
npm run verify          # audit → test → build

# 2. Preview the exact production output
npm run preview -- --port 4173 --host 0.0.0.0

# 3. Deploy (Vercel auto-deploys on merge to main; manual equivalent:)
npx vercel --prod
```

Configuration already in the repo:

- `vercel.json` — SPA rewrites to `/index.html`, immutable cache headers for `/assets/*`,
  `max-age=31536000` for `/fonts/*` and `/images/*`, plus security headers
  (`X-Content-Type-Options`, `Referrer-Policy`, `X-Frame-Options`, `Permissions-Policy`).
- Build command `npm run build`; `prebuild` runs the image pipeline and the SEO generator.
- Output directory `dist`.
- Set `VITE_SITE_URL` in the Vercel project to the purchased domain so canonical and
  Open Graph URLs stop pointing at the placeholder.

**Post-deploy smoke test** (5 minutes, in a real browser):

1. Hard-reload `/` on a phone — the hero, both CTAs and the first product row must be
   visible immediately.
2. DevTools → Network → confirm the three `.woff2` fonts and the hero WebP return 200.
3. Toggle *Emulate CSS `prefers-reduced-motion: reduce`* — everything must stay visible
   with no movement.
4. Visit `/menu`, filter to Pastries — the honest “menu pending” state must appear.
5. Tap a WhatsApp button — a pre-filled chat must open.
6. Submit the custom-cake form empty — the validation summary must appear and take focus.

---

## K. Owner approvals still required

| # | Decision | Why it is blocking | Where to change it |
| --- | --- | --- | --- |
| 1 | **Confirm all 33 prices** | Transcribed from the brief; never verified by the bakery | `src/data/products.js` |
| 2 | **Confirm the WhatsApp number** 8838159344 | Every CTA depends on it | `src/data/business.js` (`RAW_PHONE`) |
| 3 | **Supply the logo file** | Placeholder SVG ships today | `src/components/ui/Logo.jsx` |
| 4 | **Supply real product photography** | 15 plates are illustrative | `assets-src/` → `npm run images` |
| 5 | **Supply opening hours** | Deliberately absent | `src/data/business.js` (`openingHours`) |
| 6 | **Supply Swiggy / Zomato URLs** | Stated as pending, not linked | `src/data/business.js` |
| 7 | **Supply Instagram / Facebook URLs** | Stated as pending, not linked | `src/data/business.js` |
| 8 | **Confirm the postal pincode** | Omitted rather than guessed | `src/data/business.js` (`ADDRESS.postalCode`) |
| 9 | **Approve the collection naming** (“Chocolate Cakes” is derived from product tone) | New collection grouping | `src/data/products.js` |
| 10 | **Confirm any bestseller flags** | Currently all `false`; the homepage says “Featured Collection” | `src/data/products.js` (`bestseller`) |
| 11 | **Supply verified reviews** (or a real Google Business link) | Section is an honest empty state | `src/data/testimonials.js` |
| 12 | **Purchase the domain**, then set `VITE_SITE_URL` | Canonical URLs are placeholders | Vercel env |
| 13 | **Confirm the address string** | Used for Google Maps search links | `src/data/business.js` (`ADDRESS`) |

Items 1, 2, 3 and 4 are the ones that must be settled before the site is shown to
customers.
