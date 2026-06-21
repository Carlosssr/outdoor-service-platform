import { useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, Users, FolderKanban, BarChart3,
  Leaf, ExternalLink, X
} from 'lucide-react';

const navItems = [
  { id: 'overview', label: 'Overview', icon: <LayoutDashboard size={18} /> },
  { id: 'analytics', label: 'Market Analytics', icon: <BarChart3 size={18} /> },
  { id: 'leads', label: 'Lead Pipeline', icon: <Users size={18} /> },
  { id: 'projects', label: 'Project Tracker', icon: <FolderKanban size={18} /> },
];

export default function PortalSidebar({ activeView, setActiveView, mobileOpen, onClose }) {
  const navigate = useNavigate();

  const content = (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="px-5 py-5 border-b border-gray-100 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-forest rounded-lg flex items-center justify-center">
            <Leaf size={15} className="text-harvest" />
          </div>
          <div>
            <div className="font-serif font-bold text-sm text-forest leading-tight">CC Outdoor</div>
            <div className="text-[9px] font-bold text-harvest tracking-widest uppercase">Ops Portal</div>
          </div>
        </div>
        {onClose && (
          <button onClick={onClose} className="lg:hidden p-1 text-gray-400 hover:text-gray-600">
            <X size={18} />
          </button>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-3 mb-2">Navigation</div>
        {navItems.map(item => (
          <button
            key={item.id}
            onClick={() => { setActiveView(item.id); onClose?.(); }}
            className={`w-full sidebar-link ${activeView === item.id ? 'sidebar-link-active' : 'sidebar-link-inactive'}`}
          >
            {item.icon}
            {item.label}
          </button>
        ))}
      </nav>

      {/* Footer */}
      <div className="px-3 py-4 border-t border-gray-100">
        <button
          onClick={() => navigate('/')}
          className="w-full sidebar-link sidebar-link-inactive text-xs"
        >
          <ExternalLink size={14} />
          View Client Website
        </button>
        <div className="px-3 mt-3">
          <div className="text-[10px] text-gray-400">Internal Use Only</div>
          <div className="text-[10px] text-gray-400">Lic. C-27 / D-49</div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex flex-col w-56 bg-white border-r border-gray-100 h-screen sticky top-0 flex-shrink-0 shadow-sm">
        {content}
      </aside>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-black/40" onClick={onClose} />
          <aside className="relative w-64 bg-white h-full shadow-xl flex flex-col animate-slide-up">
            {content}
          </aside>
        </div>
      )}
    </>
  );
}
