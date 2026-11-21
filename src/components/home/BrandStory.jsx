import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Picture from '../media/Picture.jsx';
import Reveal from '../ui/Reveal.jsx';
import { revealMask } from '../../lib/motion.js';
import { MotionDiv } from '../ui/Motion.jsx';

/**
 * Brand experience / story block
 * ------------------------------
 * Editorial storytelling built only from verified facts: the shop is in
 * Park Town, Madurai; cakes are made to order; the catalogue is priced by
 * weight and dietary variant. No founding year, no founder names, no awards,
 * no "since 19xx" — none of that was supplied.
 */
export default function BrandStory() {
  return (
    <section
      className="relative overflow-hidden bg-vanilla py-16 md:py-24"
      aria-labelledby="story-heading"
    >
      <div className="container-page">
        <div className="grid gap-10 md:grid-cols-12 md:items-center md:gap-14">
          {/* Photo collage */}
          <div className="md:col-span-6">
            <div className="relative">
              <MotionDiv
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={revealMask}
              >
                <Picture
                  name="texture-chocolate"
                  alt="Illustrative editorial macro styling of glossy dark chocolate ganache"
                  className="aspect-square w-[78%] rounded-[2rem] rounded-tl-none border-2 border-chocolate"
                  sizes="(min-width: 768px) 38vw, 80vw"
                />
              </MotionDiv>

              <MotionDiv
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={revealMask}
                className="absolute -bottom-8 right-0 w-[52%]"
              >
                <Picture
                  name="texture-berries"
                  alt="Illustrative editorial styling of berries and sprinkles resting on pink whipped cream"
                  className="aspect-square w-full rounded-[1.5rem] border-2 border-chocolate"
                  sizes="(min-width: 768px) 26vw, 55vw"
                />
              </MotionDiv>

              <span
                aria-hidden="true"
                className="absolute -left-3 -top-3 flex h-16 w-16 rotate-[-10deg] items-center justify-center rounded-full border-2 border-chocolate bg-butter font-display text-[0.6875rem] font-bold uppercase leading-tight tracking-[0.06em] text-chocolate shadow-[0_3px_0_#3A251F]"
              >
                Made
                <br />
                today
              </span>
            </div>
          </div>

          {/* Copy */}
          <div className="pt-8 md:col-span-6 md:pt-0">
            <Reveal as="span" className="eyebrow">
              The experience
            </Reveal>
            <Reveal as="h2" id="story-heading" className="display-lg mt-4">
              From our counter to your{' '}
              <span className="display-script text-cherry">table</span>.
            </Reveal>

            <Reveal as="p" className="lede mt-5">
              Everything on this site is made in our Park Town kitchen and collected
              from the shop — or arranged with us directly over a call or a WhatsApp
              message.
            </Reveal>

            <Reveal as="p" className="mt-4 text-[0.9375rem] leading-relaxed text-ink-soft">
              We show the exact weight, the dietary option and the price for every
              variant before you enquire, because choosing a cake should feel like a
              treat — not a negotiation.
            </Reveal>

            <Reveal className="mt-8 grid gap-3 sm:grid-cols-2">
              {[
                { label: 'Made to order', note: 'Baked for your date, not held in stock.' },
                { label: 'Eggless options', note: 'Across most celebration flavours.' },
                { label: 'Weight by weight', note: '100 g to 1 kg, priced individually.' },
                { label: 'Direct to the bakery', note: 'One WhatsApp message to the shop.' },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-xl border-2 border-chocolate/10 bg-butter-soft/70 px-4 py-3"
                >
                  <p className="font-display text-[0.9375rem] font-semibold leading-tight text-chocolate">
                    {item.label}
                  </p>
                  <p className="mt-0.5 text-[0.6875rem] leading-relaxed text-ink-soft">
                    {item.note}
                  </p>
                </div>
              ))}
            </Reveal>

            <Reveal className="mt-7">
              <Link
                to="/about"
                className="group inline-flex items-center gap-2 rounded-full bg-chocolate px-4 py-2.5 text-[0.6875rem] font-bold uppercase tracking-[0.1em] text-vanilla transition-transform hover:-translate-y-0.5"
              >
                More about the bakery
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
