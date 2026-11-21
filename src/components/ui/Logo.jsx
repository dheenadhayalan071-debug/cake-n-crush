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
  const stroke = tone === 'light' ? 'rgba(248,244,237,0.55)' : 'rgba(183,123,69,0.75)';
  const fill = tone === 'light' ? '#F8F4ED' : '#B77B45';

  return (
    <svg
      viewBox="0 0 40 40"
      aria-hidden="true"
      focusable="false"
      className={cn('shrink-0', className)}
    >
      <circle cx="20" cy="20" r="18.25" fill="none" stroke={stroke} strokeWidth="1" />
      {/* A stylised three-tier celebration cake with a single candle. */}
      <path
        d="M11.5 27.25h17v2.5h-17zM13.5 22.4c0-1.1 1.5-1.1 1.5-2.2s-1.5-1.1-1.5-2.2h11c0 1.1-1.5 1.1-1.5 2.2s1.5 1.1 1.5 2.2z"
        fill={fill}
      />
      <path d="M19.5 12.25h1v5.5h-1z" fill={fill} />
      <circle cx="20" cy="11.25" r="1.35" fill={fill} />
      <path
        d="M10.75 17.4c1.9 0 1.9-1.5 3.8-1.5s1.9 1.5 3.8 1.5 1.9-1.5 3.8-1.5 1.9 1.5 3.8 1.5 1.9-1.5 3.3-1.5"
        fill="none"
        stroke={fill}
        strokeWidth="1.1"
        strokeLinecap="round"
        opacity="0.55"
      />
    </svg>
  );
}

export default function Logo({ tone = 'dark', className = '', compact = false }) {
  return (
    <span className={cn('inline-flex items-center gap-2.5', className)}>
      <LogoMark tone={tone} className={compact ? 'h-7 w-7' : 'h-9 w-9'} />
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            'font-display font-semibold uppercase leading-none',
            compact ? 'text-[0.95rem] tracking-[0.16em]' : 'text-[1.05rem] tracking-[0.18em]',
            tone === 'light' ? 'text-cream' : 'text-ink',
          )}
        >
          Cake&nbsp;N&nbsp;Crush
        </span>
        {!compact ? (
          <span
            className={cn(
              'mt-1 text-[0.5rem] font-medium uppercase tracking-[0.34em]',
              tone === 'light' ? 'text-cream/60' : 'text-caramel',
            )}
          >
            Patisserie · Madurai
          </span>
        ) : null}
      </span>
    </span>
  );
}
