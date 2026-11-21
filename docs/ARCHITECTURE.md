# Architecture

## Rendering model

A fully static single-page app. Vite builds `index.html` + hashed assets; Vercel serves them
from its CDN and rewrites unknown paths to `index.html` so client routing works on refresh
and deep links.

- **No** server runtime, database, auth, cart, payments or third-party APIs.
- The only outbound interactions are user-initiated: `tel:` links, `https://wa.me/…` links,
  and the Google Maps directions/embed on the contact page.
- All content is compiled into the bundle from `src/data/*` — there is nothing to fetch at
  runtime, so first interaction is instant after hydration.

## Route map

| Route | Page | Purpose |
| ----- | ---- | ------- |
| `/` | `HomePage` | Hero, brand intro, featured cakes, collections, signature list, custom promo, why-us, reviews slot, visit block |
| `/menu` | `MenuPage` | Full catalogue, category + dietary + weight filters, search, product dialog |
| `/menu?category=eggless` | same | Shareable filtered view (URL is the source of truth, kept in sync) |
| `/menu?product=red-velvet` | same | Deep link that opens the variant dialog |
| `/gallery` | `GalleryPage` | Filterable gallery with keyboard-navigable lightbox |
| `/custom-cakes` | `CustomCakesPage` | Validated enquiry form → pre-filled WhatsApp message |
| `/about` | `AboutPage` | Verified-only brand introduction |
| `/contact` | `ContactPage` | Address, call, WhatsApp, map, pending channel notes |
| `*` | `NotFoundPage` | 404, `noindex` |

All routes except the homepage are lazy-loaded (`React.lazy` + `Suspense`), giving a
~85 kB gzip initial bundle and 2–6 kB per additional route.

## Data flow

```
src/data/business.js ──┐
src/data/products.js ──┼──► components ──► user actions (tel / wa.me / routes)
src/data/imagery.js  ──┤
src/data/site.js     ──┘
        │
        └──► src/lib/{whatsapp,validation,format,schema}.js   (pure, unit-tested)
```

- **Components never hard-code a phone number, price or URL.** They import from `data/`.
  `scripts/audit-content.mjs` fails the build if an external listing URL appears in JSX.
- **Prices are variant data**, not product data. `ProductCard` and `ProductDetail` both read
  `product.variants[]`; the selected variant drives both the displayed price *and* the
  generated WhatsApp message, so the two can never disagree.
- `src/lib/whatsapp.js` is pure string building (no side effects) and is covered by 10 tests
  including exact-price assertions for the Black Forest regular/eggless/1kg matrix.

## Component map

```
Layout
├─ Header (sticky, scroll state, mobile drawer with focus + scroll lock)
├─ <Outlet/>  ← page
├─ Footer
└─ MobileActionBar (sticky Call / WhatsApp / Custom on <md, hidden in the form route)

HomePage  (12 blocks — colour field / photograph / colour field rhythm)
├─ Hero                 (asymmetric arch composition, priority image, dual CTA)
├─ BrandIntro           (two-column + quoted card + 2 stat blocks from data)
├─ FeaturedCakes        (4 curated cards → shared dialog; NOT a bestseller claim)
├─ FlavourBand          (CSS marquee, chocolate band, data-derived flavours)
├─ CategoryGrid         (6 collection tiles, per-collection colour, live counts)
├─ SignatureCollection  (chocolate full-bleed, real entry prices)
├─ CustomCakePromo      (three-step explainer + bespoke photograph)
├─ BrandStory           (photo collage, verified facts only)
├─ TestimonialBlock     (honest empty state while TESTIMONIALS is empty)
├─ WhyUs                (four verifiable points)
└─ VisitStrip           (address, copy, directions, call, honest pending notes)
```

Shared primitives: `Button`, `Picture`, `Reveal`, `StaggerGroup`, `StaggerItem`,
`Motion` (the only legal home for `motion.*`), `SectionHeading`, `Tag`, `Logo`,
`PageHeader` (takes a `tone` colour field), `Seo`.

## State management

No global store. State is local to the component that needs it:

- URL search params hold catalogue filters and the open product (shareable, back-button safe).
- `useProductDetail()` centralises dialog state where cards need to open a shared modal.
- Form state is a single `values` object plus `errors`/`touched`; validation is a pure
  function in `src/lib/validation.js`.

## Build pipeline

```
npm run build
 ├─ prebuild: scripts/build-images.mjs   assets-src/*.jpg → public/images/**/…webp (15 images × 3 widths)
 │            └─ writes src/components/media/image-manifest.js (srcset + LQIP + dims)
 ├─ prebuild: scripts/build-seo.mjs      public/sitemap.xml + public/robots.txt
 └─ vite build                           → dist/ (index.html, hashed CSS/JS, images, fonts)
```

`npm run verify` = `audit` (no-fabrication + imagery integrity) → `test` (158 tests) → `build`.

## Key decisions & trade-offs

| Decision | Rationale | Trade-off accepted |
| -------- | --------- | ------------------ |
| Client-rendered SPA, not SSG/SSR | Six routes, static data; one deploy target, minimal moving parts | Social crawlers that don't execute JS see the static `<head>` defaults; mitigated with per-page metadata, `noscript` contact block and a real sitemap. Moving to SSG is a contained change if needed. |
| Self-hosted variable fonts | No third-party request, no CLS, privacy | ~98 kB of font in the repo (preloaded, subset to latin). |
| Hand-written `<Seo>` instead of Helmet | 60 lines vs a dependency; full control of tag lifecycle | No automatic fallbacks; covered by route-level SEO tests. |
| Hand-written brand icons | Lucide v1 dropped brand glyphs; a second icon pack for two icons is not justified | Two tiny SVGs to maintain. |
| Prices transcribed, not mirrored | The brief's prices are the only source; they are provisional | Requires owner sign-off before launch (documented). |
| No analytics | Not requested; avoids consent banners and third-party scripts | The owner will need Search Console / Vercel Analytics for traffic insight later. |
