# Asset inventory

## Supplied by the client

**None.** The brief referenced a logo and menu screenshots as "supplied with the project",
but the repository contained no images, fonts, logos or PDFs at all (verified with a
recursive scan of every image extension — zero results).

Everything visual in this build therefore falls into one of two honest categories:
**clearly labelled illustrative imagery** or **typographic stand-ins**.

## What ships

### 1. Photography — illustrative editorial (placeholder)

15 images, AI-generated as *art direction reference*, not as photographs of real products.
Each is flagged `placeholder: true` in `src/data/imagery.js`; the `Picture` component can
render a caption on request and every alt text begins with "Illustrative…".

| Key | Purpose | Used on |
| --- | ------- | ------- |
| `hero-cake` | Hero, ivory cake with cherries | Home hero (priority), gallery |
| `brand-piping` | Baker piping cream | Brand intro, gallery |
| `cat-celebration` | Celebration cake with berries | Collection tile, product cards, about, gallery |
| `cat-eggless` | Eggless vanilla cake | Collection tile, eggless cards, gallery |
| `cat-1kg` | Large chocolate cake | Collection tile, gallery |
| `cat-plum` | Plum loaves | Collection tile, plum cards, gallery |
| `cat-pastries` | Pastries on a platter | Collection tile, gallery |
| `cat-brownies` | Brownie stack | Brownies collection tile, gallery |
| `gallery-blackforest` | Black forest cake | Gallery |
| `gallery-redvelvet` | Red velvet cake | Gallery |
| `gallery-butterscotch` | Butterscotch cake | Gallery |
| `gallery-custom` | Two-tier bespoke cake | Custom Cake Studio aside, gallery |
| `texture-chocolate` | Ganache macro | Signature section, gallery |
| `texture-cream` | Whipped cream macro | Custom promo, gallery |
| `texture-berries` | Berries on cream | Gallery |

Every gallery item has its own frame — 12 items across 12 distinct images, with `hero-cake`,
`cat-plum` and the three `texture-*` macros completing the set.

**Replacing them** — drop originals into `assets-src/` with the same keys (e.g.
`hero-cake.jpg`), run `npm run images`, then set `placeholder: false` (or delete the flag)
in `src/data/imagery.js`.

### 2. Brand assets

| Asset | Status | File |
| ----- | ------ | ---- |
| Logo lockup | ⚠️ Provisional typographic version | `src/components/ui/Logo.jsx` |
| Favicon | Generated from the same mark | `public/favicon.svg` |
| Open Graph image | Currently the hero photograph | `/images/hero-cake/hero-cake-900.webp` |

The real logo replaces the SVG `<LogoMark/>`; the component's props (`tone`, `compact`) stay.

### 3. Typography

| Family | Files | Size | Source |
| ------ | ----- | ---- | ------ |
| Fraunces (variable, `opsz` preserved) | `fraunces-display.woff2`, `-italic.woff2` | 67 kB + 82 kB | `@fontsource-variable/fraunces`, latin subset |
| Instrument Sans (variable) | `instrument-sans.woff2` | 30 kB | `@fontsource-variable/instrument-sans`, latin subset |

Both are SIL Open Font License. Served from `/fonts/` with immutable caching and preloaded.

## Image pipeline

`scripts/build-images.mjs` (runs automatically before `npm run build`):

1. Reads every JPG/PNG/WebP in `assets-src/`.
2. Emits WebP at **480 / 900 / 1400 px** (skipping widths larger than the source) with
   quality 78, into `public/images/<key>/`.
3. Generates a 24px blurred WebP and inlines it as a base64 LQIP.
4. Writes `src/components/media/image-manifest.js` with `src`, `srcset`, intrinsic
   `width`/`height` (no layout shift) and the LQIP.

Total committed image payload: **~1.8 MB** across 45 WebP files (3 widths × 15 images). The
largest single derivative is 128 kB; the hero is 47 kB at 900px, so a phone hero download is
a fraction of that.

`Picture` then:

- serves `srcset`/`sizes` so phones download the 480px file,
- lazy-loads everything except the hero (`loading="lazy"`, `decoding="async"`),
- sets `fetchpriority="high"` + preload on the hero,
- reserves space with `width`/`height` before load,
- fades the LQIP out when the real image arrives.

## What is *not* in the repository

- No client photographs, no menu screenshots (none were provided).
- No third-party stock photography — nothing unlicensed ships.
- No video, no Lottie files, no icon fonts, no tracking pixels.
