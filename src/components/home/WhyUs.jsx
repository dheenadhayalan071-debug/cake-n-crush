import { CakeSlice, Leaf, MessageCircle, Phone } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading.jsx';
import StaggerGroup from '../ui/StaggerGroup.jsx';
import StaggerItem from '../ui/StaggerItem.jsx';
import { PRODUCTS } from '../../data/products.js';

/**
 * "Why Cake N Crush" — every point here is verifiable from the catalogue or
 * the ordering setup. No awards, ratings, years of experience or
 * ingredient claims (none were supplied).
 */
const egglessCount = PRODUCTS.filter((product) =>
  product.dietaryTypes.includes('Eggless'),
).length;

const POINTS = [
  {
    icon: CakeSlice,
    title: 'Variant-level pricing',
    body: 'Weight, dietary option and price are shown together for every cake — one price never stands in for another.',
  },
  {
    icon: Leaf,
    title: 'A genuine eggless range',
    body: `${egglessCount} flavours are listed with eggless variants, priced separately from the regular cakes.`,
  },
  {
    icon: MessageCircle,
    title: 'One-message enquiries',
    body: 'Your cake, variant and question are pre-filled into WhatsApp, so the bakery can reply without asking again.',
  },
  {
    icon: Phone,
    title: 'A local shop you can call',
    body: 'Park Town, Madurai — with click-to-call and directions on every page, not just a contact form.',
  },
];

export default function WhyUs() {
  return (
    <section className="bg-cream py-16 md:py-24" aria-labelledby="why-heading">
      <div className="container-page">
        <SectionHeading
          eyebrow="Why Cake N Crush"
          title="Clear information, before you order."
          lede="A premium cake deserves a clear conversation. These are the things this website is built to get right."
          className="max-w-2xl"
        />

        <StaggerGroup
          as="ul"
          stagger={0.08}
          className="mt-10 grid gap-px overflow-hidden border border-line-soft bg-line-soft sm:grid-cols-2 lg:grid-cols-4"
        >
          {POINTS.map((point) => (
            <StaggerItem as="li" key={point.title} className="bg-cream p-6 lg:p-7">
              <point.icon className="h-5 w-5 text-caramel-deep" aria-hidden="true" strokeWidth={1.5} />
              <h3 className="mt-5 font-display text-xl leading-tight text-ink">{point.title}</h3>
              <p className="mt-2.5 text-[0.875rem] leading-relaxed text-ink-soft">{point.body}</p>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
