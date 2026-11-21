/**
 * WhatsApp + telephone link builders.
 *
 * Pure functions so they can be unit tested and reused by every CTA.
 * We never claim an enquiry is confirmed — only that the app opened with a
 * pre-filled message that the customer still has to send.
 */
import { BUSINESS } from '../data/business.js';
import { formatPrice, formatDateLong, formatWeight, tidy } from './format.js';

const BASE = 'https://wa.me';

/** Builds a wa.me URL for the configured business number. */
export function buildWhatsAppUrl(message, number = BUSINESS.whatsappNumber) {
  const digits = String(number).replace(/[^\d]/g, '');
  const text = tidy(message);
  return `${BASE}/${digits}${text ? `?text=${encodeURIComponent(text)}` : ''}`;
}

/** Generic enquiry used by header, footer and the mobile action bar. */
export function generalEnquiryMessage(context = 'website') {
  return tidy(`Hello Cake N Crush! I found you on the ${context} and would like to ask about your cakes.`);
}

/**
 * Product enquiry — includes the exact variant and price so the bakery can
 * answer without a back-and-forth.
 */
export function productEnquiryMessage({ product, variant, quantity = 1, note = '' }) {
  if (!product || !variant) return generalEnquiryMessage();
  const lines = [
    'Hello Cake N Crush!',
    '',
    `I would like to enquire about the ${product.name}.`,
    `Variant: ${variant.dietaryType} · ${formatWeight(variant.weight)}`,
    `Price shown on your website: ${formatPrice(variant.price)}`,
  ];
  if (quantity > 1) lines.push(`Quantity: ${quantity}`);
  if (note) lines.push(`Note: ${note}`);
  lines.push('', 'Could you confirm availability and how to place the order?');
  return tidy(lines.join('\n'));
}

/**
 * Custom cake enquiry. Only fields the customer actually filled in are
 * included, so empty placeholders never reach the bakery.
 */
export function customCakeMessage(details) {
  const {
    name,
    phone,
    flavour,
    weight,
    dietaryType,
    theme,
    message,
    requiredDate,
    instructions,
    hasReferenceImage,
  } = details || {};

  const lines = [
    'Hello Cake N Crush!',
    '',
    'I would like to enquire about a custom celebration cake.',
    '',
    `Name: ${name || '—'}`,
  ];
  if (phone) lines.push(`Phone: ${phone}`);
  if (flavour) lines.push(`Flavour: ${flavour}`);
  if (weight) lines.push(`Weight: ${formatWeight(weight)}`);
  if (dietaryType) lines.push(`Preference: ${dietaryType}`);
  if (theme) lines.push(`Theme / celebration: ${theme}`);
  if (message) lines.push(`Message on cake: ${message}`);
  if (requiredDate) lines.push(`Required date: ${formatDateLong(requiredDate)}`);
  if (instructions) lines.push('', `Additional instructions: ${instructions}`);
  lines.push(
    '',
    'Please confirm whether this is possible and share the price. I understand this enquiry is not a confirmed order.',
  );
  if (hasReferenceImage) {
    lines.push('', 'I have a reference image to share — I will attach it to this chat.');
  }
  return tidy(lines.join('\n'));
}
