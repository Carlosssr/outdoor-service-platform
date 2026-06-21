import { createContext, useContext, useState, useCallback } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { SEED_LEADS, SEED_PROJECTS } from '../data/seedData';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [leads, setLeads] = useLocalStorage('osp_leads', SEED_LEADS);
  const [projects, setProjects] = useLocalStorage('osp_projects', SEED_PROJECTS);
  const [toasts, setToasts] = useState([]);
  const [marketingFocus, setMarketingFocus] = useLocalStorage('osp_mktfocus', { residential: 45, ranch: 55 });

  const addToast = useCallback((message, type = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 4000);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  const addLead = useCallback((lead) => {
    const newLead = { ...lead, id: `lead-${Date.now()}`, date: new Date().toISOString().split('T')[0] };
    setLeads(prev => [newLead, ...prev]);
    addToast(`New Quote Request from ${lead.location}!`, 'success');
    return newLead;
  }, [setLeads, addToast]);

  const updateLead = useCallback((id, updates) => {
    setLeads(prev => prev.map(l => l.id === id ? { ...l, ...updates } : l));
  }, [setLeads]);

  const deleteLead = useCallback((id) => {
    setLeads(prev => prev.filter(l => l.id !== id));
    addToast('Lead removed.', 'info');
  }, [setLeads, addToast]);

  const convertLeadToProject = useCallback((leadId, crewAssignment) => {
    const lead = leads.find(l => l.id === leadId);
    if (!lead) return;
    const newProject = {
      id: `proj-${Date.now()}`,
      name: lead.name,
      location: lead.location,
      segment: lead.service,
      crew: crewAssignment,
      status: 'Scheduled',
      startDate: new Date().toISOString().split('T')[0],
      endDate: '',
      value: lead.estimatedValue,
      notes: lead.notes || '',
    };
    setProjects(prev => [newProject, ...prev]);
    setLeads(prev => prev.map(l => l.id === leadId ? { ...l, status: 'Converted' } : l));
    addToast(`Project created! Assigned to ${crewAssignment}.`, 'success');
    return newProject;
  }, [leads, setLeads, setProjects, addToast]);

  const addProject = useCallback((project) => {
    const newProject = { ...project, id: `proj-${Date.now()}` };
    setProjects(prev => [newProject, ...prev]);
    addToast('New project added.', 'success');
  }, [setProjects, addToast]);

  const updateProject = useCallback((id, updates) => {
    setProjects(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
    if (updates.crew) addToast(`Project re-assigned to ${updates.crew}.`, 'info');
  }, [setProjects, addToast]);

  const deleteProject = useCallback((id) => {
    setProjects(prev => prev.filter(p => p.id !== id));
    addToast('Project removed.', 'info');
  }, [setProjects, addToast]);

  const updateMarketingFocus = useCallback((val) => {
    setMarketingFocus({ residential: 100 - val, ranch: val });
    addToast('Target Parameters Updated.', 'info');
  }, [setMarketingFocus, addToast]);

  // Computed KPIs
  const activeProjects = projects.filter(p => p.status !== 'Completed');
  const openPipeline = leads
    .filter(l => l.status !== 'Converted' && l.status !== 'Lost')
    .reduce((sum, l) => sum + (l.estimatedValue || 0), 0);
  const avgJobSize = projects.length
    ? Math.round(projects.reduce((s, p) => s + (p.value || 0), 0) / projects.length)
    : 0;

  const locationGroups = leads.reduce((acc, l) => {
    acc[l.location] = (acc[l.location] || 0) + (l.estimatedValue || 0);
    return acc;
  }, {});
  const topZone = Object.entries(locationGroups).sort((a, b) => b[1] - a[1])[0]?.[0] || 'N/A';

  return (
    <AppContext.Provider value={{
      leads, addLead, updateLead, deleteLead, convertLeadToProject,
      projects, addProject, updateProject, deleteProject,
      toasts, addToast, removeToast,
      marketingFocus, updateMarketingFocus,
      kpis: { activeProjects: activeProjects.length, openPipeline, avgJobSize, topZone },
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used inside AppProvider');
  return ctx;
}
