import { useState } from 'react';
import ClientNav from '../components/ClientNav';
import LeadCaptureModal from '../components/LeadCaptureModal';
import {
  Trees, Droplets, Layers, Flame, Star, ChevronLeft, ChevronRight,
  MapPin, Phone, Mail, Shield, Award, Users, CheckCircle
} from 'lucide-react';

const testimonials = [];

const services = [
  {
    icon: <Trees size={28} />,
    title: 'Tree Care & Windbreak Maintenance',
    license: 'D-49 Licensed',
    color: 'bg-green-50 text-forest',
    desc: 'Expert tree removal, crown reduction, and hazard assessment across the valley. We specialize in heavy-wind mitigation, oak tree preservation, and insurance-approved wildfire defensible space creation for ranches and estates.',
    features: ['Hazard tree removal & risk assessment', 'Oak tree preservation & health care', 'Fire defensible space (CAL FIRE compliant)', 'Windbreak trimming & shaping'],
  },
  {
    icon: <Droplets size={28} />,
    title: 'Smart Irrigation & Rural Water Management',
    license: 'Certified Installation',
    color: 'bg-blue-50 text-blue-700',
    desc: 'Water-wise solutions built for the Central Coast\'s unique conditions. From large ranch irrigation networks to residential smart controllers, we help you conserve water, cut costs, and keep your landscape thriving through every drought cycle.',
    features: ['Drip & micro-irrigation systems', 'Smart controller installation', 'Ranch & acreage irrigation design', 'Drought-tolerant planting plans'],
  },
  {
    icon: <Layers size={28} />,
    title: 'Landscape Design & Hardscaping',
    license: 'C-27 Licensed',
    color: 'bg-amber-50 text-amber-700',
    desc: 'From intimate family patios to sweeping estate redesigns, we craft outdoor living spaces that honor the natural beauty of the Santa Ynez Valley. Every project blends premium materials with regionally appropriate, low-maintenance plantings.',
    features: ['Custom patio & outdoor living design', 'Flagstone, brick & concrete work', 'Native plant & drought-tolerant design', 'Fire pits, walls & water features'],
  },
  {
    icon: <Flame size={28} />,
    title: 'Acreage Land Clearing',
    license: 'Large Property Specialists',
    color: 'bg-orange-50 text-orange-700',
    desc: 'Purpose-built for the valley\'s large parcels. We handle full land clearing, brush removal, fire break creation, and access road clearing. Trusted by ranchers, vineyard owners, and land developers throughout Santa Barbara County.',
    features: ['Full acreage clearing & grubbing', 'Firebreak installation & maintenance', 'Brush pile removal & chipping', 'Access road & fence line clearing'],
  },
];

