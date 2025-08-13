# README.md

## Gaza & Ukraine — Facts & Voices (JP)

静的アーカイブ＋意見欄を同居させた Next.js スターターです。Tailwind で最小限のデザイン、ソース明記・日付明記、事実(FACT)と意見(OPINION)のUI分離を実装しています。

### すぐ試す
```bash
# 1) 依存を入れる
npm i

# 2) 開発サーバ
npm run dev
# → http://localhost:3000

# 3) GitHub に push → Vercel で Import して Deploy
```

### デプロイ手順（Vercel）
1. GitHub に新規リポジトリを作成し、このプロジェクトを push。
2. https://vercel.com で「Add New… → Project」→ GitHub リポジトリを選択。
3. Build 設定はデフォルトのまま（Framework: Next.js）。
4. デプロイ完了すると `https://<project>.vercel.app` が発行されます。
5. 独自ドメインは Vercel の Project → Settings → Domains から追加（CNAME/ALIAS 設定）。

---

## 情報設計
- **Top**: 今日の動き（更新日付つき）、世界の反応（地域×時系列）、特集リンク
- **Background**: 紛争の歴史・当事者・国際法の要点
- **Reactions**: 地域別の反応（EU/US/RU/CN/ME/Asia）
- **Opinion**: 制作者の立場（意見は別 UI）
- **Actions**: 寄付・署名・イベント等の導線

---

## 出典方針
- すべてのファクトに出典URLと日付(YYYY-MM-DD)を付与
- 意見と事実を UI で明確に分離（色/ラベル/セクション）

---

## 依存
- Next.js(App Router)
- Tailwind CSS

---

# package.json
```json
{
  "name": "facts-voices-jp",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "next": "14.2.5",
    "react": "18.2.0",
    "react-dom": "18.2.0"
  },
  "devDependencies": {
    "autoprefixer": "10.4.19",
    "postcss": "8.4.38",
    "tailwindcss": "3.4.6",
    "typescript": "5.5.4",
    "@types/react": "18.2.74",
    "@types/node": "20.12.12"
  }
}
```

---

# next.config.mjs
```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true
};
export default nextConfig;
```

---

# tsconfig.json
```json
{
  "compilerOptions": {
    "target": "es2020",
    "lib": ["dom", "dom.iterable", "es2020"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "baseUrl": ".",
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", "**/*.cjs", "**/*.mjs"],
  "exclude": ["node_modules"]
}
```

---

# postcss.config.js
```js
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

---

# tailwind.config.ts
```ts
import type { Config } from 'tailwindcss';

export default {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        fact: '#0ea5e9',
        opinion: '#f97316'
      }
    }
  },
  plugins: []
} satisfies Config;
```

---

# next-env.d.ts
```ts
/// <reference types="next" />
/// <reference types="next/image-types/global" />

// NOTE: This file should not be edited
// see https://nextjs.org/docs/basic-features/typescript for more information.
```

---

# app/globals.css
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root { color-scheme: light; }

body { @apply bg-white text-gray-900; }

.container { @apply max-w-5xl mx-auto px-4; }

.badge-fact { @apply inline-flex items-center gap-2 rounded-full bg-fact/10 text-fact px-3 py-1 text-xs font-semibold; }
.badge-opinion { @apply inline-flex items-center gap-2 rounded-full bg-opinion/10 text-opinion px-3 py-1 text-xs font-semibold; }
.card { @apply rounded-2xl border border-gray-200 shadow-sm p-5 bg-white; }
.h1 { @apply text-2xl md:text-3xl font-bold; }
.h2 { @apply text-xl md:text-2xl font-semibold; }
.muted { @apply text-sm text-gray-500; }
```

---

