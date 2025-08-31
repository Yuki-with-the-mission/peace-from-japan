//import { getSnapshotPreferToday } from "@/data/snapshots";
//import { Snapshot } from "@/data/types";

// 変更前
// import { getSnapshotPreferToday } from "@/data/snapshots";
// import { Snapshot } from "@/data/types";

// 変更後（相対パス）
import { getSnapshotPreferToday } from "../data/snapshots";
import type { Snapshot } from "../data/types";



export default async function Page() {
  const snapshot = await getSnapshotPreferToday(); // ← 今日が無ければ最新にフォールバック

  return (
    <main className="space-y-10">
      <section>
        <h2 className="text-xl font-semibold mb-4">今日のスナップショット</h2>

        {snapshot ? (
          <SnapshotCard snapshot={snapshot} />
        ) : (
          <PreparingCard />
        )}
      </section>

      {/* 既存の「世界の反応 / 特集 / 編集方針」セクションはそのままでOK */}
    </main>
  );
}

/** 簡易カード（あなたの既存UIに置き換えてOK） */
function SnapshotCard({ snapshot }: { snapshot: Snapshot }) {
  return (
    <article className="rounded-2xl border p-5">
      <h3 className="text-lg font-bold">{snapshot.headline}</h3>
      <p className="text-sm text-gray-600 mt-1">{snapshot.lede}</p>

      <ul className="mt-4 space-y-2">
        {snapshot.keyFacts.map((k, i) => (
          <li key={i} className="text-sm">
            • {k.text}{" "}
            <a className="underline text-gray-700" href={k.source.url} target="_blank" rel="noreferrer">
              [{k.source.name}]
            </a>
          </li>
        ))}
      </ul>

      {snapshot.contextNotes?.length ? (
        <div className="mt-3 text-xs text-gray-500">
          {snapshot.contextNotes.map((c, i) => (
            <p key={i}>※ {c}</p>
          ))}
        </div>
      ) : null}
    </article>
  );
}

function PreparingCard() {
  return (
    <div className="rounded-2xl border p-5">
      <p className="text-sm text-gray-600">準備中です。最初のスナップショットJSONを <code>/data/snapshots/</code> に追加してください。</p>
    </div>
  );
}
