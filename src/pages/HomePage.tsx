import { Link } from 'react-router-dom';
import { ArrowUpRight, ArrowDown } from 'lucide-react';
import { profile, projects, services } from '@/config';
import { Marquee } from '@/components/Marquee';
import { ProjectCard } from '@/components/ProjectCard';

export function HomePage() {
  const featured = projects.slice(0, 3);
  const featuredProject = projects.find((p) => p.span === 'wide') ?? projects[0];

  return (
    <>
      {/* HERO */}
      <section className="relative bg-forest text-paper grain overflow-hidden pt-28 md:pt-36">
        <div className="pointer-events-none absolute -right-32 -top-20 h-96 w-96 rounded-full bg-lime/15 blur-3xl" />

        <div className="container-edge relative pb-16 md:pb-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            <div className="lg:col-span-7 order-2 lg:order-1">
              <div className="eyebrow text-lime flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-lime animate-pulse" />
                {profile.role}
              </div>

              <h1 className="font-display text-hero font-bold mt-6 text-balance">
                Ideas, Made{' '}
                <span className="text-lime">Impossible</span> to Ignore.
              </h1>

              <p className="mt-8 max-w-xl text-base md:text-lg text-paper/75 text-pretty leading-relaxed">
                I'm a multidisciplinary creative working across brand design,
                photorealistic AI visuals, video creation, and professional
                print. I turn concepts into visual experiences designed to
                capture attention and communicate with purpose.
              </p>

              <div className="mt-10 flex flex-wrap items-center gap-3">
                <Link to="/work" className="btn-primary group">
                  Explore the Work
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
                <Link
                  to="/contact"
                  className="btn border border-paper/30 text-paper hover:bg-paper hover:text-ink px-6 py-3.5 text-sm tracking-wide"
                >
                  Start a Project
                </Link>
              </div>

              <div className="eyebrow mt-10 text-paper/45">
                {profile.disciplines.join(' / ')}
              </div>
            </div>

            <div className="lg:col-span-5 order-1 lg:order-2">
              <div className="relative mx-auto max-w-sm lg:max-w-none">
                <div className="absolute -inset-3 border border-lime/30 rotate-2" aria-hidden />
                <div className="relative overflow-hidden bg-forest-700">
                  <img
                    src={profile.portrait.src}
                    alt={profile.portrait.alt}
                    className="aspect-[4/5] w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-forest/70 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                    <span className="eyebrow text-paper/80">{profile.name}</span>
                    <span className="eyebrow text-lime">Brand · AI · Print</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container-edge relative pb-10 hidden md:flex items-center gap-3 text-paper/50">
          <ArrowDown className="h-4 w-4 animate-bounce" />
          <span className="eyebrow text-[10px]">Scroll to explore</span>
        </div>
      </section>

      <Marquee />

      {/* SELECTED WORK PREVIEW */}
      <section className="section-pad bg-paper">
        <div className="container-edge">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 reveal">
            <div>
              <div className="eyebrow text-forest">Selected Work</div>
              <h2 className="font-display text-section font-bold mt-4 max-w-2xl text-balance">
                A first look at recent visual ideas.
              </h2>
            </div>
            <Link
              to="/work"
              className="btn-outline group self-start md:self-auto"
            >
              View all work
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-5">
            {featured.map((p, i) => (
              <ProjectCard key={p.slug} project={p} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* DISCIPLINES */}
      <section className="section-pad bg-ink text-paper">
        <div className="container-edge">
          <div className="reveal">
            <div className="eyebrow text-lime">Disciplines</div>
            <h2 className="font-display text-section font-bold mt-4 max-w-2xl text-balance">
              Four capabilities, one creative mind.
            </h2>
          </div>

          <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-px bg-paper/10 border border-paper/10">
            {services.map((s) => {
              const Icon = s.icon;
              return (
                <Link
                  to="/services"
                  key={s.id}
                  className="group bg-ink p-8 md:p-10 hover:bg-forest-600 transition-colors duration-300 reveal block"
                >
                  <div className="flex items-start justify-between">
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-lime/10 text-lime ring-1 ring-lime/30 transition-colors duration-300 group-hover:bg-lime group-hover:text-ink">
                      <Icon className="h-6 w-6" />
                    </span>
                    <span className="eyebrow text-paper/30">
                      {String(services.indexOf(s) + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <h3 className="font-display text-2xl md:text-3xl font-medium mt-8">
                    {s.label}
                  </h3>
                  <p className="mt-3 text-paper/65 max-w-md text-pretty leading-relaxed">
                    {s.description}
                  </p>
                  <span className="mt-6 inline-flex items-center gap-1.5 text-sm text-lime group-hover:text-paper transition-colors">
                    Explore service
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ABOUT PREVIEW */}
      <section className="section-pad bg-paper">
        <div className="container-edge">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            <div className="lg:col-span-5 reveal">
              <div className="relative max-w-sm">
                <div className="absolute -inset-2 bg-lime -rotate-2" aria-hidden />
                <div className="relative overflow-hidden">
                  <img
                    src={profile.portrait.src}
                    alt={profile.portrait.alt}
                    className="aspect-[4/5] w-full object-cover"
                  />
                </div>
              </div>
            </div>
            <div className="lg:col-span-7 reveal">
              <div className="eyebrow text-forest">About</div>
              <h2 className="font-display text-section font-bold mt-4 max-w-xl text-balance">
                The person behind the visuals.
              </h2>
              <p className="mt-6 text-lg text-ink/70 max-w-xl text-pretty leading-relaxed">
                I'm a multidisciplinary creative who enjoys turning ideas into
                visual work with purpose and personality — connecting brand
                design, AI-generated imagery and video, and professional print
                production.
              </p>
              <Link
                to="/about"
                className="btn-outline group mt-8"
              >
                More about me
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED PROJECT */}
      <section className="bg-ink text-paper section-pad">
        <div className="container-edge">
          <div className="reveal">
            <div className="eyebrow text-lime">Featured</div>
            <h2 className="font-display text-section font-bold mt-4 max-w-2xl text-balance">
              A closer look at one selected project.
            </h2>
          </div>
          {featuredProject && (
            <Link
              to={`/work/${featuredProject.slug}`}
              className="group mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center block"
            >
              <div className="lg:col-span-7 reveal">
                <div className="relative overflow-hidden bg-forest-600">
                  <img
                    src={featuredProject.image}
                    alt={featuredProject.alt}
                    className="w-full aspect-[16/10] object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <span className="absolute top-4 left-4 eyebrow bg-paper/90 text-ink px-2.5 py-1 rounded-full text-[10px]">
                    {featuredProject.category}
                  </span>
                </div>
              </div>
              <div className="lg:col-span-5 reveal">
                <h3 className="font-display text-3xl md:text-4xl font-medium">
                  {featuredProject.title}
                </h3>
                <p className="mt-4 text-paper/65 text-pretty leading-relaxed max-w-md">
                  {featuredProject.description}
                </p>
                <span className="mt-6 inline-flex items-center gap-1.5 text-sm text-lime group-hover:text-paper transition-colors">
                  View project
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </div>
            </Link>
          )}
        </div>
      </section>

      {/* INVITATION */}
      <section className="bg-forest text-paper grain section-pad">
        <div className="container-edge text-center reveal">
          <div className="eyebrow text-lime">Let's Work Together</div>
          <h2 className="font-display text-display font-bold mt-6 max-w-3xl mx-auto text-balance">
            Have an idea worth making impossible to ignore?
          </h2>
          <Link to="/contact" className="btn-primary group mt-10">
            Start a Project
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </section>
    </>
  );
}
