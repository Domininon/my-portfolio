import { useSearchParams } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { contact, profile } from '@/config';
import { ContactForm } from '@/components/ContactForm';

export function ContactPage() {
  const [params] = useSearchParams();
  const presetService = params.get('service') ?? undefined;

  return (
    <section className="section-pad bg-forest text-paper grain pt-28 md:pt-32">
      <div className="container-edge">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left: copy + contact details */}
          <div className="lg:col-span-5 reveal">
            <div className="eyebrow text-lime">Contact</div>
            <h1 className="font-display text-display font-bold mt-4 text-balance">
              Let's make something that stands out.
            </h1>
            <p className="mt-6 text-paper/70 max-w-md text-pretty leading-relaxed">
              Have an idea you want to bring to life? Tell me about your
              project, and let's explore how we can make it happen.
            </p>

            <div className="mt-10 space-y-4 text-sm">
              {contact.email && (
                <div>
                  <div className="eyebrow text-paper/40">Email</div>
                  <a
                    href={`mailto:${contact.email}`}
                    className="text-paper hover:text-lime transition-colors"
                  >
                    {contact.email}
                  </a>
                </div>
              )}
              {contact.phone && (
                <div>
                  <div className="eyebrow text-paper/40">Phone</div>
                  <a
                    href={`tel:${contact.phone}`}
                    className="text-paper hover:text-lime transition-colors"
                  >
                    {contact.phone}
                  </a>
                </div>
              )}
            </div>

            {contact.socials.some((s) => s.href) && (
              <div className="mt-10">
                <div className="eyebrow text-paper/40">Elsewhere</div>
                <div className="mt-3 flex flex-wrap gap-3">
                  {contact.socials
                    .filter((s) => s.href)
                    .map((s) => (
                      <a
                        key={s.label}
                        href={s.href}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="inline-flex items-center gap-1.5 text-sm text-paper/70 hover:text-lime transition-colors"
                      >
                        {s.label}
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </a>
                    ))}
                </div>
              </div>
            )}

            <p className="mt-10 text-xs text-paper/40 leading-relaxed max-w-sm">
              Note: {profile.name} reviews every inquiry directly. Fields
              marked with * are required; budget is optional.
            </p>
          </div>

          {/* Right: form on white card for contrast */}
          <div className="lg:col-span-7 reveal">
            <div className="bg-paper text-ink p-6 md:p-10 rounded-md">
              <ContactForm presetService={presetService} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
