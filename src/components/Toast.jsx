import { useEffect } from 'react';
import { CheckIcon, XIcon } from './Icons';

export default function Toast({ toast, onClose }) {
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(onClose, 3500);
    return () => clearTimeout(t);
  }, [toast, onClose]);

  if (!toast) return null;

  const isError = toast.type === 'error';

  return (
    <div className="fixed inset-x-0 top-5 z-50 flex justify-center px-4">
      <div
        className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium text-white shadow-2xl backdrop-blur-xl animate-scale-in
          ${isError ? 'bg-red-500/90' : 'bg-emerald-500/90'}`}
      >
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20">
          {isError ? <XIcon className="h-4 w-4" /> : <CheckIcon className="h-4 w-4" />}
        </span>
        {toast.message}
      </div>
    </div>
  );
}
