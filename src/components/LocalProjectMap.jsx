import { useMemo, useState } from 'react';
import { MapPin, Camera } from 'lucide-react';
import { NEIGHBORHOODS, publicProjects } from '../data/projects';
import ProjectSpecCard from './ProjectSpecCard';

// Neighborhood-filtered social proof. Pins are positioned as percentages on a
// stylized area panel, so there's no Google Maps JS payload and no layout shift.
// Reads real project data from src/data/projects.js; renders an honest
// "adding recent work" state while that array is still empty.

export default function LocalProjectMap() {
  const [active, setActive] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);
  const projects = useMemo(() => publicProjects(), []);

  const visible = useMemo(
    () => (active === 'All' ? projects : projects.filter((p) => p.neighborhood === active)),
    [active, projects]
  );
  const visibleIds = useMemo(() => new Set(visible.map((p) => p.id)), [visible]);

  return (
    <section id="project-map" aria-labelledby="map-heading" className="bg-slate-900 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-10 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-harvest-light">
            <MapPin size={12} /> Work Near You
          </div>
          <h2
            id="map-heading"
            className="mt-4 font-display uppercase tracking-tight text-3xl md:text-4xl font-bold text-white"
          >
            Projects Across Lompoc &amp; the Valley
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-slate-400">
            Filter by neighborhood to see work done right in your community.
          </p>
        </div>

        {projects.length === 0 ? (
          <div className="mx-auto max-w-xl rounded-2xl border border-slate-700 bg-slate-800/60 px-8 py-14 text-center">
            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-white/10">
              <Camera size={24} className="text-harvest-light" />
            </div>
            <h3 className="font-display uppercase tracking-tight text-xl font-semibold text-white">
              Adding Recent Work
            </h3>
            <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-slate-400">
              We're documenting completed projects across the valley, with before-and-after photos,
              plant palettes, and real water-savings numbers. Check back soon, or ask us for
              references directly.
            </p>
          </div>
        ) : (
          <>
            {/* Neighborhood filter */}
            <div role="tablist" aria-label="Filter by neighborhood" className="mb-10 flex flex-wrap justify-center gap-2">
              {['All', ...NEIGHBORHOODS].map((n) => {
                const selected = active === n;
                return (
                  <button
                    key={n}
                    role="tab"
                    aria-selected={selected}
                    onClick={() => setActive(n)}
                    className={`rounded-full px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-harvest ${
                      selected ? 'bg-harvest text-white shadow-sm' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    {n}
                  </button>
                );
              })}
            </div>

            <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr]">
              {/* Map panel */}
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-slate-700 bg-[radial-gradient(circle_at_30%_30%,#334155,#0f172a)]">
                <span className="pointer-events-none absolute left-4 top-4 font-display text-xs uppercase tracking-widest text-slate-500">
                  Santa Barbara County
                </span>
                {projects.map((p) => {
                  const on = visibleIds.has(p.id);
                  return (
                    <button
                      key={p.id}
                      onClick={() => setSelectedProject(p)}
                      aria-label={`View details: ${p.title} in ${p.neighborhood}`}
                      className="absolute transition-all duration-300"
                      style={{
                        left: `${p.mapX}%`,
                        top: `${p.mapY}%`,
                        opacity: on ? 1 : 0.3,
                        transform: `translate(-50%,-100%) scale(${on ? 1 : 0.82})`,
                      }}
                    >
                      <MapPin
                        size={28}
                        strokeWidth={2}
                        className={on ? 'fill-harvest text-harvest drop-shadow' : 'text-slate-500'}
                      />
                    </button>
                  );
                })}
              </div>

              {/* Synced project cards */}
              <ul className="grid grid-cols-2 content-start gap-4">
                {visible.map((p) => (
                  <li key={p.id} className="animate-fade-in">
                    <button
                      onClick={() => setSelectedProject(p)}
                      className="block w-full overflow-hidden rounded-xl border border-slate-700 bg-slate-800 text-left transition-colors hover:border-harvest focus:outline-none focus-visible:ring-2 focus-visible:ring-harvest"
                    >
                    {p.images.after ? (
                      <img
                        src={p.images.after}
                        alt={p.title}
                        loading="lazy"
                        className="aspect-[4/3] w-full object-cover"
                      />
                    ) : (
                      <div className="flex aspect-[4/3] w-full items-center justify-center bg-slate-700">
                        <Camera size={20} className="text-slate-500" />
                      </div>
                    )}
                    <div className="p-3">
                      <p className="text-[11px] font-bold uppercase tracking-wider text-harvest-light">{p.neighborhood}</p>
                      <p className="text-sm font-semibold text-white">{p.title}</p>
                      <p className="text-xs text-slate-400">{p.categories[0]}</p>
                    </div>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}
      </div>
      <ProjectSpecCard project={selectedProject} onClose={() => setSelectedProject(null)} />
    </section>
  );
}
