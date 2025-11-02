"use client";

import Link from "next/link";

export default function TestPage() {
  return (
    <div style={{ padding: "2rem", maxWidth: "800px", margin: "0 auto" }}>
      <h1 style={{ fontSize: "2rem", marginBottom: "1rem" }}>
        🧪 テストページ
      </h1>
      <p style={{ fontSize: "1.2rem", marginBottom: "2rem" }}>
        これはテストページです。ページ遷移が正常に動作しています！
      </p>

      <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
        <Link
          href="/"
          style={{
            padding: "0.75rem 1.5rem",
            backgroundColor: "#000",
            color: "#fff",
            borderRadius: "8px",
            textDecoration: "none",
            fontWeight: "500",
            transition: "background-color 0.2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#333")}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#000")}
        >
          ← ホームに戻る
        </Link>

        <Link
          href="/test/about"
          style={{
            padding: "0.75rem 1.5rem",
            backgroundColor: "#f0f0f0",
            color: "#000",
            borderRadius: "8px",
            textDecoration: "none",
            fontWeight: "500",
            transition: "background-color 0.2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#ddd")}
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = "#f0f0f0")
          }
        >
          詳細ページ →
        </Link>
      </div>

      <div
        style={{
          marginTop: "3rem",
          padding: "1.5rem",
          backgroundColor: "#f9f9f9",
          borderRadius: "8px",
        }}
      >
        <h2
          style={{ fontSize: "1.5rem", marginBottom: "1rem", color: "#0070f3" }}
        >
          📋 機能テスト
        </h2>
        <ul style={{ listStyle: "none", padding: 0 }}>
          <li style={{ padding: "0.5rem 0", color: "#0070f3" }}>
            ✅ ページ遷移
          </li>
          <li style={{ padding: "0.5rem 0", color: "#0070f3" }}>
            ✅ Next.js Link コンポーネント
          </li>
          <li style={{ padding: "0.5rem 0", color: "#0070f3" }}>
            ✅ インラインスタイル
          </li>
          <li style={{ padding: "0.5rem 0", color: "#0070f3" }}>
            ✅ ホットリロード
          </li>
        </ul>
      </div>
    </div>
  );
}
