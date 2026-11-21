import { Link } from 'react-router-dom';
import { m as motion } from 'framer-motion';
import { ArrowRight, PenTool, MessageSquareHeart, CalendarCheck } from 'lucide-react';
import Picture from '../media/Picture.jsx';
import Reveal from '../ui/Reveal.jsx';
import { useMotionVariants, revealMask, fadeUp } from '../../lib/motion.js';

const STEPS = [
  {
    icon: PenTool,
    title: 'Describe the celebration',
    body: 'Flavour, weight, eggless or regular, theme and the message you would like on the cake.',
  },
  {
    icon: MessageSquareHeart,
    title: 'Send it on WhatsApp',
    body: 'Your details become one tidy message — you attach any reference image in the chat.',
  },
  {
    icon: CalendarCheck,
    title: 'The bakery confirms',
    body: 'We reply with feasibility, price and collection details. Nothing is charged on this website.',
  },
];

export default function CustomCakePromo() {
  const mask = useMotionVariants(revealMask);

  return (
    <section className="bg-cream-deep/60 py-16 md:py-24" aria-labelledby="custom-promo-heading">
      <div className="container-page">
        <div className="grid items-center gap-10 md:grid-cols-12 md:gap-14">
          <div className="md:col-span-6">
            <Reveal as="span" className="eyebrow">
              Custom Cake Studio
            </Reveal>
            <Reveal as="h2" variants={fadeUp} id="custom-promo-heading" className="display-lg mt-4 max-w-[17ch]">
              A cake that could only be yours.
            </Reveal>
            <Reveal as="p" variants={fadeUp} className="lede mt-5">
              Birthdays, anniversaries, first days and big milestones — share the idea
              and the bakery will tell you what is possible.
            </Reveal>

            <ol className="mt-8 space-y-5">
              {STEPS.map((step, index) => (
                <Reveal as="li" key={step.title} className="flex gap-4" delay={index * 0.06}>
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center border border-caramel/30 text-caramel-deep">
                    <step.icon className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <span>
                    <span className="block text-sm font-semibold text-ink">{step.title}</span>
                    <span className="mt-1 block max-w-md text-[0.875rem] leading-relaxed text-ink-soft">
                      {step.body}
                    </span>
                  </span>
                </Reveal>
              ))}
            </ol>

            <Reveal className="mt-8">
              <Link to="/custom-cakes" className="btn btn-primary group">
                Start a custom cake enquiry
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </Link>
            </Reveal>
          </div>

          <div className="md:col-span-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.25 }}
              variants={mask}
              className="relative"
            >
              <Picture
                name="texture-cream"
                alt="Illustrative editorial macro styling of piped whipped vanilla cream"
                className="aspect-[4/3] w-full"
                sizes="(min-width: 768px) 48vw, 100vw"
              />
            </motion.div>
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div className="border-l border-caramel/40 pl-4">
                <p className="font-display text-[1.05rem] leading-tight text-ink">No online payment</p>
                <p className="mt-1 text-[0.75rem] leading-relaxed text-ink-soft">
                  We quote and confirm over chat or phone.
                </p>
              </div>
              <div className="border-l border-caramel/40 pl-4">
                <p className="font-display text-[1.05rem] leading-tight text-ink">Reference images</p>
                <p className="mt-1 text-[0.75rem] leading-relaxed text-ink-soft">
                  Attach them directly in WhatsApp after your enquiry opens.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
