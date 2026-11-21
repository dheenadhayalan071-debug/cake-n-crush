import { Link } from 'react-router-dom';
import { m as motion } from 'framer-motion';
import { ArrowRight, MessageCircle, ShieldCheck } from 'lucide-react';
import Picture from '../media/Picture.jsx';
import { EASE_SILK, useMotionVariants, revealMask, fadeUp, staggerParent } from '../../lib/motion.js';

/**
 * Hero
 * ----
 * Editorial split: oversized serif headline, restrained copy, and a single
 * tall image with a slow mask reveal. No carousel, no autoplay, no video.
 */
export default function Hero() {
  const maskVariants = useMotionVariants(revealMask);
  const textParent = useMotionVariants(staggerParent(0.09, 0.15));
  const itemVariants = useMotionVariants(fadeUp);

  return (
    <section className="relative overflow-hidden bg-cream" aria-labelledby="hero-heading">
      <div className="container-page">
        <div className="grid items-center gap-10 pb-14 pt-10 md:grid-cols-12 md:gap-8 md:pb-20 md:pt-16 lg:pb-24">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={textParent}
            className="relative z-10 md:col-span-7 md:pr-6 lg:col-span-6"
          >
            <motion.p variants={itemVariants} className="eyebrow">
              Patisserie · Park Town, Madurai
            </motion.p>

            <motion.h1
              id="hero-heading"
              variants={itemVariants}
              className="display-xl mt-5 text-ink"
            >
              {/*
                Each line is a block <span> rather than a <br /> so the
                accessible name reads as a normal sentence ("Every celebration
                deserves something extraordinary.") while the layout still
                breaks deliberately.
              */}
              <span className="block">Every</span>{' '}
              <span className="block">celebration</span>{' '}
              <span className="block italic text-caramel-deep">deserves</span>{' '}
              <span className="block">something</span>{' '}
              <span className="block">extraordinary.</span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="lede mt-6 max-w-md md:mt-7"
            >
              Discover beautifully crafted cakes and sweet creations, made in Madurai
              to make your special moments memorable.
            </motion.p>

            <motion.div variants={itemVariants} className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                to="/menu"
                className="btn btn-primary group w-full sm:w-auto"
              >
                Explore our menu
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </Link>
              <Link to="/custom-cakes" className="btn btn-outline w-full sm:w-auto">
                Design a custom cake
              </Link>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-line-soft pt-6 text-[0.75rem] text-ink-soft"
            >
              <span className="inline-flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-caramel" aria-hidden="true" />
                Eggless selection available
              </span>
              <a
                href="https://wa.me/918838159344"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 link-underline transition-colors hover:text-ink"
              >
                <MessageCircle className="h-4 w-4 text-caramel" aria-hidden="true" />
                Enquire on WhatsApp
              </a>
            </motion.div>
          </motion.div>

          <div className="relative md:col-span-5 lg:col-span-6">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={maskVariants}
              className="relative"
            >
              <Picture
                name="hero-cake"
                alt="Illustrative editorial styling of a tall ivory celebration cake decorated with fresh cherries"
                className="aspect-[4/5] w-full md:aspect-[4/5.2]"
                sizes="(min-width: 1024px) 48vw, (min-width: 768px) 42vw, 100vw"
                priority
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 border border-cocoa/8"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.05, duration: 0.8, ease: EASE_SILK }}
              className="absolute -bottom-5 left-4 right-4 bg-cream px-4 py-3 shadow-[0_2px_24px_rgba(37,26,22,0.10)] sm:-bottom-6 sm:left-6 sm:right-auto sm:max-w-[17rem] sm:px-5"
            >
              <p className="text-[0.625rem] font-semibold uppercase tracking-[0.16em] text-caramel-deep">
                Ordering
              </p>
              <p className="mt-1 text-[0.8125rem] leading-snug text-ink-soft">
                Enquire by WhatsApp or phone — the fastest way to reserve a cake.
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="h-px w-full bg-line-soft" />
    </section>
  );
}
