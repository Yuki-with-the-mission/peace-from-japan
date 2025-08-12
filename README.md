# Gaza & Ukraine — Facts & Voices (JP)

静的アーカイブ＋意見欄を同居させた Next.js スターターです。Tailwind で最小限のデザイン、ソース明記・日付明記、事実(FACT)と意見(OPINION)のUI分離を実装しています。

## すぐ試す
```bash
# 1) 依存を入れる
npm i

# 2) 開発サーバ
npm run dev
# → http://localhost:3000

# 3) GitHub に push → Vercel で Import して Deploy
```
## デプロイ（Vercel）
1. GitHub に新規リポジトリを作成し、このプロジェクトを push。
2. https://vercel.com で「Add New… → Project」→ GitHub リポジトリを選択。
3. Build 設定はデフォルトのまま（Framework: Next.js）。
4. デプロイ完了すると `https://<project>.vercel.app` が発行されます。
5. 独自ドメインは Project → Settings → Domains で追加（CNAME/ALIAS 設定）。

## 情報設計
- **Top**: 今日の動き（更新日付つき）、世界の反応（地域×時系列）、特集リンク
- **Background**: 紛争の歴史・当事者・国際法の要点
- **Reactions**: 地域別の反応（EU/US/RU/CN/ME/Asia）
- **Opinion**: 制作者の立場（意見は別 UI）
- **Actions**: 寄付・署名・イベント等の導線

## 出典方針
- すべてのファクトに出典URLと日付(YYYY-MM-DD)を付与
- 意見と事実を UI で明確に分離（色/ラベル/セクション）

## 依存
- Next.js(App Router)
- Tailwind CSS
