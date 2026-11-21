import { Link } from 'react-router-dom';
import Seo from '../components/seo/Seo.jsx';
import Button from '../components/ui/Button.jsx';

export default function NotFoundPage() {
  return (
    <>
      <Seo
        title="Page not found"
        description="This page could not be found. Browse the Cake N Crush menu or contact the bakery in Madurai."
        path="/404"
        noindex
      />
      <section className="bg-vanilla">
        <div className="container-page flex min-h-[62vh] flex-col items-start justify-center py-16 md:py-24">
          <p className="eyebrow">Error 404</p>
          <h1 className="display-lg mt-5 max-w-[18ch]">This slice has gone missing.</h1>
          <p className="lede mt-5">
            The page you were looking for is not here. The catalogue is a good place to
            start again.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button to="/menu" variant="primary">
              Browse the menu
            </Button>
            <Button to="/" variant="outline">
              Back to home
            </Button>
          </div>
          <p className="mt-8 text-[0.8125rem] text-ink-faint">
            Looking for something specific?{' '}
            <Link to="/contact" className="underline underline-offset-4 hover:text-ink">
              Contact the bakery
            </Link>
            .
          </p>
        </div>
      </section>
    </>
  );
}
