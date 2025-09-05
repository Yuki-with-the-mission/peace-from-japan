// app/layout.tsx
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
// 使っていればフォントも（任意）
import { Noto_Sans_JP } from "next/font/google";
const noto = Noto_Sans_JP({ subsets: ["latin"], weight: ["400", "700"], display: "swap" });

export const metadata = {
  title: "オリーブの枝",
  description: "FACTとOPINIONを分けて伝える最小ニュースアーカイブ",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      {/* フォント未使用なら className は "bg-gray-50 text-gray-900" だけでもOK */}
      <body className={`${noto.className} bg-gray-50 text-gray-900`}>
        <Header />
        <main className="mx-auto max-w-5xl px-4 py-8">{children}</main>
        <Footer />
        <Analytics /> {/* 使っていなければ削除可 */}
      </body>
    </html>
  );
}

function Header() {
  return (
    <header className="sticky top-0 z-50 border-b bg-white/70 backdrop-blur">
      <div className="mx-auto max-w-5xl px-4 py-3 flex items-center justify-between">
        <a href="/" className="flex items-center gap-2 font-semibold">
          <span className="text-xl">🌿 オリーブの枝</span>
        </a>
        <nav className="text-sm flex gap-5">
          <a href="/background" className="hover:underline">Background</a>
          <a href="/reactions" className="hover:underline">Reactions</a>
          <a href="/opinion" className="hover:underline">Opinion</a>
          <a href="/actions" className="hover:underline">Actions</a>
        </nav>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="mt-12 border-t">
      <div className="mx-auto max-w-5xl px-4 py-6 text-xs text-gray-500">
        © 2025 オリーブの枝 — 出典明記 / FACTとOPINIONのUI分離
      </div>
    </footer>
  );
}
