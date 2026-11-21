import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Reveal from '../ui/Reveal.jsx';
import Picture from '../media/Picture.jsx';
import { fadeUp, revealMask } from '../../lib/motion.js';
import { PRODUCTS } from '../../data/products.js';
import { MotionDiv } from '../ui/Motion.jsx';

/**
 * Brand introduction
 * ------------------
 * Editorial two-column opener with a butter-yellow quote card, a tall
 * piping photograph and two verified facts. No founding year, no awards,
 * no scale claims — only what the brief actually verifies.
 */
export default function BrandIntro() {
  const catalogueSize = PRODUCTS.length;

  return (
    <section className="relative overflow-hidden bg-vanilla py-16 md:py-24" aria-labelledby="intro-heading">
      <div className="container-page">
        <div className="grid gap-10 md:grid-cols-12 md:gap-12 lg:items-center">
          {/* -------------------------- Copy -------------------------- */}
          <div className="md:col-span-6">
            <Reveal as="span" className="eyebrow">
              The bakery
            </Reveal>
            <Reveal as="h2" variants={fadeUp} id="intro-heading" className="display-lg mt-4">
              A small Madurai kitchen,{' '}
              <span className="display-script text-cherry">obsessed</span> with the
              details.
            </Reveal>

            <Reveal as="p" className="lede mt-6">
              Cake N Crush is a patisserie and cake shop in Park Town, Madurai. Our
              counter runs from eggless everyday cakes to celebration centrepieces,
              one-kilogram cakes and plum cakes sold by weight.
            </Reveal>

            <Reveal as="p" className="mt-4 max-w-[34rem] text-[0.9375rem] leading-relaxed text-ink-soft">
              Every listing on this site shows the exact weight, dietary option and
              price for that variant — so you can choose with confidence before you
              message us. For a design that is entirely your own, start with the
              Custom Cake Studio.
            </Reveal>

            <Reveal className="mt-7">
              <Link to="/about" className="btn btn-outline">
                Read our story
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </Reveal>
          </div>

          {/* ------------------------- Imagery ------------------------ */}
          <div className="relative md:col-span-6">
            <MotionDiv
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={revealMask}
            >
              <Picture
                name="brand-piping"
                alt="Illustrative editorial styling of a baker piping pink buttercream rosettes onto a pastel cake"
                className="aspect-[4/5] w-full rounded-[2rem] rounded-tr-none border-2 border-chocolate sm:aspect-[5/6]"
                sizes="(min-width: 768px) 46vw, 92vw"
              />
            </MotionDiv>

            {/* Butter quote card overlapping the photo */}
            <Reveal
              delay={0.12}
              className="relative z-10 -mt-14 mr-2 ml-6 rounded-2xl border-2 border-chocolate bg-butter p-5 shadow-[0_5px_0_#3A251F] sm:-mt-20 sm:ml-10 sm:mr-0 sm:max-w-[19rem]"
            >
              <p className="font-display text-[1.375rem] leading-snug font-semibold text-chocolate">
                “Made to order, never sitting in a cabinet.”
              </p>
              <p className="mt-2 text-[0.75rem] leading-relaxed text-chocolate/70">
                Cakes for the moment you are celebrating.
              </p>
            </Reveal>

            {/* Verified stats */}
            <Reveal delay={0.08} className="mt-7 grid grid-cols-2 gap-4 sm:gap-6">
              <div className="rounded-2xl border-2 border-chocolate/10 bg-strawberry-soft p-4">
                <p className="display-md text-cherry">{catalogueSize}</p>
                <p className="mt-1 text-[0.75rem] leading-snug text-chocolate/70">
                  cakes listed across our four collections
                </p>
              </div>
              <div className="rounded-2xl border-2 border-chocolate/10 bg-sky-soft p-4">
                <p className="display-md">2</p>
                <p className="mt-1 text-[0.75rem] leading-snug text-chocolate/70">
                  ways to order directly — WhatsApp and phone
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