const galleryItems = [
  { id: 1, region: 'Lompoc Valley', label: 'Windbreak Maintenance', category: 'lompoc', img: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&q=80', desc: 'Full windbreak restoration along rural fence line' },
  { id: 2, region: 'Santa Ynez Valley', label: 'Ranch Land Clearing', category: 'santa-ynez', img: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&q=80', desc: '40-acre fire break and clearing project' },
  { id: 3, region: 'Vandenberg Village', label: 'Smart Irrigation', category: 'vandenberg', img: 'https://images.unsplash.com/photo-1585320806297-9794b3e4aaae?w=600&q=80', desc: 'Residential drip conversion with smart controller' },
  { id: 4, region: 'Orcutt & Santa Maria', label: 'Hardscape Patio', category: 'orcutt', img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80', desc: 'Flagstone patio and native garden installation' },
  { id: 5, region: 'Santa Ynez Valley', label: 'Oak Tree Preservation', category: 'santa-ynez', img: 'https://images.unsplash.com/photo-1540F0C65H4lGg?w=600&q=80', desc: 'Heritage oak health assessment and trimming' },
  { id: 6, region: 'Lompoc Valley', label: 'Landscape Design', category: 'lompoc', img: 'https://images.unsplash.com/photo-1599940824399-b87987ceb72a?w=600&q=80', desc: 'Full front yard redesign with drought-tolerant plants' },
  { id: 7, region: 'Vandenberg Village', label: 'Outdoor Living Space', category: 'vandenberg', img: 'https://images.unsplash.com/photo-1591825729269-caeb344f6df2?w=600&q=80', desc: 'Custom pergola with native plantings' },
  { id: 8, region: 'Orcutt & Santa Maria', label: 'Acreage Clearing', category: 'orcutt', img: 'https://images.unsplash.com/photo-1439853949212-36589f288df8?w=600&q=80', desc: 'Brush removal for rural property development' },
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
  { value: 'C-27/D-49', label: 'Licensed & Insured' },
  { value: '500+', label: 'Properties Transformed' },
  { value: '4 Counties', label: 'Central Coast Coverage' },
];

export default function ClientSite() {
  const [estimateOpen, setEstimateOpen] = useState(false);
  const [galleryFilter, setGalleryFilter] = useState('all');
  const [testimonialIdx, setTestimonialIdx] = useState(0);

  const filteredGallery = galleryFilter === 'all'
    ? galleryItems
    : galleryItems.filter(i => i.category === galleryFilter);

  const prevTestimonial = () => setTestimonialIdx(i => (i - 1 + testimonials.length) % testimonials.length);
  const nextTestimonial = () => setTestimonialIdx(i => (i + 1) % testimonials.length);

  return (
    <div className="min-h-screen bg-sand font-sans">
      <ClientNav onEstimateClick={() => setEstimateOpen(true)} />
      <LeadCaptureModal isOpen={estimateOpen} onClose={() => setEstimateOpen(false)} />

      {/* HERO */}
      <section
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{ background: 'linear-gradient(160deg, #0f2a1c 0%, #1B4332 45%, #1e3a2a 100%)' }}
      >
        {/* Background texture overlay */}
        <div className="absolute inset-0 opacity-20"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1600&q=80)', backgroundSize: 'cover', backgroundPosition: 'center' }} />
        <div className="absolute inset-0 bg-gradient-to-br from-forest/90 via-forest/75 to-harvest/20" />

        <div className="relative z-10 text-center max-w-5xl mx-auto px-6 pt-20 pb-16">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 text-sm text-white/80 mb-8">
            <Shield size={14} className="text-harvest" />
            Licensed C-27 / D-49 &nbsp;·&nbsp; Fully Insured &nbsp;·&nbsp; Family Owned
          </div>

          <h1 className="font-serif text-5xl md:text-7xl font-bold text-white leading-tight text-balance mb-6">
            Family-Owned &<br />
            <span className="text-harvest">Community Trusted</span><br />
            Outdoor Experts
          </h1>

          <p className="text-lg md:text-xl text-white/75 max-w-2xl mx-auto mb-4 leading-relaxed">
            Proudly serving Lompoc, the Santa Ynez Valley, Vandenberg Village, and the greater Central Coast.
            Real craftsmanship. Real relationships. Real results.
          </p>

          <div className="flex items-center justify-center gap-2 text-sm text-harvest font-semibold mb-10">
            <MapPin size={16} />
            Lompoc, the Santa Ynez Valley & The Central Coast
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => setEstimateOpen(true)}
              className="bg-harvest text-white font-bold px-8 py-4 rounded-xl hover:bg-harvest-dark transition-all shadow-xl hover:shadow-2xl text-base"
            >
              Request a Free Estimate
            </button>
            <a href="#services" className="border-2 border-white/30 text-white font-semibold px-8 py-4 rounded-xl hover:bg-white/10 transition-all text-base">
              Our Services
            </a>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16">
            {stats.map(s => (
              <div key={s.label} className="bg-white/8 backdrop-blur-sm border border-white/15 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-harvest font-serif">{s.value}</div>
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

      {/* SERVICES */}
      <section id="services" className="py-20 lg:py-28 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 bg-forest/10 text-forest text-xs font-bold px-3 py-1.5 rounded-full mb-4 tracking-wider uppercase">
            <Award size={12} /> Our Core Services
          </div>
          <h2 className="section-title text-center">Built for the Central Coast</h2>
          <p className="section-subtitle mx-auto text-center">
            Every service we offer is calibrated to the unique wind, fire, water, and land conditions of our region.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-6 animate-stagger">
          {services.map((svc) => (
            <div key={svc.title} className="card hover:shadow-md transition-shadow duration-300 group">
              <div className="p-6 md:p-8">
                <div className="flex items-start gap-4 mb-4">
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 ${svc.color}`}>
                    {svc.icon}
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-harvest tracking-widest uppercase">{svc.license}</span>
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
            </div>
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
            <h2 className="section-title text-center">Projects From Your Neighborhood</h2>
            <p className="section-subtitle mx-auto text-center">
              Filter by sub-region to see work done right in your area.
            </p>
          </div>

          {/* Filter tabs */}
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

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 animate-stagger">
            {filteredGallery.map(item => (
              <div key={item.id} className="group relative rounded-xl overflow-hidden aspect-[4/3] bg-gray-100 shadow-sm hover:shadow-lg transition-shadow">
                <img
                  src={item.img}
                  alt={item.label}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={e => { e.target.src = `https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&q=80`; }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <div className="text-[10px] text-harvest font-bold uppercase tracking-wider mb-1">{item.region}</div>
                  <div className="text-white font-semibold text-sm">{item.label}</div>
                  <div className="text-white/70 text-xs mt-0.5">{item.desc}</div>
                </div>
              </div>
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
            <h2 className="section-title mb-5">Rooted in Lompoc. Trusted Across the Valley.</h2>
            <p className="text-gray-500 leading-relaxed mb-4">
              We are a family-owned outdoor services company with deep roots in the Lompoc Valley. What started as a passion for caring for the land has grown into a full-service operation trusted by homeowners, ranchers, vineyard managers, and property developers across Santa Barbara and Ventura counties.
            </p>
            <p className="text-gray-500 leading-relaxed mb-6">
              We understand the unique demands of the Central Coast climate — the relentless Diablo winds, the persistent drought cycles, and the wildfire risk that shapes how every property must be managed. Our licenses, our tools, and our expertise are all calibrated to this land.
            </p>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: <Shield size={16} />, label: 'Licensed C-27 & D-49' },
                { icon: <CheckCircle size={16} />, label: 'Fully Bonded & Insured' },
                { icon: <MapPin size={16} />, label: 'Locally Headquartered' },
                { icon: <Award size={16} />, label: 'CAL FIRE Compliant' },
              ].map(item => (
                <div key={item.label} className="flex items-center gap-2.5 text-sm font-medium text-charcoal">
                  <span className="text-harvest">{item.icon}</span>
                  {item.label}
                </div>
              ))}
            </div>
            <button onClick={() => setEstimateOpen(true)} className="btn-primary mt-8">
              Work With Us
            </button>
          </div>
          <div className="relative">
            <div className="rounded-2xl overflow-hidden aspect-[4/3] shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1464207687429-7505649dae38?w=800&q=80"
                alt="Central Coast landscape"
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
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mb-10">What Our Neighbors Say</h2>

          {testimonials.length === 0 ? (
            <div className="bg-white/5 border border-white/10 rounded-2xl px-8 py-12">
              <div className="w-14 h-14 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-5">
                <Star size={24} className="text-harvest" />
              </div>
              <h3 className="font-serif text-xl font-semibold text-white mb-3">Proudly Serving Our Neighbors</h3>
              <p className="text-white/50 text-sm max-w-sm mx-auto leading-relaxed">
                Client reviews from across the valley coming soon. We're focused on delivering outstanding results — the stories will follow.
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
            Request your free estimate today. We'll come out, walk the property, and give you a detailed, no-obligation quote.
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
            <span className="flex items-center gap-2"><MapPin size={14} /> Lompoc, CA · Serving Santa Barbara & Ventura Counties</span>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-charcoal text-white/60 py-10 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
          <div className="font-serif font-bold text-white">Central Coast Outdoor Services</div>
          <div>Lic. C-27 / D-49 · Serving Santa Barbara & Ventura Counties · Family Owned & Operated</div>
          <div>© {new Date().getFullYear()} · All Rights Reserved</div>
        </div>
      </footer>
    </div>
  );
}
