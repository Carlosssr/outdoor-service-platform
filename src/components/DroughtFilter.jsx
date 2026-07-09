import { useMemo, useState } from 'react';
import { Droplets, Sprout, Grid3x3, Trees, Wrench, Camera } from 'lucide-react';
import { CATEGORIES, publicProjects } from '../data/projects';
import ProjectSpecCard from './ProjectSpecCard';

// Water-smart portfolio filter. Multi-select (OR semantics): an empty selection
// shows everything; picking chips narrows to projects matching ANY chosen approach.
// Reads real project data from src/data/projects.js; renders an honest
// "adding recent work" state while that array is still empty.

const CATEGORY_ICONS = {
  'Xeriscaping/Drought-Tolerant': <Droplets size={16} />,
  'Native Central Coast Plantings': <Sprout size={16} />,
  'Artificial Turf': <Grid3x3 size={16} />,
  'Hardscaping/Patios': <Trees size={16} />,
  Irrigation: <Wrench size={16} />,
};

export default function DroughtFilter() {
  const [selected, setSelected] = useState(() => new Set());
  const [selectedProject, setSelectedProject] = useState(null);
  const projects = useMemo(() => publicProjects(), []);

  const toggle = (c) =>
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(c)) next.delete(c);
      else next.add(c);
      return next;
    });

  const visible = useMemo(() => {
    if (selected.size === 0) return projects;
    return projects.filter((it) => it.categories.some((c) => selected.has(c)));
  }, [selected, projects]);

  return (
    <section id="water-smart" aria-labelledby="pf-heading" className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-forest/10 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-forest">
            <Droplets size={12} /> Water-Smart Portfolio
          </div>
          <h2 id="pf-heading" className="section-title mt-4">
            Filter Our Work by What Matters on the Central Coast
          </h2>
          <p className="mt-3 text-gray-500 text-lg">
            Drought-tolerant, native, turf, or hardscaping. Every project we publish includes its
            plant palette and estimated water savings.
          </p>
        </div>

        {projects.length === 0 ? (
          <div className="rounded-2xl border border-gray-200 bg-sand px-8 py-14 text-center">
            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-forest/10">
              <Camera size={24} className="text-forest" />
            </div>
            <h3 className="font-display uppercase tracking-tight text-xl font-semibold text-forest">
              Adding Recent Work
            </h3>
            <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-gray-500">
              We publish each project with before-and-after photos, the full plant palette with
              WUCOLS water-use ratings, and estimated annual gallons saved. Real jobs are being
              documented now.
            </p>
          </div>
        ) : (
          <>
            {/* Filter chips (multi-select toggles) */}
            <div className="mb-10 flex flex-wrap gap-2">
              {CATEGORIES.map((label) => {
                const on = selected.has(label);
                return (
                  <button
                    key={label}
                    aria-pressed={on}
                    onClick={() => toggle(label)}
                    className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-harvest ${
                      on ? 'border-harvest bg-harvest text-white' : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
                    }`}
                  >
                    {CATEGORY_ICONS[label]}
                    {label}
                  </button>
                );
              })}
              {selected.size > 0 && (
                <button
                  onClick={() => setSelected(new Set())}
                  className="rounded-full px-4 py-2 text-sm font-medium text-gray-500 underline-offset-2 hover:underline"
                >
                  Clear ({selected.size})
                </button>
              )}
            </div>

            <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {visible.map((it) => (
                <li key={it.id} className="animate-fade-in">
                  <button
                    onClick={() => setSelectedProject(it)}
                    className="group block w-full overflow-hidden rounded-2xl border border-gray-200 bg-white text-left shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-harvest"
                  >
                  {it.images.after ? (
                    <div className="overflow-hidden">
                      <img
                        src={it.images.after}
                        alt={it.title}
                        loading="lazy"
                        className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  ) : (
                    <div className="flex aspect-[4/3] w-full items-center justify-center bg-gray-100">
                      <Camera size={20} className="text-gray-400" />
                    </div>
                  )}
                  <div className="p-4">
                    <p className="text-xs font-bold uppercase tracking-wider text-forest">{it.neighborhood}</p>
                    <h3 className="mt-0.5 font-semibold text-charcoal">{it.title}</h3>
                    <ul className="mt-2 flex flex-wrap gap-1">
                      {it.categories.map((c) => (
                        <li key={c} className="rounded-full bg-gray-100 px-2 py-0.5 text-[11px] text-gray-600">
                          {c.split('/')[0]}
                        </li>
                      ))}
                    </ul>
                  </div>
                  </button>
                </li>
              ))}
            </ul>

            {visible.length === 0 && (
              <p className="py-12 text-center text-gray-500">No projects match those filters yet.</p>
            )}
          </>
        )}
      </div>
      <ProjectSpecCard project={selectedProject} onClose={() => setSelectedProject(null)} />
    </section>
  );
}
