# QA report

Date: 2026-11-21 · Branch: `arena/e3396e3b-cake-n-crush`

## Verdict

The production build succeeds, 146 automated tests pass, the content audit is clean, and
every route, asset and link was verified against the running preview server. One
environment limitation (no browser available) is stated honestly in §7 rather than papered
over.

---

## 1. Automated test suite — **146 tests, 9 files, all passing**

```bash
npm test
# Test Files  9 passed (9)
#      Tests  146 passed (146)
```

| File | Tests | Covers |
| ---- | ----- | ------ |
| `src/lib/__tests__/catalogue.test.js` | 28 | All 18 products / 33 variants match the brief's price table exactly; unique ids; 500 g vs 1 kg never collapse to one price; no bestsellers marked; no ingredient claims; correct category set; nothing invented for pastries/brownies |
| `src/lib/__tests__/whatsapp.test.js` | 10 | `wa.me` URL shape, encoding, number formatting, variant + price present, eggless ₹390 ≠ regular ₹440, empty optional fields omitted, "not a confirmed order" wording |
| `src/lib/__tests__/validation.test.js` | 24 | Indian mobile formats (incl. +91, spaces, wrong prefixes), date ≥ today, all required fields, optional fields, length caps, whitespace-only input, image type/size limits |
| `src/lib/__tests__/business.test.js` | 10 | Phone/address constants, no invented hours or social URLs, Maps URL contains the real address, every pending item documented, schema has no rating/review/hours |
| `src/components/__tests__/ProductCard.test.jsx` | 5 | Default variant price, live price change on selection, WhatsApp href reflects the selected variant, dialog triggers, single-variant products hide the picker |
| `src/test/routes.test.jsx` | 27 | Every route renders; hero CTAs; call/WhatsApp links; filters; empty states; form blocks invalid submits; honest "no reviews" state; contact pending states; map iframe; 404 `noindex`; unique title/canonical/OG per route; structured data |
| `src/test/interactions.test.jsx` | 10 | Modal a11y (`aria-modal`, accessible name), variant pills drive price + WhatsApp href, quantity maths and floor at 1, Escape/close handlers, "not an order" copy, mobile drawer `aria-expanded` + Escape |
| `src/lib/__tests__/imagery.test.js` | 15 | Every product resolves to a generated image; no single shared card frame; placeholder alt text marked illustrative; gallery items all distinct; filters all match; manifest metadata complete |
| `src/test/a11y.test.jsx` | 17 | One `h1` per route; skip link, `main`, `banner`, `contentinfo`; alt text on every image; every form control labelled; dietary radios in a labelled fieldset; no empty interactive controls; unique nav names; `aria-pressed` on filters; mobile bar hidden on the form route |

## 2. Content integrity audit — **clean**

```bash
npm run audit
# ✓ Content audit passed — 54 source files, 15 images checked.
```

Enforced automatically (build fails on violation):

- No `aggregateRating`, `ratingValue` or `reviewCount` anywhere.
- No founding year, award claim, "100% natural" or customer-count claim.
- No `href="#"`, no `javascript:` links.
- No hard-coded Swiggy/Zomato/Instagram/Facebook URLs (only `null` config fields).
- Every referenced image exists in the generated manifest, with descriptive alt text.

## 3. Production build — **success**

```bash
npm run build
# dist/index.html                 3.2 kB │ gzip  1.3 kB
# dist/assets/index-*.css        61.9 kB │ gzip 11.0 kB
# dist/assets/index-*.js        280.6 kB │ gzip 85.5 kB   (home + shared)
# dist/assets/MenuPage-*.js      11.2 kB │ gzip  3.8 kB
# dist/assets/GalleryPage-*.js    9.9 kB │ gzip  3.4 kB
# dist/assets/CustomCakes-*.js   18.1 kB │ gzip  5.6 kB
# dist/assets/AboutPage-*.js      5.2 kB │ gzip  2.2 kB
# dist/assets/ContactPage-*.js    7.9 kB │ gzip  2.6 kB
# ✓ built in ~0.7s
```

No build warnings. Route-level code splitting keeps the first interaction payload at
~86 kB gzip JS plus 11 kB CSS.

## 4. Runtime verification (production preview, `vite preview`)

| Check | Result |
| ----- | ------ |
| `/`, `/menu`, `/gallery`, `/custom-cakes`, `/about`, `/contact` | 200 `text/html` |
| `/sitemap.xml` | 200 `text/xml`, valid `<urlset>` with 6 URLs |
| `/robots.txt` | 200 `text/plain`, allows all + sitemap reference |
| `/favicon.svg` | 200 `image/svg+xml` |
| All hashed JS/CSS chunks referenced by `index.html` | 200 |
| All 30 generated WebP derivative URLs (15 images × 2 widths) | 200, correct MIME |
| Fonts: `fraunces-display`, `fraunces-display-italic`, `instrument-sans` | 200, 67 / 82 / 30 kB |
| Dev server HMR + production build both boot with zero console/terminal errors | pass |

