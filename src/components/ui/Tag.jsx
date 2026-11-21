import { cn } from '../../lib/cn.js';

/** Small editorial label. Never used for claims that are not verified. */
export default function Tag({ children, tone = 'neutral', className = '', as: TagName = 'span' }) {
  const tones = {
    neutral: 'border-line text-ink-soft bg-transparent',
    caramel: 'border-caramel/40 text-caramel-deep bg-caramel/8',
    dark: 'border-cream/25 text-cream/80 bg-transparent',
    plum: 'border-plum/30 text-plum bg-plum/5',
  };

  return (
    <TagName
      className={cn(
        'inline-flex items-center gap-1.5 rounded-[2px] border px-2 py-1 text-[0.625rem] font-semibold uppercase leading-none tracking-[0.13em]',
        tones[tone] || tones.neutral,
        className,
      )}
    >
      {children}
    </TagName>
  );
}
