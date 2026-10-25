import { Link } from 'react-router-dom';
import { ArrowUp } from 'lucide-react';
import { profile, contact, nav } from '@/config';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-forest text-paper grain">
      <div className="container-edge py-14">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          <div className="md:col-span-5">
            <Link to="/" className="flex items-center gap-3 group">
              <span className="relative inline-block h-9 w-9 overflow-hidden rounded-full ring-1 ring-paper/20">
                <img
                  src={profile.avatar.src}
                  alt={profile.avatar.alt}
                  className="h-full w-full object-cover"
                />
              </span>
              <span className="font-display text-base font-semibold">
                {profile.name}
              </span>
            </Link>
            <p className="mt-4 max-w-sm text-sm text-paper/60 leading-relaxed text-pretty">
              {profile.footerBlurb}
            </p>
          </div>

          <div className="md:col-span-3">
            <div className="eyebrow text-paper/40">Navigate</div>
            <ul className="mt-4 space-y-2.5">
              {nav.map((n) => (
                <li key={n.href}>
                  <Link
                    to={n.href}
                    className="text-sm text-paper/70 hover:text-lime transition-colors"
                  >
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4">
            <div className="eyebrow text-paper/40">Connect</div>
            <div className="mt-4 space-y-2.5">
              {contact.email && (
                <a
                  href={`mailto:${contact.email}`}
                  className="block text-sm text-paper/70 hover:text-lime transition-colors"
                >
                  {contact.email}
                </a>
              )}
              {contact.phone && (
                <a
                  href={`tel:${contact.phone}`}
                  className="block text-sm text-paper/70 hover:text-lime transition-colors"
                >
                  {contact.phone}
                </a>
              )}
              {contact.socials
                .filter((s) => s.href)
                .map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="block text-sm text-paper/70 hover:text-lime transition-colors"
                  >
                    {s.label}
                  </a>
                ))}
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-paper/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-xs text-paper/50">
            © {year} {profile.name}. All rights reserved.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs text-paper/50 hover:text-lime transition-colors"
          >
            Back to top
            <ArrowUp className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
