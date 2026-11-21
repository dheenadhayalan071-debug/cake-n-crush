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
            'max-w-[22ch]',
            centred && 'mx-auto max-w-[26ch]',
            dark ? 'text-vanilla' : 'text-chocolate',
          )}
        >
          {title}
        </Tag>
      ) : null}
      {lede ? (
        <p
          className={cn(
            'text-[0.9375rem] leading-relaxed md:text-base',
            dark ? 'text-vanilla/75' : 'text-ink-soft',
            'max-w-[42ch]',
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
