# Source photography

Files in this folder are the **input** to `scripts/build-images.mjs`, which generates the
responsive WebP set in `public/images/` plus `src/components/media/image-manifest.js`.

```bash
# 1. add a file here (JPG/PNG/WebP, ideally ≥ 1400px on the short edge)
# 2. regenerate derivatives + manifest
npm run images
# 3. point the data at it (src/data/imagery.js) and remove the placeholder flag
```

File names are the image keys used throughout `src/data/`. Renaming a file means renaming
every reference — `npm run audit` will catch any that point at a missing image.

## Current set (15 — illustrative placeholders)

`hero-cake`, `brand-piping`, `cat-celebration`, `cat-eggless`, `cat-1kg`, `cat-plum`,
`cat-pastries`, `cat-brownies`, `gallery-blackforest`, `gallery-redvelvet`,
`gallery-butterscotch`, `gallery-custom`, `texture-chocolate`, `texture-cream`,
`texture-berries`

All are AI-generated editorial styling standing in for the bakery's own photography. The UI
labels them as illustrative — see `docs/ASSETS.md`.

## Replacing a placeholder

Overwrite the file with the real photograph (same filename), run `npm run images`, then remove
the `placeholder: true` flag for that key in `src/data/imagery.js`. The "illustrative" caption
and alt-text prefix disappear automatically.

## Photography guidance for the shoot

To keep the editorial look consistent when the real photographs arrive:

- **Light** — one large window, side-lit, no on-camera flash. Shoot near a wall on the left.
- **Background** — warm cream plaster or unbleached linen, never pure white.
- **Props** — matte ceramic, stone, walnut. Avoid glossy plastics and coloured backdrops.
- **Framing** — 4:5 vertical for cakes, 16:11 landscape for process/craft shots.
- **Colour** — keep warmth; avoid blue-white balance and heavy saturation.
- **Negative space** — leave room above the cake; the layout places type there.
- **Output** — export at 1400px on the long edge, sRGB, quality ≥ 80 before the pipeline
  re-encodes to WebP.

Consistency across the set matters more than any single perfect frame.
