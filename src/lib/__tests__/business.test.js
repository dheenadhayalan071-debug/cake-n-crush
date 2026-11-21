/**
 * Business configuration integrity.
 * Guards against invented links/hours and formatting regressions.
 */
import { describe, expect, it } from 'vitest';
import {
  ADDRESS,
  BUSINESS,
  MAPS_SEARCH_URL,
  PHONE_DISPLAY,
  PHONE_HREF,
  WHATSAPP_NUMBER,
} from '../../data/business.js';
import { PENDING_CONFIRMATIONS } from '../../data/business.js';
import { bakerySchema } from '../schema.js';
import { TESTIMONIALS } from '../../data/testimonials.js';

describe('business configuration', () => {
  it('uses the supplied phone number for calls and WhatsApp', () => {
    expect(BUSINESS.phoneNumber).toBe('8838159344');
    expect(WHATSAPP_NUMBER).toBe('918838159344');
    expect(PHONE_HREF).toBe('tel:+918838159344');
    expect(PHONE_DISPLAY).toBe('+91 88381 59344');
  });

  it('keeps the address exactly as supplied', () => {
    expect(ADDRESS.lines).toEqual([
      'No. 5, 12, RPK Complex',
      'Thirupathi Nagar, Park Town',
      'P&T Nagar, Madurai',
      'Tamil Nadu, India',
    ]);
  });

  it('does not invent opening hours', () => {
    expect(BUSINESS.openingHours).toBeNull();
  });

  it('does not invent external listing URLs', () => {
    expect(BUSINESS.swiggyUrl).toBeNull();
    expect(BUSINESS.zomatoUrl).toBeNull();
    expect(BUSINESS.instagramUrl).toBeNull();
    expect(BUSINESS.domain).toBeNull();
  });

  it('builds a maps search URL from the real address', () => {
    expect(MAPS_SEARCH_URL).toContain('https://www.google.com/maps/search/?api=1&query=');
    expect(decodeURIComponent(MAPS_SEARCH_URL)).toContain('RPK Complex');
    expect(decodeURIComponent(MAPS_SEARCH_URL)).toContain('Madurai');
  });

  it('documents every pending business confirmation', () => {
    const ids = PENDING_CONFIRMATIONS.map((item) => item.id);
    expect(ids).toContain('logo');
    expect(ids).toContain('prices');
    expect(ids).toContain('whatsapp');
    expect(ids).toContain('swiggy-zomato');
    expect(ids).toContain('opening-hours');
    expect(PENDING_CONFIRMATIONS.every((item) => item.detail.length > 20)).toBe(true);
  });
});

describe('structured data', () => {
  const schema = bakerySchema();

  it('declares a Bakery with the verified name and phone', () => {
    expect(schema['@type']).toBe('Bakery');
    expect(schema.name).toBe('Cake N Crush');
    expect(schema.telephone).toBe('+918838159344');
  });

  it('includes the real locality', () => {
    expect(schema.address.addressLocality).toBe('Madurai');
    expect(schema.address.addressRegion).toBe('Tamil Nadu');
    expect(schema.address.addressCountry).toBe('IN');
  });

  it('contains no rating, review or opening-hours claims', () => {
    const json = JSON.stringify(schema);
    expect(json).not.toContain('aggregateRating');
    expect(json).not.toContain('review');
    expect(json).not.toContain('openingHours');
    expect(json).not.toContain('priceRange');
  });
});

describe('testimonials', () => {
  it('contains no fabricated reviews', () => {
    expect(TESTIMONIALS).toEqual([]);
  });
});
