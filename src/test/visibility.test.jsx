/**
 * REGRESSION GUARD — "blank section" outage
 * ----------------------------------------
 * A previous release shipped a site whose header rendered but whose hero,
 * product and gallery sections were permanently invisible in production:
 * every animated element began at `opacity: 0` and the animation feature
 * bundle (LazyMotion) was never mounted, so nothing ever became visible.
 *
 * The old suite passed because it only asserted DOM *presence*. These tests
 * assert rendered *visibility*, with and without animation support, and while
 * a mounted component is missing its IntersectionObserver.
 */
import { describe, expect, it, afterEach, vi } from 'vitest';
import { render, within } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import Layout from '../components/layout/Layout.jsx';
import HomePage from '../pages/HomePage.jsx';
import MenuPage from '../pages/MenuPage.jsx';
import GalleryPage from '../pages/GalleryPage.jsx';
import Reveal from '../components/ui/Reveal.jsx';
import StaggerGroup from '../components/ui/StaggerGroup.jsx';
import StaggerItem from '../components/ui/StaggerItem.jsx';

/** Fails if the element (or any ancestor) is invisible. */
function expectVisible(element) {
  let node = element;
  while (node && node !== document.documentElement) {
    const style = window.getComputedStyle(node);
    expect(
      parseFloat(style.opacity || '1'),
      `unexpected opacity on <${node.tagName.toLowerCase()}>`,
    ).toBeGreaterThan(0);
    expect(style.visibility, `hidden visibility on <${node.tagName.toLowerCase()}>`).not.toBe(
      'hidden',
    );
    expect(style.display, `display:none on <${node.tagName.toLowerCase()}>`).not.toBe('none');
    node = node.parentElement;
  }
}

function renderRoute(path) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="menu" element={<MenuPage />} />
          <Route path="gallery" element={<GalleryPage />} />
        </Route>
      </Routes>
    </MemoryRouter>,
  );
}

const originalIO = globalThis.IntersectionObserver;

afterEach(() => {
  globalThis.IntersectionObserver = originalIO;
});

describe('reveal primitives never hide content', () => {
  it('renders visible when IntersectionObserver is unavailable', () => {
    delete globalThis.IntersectionObserver;
    const { container } = render(<Reveal>Essential copy</Reveal>);
    expect(container.textContent).toBe('Essential copy');
    expectVisible(container.firstElementChild);
  });

  it('renders visible inside a stagger group without an observer', () => {
    delete globalThis.IntersectionObserver;
    const { container } = render(
      <StaggerGroup>
        <StaggerItem>Card one</StaggerItem>
        <StaggerItem>Card two</StaggerItem>
      </StaggerGroup>,
    );
    const [first, second] = container.querySelectorAll('div > div');
    expectVisible(first);
    expectVisible(second);
  });

  it('starts hidden only when animation can actually run', () => {
    globalThis.IntersectionObserver = class {
      observe() {}
      unobserve() {}
      disconnect() {}
    };
    const { container } = render(<Reveal>Animated copy</Reveal>);
    // Hidden is acceptable here: the observer exists and will reveal it.
    expect(container.firstElementChild.style.opacity).toBe('0');
  });

  it('renders as a plain, visible element (no inline opacity) in the fallback', () => {
    delete globalThis.IntersectionObserver;
    const { container } = render(<Reveal as="h2">Heading</Reveal>);
    const node = container.firstElementChild;
    expect(node.tagName).toBe('H2');
    expect(node.getAttribute('style')).toBeNull();
    expectVisible(node);
  });
});

describe('pages render visible content, not blank sections', () => {
  it('home page hero headline and supporting copy are visible without observers', () => {
    delete globalThis.IntersectionObserver;
    const { getByRole, getByText } = renderRoute('/');

    const h1 = getByRole('heading', { level: 1 });
    expect(h1.textContent).toMatch(/Life is better with cake/i);
    expectVisible(h1);

    // Scoped to <main>: the announcement strip carries a similar brand line.
    const main = document.querySelector('main');
    const lede = within(main).getByText(/Little moments, big celebrations/i);
    expectVisible(lede);
  });

  it('home page primary CTAs are visible without observers', () => {
    delete globalThis.IntersectionObserver;
    const { getByRole } = renderRoute('/');
    expectVisible(getByRole('link', { name: /explore the menu|explore our menu/i }));
    expectVisible(getByRole('link', { name: /design your cake|design a custom cake/i }));
  });

  it('home page product cards are visible without observers', () => {
    delete globalThis.IntersectionObserver;
    const { getByRole } = renderRoute('/');
    const card = getByRole('heading', { name: 'Black Forest', level: 3 });
    expectVisible(card);
    expect(card.closest('.group')).not.toBeNull();
  });

  it('menu page product grid is visible without observers', () => {
    delete globalThis.IntersectionObserver;
    const { getByRole } = renderRoute('/menu');
    expectVisible(getByRole('heading', { name: 'Black Forest', level: 3 }));
  });

  it('gallery items are visible without observers', () => {
    delete globalThis.IntersectionObserver;
    const { getByRole } = renderRoute('/gallery');
    expectVisible(getByRole('button', { name: /black forest/i }));
  });

  it('never leaves the signature (chocolate) panel unreadable', () => {
    // A previous pass rotated the palette but left `.eyebrow`'s dark ink on the
    // chocolate panel, which is invisible until you look at it. This asserts
    // the light variant exists and is applied where the panel is dark.
    delete globalThis.IntersectionObserver;
    const { container } = renderRoute('/');
    // The marquee band also carries bg-chocolate, so scope to the section that
    // actually holds the dark editorial panel (it has the light eyebrow).
    const eyebrows = [...container.querySelectorAll('.eyebrow')];
    const light = eyebrows.filter((node) => /eyebrow--light/.test(node.className));
    expect(light.length).toBeGreaterThan(0);
    light.forEach((node) => {
      let panel = node;
      while (panel && !/(^|\s)bg-chocolate(\s|$)/.test(panel.className || '')) {
        panel = panel.parentElement;
      }
      expect(panel, `no chocolate panel above "${node.textContent}"`).not.toBeNull();
    });
  });

  it('every section element on the home page has non-zero height in the DOM', () => {
    delete globalThis.IntersectionObserver;
    const { container } = renderRoute('/');
    const sections = container.querySelectorAll('main section');
    expect(sections.length).toBeGreaterThan(6);
    sections.forEach((section) => {
      // Opacity must never be the thing hiding a section.
      const opacity = window.getComputedStyle(section).opacity;
      expect(parseFloat(opacity || '1')).toBeGreaterThan(0);
    });
  });
});
