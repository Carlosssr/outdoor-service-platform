import { useEffect } from 'react';
import { X, Droplets, Ruler, Wrench, Calendar, MapPin, Camera } from 'lucide-react';

// Per-project spec card: the differentiator. Publishes what no local competitor
// does — plant palette with botanical names + WUCOLS water-use ratings, and the
// water-savings estimate WITH its methodology stated, not just a number.

const WATER_USE_STYLES = {
  'Very Low': 'bg-forest/10 text-forest',
  Low: 'bg-emerald-50 text-emerald-700',
  Moderate: 'bg-amber-50 text-amber-700',
};

const fmtNum = (n) => new Intl.NumberFormat('en-US').format(n);
const fmtDate = (d) => {
  if (!d) return null;
  const dt = new Date(`${d}T00:00:00`);
  return Number.isNaN(dt.getTime())
    ? d
    : dt.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
};

function Photo({ src, label }) {
  return (
    <figure className="overflow-hidden rounded-xl border border-gray-200 bg-gray-100">
      {src ? (
        <img src={src} alt={label} loading="lazy" className="aspect-[4/3] w-full object-cover" />
      ) : (
        <div className="flex aspect-[4/3] w-full flex-col items-center justify-center gap-2 text-gray-400">
          <Camera size={20} />
          <span className="text-xs">Photo pending</span>
        </div>
      )}
      <figcaption className="px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-gray-500">
        {label}
      </figcaption>
    </figure>
  );
}

export default function ProjectSpecCard({ project, onClose }) {
  // Close on Escape; lock body scroll while open.
  useEffect(() => {
    if (!project) return undefined;
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [project, onClose]);

  if (!project) return null;

  const completed = fmtDate(project.completedDate);

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 p-0 sm:items-center sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="spec-title"
      onClick={onClose}
    >
      <div
        className="max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-t-2xl bg-white shadow-2xl sm:rounded-2xl animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-gray-100 bg-white px-6 py-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-harvest">
              <MapPin size={12} /> {project.neighborhood}
            </div>
            <h3 id="spec-title" className="mt-1 font-display uppercase tracking-tight text-xl font-bold text-forest">
              {project.title}
            </h3>
          </div>
          <button
            onClick={onClose}
            aria-label="Close project details"
            className="rounded-full p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-charcoal"
          >
            <X size={20} />
          </button>
        </div>

        <div className="space-y-8 px-6 py-6">
          {/* Before / After */}
          <div className="grid grid-cols-2 gap-4">
            <Photo src={project.images?.before} label="Before" />
            <Photo src={project.images?.after} label="After" />
          </div>

          {/* Quick facts */}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            <div className="rounded-xl bg-sand p-4">
              <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-gray-500">
                <Ruler size={12} /> Area
              </div>
              <div className="mt-1 font-display text-xl font-bold text-charcoal">
                {project.sqft ? `${fmtNum(project.sqft)} sq ft` : 'N/A'}
              </div>
            </div>
            <div className="rounded-xl bg-sand p-4">
              <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-gray-500">
                <Wrench size={12} /> Irrigation
              </div>
              <div className="mt-1 font-display text-xl font-bold text-charcoal">
                {project.irrigationType || 'N/A'}
              </div>
            </div>
            <div className="rounded-xl bg-sand p-4">
              <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-gray-500">
                <Calendar size={12} /> Completed
              </div>
              <div className="mt-1 font-display text-xl font-bold text-charcoal">
                {completed || 'N/A'}
              </div>
            </div>
          </div>

          {/* Water savings + methodology */}
          {project.estGallonsSavedPerYear != null && (
            <div className="rounded-xl border border-forest/20 bg-forest/5 p-5">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-forest">
                <Droplets size={14} /> Estimated Water Savings
              </div>
              <div className="mt-2 font-display text-3xl font-bold text-forest">
                ~{fmtNum(project.estGallonsSavedPerYear)} gallons / year
              </div>
              <p className="mt-3 text-xs leading-relaxed text-gray-500">
                <strong className="text-gray-600">How we estimate this:</strong> compared against a
                cool-season turf baseline for the same square footage, using WUCOLS IV plant-factor
                ratings for Region 1 (North-Central Coastal) and local Lompoc-area reference
                evapotranspiration. This is a planning estimate, not a metered guarantee; actual
                savings depend on weather, controller scheduling, and prior irrigation habits.
              </p>
            </div>
          )}

          {/* Plant palette */}
          {project.plantPalette?.length > 0 && (
            <div>
              <h4 className="font-display uppercase tracking-tight text-base font-bold text-forest">
                Plant Palette
              </h4>
              <p className="mt-1 text-xs text-gray-500">
                Water-use ratings per WUCOLS IV, Region 1 (North-Central Coastal).
              </p>
              <div className="mt-3 overflow-x-auto rounded-xl border border-gray-200">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Common Name</th>
                      <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Botanical Name</th>
                      <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Water Use</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {project.plantPalette.map((p) => (
                      <tr key={`${p.botanical}-${p.common}`}>
                        <td className="px-4 py-3 font-medium text-charcoal">{p.common}</td>
                        <td className="px-4 py-3 italic text-gray-500">{p.botanical}</td>
                        <td className="px-4 py-3">
                          <span className={`badge ${WATER_USE_STYLES[p.waterUse] || 'bg-gray-100 text-gray-600'}`}>
                            {p.waterUse}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Detail shots */}
          {project.images?.details?.length > 0 && (
            <div>
              <h4 className="font-display uppercase tracking-tight text-base font-bold text-forest">
                Details
              </h4>
              <div className="mt-3 grid grid-cols-3 gap-3">
                {project.images.details.map((src, i) => (
                  <img
                    key={src}
                    src={src}
                    alt={`${project.title} detail ${i + 1}`}
                    loading="lazy"
                    className="aspect-square w-full rounded-lg object-cover"
                  />
                ))}
              </div>
            </div>
          )}

          {/* Categories */}
          <div className="flex flex-wrap gap-1.5 border-t border-gray-100 pt-5">
            {project.categories.map((c) => (
              <span key={c} className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-600">{c}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
