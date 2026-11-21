import { Link } from 'react-router-dom';
import { m as motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Picture from '../media/Picture.jsx';
import Reveal from '../ui/Reveal.jsx';
import { useMotionVariants, revealMask, fadeUp } from '../../lib/motion.js';
import { PRODUCTS } from '../../data/products.js';
import { formatPrice, formatWeight } from '../../lib/format.js';

/**
 * Signature collection — a dark, full-bleed editorial interlude that
 * breaks up the light catalogue rhythm and gives the range a sense of
 * occasion. Names + real entry prices only.
 */
export default function SignatureCollection() {
  const mask = useMotionVariants(revealMask);
  const signatures = PRODUCTS.filter((product) =>
    ['death-by-chocolate', 'belgium-chocolate', 'red-velvet', 'black-forest'].includes(product.id),
  );

  return (
    <section className="noise-overlay bg-cocoa text-cream" aria-labelledby="signature-heading">
      <div className="container-page">
        <div className="grid gap-10 py-16 md:grid-cols-12 md:gap-12 md:py-24">
          <div className="md:col-span-5 md:sticky md:top-28 md:self-start">
            <Reveal as="span" className="eyebrow eyebrow--light">
              The signature list
            </Reveal>
            <Reveal as="h2" variants={fadeUp} id="signature-heading" className="display-lg mt-4 text-cream">
              The richer end of the counter.
            </Reveal>
            <Reveal as="p" variants={fadeUp} className="mt-5 max-w-md text-base leading-relaxed text-cream/65">
              Chocolate-led cakes with a deeper, more indulgent finish. Every price
              below corresponds to the listed weight and variant — nothing is averaged.
            </Reveal>
            <Reveal variants={fadeUp} className="mt-8">
              <Link
                to="/menu?category=celebration"
                className="group inline-flex items-center gap-2 border border-cream/25 px-5 py-3 text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-cream transition-colors duration-300 hover:border-cream hover:bg-cream hover:text-cocoa"
              >
                View the collection
                <ArrowRight
                  className="h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </Link>
            </Reveal>

            <div className="mt-10 hidden md:block">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={mask}
              >
                <Picture
                  name="texture-chocolate"
                  alt="Illustrative editorial macro styling of glossy dark chocolate ganache"
                  className="aspect-square w-full max-w-sm"
                  sizes="(min-width: 768px) 32vw, 100vw"
                />
              </motion.div>
            </div>
          </div>

          <div className="md:col-span-7">
            <ul className="divide-y divide-cream/12 border-y border-cream/12">
              {signatures.map((product, index) => {
                const variant = product.variants[0];
                return (
                  <motion.li
                    key={product.id}
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.6, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Link
                      to={`/menu?product=${product.id}`}
                      className="group flex items-baseline justify-between gap-4 py-6 transition-colors hover:text-cream md:py-7"
                    >
                      <span className="flex items-baseline gap-4">
                        <span
                          aria-hidden="true"
                          className="font-sans text-[0.625rem] tabular-nums tracking-[0.14em] text-cream/55"
                        >
                          0{index + 1}
                        </span>
                        <span>
                          <span className="block font-display text-2xl leading-tight text-cream transition-colors group-hover:text-caramel-tint md:text-[1.9rem]">
                            {product.name}
                          </span>
                          <span className="mt-1 block text-[0.6875rem] uppercase tracking-[0.12em] text-cream/60">
                            {variant.dietaryType} · {formatWeight(variant.weight)} · from{' '}
                            {formatPrice(variant.price)}
                          </span>
                        </span>
                      </span>
                      <ArrowRight
                        className="h-4 w-4 shrink-0 -translate-x-2 text-cream/40 opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100"
                        aria-hidden="true"
                      />
                    </Link>
                  </motion.li>
                );
              })}
            </ul>

            <p className="mt-6 text-[0.75rem] leading-relaxed text-cream/60">
              Additional weights and eggless variants for these cakes are listed on the menu page.
              Prices are provisional pending owner approval.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