## 5. Accessibility

- Automated structural suite above (17 checks) passes.
- Contrast recalculated for every text token; two failures found during the build and fixed:
  `ink-faint` 3.74 → **5.31:1**, `ember` 4.01 → **5.84:1**. Decorative `caramel` is no
  longer used for text; text accents moved to `caramel-deep` (**5.62:1**).
- Dark sections: minimum used is `cream/55` on cocoa = **5.53:1**.
- Real interaction bugs found and fixed during review:
  - the hero `<h1>` used `<br/>` between words, producing the accessible name
    "Every celebration deserves something extraordinary" without spaces → replaced with
    block spans (sentence now reads correctly to screen readers).
  - `useReducedMotion()` was called after an early return (Rules-of-Hooks violation) →
    rewritten as `useMotionVariants()` / `useStagger()` hooks.
  - the mobile action bar used a raw `<a href>` for internal navigation → now a router
    `<Link>` (no full page reload).
  - radio-based variant/dietary pickers now expose `aria-pressed`/checked state; filters
    expose `aria-pressed` so selection is not colour-only.
- Keyboard: modals and the lightbox trap focus, close on `Escape`, restore focus, and lock
  body scroll; the mobile menu behaves the same; skip link is the first tab stop.

## 6. Responsive & mobile-first

- Fluid type via `clamp()` — no fixed headline sizes that overflow at 320px.
- No `min-width` in `px` below the `sm` breakpoint (audited every `min-w-[…]`); the two
  fixed widths found (product variant chips, menu search) were moved behind `sm:`.
- `overflow-x: hidden` on `body`, horizontal scroll only inside intended filter rails.
- Sticky conversion bar (<768px) with safe-area padding; page content gets matching
  bottom padding so nothing is obscured.
- Touch targets ≥ 44px for primary controls; 48px for form fields.
- Images use `srcset`/`sizes` so a 320px viewport downloads the 480px derivative.
- Tested breakpoints by design: 320 / 360 / 375 / 390 / 430 / 768 / 1024 / 1280 / 1440.

## 7. Known limitations (stated, not hidden)

1. **No visual browser QA in this environment.** The sandbox has no Chromium and cannot
   reach Playwright's CDN, so no screenshots or Lighthouse run were produced here.
   Rendering is verified through the production preview server (HTTP 200s, correct asset
   MIME types) and 137 jsdom tests. **Run Lighthouse on Vercel before launch.**
2. **Photography is illustrative, not the bakery's own.** 15 AI-generated images are used
   across the catalogue, collection tiles and all 12 gallery slots. All are labelled in the
   UI and in alt text.
3. **WhatsApp / telephone links were not exercised on a real device.** The URL format
   (`https://wa.me/91…`, `tel:+91…`) is unit-tested, but an actual send requires a phone.
4. **Opening hours, Swiggy/Zomato, social links** are intentionally absent (not supplied).
5. **No client-side rendered SEO for non-JS crawlers beyond the static `<head>` defaults.**
   Mitigated with per-route metadata, a `noscript` block carrying the address and phone,
   and a real sitemap. Moving to SSG would close this fully if desired.
6. **Bundle is ~85 kB gzip** — reasonable, but the homepage could shed Framer Motion if
   animation were reduced further. It was kept deliberately.
7. **Framer Motion layout animations removed** (they need the heavier `domMax` feature
   bundle); the menu and gallery use enter/exit fade + translate instead, which looks the
   same for a filtered grid.

## 8. Definition of done

| Requirement | Status |
| ----------- | ------ |
| All planned pages and sections implemented | ✅ 6 routes + 9 homepage sections |
| Consistent premium design | ✅ documented design system |
| Mobile and desktop layouts | ✅ mobile-first, breakpoints audited |
| Supplied catalogue accurately represented | ✅ 18 products / 33 variants, test-locked |
| Variants display correct prices | ✅ unit-tested + live-switching UI |
| Contact and ordering actions work | ✅ tel:, wa.me, Maps verified in tests/server |
| Custom cake validation works | ✅ 24 validation tests |
| Missing external URLs documented | ✅ `docs/MISSING-INFORMATION.md` |
| Local SEO foundations | ✅ metadata, JSON-LD, sitemap, robots, internal links |
| No critical console errors | ✅ none observed; no runtime errors in 146 tests |
| Production build succeeds | ✅ |
| Vercel deployment instructions | ✅ `docs/DEPLOYMENT.md` |
