"use client";

import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/Button/Button';

export default function Home() {
  const { isAuthenticated, user, logout } = useAuth();

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
          {isAuthenticated ? (
            <div className={styles.loggedInContent}>
              <h1>ようこそ、{user?.name}さん！</h1>
              <p>質問をしたり、他の人の質問に答えたりしましょう。</p>
              <div className={styles.actionButtons}>
                <Link href="/questions/create" passHref>
                  <Button variant="primary">質問を投稿する</Button>
                </Link>
                <Button variant="secondary" onClick={logout}>ログアウト</Button>
              </div>
            </div>
          ) : (
            <div className={styles.loggedOutContent}>
              <h1>✅ Next.js ホットリロード成功！</h1>
              <p>🎉 リアルタイムで変更が反映されています！ </p>

              <div className={styles.actionButtons}>
                <Link href="/login" passHref>
                  <Button variant="primary">🔐 ログイン</Button>
                </Link>

                <Link href="/register" passHref>
                  <Button variant="secondary">👤 会員登録</Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
