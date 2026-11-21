/**
 * Imagery integrity.
 * Every product, collection and gallery item must resolve to a real generated
 * image, with truthful alt text that marks placeholders as illustrative.
 */
import { describe, expect, it } from 'vitest';
import { IMAGE_MANIFEST } from '../../components/media/image-manifest.js';
import {
  EDITORIAL_IMAGES,
  CATEGORY_IMAGE,
  PRODUCT_IMAGE,
  productImageKey,
  productImageAlt,
} from '../../data/imagery.js';
import { PRODUCTS, CATEGORIES } from '../../data/products.js';
import { GALLERY_ITEMS } from '../../data/gallery.js';

const available = new Set(Object.keys(IMAGE_MANIFEST));

describe('image manifest', () => {
  it('has generated a manifest', () => {
    expect(available.size).toBeGreaterThan(0);
  });

  it('exposes responsive metadata for every image', () => {
    Object.entries(IMAGE_MANIFEST).forEach(([key, asset]) => {
      expect(asset.src, key).toMatch(/^\/images\/.+\/[\w-]+-\d+\.webp$/);
      expect(asset.srcset, key).toMatch(/\d+w/);
      expect(asset.width, key).toBeGreaterThan(0);
      expect(asset.height, key).toBeGreaterThan(0);
      expect(asset.lqip, key).toMatch(/^data:image\/webp;base64,/);
    });
  });
});

describe('editorial image map', () => {
  it('only references images that exist', () => {
    Object.keys(EDITORIAL_IMAGES).forEach((key) => {
      expect(available.has(key), `missing generated file for "${key}"`).toBe(true);
    });
  });

  it('gives every image descriptive alt text', () => {
    Object.entries(EDITORIAL_IMAGES).forEach(([key, meta]) => {
      expect(meta.alt.length, key).toBeGreaterThan(20);
      expect(meta.alt, key).toMatch(/^Illustrative/);
    });
  });

  it('flags every current image as a placeholder', () => {
    Object.entries(EDITORIAL_IMAGES).forEach(([key, meta]) => {
      expect(meta.placeholder, `${key} should be flagged until real photography`).toBe(true);
    });
  });
});

describe('product imagery', () => {
  it('resolves every product to a generated image', () => {
    PRODUCTS.forEach((product) => {
      expect(available.has(productImageKey(product)), product.id).toBe(true);
    });
  });

  it('maps every flavour in the placeholder table to a real key', () => {
    Object.entries(PRODUCT_IMAGE).forEach(([productId, key]) => {
      expect(available.has(key), `${productId} → ${key}`).toBe(true);
    });
  });

  it('gives every product its own flavour-appropriate frame (no single shared card)', () => {
    const used = new Set(PRODUCTS.map(productImageKey));
    expect(used.size).toBeGreaterThanOrEqual(8);
  });

  it('keeps a distinct frame for the three plum products', () => {
    const plumKeys = PRODUCTS.filter((p) => p.categories.includes('plum')).map(productImageKey);
    expect(new Set(plumKeys)).toEqual(new Set(['cat-plum']));
  });

  it('marks placeholder alt text as illustrative and names the flavour', () => {
    const product = PRODUCTS.find((p) => p.id === 'red-velvet');
    const alt = productImageAlt(product);
    expect(alt).toMatch(/^Illustrative/);
    expect(alt).toContain('red velvet');
  });

  it('drops the illustrative prefix when a product has real photography', () => {
    const alt = productImageAlt({ id: 'x', name: 'Red Velvet', image: 'gallery-redvelvet' });
    // gallery-redvelvet is still a placeholder, so it stays labelled
    expect(alt).toMatch(/^Illustrative/);

    const real = productImageAlt({ id: 'y', name: 'Red Velvet', image: 'unmapped-real-photo' });
    expect(real).toBe('Photograph of the red velvet cake');
  });
});

describe('collection and gallery imagery', () => {
  it('resolves every catalogue category to a generated image', () => {
    CATEGORIES.forEach((category) => {
      const key = CATEGORY_IMAGE[category.id];
      expect(key, category.id).toBeDefined();
      expect(available.has(key), `${category.id} → ${key}`).toBe(true);
    });
  });

  it('gives each gallery item its own existing image', () => {
    const used = GALLERY_ITEMS.map((item) => item.image);
    used.forEach((key) => expect(available.has(key), key).toBe(true));
    expect(new Set(used).size).toBe(GALLERY_ITEMS.length);
  });

  it('describes every gallery item with its own alt text', () => {
    GALLERY_ITEMS.forEach((item) => {
      expect(item.alt, item.id).toMatch(/^Illustrative/);
      expect(item.alt.length, item.id).toBeGreaterThan(30);
    });
  });

  it('only uses gallery filters that match at least one item', () => {
    const filters = ['celebration', 'chocolate', 'eggless', 'custom', 'bakery'];
    filters.forEach((filter) => {
      const count = GALLERY_ITEMS.filter((item) => item.categories.includes(filter)).length;
      expect(count, filter).toBeGreaterThan(0);
    });
  });
});
