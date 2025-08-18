/** @type {import('next').NextConfig} */
const nextConfig = {
  // 画像を外部ドメインから読み込む場合は↓を編集（不要なら消してOK）
  images: {
    // 例:
    // domains: ["images.unsplash.com", "example.com"],
  },

  // 便利ヘッダ（CSPは入れていません。後で入れるなら一緒に考えましょう）
  async headers() {
    return [
      {
        // すべてのルート
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
      {
        // 静的アセットを長めにキャッシュ（変更時はハッシュが付くので安全）
        source: "/_next/static/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
    ];
  },
};

export default nextConfig;
