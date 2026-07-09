import { useMemo, useState } from 'react';
import { MapPin } from 'lucide-react';

// Neighborhood-filtered social proof. Pins are positioned as percentages on a
// stylized area panel, so there's no Google Maps JS payload and no layout shift.
// Swap the panel background for a static map tile later if desired.

const NEIGHBORHOODS = [
  'The Mesa',
  'Vandenberg Village',
  'Mission Hills',
  'Downtown Lompoc',
  'Santa Ynez Valley',
];

const PROJECTS = [
  { id: 'm1', title: 'Xeriscape Front Yard Reset', service: 'Drought-Tolerant', neighborhood: 'The Mesa', x: 22, y: 64, img: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&q=80' },
  { id: 'm2', title: 'Native Plant Hillside', service: 'Native Plantings', neighborhood: 'Vandenberg Village', x: 30, y: 26, img: 'https://images.unsplash.com/photo-1585320806297-9794b3e4aaae?w=600&q=80' },
  { id: 'm3', title: 'Turf & Paver Patio', service: 'Hardscaping', neighborhood: 'Mission Hills', x: 46, y: 42, img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80' },
  { id: 'm4', title: 'Downtown Courtyard', service: 'Hardscaping', neighborhood: 'Downtown Lompoc', x: 40, y: 72, img: 'https://images.unsplash.com/photo-1599940824399-b87987ceb72a?w=600&q=80' },
  { id: 'm5', title: 'Ranch Drought Conversion', service: 'Drought-Tolerant', neighborhood: 'Santa Ynez Valley', x: 78, y: 30, img: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&q=80' },
  { id: 'm6', title: 'Vandenberg Turf Yard', service: 'Artificial Turf', neighborhood: 'Vandenberg Village', x: 34, y: 18, img: 'https://images.unsplash.com/photo-1464207687429-7505649dae38?w=600&q=80' },
];

export default function LocalProjectMap() {
  const [active, setActive] = useState('All');

  const visible = useMemo(
    () => (active === 'All' ? PROJECTS : PROJECTS.filter((p) => p.neighborhood === active)),
    [active]
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
            Recent Projects Across Lompoc &amp; the Valley
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-slate-400">
            Filter by neighborhood to see hyper-local work done right in your community.
          </p>
        </div>

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
            {PROJECTS.map((p) => {
              const on = visibleIds.has(p.id);
              return (
                <button
                  key={p.id}
                  onClick={() => setActive(p.neighborhood)}
                  aria-label={`${p.title} in ${p.neighborhood}`}
                  className="absolute -translate-x-1/2 -translate-y-full transition-all duration-300 hover:scale-110"
                  style={{ left: `${p.x}%`, top: `${p.y}%`, opacity: on ? 1 : 0.3, transform: `translate(-50%,-100%) scale(${on ? 1 : 0.82})` }}
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
              <li
                key={p.id}
                className="animate-fade-in overflow-hidden rounded-xl border border-slate-700 bg-slate-800"
              >
                <img
                  src={p.img}
                  alt={p.title}
                  loading="lazy"
                  className="aspect-[4/3] w-full object-cover"
                  onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&q=80'; }}
                />
                <div className="p-3">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-harvest-light">{p.neighborhood}</p>
                  <p className="text-sm font-semibold text-white">{p.title}</p>
                  <p className="text-xs text-slate-400">{p.service}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
