import { Link } from 'react-router-dom';
import { ArrowRight, PenLine, MessageCircle, CalendarCheck } from 'lucide-react';
import Picture from '../media/Picture.jsx';
import Reveal from '../ui/Reveal.jsx';
import { revealMask } from '../../lib/motion.js';
import { MotionDiv } from '../ui/Motion.jsx';
import { buildWhatsAppUrl, generalEnquiryMessage } from '../../lib/whatsapp.js';
import Button from '../ui/Button.jsx';

/**
 * Custom Cake Studio
 * ------------------
 * Sells the *process*, not a fabricated product. Every step describes what
 * genuinely happens: describe → send on WhatsApp → bakery confirms.
 * No online payment, no instant quote, no invented lead times.
 */
const STEPS = [
  {
    icon: PenLine,
    title: 'Describe the celebration',
    body: 'Flavour, weight, eggless or regular, a theme and the message you would like piped on top.',
  },
  {
    icon: MessageCircle,
    title: 'Send it on WhatsApp',
    body: 'Your answers become one tidy message. Attach any reference image straight in the chat.',
  },
  {
    icon: CalendarCheck,
    title: 'The bakery confirms',
    body: 'We reply with feasibility, price and collection. Nothing is charged on this website.',
  },
];

export default function CustomCakePromo() {
  const whatsappUrl = buildWhatsAppUrl(generalEnquiryMessage('website'));

  return (
    <section
      className="relative overflow-hidden bg-lavender-soft py-16 md:py-24"
      aria-labelledby="custom-promo-heading"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -left-24 top-8 h-72 w-72 rounded-full bg-lavender/50" />
        <div className="absolute -right-16 bottom-0 h-80 w-80 rounded-full bg-butter/40" />
      </div>

      <div className="container-page relative">
        <div className="grid items-center gap-10 md:grid-cols-12 md:gap-12">
          {/* --------------------------- Copy --------------------------- */}
          <div className="md:col-span-6">
            <Reveal as="span" className="eyebrow">
              Custom Cake Studio
            </Reveal>
            <Reveal as="h2" id="custom-promo-heading" className="display-lg mt-4 max-w-[17ch]">
              A cake that could only be{' '}
              <span className="display-script text-cherry">yours</span>.
            </Reveal>
            <Reveal as="p" className="lede mt-5">
              Birthdays, anniversaries, first days and big milestones — share the idea
              and the bakery will tell you what is possible.
            </Reveal>

            <ol className="mt-8 space-y-4">
              {STEPS.map((step, index) => (
                <Reveal as="li" key={step.title} delay={index * 0.06}>
                  <div className="flex gap-4 rounded-2xl border-2 border-chocolate/10 bg-vanilla/80 p-4">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-chocolate bg-butter text-chocolate">
                      <step.icon className="h-4 w-4" aria-hidden="true" />
                    </span>
                    <span>
                      <span className="block text-[0.875rem] font-bold text-chocolate">
                        {index + 1}. {step.title}
                      </span>
                      <span className="mt-1 block max-w-md text-[0.8125rem] leading-relaxed text-ink-soft">
                        {step.body}
                      </span>
                    </span>
                  </div>
                </Reveal>
              ))}
            </ol>

            <Reveal className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Button to="/custom-cakes" variant="chocolate">
                Start a custom enquiry
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Button>
              <Button href={whatsappUrl} variant="outline">
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                Ask a question
              </Button>
            </Reveal>
          </div>

          {/* -------------------------- Imagery ------------------------- */}
          <div className="relative md:col-span-6">
            <MotionDiv
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={revealMask}
              className="relative"
            >
              <Picture
                name="gallery-custom"
                alt="Illustrative editorial styling of a two-tier bespoke cake with textured buttercream, gold leaf and dried florals"
                className="aspect-[4/5] w-full rounded-[2rem] rounded-bl-none border-2 border-chocolate"
                sizes="(min-width: 768px) 46vw, 92vw"
              />
            </MotionDiv>

            <Reveal
              delay={0.12}
              className="relative z-10 -mt-12 ml-4 mr-8 rotate-[-1.5deg] rounded-2xl border-2 border-chocolate bg-cherry-ink p-4 text-white shadow-[0_5px_0_#3A251F] sm:ml-8 sm:mr-0 sm:max-w-[17rem]"
            >
              <p className="text-[0.5625rem] font-bold uppercase tracking-[0.18em] text-white/75">
                Good to know
              </p>
              <p className="mt-1.5 font-display text-[1.05rem] leading-snug font-semibold">
                Custom designs are quoted individually — send your idea and we will
                take it from there.
              </p>
            </Reveal>

            <Reveal delay={0.16} className="mt-5 grid grid-cols-2 gap-3">
              <div className="rounded-xl border-2 border-chocolate/10 bg-vanilla p-3.5">
                <p className="font-display text-[0.95rem] font-semibold leading-tight text-chocolate">
                  No online payment
                </p>
                <p className="mt-1 text-[0.6875rem] leading-relaxed text-ink-soft">
                  Everything is quoted and confirmed over chat or phone.
                </p>
              </div>
              <div className="rounded-xl border-2 border-chocolate/10 bg-vanilla p-3.5">
                <p className="font-display text-[0.95rem] font-semibold leading-tight text-chocolate">
                  Reference images
                </p>
                <p className="mt-1 text-[0.6875rem] leading-relaxed text-ink-soft">
                  Attach them directly in WhatsApp after your enquiry opens.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
