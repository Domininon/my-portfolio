import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Adds `.is-visible` to any element with the `.reveal` class when it scrolls
// into view. Respects prefers-reduced-motion (handled in CSS).
export function useScrollReveal() {
  // Re-run on every pathname change so freshly-mounted page elements get
  // observed after a route transition.
  const { pathname } = useLocation();

  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>('.reveal'));
    if (els.length === 0) return;

    if (typeof IntersectionObserver === 'undefined') {
      els.forEach((el) => el.classList.add('is-visible'));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            io.unobserve(entry.target);
          }
        }
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.1 },
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname]);
}
