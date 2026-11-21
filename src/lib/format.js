/**
 * Money & message formatting helpers (pure functions — unit tested).
 */

/** Formats an integer rupee amount: 440 → "₹440". */
export function formatPrice(amount) {
  if (typeof amount !== 'number' || Number.isNaN(amount)) return '';
  const value = new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 }).format(amount);
  return `₹${value}`;
}

/** "500g" → "500 g", "1kg" → "1 kg" for readable prose. */
export function formatWeight(weight) {
  if (!weight) return '';
  return String(weight).replace(/(\d+(?:\.\d+)?)\s*(kg|g)/i, (_, n, unit) => `${n} ${unit.toLowerCase()}`);
}

/** Human label for a variant: "Regular · 500 g". */
export function variantLabel(variant) {
  if (!variant) return '';
  return `${variant.dietaryType} · ${formatWeight(variant.weight)}`;
}

/** 2026-11-21 → "21 November 2026". */
export function formatDateLong(isoDate) {
  if (!isoDate) return '';
  const date = new Date(`${isoDate}T00:00:00`);
  if (Number.isNaN(date.getTime())) return isoDate;
  return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
}

/** Collapses whitespace so generated messages never contain ragged gaps. */
export function tidy(text) {
  return String(text ?? '')
    .replace(/[ \t]+/g, ' ')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}