# app/layout.tsx
```tsx
import './globals.css';
import Link from 'next/link';

export const metadata = {
  title: '事実と声：ガザとウクライナ',
  description: '日本語で、背景・事実・市民視点の3軸で整理するアーカイブ＋意見サイト',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body>
        <header className="border-b bg-white/70 backdrop-blur sticky top-0 z-10">
          <div className="container flex items-center justify-between py-3">
            <Link href="/" className="font-bold">事実と声</Link>
            <nav className="flex gap-4 text-sm">
              <Link href="/background" className="hover:underline">背景</Link>
              <Link href="/reactions" className="hover:underline">世界の反応</Link>
              <Link href="/opinion" className="hover:underline">意見</Link>
              <Link href="/actions" className="hover:underline">できること</Link>
            </nav>
          </div>
        </header>
        <main className="container py-8">{children}</main>
        <footer className="border-t mt-8">
          <div className="container py-6 text-sm text-gray-500">
            © {new Date().getFullYear()} Facts & Voices JP — 出典・日付明記 / 事実と意見の分離
          </div>
        </footer>
      </body>
    </html>
  );
}
```

---

# app/page.tsx
```tsx
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
            <p className="text-sm">即時停戦要求と抗議拡大。国際刑事裁判所(ICC)活用の声。</p>
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
```

---

# app/background/page.tsx
```tsx
import { FactBadge } from '@/components/badges';

export default function BackgroundPage() {
  return (
    <article className="prose max-w-none">
      <h1>背景・基礎知識</h1>
      <p className="text-sm">最終更新: 2025-08-11</p>

      <h2>ガザ紛争・ウクライナ戦争の要約</h2>
      <ul>
        <li><span className="badge-fact">FACT</span> ジャーナリストは国際人道法上、民間人として保護対象（ジュネーブ諸条約）。</li>
        <li><span className="badge-fact">FACT</span> 停戦交渉は捕虜交換・武装解除・撤退条件等で難航しがち。</li>
      </ul>

      <h3>用語集</h3>
      <ul>
        <li>比例原則（Proportionality）</li>
        <li>区別原則（Distinction）</li>
      </ul>
    </article>
  );
}
```

---

# app/reactions/page.tsx
```tsx
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
```

---

# app/opinion/page.tsx
```tsx
import { OpinionBadge } from '@/components/badges';

export default function OpinionPage() {
  return (
    <article className="prose max-w-none">
      <h1>意見（編集部コラム）</h1>
      <p className="text-sm">最終更新: 2025-08-11</p>

      <p><span className="badge-opinion">OPINION</span> 記者標的化は報道の自由への深刻な攻撃であり、独立検証が必要。即時停戦とジャーナリスト保護が優先課題。</p>

      <h2>提言</h2>
      <ol>
        <li>事実と意見の分離・出典明記の徹底</li>
        <li>停戦交渉の設計を可視化（条件・ボトルネック）</li>
        <li>寄付・署名など行動導線の整備</li>
      </ol>
    </article>
  );
}
```

---

# app/actions/page.tsx
```tsx
export default function ActionsPage() {
  return (
    <div className="space-y-4">
      <h1 className="h1">できること</h1>
      <ul className="list-disc pl-6 text-sm">
        <li>信頼できる報道やNGOへの寄付（リンクは順次追加）</li>
        <li>停戦支持の署名活動やイベント情報の共有</li>
        <li>SNSでの情報共有（出典・日付を付ける）</li>
      </ul>
    </div>
  );
}
```

---

# components/badges.tsx
```tsx
export function FactBadge() {
  return <span className="badge-fact">FACT</span>;
}
export function OpinionBadge() {
  return <span className="badge-opinion">OPINION</span>;
}
```

---

# components/section-card.tsx
```tsx
export function SectionCard({ title, subtitle, children }: { title: string; subtitle?: string; children?: React.ReactNode }) {
  return (
    <section className="card">
      <header className="mb-3">
        <h2 className="h2">{title}</h2>
        {subtitle && <p className="muted">{subtitle}</p>}
      </header>
      {children}
    </section>
  );
}
```

---

# data/README.md
```md
このディレクトリに、地域別の反応や時系列（CSV/JSON）を保存します。
- 例: reactions_eu_2025.csv, trends_jp_google.json
- ページ側で静的 import / fs 読み込みを使って描画予定
