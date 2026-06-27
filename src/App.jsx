import { useState } from 'react';
import Dropzone from './components/Dropzone';
import HelpModal from './components/HelpModal';
import ResultsList from './components/ResultsList';
import Toast from './components/Toast';
import { LockIcon, CheckIcon, XIcon } from './components/Icons';
import {
  compareFollows,
  FOLLOWERS_FILENAME,
  FOLLOWING_FILENAME,
  FOLLOWERS_PATTERN,
  FOLLOWING_PATTERN,
} from './lib/instagram';

const FEATURES = [
  { emoji: '🔒', label: 'No login' },
  { emoji: '⚡', label: 'Instant' },
  { emoji: '🕵️', label: '100% private' },
];

export default function App() {
  const [files, setFiles] = useState([]);
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);
  const [toast, setToast] = useState(null);

  // Sort whatever was dropped into the two kinds of file Instagram exports.
  const followersFiles = files.filter((f) => FOLLOWERS_PATTERN.test(f.name));
  const followingFile = files.find((f) => FOLLOWING_PATTERN.test(f.name));

  const showToast = (message, type = 'success') => setToast({ message, type });

  const handleReveal = async () => {
    if (!followersFiles.length) return showToast(`Couldn't find ${FOLLOWERS_FILENAME}`, 'error');
    if (!followingFile) return showToast(`Couldn't find ${FOLLOWING_FILENAME}`, 'error');

    setLoading(true);
    try {
      const data = await compareFollows(followersFiles, followingFile);
      setResults(data);
      showToast('Done — here are your results!');
    } catch (err) {
      showToast(err.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setResults(null);
    setFiles([]);
  };

  const total = results ? results.mutuals.length + results.notFollowingBack.length : 0;
  const rate = total ? Math.round((results.mutuals.length / total) * 100) : 0;

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Ambient gradient blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-[10%] -top-[10%] h-[40vw] w-[40vw] rounded-full bg-ig-pink/30 blur-[100px] animate-float" />
        <div
          className="absolute -right-[8%] top-[5%] h-[38vw] w-[38vw] rounded-full bg-ig-purple/25 blur-[100px] animate-float"
          style={{ animationDelay: '-6s' }}
        />
        <div
          className="absolute bottom-[-15%] left-[25%] h-[42vw] w-[42vw] rounded-full bg-ig-blue/25 blur-[110px] animate-float"
          style={{ animationDelay: '-12s' }}
        />
      </div>

      <div className="relative z-10 flex min-h-screen flex-col">
        <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col items-center px-5 py-12 sm:px-8 sm:py-20">
          {!results ? (
            <>
              {/* Hero */}
              <div className="flex flex-col items-center text-center">
                <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm font-medium text-white/70 animate-fade-up">
                  <LockIcon className="h-4 w-4 text-ig-pink" />
                  Everything runs in your browser
                </span>
                <h1
                  className="font-display text-5xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl animate-fade-up"
                  style={{ animationDelay: '60ms' }}
                >
                  See who isn't
                  <br />
                  <span className="text-ig-gradient bg-[length:200%_200%] animate-gradient-x">
                    following you back
                  </span>
                </h1>
                <p
                  className="mt-5 max-w-xl text-lg text-white/55 animate-fade-up"
                  style={{ animationDelay: '120ms' }}
                >
                  Upload your Instagram data export and find out in seconds. No password,
                  nothing uploaded to any server.
                </p>
                <div
                  className="mt-6 flex flex-wrap justify-center gap-2.5 animate-fade-up"
                  style={{ animationDelay: '180ms' }}
                >
                  {FEATURES.map((f) => (
                    <span
                      key={f.label}
                      className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white/70"
                    >
                      <span>{f.emoji}</span>
                      {f.label}
                    </span>
                  ))}
                </div>
              </div>

              {/* Upload panel */}
              <div
                className="mt-12 w-full max-w-2xl rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl animate-fade-up sm:p-8"
                style={{ animationDelay: '240ms' }}
              >
                <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                  <h2 className="font-display text-lg font-bold tracking-tight">
                    Upload your export
                  </h2>
                  <button
                    onClick={() => setHelpOpen(true)}
                    className="rounded-full px-3 py-1.5 text-sm text-ig-pink transition hover:bg-ig-pink/10"
                  >
                    Where do I get these?
                  </button>
                </div>

                <Dropzone
                  label="Followers & following"
                  hint="followers_1.json, following.json…"
                  files={files}
                  onFiles={setFiles}
                  onReject={(name) =>
                    showToast(
                      name
                        ? `"${name}" isn't an Instagram export file — drop followers_1.json and following.json.`
                        : "Those don't look like Instagram export files — drop followers_1.json and following.json.",
                      'error'
                    )
                  }
                />

                {files.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2 text-sm">
                    <DetectChip
                      ok={followersFiles.length > 0}
                      label={
                        followersFiles.length
                          ? `${followersFiles.length} followers file${followersFiles.length === 1 ? '' : 's'}`
                          : 'No followers file'
                      }
                    />
                    <DetectChip
                      ok={!!followingFile}
                      label={followingFile ? 'following.json' : 'No following.json'}
                    />
                  </div>
                )}

                <button
                  onClick={handleReveal}
                  disabled={loading}
                  className="mt-6 w-full rounded-full bg-ig-gradient bg-[length:200%_200%] py-4 text-base font-semibold text-white shadow-lg shadow-ig-pink/30 transition-all hover:bg-[position:100%_50%] hover:shadow-xl hover:shadow-ig-pink/40 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? 'Crunching…' : 'Reveal results →'}
                </button>
              </div>
            </>
          ) : (
            <div className="w-full animate-fade-up">
              {/* Stats */}
              <div className="grid grid-cols-2 gap-4">
                <StatCard label="Following" value={total} dot="bg-white/40" />
                <StatCard label="Follow-back rate" value={`${rate}%`} dot="bg-ig-purple" />
              </div>

              {/* Lists */}
              <div className="mt-8 flex flex-col gap-6 lg:flex-row">
                <ResultsList
                  title="Not following back"
                  emoji="☹️"
                  accent="bg-ig-pink"
                  users={results.notFollowingBack}
                />
                <ResultsList
                  title="Mutually following"
                  emoji="🙂"
                  accent="bg-emerald-400"
                  users={results.mutuals}
                />
              </div>

              <div className="mt-8 flex justify-center">
                <button
                  onClick={reset}
                  className="rounded-full border border-white/10 bg-white/5 px-8 py-3 font-semibold text-white/80 transition hover:bg-white/10 hover:text-white"
                >
                  ← Check another account
                </button>
              </div>
            </div>
          )}
        </main>
      </div>

      <HelpModal open={helpOpen} onClose={() => setHelpOpen(false)} />
      <Toast toast={toast} onClose={() => setToast(null)} />
    </div>
  );
}

function DetectChip({ ok, label }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 font-medium ${
        ok
          ? 'border-emerald-400/30 bg-emerald-400/10 text-emerald-300'
          : 'border-amber-400/30 bg-amber-400/10 text-amber-300'
      }`}
    >
      {ok ? <CheckIcon className="h-3.5 w-3.5" /> : <XIcon className="h-3.5 w-3.5" />}
      {label}
    </span>
  );
}

function StatCard({ label, value, dot }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xl">
      <div className="flex items-center gap-2">
        <span className={`h-2 w-2 rounded-full ${dot}`} />
        <span className="text-sm text-white/50">{label}</span>
      </div>
      <p className="mt-2 font-display text-3xl font-extrabold tracking-tight tabular-nums">
        {value}
      </p>
    </div>
  );
}
