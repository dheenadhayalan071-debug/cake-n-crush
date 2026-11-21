/**
 * Structured data builders.
 *
 * Rules enforced here:
 *  - No aggregate rating / review — none are verified.
 *  - No openingHours — not supplied by the owner.
 *  - No "priceRange" claim beyond the verified catalogue span.
 *  - Product schema only for real catalogue entries with real prices.
 */
import { BUSINESS, ADDRESS, MAPS_SEARCH_URL } from '../data/business.js';
import { SITE_URL, SITE_NAME, SEO_DEFAULTS } from '../data/site.js';
import { PRODUCTS } from '../data/products.js';

export function bakerySchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Bakery',
    '@id': `${SITE_URL}/#bakery`,
    name: BUSINESS.name,
    description: SEO_DEFAULTS.description,
    url: SITE_URL,
    telephone: `+${BUSINESS.whatsappNumber}`,
    image: `${SITE_URL}${SEO_DEFAULTS.image}`,
    servesCuisine: 'Bakery, Cakes, Desserts',
    address: {
      '@type': 'PostalAddress',
      streetAddress: `${ADDRESS.lines[0]}, ${ADDRESS.lines[1]}`,
      addressLocality: ADDRESS.locality,
      addressRegion: ADDRESS.region,
      addressCountry: ADDRESS.country,
    },
    areaServed: {
      '@type': 'City',
      name: 'Madurai',
    },
    hasMap: MAPS_SEARCH_URL,
    /** Deliberately omitted until confirmed: openingHoursSpecification, priceRange. */
  };

  return schema;
}

export function productSchema(product) {
  const url = `${SITE_URL}/menu?product=${product.id}`;
  const offers = product.variants.map((variant) => ({
    '@type': 'Offer',
    name: `${product.name} — ${variant.dietaryType} ${variant.weight}`,
    price: String(variant.price),
    priceCurrency: 'INR',
    availability: 'https://schema.org/InStock',
    url,
  }));

  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: `${product.name} from ${SITE_NAME}, Madurai. Available in ${product.variants
      .map((v) => `${v.dietaryType} ${v.weight}`)
      .join(', ')}.`,
    brand: { '@type': 'Brand', name: SITE_NAME },
    category: 'Cake',
    offers,
    // Deliberately omitted: aggregate rating. No verified reviews exist.
  };
}

export const menuItemListSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Cake N Crush cake catalogue',
  numberOfItems: PRODUCTS.length,
  itemListElement: PRODUCTS.map((product, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: product.name,
    url: `${SITE_URL}/menu?product=${product.id}`,
  })),
});
