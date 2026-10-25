import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

export function NotFoundPage() {
  return (
    <section className="min-h-[70vh] bg-forest text-paper grain flex items-center pt-28">
      <div className="container-edge text-center">
        <div className="eyebrow text-lime">404</div>
        <h1 className="font-display text-display font-bold mt-4 text-balance">
          This page is off-canvas.
        </h1>
        <p className="mt-5 text-paper/60 max-w-md mx-auto text-pretty">
          The page you're looking for doesn't exist or has moved. Let's get you
          back to the work.
        </p>
        <Link to="/" className="btn-primary group mt-10">
          Back to home
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </div>
    </section>
  );
}
