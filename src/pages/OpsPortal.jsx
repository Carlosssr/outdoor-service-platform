import { useState } from 'react';
import PortalSidebar from '../components/PortalSidebar';
import OverviewView from './portal/OverviewView';
import AnalyticsView from './portal/AnalyticsView';
import LeadsView from './portal/LeadsView';
import ProjectsView from './portal/ProjectsView';
import ToastContainer from '../components/Toast';
import { Menu, Bell } from 'lucide-react';

const viewTitles = {
  overview: 'Operations Overview',
  analytics: 'Market Analytics & Geo-Targeting',
  leads: 'Lead Pipeline',
  projects: 'Project Tracker',
};

export default function OpsPortal() {
  const [activeView, setActiveView] = useState('overview');
  const [mobileSidebar, setMobileSidebar] = useState(false);

  const renderView = () => {
    switch (activeView) {
      case 'overview': return <OverviewView setActiveView={setActiveView} />;
      case 'analytics': return <AnalyticsView />;
      case 'leads': return <LeadsView />;
      case 'projects': return <ProjectsView />;
      default: return <OverviewView setActiveView={setActiveView} />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50/80 overflow-hidden">
      <PortalSidebar
        activeView={activeView}
        setActiveView={setActiveView}
        mobileOpen={mobileSidebar}
        onClose={() => setMobileSidebar(false)}
      />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top bar */}
        <header className="bg-white border-b border-gray-100 px-4 sm:px-6 py-3 flex items-center justify-between gap-4 flex-shrink-0 shadow-sm">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileSidebar(true)}
              className="lg:hidden p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
            >
              <Menu size={18} />
            </button>
            <div>
              <h1 className="font-serif font-bold text-charcoal text-base leading-tight">
                {viewTitles[activeView]}
              </h1>
              <p className="text-[11px] text-gray-400 hidden sm:block">Central Coast Outdoor Services · Internal Portal</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Bell size={18} className="text-gray-400" />
              <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-harvest rounded-full text-[8px] text-white flex items-center justify-center font-bold">2</span>
            </div>
            <div className="w-8 h-8 bg-forest rounded-full flex items-center justify-center text-white text-xs font-bold select-none">
              OW
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6">
          <div className="max-w-7xl mx-auto">
            {renderView()}
          </div>
        </main>
      </div>

      <ToastContainer />
    </div>
  );
}
