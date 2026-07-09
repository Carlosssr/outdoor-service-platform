import { useMemo, useState } from 'react';
import { Droplets, Sprout, Grid3x3, Trees } from 'lucide-react';

// Water-smart portfolio filter. Multi-select (OR semantics): an empty selection
// shows everything; picking chips narrows to projects matching ANY chosen approach.
// A project can carry several approach tags.

const FILTERS = [
  { label: 'Xeriscaping/Drought-Tolerant', icon: <Droplets size={16} /> },
  { label: 'Native Central Coast Plantings', icon: <Sprout size={16} /> },
  { label: 'Artificial Turf', icon: <Grid3x3 size={16} /> },
  { label: 'Hardscaping/Patios', icon: <Trees size={16} /> },
];

const ITEMS = [
  { id: 'd1', title: 'Low-Water Front Yard', city: 'Lompoc', categories: ['Xeriscaping/Drought-Tolerant', 'Native Central Coast Plantings'], img: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&q=80' },
  { id: 'd2', title: 'Backyard Turf & Patio', city: 'Vandenberg Village', categories: ['Artificial Turf', 'Hardscaping/Patios'], img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80' },
  { id: 'd3', title: 'Coastal Native Garden', city: 'Mission Hills', categories: ['Native Central Coast Plantings'], img: 'https://images.unsplash.com/photo-1585320806297-9794b3e4aaae?w=600&q=80' },
  { id: 'd4', title: 'Paver Courtyard', city: 'Buellton', categories: ['Hardscaping/Patios'], img: 'https://images.unsplash.com/photo-1599940824399-b87987ceb72a?w=600&q=80' },
  { id: 'd5', title: 'Full Xeriscape Conversion', city: 'Santa Ynez', categories: ['Xeriscaping/Drought-Tolerant'], img: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&q=80' },
  { id: 'd6', title: 'Turf Play Yard', city: 'Lompoc', categories: ['Artificial Turf'], img: 'https://images.unsplash.com/photo-1464207687429-7505649dae38?w=600&q=80' },
];

export default function DroughtFilter() {
  const [selected, setSelected] = useState(() => new Set());

  const toggle = (c) =>
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(c)) next.delete(c);
      else next.add(c);
      return next;
    });

  const visible = useMemo(() => {
    if (selected.size === 0) return ITEMS;
    return ITEMS.filter((it) => it.categories.some((c) => selected.has(c)));
  }, [selected]);

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
            Drought-tolerant, native, turf, or hardscaping. See real Lompoc-area projects for each approach.
          </p>
        </div>

        {/* Filter chips (multi-select toggles) */}
        <div className="mb-10 flex flex-wrap gap-2">
          {FILTERS.map(({ label, icon }) => {
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
                {icon}
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
            <li
              key={it.id}
              className="group animate-fade-in overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm"
            >
              <div className="overflow-hidden">
                <img
                  src={it.img}
                  alt={it.title}
                  loading="lazy"
                  className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&q=80'; }}
                />
              </div>
              <div className="p-4">
                <p className="text-xs font-bold uppercase tracking-wider text-forest">{it.city}</p>
                <h3 className="mt-0.5 font-semibold text-charcoal">{it.title}</h3>
                <ul className="mt-2 flex flex-wrap gap-1">
                  {it.categories.map((c) => (
                    <li key={c} className="rounded-full bg-gray-100 px-2 py-0.5 text-[11px] text-gray-600">
                      {c.split('/')[0]}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>

        {visible.length === 0 && (
          <p className="py-12 text-center text-gray-500">No projects match those filters yet.</p>
        )}
      </div>
    </section>
  );
}
