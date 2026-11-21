import { describe, expect, it } from 'vitest';
import {
  buildWhatsAppUrl,
  customCakeMessage,
  generalEnquiryMessage,
  productEnquiryMessage,
} from '../whatsapp.js';
import { PRODUCTS } from '../../data/products.js';

const URL_PREFIX = 'https://wa.me/918838159344?text=';

function decode(url) {
  expect(url.startsWith(URL_PREFIX)).toBe(true);
  return decodeURIComponent(url.slice(URL_PREFIX.length));
}

describe('WhatsApp link generation', () => {
  it('uses the configured business number', () => {
    const url = buildWhatsAppUrl('Hello');
    expect(url).toBe(`${URL_PREFIX}Hello`);
  });

  it('encodes text safely', () => {
    const url = buildWhatsAppUrl('Cake & coffee? 100% yes #1');
    expect(url).toContain(encodeURIComponent('Cake & coffee? 100% yes #1'));
    expect(url).not.toContain('#1');
  });

  it('strips formatting characters from the number', () => {
    const url = buildWhatsAppUrl('Hi', '+91 88381-59344');
    expect(url.startsWith('https://wa.me/918838159344')).toBe(true);
  });

  it('builds an empty-text link without a dangling query', () => {
    expect(buildWhatsAppUrl('')).toBe('https://wa.me/918838159344');
  });

  it('includes the exact variant and price in a product enquiry', () => {
    const product = PRODUCTS.find((p) => p.id === 'black-forest');
    const variant = product.variants.find((v) => v.weight === '1kg');
    const text = decode(
      buildWhatsAppUrl(productEnquiryMessage({ product, variant, quantity: 2 })),
    );
    expect(text).toContain('Black Forest');
    expect(text).toContain('Regular · 1 kg');
    expect(text).toContain('₹840');
    expect(text).toContain('Quantity: 2');
    expect(text).not.toContain('undefined');
  });

  it('distinguishes eggless 500g pricing from regular', () => {
    const product = PRODUCTS.find((p) => p.id === 'black-forest');
    const eggless = product.variants.find((v) => v.dietaryType === 'Eggless');
    const text = decode(buildWhatsAppUrl(productEnquiryMessage({ product, variant: eggless })));
    expect(text).toContain('Eggless · 500 g');
    expect(text).toContain('₹390');
    expect(text).not.toContain('₹440');
  });

  it('falls back to a general enquiry when no variant is supplied', () => {
    const text = decode(buildWhatsAppUrl(productEnquiryMessage({ product: null })));
    expect(text).toContain('Hello Cake N Crush');
  });

  it('includes only filled custom-cake fields', () => {
    const text = decode(
      buildWhatsAppUrl(
        customCakeMessage({
          name: 'Priya',
          phone: '9876543210',
          flavour: 'Red Velvet',
          weight: '1 kg',
          dietaryType: 'Eggless',
          theme: 'Birthday',
          message: 'Happy Birthday',
          requiredDate: '2026-12-24',
          instructions: '',
          hasReferenceImage: true,
        }),
      ),
    );
    expect(text).toContain('Name: Priya');
    expect(text).toContain('Weight: 1 kg');
    expect(text).toContain('Required date: 24 December 2026');
    expect(text).toContain('reference image');
    expect(text).not.toContain('Additional instructions');
    expect(text).not.toContain('undefined');
  });

  it('states that the enquiry is not a confirmed order', () => {
    const text = customCakeMessage({ name: 'A' });
    expect(text.toLowerCase()).toContain('not a confirmed order');
  });

  it('produces a context-aware general message', () => {
    expect(generalEnquiryMessage('menu page')).toContain('menu page');
  });
});
