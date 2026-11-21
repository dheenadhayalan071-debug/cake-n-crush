/**
 * Logo lockup
 * -----------
 * No logo file was supplied with the project, so this is a *provisional*
 * typographic lockup that preserves the business name. When the official
 * logo arrives:
 *   1. Add it to public/assets/logo/ (e.g. cakencrush-logo.svg)
 *   2. Replace the <LogoMark/> below with an <img> pointing at it
 *   3. Keep this component's API (tone, className) unchanged.
 */
import { cn } from '../../lib/cn.js';

export function LogoMark({ className = '', tone = 'dark' }) {
  const ring = tone === 'light' ? '#FFF7E9' : '#3A251F';
  const cherry = '#E85B55';
  const butter = '#F6D96B';

  return (
    <svg
      viewBox="0 0 40 40"
      aria-hidden="true"
      focusable="false"
      className={cn('shrink-0', className)}
    >
      <circle cx="20" cy="20" r="18.5" fill={butter} stroke={ring} strokeWidth="2" />
      {/* Three-tier cake with a single candle and a cherry */}
      <path
        d="M11.5 26.75h17v2.6h-17zM13.5 22c0-1.1 1.5-1.1 1.5-2.2S13.5 18.7 13.5 17.6h11c0 1.1-1.5 1.1-1.5 2.2s1.5 1.1 1.5 2.2z"
        fill={ring}
      />
      <path d="M19.5 12h1v5.4h-1z" fill={ring} />
      <circle cx="20" cy="11" r="1.5" fill={cherry} />
      <path
        d="M10.75 17.4c1.9 0 1.9-1.5 3.8-1.5s1.9 1.5 3.8 1.5 1.9-1.5 3.8-1.5 1.9 1.5 3.8 1.5 1.9-1.5 3.3-1.5"
        fill="none"
        stroke={ring}
        strokeWidth="1.3"
        strokeLinecap="round"
        opacity="0.5"
      />
    </svg>
  );
}

export default function Logo({ tone = 'dark', className = '', compact = false }) {
  const light = tone === 'light';

  return (
    <span className={cn('inline-flex items-center gap-2.5', className)}>
      <LogoMark tone={tone} className={compact ? 'h-8 w-8' : 'h-10 w-10'} />
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            'font-display font-bold uppercase leading-none tracking-[0.02em]',
            'font-variation-settings-[\'SOFT\'_60,_\'WONK\'_1]',
            compact ? 'text-[1rem]' : 'text-[1.15rem]',
            light ? 'text-vanilla' : 'text-chocolate',
          )}
        >
          Cake&nbsp;N&nbsp;Crush
        </span>
        {!compact ? (
          <span
            className={cn(
              'mt-1 text-[0.5rem] font-bold uppercase tracking-[0.3em]',
              light ? 'text-butter' : 'text-cherry',
            )}
          >
            Patisserie · Madurai
          </span>
        ) : null}
      </span>
    </span>
  );
}
