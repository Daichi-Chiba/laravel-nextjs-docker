"use client";

import Link from "next/link";

export default function AboutPage() {
  return (
    <div style={{ padding: "2rem", maxWidth: "800px", margin: "0 auto" }}>
      <h1 style={{ fontSize: "2rem", marginBottom: "1rem" }}>📖 詳細ページ</h1>

      <div
        style={{ fontSize: "1.1rem", lineHeight: "1.8", marginBottom: "2rem" }}
      >
        <p>
          これはネストされたルートのテストページです。 Next.jsのApp
          Routerでは、ディレクトリ構造がそのままルートとなります。
        </p>

        <div
          style={{
            marginTop: "2rem",
            padding: "1.5rem",
            backgroundColor: "#e8f4f8",
            borderRadius: "8px",
            border: "1px solid #0070f3",
          }}
        >
          <h2
            style={{
              fontSize: "1.3rem",
              marginBottom: "1rem",
              color: "#0070f3",
            }}
          >
            📂 ディレクトリ構造
          </h2>
          <pre
            style={{
              backgroundColor: "#fff",
              padding: "1rem",
              borderRadius: "4px",
              overflow: "auto",
              fontSize: "0.9rem",
            }}
          ></pre>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          gap: "1rem",
          flexWrap: "wrap",
          marginTop: "2rem",
        }}
      >
        <Link
          href="/"
          style={{
            padding: "0.75rem 1.5rem",
            backgroundColor: "#0070f3",
            color: "#fff",
            borderRadius: "8px",
            textDecoration: "none",
            fontWeight: "500",
            transition: "all 0.2s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#0051cc";
            e.currentTarget.style.transform = "translateY(-2px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "#0070f3";
            e.currentTarget.style.transform = "translateY(0)";
          }}
        >
          🏠 ホーム
        </Link>

        <Link
          href="/test"
          style={{
            padding: "0.75rem 1.5rem",
            backgroundColor: "#f0f0f0",
            color: "#000",
            borderRadius: "8px",
            textDecoration: "none",
            fontWeight: "500",
            transition: "all 0.2s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#ddd";
            e.currentTarget.style.transform = "translateY(-2px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "#f0f0f0";
            e.currentTarget.style.transform = "translateY(0)";
          }}
        >
          ← テストページへ戻る
        </Link>
      </div>
    </div>
  );
}
