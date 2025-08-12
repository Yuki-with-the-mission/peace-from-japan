import './globals.css';
import Link from 'next/link';

export const metadata = {
  metadataBase: new URL('https://example.com'), // 後で独自ドメインに差し替え
  title: '事実と声：ガザとウクライナ',
  description: '日本語で、背景・事実・市民視点の3軸で整理するアーカイブ＋意見サイト',
  alternates: { canonical: '/' }
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
