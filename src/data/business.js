/**
 * Business configuration — single source of truth for contact details,
 * ordering channels and official links.
 *
 * ⚠️  Every value marked `provisional` or `pending` requires owner approval
 *     before launch. See docs/MISSING-INFORMATION.md.
 */

const RAW_PHONE = '8838159344';
const COUNTRY_CODE = '91';

/** E.164 digits only, used for wa.me links. */
export const WHATSAPP_NUMBER = `${COUNTRY_CODE}${RAW_PHONE}`;

/** tel: href — India country code included. */
export const PHONE_HREF = `tel:+${COUNTRY_CODE}${RAW_PHONE}`;

/** Human readable phone number. */
export const PHONE_DISPLAY = '+91 88381 59344';

export const ADDRESS = {
  lines: [
    'No. 5, 12, RPK Complex',
    'Thirupathi Nagar, Park Town',
    'P&T Nagar, Madurai',
    'Tamil Nadu, India',
  ],
  locality: 'Madurai',
  region: 'Tamil Nadu',
  country: 'IN',
  /**
   * Pincode was not supplied with the brief and has therefore been left out
   * rather than guessed. Add it here once confirmed by the owner.
   */
  postalCode: null,
};

export const ADDRESS_ONE_LINE = ADDRESS.lines.join(', ');

/**
 * A Google Maps *search* link built from the verified address.
 * This is not a claim about a Google Business Profile listing.
 * Replace with the official listing / place URL once supplied.
 */
export const MAPS_SEARCH_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  `${ADDRESS_ONE_LINE}`,
)}`;

export const BUSINESS = {
  name: 'Cake N Crush',
  legalName: 'Cake N Crush',
  category: 'Bakery & Cake Shop',
  tagline: 'Patisserie & celebration cakes',
  city: 'Madurai',
  phoneDisplay: PHONE_DISPLAY,
  phoneNumber: RAW_PHONE,
  whatsappNumber: WHATSAPP_NUMBER,
  /** Provisional per the brief — confirm with the owner. */
  whatsappStatus: 'provisional',
  address: ADDRESS,
  addressOneLine: ADDRESS_ONE_LINE,
  mapsSearchUrl: MAPS_SEARCH_URL,

  /** Not supplied — never render as a real opening time. */
  openingHours: null,

  /** Official links: replace `null` with the verified URL when supplied. */
  swiggyUrl: null,
  zomatoUrl: null,
  instagramUrl: null,
  facebookUrl: null,
  googleBusinessUrl: null,

  /** The domain has not been purchased yet. */
  domain: null,

  email: null,
};

/**
 * Data that must be confirmed before this site is published for customers.
 * Rendered in the owner-facing docs, not in the public UI.
 */
export const PENDING_CONFIRMATIONS = [
  {
    id: 'logo',
    area: 'Brand assets',
    detail:
      'No logo file, brand sheet or menu photograph was supplied with the project. The header uses a provisional typographic lockup that can be replaced in one line.',
    blocking: true,
  },
  {
    id: 'menu-photos',
    area: 'Photography',
    detail:
      'Product and gallery photography is illustrative AI-generated styling, clearly labelled in the UI. Replace with the bakery’s own photographs before launch.',
    blocking: true,
  },
  {
    id: 'prices',
    area: 'Catalogue',
    detail:
      'All prices are transcribed from the brief and must be approved by the owner. Prices are shown exactly as supplied, per weight and dietary variant.',
    blocking: true,
  },
  {
    id: 'descriptions',
    area: 'Catalogue',
    detail:
      'Ingredient descriptions were not legible / not supplied, so no ingredients are claimed anywhere on the site. Descriptions can be added in src/data/products.js.',
    blocking: false,
  },
  {
    id: 'bestsellers',
    area: 'Catalogue',
    detail:
      'No product is marked bestseller. Set `bestseller: true` on confirmed items in src/data/products.js.',
    blocking: false,
  },
  {
    id: 'whatsapp',
    area: 'Ordering',
    detail:
      'WhatsApp number is provisional per the brief — confirm 8838159344 is correct and WhatsApp-enabled.',
    blocking: true,
  },
  {
    id: 'opening-hours',
    area: 'Contact',
    detail: 'Opening hours were not supplied and are intentionally not displayed.',
    blocking: false,
  },
  {
    id: 'swiggy-zomato',
    area: 'Ordering',
    detail:
      'Swiggy and Zomato listing URLs were not supplied. The UI states the links are pending instead of linking anywhere.',
    blocking: false,
  },
  {
    id: 'domain',
    area: 'SEO',
    detail:
      'No domain purchased. Canonical/OG URLs use a placeholder until VITE_SITE_URL is set at build time.',
    blocking: true,
  },
  {
    id: 'pincode',
    area: 'Contact',
    detail: 'Postal pincode was not supplied and is therefore omitted from the address.',
    blocking: false,
  },
  {
    id: 'pastries-brownies',
    area: 'Catalogue',
    detail:
      'Pastries and brownies are listed by the business but no products, variants or prices were supplied. The categories exist with an honest empty state.',
    blocking: false,
  },
  {
    id: 'testimonials',
    area: 'Social proof',
    detail:
      'No verified reviews were supplied. The testimonial slot renders only when real, attributable reviews are added to src/data/testimonials.js.',
    blocking: false,
  },
];
