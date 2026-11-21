# Design system — “Playful Premium Patisserie”

A colourful, art-directed dessert brand: expressive editorial serif headlines, pastel
colour fields used with intent, chunky hand-made feeling cards, and real catalogue prices
sitting inside that personality. Not a childish cartoon, and not the beige minimalism it
replaced.

Everything below is implemented in `src/styles/index.css` under `@theme` and
`@layer components`. Nothing on the site uses a colour or a type style that is not
listed here.

---

## 1. Colour

Chocolate `#3A251F` is the **only** text colour used on the pastel fills. White text is
never placed on them — see the contrast table.

### Fills

| Token | Hex | Used for |
| --- | --- | --- |
| `butter` | `#F6D96B` | Announcement strip, hero arch, quote cards, CTA fills |
| `cherry` | `#E85B55` | **Display-size** accents and script words only |
| `pistachio` | `#A9BA91` | Eggless collection, "why us" tile, WhatsApp enquiry buttons |
| `strawberry` | `#F1A6B6` | Celebration collection, gallery masthead |
| `lavender` | `#C8B5E8` | Custom-cake colour block, plum collection, "something not listed" panel |
| `sky` | `#A9D8E8` | Contact masthead, reviews empty state, allergen notice |
| `vanilla` | `#FFF7E9` | Page background (replaces the old cream) |
| `chocolate` | `#3A251F` | Footer, chocolate collection list, marquee band, primary buttons |
| `orange` | `#E99A45` | 1 kg collection chip, footer chip only |

Soft tints (`butter-soft`, `strawberry-soft`, `pistachio-soft`, `sky-soft`,
`lavender-soft`, `cherry-soft`) are used for large quiet areas that still need a colour
identity — the footer chips, the stats strip, form sections.

### Text

| Token | Hex | Notes |
| --- | --- | --- |
| `chocolate` | `#3A251F` | Primary text everywhere |
| `ink-soft` | `#6B5045` | Body copy |
| `ink-faint` | `#7A5F52` | Meta, captions, footnotes |
| `cherry-deep` | `#B8392F` | Small text accents **on** vanilla/pastels — 5.39:1 |
| `cherry-ink` | `#CC423C` | A cherry **fill** that carries white text — 4.76:1 |

### Contrast (measured, not assumed)

| Pair | Ratio | Verdict |
| --- | --- | --- |
| chocolate on vanilla | 13.48 | AA |
| chocolate on butter | 10.28 | AA |
| chocolate on sky | 9.34 | AA |
| chocolate on lavender | 7.67 | AA |
| chocolate on strawberry | 7.42 | AA |
| chocolate on pistachio | 6.91 | AA |
| chocolate on orange | 6.26 | AA |
| chocolate on cherry | 4.14 | AA large only |
| cherry-deep on vanilla | 5.39 | AA |
| cherry-deep on strawberry-soft | 4.72 | AA |
| white on cherry | 3.47 | **fails — never used** |
| white on cherry-ink | 4.76 | AA |
| vanilla on chocolate | 13.48 | AA |
| butter on chocolate | 10.28 | AA |

**Hard rules**

1. Never white text on a pastel fill. Chocolate only.
2. `cherry` (`#E85B55`) is display type only (≥ 24 px bold). Small cherry text uses
   `cherry-deep`.
3. Any cherry fill under white text uses `cherry-ink`.
4. `.eyebrow` on a chocolate panel must carry `.eyebrow--light`.

---

## 2. Typography

Two families, both self-hosted and preloaded.

| Family | File | Axes | Role |
| --- | --- | --- | --- |
| **Fraunces** | `public/fonts/fraunces-var.woff2` (121 kB) + `-italic` (150 kB) | `wght 300–900`, `opsz`, **`SOFT 0–100`**, **`WONK 0–1`** | Every headline |
| **Instrument Sans** | `public/fonts/instrument-sans.woff2` (30 kB) | `wght 400–700` | Body, labels, buttons |

The two Fraunces axes are the whole personality trick. `SOFT` rounds the terminals;
`WONK` swaps in the eccentric single-storey forms. Using them deliberately gives a
display face that reads as playful without a second novelty font download.

### Type styles

