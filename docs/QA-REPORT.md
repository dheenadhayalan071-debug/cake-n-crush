# QA report — Playful Premium Patisserie redesign

**branch** `arena/49011c56-cake-n-crush` · **date** 21 November 2026
**verdict** ✅ audit clean · ✅ 158/158 tests · ✅ production build 749 ms

> **Scope honesty.** No headless browser existed in this environment (no Chromium; the
> Playwright CDN is unreachable) and the deployed Vercel host is not reachable from the
> sandbox (`SSL_ERROR_SYSCALL`, status 000). Everything below is proven by jsdom
> rendering, computed-style assertions, CSS extracted from the production bundle and a
> locally served production preview — **not** by screenshots or Lighthouse.

---

## 1. What the previous suite missed

The pre-redesign suite asserted DOM **presence**. A node rendered at `opacity: 0` passed
every test while production showed blank sections. The rule now: anything animated is
asserted on **computed visibility up the whole ancestor chain**.

## 2. Gates

| Gate | Command | Result |
| --- | --- | --- |
| Content audit | `npm run audit` | ✅ 57 source files, 15 images, no fabricated claims, no dead links |
| Unit + component | `npm test` | ✅ 158 passed, 10 files |
| Production build | `npm run build` | ✅ 2613 modules, 749 ms, 91.56 kB gzip JS |
| Full pipeline | `npm run verify` | ✅ audit → test → build |
| Local serve | `npm run preview` | ✅ HTML 200, CSS 200 (71,855 B), fonts 200 `font/woff2` |

## 3. Test inventory

| File | Tests | Covers |
| --- | --- | --- |
| `lib/__tests__/catalogue.test.js` | 29 | 18 products / 33 variants, exact prices, category derivation, chocolate collection, featured count |
| `lib/__tests__/validation.test.js` | 24 | Custom-cake form rules, image caps, date logic |
| `lib/__tests__/whatsapp.test.js` | 10 | Message building, URL encoding, variant inclusion |
| `lib/__tests__/imagery.test.js` | 15 | Every category/product/gallery key resolves to a generated file |
| `lib/__tests__/business.test.js` | 10 | Phone/WhatsApp/address consistency, no invented hours or links |
| `components/__tests__/ProductCard.test.jsx` | 5 | Variant switching updates price **and** the WhatsApp message |
| `test/routes.test.jsx` | 27 | All six routes, 404, filtering, empty states, SEO copy |
| `test/a11y.test.jsx` | 17 | Landmarks, heading order, labels, focus |
| `test/interactions.test.jsx` | 10 | Drawer, lightbox, filters, form submission |
| `test/visibility.test.jsx` | **11** | Blank-section regression + dark-panel contrast |
| **Total** | **158** | **10 files, 158/158 passing** |

## 4. Bugs found and fixed during this pass

| # | Bug | How it was found | Fix |
| --- | --- | --- | --- |
| 1 | Hero accessible name read “Life isbetter withcake.” | A visibility test asserting the H1 text | Explicit `{' '}` between block spans |
| 2 | `.eyebrow--light` referenced but never defined — dark ink on the chocolate panel | A CSS-truth scan of the compiled bundle | Class implemented in `@layer components`; guarded by a test |
| 3 | Cherry fill carried white text at 3.47:1 | Contrast sweep of every pair in use | `cherry-ink #CC423C` (4.76:1) for fills; `cherry-deep` for small text |
| 4 | `body { overflow-x: hidden }` broke every `position: sticky` | Static audit of the stacking/scroll model | `overflow-x: clip` |
| 5 | Mobile action bar (z-30) painted over the drawer (z-30) | z-index audit | Bar dropped to z-20; footer given `pb-sticky-safe` |
| 6 | “100% fresh” sticker — an unverified ingredient claim | `npm run audit` (phase 7 of the build) | Copy changed to “baked today” |
| 7 | Direct `whileInView` call sites had no safety net | Code review of the motion layer | Safety net moved into the `Motion` wrapper |
| 8 | Two gallery alt texts described the old plates | Reviewing the regenerated images | Corrected to match the new frames |
| 9 | `SectionHeading`/`PageHeader` still used removed tokens (`text-ink`, `bg-cream-deep`) | Token sweep | Repointed to the new palette |

---

## 5. What was verified, and how

- **Visibility**: deleting `IntersectionObserver` and asserting computed `opacity`,
  `visibility`, `display` up the ancestor chain for the hero H1, lede, both CTAs, every
  section, a product card, a menu grid card and gallery items.
- **Layout safety**: `overflow-x: clip` present and `overflow-x: hidden` absent in the
  compiled CSS; `overflow-wrap: break-word` on headings.
- **Colour**: every fill/text pair measured; the table in `docs/DESIGN-SYSTEM.md` is
  generated from those measurements.
- **Assets**: all 15 image keys resolve in the manifest; 30 WebP files present; the three
  fonts return 200 with the right MIME type from the production preview.
- **Routes**: all six plus the 404 render with correct headings and metadata.
- **Commerce integrity**: prices, variant ids and the WhatsApp message body are
  test-locked; no bestseller flag, no rating, no review, no opening hours, no external
  ordering link.

## 6. Known limitations

1. No device or browser screenshots — see the scope note at the top.
2. Production URL not re-verified after the fix; needs one manual pass post-merge.
3. Placeholder photography (15 plates; 6 flavours share a sibling's frame).
4. Prices remain provisional pending owner approval.
