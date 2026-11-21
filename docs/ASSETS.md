# Asset inventory

## Supplied by the client

**No original bakery photography, logo file or brand sheet has been supplied.** Every
visual in this build therefore falls into one of two honestly labelled categories:
**illustrative editorial imagery** or **typographic stand-ins**.

The Phase-2 redesign regenerated the whole image set to match the colourful direction.
These are still art-direction plates, not photographs of real Cake N Crush cakes, and
they are labelled as such in the UI and in code.

---

## 1. Replacement status

| Asset | Status | Notes |
| --- | --- | --- |
| Logo | ⚠️ **Provisional typographic lockup** | `src/components/ui/Logo.jsx` draws a cake mark + wordmark in SVG. Replace with the real logo file — one component, one line. |
| Photography (15 plates) | ⚠️ **Placeholder** | `placeholder: true` in `src/data/imagery.js`; alt text begins “Illustrative…”. |
| Favicon | ⚠️ Provisional | `public/favicon.svg` is derived from the placeholder mark. |
| Social share image | ⚠️ Placeholder | `/images/hero-cake/hero-cake-900.webp`. A dedicated 1200×630 card is recommended. |

### How to replace a photograph

1. Drop the real file into `assets-src/` using the existing key name (e.g. `hero-cake.jpg`).
2. `npm run images` — regenerates 480/900 px WebP + LQIP + `image-manifest.js`.
3. Point the product/category at the key in `src/data/imagery.js`.
4. Delete `placeholder: true` for that key. Alt text automatically switches from
   “Illustrative editorial styling of …” to “Photograph of …”.

---

## 2. The 15 plates

All are 4:5 portrait source JPEGs unless noted, exported to WebP at 480 px and 900 px.
Total shipped weight: **1.8 MB across 30 files**, all lazy-loaded except the hero.

| Key | What it shows | Used on |
| --- | --- | --- |
| `hero-cake` | Pink two-tier cake, sprinkles, cherries | Hero (priority preload), gallery |
| `brand-piping` | Baker piping pink rosettes onto a pastel cake | Brand intro, gallery |
| `cat-celebration` | Strawberry cake under a butter-yellow arch | Celebration tile + cards, about, gallery |
| `cat-eggless` | Ivory eggless cake with a strawberry, pistachio linen | Eggless tile + cards, gallery |
| `cat-1kg` | Dark chocolate & cherry cake with ganache drip | Chocolate tile + 1 kg cards, gallery |
| `cat-plum` | Plum loaves with nuts on a wooden board | Plum tile + cards, gallery |
| `cat-pastries` | Éclair, mille-feuille and berry tart on lavender/sky linen | Pastries tile, gallery |
| `cat-brownies` | Stack of walnut brownies | Brownies tile, gallery |
| `gallery-blackforest` | Black forest gateau with cherries | Black Forest cards, gallery |
| `gallery-redvelvet` | Red velvet with cream cheese frosting | Red Velvet cards, gallery |
| `gallery-butterscotch` | Butterscotch cake with caramel drip | Butterscotch cards, gallery |
| `gallery-custom` | Two-tier bespoke cake, gold leaf, dried florals | Custom studio, gallery |
| `texture-chocolate` | Macro ganache with cherry and curls | Chocolate interlude, story, cards |
| `texture-cream` | Macro vanilla bean buttercream | Gallery |
| `texture-berries` | Berries and sprinkles on pink cream | Story, berry-flavour cards, gallery |

### Products mapped to a placeholder

| Product | Plate |
| --- | --- |
| Black Forest | `gallery-blackforest` |
| Butterscotch · Scotch Forest | `gallery-butterscotch` |
| Red Velvet | `gallery-redvelvet` |
| Creamy Vanilla · White Forest | `cat-eggless` |
| Strawberry · Blackcurrant · Blueberry | `texture-berries` |
| Chocolate Truffle · Death By Chocolate | `texture-chocolate` |
| Double Choco Chip · Belgium Chocolate | `cat-1kg` |
| Royal Plum 100g/250g · Rich Plum 500g | `cat-plum` |

Mango and Triple Layer fall back to the celebration plate. **Six products share a frame
with a sibling flavour** — the first thing real photography should fix.

---

## 3. Fonts

Self-hosted, `public/fonts/`, preloaded in `index.html`.

| File | Size | Role |
| --- | --- | --- |
| `fraunces-var.woff2` | 121 kB | Variable display serif, `wght 300–900` + `SOFT`/`WONK`/`opsz` |
| `fraunces-var-italic.woff2` | 150 kB | Italic counterpart (display-script words) |
| `instrument-sans.woff2` | 30 kB | Variable body sans |

Both are SIL Open Font License. `fraunces-display.woff2` and
`fraunces-display-italic.woff2` remain on disk but are **no longer referenced** — they can
be deleted to save 148 kB from the repo (they are not shipped in the bundle).

---

## 4. Imagery not invented

- ❌ No photographs presented as the bakery's actual cakes.
- ❌ No stock photos of other bakeries' products.
- ❌ No fake customer photos, avatars or review screenshots.
- ❌ No award badges, certification marks or payment-provider logos.

---

## 5. Still needed before launch

1. **The real logo** (SVG or PNG ≥ 512 px) — replaces `LogoMark`.
2. **Product photography** — 18 products, ideally one frame per flavour.
3. **Interior / counter photographs** — the story section currently uses texture macros.
4. **A social share image** at 1200×630 with the wordmark and a cake.
5. **A 512×512 icon** and maskable icon for installability, if a PWA manifest is added.
