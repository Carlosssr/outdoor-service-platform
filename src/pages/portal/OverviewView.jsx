import { useApp } from '../../hooks/useAppState';
import KPIRibbon from '../../components/KPIRibbon';
import { Star, ArrowRight, Calendar, Users } from 'lucide-react';

const fmt = (n) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n);

const statusColors = {
  Scheduled: 'bg-blue-100 text-blue-700',
  'In Progress': 'bg-amber-100 text-amber-700',
  Delayed: 'bg-red-100 text-red-700',
  Completed: 'bg-green-100 text-green-700',
};

export default function OverviewView({ setActiveView }) {
  const { leads, projects } = useApp();

  const recentLeads = leads.filter(l => l.status !== 'Converted').slice(0, 4);
  const activeProjects = projects.filter(p => p.status === 'In Progress' || p.status === 'Scheduled').slice(0, 4);

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h2 className="font-serif text-2xl font-bold text-forest">Operations Overview</h2>
        <p className="text-gray-400 text-sm mt-1">Good morning. Here's a snapshot of the business.</p>
      </div>

      <KPIRibbon />

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Leads */}
        <div className="card">
          <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Users size={16} className="text-forest" />
              <h3 className="font-semibold text-charcoal text-sm">Open Leads</h3>
            </div>
            <button onClick={() => setActiveView('leads')} className="text-xs text-forest hover:text-harvest font-medium flex items-center gap-1">
              View all <ArrowRight size={12} />
            </button>
          </div>
          <div className="divide-y divide-gray-50">
            {recentLeads.length === 0 && (
              <div className="p-6 text-center text-sm text-gray-400">No open leads.</div>
            )}
            {recentLeads.map(lead => (
              <div key={lead.id} className="px-5 py-3.5 flex items-center justify-between gap-3 hover:bg-gray-50/50 transition-colors">
                <div className="min-w-0">
                  <div className="text-sm font-medium text-charcoal flex items-center gap-1.5 flex-wrap">
                    {lead.name}
                    {lead.highValue && (
                      <span className="badge bg-harvest/15 text-harvest-dark text-[10px]">
                        <Star size={8} className="fill-harvest text-harvest" /> High-Value
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-gray-400 truncate">{lead.service}</div>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className="text-sm font-bold text-forest">{fmt(lead.estimatedValue)}</div>
                  <div className="text-xs text-gray-400">{lead.location}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Active Projects */}
        <div className="card">
          <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Calendar size={16} className="text-harvest" />
              <h3 className="font-semibold text-charcoal text-sm">Active Projects</h3>
            </div>
            <button onClick={() => setActiveView('projects')} className="text-xs text-forest hover:text-harvest font-medium flex items-center gap-1">
              View all <ArrowRight size={12} />
            </button>
          </div>
          <div className="divide-y divide-gray-50">
            {activeProjects.length === 0 && (
              <div className="p-6 text-center text-sm text-gray-400">No active projects.</div>
            )}
            {activeProjects.map(proj => (
              <div key={proj.id} className="px-5 py-3.5 flex items-center justify-between gap-3 hover:bg-gray-50/50 transition-colors">
                <div className="min-w-0">
                  <div className="text-sm font-medium text-charcoal">{proj.name}</div>
                  <div className="text-xs text-gray-400">{proj.crew} · {proj.location}</div>
                </div>
                <span className={`badge flex-shrink-0 ${statusColors[proj.status] || 'bg-gray-100 text-gray-600'}`}>
                  {proj.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: 'View Analytics', view: 'analytics', color: 'bg-forest/5 text-forest hover:bg-forest/10' },
          { label: 'Manage Leads', view: 'leads', color: 'bg-harvest/5 text-harvest-dark hover:bg-harvest/10' },
          { label: 'All Projects', view: 'projects', color: 'bg-blue-50 text-blue-700 hover:bg-blue-100' },
          { label: 'Market Targeting', view: 'analytics', color: 'bg-purple-50 text-purple-700 hover:bg-purple-100' },
        ].map(a => (
          <button key={a.label} onClick={() => setActiveView(a.view)}
            className={`${a.color} rounded-xl p-4 text-sm font-semibold text-left transition-colors flex items-center justify-between`}>
            {a.label}
            <ArrowRight size={14} />
          </button>
        ))}
      </div>
    </div>
  );
}
