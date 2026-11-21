/**
 * Site-level configuration: canonical URL, navigation, SEO defaults.
 */

const configured = (import.meta.env?.VITE_SITE_URL || '').trim().replace(/\/+$/, '');

/**
 * The domain has not been purchased. Until `VITE_SITE_URL` is provided at
 * build time, canonical and Open Graph URLs point at this documented
 * placeholder. `SITE_URL_IS_PLACEHOLDER` is surfaced in the docs.
 */
export const SITE_URL = configured || 'https://cakencrush.example.com';
export const SITE_URL_IS_PLACEHOLDER = configured === '';

export const SITE_NAME = 'Cake N Crush';

export const SEO_DEFAULTS = {
  titleTemplate: '%s · Cake N Crush',
  defaultTitle: 'Cake N Crush — Patisserie & Celebration Cakes in Madurai',
  description:
    'Cake N Crush is a patisserie and cake shop in Park Town, Madurai. Explore eggless cakes, celebration cakes, 1kg cakes, plum cakes, pastries and custom celebration cakes made for your moment.',
  image: '/images/hero-cake/hero-cake-900.webp',
  imageAlt:
    'Illustrative editorial styling of a pink two-tier celebration cake with cherries',
  twitterCard: 'summary_large_image',
  locale: 'en_IN',
};

export const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'Menu', to: '/menu' },
  { label: 'Gallery', to: '/gallery' },
  { label: 'Custom Cakes', to: '/custom-cakes' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
];

export const FOOTER_LINKS = {
  explore: [
    { label: 'Our Menu', to: '/menu' },
    { label: 'Gallery', to: '/gallery' },
    { label: 'Custom Cake Studio', to: '/custom-cakes' },
    { label: 'About Us', to: '/about' },
    { label: 'Contact & Location', to: '/contact' },
  ],
  collections: [
    { label: 'Eggless Cakes', to: '/menu?category=eggless' },
    { label: 'Celebration Cakes', to: '/menu?category=celebration' },
    { label: '1 kg Cakes', to: '/menu?category=onekg' },
    { label: 'Plum Cakes', to: '/menu?category=plum' },
  ],
};
