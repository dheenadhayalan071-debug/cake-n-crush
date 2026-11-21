import Reveal from './Reveal.jsx';
import { fadeUp } from '../../lib/motion.js';
import { cn } from '../../lib/cn.js';

/** Shared page masthead for inner routes. */
export default function PageHeader({ eyebrow, title, lede, aside, className = '' }) {
  return (
    <section className={cn('border-b border-line-soft bg-cream-deep/45', className)}>
      <div className="container-page">
        <div className="grid gap-8 pb-12 pt-12 md:grid-cols-12 md:items-end md:pb-16 md:pt-20">
          <div className="md:col-span-8">
            {eyebrow ? <Reveal as="span" className="eyebrow">{eyebrow}</Reveal> : null}
            <Reveal as="h1" variants={fadeUp} className="display-lg mt-4 max-w-[22ch]">
              {title}
            </Reveal>
            {lede ? (
              <Reveal as="p" variants={fadeUp} className="lede mt-5">
                {lede}
              </Reveal>
            ) : null}
          </div>
          {aside ? <div className="md:col-span-4 md:justify-self-end">{aside}</div> : null}
        </div>
      </div>
    </section>
  );
}
