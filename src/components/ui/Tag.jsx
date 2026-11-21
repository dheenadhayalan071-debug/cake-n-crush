import { cn } from '../../lib/cn.js';

/** Small editorial label. Never used for claims that are not verified. */
export default function Tag({ children, tone = 'neutral', className = '', as: TagName = 'span' }) {
  const tones = {
    neutral: 'border-line text-ink-soft bg-transparent',
    caramel: 'border-cherry/40 text-cherry-deep bg-cherry-soft',
    dark: 'border-vanilla/25 text-vanilla/80 bg-transparent',
    plum: 'border-lavender bg-lavender-soft text-chocolate',
  };

  return (
    <TagName
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[0.5625rem] font-bold uppercase leading-none tracking-[0.12em]',
        tones[tone] || tones.neutral,
        className,
      )}
    >
      {children}
    </TagName>
  );
}
