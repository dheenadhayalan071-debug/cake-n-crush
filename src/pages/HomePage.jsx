import { useMemo } from 'react';
import Seo from '../components/seo/Seo.jsx';
import Hero from '../components/home/Hero.jsx';
import BrandIntro from '../components/home/BrandIntro.jsx';
import FeaturedCakes from '../components/home/FeaturedCakes.jsx';
import CategoryGrid from '../components/home/CategoryGrid.jsx';
import FlavourBand from '../components/home/FlavourBand.jsx';
import SignatureCollection from '../components/home/SignatureCollection.jsx';
import CustomCakePromo from '../components/home/CustomCakePromo.jsx';
import WhyUs from '../components/home/WhyUs.jsx';
import VisitStrip from '../components/home/VisitStrip.jsx';
import TestimonialBlock from '../components/home/TestimonialBlock.jsx';
import { bakerySchema } from '../lib/schema.js';
import { SITE_URL, SEO_DEFAULTS } from '../data/site.js';

export default function HomePage() {
  const jsonLd = useMemo(
    () => [
      bakerySchema(),
      {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        name: 'Cake N Crush',
        url: SITE_URL,
        inLanguage: 'en-IN',
        publisher: { '@id': `${SITE_URL}/#bakery` },
      },
    ],
    [],
  );

  return (
    <>
      <Seo
        title="Cake N Crush — Patisserie & Celebration Cakes in Madurai"
        description={SEO_DEFAULTS.description}
        path="/"
        jsonLd={jsonLd}
      />
      <Hero />
      <BrandIntro />
      <FeaturedCakes />
      <FlavourBand />
      <CategoryGrid />
      <SignatureCollection />
      <CustomCakePromo />
      <WhyUs />
      <TestimonialBlock />
      <VisitStrip />
    </>
  );
}
