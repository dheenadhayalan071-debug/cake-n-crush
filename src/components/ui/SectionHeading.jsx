import { cn } from '../../lib/cn.js';
import Reveal from './Reveal.jsx';

/**
 * SectionHeading — consistent editorial section intros.
 * `align` controls left or centred composition; `tone` flips for dark panels.
 */
export default function SectionHeading({
  eyebrow,
  title,
  lede,
  align = 'left',
  tone = 'light',
  size = 'lg',
  className = '',
  as = 'h2',
  children,
}) {
  const Tag = as;
  const centred = align === 'center';
  const dark = tone === 'dark';

  return (
    <Reveal
      className={cn(
        'flex flex-col gap-4',
        centred && 'items-center text-center',
        className,
      )}
    >
      {eyebrow ? (
        <span className={cn('eyebrow', dark && 'eyebrow--light')}>{eyebrow}</span>
      ) : null}
      {title ? (
        <Tag
          className={cn(
            size === 'lg' ? 'display-lg' : 'display-md',
            'max-w-[20ch]',
            centred && 'mx-auto max-w-[26ch]',
            dark ? 'text-cream' : 'text-ink',
          )}
        >
          {title}
        </Tag>
      ) : null}
      {lede ? (
        <p
          className={cn(
            'lede',
            dark && 'text-cream/70',
            centred && 'mx-auto text-center',
          )}
        >
          {lede}
        </p>
      ) : null}
      {children}
    </Reveal>
  );
}
