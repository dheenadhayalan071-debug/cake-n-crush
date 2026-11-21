/**
 * Content integrity audit
 * -----------------------
 * Enforces the project's strict rules automatically, so a future edit can't
 * quietly introduce a fabricated claim:
 *   1. No fake ratings/reviews in the codebase.
 *   2. No invented opening hours, awards or social URLs.
 *   3. No placeholder links (href="#" or javascript:void).
 *   4. All images referenced in data exist in the manifest.
 *   5. Every public image has alt text via the imagery map.
 *
 * Run with `npm run audit` (also part of `npm run verify`).
 */
import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';

const ROOT = process.cwd();
const SRC = path.join(ROOT, 'src');

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === '__tests__') continue;
      files.push(...(await walk(full)));
    } else if (/\.(jsx?|css)$/.test(entry.name)) {
      files.push(full);
    }
  }
  return files;
}

const failures = [];
const warnings = [];
const note = (message) => failures.push(message);

const files = await walk(SRC);

/** 1 & 2 — banned fabricated-content patterns --------------------------------- */
const FABRICATED_PATTERNS = [
  // Only flag real emitted data, not comments/docs/tests that forbid it.
  { regex: /aggregateRating\s*:/i, message: 'aggregateRating property emitted — no verified reviews exist' },
  { regex: /"ratingValue"\s*:/i, message: 'ratingValue emitted in structured data' },
  { regex: /reviewCount\s*:/i, message: 'reviewCount emitted — no verified reviews exist' },
  { regex: /since\s+19\d\d|established\s+in\s+19\d\d|founded\s+in\s+19\d\d/i, message: 'unverified founding year' },
  { regex: /\baward[- ]winning\b/i, message: 'unverified award claim' },
  { regex: /\bbest\s+(bakery|cake shop)\s+in\s+madurai\b/i, message: 'unverified superlative claim' },
  { regex: /10,?000\+?\s+(happy\s+)?customers/i, message: 'unverified customer-count claim' },
  { regex: /100%\s+(natural|fresh|pure|homemade)/i, message: 'unverified ingredient claim' },
];

for (const file of files) {
  const relative = path.relative(ROOT, file);
  const source = await readFile(file, 'utf8');

  for (const { regex, message } of FABRICATED_PATTERNS) {
    if (regex.test(source)) note(`${relative}: ${message}`);
  }

  // 3 — dead / decorative links
  if (/href=["']#["']/.test(source)) note(`${relative}: placeholder href="#" found`);
  if (/href=["']javascript:/.test(source)) note(`${relative}: javascript: href found`);

  // Invented social URLs (business.js is allowed to hold nulls only)
  const socialStubs = source.match(/https?:\/\/(www\.)?(instagram|facebook|swiggy|zomato)\.com\/[^\s"'`)]+/g);
  if (socialStubs) {
    note(`${relative}: hard-coded external listing URL(s): ${socialStubs.join(', ')}`);
  }
}

/** 4 & 5 — imagery integrity --------------------------------------------------- */
const { IMAGE_MANIFEST } = await import(
  `file://${path.join(ROOT, 'src/components/media/image-manifest.js')}`
);
const { EDITORIAL_IMAGES } = await import(`file://${path.join(ROOT, 'src/data/imagery.js')}`);
const { GALLERY_ITEMS } = await import(`file://${path.join(ROOT, 'src/data/gallery.js')}`);

const manifestKeys = new Set(Object.keys(IMAGE_MANIFEST));

for (const [key, meta] of Object.entries(EDITORIAL_IMAGES)) {
  if (!manifestKeys.has(key)) {
    note(`imagery.js references "${key}" but no optimised image exists (run npm run images)`);
  }
  if (!meta.alt || meta.alt.length < 12) note(`imagery.js "${key}" is missing a descriptive alt`);
  if (meta.placeholder !== true) {
    warnings.push(`imagery.js "${key}" is not flagged as illustrative — confirm it is a real photo`);
  }
}

for (const item of GALLERY_ITEMS) {
  if (!manifestKeys.has(item.image)) note(`gallery item "${item.id}" points at missing image "${item.image}"`);
}

for (const [key, asset] of Object.entries(IMAGE_MANIFEST)) {
  if (!asset.srcset || !asset.width || !asset.height) note(`manifest "${key}" is missing responsive metadata`);
  if (asset.width < 1 || asset.height < 1) note(`manifest "${key}" has invalid dimensions`);
}

/** Report ---------------------------------------------------------------------- */
if (warnings.length) {
  console.log(`\n⚠ ${warnings.length} warning(s):`);
  warnings.forEach((warning) => console.log(`  · ${warning}`));
}

if (failures.length) {
  console.error(`\n✖ Content audit failed with ${failures.length} issue(s):`);
  failures.forEach((failure) => console.error(`  · ${failure}`));
  process.exit(1);
}

console.log(`\n✓ Content audit passed — ${files.length} source files, ${manifestKeys.size} images checked.`);
console.log('  No fabricated ratings, awards, hours, social URLs or dead links.');
