import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { projects, projectCategories } from '@/config';
import { ProjectCard } from '@/components/ProjectCard';

export function WorkPage() {
  const [active, setActive] = useState<(typeof projectCategories)[number]>('All');

  const filtered = useMemo(
    () => (active === 'All' ? projects : projects.filter((p) => p.category === active)),
    [active],
  );

  return (
    <section className="section-pad bg-paper pt-28 md:pt-32">
      <div className="container-edge">
        {/* Page header */}
        <div className="reveal">
          <div className="eyebrow text-forest">Portfolio</div>
          <h1 className="font-display text-display font-bold mt-4 max-w-3xl text-balance">
            Selected Work.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-ink/60 text-pretty leading-relaxed">
            A closer look at the ideas, visuals, and creative decisions behind
            my work.
          </p>
        </div>

        {/* Filters */}
        <div className="mt-12 flex flex-wrap gap-2 reveal">
          {projectCategories.map((cat) => {
            const isActive = active === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setActive(cat)}
                className={`px-4 py-2 text-sm rounded-full border transition-colors duration-200 ${
                  isActive
                    ? 'bg-ink text-paper border-ink'
                    : 'bg-paper text-ink/70 border-ink/15 hover:border-ink hover:text-ink'
                }`}
              >
                {cat === 'All' ? 'All Work' : cat}
              </button>
            );
          })}
        </div>

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="mt-10 grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-5">
            {filtered.map((p, i) => (
              <ProjectCard key={p.slug} project={p} index={i} />
            ))}
          </div>
        ) : (
          <p className="mt-16 text-ink/50">No projects in this category yet.</p>
        )}

        {/* CTA */}
        <div className="mt-14 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 reveal">
          <p className="text-ink/60 text-sm">
            Have a project in mind? Let's talk about how to make it stand out.
          </p>
          <Link to="/contact" className="btn-outline group">
            Start a Project
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
