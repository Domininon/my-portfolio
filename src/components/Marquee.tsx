import { profile } from '@/config';

export function Marquee() {
  const items = [...profile.disciplines, 'Visual Direction', 'Concept to Print'];
  const loop = [...items, ...items, ...items, ...items];

  return (
    <div className="bg-lime text-ink overflow-hidden py-3.5 border-y border-ink/10">
      <div className="flex w-max animate-marquee whitespace-nowrap">
        {loop.map((item, i) => (
          <span key={i} className="flex items-center">
            <span className="eyebrow px-6">{item}</span>
            <span className="text-ink/30" aria-hidden>✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