| Class | Font settings | Size |
| --- | --- | --- |
| `.display-hero` | `SOFT 100, WONK 1`, 700 | `clamp(2.9rem, 9.2vw, 6.6rem)` / 0.92 |
| `.display-lg` | `SOFT 80, WONK 1`, 600 | `clamp(2.1rem, 5vw, 3.9rem)` / 0.98 |
| `.display-md` | `SOFT 70, WONK 0`, 600 | `clamp(1.6rem, 3.2vw, 2.5rem)` / 1.04 |
| `.display-script` | italic `SOFT 100, WONK 1` | inherits — used for one word per heading |
| `.lede` | Instrument Sans | `clamp(1rem, 1.4vw, 1.1875rem)` |
| `.eyebrow` | 11 px / 700 / `0.16em` uppercase + 20 px cherry rule |

`.display-script` is the signature move: exactly **one** word per section heading is set
in italic Fraunces and tinted cherry (`better`, `obsessed`, `yours`, `dark`, `every
price`, `celebration`, `message`, `Park Town`). More than one and it becomes noise.

Body text is `text-wrap: pretty`; headings are `text-wrap: balance` with
`overflow-wrap: break-word` so nothing can break a 320 px layout.

---

## 3. Shape and surface

| Primitive | Definition |
| --- | --- |
| `.card-play` | white fill, `2px` chocolate border, `1.25rem` radius, `0 4px 0` hard chocolate shadow; lifts to `0 8px 0` on hover |
| `.btn` | pill, `min-height 3rem`, `2px` border, uppercase 13 px / 700 / `0.07em` |
| `.btn-chocolate` | chocolate fill, vanilla text, `0 3px 0` shadow → `0 6px 0` on hover |
| `.btn-cherry` | `cherry-ink` fill, white text (the only AA-safe white-on-cherry pair) |
| `.btn-butter` / `.btn-outline` / `.btn-outline-light` | secondary hierarchy |
| `.sticker` | pill badge with a `0 2px 0` shadow — decorative only, `aria-hidden` |
| `.field` | white, `2px` `--color-line`, `0.75rem` radius, butter focus ring |
| `.rule` | 2 px `--color-line-soft` divider |

The hard offset shadow (no blur) is what makes the components read as *printed*
confectionery rather than generic SaaS cards. It is used on cards, stickers, chips and
primary buttons only — never on body text containers.

`rounded-[2rem]` with one square corner (`rounded-tr-none` / `rounded-bl-none`) is the
recurring image frame; the hero uses an arch (`rounded-t-[999px]`).

---

## 4. Layout

- One container: `.container-page`, `max-width: 80rem`, gutter `1.25rem → 2.5rem → 3rem`.
- Homepage alternates **colour field → photograph → colour field** rather than repeating
  a beige rhythm: vanilla → strawberry-soft → chocolate band → vanilla → chocolate →
  lavender-soft → vanilla → sky-soft → vanilla.
- The Explore Collections grid is 4 columns with the first card spanning 2 — the
  deliberate asymmetry that stops it reading as six equal tiles.
- Nothing is centred by default. Sections are composed left-heavy with the photograph
  offset right, or inverted.

---

## 5. Motion

Full rules and implementation notes are in `docs/MOTION.md`. The non-negotiables:

- Content is visible by default; animation is additive.
- `src/components/ui/Motion.jsx` and the `Reveal` / `StaggerGroup` / `StaggerItem`
  primitives are the **only** place raw `motion.*` may be used.
- Animation runs only when `IntersectionObserver` exists **and** the visitor has not
  asked for reduced motion.
- `useVisibilitySafety` forces anything on-screen visible after 1400 ms if its observer
  never fired.
- Decorative floats are the only infinite loops; they are `aria-hidden` and pause under
  `prefers-reduced-motion`.

---

## 6. Anti-patterns

- ❌ White text on any pastel.
- ❌ Three or more palette colours in one component.
- ❌ Colour without a job (every fill above has a documented role).
- ❌ Full-page parallax, autoplay carousels, marquees carrying essential information.
- ❌ Any element that starts at `opacity: 0` without the safety net.
- ❌ Inventing a bestseller badge, review, rating, opening hour or external ordering link.
