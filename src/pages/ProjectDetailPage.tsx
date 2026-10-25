import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ArrowUpRight, Play } from 'lucide-react';
import { projects } from '@/config';

export function ProjectDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const project = projects.find((p) => p.slug === slug);
  if (!project) return <Navigate to="/work" replace />;

  const index = projects.findIndex((p) => p.slug === slug);
  const next = projects[(index + 1) % projects.length];

  return (
    <article className="bg-paper pt-28 md:pt-32">
      {/* Header */}
      <div className="container-edge">
        <div className="reveal">
          <Link
            to="/work"
            className="inline-flex items-center gap-2 text-sm text-ink/60 hover:text-ink transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to all work
          </Link>

          <div className="mt-8 flex items-center gap-3">
            <span className="eyebrow bg-forest text-lime px-2.5 py-1 rounded-full text-[10px]">
              {project.category}
            </span>
            <span className="eyebrow text-ink/40">{project.year}</span>
          </div>

          <h1 className="font-display text-display font-bold mt-5 max-w-4xl text-balance">
            {project.title}
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-ink/65 text-pretty leading-relaxed">
            {project.description}
          </p>
        </div>
      </div>

      {/* Hero media */}
      <div className="mt-12 container-edge reveal">
        <div className="relative bg-forest-50 overflow-hidden">
          {project.videoSrc ? (
            <video
              src={project.videoSrc}
              poster={project.videoPoster ?? project.image}
              controls
              playsInline
              className="w-full aspect-video object-cover"
            />
          ) : (
            <img
              src={project.image}
              alt={project.alt}
              className="w-full aspect-video object-cover"
            />
          )}
          {!project.videoSrc && project.category === 'AI Videos' && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-lime text-ink">
                <Play className="h-6 w-6" />
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Brief + Process */}
      {(project.brief || project.process) && (
        <div className="container-edge mt-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {project.brief && (
              <div className="reveal">
                <div className="eyebrow text-forest">Creative Brief</div>
                <p className="mt-3 text-ink/70 leading-relaxed text-pretty">
                  {project.brief}
                </p>
              </div>
            )}
            {project.process && (
              <div className="reveal">
                <div className="eyebrow text-forest">Process</div>
                <p className="mt-3 text-ink/70 leading-relaxed text-pretty">
                  {project.process}
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Gallery (additional images) */}
      {project.gallery && project.gallery.length > 0 && (
        <div className="container-edge mt-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {project.gallery.map((g, i) => (
              <div key={i} className="overflow-hidden bg-forest-50 reveal">
                <img
                  src={g}
                  alt={`${project.title} — detail ${i + 1}`}
                  loading="lazy"
                  className="w-full aspect-[4/3] object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Next project + CTA */}
      <div className="container-edge mt-20">
        <div className="border-t border-ink/10 pt-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <Link
            to={`/work/${next.slug}`}
            className="group flex items-center gap-4"
          >
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-ink/15 group-hover:bg-ink group-hover:text-paper transition-colors">
              <ArrowRight className="h-5 w-5" />
            </span>
            <span>
              <span className="eyebrow text-ink/40 block">Next Project</span>
              <span className="font-display text-xl font-medium mt-1 block">
                {next.title}
              </span>
            </span>
          </Link>

          <Link to="/contact" className="btn-dark group">
            Start a similar project
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </div>

      <div className="section-pad" />
    </article>
  );
}
