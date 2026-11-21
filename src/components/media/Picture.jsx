/**
 * Picture
 * -------
 * Responsive <picture> wrapper backed by the generated image manifest.
 * Every image gets width/height (zero layout shift), a blurred LQIP that
 * fades out on load, lazy loading below the fold, and a labelled
 * "illustrative" note when it is placeholder photography.
 */
import { useState } from 'react';
import { IMAGE_MANIFEST } from './image-manifest.js';
import { editorialImage } from '../../data/imagery.js';

export default function Picture({
  name,
  alt,
  className = '',
  imgClassName = '',
  priority = false,
  sizes = '(min-width: 1024px) 40vw, (min-width: 640px) 60vw, 92vw',
  objectPosition,
  /** CSS object-fit. Use 'contain' for lightboxes; 'cover' everywhere else. */
  fit = 'cover',
  showPlaceholderNote = false,
  ...rest
}) {
  const source = editorialImage(name);
  const asset = IMAGE_MANIFEST[name];
  const [loaded, setLoaded] = useState(false);

  if (!asset) {
    // Graceful fallback: an empty, correctly proportioned frame rather than
    // a broken image icon.
    return (
      <div
        className={`bg-cream-deep ${className}`}
        aria-label={alt}
        role="img"
        style={{ aspectRatio: '4 / 5' }}
      />
    );
  }

  return (
    <figure className={`relative overflow-hidden ${className}`}>
      <img
        src={asset.lqip}
        alt=""
        aria-hidden="true"
        className={`absolute inset-0 h-full w-full scale-105 object-cover blur-xl transition-opacity duration-700 ${
          loaded ? 'opacity-0' : 'opacity-100'
        }`}
      />
      <img
        src={asset.src}
        srcSet={asset.srcset}
        sizes={sizes}
        width={asset.width}
        height={asset.height}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : 'auto'}
        decoding={priority ? 'sync' : 'async'}
        onLoad={() => setLoaded(true)}
        style={objectPosition ? { objectPosition } : undefined}
        className={`relative h-full w-full ${
          fit === 'contain' ? 'object-contain' : 'object-cover'
        } transition-[opacity,transform] duration-700 ease-out ${
          loaded ? 'opacity-100' : 'opacity-0'
        } ${imgClassName}`}
        {...rest}
      />
      {showPlaceholderNote && source ? (
        <figcaption className="absolute bottom-0 left-0 right-0 z-10 flex items-center gap-1.5 bg-cocoa/55 px-3 py-2 text-[0.625rem] font-medium uppercase tracking-[0.14em] text-cream/90 backdrop-blur-[2px]">
          <span className="inline-block h-1 w-1 rounded-full bg-cream/70" aria-hidden="true" />
          Illustrative image — not an actual product photo
        </figcaption>
      ) : null}
    </figure>
  );
}
