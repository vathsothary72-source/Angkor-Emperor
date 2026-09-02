import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export interface ToastMessage {
  id: number;
  type: 'success' | 'error' | 'info';
  title: string;
  message?: string;
}

interface ToastContainerProps {
  toasts: ToastMessage[];
  onDismiss: (id: number) => void;
}

export const ToastContainer: React.FC<ToastContainerProps> = ({ toasts, onDismiss }) => {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto flex items-start gap-3 p-4 bg-[#0C0C0C] border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.8)] text-xs text-white animate-fadeIn"
        >
          <div className="shrink-0 mt-0.5">
            {toast.type === 'success' && <CheckCircle2 className="w-4 h-4 text-[#E0FF00]" />}
            {toast.type === 'error' && <AlertCircle className="w-4 h-4 text-[#FF3B30]" />}
            {toast.type === 'info' && <Info className="w-4 h-4 text-[#40C4FF]" />}
          </div>

          <div className="flex-1">
            <h5 className="font-bold text-white font-mono uppercase tracking-wider text-[11px]">{toast.title}</h5>
            {toast.message && (
              <p className="text-white/70 mt-1 leading-relaxed text-xs">{toast.message}</p>
            )}
          </div>

          <button
            onClick={() => onDismiss(toast.id)}
            className="text-white/40 hover:text-white p-0.5 shrink-0 cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ))}
    </div>
  );
};
