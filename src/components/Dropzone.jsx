import { useRef, useState } from 'react';
import { UploadIcon, FileIcon, XIcon } from './Icons';
import { FOLLOWERS_PATTERN, FOLLOWING_PATTERN } from '../lib/instagram';

const isExportFile = (f) =>
  FOLLOWERS_PATTERN.test(f.name) || FOLLOWING_PATTERN.test(f.name);

// Pull every File out of a drop, walking into folders — Instagram's export is a folder.
async function filesFromDrop(dataTransfer) {
  const items = dataTransfer.items;
  if (!items?.length || !items[0].webkitGetAsEntry) {
    return Array.from(dataTransfer.files || []);
  }
  // Grab entries synchronously: the DataTransfer is emptied once the handler returns.
  const entries = [];
  for (const item of items) {
    const entry = item.webkitGetAsEntry?.();
    if (entry) entries.push(entry);
  }
  const files = [];
  const walk = (entry) =>
    new Promise((resolve) => {
      if (entry.isFile) {
        entry.file(
          (f) => {
            files.push(f);
            resolve();
          },
          () => resolve()
        );
      } else if (entry.isDirectory) {
        const reader = entry.createReader();
        const readBatch = () =>
          reader.readEntries(
            (batch) => {
              if (!batch.length) return resolve();
              Promise.all(batch.map(walk)).then(readBatch);
            },
            () => resolve()
          );
        readBatch();
      } else {
        resolve();
      }
    });
  await Promise.all(entries.map(walk));
  return files;
}

export default function Dropzone({ label, hint, files, onFiles, onReject }) {
  const inputRef = useRef(null);
  const [dragging, setDragging] = useState(false);

  const accept = (incoming) => {
    const all = Array.from(incoming || []);
    const list = all.filter(isExportFile);
    if (list.length) {
      onFiles(list);
    } else if (all.length) {
      // User picked something, but nothing looked like an Instagram export.
      onReject?.(all.length === 1 ? all[0].name : null);
    }
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    setDragging(false);
    accept(await filesFromDrop(e.dataTransfer));
  };

  const hasFiles = files.length > 0;

  return (
    <div className="w-full">
      <input
        ref={inputRef}
        type="file"
        accept=".json,application/json"
        multiple
        className="hidden"
        onChange={(e) => accept(e.target.files)}
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
              : hasFiles
                ? 'border-white/25 bg-white/[0.06]'
                : 'border-white/15 bg-white/[0.02] hover:border-ig-pink/60 hover:bg-white/[0.05]'
          }`}
      >
        {hasFiles ? (
          <>
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-ig-gradient text-white">
              <FileIcon className="h-6 w-6" />
            </span>
            <div className="max-w-full">
              <p className="font-medium text-white">
                {files.length} file{files.length === 1 ? '' : 's'} ready
              </p>
              <p className="mt-1 truncate font-mono text-xs text-white/40">
                {files.map((f) => f.name).join(', ')}
              </p>
            </div>
            <span
              role="button"
              tabIndex={0}
              onClick={(e) => {
                e.stopPropagation();
                onFiles([]);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.stopPropagation();
                  onFiles([]);
                }
              }}
              className="inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs text-white/60 transition hover:bg-white/10 hover:text-white"
            >
              <XIcon className="h-3.5 w-3.5" /> Clear
            </span>
          </>
        ) : (
          <>
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5 text-white/70 transition group-hover:bg-ig-gradient group-hover:text-white">
              <UploadIcon className="h-6 w-6" />
            </span>
            <div>
              <p className="font-medium text-white">{label}</p>
              <p className="text-sm text-white/45">
                Drop your whole export folder, or click to pick the JSON files
              </p>
            </div>
            <p className="font-mono text-xs text-white/35">{hint}</p>
          </>
        )}
      </button>
    </div>
  );
}
