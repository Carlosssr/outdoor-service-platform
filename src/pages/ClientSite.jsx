import { useState } from 'react';
import ClientNav from '../components/ClientNav';
import LeadCaptureModal from '../components/LeadCaptureModal';
import { Reveal, ScrollProgress, useParallax } from '../components/Motion';
import { useInView, useCountUp } from '../hooks/useInView';
import {
  Shovel, Droplets, Fence, Leaf, Trash2, Star, ChevronLeft, ChevronRight,
  MapPin, Phone, Mail, Shield, Award, Users, CheckCircle, Waves, Wrench, LayoutGrid
} from 'lucide-react';

const testimonials = [];

const services = [
  {
    icon: <Shovel size={28} />,
    title: 'Ground Leveling & Site Grading',
    tag: 'Residential · Agricultural · Commercial',
    color: 'bg-amber-50 text-amber-800',
    desc: 'Proper grading is the foundation of every successful outdoor project. We level uneven terrain, correct drainage slopes, and prepare sites for construction, landscaping, planting, or hardscaping on properties of any size.',
    features: ['Rough & finish grading', 'Slope correction & terracing', 'Site prep for construction or planting', 'Drainage swale shaping'],
  },
  {
    icon: <Droplets size={28} />,
    title: 'Irrigation System Installation & Repair',
    tag: 'New Systems · Repairs · Upgrades',
    color: 'bg-blue-50 text-blue-700',
    desc: 'From new installs to aging system repairs, we design and service irrigation systems for residential yards, agricultural parcels, and commercial grounds. Water smarter, reduce waste, and keep your property healthy year-round.',
    features: ['Full system design & installation', 'Sprinkler & drip system repair', 'Controller & valve upgrades', 'Agricultural & large-lot irrigation'],
  },
  {
    icon: <Fence size={28} />,
    title: 'Fencing Installation & Repairs',
    tag: 'Wood · Chain Link · Ranch Rail',
    color: 'bg-green-50 text-forest',
    desc: 'We install and repair fencing for residential properties, ranches, and commercial sites. Whether you need a clean wood privacy fence, a ranch rail perimeter, or chain link for a commercial lot, we build it right and built to last.',
    features: ['Wood privacy & picket fencing', 'Ranch rail & split rail fencing', 'Chain link installation & repair', 'Post replacement & fence restoration'],
  },
  {
    icon: <Leaf size={28} />,
    title: 'Land & Landscape Cleanup',
    tag: 'One-Time · Seasonal · Ongoing',
    color: 'bg-emerald-50 text-emerald-800',
    desc: 'A clean property is a healthy property. We handle comprehensive land and landscape cleanups, from overgrown yards and weedy lots to post-storm debris and seasonal maintenance, leaving your grounds looking sharp and well-kept.',
    features: ['Overgrown yard cleanup & reset', 'Weed removal & bare-ground prep', 'Post-storm debris clearance', 'Seasonal maintenance visits'],
  },
  {
    icon: <Trash2 size={28} />,
    title: 'Brush & Debris Removal',
    tag: 'Fire Safety · Lot Clearing · Haul-Off',
    color: 'bg-orange-50 text-orange-700',
    desc: 'Overgrown brush is a fire hazard, an eyesore, and a barrier to using your land. We clear brush, pile debris, chip where appropriate, and haul everything off, leaving your property clean, accessible, and safer.',
    features: ['Brush cutting & clearing', 'Pile removal & haul-off', 'Chipping & on-site mulching', 'Fire hazard reduction clearing'],
  },
  {
    icon: <Wrench size={28} />,
    title: 'Property Maintenance',
    tag: 'Ongoing · Scheduled · On-Call',
    color: 'bg-slate-50 text-slate-700',
    desc: 'Keep your property in top condition without the hassle. We offer scheduled maintenance programs for residential, agricultural, and commercial properties, so your land stays clean, functional, and well-maintained every season.',
    features: ['Scheduled maintenance programs', 'Mowing, edging & trimming', 'Irrigation system checks', 'General upkeep & small repairs'],
  },
  {
    icon: <LayoutGrid size={28} />,
    title: 'Lot Clearing',
    tag: 'Vacant Lots · Acreage · Development Prep',
    color: 'bg-rose-50 text-rose-700',
    desc: 'Ready to use your land? We clear vacant lots, raw acreage, and development sites, removing brush, debris, overgrowth, and obstacles so the land is clean, level-ready, and prepared for whatever comes next.',
    features: ['Vacant lot full clearing', 'Raw acreage preparation', 'Stump & root removal', 'Pre-development site clearing'],
  },
  {
    icon: <Waves size={28} />,
    title: 'Drainage Solutions',
    tag: 'French Drains · Swales · Runoff Control',
    color: 'bg-cyan-50 text-cyan-700',
    desc: 'Poor drainage causes erosion, flooding, and long-term property damage. We assess your drainage problems and install effective solutions like French drains, surface swales, and grading corrections to move water away from where it hurts.',
    features: ['French drain installation', 'Surface & channel drains', 'Grading for water diversion', 'Erosion control measures'],
  },
];

