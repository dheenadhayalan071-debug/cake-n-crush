import Reveal from './Reveal.jsx';
import { fadeUp } from '../../lib/motion.js';
import { cn } from '../../lib/cn.js';

/**
 * PageHeader — shared masthead for inner routes.
 *
 * `tone` picks the colour field behind the title so each page has its own
 * identity without leaving the system:
 *   butter · strawberry · pistachio · sky · lavender · cherry · vanilla
 */
const TONE_BG = {
  butter: 'bg-butter-soft',
  strawberry: 'bg-strawberry-soft',
  pistachio: 'bg-pistachio-soft',
  sky: 'bg-sky-soft',
  lavender: 'bg-lavender-soft',
  cherry: 'bg-cherry-soft',
  vanilla: 'bg-vanilla',
};

export default function PageHeader({
  eyebrow,
  title,
  lede,
  aside,
  tone = 'vanilla',
  className = '',
}) {
  return (
    <section
      className={cn(
        'relative overflow-hidden border-b-2 border-chocolate/10',
        TONE_BG[tone] || TONE_BG.vanilla,
        className,
      )}
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -right-20 -top-24 h-72 w-72 rounded-full bg-butter/40" />
        <div className="absolute -bottom-28 left-1/4 h-64 w-64 rounded-full bg-strawberry/25" />
      </div>

      <div className="container-page relative">
        <div className="grid gap-8 pb-10 pt-10 md:grid-cols-12 md:items-end md:gap-10 md:pb-16 md:pt-16">
          <div className="md:col-span-8">
            {eyebrow ? (
              <Reveal as="span" className="eyebrow">
                {eyebrow}
              </Reveal>
            ) : null}
            <Reveal as="h1" variants={fadeUp} className="display-lg mt-4 max-w-[22ch]">
              {title}
            </Reveal>
            {lede ? (
              <Reveal as="p" variants={fadeUp} className="lede mt-5">
                {lede}
              </Reveal>
            ) : null}
          </div>
          {aside ? (
            <div className="md:col-span-4 md:justify-self-end md:pb-1">{aside}</div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
