import { useMemo } from 'react';
import Seo from '../components/seo/Seo.jsx';
import Hero from '../components/home/Hero.jsx';
import BrandIntro from '../components/home/BrandIntro.jsx';
import FeaturedCakes from '../components/home/FeaturedCakes.jsx';
import CategoryGrid from '../components/home/CategoryGrid.jsx';
import FlavourBand from '../components/home/FlavourBand.jsx';
import SignatureCollection from '../components/home/SignatureCollection.jsx';
import CustomCakePromo from '../components/home/CustomCakePromo.jsx';
import BrandStory from '../components/home/BrandStory.jsx';
import WhyUs from '../components/home/WhyUs.jsx';
import TestimonialBlock from '../components/home/TestimonialBlock.jsx';
import VisitStrip from '../components/home/VisitStrip.jsx';
import { bakerySchema } from '../lib/schema.js';
import { SITE_URL, SEO_DEFAULTS } from '../data/site.js';

/**
 * Homepage running order
 * ----------------------
 *  1. announcement strip + nav   (in Layout)
 *  2. hero                       Life is better with cake.
 *  3. brand intro                who we are, with photography
 *  4. featured collection        four real cakes, real prices
 *  5. flavour band               thin chocolate marquee
 *  6. explore collections        six collections, six colour treatments
 *  7. the chocolate list         dark editorial interlude
 *  8. custom cake studio         the bespoke process
 *  9. brand story                experience / craft
 * 10. reviews                    honest empty state (verified only)
 * 11. why us                    four verifiable promises
 * 12. visit & order             address, phone, hours status
 */
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
      <BrandStory />
      <TestimonialBlock />
      <WhyUs />
      <VisitStrip />
    </>
  );
}
