/**
 * Brand glyphs (Instagram / Facebook) as inline SVG.
 * lucide-react v1 no longer ships brand icons, and pulling in a whole icon
 * pack for two glyphs would be wasteful.
 */

export function InstagramIcon({ className = 'h-4 w-4', ...rest }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={className}
      {...rest}
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function FacebookIcon({ className = 'h-4 w-4', ...rest }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={className}
      {...rest}
    >
      <path d="M15.5 21v-7.3h2.5l.4-2.9h-2.9V8.9c0-.85.24-1.43 1.46-1.43h1.55V4.87A20.6 20.6 0 0 0 16.25 4.7c-2.24 0-3.77 1.37-3.77 3.88v2.22H10v2.9h2.48V21" />
    </svg>
  );
}
