/**
 * Route smoke tests.
 * Renders every page inside a real router and asserts the key content and
 * conversion actions exist — a regression net for the whole app without a
 * browser in CI.
 */
import { describe, expect, it, vi } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { Suspense } from 'react';
import Layout from '../components/layout/Layout.jsx';
import HomePage from '../pages/HomePage.jsx';
import MenuPage from '../pages/MenuPage.jsx';
import GalleryPage from '../pages/GalleryPage.jsx';
import CustomCakesPage from '../pages/CustomCakesPage.jsx';
import AboutPage from '../pages/AboutPage.jsx';
import ContactPage from '../pages/ContactPage.jsx';
import NotFoundPage from '../pages/NotFoundPage.jsx';

function renderAt(path) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <Suspense fallback={<div>loading</div>}>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="menu" element={<MenuPage />} />
            <Route path="gallery" element={<GalleryPage />} />
            <Route path="custom-cakes" element={<CustomCakesPage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="contact" element={<ContactPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Suspense>
    </MemoryRouter>,
  );
}

describe('home page', () => {
  it('renders the hero headline and both primary CTAs', () => {
    renderAt('/');
    expect(
      screen.getByRole('heading', { level: 1, name: /life is better with cake/i }),
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /explore the menu/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /design your cake/i })).toBeInTheDocument();
  });

  it('exposes working phone and WhatsApp links', () => {
    renderAt('/');
    const calls = screen.getAllByRole('link', { name: /call/i });
    expect(calls.some((link) => link.getAttribute('href') === 'tel:+918838159344')).toBe(true);
    const whatsapps = screen.getAllByRole('link', { name: /whatsapp/i });
    expect(whatsapps.some((link) => link.getAttribute('href')?.startsWith('https://wa.me/918838159344'))).toBe(true);
  });

  it('does not render fabricated testimonials', () => {
    renderAt('/');
    expect(screen.getByText(/we have not published reviews yet/i)).toBeInTheDocument();
  });

  it('renders the primary navigation', () => {
    renderAt('/');
    const nav = screen.getByRole('navigation', { name: /primary/i });
    ['Menu', 'Gallery', 'Custom Cakes', 'About', 'Contact'].forEach((label) => {
      expect(within(nav).getByRole('link', { name: label })).toBeInTheDocument();
    });
  });
});

describe('menu page', () => {
  it('lists the full catalogue with counts', () => {
    renderAt('/menu');
    expect(screen.getByText(/18 cakes/i)).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Black Forest', level: 3 })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Belgium Chocolate', level: 3 })).toBeInTheDocument();
  });

  it('filters by category', async () => {
    const user = userEvent.setup();
    renderAt('/menu');
    await user.click(screen.getByRole('button', { name: /^Plum/i }));
    expect(screen.getByText(/3 cakes/i)).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Rich Plum' })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'Black Forest' })).not.toBeInTheDocument();
  });

  it('shows the honest empty state for unconfirmed categories', async () => {
    const user = userEvent.setup();
    renderAt('/menu');
    await user.click(screen.getByRole('button', { name: /Pastries/i }));
    expect(screen.getByText(/are available at the counter/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /ask on whatsapp/i })).toBeInTheDocument();
  });

  it('shows an empty state when filters match nothing', async () => {
    const user = userEvent.setup();
    renderAt('/menu');
    await user.type(screen.getByLabelText(/search cakes by name/i), 'zzzz');
    expect(screen.getByText(/no cakes match those filters/i)).toBeInTheDocument();
  });

  it('shows the allergen notice', () => {
    renderAt('/menu');
    expect(screen.getByText(/allergens & dietary notes/i)).toBeInTheDocument();
  });
});

