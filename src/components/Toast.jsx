import { X, CheckCircle, Info, AlertTriangle } from 'lucide-react';
import { useApp } from '../hooks/useAppState';

const icons = {
  success: <CheckCircle size={16} className="text-green-500" />,
  info: <Info size={16} className="text-blue-500" />,
  warning: <AlertTriangle size={16} className="text-harvest" />,
};

export default function ToastContainer() {
  const { toasts, removeToast } = useApp();
  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-2 pointer-events-none">
      {toasts.map(toast => (
        <div
          key={toast.id}
          className="pointer-events-auto flex items-center gap-3 bg-white border border-gray-200 rounded-xl px-4 py-3 shadow-xl animate-slide-up min-w-[260px] max-w-sm"
        >
          {icons[toast.type] || icons.success}
          <span className="text-sm text-charcoal font-medium flex-1">{toast.message}</span>
          <button onClick={() => removeToast(toast.id)} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X size={14} />
          </button>
        </div>
      ))}
    </div>
  );
}
