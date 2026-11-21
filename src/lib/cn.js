/** Tiny class-name joiner — avoids pulling in a dependency. */
export function cn(...parts) {
  return parts.filter(Boolean).join(' ');
}
