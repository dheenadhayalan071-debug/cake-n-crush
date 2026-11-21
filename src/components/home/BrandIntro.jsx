import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Reveal from '../ui/Reveal.jsx';
import Picture from '../media/Picture.jsx';
import { fadeUp, revealMask, useMotionVariants } from '../../lib/motion.js';
import { m as motion } from 'framer-motion';
import { PRODUCTS } from '../../data/products.js';

/**
 * Brand introduction.
 * Deliberately makes no claims about founding year, awards or scale —
 * only what the brief verifies: we are a bakery & cake shop in Madurai
 * and this is our catalogue.
 */
export default function BrandIntro() {
  const mask = useMotionVariants(revealMask);
  const catalogueSize = PRODUCTS.length;

  return (
    <section className="bg-cream py-16 md:py-24" aria-labelledby="intro-heading">
      <div className="container-page">
        <div className="grid gap-10 md:grid-cols-12 md:gap-14">
          <div className="md:col-span-5">
            <Reveal as="span" className="eyebrow">
              The bakery
            </Reveal>
            <Reveal as="h2" variants={fadeUp} id="intro-heading" className="display-lg mt-4 max-w-[16ch]">
              Cakes made for the moment, in Madurai.
            </Reveal>
          </div>

          <div className="md:col-span-7 md:pt-3">
            <Reveal className="space-y-5">
              <p className="text-lg leading-relaxed text-ink-soft md:text-xl">
                Cake N Crush is a bakery and cake shop in Park Town, Madurai. Our
                catalogue runs from eggless everyday cakes to celebration centrepieces,
                one-kilogram cakes and plum cakes by weight.
              </p>
              <p className="text-base leading-relaxed text-ink-soft">
                Every listing on this site shows the exact weight, dietary option and
                price for that variant — so you can choose with confidence before you
                ever message us. For a design that is entirely your own, start with the
                Custom Cake Studio.
              </p>
              <div className="flex flex-wrap items-center gap-5 pt-2">
                <Link
                  to="/about"
                  className="group inline-flex items-center gap-2 text-sm font-semibold text-ink transition-colors hover:text-caramel-deep"
                >
                  Read our story
                  <ArrowRight
                    className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </Link>
                <Link
                  to="/menu"
                  className="inline-flex items-center gap-2 text-sm font-medium text-ink-soft link-underline transition-colors hover:text-ink"
                >
                  Browse the catalogue
                </Link>
              </div>
            </Reveal>
          </div>
        </div>

        <div className="mt-14 grid gap-5 md:mt-16 md:grid-cols-12 md:items-end">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={mask}
            className="md:col-span-7"
          >
            <Picture
              name="brand-piping"
              alt="Illustrative editorial styling of a baker piping cream rosettes onto an iced cake"
              className="aspect-[16/11] w-full"
              sizes="(min-width: 768px) 55vw, 100vw"
            />
          </motion.div>
          <div className="grid grid-cols-2 gap-5 md:col-span-5 md:grid-cols-1 md:gap-6">
            <Reveal className="md:pl-6">
              <p className="font-display text-4xl leading-none text-ink md:text-5xl">
                {catalogueSize}
              </p>
              <p className="mt-2 max-w-[20ch] text-[0.8125rem] leading-snug text-ink-soft">
                cakes listed across our celebration, eggless, 1 kg and plum collections
              </p>
            </Reveal>
            <Reveal className="md:pl-6" delay={0.08}>
              <p className="font-display text-4xl leading-none text-ink md:text-5xl">2</p>
              <p className="mt-2 max-w-[20ch] text-[0.8125rem] leading-snug text-ink-soft">
                ways to order directly from us — WhatsApp and phone
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
