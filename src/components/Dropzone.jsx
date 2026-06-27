import { useRef, useState } from 'react';
import { UploadIcon, FileIcon, XIcon, CheckIcon } from './Icons';

export default function Dropzone({ label, expectedName, file, onFile, step }) {
  const inputRef = useRef(null);
  const [dragging, setDragging] = useState(false);

  const pick = (f) => {
    if (f) onFile(f);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    pick(e.dataTransfer.files?.[0]);
  };

  const nameMatches = file && file.name === expectedName;

  return (
    <div className="flex-1">
      <input
        ref={inputRef}
        type="file"
        accept=".json,application/json"
        className="hidden"
        onChange={(e) => pick(e.target.files?.[0])}
      />
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        className={`group relative flex w-full flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed p-6 text-center transition-all duration-300 min-h-[200px]
          ${
            dragging
              ? 'border-ig-pink bg-ig-pink/10 scale-[1.02]'
              : file
                ? 'border-white/25 bg-white/[0.06]'
                : 'border-white/15 bg-white/[0.02] hover:border-ig-pink/60 hover:bg-white/[0.05]'
          }`}
      >
        <span className="absolute left-3 top-3 flex h-6 w-6 items-center justify-center rounded-full bg-ig-gradient text-xs font-bold text-white">
          {step}
        </span>

        {file ? (
          <>
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-ig-gradient text-white">
              {nameMatches ? <CheckIcon className="h-6 w-6" /> : <FileIcon className="h-6 w-6" />}
            </span>
            <div className="max-w-full">
              <p className="truncate font-medium text-white">{file.name}</p>
              {nameMatches ? (
                <p className="text-sm text-emerald-400">Looks good ✓</p>
              ) : (
                <p className="text-sm text-amber-400">
                  Expected{' '}
                  <span className="font-mono">{expectedName}</span>
                </p>
              )}
            </div>
            <span
              role="button"
              tabIndex={0}
              onClick={(e) => {
                e.stopPropagation();
                onFile(null);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.stopPropagation();
                  onFile(null);
                }
              }}
              className="inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs text-white/60 transition hover:bg-white/10 hover:text-white"
            >
              <XIcon className="h-3.5 w-3.5" /> Remove
            </span>
          </>
        ) : (
          <>
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5 text-white/70 transition group-hover:bg-ig-gradient group-hover:text-white">
              <UploadIcon className="h-6 w-6" />
            </span>
            <div>
              <p className="font-medium text-white">{label}</p>
              <p className="text-sm text-white/45">Drop or click to upload</p>
            </div>
            <p className="font-mono text-xs text-white/35">{expectedName}</p>
          </>
        )}
      </button>
    </div>
  );
}
