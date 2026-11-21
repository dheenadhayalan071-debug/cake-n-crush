import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Seo from '../components/seo/Seo.jsx';
import PageHeader from '../components/ui/PageHeader.jsx';
import Picture from '../components/media/Picture.jsx';
import Reveal from '../components/ui/Reveal.jsx';
import Button from '../components/ui/Button.jsx';
import { BUSINESS } from '../data/business.js';
import { PRODUCTS } from '../data/products.js';
import { bakerySchema } from '../lib/schema.js';
import { revealMask } from '../lib/motion.js';
import { m as motion } from 'framer-motion';
import { MotionDiv } from '../components/ui/Motion.jsx';

/**
 * About
 * -----
 * Only verified information appears here: business name, category, location
 * and the published catalogue. No founding year, founder story, awards or
 * scale claims — none were supplied, so none are invented.
 */
export default function AboutPage() {
  const mask = revealMask;
  const jsonLd = useMemo(() => bakerySchema(), []);
  const totals = useMemo(() => {
    const egglessFlavours = PRODUCTS.filter((p) => p.categories.includes('eggless')).length;
    const celebration = PRODUCTS.filter((p) => p.categories.includes('celebration')).length;
    const variants = PRODUCTS.reduce((sum, p) => sum + p.variants.length, 0);
    return { egglessFlavours, celebration, variants, products: PRODUCTS.length };
  }, []);

  return (
    <>
      <Seo
        title="About Cake N Crush — Bakery & Cake Shop in Madurai"
        description="Cake N Crush is a patisserie and cake shop in Park Town, Madurai, offering eggless cakes, celebration cakes, chocolate cakes, 1kg cakes, plum cakes and custom celebration designs."
        path="/about"
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'About', path: '/about' },
        ]}
        jsonLd={jsonLd}
      />

      <PageHeader
        tone="pistachio"
        eyebrow="About"
        title={
          <>
            A neighbourhood patisserie, with a{' '}
            <span className="display-script text-cherry">celebration</span> at its
            centre.
          </>
        }
        lede="We are a patisserie and cake shop in Park Town, Madurai. This is what we make, and how we would like ordering a cake to feel."
      />

      <div className="bg-vanilla">
        <div className="container-page">
          <div className="grid gap-10 py-14 md:grid-cols-12 md:gap-14 md:py-20">
            <div className="md:col-span-7">
              <Reveal as="h2" className="display-md max-w-[20ch]">
                Cakes for the moments Madurai gathers for.
              </Reveal>
              <Reveal className="mt-6 space-y-5 text-base leading-relaxed text-ink-soft">
                <p>
                  Cake N Crush sits at No. 5, 12, RPK Complex in Thirupathi Nagar,
                  Park Town — part of the P&amp;T Nagar neighbourhood of Madurai.
                </p>
                <p>
                  Our published catalogue lists {totals.products} cakes across the
                  celebration, eggless, one-kilogram and plum collections — {totals.variants}{' '}
                  priced variants in total. {totals.egglessFlavours} flavours are
                  available eggless, priced separately from the regular cake, and plum
                  cakes come in 100g, 250g and 500g sizes.
                </p>
                <p>
                  Alongside the listed cakes, the counter also carries pastries and
                  brownies. Those selections are being confirmed before they are priced
                  here, because we would rather show nothing than show something wrong.
                </p>
                <p>
                  For everything else — a themed birthday, an anniversary, a cake with a
                  particular message — the Custom Cake Studio exists to start that
                  conversation properly.
                </p>
              </Reveal>

              <div className="mt-8 flex flex-wrap gap-3">
                <Button to="/menu" variant="chocolate">
                  Explore the menu
                </Button>
                <Button to="/custom-cakes" variant="outline">
                  Custom cake studio
                </Button>
              </div>
            </div>

            <div className="md:col-span-5">
              <MotionDiv
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.25 }}
                variants={mask}
              >
                <Picture
                  name="cat-celebration"
                  alt="Illustrative editorial styling of a strawberry celebration cake beneath a butter-yellow arch"
                  className="aspect-[4/5] w-full rounded-[2rem] rounded-tr-none border-2 border-chocolate"
                  sizes="(min-width: 768px) 40vw, 100vw"
                  showPlaceholderNote
                />
              </MotionDiv>
            </div>
          </div>

          <hr className="rule my-0" />

          <div className="grid gap-3 py-12 sm:grid-cols-2 lg:grid-cols-4 md:py-14">
            {[
              { value: totals.products, label: 'cakes on the menu', bg: 'bg-strawberry-soft' },
              { value: totals.variants, label: 'priced variants', bg: 'bg-butter-soft' },
              { value: totals.egglessFlavours, label: 'eggless flavours', bg: 'bg-pistachio-soft' },
              { value: '3', label: 'plum cake sizes', bg: 'bg-lavender-soft' },
            ].map((stat) => (
              <Reveal
                key={stat.label}
                className={`rounded-2xl border-2 border-chocolate/10 px-5 py-4 ${stat.bg}`}
              >
                <p className="display-md text-chocolate">{stat.value}</p>
                <p className="mt-1 text-[0.75rem] font-semibold uppercase tracking-[0.1em] text-chocolate/55">
                  {stat.label}
                </p>
              </Reveal>
            ))}
          </div>

          <div className="grid gap-10 py-14 md:grid-cols-12 md:gap-14 md:py-20">
            <div className="md:col-span-4">
              <Reveal as="span" className="eyebrow">
                What we publish
              </Reveal>
              <Reveal as="h2" className="display-md mt-4 max-w-[14ch]">
                A short, honest list.
              </Reveal>
            </div>
            <div className="md:col-span-8">
              <dl className="divide-y divide-line-soft border-y border-line-soft">
                {[
                  {
                    term: 'What we sell',
                    detail:
                      'Celebration cakes, eggless cakes, 1kg cakes and plum cakes — with pastries and brownies at the counter.',
                  },
                  {
                    term: 'Where we are',
                    detail: BUSINESS.addressOneLine,
                  },
                  {
                    term: 'How to order',
                    detail:
                      'WhatsApp or phone, directly with the bakery. There is no online checkout and no card payment on this website.',
                  },
                  {
                    term: 'What we do not claim',
                    detail:
                      'No awards, ratings or years-in-business statements appear on this site, because none have been provided to us for publication.',
                  },
                ].map((item) => (
                  <Reveal as="div" key={item.term} className="grid gap-2 py-5 sm:grid-cols-3 sm:gap-6">
                    <dt className="text-[0.75rem] font-semibold uppercase tracking-[0.12em] text-ink-soft">
                      {item.term}
                    </dt>
                    <dd className="text-[0.9375rem] leading-relaxed text-ink sm:col-span-2">
                      {item.detail}
                    </dd>
                  </Reveal>
                ))}
              </dl>
            </div>
          </div>

          <div className="mb-16 grid gap-8 rounded-[2rem] border-2 border-chocolate bg-butter p-7 shadow-[0_5px_0_#3A251F] md:mb-24 md:grid-cols-12 md:p-10">
            <div className="md:col-span-8">
              <h2 className="display-md max-w-[22ch]">Planning something specific?</h2>
              <p className="mt-3 max-w-xl text-[0.9375rem] leading-relaxed text-chocolate/75">
                Share the date, the flavour and the idea. The bakery will tell you what is
                possible before anything is confirmed.
              </p>
            </div>
            <div className="flex items-end md:col-span-4 md:justify-end">
              <Link
                to="/contact"
                className="group inline-flex items-center gap-2 rounded-full bg-chocolate px-4 py-2.5 text-[0.6875rem] font-bold uppercase tracking-[0.1em] text-vanilla transition-transform hover:-translate-y-0.5"
              >
                Contact &amp; location
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
