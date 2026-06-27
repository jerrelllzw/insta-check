import { useState } from 'react';
import Dropzone from './components/Dropzone';
import HelpModal from './components/HelpModal';
import ResultsList from './components/ResultsList';
import Toast from './components/Toast';
import { LockIcon } from './components/Icons';
import { compareFollows, FOLLOWERS_FILENAME, FOLLOWING_FILENAME } from './lib/instagram';

const FEATURES = [
  { emoji: '🔒', label: 'No login' },
  { emoji: '⚡', label: 'Instant' },
  { emoji: '🕵️', label: '100% private' },
];

export default function App() {
  const [followersFile, setFollowersFile] = useState(null);
  const [followingFile, setFollowingFile] = useState(null);
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => setToast({ message, type });

  const handleReveal = async () => {
    if (!followersFile) return showToast(`Please upload ${FOLLOWERS_FILENAME}`, 'error');
    if (!followingFile) return showToast(`Please upload ${FOLLOWING_FILENAME}`, 'error');

    setLoading(true);
    try {
      const data = await compareFollows(followersFile, followingFile);
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
    setFollowersFile(null);
    setFollowingFile(null);
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
        {/* Main */}
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
                  <div>
                    <h2 className="font-display text-lg font-bold tracking-tight">
                      Upload your two files
                    </h2>
                    <p className="text-sm text-white/45">From the “Followers and following” export</p>
                  </div>
                  <button
                    onClick={() => setHelpOpen(true)}
                    className="rounded-full px-3 py-1.5 text-sm text-ig-pink transition hover:bg-ig-pink/10"
                  >
                    Where do I get these?
                  </button>
                </div>

                <div className="flex flex-col gap-4 sm:flex-row">
                  <Dropzone
                    step={1}
                    label="Followers"
                    expectedName={FOLLOWERS_FILENAME}
                    file={followersFile}
                    onFile={setFollowersFile}
                  />
                  <Dropzone
                    step={2}
                    label="Following"
                    expectedName={FOLLOWING_FILENAME}
                    file={followingFile}
                    onFile={setFollowingFile}
                  />
                </div>

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
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                <StatCard label="Following" value={total} dot="bg-white/40" />
                <StatCard label="Mutuals" value={results.mutuals.length} dot="bg-emerald-400" />
                <StatCard
                  label="Not following back"
                  value={results.notFollowingBack.length}
                  dot="bg-ig-pink"
                />
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

        {/* Footer */}
      </div>

      <HelpModal open={helpOpen} onClose={() => setHelpOpen(false)} />
      <Toast toast={toast} onClose={() => setToast(null)} />
    </div>
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
