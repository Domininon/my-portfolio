import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowUpRight, Calendar } from 'lucide-react';
import { nav, profile } from '@/config';

export function Header() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const isBookPage = pathname === '/book-appointment';

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-paper border-b border-ink/10">
      <div className="container-edge flex items-center justify-between py-3.5">
        <Link to="/" className="flex items-center gap-3 group">
          <span className="relative inline-block h-9 w-9 overflow-hidden rounded-full ring-1 ring-forest/20">
            <img
              src={profile.avatar.src}
              alt={profile.avatar.alt}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
          </span>
          <span className="flex flex-col leading-none">
            <span className="font-display text-sm font-semibold tracking-tight text-forest">
              {profile.name}
            </span>
            <span className="eyebrow mt-1 text-[10px] text-ink/50">
              {profile.role}
            </span>
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-7">
          {nav.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== '/' && pathname.startsWith(item.href) && item.href !== '/book-appointment');
            return (
              <Link
                key={item.href}
                to={item.href}
                className={`text-sm transition-colors duration-200 relative after:absolute after:inset-x-0 after:-bottom-1 after:h-0.5 after:origin-left after:scale-x-0 after:bg-forest after:transition-transform ${
                  isActive
                    ? 'text-forest after:scale-x-100 font-medium'
                    : 'text-forest/70 hover:text-forest hover:after:scale-x-100'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden lg:block">
          <Link
            to="/book-appointment"
            className={`btn group px-5 py-2.5 text-sm tracking-wide transition-all duration-300 ${
              isBookPage
                ? 'bg-forest text-paper'
                : 'bg-lime text-forest hover:bg-lime-300'
            }`}
          >
            <Calendar className="h-4 w-4" />
            Book an Appointment
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        <button
          type="button"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-full border border-forest/20 text-forest"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile menu — white background, forest-green text, consistent with desktop */}
      <div
        className={`lg:hidden overflow-hidden bg-paper transition-[max-height,opacity] duration-300 ease-out border-t border-ink/10 ${
          open ? 'max-h-[90vh] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="container-edge py-6 flex flex-col gap-1">
          {nav.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== '/' && pathname.startsWith(item.href) && item.href !== '/book-appointment');
            return (
              <Link
                key={item.href}
                to={item.href}
                onClick={() => setOpen(false)}
                className={`flex items-center justify-between py-4 text-xl font-display tracking-tight border-b border-ink/5 ${
                  isActive ? 'text-forest' : 'text-forest/70'
                }`}
              >
                {item.label}
                <ArrowUpRight className="h-4 w-4 text-forest/40" />
              </Link>
            );
          })}
          <Link
            to="/book-appointment"
            onClick={() => setOpen(false)}
            className="btn bg-lime text-forest hover:bg-lime-300 mt-6 w-full px-5 py-3.5 text-sm tracking-wide"
          >
            <Calendar className="h-4 w-4" />
            Book an Appointment
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </header>
  );
}
