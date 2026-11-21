import { describe, expect, it } from 'vitest';
import {
  isValidPhone,
  isValidDate,
  validateEnquiry,
  validateImage,
  todayISO,
  IMAGE_RULES,
} from '../validation.js';

const validValues = {
  name: 'Priya Raman',
  phone: '9876543210',
  flavour: 'Red Velvet',
  weight: '1 kg',
  dietaryType: 'Eggless',
  theme: '30th birthday, gold and cream',
  message: 'Happy Birthday',
  requiredDate: '2026-12-24',
  instructions: 'Collect at 6pm',
};

/** Fixed "now" so date rules are deterministic. */
const NOW = new Date('2026-11-21T10:00:00');

describe('phone validation', () => {
  it.each(['9876543210', '98765 43210', '+91 98765 43210', '9876543210'.replace('9', '6')])(
    'accepts %s',
    (value) => expect(isValidPhone(value)).toBe(true),
  );

  it.each([
    ['1234567890', 'starts with 1'],
    ['98765', 'too short'],
    ['98765432101', 'too long'],
    ['', 'empty'],
    ['abcdefghij', 'not numeric'],
    ['+1 9876543210', 'wrong country code'],
  ])('rejects %s (%s)', (value) => {
    expect(isValidPhone(value)).toBe(false);
  });
});

describe('date validation', () => {
  it('accepts today', () => {
    expect(isValidDate(todayISO(NOW), NOW)).toBe(true);
  });

  it('accepts the future and rejects the past', () => {
    expect(isValidDate('2027-01-01', NOW)).toBe(true);
    expect(isValidDate('2026-11-20', NOW)).toBe(false);
  });

  it('rejects empty and garbage input', () => {
    expect(isValidDate('', NOW)).toBe(false);
    expect(isValidDate('not-a-date', NOW)).toBe(false);
  });
});

describe('custom cake enquiry validation', () => {
  it('passes a complete form', () => {
    const result = validateEnquiry(validValues, NOW);
    expect(result.valid).toBe(true);
    expect(result.errors).toEqual({});
  });

  it('requires name, phone, flavour, weight, dietary, theme and date', () => {
    const result = validateEnquiry({}, NOW);
    expect(result.valid).toBe(false);
    expect(Object.keys(result.errors).sort()).toEqual([
      'dietaryType',
      'flavour',
      'name',
      'phone',
      'requiredDate',
      'theme',
      'weight',
    ]);
  });

  it('treats optional message and instructions as optional', () => {
    const { message, instructions, ...required } = validValues;
    expect(validateEnquiry(required, NOW).valid).toBe(true);
  });

  it('rejects an overlong cake message', () => {
    const result = validateEnquiry({ ...validValues, message: 'x'.repeat(81) }, NOW);
    expect(result.errors.message).toMatch(/under 80/);
  });

  it('rejects a past date with a helpful message', () => {
    const result = validateEnquiry({ ...validValues, requiredDate: '2026-01-01' }, NOW);
    expect(result.errors.requiredDate).toMatch(/today or a future date/);
  });

  it('trims whitespace-only values as empty', () => {
    const result = validateEnquiry({ ...validValues, name: '   ', theme: '  ' }, NOW);
    expect(result.errors.name).toBeDefined();
    expect(result.errors.theme).toBeDefined();
  });

  it('rejects a single-character name', () => {
    expect(validateEnquiry({ ...validValues, name: 'P' }, NOW).errors.name).toBeDefined();
  });
});

describe('reference image validation', () => {
  it('allows no file', () => {
    expect(validateImage(null).valid).toBe(true);
  });

  it('accepts supported types under the size cap', () => {
    expect(
      validateImage({ type: 'image/jpeg', size: 1024 * 500 }).valid,
    ).toBe(true);
  });

  it('rejects an unsupported type', () => {
    const result = validateImage({ type: 'application/pdf', size: 1000 });
    expect(result.valid).toBe(false);
    expect(result.message).toMatch(/JPG/);
  });

  it('rejects a file over 5 MB', () => {
    const result = validateImage({ type: 'image/png', size: IMAGE_RULES.maxBytes + 1 });
    expect(result.valid).toBe(false);
    expect(result.message).toMatch(/5 MB/);
  });
});
