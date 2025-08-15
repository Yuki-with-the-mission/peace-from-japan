// app/page.tsx
import Link from "next/link";
import { SectionCard } from "@/components/section-card";
import { FactBadge, OpinionBadge } from "@/components/badges";
import { homeData } from "@/data/home";
import type { SnapshotItem } from "@/data/types";

function Badge({ kind }: { kind: SnapshotItem["kind"] }) {
  return kind === "fact" ? <FactBadge /> : <OpinionBadge />;
}

export default function Page() {
  const formattedDate =
    homeData.snapshotUpdated || new Date().toISOString().split("T")[0];

  return (
    <div className="space-y-8">
      <div className="card">
        <h1 className="h1 mb-2">今日のスナップショット</h1>
        <p className="muted">
          更新: {formattedDate}
          {homeData.snapshot.some((s) => s.source) && " / 出典: 各項目参照"}
        </p>

        <ul className="list-disc pl-6 mt-3 space-y-1 text-sm">
          {homeData.snapshot.map((item, i) => (
            <li key={i} className="flex gap-2 items-start">
              <Badge kind={item.kind} />
              <span>
                {item.text}{" "}
                {item.source && (
                  <span className="text-gray-500">
                    （出典:{" "}
                    {item.url ? (
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noreferrer"
                        className="underline"
                      >
                        {item.source}
                      </a>
                    ) : (
                      item.source
                    )}
                    {item.date ? ` / ${item.date}` : ""}）
                  </span>
                )}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <SectionCard
        title="世界の反応（地域 × 時系列の概観）"
        subtitle="ソースと日付を各項目に明記"
      >
        <div className="grid md:grid-cols-2 gap-4">
          {homeData.reactions.map((r, i) => (
            <div className="card" key={i}>
              <h3 className="h2 mb-2">{r.region}</h3>
              <p className="text-sm">{r.text}</p>
            </div>
          ))}
        </div>
        <div className="mt-3 text-sm text-gray-600">
          ※ 実データの表・簡易グラフは今後 /data から描画予定
        </div>
      </SectionCard>

      <SectionCard title="特集：なぜ即時停戦が進まないのか" subtitle="安全保障・国内政治・交渉設計の3要因">
        <p className="text-sm leading-7">
          政府は安全保障・同盟関係・国内政治の制約を優先し、
          <em>市民の即時停戦ニーズ</em>
          と乖離しやすい。捕虜交換や武装解除条件などの設計がボトルネック。
        </p>
        <Link
          href="/background"
          className="text-blue-600 underline text-sm mt-2 inline-block"
        >
          背景を読む →
        </Link>
      </SectionCard>

      <SectionCard title="編集方針">
        <p className="text-sm">
          事実と意見をUIで分離し、すべてのファクトに出典URLと日付を付します。
        </p>
      </SectionCard>
    </div>
  );
}
