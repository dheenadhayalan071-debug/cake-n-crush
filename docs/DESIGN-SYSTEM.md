# Design system

Concept: **modern premium patisserie**. Warm, editorial, restrained. The site should feel
like a small-batch dessert brand's lookbook that happens to have exact prices — not a
generic bakery template.

---

## 1. Colour

Defined once as CSS custom properties in `src/styles/index.css` under `@theme`, so Tailwind
utilities (`bg-cream`, `text-ink`, …) and hand-written CSS share the same values.

| Token | Hex | Role | Contrast |
| ----- | --- | ---- | -------- |
| `cream` | `#F8F4ED` | Primary page background | — |
| `cream-deep` | `#EFE6D9` | Secondary background, alternating sections | — |
| `shell` | `#FFFFFF` | Cards, form fields | — |
| `ink` | `#302019` | Primary text, primary button fill | **14.2:1** on cream |
| `ink-soft` | `#6B5648` | Body copy | **6.3:1** on cream |
| `ink-faint` | `#746250` | Meta, captions, helper text | **5.3:1** on cream |
| `caramel` | `#B77B45` | Decorative accent only — rules, hovers, icons | — |
| `caramel-deep` | `#8A5527` | Accent **text** (eyebrows, links) | **5.6:1** on cream |
| `caramel-tint` | `#EAD9C5` | Accent on dark | **12.3:1** on cocoa |
| `orange` | `#E8862D` | Existing brand orange, used sparingly | — |
| `ember` | `#A33F14` | Errors and required markers | **5.8:1** on cream |
| `cocoa` | `#251A16` | Dark editorial sections, footer | — |
| `plum` | `#5B2B3D` | Rare tertiary accent | — |

**Rules**

- Decorative caramel is never used for body-size text. Text accents use `caramel-deep`.
- On `cocoa`, body text is `cream/60` (6.3:1) or lighter; the minimum used is `cream/55` (5.5:1).
- No gradients except two functional ones: a bottom-up scrim under text on photography, and
  the 1px `link-underline` trick.

---

## 2. Typography

Self-hosted, latin-subset variable fonts — two files, ~98 kB total, preloaded.

| Face | Weights | Use |
| ---- | ------- | --- |
| **Fraunces** (variable, optical size axis) | 300–900 | All headlines, product names, prices, numerals in display contexts |
| **Instrument Sans** (variable) | 400–700 | Body, navigation, labels, buttons, form UI |

Fallbacks: `Iowan Old Style, Georgia, serif` and `system-ui, sans-serif`.

### Scale

| Class | Size (fluid) | Use |
| ----- | ------------ | --- |
| `.display-xl` | `clamp(2.75rem, 8.4vw, 7.25rem)` | Hero headline only; line-height 0.94 |
| `.display-lg` | `clamp(2.25rem, 5.4vw, 4.25rem)` | Page titles, major section headings |
| `.display-md` | `clamp(1.75rem, 3.4vw, 2.75rem)` | Sub-sections, dialog titles |
| `.lede` | `clamp(1.0625rem, 1.5vw, 1.25rem)` | Section intros |
| body | `1rem / 1.65` | Default paragraph |
| `.eyebrow` | `0.6875rem`, `0.18em` tracking, uppercase | Section labels, preceded by a 24px rule |

Rules: headlines use `text-wrap: balance`, paragraphs `text-wrap: pretty`; display sizes
use negative tracking (−0.02 to −0.035em); italic Fraunces is reserved for one or two
emphasis words per page, never whole headings.

---

## 3. Spacing & layout

- Base unit 4px; practical rhythm 8 / 12 / 16 / 20 / 24 / 40 / 64 / 96 / 128.
- `.container-page` = `max-width: 78rem` with 20 → 40 → 48px inline padding.
- Section vertical rhythm: `py-16` mobile, `md:py-24` desktop.
- Editorial grids are 12-column on desktop; catalogue cards are 1 / 2 / 3 / 4 columns.
- Radii are deliberately near-square (2–3px) — premium print feel, not bubbly cards.
- Hairlines (`--color-line`) do the structural work instead of heavy shadows. Only two
  shadows exist site-wide (hero caption, modal).

---

## 4. Components

| Component | Notes |
| --------- | ----- |
| `Button` | Variants `primary` (ink fill), `caramel`, `outline`, `light` (on dark). Renders `<Link>`, `<a>` or `<button>` from one API. Min height 48px, uppercase 13px label. |
| `Tag` | Small bordered label. Used for flavour tags and collection labels, never for unverified claims. |
| `Logo` | Provisional typographic lockup + SVG mark; single component to swap when the real logo arrives. |
| `Picture` | Responsive `<picture>` with width/height, srcset, LQIP blur-up, lazy loading, optional "illustrative image" caption. |
| `ProductCard` | Image + name + live variant selector + exact price + WhatsApp CTA built from the selected variant. |
| `ProductDetail` | Accessible modal (`role="dialog"`, focus trap, Escape, scroll lock) with a full variant matrix. |
| `SectionHeading` | Eyebrow → headline → lede, light or dark tone, left or centred. |
| `Reveal` / `StaggerGroup` / `StaggerItem` | The only motion primitives — see below. |
| `Seo` | Per-route `<title>`, meta, canonical, OG/Twitter, JSON-LD. |
| Fields | `.field`, `.field-label`, `.field-error` — 48px tall, 1px border, caramel focus ring, `aria-invalid` styling. |

Interactive states are always defined for: default, hover, focus-visible (2px caramel outline
+ 3px offset), active/pressed (`aria-pressed`), disabled (55% opacity, no pointer), and
invalid (ember border + inline message tied by `aria-describedby`).

---

## 5. Motion

Motion is a single vocabulary, not decoration.

| Primitive | Effect | Duration / easing |
| --------- | ------ | ----------------- |
| Hero image | `clip-path` mask reveal, bottom-up | 1.15s `cubic-bezier(.22,1,.36,1)` |
| Hero text | Staggered fade + 28px rise | 0.8s, 0.09s stagger |
| `Reveal` | Fade + 28px rise on scroll, fires once | 0.8s |
| `StaggerGroup` | Grid items in sequence | 0.08s stagger |
| Cards / images | Hover scale 1.04 | 0.9s, `ease-out` |
| Dialogs / lightbox | Fade + 4–6% rise | 0.45s |
| Header | Background/border change on scroll | 0.5s |
| Underline links | `background-size` wipe | 0.4s |

**Rules**

- Only `opacity`, `transform` and `clip-path` are animated — all compositor-friendly.
- Every animated component routes through `useMotionVariants()`, which returns the final
  state instantly when `prefers-reduced-motion: reduce` is set. A global CSS rule also
  collapses transitions to 0.01ms as a second net.
- Nothing animates on a timer while off-screen; scroll reveals fire once.
- No parallax, no autoplay carousels, no cursor followers, no layout animation.

---

## 6. Accessibility conventions

- Semantic landmarks: one `<h1>` per route, ordered headings, `<nav aria-label>`, `<main>`,
  `<footer>`, `<address>`.
- Skip-to-content link is the first focusable element.
- Focus is always visible; modals trap focus and restore it to the trigger on close.
- Form fields have real `<label>`s, inline errors, `aria-describedby`, and an error summary
  that receives focus on failed submit.
- Live regions (`aria-live="polite"`) announce result counts on the menu and gallery.
- All imagery has descriptive alt text; decorative SVG is `aria-hidden`.
- Minimum body contrast 5.3:1; interactive and large text comfortably above AA.
