import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Star } from 'lucide-react';
import Picture from '../media/Picture.jsx';
import { fadeUp, revealMask, staggerParent } from '../../lib/motion.js';
import { MotionDiv, MotionH1, MotionP, MotionSpan } from '../ui/Motion.jsx';
import { BUSINESS, PHONE_HREF, ADDRESS } from '../../data/business.js';

/**
 * Hero
 * ----
 * Asymmetric editorial composition: the headline owns the left column and
 * deliberately overruns its grid track, while the cake sits in an arched
 * butter-yellow frame on the right. Two stickers are decorative only —
 * `aria-hidden`, and nothing essential lives inside them.
 */
export default function Hero() {
  const textParent = staggerParent(0.08, 0.12);
  const item = fadeUp;

  return (
    <section
      className="relative overflow-hidden bg-vanilla"
      aria-labelledby="hero-heading"
    >
      {/* Colour fields — decorative, behind everything, never over content */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -left-28 -top-24 h-[26rem] w-[26rem] rounded-full bg-strawberry-soft blur-[2px] md:h-[34rem] md:w-[34rem]" />
        <div className="absolute right-[-10%] top-1/3 h-[22rem] w-[22rem] rounded-full bg-sky-soft md:h-[30rem] md:w-[30rem]" />
        <div className="absolute -bottom-32 left-1/3 h-[20rem] w-[20rem] rounded-full bg-butter-soft md:h-[26rem] md:w-[26rem]" />
      </div>

      <div className="container-page relative">
        <div className="grid items-center gap-10 pt-8 pb-16 md:grid-cols-12 md:gap-6 md:pt-12 md:pb-24 lg:pb-28">
          {/* ---------------------------- Copy ---------------------------- */}
          <MotionDiv
            initial="hidden"
            animate="visible"
            variants={textParent}
            className="relative z-10 md:col-span-7 lg:col-span-7 md:pr-4"
          >
            <MotionDiv variants={item} className="flex flex-wrap items-center gap-2">
              <span className="sticker bg-butter">
                <Sparkles className="h-3 w-3" aria-hidden="true" />
                Baked in Madurai
              </span>
              <span className="inline-flex items-center gap-1.5 text-[0.6875rem] font-bold uppercase tracking-[0.16em] text-ink-soft">
                <Star className="h-3 w-3 fill-cherry text-cherry" aria-hidden="true" />
                Eggless options daily
              </span>
            </MotionDiv>

            <MotionH1
              id="hero-heading"
              variants={item}
              className="display-hero mt-5 text-chocolate"
            >
              {/*
                Each line is a block-level <span> for deliberate layout breaks,
                with an explicit space between them so the accessible name
                reads "Life is better with cake." rather than "Life isbetter
                withcake." The visual line breaks come from display:block.
              */}
              <span className="block">Life is</span>{' '}
              <span className="block">
                <span className="display-script text-cherry">better</span> with
              </span>{' '}
              <span className="relative inline-block">
                cake
                <svg
                  aria-hidden="true"
                  viewBox="0 0 220 16"
                  preserveAspectRatio="none"
                  className="absolute -bottom-2 left-0 h-3 w-full text-butter"
                >
                  <path
                    d="M2 11c40-7 92-9 216-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="7"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
              <span className="text-cherry">.</span>
            </MotionH1>

            <MotionP variants={item} className="lede mt-7 max-w-[30rem]">
              Little moments, big celebrations and beautifully crafted cakes for
              every occasion.
            </MotionP>

            <MotionDiv
              variants={item}
              className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
            >
              <Link to="/menu" className="btn btn-chocolate group w-full sm:w-auto">
                Explore the menu
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </Link>
              <Link to="/custom-cakes" className="btn btn-outline w-full sm:w-auto">
                Design your cake
              </Link>
            </MotionDiv>

            <MotionP
              variants={item}
              className="mt-9 max-w-[30rem] border-t-2 border-chocolate/10 pt-5 text-[0.8125rem] leading-relaxed text-ink-soft"
            >
              {ADDRESS.lines[1]} ·{' '}
              <a
                href={PHONE_HREF}
                className="link-underline font-semibold text-chocolate"
              >
                {BUSINESS.phoneDisplay}
              </a>
            </MotionP>
          </MotionDiv>

          {/* ---------------------------- Image --------------------------- */}
          <div className="relative md:col-span-5 lg:col-span-5">
            <MotionDiv variants={revealMask} initial="hidden" animate="visible">
              {/* Butter arch behind the photo */}
              <div
                aria-hidden="true"
                className="absolute inset-x-3 -top-3 bottom-8 rounded-t-[999px] rounded-b-3xl border-2 border-chocolate bg-butter md:inset-x-2"
              />
              <Picture
                name="hero-cake"
                alt="Illustrative editorial styling of a pink two-tier cake finished with sprinkles and fresh cherries"
                className="relative aspect-[4/5] w-full rounded-t-[999px] rounded-b-3xl border-2 border-chocolate"
                sizes="(min-width: 1024px) 40vw, (min-width: 768px) 38vw, 92vw"
                priority
              />

              {/* Scalloped vanilla strip, clipping the bottom of the photo */}
              <MotionDiv
                variants={item}
                className="relative z-10 -mt-10 mr-2 ml-8 rounded-2xl border-2 border-chocolate bg-vanilla px-4 py-3 shadow-[0_4px_0_#3A251F] sm:-mt-12"
              >
                <p className="text-[0.5625rem] font-bold uppercase tracking-[0.18em] text-cherry">
                  Ordering
                </p>
                <p className="mt-1 text-[0.8125rem] leading-snug text-chocolate">
                  Enquire on WhatsApp — the fastest way to reserve a cake.
                </p>
              </MotionDiv>
            </MotionDiv>

            {/* Stickers: decorative, aria-hidden, no information inside */}
            <MotionSpan
              aria-hidden="true"
              variants={item}
              className="animate-float absolute -left-2 top-6 z-20 hidden rotate-[-8deg] rounded-full border-2 border-chocolate bg-lavender px-3 py-1.5 font-display text-sm font-bold text-chocolate shadow-[0_3px_0_#3A251F] sm:block"
              style={{ '--float-rot': '-8deg' }}
            >
              baked today
            </MotionSpan>
            <MotionSpan
              aria-hidden="true"
              variants={item}
              className="animate-float absolute -right-1 bottom-24 z-20 hidden rotate-[7deg] rounded-full border-2 border-chocolate bg-pistachio px-3 py-1.5 font-display text-sm font-bold text-chocolate shadow-[0_3px_0_#3A251F] md:block"
              style={{ '--float-rot': '7deg', animationDelay: '1.4s' }}
            >
              made to order
            </MotionSpan>
          </div>
        </div>
      </div>
    </section>
  );
}
