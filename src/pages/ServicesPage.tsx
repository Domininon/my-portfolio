import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { services } from '@/config';

export function ServicesPage() {
  return (
    <section className="section-pad bg-paper pt-28 md:pt-32">
      <div className="container-edge">
        <div className="reveal">
          <div className="eyebrow text-forest">Services</div>
          <h1 className="font-display text-display font-bold mt-4 max-w-3xl text-balance">
            Four disciplines, one creative mind.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-ink/60 text-pretty leading-relaxed">
            Available services depend on the actual project requirements —
            scope, format, and output are tailored to each brief.
          </p>
        </div>

        <div className="mt-16 space-y-20 md:space-y-28">
          {services.map((s, i) => {
            const Icon = s.icon;
            const reversed = i % 2 === 1;
            return (
              <div
                key={s.id}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
              >
                {/* Image */}
                <div className={`lg:col-span-6 reveal ${reversed ? 'lg:order-2' : ''}`}>
                  <div className="relative overflow-hidden bg-forest-50">
                    <img
                      src={s.image}
                      alt={`${s.label} — service placeholder`}
                      loading="lazy"
                      className="w-full aspect-[3/2] object-cover"
                    />
                    <span className="absolute top-4 left-4 eyebrow bg-paper/90 text-ink px-3 py-1.5 rounded-full text-[10px]">
                      {s.tagline}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className={`lg:col-span-6 reveal ${reversed ? 'lg:order-1' : ''}`}>
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-forest text-lime">
                    <Icon className="h-6 w-6" />
                  </span>
                  <h2 className="font-display text-3xl md:text-4xl font-bold mt-6">
                    {s.label}
                  </h2>
                  <p className="mt-4 text-ink/65 text-pretty leading-relaxed max-w-md">
                    {s.description}
                  </p>

                  <ul className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5">
                    {s.offerings.map((o) => (
                      <li key={o} className="flex items-center gap-2 text-sm text-ink/70">
                        <span className="h-1 w-1 rounded-full bg-forest" />
                        {o}
                      </li>
                    ))}
                  </ul>

                  <Link
                    to={`/contact?service=${encodeURIComponent(s.label)}`}
                    className="btn-dark group mt-8"
                  >
                    Start a {s.label} project
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
