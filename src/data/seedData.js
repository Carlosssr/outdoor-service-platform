export const SEED_LEADS = [
  {
    id: 'lead-001',
    name: 'Santa Ynez Ranch Property',
    contact: 'J. Morales',
    location: 'Santa Ynez',
    service: 'Lot Clearing',
    estimatedValue: 38000,
    source: 'Word of Mouth / Referral',
    status: 'New',
    date: '2026-06-15',
    notes: 'Large parcel, approximately 40 acres. Full lot clearing and site prep before development.',
    highValue: true,
  },
  {
    id: 'lead-002',
    name: 'Vandenberg Village Home',
    contact: 'R. Thompson',
    location: 'Vandenberg Village',
    service: 'Irrigation System Installation & Repair',
    estimatedValue: 14500,
    source: 'Local SEO',
    status: 'Contacted',
    date: '2026-06-18',
    notes: 'Converting aging sprinkler system to drip with smart controller. Front and back yard.',
    highValue: true,
  },
];

export const SEED_PROJECTS = [
  {
    id: 'proj-001',
    name: 'Lompoc Proper Brush Removal',
    location: 'Lompoc',
    segment: 'Brush & Debris Removal',
    crew: 'Crew Alpha',
    status: 'In Progress',
    startDate: '2026-06-10',
    endDate: '2026-06-25',
    value: 9800,
    notes: 'Full brush clearing along north and east fence lines. Haul-off included.',
  },
  {
    id: 'proj-002',
    name: 'Solvang Estate Fencing & Grading',
    location: 'Solvang',
    segment: 'Fencing Installation & Repairs',
    crew: 'Crew Gold',
    status: 'Scheduled',
    startDate: '2026-07-01',
    endDate: '2026-08-15',
    value: 42000,
    notes: 'Ranch rail perimeter fence + site grading for new lawn area. Large estate property.',
  },
];

export const REGIONAL_ZONES = [
  {
    id: 'zone-01',
    name: 'Santa Ynez Valley Ranches',
    subtext: 'Solvang, Buellton, Santa Ynez, Los Olivos',
    leads: 14,
    revenue: 187000,
    avgContract: 13357,
    penetration: 38,
    priority: 'High',
  },
  {
    id: 'zone-02',
    name: 'Vandenberg Village Residential',
    subtext: 'Vandenberg Village, Mission Hills',
    leads: 22,
    revenue: 143000,
    avgContract: 6500,
    penetration: 61,
    priority: 'High',
  },
  {
    id: 'zone-03',
    name: 'Lompoc Valley',
    subtext: 'Lompoc Proper, surrounding rural areas',
    leads: 31,
    revenue: 198000,
    avgContract: 6387,
    penetration: 72,
    priority: 'Medium',
  },
  {
    id: 'zone-04',
    name: 'Orcutt & Santa Maria',
    subtext: 'Northern Santa Barbara County',
    leads: 9,
    revenue: 67000,
    avgContract: 7444,
    penetration: 22,
    priority: 'Growth',
  },
];

export const LEAD_SOURCES = [
  { id: 'src-01', name: 'Word of Mouth / Referrals', spend: 0, revenue: 198000, leads: 28, convRate: 71 },
  { id: 'src-02', name: 'Local SEO / Google Business', spend: 1800, revenue: 143000, leads: 19, convRate: 58 },
  { id: 'src-03', name: 'Facebook Community Groups', spend: 650, revenue: 54000, leads: 12, convRate: 42 },
  { id: 'src-04', name: 'Local Print / Flyers / Mailers', spend: 2400, revenue: 38000, leads: 8, convRate: 31 },
];

export const LOCATION_OPTIONS = [
  'Lompoc',
  'Vandenberg Village',
  'Mission Hills',
  'Solvang',
  'Buellton',
  'Santa Ynez',
  'Los Olivos',
  'Orcutt',
  'Santa Maria',
  'Surrounding Rural Areas',
];

export const SERVICE_OPTIONS = [
  'Ground Leveling & Site Grading',
  'Irrigation System Installation & Repair',
  'Fencing Installation & Repairs',
  'Land & Landscape Cleanup',
  'Brush & Debris Removal',
  'Property Maintenance',
  'Lot Clearing',
  'Drainage Solutions',
  'General Outdoor Improvements',
  'Other / Not Sure',
];

export const CREWS = ['Crew Alpha', 'Crew Beta', 'Crew Gold', 'Crew Sierra', 'Owner / Field Lead'];

export const SEGMENT_TYPES = [
  'Ground Leveling & Site Grading',
  'Irrigation System Installation & Repair',
  'Fencing Installation & Repairs',
  'Land & Landscape Cleanup',
  'Brush & Debris Removal',
  'Property Maintenance',
  'Lot Clearing',
  'Drainage Solutions',
  'General Outdoor Improvements',
];

export const HIGH_VALUE_LOCATIONS = [
  'Santa Ynez', 'Solvang', 'Buellton', 'Los Olivos',
  'Vandenberg Village', 'Mission Hills', 'Surrounding Rural Areas',
];
