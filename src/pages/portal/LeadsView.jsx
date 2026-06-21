import { useState } from 'react';
import { useApp } from '../../hooks/useAppState';
import Modal from '../../components/Modal';
import { CREWS, HIGH_VALUE_LOCATIONS } from '../../data/seedData';
import { Plus, Trash2, ArrowRightCircle, Star, Filter } from 'lucide-react';

const fmt = (n) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n);

const statusColors = {
  New: 'bg-blue-100 text-blue-700',
  Contacted: 'bg-amber-100 text-amber-700',
  Quoted: 'bg-purple-100 text-purple-700',
  Converted: 'bg-green-100 text-green-700',
  Lost: 'bg-red-100 text-red-700',
};

export default function LeadsView() {
  const { leads, deleteLead, convertLeadToProject, updateLead } = useApp();
  const [convertModal, setConvertModal] = useState(null);
  const [selectedCrew, setSelectedCrew] = useState(CREWS[0]);
  const [statusFilter, setStatusFilter] = useState('All');

  const filtered = statusFilter === 'All' ? leads : leads.filter(l => l.status === statusFilter);

  const handleConvert = () => {
    if (!convertModal) return;
    convertLeadToProject(convertModal.id, selectedCrew);
    setConvertModal(null);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif text-2xl font-bold text-forest">Lead Pipeline</h2>
          <p className="text-gray-400 text-sm mt-1">{leads.length} total leads in system</p>
        </div>
        <div className="flex items-center gap-2">
          <Filter size={14} className="text-gray-400" />
          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-forest/30"
          >
            {['All', 'New', 'Contacted', 'Quoted', 'Converted', 'Lost'].map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Mobile card view */}
      <div className="md:hidden space-y-3">
        {filtered.map(lead => (
          <LeadCard key={lead.id} lead={lead} onConvert={setConvertModal} onDelete={deleteLead} onStatusChange={updateLead} />
        ))}
        {filtered.length === 0 && <EmptyState />}
      </div>

      {/* Desktop table */}
      <div className="hidden md:block card overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50/70">
            <tr>
              <th className="table-th">Lead</th>
              <th className="table-th">Location</th>
              <th className="table-th">Service</th>
              <th className="table-th">Source</th>
              <th className="table-th text-right">Est. Value</th>
              <th className="table-th">Status</th>
              <th className="table-th">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {filtered.map(lead => (
              <tr key={lead.id} className="hover:bg-gray-50/50 transition-colors">
                <td className="table-td">
                  <div className="flex items-center gap-2">
                    <div>
                      <div className="font-medium text-charcoal flex items-center gap-1.5">
                        {lead.name}
                        {lead.highValue && (
                          <span className="badge bg-harvest/15 text-harvest-dark text-[10px]">
                            <Star size={9} className="fill-harvest text-harvest" /> High-Value
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-gray-400">{lead.date}</div>
                    </div>
                  </div>
                </td>
                <td className="table-td text-gray-600">{lead.location}</td>
                <td className="table-td max-w-[180px]">
                  <div className="text-sm text-charcoal truncate">{lead.service}</div>
                </td>
                <td className="table-td text-gray-500 text-xs">{lead.source}</td>
                <td className="table-td text-right font-semibold text-forest">{fmt(lead.estimatedValue)}</td>
                <td className="table-td">
                  <select
                    value={lead.status}
                    onChange={e => updateLead(lead.id, { status: e.target.value })}
                    className={`badge border-0 cursor-pointer focus:outline-none ${statusColors[lead.status] || 'bg-gray-100 text-gray-600'}`}
                  >
                    {['New', 'Contacted', 'Quoted', 'Converted', 'Lost'].map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </td>
                <td className="table-td">
                  <div className="flex items-center gap-2">
                    {lead.status !== 'Converted' && (
                      <button
                        onClick={() => setConvertModal(lead)}
                        title="Convert to Project"
                        className="p-1.5 rounded-lg text-forest hover:bg-forest/10 transition-colors"
                      >
                        <ArrowRightCircle size={16} />
                      </button>
                    )}
                    <button
                      onClick={() => deleteLead(lead.id)}
                      className="p-1.5 rounded-lg text-red-400 hover:bg-red-50 transition-colors"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr><td colSpan={7} className="table-td text-center text-gray-400 py-10">No leads match this filter.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Convert Modal */}
      <Modal isOpen={!!convertModal} onClose={() => setConvertModal(null)} title="Convert to Active Project">
        {convertModal && (
          <div className="space-y-4">
            <div className="bg-sand rounded-xl p-4">
              <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Lead Summary</div>
              <div className="font-semibold text-charcoal">{convertModal.name}</div>
              <div className="text-sm text-gray-500">{convertModal.service} · {convertModal.location}</div>
              <div className="text-lg font-bold text-forest mt-2 font-serif">{fmt(convertModal.estimatedValue)}</div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-2">Assign Crew *</label>
              <select
                value={selectedCrew}
                onChange={e => setSelectedCrew(e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-forest/30"
              >
                {CREWS.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div className="flex gap-3 pt-2">
              <button onClick={handleConvert} className="btn-primary flex-1">
                Convert & Assign Project
              </button>
              <button onClick={() => setConvertModal(null)} className="btn-outline flex-1">
                Cancel
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

function LeadCard({ lead, onConvert, onDelete, onStatusChange }) {
  const fmt = (n) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n);
  return (
    <div className="card p-4 space-y-3">
      <div className="flex items-start justify-between gap-2">
        <div>
          <div className="font-semibold text-charcoal text-sm flex items-center gap-1.5 flex-wrap">
            {lead.name}
            {lead.highValue && (
              <span className="badge bg-harvest/15 text-harvest-dark text-[10px]">
                <Star size={9} className="fill-harvest text-harvest" /> High-Value
              </span>
            )}
          </div>
          <div className="text-xs text-gray-400 mt-0.5">{lead.location} · {lead.date}</div>
        </div>
        <div className="text-sm font-bold text-forest">{fmt(lead.estimatedValue)}</div>
      </div>
      <div className="text-xs text-gray-500">{lead.service}</div>
      <div className="flex items-center justify-between gap-2">
        <select
          value={lead.status}
          onChange={e => onStatusChange(lead.id, { status: e.target.value })}
          className={`badge border-0 cursor-pointer focus:outline-none text-xs ${statusColors[lead.status] || 'bg-gray-100 text-gray-600'}`}
        >
          {['New', 'Contacted', 'Quoted', 'Converted', 'Lost'].map(s => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
        <div className="flex gap-2">
          {lead.status !== 'Converted' && (
            <button onClick={() => onConvert(lead)} className="p-1.5 rounded-lg text-forest hover:bg-forest/10">
              <ArrowRightCircle size={15} />
            </button>
          )}
          <button onClick={() => onDelete(lead.id)} className="p-1.5 rounded-lg text-red-400 hover:bg-red-50">
            <Trash2 size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="card p-10 text-center text-gray-400">
      <Plus size={24} className="mx-auto mb-2 opacity-30" />
      <div className="text-sm">No leads in this view.</div>
    </div>
  );
}
