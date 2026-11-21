import { Link } from 'react-router-dom';
import { ArrowRight, CakeSlice, Leaf, MessageCircle, Phone, Wallet } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading.jsx';
import StaggerGroup from '../ui/StaggerGroup.jsx';
import StaggerItem from '../ui/StaggerItem.jsx';
import { PRODUCTS } from '../../data/products.js';
import { cn } from '../../lib/cn.js';

/**
 * "Why Cake N Crush"
 * ------------------
 * Every point is verifiable from the catalogue or the ordering setup. No
 * awards, ratings, years of experience or ingredient claims — none supplied.
 */
const egglessCount = PRODUCTS.filter((product) =>
  product.dietaryTypes.includes('Eggless'),
).length;

const POINTS = [
  {
    icon: Wallet,
    title: 'Variant-level pricing',
    body: 'Weight, dietary option and price sit together on every card. One price never stands in for another.',
    bg: 'bg-butter-soft',
    accent: 'text-cherry',
  },
  {
    icon: Leaf,
    title: 'A genuine eggless range',
    body: `${egglessCount} flavours are listed with eggless variants, priced separately from the regular cakes.`,
    bg: 'bg-pistachio-soft',
    accent: 'text-chocolate',
  },
  {
    icon: MessageCircle,
    title: 'One-message enquiries',
    body: 'Your cake, variant and question arrive pre-filled in WhatsApp, so the bakery can reply without asking again.',
    bg: 'bg-strawberry-soft',
    accent: 'text-cherry',
  },
  {
    icon: Phone,
    title: 'A local shop you can call',
    body: 'Park Town, Madurai — with click-to-call and directions on every page, not buried behind a form.',
    bg: 'bg-sky-soft',
    accent: 'text-chocolate',
  },
];

export default function WhyUs() {
  return (
    <section className="bg-vanilla py-16 md:py-24" aria-labelledby="why-heading">
      <div className="container-page">
        <div className="grid gap-8 md:grid-cols-12">
          <div className="md:col-span-7">
            <SectionHeading
              eyebrow="Why Cake N Crush"
              title="Clear information, before you order."
              lede="A celebration cake deserves a clear conversation. These are the four things this site is built to get right."
            />
          </div>
          <div className="flex md:col-span-5 md:justify-end md:items-end">
            <Link
              to="/menu"
              className="group inline-flex items-center gap-2 self-start rounded-full border-2 border-chocolate px-4 py-2 text-[0.6875rem] font-bold uppercase tracking-[0.1em] text-chocolate transition-colors hover:bg-chocolate hover:text-vanilla md:self-auto"
            >
              See the full menu
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>

        <StaggerGroup as="ul" stagger={0.07} className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {POINTS.map((point, index) => (
            <StaggerItem
              as="li"
              key={point.title}
              className={cn(
                'flex flex-col rounded-2xl border-2 border-chocolate p-5 shadow-[0_4px_0_#3A251F]',
                point.bg,
              )}
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-chocolate bg-vanilla">
                <point.icon className={cn('h-4 w-4', point.accent)} aria-hidden="true" strokeWidth={2} />
              </span>
              <p className="mt-5 font-sans text-[0.5625rem] font-bold uppercase tracking-[0.18em] text-chocolate/45">
                0{index + 1}
              </p>
              <h3 className="mt-1 font-display text-[1.125rem] leading-tight font-semibold text-chocolate">
                {point.title}
              </h3>
              <p className="mt-2 text-[0.8125rem] leading-relaxed text-chocolate/70">
                {point.body}
              </p>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
