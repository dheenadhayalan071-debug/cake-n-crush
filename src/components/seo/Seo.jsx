/**
 * Seo
 * ---
 * Declarative document metadata manager. Each route renders exactly one
 * <Seo/>; it updates <title>, meta tags, canonical and JSON-LD on change.
 *
 * Hand-rolled rather than react-helmet: ~0 dependencies, and this site has
 * six static routes.
 */
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { SITE_URL, SITE_NAME, SEO_DEFAULTS } from '../../data/site.js';

const MANAGED_ATTR = 'data-managed-seo';

function upsertMeta(attr, key, content) {
  if (content == null) return;
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    el.setAttribute(MANAGED_ATTR, '');
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function upsertLink(rel, href) {
  let el = document.head.querySelector(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    el.setAttribute(MANAGED_ATTR, '');
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

export default function Seo({
  title,
  description = SEO_DEFAULTS.description,
  path = '/',
  image = SEO_DEFAULTS.image,
  type = 'website',
  noindex = false,
  jsonLd = null,
  breadcrumbs = null,
}) {
  const location = useLocation();
  const url = `${SITE_URL}${path === '/' ? '/' : path.replace(/\/$/, '')}`;
  const fullTitle = title ? title.replace('%s', SITE_NAME) : SEO_DEFAULTS.defaultTitle;
  const absoluteImage = image.startsWith('http') ? image : `${SITE_URL}${image}`;

  useEffect(() => {
    document.title = fullTitle;

    upsertMeta('name', 'description', description);
    upsertMeta('name', 'robots', noindex ? 'noindex, follow' : 'index, follow');
    upsertMeta('name', 'theme-color', '#F8F4ED');

    upsertMeta('property', 'og:type', type);
    upsertMeta('property', 'og:site_name', SITE_NAME);
    upsertMeta('property', 'og:locale', SEO_DEFAULTS.locale);
    upsertMeta('property', 'og:title', fullTitle);
    upsertMeta('property', 'og:description', description);
    upsertMeta('property', 'og:url', url);
    upsertMeta('property', 'og:image', absoluteImage);
    upsertMeta('property', 'og:image:alt', SEO_DEFAULTS.imageAlt);

    upsertMeta('name', 'twitter:card', SEO_DEFAULTS.twitterCard);
    upsertMeta('name', 'twitter:title', fullTitle);
    upsertMeta('name', 'twitter:description', description);
    upsertMeta('name', 'twitter:image', absoluteImage);

    upsertLink('canonical', url);
  }, [fullTitle, description, url, absoluteImage, noindex, type, location.pathname]);

  // JSON-LD: one script node per page, replaced on route change.
  useEffect(() => {
    const id = 'structured-data-page';
    document.getElementById(id)?.remove();

    const graph = [];
    if (jsonLd) graph.push(...(Array.isArray(jsonLd) ? jsonLd : [jsonLd]));
    if (breadcrumbs?.length) {
      graph.push({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: breadcrumbs.map((crumb, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: crumb.name,
          item: `${SITE_URL}${crumb.path}`,
        })),
      });
    }
    if (!graph.length) return;

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = id;
    script.textContent = JSON.stringify(graph.length === 1 ? graph[0] : { '@context': 'https://schema.org', '@graph': graph });
    document.head.appendChild(script);

    return () => {
      document.getElementById(id)?.remove();
    };
  }, [jsonLd, breadcrumbs]);

  return null;
}
