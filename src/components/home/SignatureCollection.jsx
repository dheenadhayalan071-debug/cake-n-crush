import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Picture from '../media/Picture.jsx';
import Reveal from '../ui/Reveal.jsx';
import { revealMask } from '../../lib/motion.js';
import { PRODUCTS } from '../../data/products.js';
import { formatPrice, formatWeight } from '../../lib/format.js';
import { MotionDiv, MotionLi } from '../ui/Motion.jsx';

/**
 * The chocolate list — a full-bleed chocolate-brown interlude that gives the
 * page a dark beat between pastel sections. Names and real entry prices only,
 * read straight from the catalogue.
 */
export default function SignatureCollection() {
  const signatures = PRODUCTS.filter((product) => product.tone === 'chocolate').slice(0, 4);

  return (
    <section
      className="relative overflow-hidden bg-chocolate text-vanilla"
      aria-labelledby="signature-heading"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 top-0 h-96 w-96 rounded-full bg-cherry/15" />
        <div className="absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-butter/10" />
      </div>

      <div className="container-page relative">
        <div className="grid gap-10 py-16 md:grid-cols-12 md:gap-12 md:py-24">
          <div className="md:col-span-5 md:sticky md:top-28 md:self-start">
            <Reveal as="span" className="eyebrow eyebrow--light">
              The chocolate list
            </Reveal>
            <Reveal as="h2" id="signature-heading" className="display-lg mt-4 text-vanilla">
              For the ones who order{' '}
              <span className="display-script text-butter">dark</span>.
            </Reveal>
            <Reveal as="p" className="mt-5 max-w-md text-[0.9375rem] leading-relaxed text-vanilla/70">
              Truffle, ganache and layered chocolate cakes with a deeper finish. Every
              price below is the real price for that listed weight and variant — nothing
              is averaged.
            </Reveal>
            <Reveal className="mt-8">
              <Link
                to="/menu?category=chocolate"
                className="group inline-flex items-center gap-2 rounded-full bg-butter px-5 py-3 text-[0.6875rem] font-bold uppercase tracking-[0.12em] text-chocolate transition-transform hover:-translate-y-0.5"
              >
                The chocolate collection
                <ArrowRight
                  className="h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </Link>
            </Reveal>

            <div className="mt-10 hidden md:block">
              <MotionDiv
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={revealMask}
              >
                <Picture
                  name="texture-chocolate"
                  alt="Illustrative editorial macro styling of glossy dark chocolate ganache"
                  className="aspect-square w-full max-w-sm rounded-[1.5rem] border-2 border-vanilla/20"
                  sizes="(min-width: 768px) 32vw, 100vw"
                />
              </MotionDiv>
            </div>
          </div>

          <div className="md:col-span-7">
            <ul className="divide-y-2 divide-vanilla/10 border-y-2 border-vanilla/10">
              {signatures.map((product, index) => {
                const variant = product.variants[0];
                return (
                  <MotionLi
                    key={product.id}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.4 }}
                    variants={{
                      hidden: { opacity: 0, y: 18 },
                      visible: {
                        opacity: 1,
                        y: 0,
                        transition: { duration: 0.6, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] },
                      },
                    }}
                  >
                    <Link
                      to={`/menu?product=${product.id}`}
                      className="group flex items-center justify-between gap-4 py-5 transition-colors md:py-6"
                    >
                      <span className="flex items-baseline gap-4">
                        <span
                          aria-hidden="true"
                          className="font-sans text-[0.625rem] font-bold tabular-nums tracking-[0.14em] text-butter/70"
                        >
                          0{index + 1}
                        </span>
                        <span>
                          <span className="block font-display text-[1.5rem] leading-tight font-semibold text-vanilla transition-colors group-hover:text-butter md:text-[1.85rem]">
                            {product.name}
                          </span>
                          <span className="mt-1 block text-[0.625rem] font-semibold uppercase tracking-[0.12em] text-vanilla/55">
                            {variant.dietaryType} · {formatWeight(variant.weight)} ·{' '}
                            {formatPrice(variant.price)}
                          </span>
                        </span>
                      </span>
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 border-vanilla/25 text-vanilla/60 transition-colors group-hover:border-butter group-hover:bg-butter group-hover:text-chocolate">
                        <ArrowRight className="h-4 w-4" aria-hidden="true" />
                      </span>
                    </Link>
                  </MotionLi>
                );
              })}
            </ul>

            <p className="mt-6 text-[0.6875rem] leading-relaxed text-vanilla/55">
              Additional weights and eggless variants are listed on the menu page. Prices
              are provisional pending owner approval.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
