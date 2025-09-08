// app/page.tsx
export const runtime = "nodejs"; // fs を使うため Node ランタイムで実行

import { getSnapshotPreferToday } from "../data/snapshots";
import SnapshotCardClient from "../components/SnapshotCardClient";

export default async function Page() {
  // 今日が無ければ最新にフォールバック
  const snapshot = await getSnapshotPreferToday();

  return (
    <main className="space-y-10">
      <Section title="今日のスナップショット">
        {snapshot ? <SnapshotCardClient snapshot={snapshot} /> : <PreparingCard />}
      </Section>

      {/* 既存の「世界の反応 / 特集 / 編集方針」などは、同じ Section で包んで足してOK */}
      {/* <Section title="世界の反応（ダイジェスト）">…</Section> */}
    </main>
  );
}

/** 見出し＋白カード枠の小さいラッパー */
function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-10">
      <h2 className="text-lg font-semibold mb-3">{title}</h2>
      <div className="rounded-2xl border bg-white p-5 shadow-sm">{children}</div>
    </section>
  );
}

/** データ未投入時の表示 */
function PreparingCard() {
  return (
    <div className="rounded-2xl border bg-white p-5 shadow-sm">
      <p className="text-sm text-gray-600">
        準備中です。最初のスナップショットJSONを <code>/data/snapshots/</code> に追加してください。
      </p>
    </div>
  );
}
