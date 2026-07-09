// Single source of truth for portfolio projects.
// Both LocalProjectMap and DroughtFilter read from this array.
//
// HONESTY RULE: no invented job names, no stock imagery. Entries flagged
// `isPlaceholder: true` are excluded from public rendering; components show
// an "Adding recent work" empty state until real projects are added.
//
// Schema per project:
// {
//   id, slug,
//   title,                    // real job name
//   neighborhood,             // one of NEIGHBORHOODS below
//   completedDate,            // 'YYYY-MM-DD'
//   categories: [],           // one or more of CATEGORIES below
//   sqft,                     // number
//   plantPalette: [{ common, botanical, waterUse }],
//                             // waterUse: 'Very Low' | 'Low' | 'Moderate'
//                             // per WUCOLS IV, Region 1 (North-Central Coastal)
//   irrigationType,           // 'Drip' | 'Rotary Nozzle' | 'None' | 'Existing Retrofit'
//   estGallonsSavedPerYear,   // vs. cool-season turf baseline; null if N/A
//   images: { before, after, details: [] },  // local asset paths, no hotlinks
//   mapX, mapY,               // % position on the stylized map panel
//   isPlaceholder,            // true = never rendered publicly
// }

export const NEIGHBORHOODS = [
  'The Mesa',
  'Vandenberg Village',
  'Mission Hills',
  'Downtown Lompoc',
  'Santa Ynez Valley',
  'Buellton',
];

export const CATEGORIES = [
  'Xeriscaping/Drought-Tolerant',
  'Native Central Coast Plantings',
  'Artificial Turf',
  'Hardscaping/Patios',
  'Irrigation',
];

export const IRRIGATION_TYPES = ['Drip', 'Rotary Nozzle', 'None', 'Existing Retrofit'];

export const WATER_USE_RATINGS = ['Very Low', 'Low', 'Moderate'];

export const PROJECTS = [
  {
    id: 'p-0001',
    slug: 'placeholder-schema-example',
    title: 'Example Entry (replace with first real job)',
    neighborhood: 'Vandenberg Village',
    completedDate: '2026-01-15',
    categories: ['Xeriscaping/Drought-Tolerant', 'Irrigation'],
    sqft: 1200,
    plantPalette: [
      { common: 'California Sagebrush', botanical: 'Artemisia californica', waterUse: 'Very Low' },
      { common: 'Deer Grass', botanical: 'Muhlenbergia rigens', waterUse: 'Low' },
    ],
    irrigationType: 'Drip',
    estGallonsSavedPerYear: 14000,
    images: { before: '', after: '', details: [] },
    mapX: 32,
    mapY: 24,
    isPlaceholder: true, // excluded from all public rendering
  },
];

// Public projects only — what the site actually renders.
export const publicProjects = () => PROJECTS.filter((p) => !p.isPlaceholder);