const galleryItems = [
  { id: 1, region: 'Lompoc Valley', label: 'Site Grading & Leveling', category: 'lompoc', img: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&q=80', desc: 'Full lot grading and slope correction' },
  { id: 2, region: 'Santa Ynez Valley', label: 'Acreage Lot Clearing', category: 'santa-ynez', img: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&q=80', desc: '40-acre brush clearing and land prep' },
  { id: 3, region: 'Vandenberg Village', label: 'Irrigation Installation', category: 'vandenberg', img: 'https://images.unsplash.com/photo-1585320806297-9794b3e4aaae?w=600&q=80', desc: 'Full residential irrigation system install' },
  { id: 4, region: 'Orcutt & Santa Maria', label: 'Fencing Installation', category: 'orcutt', img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80', desc: 'Ranch rail perimeter fencing project' },
  { id: 5, region: 'Santa Ynez Valley', label: 'Brush & Debris Removal', category: 'santa-ynez', img: 'https://images.unsplash.com/photo-1464207687429-7505649dae38?w=600&q=80', desc: 'Full parcel brush removal and haul-off' },
  { id: 6, region: 'Lompoc Valley', label: 'Landscape Cleanup', category: 'lompoc', img: 'https://images.unsplash.com/photo-1599940824399-b87987ceb72a?w=600&q=80', desc: 'Overgrown yard reset and cleanup' },
  { id: 7, region: 'Vandenberg Village', label: 'Drainage Solutions', category: 'vandenberg', img: 'https://images.unsplash.com/photo-1591825729269-caeb344f6df2?w=600&q=80', desc: 'French drain and surface drainage install' },
  { id: 8, region: 'Orcutt & Santa Maria', label: 'Property Maintenance', category: 'orcutt', img: 'https://images.unsplash.com/photo-1439853949212-36589f288df8?w=600&q=80', desc: 'Ongoing commercial property maintenance' },
];

const galleryFilters = [
  { label: 'All Work', value: 'all' },
  { label: 'Lompoc Valley', value: 'lompoc' },
  { label: 'Santa Ynez Valley', value: 'santa-ynez' },
  { label: 'Vandenberg Village & Mission Hills', value: 'vandenberg' },
  { label: 'Orcutt & Santa Maria', value: 'orcutt' },
];

const stats = [
  { value: '15+', label: 'Years Serving the Valley' },
  { value: 'Licensed', label: 'Bonded & Fully Insured' },
  { value: '500+', label: 'Properties Maintained' },
  { value: '3 Counties', label: 'Central Coast Coverage' },
];

// Counts up the numeric portion of a stat (e.g. "500+" -> animates to 500, keeps "+").
// Non-numeric stats (e.g. "Licensed") render as-is.
function StatValue({ value, animate }) {
  const match = /^(\d+)(.*)$/.exec(value);
  const target = match ? parseInt(match[1], 10) : 0;
  const suffix = match ? match[2] : '';
  const count = useCountUp(target, { start: animate });
  if (!match) return <>{value}</>;
  return <>{count}{suffix}</>;
}

export default function ClientSite() {
  const [estimateOpen, setEstimateOpen] = useState(false);
  const [galleryFilter, setGalleryFilter] = useState('all');
  const [testimonialIdx, setTestimonialIdx] = useState(0);
  const parallax = useParallax(0.25);
  const [statsRef, statsInView] = useInView({ threshold: 0.4 });

  const filteredGallery = galleryFilter === 'all'
    ? galleryItems
    : galleryItems.filter(i => i.category === galleryFilter);

  const prevTestimonial = () => setTestimonialIdx(i => (i - 1 + testimonials.length) % testimonials.length);
  const nextTestimonial = () => setTestimonialIdx(i => (i + 1) % testimonials.length);

  return (
    <div className="min-h-screen bg-sand font-sans">
      <ScrollProgress />
      <ClientNav onEstimateClick={() => setEstimateOpen(true)} />
      <LeadCaptureModal isOpen={estimateOpen} onClose={() => setEstimateOpen(false)} />

      {/* HERO */}
      <section
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{ background: 'linear-gradient(150deg, #0f271c 0%, #1B4332 50%, #334155 100%)' }}
      >
        <div className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1600&q=80)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            transform: `translateY(${parallax}px) scale(1.1)`,
            willChange: 'transform',
          }} />
        <div className="absolute inset-0 bg-gradient-to-br from-forest/90 via-forest/70 to-steel-dark/50" />

        <div className="relative z-10 text-center max-w-5xl mx-auto px-6 pt-20 pb-16">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 text-sm text-white/80 mb-8">
            <Shield size={14} className="text-harvest" />
            Family-Owned &nbsp;·&nbsp; Licensed &amp; Insured &nbsp;·&nbsp; Central Coast
          </div>

          <h1 className="font-display uppercase text-5xl md:text-7xl font-bold text-white leading-[0.95] tracking-tight text-balance mb-6">
            Land Preparation &amp;<br />
            <span className="text-harvest-light">Property Improvement</span><br />
            You Can Count On
          </h1>

          <p className="text-lg md:text-xl text-white/75 max-w-2xl mx-auto mb-4 leading-relaxed">
            Grading, irrigation, fencing, lot clearing, drainage, and full property maintenance
            for residential, agricultural, and commercial properties across the Central Coast.
          </p>

          <div className="flex items-center justify-center gap-2 text-sm text-harvest font-semibold mb-10">
            <MapPin size={16} />
            Lompoc, the Santa Ynez Valley &amp; Surrounding Communities
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => setEstimateOpen(true)}
              className="bg-harvest text-white font-bold px-8 py-4 rounded-xl hover:bg-harvest-dark transition-all shadow-xl hover:shadow-2xl text-base"
            >
              Request a Free Estimate
            </button>
            <a href="#services" className="border-2 border-white/30 text-white font-semibold px-8 py-4 rounded-xl hover:bg-white/10 transition-all text-base">
              See All Services
            </a>
          </div>

          <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16">
            {stats.map(s => (
              <div key={s.label} className="bg-white/8 backdrop-blur-sm border border-white/15 rounded-xl p-4 text-center transition-transform duration-300 hover:-translate-y-1 hover:bg-white/12">
                <div className="text-2xl font-bold text-harvest font-serif">
                  <StatValue value={s.value} animate={statsInView} />
                </div>
                <div className="text-xs text-white/60 mt-1 font-medium">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/40 animate-bounce">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </div>
      </section>

      {/* SHORT INTRO */}
      <section className="py-14 px-4 bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-serif uppercase tracking-tight text-2xl md:text-3xl font-bold text-forest mb-3">
            Land Improvement &amp; Property Maintenance
          </h2>
          <p className="text-gray-500 text-lg leading-relaxed">
            We provide reliable land preparation and property improvement services for residential, agricultural, and commercial properties.
            From ground leveling and irrigation systems to fencing installation and landscape cleanup,
            we help keep your property functional, clean, and well-maintained.
          </p>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-20 lg:py-28 px-4 max-w-7xl mx-auto">
        <Reveal className="text-center mb-14">
          <div className="inline-flex items-center gap-2 bg-forest/10 text-forest text-xs font-bold px-3 py-1.5 rounded-full mb-4 tracking-wider uppercase">
            <Award size={12} /> Our Services
          </div>
          <h2 className="section-title text-center">What We Do</h2>
          <p className="section-subtitle mx-auto text-center">
            From raw land to finished property, we handle every step of the outdoor improvement process.
          </p>
        </Reveal>
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
          {services.map((svc, idx) => (
            <Reveal key={svc.title} delay={idx * 90} className="card hover:shadow-md transition-all duration-300 hover:-translate-y-1 group">
              <div className="p-6 md:p-8">
                <div className="flex items-start gap-4 mb-4">
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 ${svc.color}`}>
                    {svc.icon}
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-harvest tracking-widest uppercase">{svc.tag}</span>
                    <h3 className="font-serif text-xl font-bold text-forest mt-0.5">{svc.title}</h3>
                  </div>
                </div>
                <p className="text-gray-500 text-sm leading-relaxed mb-5">{svc.desc}</p>
                <ul className="space-y-2">
                  {svc.features.map(f => (
                    <li key={f} className="flex items-center gap-2.5 text-sm text-charcoal">
                      <CheckCircle size={14} className="text-harvest flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => setEstimateOpen(true)}
                  className="mt-6 text-forest font-semibold text-sm flex items-center gap-1 hover:text-harvest transition-colors group-hover:gap-2"
                >
                  Get an estimate →
                </button>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* GALLERY */}
      <section id="gallery" className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-harvest/10 text-harvest-dark text-xs font-bold px-3 py-1.5 rounded-full mb-4 tracking-wider uppercase">
              <MapPin size={12} /> Our Work Across the Region
            </div>
            <h2 className="section-title text-center">Projects From Your Area</h2>
            <p className="section-subtitle mx-auto text-center">
              Filter by sub-region to see work done right in your community.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {galleryFilters.map(f => (
              <button
                key={f.value}
                onClick={() => setGalleryFilter(f.value)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${galleryFilter === f.value ? 'bg-forest text-white shadow-sm' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
              >
                {f.label}
              </button>
            ))}
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {filteredGallery.map((item, idx) => (
              <Reveal key={item.id} delay={idx * 60} className="group relative rounded-xl overflow-hidden aspect-[4/3] bg-gray-100 shadow-sm hover:shadow-lg transition-shadow">
                <img
                  src={item.img}
                  alt={item.label}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={e => { e.target.src = 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&q=80'; }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <div className="text-[10px] text-harvest font-bold uppercase tracking-wider mb-1">{item.region}</div>
                  <div className="text-white font-semibold text-sm">{item.label}</div>
                  <div className="text-white/70 text-xs mt-0.5">{item.desc}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-20 lg:py-28 px-4 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-forest/10 text-forest text-xs font-bold px-3 py-1.5 rounded-full mb-6 tracking-wider uppercase">
              <Users size={12} /> Our Story
            </div>
            <h2 className="section-title mb-5">Family-Owned. Community Trusted. Built for the Central Coast.</h2>
            <p className="text-gray-500 leading-relaxed mb-4">
              We are a family-owned land preparation and property improvement company rooted in Lompoc and serving the surrounding Central Coast. We've built our reputation one property at a time, doing honest work, showing up on time, and leaving every job site better than we found it.
            </p>
            <p className="text-gray-500 leading-relaxed mb-6">
              Whether you need a vacant lot cleared, a drainage problem solved, an irrigation system installed, or ongoing property maintenance for a residential home, ranch, or commercial site, we have the equipment, the experience, and the work ethic to get it done right.
            </p>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: <Shield size={16} />, label: 'Licensed & Insured' },
                { icon: <CheckCircle size={16} />, label: 'Fully Bonded' },
                { icon: <MapPin size={16} />, label: 'Locally Headquartered' },
                { icon: <Award size={16} />, label: 'Residential · Ag · Commercial' },
              ].map(item => (
                <div key={item.label} className="flex items-center gap-2.5 text-sm font-medium text-charcoal">
                  <span className="text-harvest">{item.icon}</span>
                  {item.label}
                </div>
              ))}
            </div>
            <button onClick={() => setEstimateOpen(true)} className="btn-primary mt-8">
              Request a Free Estimate
            </button>
          </div>
          <div className="relative">
            <div className="rounded-2xl overflow-hidden aspect-[4/3] shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1464207687429-7505649dae38?w=800&q=80"
                alt="Central Coast property"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-5 -left-5 bg-white rounded-xl shadow-lg p-4 border border-gray-100">
              <div className="text-2xl font-bold text-forest font-serif">15+</div>
              <div className="text-xs text-gray-500 font-medium">Years of trusted service<br/>across the Central Coast</div>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="testimonials" className="py-20 lg:py-28 bg-forest">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 text-white/80 text-xs font-bold px-3 py-1.5 rounded-full mb-6 tracking-wider uppercase">
            <Star size={12} className="text-harvest" /> Client Testimonials
          </div>
          <h2 className="font-serif uppercase tracking-tight text-3xl md:text-4xl font-bold text-white mb-10">What Our Neighbors Say</h2>

          {testimonials.length === 0 ? (
            <div className="bg-white/5 border border-white/10 rounded-2xl px-8 py-12">
              <div className="w-14 h-14 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-5">
                <Star size={24} className="text-harvest" />
              </div>
              <h3 className="font-serif text-xl font-semibold text-white mb-3">Proudly Serving Our Neighbors</h3>
              <p className="text-white/50 text-sm max-w-sm mx-auto leading-relaxed">
                Client reviews from across the valley coming soon. We're focused on delivering outstanding results, and the stories will follow.
              </p>
            </div>
          ) : (
            <div className="relative">
              <div className="bg-white/10 backdrop-blur-sm border border-white/15 rounded-2xl p-8 md:p-12">
                <div className="flex justify-center gap-1 mb-6">
                  {[...Array(testimonials[testimonialIdx]?.rating || 5)].map((_, i) => (
                    <Star key={i} size={18} className="text-harvest fill-harvest" />
                  ))}
                </div>
                <p className="text-white/85 text-lg leading-relaxed italic mb-6">
                  "{testimonials[testimonialIdx]?.text}"
                </p>
                <div className="font-semibold text-white">{testimonials[testimonialIdx]?.name}</div>
                <div className="text-white/50 text-sm">{testimonials[testimonialIdx]?.location}</div>
              </div>
              <div className="flex items-center justify-center gap-3 mt-6">
                <button onClick={prevTestimonial} className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors">
                  <ChevronLeft size={18} />
                </button>
                <div className="flex gap-2">
                  {testimonials.map((_, i) => (
                    <button key={i} onClick={() => setTestimonialIdx(i)}
                      className={`w-2 h-2 rounded-full transition-all ${i === testimonialIdx ? 'bg-harvest w-5' : 'bg-white/30'}`} />
                  ))}
                </div>
                <button onClick={nextTestimonial} className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors">
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* CONTACT / CTA */}
      <section id="contact" className="py-20 lg:py-28 px-4 max-w-7xl mx-auto">
        <div className="text-center">
          <h2 className="section-title mb-4">Ready to Get Started?</h2>
          <p className="section-subtitle mx-auto text-center mb-8">
            Request your free estimate today. We'll visit your property, assess the work, and give you a clear, no-obligation quote.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <button onClick={() => setEstimateOpen(true)} className="btn-primary px-8 py-4 text-base">
              Request a Free Estimate
            </button>
            <a href="tel:8055550100" className="btn-outline px-8 py-4 text-base flex items-center gap-2">
              <Phone size={16} /> (805) 555-0100
            </a>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-gray-400">
            <span className="flex items-center gap-2"><Phone size={14} /> (805) 555-0100</span>
            <span className="flex items-center gap-2"><Mail size={14} /> hello@centralcoastoutdoor.com</span>
            <span className="flex items-center gap-2"><MapPin size={14} /> Lompoc, CA · Serving the Central Coast</span>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-charcoal text-white/60 py-10 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
          <div className="font-serif font-bold text-white">Central Coast Outdoor Services</div>
          <div>Land Preparation &amp; Property Improvement · Licensed &amp; Insured · Family Owned</div>
          <div>© {new Date().getFullYear()} · All Rights Reserved</div>
        </div>
      </footer>
    </div>
  );
}
