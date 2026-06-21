import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Leaf, Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'Services', href: '#services' },
  { label: 'Our Work', href: '#gallery' },
  { label: 'About', href: '#about' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'Contact', href: '#contact' },
];

export default function ClientNav({ onEstimateClick }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[500] transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 bg-forest rounded-lg flex items-center justify-center shadow-sm">
              <Leaf size={18} className="text-harvest" />
            </div>
            <div>
              <div className={`font-serif font-bold text-base leading-tight transition-colors ${scrolled ? 'text-forest' : 'text-white'}`}>
                Central Coast
              </div>
              <div className={`text-[10px] font-semibold tracking-widest uppercase transition-colors ${scrolled ? 'text-harvest' : 'text-harvest-light'}`}>
                Outdoor Services
              </div>
            </div>
          </a>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map(link => (
              <a
                key={link.label}
                href={link.href}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${scrolled ? 'text-charcoal hover:text-forest hover:bg-forest/5' : 'text-white/90 hover:text-white hover:bg-white/10'}`}
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onEstimateClick}
              className="hidden md:block bg-harvest text-white text-sm font-semibold px-5 py-2.5 rounded-lg hover:bg-harvest-dark transition-all shadow-md hover:shadow-lg"
            >
              Request an Estimate
            </button>
            {/* Hidden ops toggle */}
            <button
              onClick={() => navigate('/portal')}
              title="Internal Operations Portal"
              className={`p-2 rounded-lg opacity-30 hover:opacity-100 transition-opacity ${scrolled ? 'text-gray-400' : 'text-white/50'}`}
            >
              <div className="w-4 h-4 flex flex-col justify-between">
                <span className="block h-[2px] bg-current rounded" />
                <span className="block h-[2px] bg-current rounded w-2/3" />
                <span className="block h-[2px] bg-current rounded" />
              </div>
            </button>
            {/* Mobile menu toggle */}
            <button onClick={() => setMobileOpen(!mobileOpen)} className={`md:hidden p-2 rounded-lg ${scrolled ? 'text-forest' : 'text-white'}`}>
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-lg animate-fade-in">
          <div className="px-4 pt-3 pb-4 flex flex-col gap-1">
            {navLinks.map(link => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="px-4 py-3 text-sm font-medium text-charcoal hover:text-forest hover:bg-forest/5 rounded-lg transition-colors"
              >
                {link.label}
              </a>
            ))}
            <button
              onClick={() => { setMobileOpen(false); onEstimateClick(); }}
              className="mt-2 bg-harvest text-white text-sm font-semibold px-5 py-3 rounded-lg hover:bg-harvest-dark transition-all"
            >
              Request an Estimate
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
