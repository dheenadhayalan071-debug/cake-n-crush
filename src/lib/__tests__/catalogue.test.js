/**
 * Catalogue integrity tests — these encode the brief's price table.
 * If a price or variant changes without intentional sign-off, these fail.
 */
import { describe, expect, it } from 'vitest';
import { PRODUCTS, CATEGORIES, PENDING_CATEGORIES } from '../../data/products.js';

/** Expected variants keyed by product id. Source: brief (provisional prices). */
const EXPECTED = {
  'black-forest': [
    ['Regular', '500g', 440],
    ['Regular', '1kg', 840],
    ['Eggless', '500g', 390],
  ],
  butterscotch: [
    ['Regular', '500g', 440],
    ['Regular', '1kg', 800],
    ['Eggless', '500g', 390],
  ],
  'triple-layer': [
    ['Regular', '500g', 440],
    ['Eggless', '500g', 390],
  ],
  'creamy-vanilla': [
    ['Regular', '500g', 440],
    ['Eggless', '500g', 390],
  ],
  mango: [
    ['Regular', '500g', 440],
    ['Eggless', '500g', 390],
  ],
  strawberry: [
    ['Regular', '500g', 440],
    ['Eggless', '500g', 390],
  ],
  'white-forest': [
    ['Regular', '500g', 480],
    ['Eggless', '500g', 440],
  ],
  blackcurrant: [
    ['Regular', '500g', 480],
    ['Eggless', '500g', 440],
  ],
  'chocolate-truffle': [
    ['Regular', '500g', 480],
    ['Eggless', '500g', 450],
  ],
  'scotch-forest': [['Regular', '500g', 480]],
  blueberry: [
    ['Regular', '500g', 540],
    ['Eggless', '500g', 490],
  ],
  'double-choco-chip': [
    ['Regular', '500g', 540],
    ['Eggless', '500g', 490],
  ],
  'death-by-chocolate': [
    ['Regular', '500g', 540],
    ['Eggless', '500g', 490],
  ],
  'red-velvet': [
    ['Regular', '500g', 580],
    ['Eggless', '500g', 580],
  ],
  'belgium-chocolate': [['Regular', '500g', 580]],
  'royal-plum-100g': [['Regular', '100g', 90]],
  'royal-plum-250g': [['Regular', '250g', 249]],
  'rich-plum-500g': [['Regular', '500g', 500]],
};

const tuple = (variant) => [variant.dietaryType, variant.weight, variant.price];

describe('catalogue', () => {
  it('has a unique id for every product', () => {
    const ids = PRODUCTS.map((product) => product.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('contains exactly the 18 products from the brief', () => {
    expect(PRODUCTS.map((p) => p.id).sort()).toEqual(Object.keys(EXPECTED).sort());
  });

  it.each(Object.entries(EXPECTED))('%s matches the brief variant prices', (id, variants) => {
    const product = PRODUCTS.find((item) => item.id === id);
    expect(product).toBeDefined();
    expect(product.variants.map(tuple)).toEqual(variants);
  });

  it('never applies a single price across different weights', () => {
    const blackForest = PRODUCTS.find((p) => p.id === 'black-forest');
    const fiveHundred = blackForest.variants.find((v) => v.weight === '500g' && v.dietaryType === 'Regular');
    const oneKg = blackForest.variants.find((v) => v.weight === '1kg');
    expect(fiveHundred.price).toBe(440);
    expect(oneKg.price).toBe(840);
  });

  it('gives every variant a stable unique id within its product', () => {
    PRODUCTS.forEach((product) => {
      const ids = product.variants.map((v) => v.id);
      expect(new Set(ids).size).toBe(ids.length);
      ids.forEach((id) => expect(id).toMatch(/^(regular|eggless)-[\w.]+$/));
    });
  });

  it('marks no product as a bestseller (requires owner confirmation)', () => {
    expect(PRODUCTS.every((product) => product.bestseller === false)).toBe(true);
    expect(PRODUCTS.every((product) => product.bestsellerStatus === 'pending-owner-confirmation')).toBe(true);
  });

  it('makes no ingredient claims in descriptions', () => {
    expect(PRODUCTS.every((product) => product.description === null)).toBe(true);
  });

  it('derives priceFrom / priceTo correctly', () => {
    const blackForest = PRODUCTS.find((p) => p.id === 'black-forest');
    expect(blackForest.priceFrom).toBe(390);
    expect(blackForest.priceTo).toBe(840);
  });

  it('has categories matching the brief plus the derived chocolate collection', () => {
    expect(CATEGORIES.map((c) => c.id)).toEqual([
      'celebration',
      'eggless',
      'chocolate',
      'onekg',
      'plum',
      'pastries',
      'brownies',
    ]);
    expect(PENDING_CATEGORIES).toEqual(['pastries', 'brownies']);
  });

  it('derives the chocolate collection from product tone, never by hand', () => {
    const chocolate = PRODUCTS.filter((p) => p.categories.includes('chocolate'));
    expect(chocolate.length).toBeGreaterThan(0);
    chocolate.forEach((product) => expect(product.tone).toBe('chocolate'));
    PRODUCTS.forEach((product) => {
      if (product.tone === 'chocolate') {
        expect(product.categories).toContain('chocolate');
      }
    });
  });

  it('prices pastries and brownies at nothing (not invented)', () => {
    const pending = PRODUCTS.filter((p) =>
      p.categories.some((c) => c === 'pastries' || c === 'brownies'),
    );
    expect(pending).toHaveLength(0);
  });

  it('features exactly four catalogue products on the homepage', () => {
    expect(PRODUCTS.filter((p) => p.featured)).toHaveLength(4);
  });
});
