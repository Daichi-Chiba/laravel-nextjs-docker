import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Image
          className={styles.logo}
          src="/next.svg"
          alt="Next.js logo"
          width={100}
          height={20}
          priority
        />
        <div className={styles.intro}>
          <h1>✅ Next.js ホットリロード成功！</h1>
          <p>🎉 リアルタイムで変更が反映されています！ </p>

          <div
            style={{
              marginTop: "2rem",
              display: "flex",
              gap: "1rem",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            <Link
              href="/login"
              style={{
                padding: "0.75rem 1.5rem",
                backgroundColor: "#0070f3",
                color: "#fff",
                borderRadius: "8px",
                textDecoration: "none",
                fontWeight: "500",
                display: "inline-block",
                transition: "background-color 0.2s",
              }}
            >
              🔐 ログイン
            </Link>

            <Link
              href="/register"
              style={{
                padding: "0.75rem 1.5rem",
                backgroundColor: "#fff",
                color: "#0070f3",
                border: "2px solid #0070f3",
                borderRadius: "8px",
                textDecoration: "none",
                fontWeight: "500",
                display: "inline-block",
                transition: "background-color 0.2s",
              }}
            >
              👤 会員登録
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
