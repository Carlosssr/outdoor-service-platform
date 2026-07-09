import { useMemo, useState } from 'react';
import { Camera, Plus, Trash2, Copy, Check, ClipboardList } from 'lucide-react';
import {
  NEIGHBORHOODS, CATEGORIES, IRRIGATION_TYPES, WATER_USE_RATINGS,
} from '../data/projects';

// Mobile-first field capture form. No backend: on submit it emits a
// copy-pasteable JS object literal conforming to the src/data/projects.js
// schema, ready to be appended to the PROJECTS array.
//
// Camera inputs use capture="environment" so phones open the rear camera
// directly. Photos are NOT uploaded anywhere (static host); the generated
// object references the file names so images can be added to /public/projects/
// and paths filled in during the desk pass.

const emptyPlant = () => ({ common: '', botanical: '', waterUse: 'Low' });

const slugify = (s) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '').slice(0, 60);

const jsString = (s) => `'${String(s).replace(/\\/g, '\\\\').replace(/'/g, "\\'")}'`;

function fileNames(list) {
  return list.map((f) => f.name);
}

function buildLiteral(form, plants, files) {
  const id = `p-${Date.now().toString(36)}`;
  const slug = slugify(form.title) || id;
  const cats = CATEGORIES.filter((c) => form.categories.has(c));
  const palette = plants
    .filter((p) => p.common.trim() || p.botanical.trim())
    .map((p) => `    { common: ${jsString(p.common.trim())}, botanical: ${jsString(p.botanical.trim())}, waterUse: ${jsString(p.waterUse)} },`)
    .join('\n');
  const details = fileNames(files.details)
    .map((n) => `      /* TODO copy to public/projects/${slug}/ */ ${jsString(`/projects/${slug}/${n}`)},`)
    .join('\n');
  const gallons = form.estGallonsSavedPerYear === '' ? 'null' : Number(form.estGallonsSavedPerYear);

  return `{
  id: ${jsString(id)},
  slug: ${jsString(slug)},
  title: ${jsString(form.title.trim())},
  neighborhood: ${jsString(form.neighborhood)},
  completedDate: ${jsString(form.completedDate)},
  categories: [${cats.map(jsString).join(', ')}],
  sqft: ${form.sqft === '' ? 'null' : Number(form.sqft)},
  plantPalette: [
${palette || '    // none recorded'}
  ],
  irrigationType: ${jsString(form.irrigationType)},
  estGallonsSavedPerYear: ${gallons},
  images: {
    before: ${files.before ? jsString(`/projects/${slug}/${files.before.name}`) : "''"},${files.before ? ` // TODO copy ${files.before.name} to public/projects/${slug}/` : ''}
    after: ${files.after ? jsString(`/projects/${slug}/${files.after.name}`) : "''"},${files.after ? ` // TODO copy ${files.after.name} to public/projects/${slug}/` : ''}
    details: [
${details || '      // none'}
    ],
  },
  mapX: ${form.mapX === '' ? 50 : Number(form.mapX)},
  mapY: ${form.mapY === '' ? 50 : Number(form.mapY)},
  isPlaceholder: false,
},`;
}

const inputCls =
  'w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm text-charcoal focus:border-harvest focus:outline-none focus:ring-1 focus:ring-harvest';
const labelCls = 'block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1.5';

function PhotoInput({ label, file, onChange, multiple = false }) {
  const count = multiple ? file.length : file ? 1 : 0;
  return (
    <label className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-gray-300 bg-white p-5 text-center transition-colors hover:border-harvest">
      <Camera size={22} className={count ? 'text-forest' : 'text-gray-400'} />
      <span className="text-sm font-medium text-charcoal">{label}</span>
      <span className="text-xs text-gray-400">
        {count === 0 ? 'Tap to open camera' : multiple ? `${count} photo${count > 1 ? 's' : ''}` : file.name}
      </span>
      <input
        type="file"
        accept="image/*"
        capture="environment"
        multiple={multiple}
        className="hidden"
        onChange={(e) => onChange(multiple ? Array.from(e.target.files) : e.target.files[0] || null)}
      />
    </label>
  );
}

export default function CapturePage() {
  const [form, setForm] = useState({
    title: '',
    neighborhood: NEIGHBORHOODS[0],
    completedDate: new Date().toISOString().slice(0, 10),
    categories: new Set(),
    sqft: '',
    irrigationType: IRRIGATION_TYPES[0],
    estGallonsSavedPerYear: '',
    mapX: '',
    mapY: '',
  });
  const [plants, setPlants] = useState([emptyPlant()]);
  const [files, setFiles] = useState({ before: null, after: null, details: [] });
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const toggleCategory = (c) =>
    setForm((f) => {
      const next = new Set(f.categories);
      if (next.has(c)) next.delete(c);
      else next.add(c);
      return { ...f, categories: next };
    });

  const setPlant = (i, k) => (e) =>
    setPlants((ps) => ps.map((p, idx) => (idx === i ? { ...p, [k]: e.target.value } : p)));

  const canSubmit = useMemo(
    () => form.title.trim().length > 2 && form.categories.size > 0,
    [form.title, form.categories]
  );

  const handleGenerate = (e) => {
    e.preventDefault();
    if (!canSubmit) {
      setError('Job name (3+ characters) and at least one category are required.');
      return;
    }
    setError('');
    setOutput(buildLiteral(form, plants, files));
    setCopied(false);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setError('Clipboard blocked; select the text and copy manually.');
    }
  };

  return (
    <div className="min-h-screen bg-sand pb-16">
      <header className="bg-slate-900 px-4 py-6">
        <div className="mx-auto max-w-2xl">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-harvest-light">
            <ClipboardList size={14} /> Internal · Field Capture
          </div>
          <h1 className="mt-1 font-display uppercase tracking-tight text-2xl font-bold text-white">
            New Project Capture
          </h1>
          <p className="mt-1 text-sm text-slate-400">
            Shoot the job, log the specs, generate the data entry. Nothing is uploaded; you'll get
            a code block to paste into <code className="text-slate-300">src/data/projects.js</code>.
          </p>
        </div>
      </header>

      <form onSubmit={handleGenerate} className="mx-auto mt-6 max-w-2xl space-y-8 px-4">
        {/* Basics */}
        <section className="card p-5 space-y-4">
          <h2 className="font-display uppercase tracking-tight text-base font-bold text-forest">Job Basics</h2>
          <div>
            <label className={labelCls} htmlFor="cap-title">Job Name *</label>
            <input id="cap-title" className={inputCls} value={form.title} onChange={set('title')}
              placeholder="e.g. Front yard xeriscape conversion" maxLength={80} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelCls} htmlFor="cap-hood">Neighborhood</label>
              <select id="cap-hood" className={inputCls} value={form.neighborhood} onChange={set('neighborhood')}>
                {NEIGHBORHOODS.map((n) => <option key={n}>{n}</option>)}
              </select>
            </div>
            <div>
              <label className={labelCls} htmlFor="cap-date">Completed</label>
              <input id="cap-date" type="date" className={inputCls} value={form.completedDate} onChange={set('completedDate')} />
            </div>
          </div>
          <div>
            <span className={labelCls}>Categories * (tap all that apply)</span>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((c) => {
                const on = form.categories.has(c);
                return (
                  <button type="button" key={c} onClick={() => toggleCategory(c)} aria-pressed={on}
                    className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                      on ? 'border-harvest bg-harvest text-white' : 'border-gray-300 bg-white text-gray-600'
                    }`}>
                    {c}
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* Specs */}
        <section className="card p-5 space-y-4">
          <h2 className="font-display uppercase tracking-tight text-base font-bold text-forest">Specs</h2>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelCls} htmlFor="cap-sqft">Square Feet</label>
              <input id="cap-sqft" type="number" min="0" inputMode="numeric" className={inputCls}
                value={form.sqft} onChange={set('sqft')} placeholder="1200" />
            </div>
            <div>
              <label className={labelCls} htmlFor="cap-irr">Irrigation</label>
              <select id="cap-irr" className={inputCls} value={form.irrigationType} onChange={set('irrigationType')}>
                {IRRIGATION_TYPES.map((t) => <option key={t}>{t}</option>)}
              </select>
            </div>
          </div>
          <div>
            <label className={labelCls} htmlFor="cap-gal">Est. Gallons Saved / Year (vs. turf; leave blank if N/A)</label>
            <input id="cap-gal" type="number" min="0" inputMode="numeric" className={inputCls}
              value={form.estGallonsSavedPerYear} onChange={set('estGallonsSavedPerYear')} placeholder="14000" />
          </div>
        </section>

        {/* Photos */}
        <section className="card p-5 space-y-4">
          <h2 className="font-display uppercase tracking-tight text-base font-bold text-forest">Photos</h2>
          <p className="text-xs text-gray-500">
            Same position before and after; midday overcast if possible. One wide, two detail.
          </p>
          <div className="grid grid-cols-2 gap-3">
            <PhotoInput label="Before" file={files.before} onChange={(f) => setFiles((s) => ({ ...s, before: f }))} />
            <PhotoInput label="After" file={files.after} onChange={(f) => setFiles((s) => ({ ...s, after: f }))} />
          </div>
          <PhotoInput label="Detail Shots" multiple file={files.details} onChange={(f) => setFiles((s) => ({ ...s, details: f }))} />
        </section>

        {/* Plant palette repeater */}
        <section className="card p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-display uppercase tracking-tight text-base font-bold text-forest">Plant Palette</h2>
            <button type="button" onClick={() => setPlants((ps) => [...ps, emptyPlant()])}
              className="inline-flex items-center gap-1 rounded-lg bg-forest/10 px-3 py-1.5 text-xs font-semibold text-forest">
              <Plus size={14} /> Add Plant
            </button>
          </div>
          {plants.map((p, i) => (
            <div key={i} className="space-y-2 rounded-xl border border-gray-200 p-3">
              <div className="grid grid-cols-2 gap-2">
                <input aria-label={`Plant ${i + 1} common name`} className={inputCls} placeholder="Common name"
                  value={p.common} onChange={setPlant(i, 'common')} />
                <input aria-label={`Plant ${i + 1} botanical name`} className={inputCls} placeholder="Botanical name"
                  value={p.botanical} onChange={setPlant(i, 'botanical')} />
              </div>
              <div className="flex items-center gap-2">
                <select aria-label={`Plant ${i + 1} water use`} className={inputCls} value={p.waterUse} onChange={setPlant(i, 'waterUse')}>
                  {WATER_USE_RATINGS.map((w) => <option key={w}>{w} water use (WUCOLS R1)</option>)}
                </select>
                {plants.length > 1 && (
                  <button type="button" aria-label={`Remove plant ${i + 1}`}
                    onClick={() => setPlants((ps) => ps.filter((_, idx) => idx !== i))}
                    className="rounded-lg p-2.5 text-gray-400 hover:bg-red-50 hover:text-red-500">
                    <Trash2 size={16} />
                  </button>
                )}
              </div>
            </div>
          ))}
        </section>

        {/* Map position */}
        <section className="card p-5 space-y-4">
          <h2 className="font-display uppercase tracking-tight text-base font-bold text-forest">Map Pin (optional)</h2>
          <p className="text-xs text-gray-500">Percent position on the stylized county panel; defaults to center.</p>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelCls} htmlFor="cap-x">X %</label>
              <input id="cap-x" type="number" min="0" max="100" inputMode="numeric" className={inputCls}
                value={form.mapX} onChange={set('mapX')} placeholder="50" />
            </div>
            <div>
              <label className={labelCls} htmlFor="cap-y">Y %</label>
              <input id="cap-y" type="number" min="0" max="100" inputMode="numeric" className={inputCls}
                value={form.mapY} onChange={set('mapY')} placeholder="50" />
            </div>
          </div>
        </section>

        {error && <p className="text-sm font-medium text-red-600">{error}</p>}

        <button type="submit" disabled={!canSubmit}
          className="btn-primary w-full py-4 text-base disabled:cursor-not-allowed disabled:opacity-40">
          Generate Data Entry
        </button>
      </form>

      {/* Output */}
      {output && (
        <div className="mx-auto mt-8 max-w-2xl px-4">
          <div className="card p-5">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="font-display uppercase tracking-tight text-base font-bold text-forest">
                Paste into PROJECTS array
              </h2>
              <button onClick={handleCopy}
                className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold transition-colors ${
                  copied ? 'bg-green-100 text-green-700' : 'bg-harvest text-white hover:bg-harvest-dark'
                }`}>
                {copied ? <Check size={14} /> : <Copy size={14} />}
                {copied ? 'Copied' : 'Copy'}
              </button>
            </div>
            <pre className="max-h-96 overflow-auto rounded-xl bg-slate-900 p-4 text-xs leading-relaxed text-slate-200">
              <code>{output}</code>
            </pre>
            <p className="mt-3 text-xs text-gray-500">
              Then: copy the photos into <code>public/projects/&lt;slug&gt;/</code> with the file
              names shown, append this object to <code>PROJECTS</code> in
              <code> src/data/projects.js</code>, and push. The map and portfolio update automatically.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
