import { Link, useLocation } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

export function FloatingCTA() {
  const { pathname } = useLocation();

  // On the book-appointment page, don't show the floating contact button —
  // it would compete with the booking flow's own CTA.
  if (pathname === '/book-appointment') return null;

  const isContact = pathname === '/contact';

  return (
    <div className="fixed bottom-5 right-5 z-40 lg:bottom-7 lg:right-7 safe-area">
      {isContact ? (
        <a
          href="#contact-form"
          className="btn bg-lime text-forest hover:bg-lime-300 px-5 py-3.5 text-sm font-semibold tracking-wide shadow-lg shadow-forest/15 group"
          aria-label="Scroll to the project inquiry form"
        >
          Let's Work Together
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>
      ) : (
        <Link
          to="/contact"
          className="btn bg-lime text-forest hover:bg-lime-300 px-5 py-3.5 text-sm font-semibold tracking-wide shadow-lg shadow-forest/15 group"
          aria-label="Go to the contact page to start a project inquiry"
        >
          Let's Work Together
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      )}
    </div>
  );
}
