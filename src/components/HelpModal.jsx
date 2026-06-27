import { useEffect } from 'react';
import { XIcon } from './Icons';
import { FOLLOWERS_FILENAME, FOLLOWING_FILENAME } from '../lib/instagram';

const STEPS = [
  'Open Instagram → Settings → Accounts Center',
  'Go to "Your information and permissions"',
  'Tap "Export your information" → "Create export"',
  'Choose your profile',
  'Pick "Export to device"',
  'Set Date range to "All time" and Format to "JSON"',
  'Tap "Start export"',
  'Wait for the email when it\'s ready, then download',
];

export default function HelpModal({ open, onClose }) {
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose();
    if (open) window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div
        className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-white/10 bg-[#16101e] shadow-2xl animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="h-1.5 w-full bg-ig-gradient" />
        <div className="p-6 sm:p-8">
          <div className="mb-5 flex items-start justify-between">
            <div>
              <h2 className="font-display text-2xl font-bold tracking-tight">
                How to get your data
              </h2>
              <p className="mt-1 text-sm text-white/50">
                Followers may be split across several files — upload them all.
              </p>
            </div>
            <button
              onClick={onClose}
              className="flex h-9 w-9 items-center justify-center rounded-full text-white/60 transition hover:bg-white/10 hover:text-white"
            >
              <XIcon className="h-5 w-5" />
            </button>
          </div>

          <div className="mb-5 flex flex-wrap gap-2">
            {[FOLLOWERS_FILENAME, FOLLOWING_FILENAME].map((name) => (
              <span
                key={name}
                className="rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-xs text-white/70"
              >
                {name}
              </span>
            ))}
          </div>

          <ol className="flex flex-col gap-3.5">
            {STEPS.map((step, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-ig-gradient text-xs font-bold text-white">
                  {i + 1}
                </span>
                <span className="pt-0.5 text-sm leading-relaxed text-white/75">{step}</span>
              </li>
            ))}
          </ol>

          <button
            onClick={onClose}
            className="mt-7 w-full rounded-full bg-ig-gradient bg-[length:200%_200%] py-3 font-semibold text-white transition hover:bg-[position:100%_50%]"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );
}
