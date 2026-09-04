import React from 'react';
import { CheckCircle2, AlertCircle, Info, X, AlertTriangle } from 'lucide-react';

export interface ToastMessage {
  id: number;
  type: 'success' | 'error' | 'info' | 'warning';
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
          className={`pointer-events-auto flex items-start gap-3 p-4 bg-[#0C0C0C] border ${
            toast.type === 'warning'
              ? 'border-[#F59E0B]/60 shadow-[0_10px_30px_rgba(245,158,11,0.25)]'
              : toast.type === 'error'
              ? 'border-[#FF3B30]/50 shadow-[0_10px_30px_rgba(255,59,48,0.2)]'
              : toast.type === 'success'
              ? 'border-[#E0FF00]/50 shadow-[0_10px_30px_rgba(224,255,0,0.2)]'
              : 'border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.8)]'
          } text-xs text-white animate-fadeIn`}
        >
          <div className="shrink-0 mt-0.5">
            {toast.type === 'success' && <CheckCircle2 className="w-4 h-4 text-[#E0FF00]" />}
            {toast.type === 'error' && <AlertCircle className="w-4 h-4 text-[#FF3B30]" />}
            {toast.type === 'info' && <Info className="w-4 h-4 text-[#40C4FF]" />}
            {toast.type === 'warning' && <AlertTriangle className="w-4 h-4 text-[#F59E0B] animate-pulse" />}
          </div>

          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h5 className="font-bold text-white font-mono uppercase tracking-wider text-[11px]">{toast.title}</h5>
              {toast.type === 'warning' && (
                <span className="px-1.5 py-0.5 text-[8px] font-mono font-black uppercase tracking-wider bg-[#F59E0B]/20 text-[#F59E0B] border border-[#F59E0B]/40 rounded-none">
                  7-Day Alert
                </span>
              )}
            </div>
            {toast.message && (
              <p className="text-white/80 mt-1 leading-relaxed text-xs font-sans">{toast.message}</p>
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
