import { Link } from 'react-router-dom';
import { ArrowUpRight, Play } from 'lucide-react';
import type { Project } from '@/config';

const spanClass: Record<NonNullable<Project['span']>, string> = {
  sm: 'md:col-span-3',
  md: 'md:col-span-4',
  lg: 'md:col-span-6',
  wide: 'md:col-span-8',
  tall: 'md:col-span-4 md:row-span-2',
};

const aspectClass: Record<NonNullable<Project['span']>, string> = {
  sm: 'aspect-[4/3]',
  md: 'aspect-[4/3]',
  lg: 'aspect-[16/10]',
  wide: 'aspect-[16/9]',
  tall: 'aspect-[3/4] md:h-full',
};

export function ProjectCard({ project, index = 0 }: { project: Project; index?: number }) {
  const span = project.span ?? 'md';
  const isVideo = project.category === 'AI Videos' || !!project.videoPoster;

  return (
    <Link
      to={`/work/${project.slug}`}
      className={`group relative overflow-hidden bg-forest-50 text-left reveal block ${spanClass[span]}`}
      style={{ transitionDelay: `${(index % 4) * 60}ms` }}
    >
      <div className={`relative w-full ${aspectClass[span]}`}>
        <img
          src={project.image}
          alt={project.alt}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </div>

      <div className="absolute top-3 left-3 flex items-center gap-2">
        <span className="eyebrow bg-paper/90 text-ink px-2.5 py-1 rounded-full text-[10px]">
          {project.category}
        </span>
        {isVideo && (
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-lime text-ink">
            <Play className="h-3.5 w-3.5" />
          </span>
        )}
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-3 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
        <div className="flex items-end justify-between gap-3">
          <h3 className="font-display text-lg text-paper font-medium leading-tight">
            {project.title}
          </h3>
          <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-lime text-ink">
            <ArrowUpRight className="h-4 w-4" />
          </span>
        </div>
      </div>
    </Link>
  );
}
