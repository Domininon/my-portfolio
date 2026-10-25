import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { profile, process } from '@/config';

export function AboutPage() {
  return (
    <>
      <section className="section-pad bg-paper pt-28 md:pt-32">
        <div className="container-edge">
          <div className="eyebrow text-forest reveal">About</div>
          <h1 className="font-display text-display font-bold mt-4 max-w-4xl text-balance reveal">
            The Person Behind the Visuals.
          </h1>
        </div>
      </section>

      <section className="bg-paper pb-20 md:pb-28">
        <div className="container-edge">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            <div className="lg:col-span-5 reveal">
              <div className="relative max-w-sm sticky top-28">
                <div className="absolute -inset-2 bg-lime -rotate-2" aria-hidden />
                <div className="relative overflow-hidden">
                  <img
                    src={profile.portrait.src}
                    alt={profile.portrait.alt}
                    className="aspect-[4/5] w-full object-cover"
                  />
                </div>
                <div className="mt-6">
                  <div className="eyebrow text-ink/40">Disciplines</div>
                  <div className="mt-3 flex flex-wrap gap-x-6 gap-y-2">
                    {profile.disciplines.map((d) => (
                      <div key={d} className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-forest" />
                        <span className="eyebrow text-ink/70">{d}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-6 text-lg text-ink/75 leading-relaxed reveal">
              <p>
                I'm a multidisciplinary creative who enjoys turning ideas into
                visual work with purpose and personality.
              </p>
              <p>
                My work connects brand design, AI-generated imagery and video,
                and professional print production. I enjoy exploring how an idea
                can become a distinctive identity, a compelling visual campaign,
                a moving image, or a finished printed piece.
              </p>
              <p>
                I care about the details: the composition, the typography, the
                story, and how the final result communicates.
              </p>
              <p>
                For me, the goal is not simply to make something look good.
                It's to make the visual direction feel intentional and the
                finished work worth remembering.
              </p>

              <div className="pt-6">
                <Link to="/contact" className="btn-outline group">
                  Let's work together
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="bg-ink text-paper section-pad">
        <div className="container-edge">
          <div className="reveal">
            <div className="eyebrow text-lime">How I Work</div>
            <h2 className="font-display text-section font-bold mt-4 max-w-xl text-balance">
              A simple, considered process.
            </h2>
          </div>

          <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-paper/10 border border-paper/10">
            {process.map((stage) => {
              const Icon = stage.icon;
              return (
                <div
                  key={stage.step}
                  className="group relative bg-ink p-8 transition-colors duration-300 hover:bg-forest-600 reveal"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-display text-5xl font-bold text-lime">
                      {stage.step}
                    </span>
                    <Icon className="h-6 w-6 text-paper/30" />
                  </div>
                  <h3 className="font-display text-xl font-medium mt-6">
                    {stage.title}
                  </h3>
                  <p className="mt-2 text-sm text-paper/65 leading-relaxed">
                    {stage.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
