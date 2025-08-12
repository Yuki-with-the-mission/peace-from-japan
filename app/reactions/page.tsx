export default function ReactionsPage() {
  return (
    <div className="space-y-6">
      <h1 className="h1">世界の反応（地域別）</h1>
      <p className="muted">最終更新: 2025-08-11 / 出典付きタイムラインを順次追加</p>

      <div className="grid md:grid-cols-2 gap-4">
        {[
          { region: '欧州', notes: '報道の自由・人道法の観点から非難。停戦支持。' },
          { region: '米国', notes: '同盟と安全保障の制約。条件付きの人道休戦支持が中心。' },
          { region: 'ロシア', notes: '外交的にイスラエル批判を強める場面あり。' },
          { region: '中国', notes: '停戦と二国家解決を強調。' },
          { region: '中東', notes: '即時停戦とICC活用の声が強い。' },
          { region: 'アジア', notes: '国内問題優先で報道量は限定的だが市民の停戦支持は広がる。' },
        ].map((r) => (
          <div key={r.region} className="card">
            <h3 className="h2">{r.region}</h3>
            <p className="text-sm">{r.notes}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
