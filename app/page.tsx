import Link from 'next/link';
import { SectionCard } from '@/components/section-card';
import { FactBadge, OpinionBadge } from '@/components/badges';

export default function Page() {
  return (
    <div className="space-y-8">
      <div className="card">
        <h1 className="h1 mb-2">今日のスナップショット</h1>
        <p className="muted">更新: 2025-08-11（例） / 出典: BBC, Reuters ほか</p>
        <ul className="list-disc pl-6 mt-3 space-y-1 text-sm">
          <li><span className="badge-fact">FACT</span> ガザ・アル・シファ病院付近で報道用テントが攻撃され記者4名死亡（2025-08-10）。</li>
          <li><span className="badge-fact">FACT</span> IDFは標的が武装組織指導者だったと主張、独立検証は未了。</li>
          <li><span className="badge-opinion">OPINION</span> 記者標的化は国際人道法の原則に反し、情報隠蔽リスクが高い。</li>
        </ul>
      </div>

      <SectionCard title="世界の反応（地域 × 時系列の概観）" subtitle="ソースと日付を各項目に明記">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="card">
            <h3 className="h2 mb-2">欧米</h3>
            <p className="text-sm">報道自由・人道法の観点で非難声明が継続。安保理では合意難航（米の拒否権等）。</p>
          </div>
          <div className="card">
            <h3 className="h2 mb-2">中東/グローバルサウス</h3>
            <p className="text-sm">即時停戦要求とICC活用の声。</p>
          </div>
        </div>
        <div className="mt-3 text-sm text-gray-600">※ 実データの表・簡易グラフは今後 /data から描画予定</div>
      </SectionCard>

      <SectionCard title="特集：なぜ即時停戦が進まないのか" subtitle="安全保障・国内政治・交渉設計の3要因">
        <p className="text-sm leading-7">政府は安全保障・同盟関係・国内政治の制約を優先し、<em>市民の即時停戦ニーズ</em>と乖離しやすい。捕虜交換や武装解除条件などの設計がボトルネック。</p>
        <Link href="/background" className="text-blue-600 underline text-sm mt-2 inline-block">背景を読む →</Link>
      </SectionCard>

      <SectionCard title="編集方針"><p className="text-sm">事実と意見をUIで分離し、すべてのファクトに出典URLと日付を付します。</p></SectionCard>
    </div>
  );
}
