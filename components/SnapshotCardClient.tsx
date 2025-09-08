// components/SnapshotCardClient.tsx
'use client';

import { track } from '@vercel/analytics';
import type { Snapshot } from '../data/types';

export default function SnapshotCardClient({ snapshot }: { snapshot: Snapshot }) {
  return (
    <article id="snapshot">
      <div className="flex items-center gap-3 text-xs text-gray-500">
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full border bg-gray-50">
          更新 {snapshot.dateISO}
        </span>
      </div>

      <h3 className="mt-2 text-xl font-bold">{snapshot.headline}</h3>
      <p className="mt-1 text-gray-600">{snapshot.lede}</p>

      <ul className="mt-4 space-y-2">
        {snapshot.keyFacts.map((k, i) => (
          <li key={i} className="text-sm leading-6">
            • {k.text}{' '}
            <a
              className="underline text-gray-700"
              href={k.source.url}
              target="_blank"
              rel="noreferrer"
              onClick={() =>
                track('source_click', { source: k.source.name, date: snapshot.dateISO })
              }
            >
              [{k.source.name}]
            </a>
          </li>
        ))}
      </ul>

      {snapshot.contextNotes?.length ? (
        <div className="mt-4 space-y-1 text-xs text-gray-500">
          {snapshot.contextNotes.map((c, i) => (
            <p key={i}>※ {c}</p>
          ))}
        </div>
      ) : null}
    </article>
  );
}