describe('custom cakes page', () => {
  it('blocks submission and lists field errors when empty', async () => {
    const user = userEvent.setup();
    renderAt('/custom-cakes');
    await user.click(screen.getByRole('button', { name: /send enquiry on whatsapp/i }));
    expect(await screen.findByText(/please check 7 fields/i)).toBeInTheDocument();
  });

  it('validates the phone number format', async () => {
    const user = userEvent.setup();
    renderAt('/custom-cakes');
    const phone = screen.getByLabelText(/phone number/i);
    await user.type(phone, '12345');
    await user.click(screen.getByRole('button', { name: /send enquiry on whatsapp/i }));
    expect((await screen.findAllByText(/valid 10-digit indian mobile/i)).length).toBeGreaterThan(0);
  });

  it('tells the customer the order is not confirmed', () => {
    renderAt('/custom-cakes');
    expect(
      screen.getByText(/opening whatsapp does not confirm your order/i),
    ).toBeInTheDocument();
  });

  it('explains manual image attachment', () => {
    renderAt('/custom-cakes');
    expect(screen.getByText(/cannot attach files to whatsapp/i)).toBeInTheDocument();
  });
});

describe('gallery page', () => {
  it('renders gallery items and the placeholder disclaimer', () => {
    renderAt('/gallery');
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
    expect(screen.getByText(/15 images/i)).toBeInTheDocument();
    expect(screen.getAllByText(/illustrative editorial images/i).length).toBeGreaterThan(0);
  });

  it('filters gallery categories', async () => {
    const user = userEvent.setup();
    renderAt('/gallery');
    await user.click(screen.getByRole('button', { name: 'Chocolate' }));
    expect(screen.getByText(/4 images/i)).toBeInTheDocument();
  });
});

describe('about and contact pages', () => {
  it('about page repeats the verified address and makes no unverifiable claims', () => {
    renderAt('/about');
    expect(screen.getAllByText(/RPK Complex/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/what we do not claim/i)).toBeInTheDocument();
  });

  it('contact page shows phone, address, directions and honest pending states', () => {
    renderAt('/contact');
    expect(screen.getAllByText('+91 88381 59344').length).toBeGreaterThan(0);
    expect(screen.getAllByText(/opening hours/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/swiggy & zomato/i).length).toBeGreaterThan(0);
    const directions = screen.getAllByRole('link', { name: /directions/i });
    expect(directions[0].getAttribute('href')).toContain('google.com/maps');
  });

  it('renders the embedded map with a descriptive title', () => {
    renderAt('/contact');
    expect(
      screen.getByTitle(/map showing the cake n crush address/i),
    ).toBeInTheDocument();
  });
});

describe('404', () => {
  it('renders the not found page and marks it noindex', () => {
    renderAt('/no-such-page');
    expect(screen.getByRole('heading', { name: /this slice has gone missing/i })).toBeInTheDocument();
    expect(document.head.querySelector('meta[name="robots"]')?.getAttribute('content')).toBe(
      'noindex, follow',
    );
  });
});

describe('SEO per route', () => {
  it.each([
    ['/', /Cake N Crush — Patisserie/i],
    ['/menu', /Our Menu/i],
    ['/gallery', /Gallery/i],
    ['/custom-cakes', /Custom Cakes in Madurai/i],
    ['/about', /About Cake N Crush/i],
    ['/contact', /Contact & Location/i],
  ])('sets a unique title for %s', (path, pattern) => {
    renderAt(path);
    expect(document.title).toMatch(pattern);
  });

  it('sets canonical and og:url to the same absolute URL', () => {
    renderAt('/menu');
    const canonical = document.head.querySelector('link[rel="canonical"]')?.getAttribute('href');
    const ogUrl = document.head.querySelector('meta[property="og:url"]')?.getAttribute('content');
    expect(canonical).toMatch(/\/menu$/);
    expect(ogUrl).toBe(canonical);
  });

  it('emits Bakery structured data without ratings on the contact page', () => {
    renderAt('/contact');
    const script = document.getElementById('structured-data-page');
    expect(script).not.toBeNull();
    const json = script.textContent;
    expect(json).toContain('"Bakery"');
    expect(json).not.toContain('aggregateRating');
  });
});
