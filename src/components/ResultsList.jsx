import { useMemo, useState } from 'react';
import { ExternalLinkIcon, SearchIcon } from './Icons';

export default function ResultsList({ title, emoji, accent, users }) {
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return q ? users.filter((u) => u.toLowerCase().includes(q)) : users;
  }, [query, users]);

  return (
    <div className="flex w-full flex-1 flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl">
      <div className="flex items-center justify-between gap-3 border-b border-white/10 p-5">
        <div className="flex items-center gap-2.5">
          <span className={`h-2.5 w-2.5 rounded-full ${accent}`} />
          <h3 className="font-display font-semibold tracking-tight">
            {title} {emoji}
          </h3>
        </div>
        <span className="rounded-full bg-white/10 px-2.5 py-0.5 text-sm font-bold tabular-nums">
          {users.length}
        </span>
      </div>

      {users.length > 5 && (
        <div className="border-b border-white/10 px-4 py-3">
          <div className="flex items-center gap-2 rounded-xl bg-white/5 px-3 py-2">
            <SearchIcon className="h-4 w-4 text-white/40" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search accounts…"
              className="w-full bg-transparent text-sm text-white placeholder-white/35 outline-none"
            />
          </div>
        </div>
      )}

      {users.length === 0 ? (
        <div className="flex flex-1 items-center justify-center p-10 text-center text-white/45">
          Nothing to show here 🎉
        </div>
      ) : (
        <ul className="max-h-[44vh] divide-y divide-white/5 overflow-y-auto">
          {filtered.map((user, i) => (
            <li key={user}>
              <a
                href={`https://www.instagram.com/${user}`}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center gap-3 px-5 py-3 transition hover:bg-white/[0.06]"
              >
                <span className="w-6 text-sm tabular-nums text-white/35">{i + 1}</span>
                <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-ig-gradient text-xs font-bold uppercase text-white">
                  {user.charAt(0)}
                </span>
                <span className="flex-1 truncate font-medium text-white/90">{user}</span>
                <ExternalLinkIcon className="h-4 w-4 text-white/30 transition group-hover:text-ig-pink" />
              </a>
            </li>
          ))}
          {filtered.length === 0 && (
            <li className="px-5 py-8 text-center text-sm text-white/40">No matches.</li>
          )}
        </ul>
      )}
    </div>
  );
}
