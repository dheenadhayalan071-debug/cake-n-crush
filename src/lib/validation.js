/**
 * Custom cake enquiry validation (pure + unit tested).
 * Rules are intentionally conservative: we validate format, not business
 * feasibility — the bakery confirms what can actually be made.
 */

export const FLAVOUR_OPTIONS = [
  'Black Forest',
  'Butterscotch',
  'Chocolate Truffle',
  'Death By Chocolate',
  'Red Velvet',
  'White Forest',
  'Vanilla',
  'Mango',
  'Strawberry',
  'Blackcurrant',
  'Blueberry',
  'Other / not sure',
];

export const WEIGHT_OPTIONS = ['500 g', '1 kg', '1.5 kg', '2 kg', 'Above 2 kg'];

export const DIETARY_OPTIONS = ['Regular', 'Eggless'];

/** Phone: 10-digit Indian mobile, tolerant of +91, spaces and hyphens. */
export function isValidPhone(value) {
  const digits = String(value || '').replace(/[\s\-()]/g, '');
  if (!/^(\+91)?\d{10}$/.test(digits)) return false;
  return /^[6-9]\d{9}$/.test(digits.replace(/^\+91/, ''));
}

export function todayISO(now = new Date()) {
  const offset = now.getTimezoneOffset();
  const local = new Date(now.getTime() - offset * 60 * 1000);
  return local.toISOString().slice(0, 10);
}

export function isValidDate(value, now = new Date()) {
  if (!value) return false;
  const date = new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) return false;
  const today = new Date(`${todayISO(now)}T00:00:00`);
  return date >= today;
}

export function validateEnquiry(values, now = new Date()) {
  const errors = {};

  const name = (values.name || '').trim();
  if (!name) errors.name = 'Please tell us your name.';
  else if (name.length < 2) errors.name = 'Please enter at least 2 characters.';
  else if (name.length > 80) errors.name = 'Please keep your name under 80 characters.';

  const phone = (values.phone || '').trim();
  if (!phone) errors.phone = 'A phone number is needed so the bakery can reply.';
  else if (!isValidPhone(phone)) errors.phone = 'Enter a valid 10-digit Indian mobile number.';

  if (!values.flavour) errors.flavour = 'Choose a flavour, or select “Other / not sure”.';
  if (!values.weight) errors.weight = 'Choose a cake weight.';
  if (!values.dietaryType) errors.dietaryType = 'Choose regular or eggless.';

  const theme = (values.theme || '').trim();
  if (!theme) errors.theme = 'Describe the theme or occasion.';
  else if (theme.length > 120) errors.theme = 'Please keep the theme under 120 characters.';

  const message = (values.message || '').trim();
  if (message.length > 80) errors.message = 'A message on a cake is usually under 80 characters.';

  if (!values.requiredDate) errors.requiredDate = 'Choose the date you need the cake.';
  else if (!isValidDate(values.requiredDate, now)) {
    errors.requiredDate = 'Please choose today or a future date.';
  }

  const instructions = (values.instructions || '').trim();
  if (instructions.length > 800) errors.instructions = 'Please keep instructions under 800 characters.';

  return { valid: Object.keys(errors).length === 0, errors };
}

/** Optional reference-image guard — validated before WhatsApp opens. */
export const IMAGE_RULES = {
  maxBytes: 5 * 1024 * 1024,
  acceptedTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/heic', 'image/heif'],
};

export function validateImage(file) {
  if (!file) return { valid: true };
  if (!IMAGE_RULES.acceptedTypes.includes(file.type)) {
    return { valid: false, message: 'Please choose a JPG, PNG, WebP or HEIC image.' };
  }
  if (file.size > IMAGE_RULES.maxBytes) {
    return { valid: false, message: 'Image is larger than 5 MB. Please choose a smaller file.' };
  }
  return { valid: true };
}
