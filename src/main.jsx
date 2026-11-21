import { StrictMode, Suspense, lazy } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout.jsx';
import HomePage from './pages/HomePage.jsx';
import './styles/index.css';

/**
 * Route-level code splitting.
 * The homepage (the primary landing experience) is eager; every other route
 * is fetched on navigation so first paint stays light.
 */
const MenuPage = lazy(() => import('./pages/MenuPage.jsx'));
const GalleryPage = lazy(() => import('./pages/GalleryPage.jsx'));
const CustomCakesPage = lazy(() => import('./pages/CustomCakesPage.jsx'));
const AboutPage = lazy(() => import('./pages/AboutPage.jsx'));
const ContactPage = lazy(() => import('./pages/ContactPage.jsx'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage.jsx'));

/** Minimal, calm route-loading state (no spinner theatre). */
function RouteFallback() {
  return (
    <div className="container-page flex min-h-[60vh] items-center justify-center" role="status" aria-live="polite">
      <span className="font-display text-lg italic text-ink-faint">Setting the table…</span>
    </div>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <BrowserRouter>
      <Suspense fallback={<RouteFallback />}>
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
      </BrowserRouter>
  </StrictMode>,
);
