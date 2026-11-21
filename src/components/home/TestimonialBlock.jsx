import { Quote, MessageCircle, Star } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading.jsx';
import StaggerGroup from '../ui/StaggerGroup.jsx';
import StaggerItem from '../ui/StaggerItem.jsx';
import Reveal from '../ui/Reveal.jsx';
import Button from '../ui/Button.jsx';
import { TESTIMONIALS, TESTIMONIALS_NOTE } from '../../data/testimonials.js';
import { buildWhatsAppUrl, generalEnquiryMessage } from '../../lib/whatsapp.js';
import { BUSINESS } from '../../data/business.js';

/**
 * Reviews
 * -------
 * Renders *only* verified, attributable reviews. With the empty data file it
 * renders an honest empty state — no invented quotes, no invented star
 * average, no fake Google rating. An empty state that says so is worth more
 * than social proof that is not real.
 */
export default function TestimonialBlock() {
  const whatsappUrl = buildWhatsAppUrl(generalEnquiryMessage('website'));

  if (TESTIMONIALS.length === 0) {
    return (
      <section
        className="border-y-2 border-chocolate/10 bg-sky-soft py-16 md:py-20"
        aria-labelledby="reviews-heading"
      >
        <div className="container-page">
          <div className="grid gap-8 md:grid-cols-12 md:items-center">
            <div className="md:col-span-7">
              <p className="eyebrow">Reviews</p>
              <h2 id="reviews-heading" className="display-md mt-3 max-w-[22ch]">
                We have not published reviews yet.
              </h2>
              <p className="mt-3 max-w-[44ch] text-[0.9375rem] leading-relaxed text-ink-soft">
                {TESTIMONIALS_NOTE} We would rather show nothing here than invent a
                customer quote or a rating.
              </p>
            </div>

            <Reveal className="md:col-span-5" delay={0.05}>
              <div className="rounded-2xl border-2 border-chocolate bg-vanilla p-5 shadow-[0_4px_0_#3A251F]">
                <div className="flex items-center gap-2">
                  <span className="flex gap-0.5" aria-hidden="true">
                    {[0, 1, 2, 3, 4].map((i) => (
                      <Star key={i} className="h-3.5 w-3.5 text-chocolate/25" />
                    ))}
                  </span>
                  <span className="text-[0.625rem] font-bold uppercase tracking-[0.14em] text-ink-faint">
                    No rating claimed
                  </span>
                </div>
                <p className="mt-3 text-[0.8125rem] leading-relaxed text-ink-soft">
                  Ordered from {BUSINESS.name}? Send us your words — with your
                  permission, they become the first review on this page.
                </p>
                <Button href={whatsappUrl} variant="outline" size="sm" className="mt-4 w-full">
                  <MessageCircle className="h-3.5 w-3.5" aria-hidden="true" />
                  Share your experience
                </Button>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      className="border-y-2 border-chocolate/10 bg-sky-soft py-16 md:py-24"
      aria-labelledby="reviews-heading"
    >
      <div className="container-page">
        <SectionHeading
          eyebrow="In their words"
          title="What customers say."
          className="max-w-2xl"
        />
        <StaggerGroup as="ul" className="mt-10 grid gap-5 md:grid-cols-3">
          {TESTIMONIALS.map((review) => (
            <StaggerItem
              as="li"
              key={review.id}
              className="rounded-2xl border-2 border-chocolate bg-vanilla p-6 shadow-[0_4px_0_#3A251F]"
            >
              <Quote className="h-5 w-5 text-cherry" aria-hidden="true" />
              <blockquote className="mt-4 font-display text-[1.125rem] leading-snug font-semibold text-chocolate">
                {review.quote}
              </blockquote>
              <footer className="mt-5 border-t-2 border-chocolate/10 pt-4 text-[0.75rem] text-ink-soft">
                <span className="font-bold text-chocolate">{review.name}</span>
                {review.context ? <span> · {review.context}</span> : null}
                {review.source ? (
                  <span className="mt-1 block text-ink-faint">via {review.source}</span>
                ) : null}
              </footer>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
