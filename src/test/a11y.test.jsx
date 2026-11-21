/**
 * Accessibility invariants.
 * Structural checks that don't need a browser: heading order, label
 * association, image alt text, focusable controls, landmark structure.
 */
import { describe, expect, it } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import Layout from '../components/layout/Layout.jsx';
import HomePage from '../pages/HomePage.jsx';
import MenuPage from '../pages/MenuPage.jsx';
import CustomCakesPage from '../pages/CustomCakesPage.jsx';
import ContactPage from '../pages/ContactPage.jsx';

function renderAt(path) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="menu" element={<MenuPage />} />
          <Route path="custom-cakes" element={<CustomCakesPage />} />
          <Route path="contact" element={<ContactPage />} />
        </Route>
      </Routes>
    </MemoryRouter>,
  );
}

describe('accessibility structure', () => {
  it.each(['/', '/menu', '/custom-cakes', '/contact'])('has exactly one h1 on %s', (path) => {
    const { container } = renderAt(path);
    expect(container.querySelectorAll('h1')).toHaveLength(1);
  });

  it.each(['/', '/menu', '/custom-cakes', '/contact'])(
    'has a skip link, main landmark and banner on %s',
    (path) => {
      renderAt(path);
      expect(screen.getByRole('link', { name: /skip to content/i })).toBeInTheDocument();
      expect(screen.getByRole('main')).toBeInTheDocument();
      expect(screen.getByRole('banner')).toBeInTheDocument();
      expect(screen.getByRole('contentinfo')).toBeInTheDocument();
    },
  );

  it('gives every rendered image alt text', () => {
    const { container } = renderAt('/menu');
    const images = Array.from(container.querySelectorAll('img'));
    expect(images.length).toBeGreaterThan(0);
    // Decorative LQIP placeholders are explicitly aria-hidden with empty alt.
    images.forEach((img) => {
      const decorative = img.getAttribute('aria-hidden') === 'true';
      expect(decorative || (img.getAttribute('alt') ?? '').length > 0).toBe(true);
    });
  });

  it('labels every form control on the custom cake page', () => {
    const { container } = renderAt('/custom-cakes');
    const controls = Array.from(
      container.querySelectorAll('input:not([type="hidden"]), select, textarea'),
    ).filter((control) => control.type !== 'radio'); // radios use a fieldset legend + visible label

    controls.forEach((control) => {
      const id = control.getAttribute('id');
      const hasLabel = id && container.querySelector(`label[for="${id}"]`);
      const wrapped = control.closest('label');
      const ariaLabel = control.getAttribute('aria-label');
      expect(Boolean(hasLabel || wrapped || ariaLabel)).toBe(true);
    });
  });

  it('groups the dietary radios inside a labelled fieldset', () => {
    const { container } = renderAt('/custom-cakes');
    const radios = container.querySelectorAll('input[name="dietaryType"]');
    expect(radios.length).toBe(2);
    const fieldset = radios[0].closest('fieldset');
    expect(fieldset).not.toBeNull();
    expect(fieldset.querySelector('legend')?.textContent).toMatch(/eggless or regular/i);
  });

  it('marks required fields and invalid state accessibly', () => {
    const { container } = renderAt('/custom-cakes');
    expect(container.querySelector('#field-name')?.hasAttribute('required')).toBe(true);
    expect(container.querySelector('#field-name')?.getAttribute('aria-invalid')).toBeNull();
  });

  it('has no empty interactive controls', () => {
    const { container } = renderAt('/');
    const controls = Array.from(container.querySelectorAll('a, button'));
    controls.forEach((control) => {
      const text = (control.textContent || '').trim();
      const label = control.getAttribute('aria-label');
      expect(Boolean(text || label)).toBe(true);
    });
  });

  it('gives every nav landmark a distinct accessible name', () => {
    renderAt('/');
    const names = screen
      .getAllByRole('navigation')
      .map((nav) => nav.getAttribute('aria-label'))
      .filter(Boolean);
    expect(new Set(names).size).toBe(names.length);
  });

  it('does not rely on colour alone for selected filters (aria-pressed present)', () => {
    renderAt('/menu');
    const allCakes = screen.getByRole('button', { name: /all cakes/i });
    expect(allCakes).toHaveAttribute('aria-pressed', 'true');
    const eggless = screen.getByRole('button', { name: /^Eggless/i });
    expect(eggless).toHaveAttribute('aria-pressed', 'false');
  });

  it('keeps the mobile action bar out of the form route', () => {
    renderAt('/custom-cakes');
    expect(screen.queryByRole('region', { name: /quick contact/i })).not.toBeInTheDocument();
  });

  it('shows the quick contact region on other routes', () => {
    renderAt('/menu');
    const region = screen.getByRole('region', { name: /quick contact/i });
    expect(within(region).getByRole('link', { name: /call/i })).toBeInTheDocument();
  });
});
