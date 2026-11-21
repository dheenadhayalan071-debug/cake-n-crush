# Motion guide

The redesign leans on motion for personality, but the first rule has not changed since the
production outage that blanked the site:

> **No essential content may depend on JavaScript animation to be visible.**

Everything below exists to make animation additive rather than load-bearing.

---

## 1. The gating chain

```
useAnimationReady()
   ├── typeof IntersectionObserver === 'function'  (sync, first render)
   └── !useReducedMotion()                        (framer-motion)
        ↓ true                     ↓ false
   animate on mount         render plain, visible, NO inline style
```

`canAnimateNow()` is evaluated **synchronously on first render**, not in an effect, so
there is no flash of visible → hidden.

## 2. The safety net

`useVisibilitySafety(isAnimating)` starts a 1400 ms timer. When it fires it measures the
element: if it is on screen and still waiting on its observer, `forceVisible` flips the
element to `animate="visible"` and drops `whileInView`. Off-screen elements are left alone
so real scroll reveals still feel intentional.

This covers missed observers, a section inside a zero-height container, and bfcache
restores.

**The net is installed by the wrapper itself**, not by each call site:

- `src/components/ui/Motion.jsx` — `createMotion(tag)`; every `MotionDiv`, `MotionLi`,
  `MotionP`, `MotionH1`… installs it whenever a `whileInView` prop is present.
- `src/components/ui/Reveal.jsx` — single-element scroll reveal.
- `src/components/ui/StaggerGroup.jsx` + `StaggerItem.jsx` — sequence reveals.

These four files are the **only** place in `src/` allowed to reference `motion.*`.

## 3. What animates, and for how long

| Element | Motion | Duration / easing |
| --- | --- | --- |
| Hero headline block | `fadeUp` stagger, 80 ms apart | 750 ms, `cubic-bezier(.22,1,.36,1)` |
| Hero photograph | `revealMask` (clip-path wipe) | 1000 ms |
| Hero stickers | `fadeUp` + infinite float, 8 px | 6 s loop, `ease-in-out` |
| Section headings | `fadeUp` on entry | 750 ms |
| Product cards | stagger, 80 ms apart, 28 px rise | 750 ms |
| Collection tiles | stagger, 60 ms apart | 750 ms |
| Gallery items | fade + 14 px rise | 320 ms, 18 ms stagger capped at 160 ms |
| Chocolate list rows | fade + 18 px rise | 600 ms, 60 ms apart |
| Cards on hover | lift 4 px + soft scale 1.05 on the photo | 300 ms / 900 ms |
| Buttons | lift 2–3 px, shadow deepens | 280 ms |
| Marquee band | CSS `translate3d` loop | 46 s linear, pauses on hover |
| Mobile drawer | fade panel + 10 px link rise | 200–350 ms |
| Product dialog | 6 % rise + fade + 0.99 scale | 450 ms |

### Deliberate exclusions

- No bouncing, no spring overshoot on layout-bearing elements.
- No parallax, no scroll-jacking, no autoplay carousel.
- No element loops forever except the decorative stickers and the marquee.
- Nothing blocks scroll or traps input.

## 4. Reduced motion

`@media (prefers-reduced-motion: reduce)` in `src/styles/index.css`:

- animations and transitions collapse to `0.01 ms`;
- `scroll-behavior` returns to `auto`;
- the marquee stops and becomes a wrapped, centred list;
- decorative floats stop;
- every React animation path is already off via `useAnimationReady()`.

The layout is identical with motion on or off — only the transitions differ.

## 5. Performance notes

- All animation is transform/opacity only, so it stays on the compositor.
- `whileInView` uses `{ once: true }` everywhere; nothing re-animates on scroll back.
- The heavier Framer `domMax` feature bundle is **not** used (no layout animations), which
  keeps the runtime near 90 kB gzip for the whole app.
- The marquee is CSS, not a JS ticker, so it does not fight the main thread.

## 6. Guard tests

`src/test/visibility.test.jsx` (11 tests) fails the build if:

- a reveal renders hidden when `IntersectionObserver` is absent;
- a hero heading, CTA, product card or gallery item is not visibly rendered;
- any `<section>` on the homepage has zero opacity;
- a light eyebrow is used outside a chocolate panel (the dark-on-dark regression).

Run `npx vitest run src/test/visibility.test.jsx`.
