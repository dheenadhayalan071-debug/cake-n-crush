import { Quote } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading.jsx';
import StaggerGroup from '../ui/StaggerGroup.jsx';
import StaggerItem from '../ui/StaggerItem.jsx';
import { TESTIMONIALS, TESTIMONIALS_NOTE } from '../../data/testimonials.js';

/**
 * Testimonials — renders *only* verified, attributable reviews.
 * With an empty data file the section renders an honest invitation
 * instead of fabricated social proof.
 */
export default function TestimonialBlock() {
  if (TESTIMONIALS.length === 0) {
    return (
      <section className="border-y border-line-soft bg-cream-deep/40 py-14 md:py-16" aria-labelledby="reviews-heading">
        <div className="container-page">
          <div className="flex flex-col items-start gap-5 md:flex-row md:items-center md:justify-between">
            <div className="max-w-2xl">
              <p className="eyebrow">Reviews</p>
              <h2 id="reviews-heading" className="display-md mt-3">
                No reviews published yet.
              </h2>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-soft">
                {TESTIMONIALS_NOTE} We would rather show nothing than invent customer
                quotes.
              </p>
            </div>
            <p className="text-[0.75rem] leading-relaxed text-ink-faint md:max-w-[16rem] md:text-right">
              Have you ordered from us? Your words — with your permission — are the only
              reviews that will appear here.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="border-y border-line-soft bg-cream-deep/40 py-16 md:py-24" aria-labelledby="reviews-heading">
      <div className="container-page">
        <SectionHeading
          eyebrow="In their words"
          title="What customers say."
          className="max-w-2xl"
        />
        <StaggerGroup
          as="ul"
          className="mt-10 grid gap-5 md:grid-cols-3"
        >
          {TESTIMONIALS.map((review) => (
            <StaggerItem as="li" key={review.id} className="border border-line-soft bg-cream p-6">
              <Quote className="h-5 w-5 text-caramel" aria-hidden="true" strokeWidth={1.5} />
              <blockquote className="mt-4 font-display text-lg leading-snug text-ink">
                {review.quote}
              </blockquote>
              <footer className="mt-5 border-t border-line-soft pt-4 text-[0.75rem] text-ink-soft">
                <span className="font-semibold text-ink">{review.name}</span>
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
