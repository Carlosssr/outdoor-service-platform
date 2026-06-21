import { useState } from 'react';
import Modal from './Modal';
import { useApp } from '../hooks/useAppState';
import { LOCATION_OPTIONS, SERVICE_OPTIONS, HIGH_VALUE_LOCATIONS } from '../data/seedData';

const emptyForm = {
  name: '', contact: '', email: '', phone: '',
  location: '', service: '', notes: '', source: 'Website Form',
};

export default function LeadCaptureModal({ isOpen, onClose }) {
  const { addLead } = useApp();
  const [form, setForm] = useState(emptyForm);
  const [submitted, setSubmitted] = useState(false);

  const set = (field) => (e) => setForm(prev => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    const estimatedValue = SERVICE_OPTIONS.indexOf(form.service) <= 1 ? 12000 :
      SERVICE_OPTIONS.indexOf(form.service) === 2 ? 22000 :
      SERVICE_OPTIONS.indexOf(form.service) === 3 ? 35000 : 8000;
    addLead({
      ...form,
      estimatedValue,
      status: 'New',
      highValue: HIGH_VALUE_LOCATIONS.includes(form.location),
    });
    setSubmitted(true);
  };

  const handleClose = () => {
    setForm(emptyForm);
    setSubmitted(false);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Request a Free Estimate" size="lg">
      {submitted ? (
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h4 className="font-serif text-2xl font-bold text-forest mb-2">Thank You!</h4>
          <p className="text-gray-500 text-sm max-w-xs mx-auto">
            We've received your request and will be in touch within one business day. We look forward to serving your property!
          </p>
          <button onClick={handleClose} className="mt-6 btn-primary">Close</button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">Full Name *</label>
              <input required value={form.name} onChange={set('name')}
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-forest/30 focus:border-forest"
                placeholder="John Smith" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">Phone Number</label>
              <input value={form.phone} onChange={set('phone')}
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-forest/30 focus:border-forest"
                placeholder="(805) 555-0100" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1.5">Email Address *</label>
            <input required type="email" value={form.email} onChange={set('email')}
              className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-forest/30 focus:border-forest"
              placeholder="you@example.com" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">Property Location *</label>
              <select required value={form.location} onChange={set('location')}
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-forest/30 focus:border-forest bg-white">
                <option value="">Select area...</option>
                {LOCATION_OPTIONS.map(l => <option key={l} value={l}>{l}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">Service Needed *</label>
              <select required value={form.service} onChange={set('service')}
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-forest/30 focus:border-forest bg-white">
                <option value="">Select service...</option>
                {SERVICE_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1.5">Project Details</label>
            <textarea value={form.notes} onChange={set('notes')} rows={3}
              className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-forest/30 focus:border-forest resize-none"
              placeholder="Tell us about your property and what you're looking to accomplish..." />
          </div>
          <p className="text-xs text-gray-400">Licensed C-27 / D-49 • Serving the Central Coast since day one.</p>
          <button type="submit" className="w-full btn-primary text-center">
            Submit Estimate Request
          </button>
        </form>
      )}
    </Modal>
  );
}
