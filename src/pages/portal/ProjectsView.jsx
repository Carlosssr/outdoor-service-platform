import { useState } from 'react';
import { useApp } from '../../hooks/useAppState';
import Modal from '../../components/Modal';
import { CREWS, SEGMENT_TYPES, LOCATION_OPTIONS } from '../../data/seedData';
import { Plus, Trash2, Edit3, Check, X } from 'lucide-react';

const fmt = (n) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n);

const statusColors = {
  Scheduled: 'bg-blue-100 text-blue-700',
  'In Progress': 'bg-amber-100 text-amber-700',
  Delayed: 'bg-red-100 text-red-700',
  Completed: 'bg-green-100 text-green-700',
};

const emptyProject = {
  name: '', location: '', segment: SEGMENT_TYPES[0],
  crew: CREWS[0], status: 'Scheduled',
  startDate: '', endDate: '', value: '', notes: '',
};

export default function ProjectsView() {
  const { projects, addProject, updateProject, deleteProject } = useApp();
  const [addModal, setAddModal] = useState(false);
  const [form, setForm] = useState(emptyProject);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});

  const set = f => e => setForm(p => ({ ...p, [f]: e.target.value }));

  const handleAdd = (e) => {
    e.preventDefault();
    addProject({ ...form, value: Number(form.value) || 0 });
    setForm(emptyProject);
    setAddModal(false);
  };

  const startEdit = (project) => {
    setEditingId(project.id);
    setEditData({ status: project.status, crew: project.crew });
  };
  const saveEdit = (id) => {
    updateProject(id, editData);
    setEditingId(null);
  };
  const cancelEdit = () => setEditingId(null);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif text-2xl font-bold text-forest">Project Tracker</h2>
          <p className="text-gray-400 text-sm mt-1">{projects.length} total projects</p>
        </div>
        <button onClick={() => setAddModal(true)} className="btn-primary flex items-center gap-2 text-sm self-start sm:self-auto">
          <Plus size={16} /> Add Project
        </button>
      </div>

      {/* Mobile cards */}
      <div className="md:hidden space-y-3">
        {projects.map(p => (
          <ProjectCard key={p.id} project={p} onDelete={deleteProject} onUpdate={updateProject} />
        ))}
        {projects.length === 0 && <div className="card p-10 text-center text-gray-400 text-sm">No projects yet.</div>}
      </div>

      {/* Desktop table */}
      <div className="hidden md:block card overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50/70">
            <tr>
              <th className="table-th">Project</th>
              <th className="table-th">Location</th>
              <th className="table-th">Segment</th>
              <th className="table-th">Crew</th>
              <th className="table-th">Status</th>
              <th className="table-th">Timeline</th>
              <th className="table-th text-right">Value</th>
              <th className="table-th">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {projects.map(proj => (
              <tr key={proj.id} className="hover:bg-gray-50/50 transition-colors">
                <td className="table-td">
                  <div className="font-medium text-charcoal">{proj.name}</div>
                  {proj.notes && <div className="text-xs text-gray-400 mt-0.5 max-w-[180px] truncate">{proj.notes}</div>}
                </td>
                <td className="table-td text-gray-600">{proj.location}</td>
                <td className="table-td text-xs text-gray-500 max-w-[140px]">
                  <span className="truncate block">{proj.segment}</span>
                </td>
                <td className="table-td">
                  {editingId === proj.id ? (
                    <select
                      value={editData.crew}
                      onChange={e => setEditData(d => ({ ...d, crew: e.target.value }))}
                      className="border border-gray-200 rounded-lg px-2 py-1 text-xs bg-white focus:outline-none"
                    >
                      {CREWS.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  ) : (
                    <span className="text-sm font-medium text-charcoal">{proj.crew}</span>
                  )}
                </td>
                <td className="table-td">
                  {editingId === proj.id ? (
                    <select
                      value={editData.status}
                      onChange={e => setEditData(d => ({ ...d, status: e.target.value }))}
                      className="border border-gray-200 rounded-lg px-2 py-1 text-xs bg-white focus:outline-none"
                    >
                      {Object.keys(statusColors).map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  ) : (
                    <span className={`badge ${statusColors[proj.status] || 'bg-gray-100 text-gray-600'}`}>{proj.status}</span>
                  )}
                </td>
                <td className="table-td text-xs text-gray-400">
                  <div>{proj.startDate}</div>
                  {proj.endDate && <div>→ {proj.endDate}</div>}
                </td>
                <td className="table-td text-right font-semibold text-forest">
                  {proj.value ? fmt(proj.value) : 'N/A'}
                </td>
                <td className="table-td">
                  <div className="flex items-center gap-1">
                    {editingId === proj.id ? (
                      <>
                        <button onClick={() => saveEdit(proj.id)} className="p-1.5 rounded-lg text-green-600 hover:bg-green-50 transition-colors">
                          <Check size={14} />
                        </button>
                        <button onClick={cancelEdit} className="p-1.5 rounded-lg text-gray-400 hover:bg-gray-100 transition-colors">
                          <X size={14} />
                        </button>
                      </>
                    ) : (
                      <button onClick={() => startEdit(proj)} className="p-1.5 rounded-lg text-forest hover:bg-forest/10 transition-colors">
                        <Edit3 size={14} />
                      </button>
                    )}
                    <button onClick={() => deleteProject(proj.id)} className="p-1.5 rounded-lg text-red-400 hover:bg-red-50 transition-colors">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {projects.length === 0 && (
              <tr><td colSpan={8} className="table-td text-center text-gray-400 py-10">No projects yet. Add your first project.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Add Project Modal */}
      <Modal isOpen={addModal} onClose={() => setAddModal(false)} title="Add New Project" size="lg">
        <form onSubmit={handleAdd} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">Project Name *</label>
              <input required value={form.name} onChange={set('name')}
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-forest/30"
                placeholder="Solvang Estate Hardscape" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">Location *</label>
              <select required value={form.location} onChange={set('location')}
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-forest/30">
                <option value="">Select...</option>
                {LOCATION_OPTIONS.map(l => <option key={l} value={l}>{l}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">Segment Type *</label>
              <select required value={form.segment} onChange={set('segment')}
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-forest/30">
                {SEGMENT_TYPES.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">Assign Crew *</label>
              <select required value={form.crew} onChange={set('crew')}
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-forest/30">
                {CREWS.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">Status</label>
              <select value={form.status} onChange={set('status')}
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-forest/30">
                {Object.keys(statusColors).map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">Start Date</label>
              <input type="date" value={form.startDate} onChange={set('startDate')}
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-forest/30" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">Target End Date</label>
              <input type="date" value={form.endDate} onChange={set('endDate')}
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-forest/30" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">Contract Value ($)</label>
              <input type="number" value={form.value} onChange={set('value')}
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-forest/30"
                placeholder="12500" />
            </div>
            <div className="col-span-2">
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">Notes</label>
              <textarea value={form.notes} onChange={set('notes')} rows={2}
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-forest/30 resize-none"
                placeholder="Project details, scope, access notes..." />
            </div>
          </div>
          <div className="flex gap-3 pt-2">
            <button type="submit" className="btn-primary flex-1">Add Project</button>
            <button type="button" onClick={() => setAddModal(false)} className="btn-outline flex-1">Cancel</button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

function ProjectCard({ project, onDelete, onUpdate }) {
  const [editing, setEditing] = useState(false);
  const [crew, setCrew] = useState(project.crew);
  const [cardStatus, setCardStatus] = useState(project.status);

  const save = () => {
    onUpdate(project.id, { crew, status: cardStatus });
    setEditing(false);
  };

  const cardStatusColors = {
    Scheduled: 'bg-blue-100 text-blue-700',
    'In Progress': 'bg-amber-100 text-amber-700',
    Delayed: 'bg-red-100 text-red-700',
    Completed: 'bg-green-100 text-green-700',
  };

  const fmtCard = (n) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n);

  return (
    <div className="card p-4 space-y-3">
      <div className="flex items-start justify-between gap-2">
        <div>
          <div className="font-semibold text-charcoal text-sm">{project.name}</div>
          <div className="text-xs text-gray-400 mt-0.5">{project.location} · {project.segment}</div>
        </div>
        <div className="text-sm font-bold text-forest">{project.value ? fmtCard(project.value) : 'N/A'}</div>
      </div>
      {editing ? (
        <div className="space-y-2">
          <select value={crew} onChange={e => setCrew(e.target.value)}
            className="w-full border border-gray-200 rounded-lg px-2 py-1.5 text-xs bg-white focus:outline-none">
            {CREWS.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <select value={cardStatus} onChange={e => setCardStatus(e.target.value)}
            className="w-full border border-gray-200 rounded-lg px-2 py-1.5 text-xs bg-white focus:outline-none">
            {['Scheduled', 'In Progress', 'Delayed', 'Completed'].map(s => <option key={s} value={s}>{s}</option>)}
          </select>
          <div className="flex gap-2">
            <button onClick={save} className="flex-1 btn-primary py-1.5 text-xs">Save</button>
            <button onClick={() => setEditing(false)} className="flex-1 btn-outline py-1.5 text-xs">Cancel</button>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 flex-wrap">
            <span className={`badge ${cardStatusColors[project.status] || 'bg-gray-100 text-gray-600'}`}>{project.status}</span>
            <span className="text-xs text-gray-500">{project.crew}</span>
          </div>
          <div className="flex gap-1">
            <button onClick={() => setEditing(true)} className="p-1.5 rounded-lg text-forest hover:bg-forest/10">
              <Edit3 size={14} />
            </button>
            <button onClick={() => onDelete(project.id)} className="p-1.5 rounded-lg text-red-400 hover:bg-red-50">
              <Trash2 size={14} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
