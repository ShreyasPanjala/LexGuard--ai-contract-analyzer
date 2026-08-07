import { useEffect, useState } from 'react';
import { FiCheckCircle, FiAlertCircle, FiAlertTriangle, FiInfo, FiX } from 'react-icons/fi';

const CONFIG = {
  success: {
    icon: FiCheckCircle,
    classes: 'border-emerald-500/40 bg-emerald-950/70 text-emerald-300',
    iconClass: 'text-emerald-400',
  },
  error: {
    icon: FiAlertCircle,
    classes: 'border-red-500/40 bg-red-950/70 text-red-300',
    iconClass: 'text-red-400',
  },
  warning: {
    icon: FiAlertTriangle,
    classes: 'border-amber-500/40 bg-amber-950/70 text-amber-300',
    iconClass: 'text-amber-400',
  },
  info: {
    icon: FiInfo,
    classes: 'border-blue-500/40 bg-blue-950/70 text-blue-300',
    iconClass: 'text-blue-400',
  },
};

function Toast({ toast, onRemove }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Defer to trigger CSS enter transition
    const t = setTimeout(() => setVisible(true), 10);
    return () => clearTimeout(t);
  }, []);

  const cfg = CONFIG[toast.type] || CONFIG.info;
  const Icon = cfg.icon;

  return (
    <div
      className={`
        flex items-start gap-3 p-4 rounded-xl border backdrop-blur-sm shadow-xl
        max-w-sm w-full pointer-events-auto
        transition-all duration-300 ease-out
        ${cfg.classes}
        ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}
      `}
      role="alert"
    >
      <Icon size={17} className={`shrink-0 mt-0.5 ${cfg.iconClass}`} />
      <p className="flex-1 text-sm font-medium leading-snug">{toast.message}</p>
      <button
        onClick={() => onRemove(toast.id)}
        className="shrink-0 opacity-50 hover:opacity-100 transition-opacity ml-1"
        aria-label="Dismiss notification"
      >
        <FiX size={15} />
      </button>
    </div>
  );
}

/**
 * Renders all active toasts in a fixed bottom-right stack.
 */
export function ToastContainer({ toasts, onRemove }) {
  return (
    <div
      aria-live="polite"
      aria-atomic="false"
      className="fixed bottom-6 right-6 z-50 flex flex-col gap-2.5 pointer-events-none"
    >
      {toasts.map((toast) => (
        <Toast key={toast.id} toast={toast} onRemove={onRemove} />
      ))}
    </div>
  );
}

export default Toast;
