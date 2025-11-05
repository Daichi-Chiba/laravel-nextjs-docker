"use client";

import Link from "next/link";
import styles from "./page.module.css";
import { useAuth } from '@/contexts/AuthContext';

export default function Home() {
  const { isAuthenticated, user } = useAuth();

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.hero}>
          <h1 className={styles.title}>
            <span className={styles.techStack}>Tech Stack</span>
            <span className={styles.overflow}>Overflow</span>
          </h1>
          <p className={styles.subtitle}>
            技術者のためのQ&Aコミュニティ。質問、回答、学び、成長する。
          </p>

          {isAuthenticated ? (
            <div className={styles.welcomeSection}>
              <p className={styles.welcome}>
                ようこそ、<strong>{user?.name}</strong>さん！
              </p>
              <div className={styles.actionButtons}>
                <Link href="/questions" className={styles.primaryButton}>
                  質問を見る
                </Link>
                <Link href="/questions/create" className={styles.secondaryButton}>
                  質問を投稿
                </Link>
              </div>
            </div>
          ) : (
            <div className={styles.actionButtons}>
              <Link href="/login" className={styles.primaryButton}>
                ログイン
              </Link>
              <Link href="/register" className={styles.secondaryButton}>
                新規登録
              </Link>
            </div>
          )}
        </div>

        <div className={styles.features}>
          <div className={styles.feature}>
            <div className={styles.featureIcon}>💡</div>
            <h3>質問と回答</h3>
            <p>技術的な疑問を投稿し、コミュニティから回答を得ることができます。</p>
          </div>

          <div className={styles.feature}>
            <div className={styles.featureIcon}>🏆</div>
            <h3>ランクとバッジ</h3>
            <p>貢献度に応じてランクアップし、専門分野のバッジを獲得できます。</p>
          </div>

          <div className={styles.feature}>
            <div className={styles.featureIcon}>👥</div>
            <h3>フォロー機能</h3>
            <p>興味のある技術者をフォローして、最新の活動をチェックできます。</p>
          </div>

          <div className={styles.feature}>
            <div className={styles.featureIcon}>🔖</div>
            <h3>ブックマーク</h3>
            <p>気になる質問や回答を保存して、後で簡単にアクセスできます。</p>
          </div>
        </div>

        <div className={styles.stats}>
          <div className={styles.stat}>
            <div className={styles.statNumber}>1,000+</div>
            <div className={styles.statLabel}>質問</div>
          </div>
          <div className={styles.stat}>
            <div className={styles.statNumber}>500+</div>
            <div className={styles.statLabel}>ユーザー</div>
          </div>
          <div className={styles.stat}>
            <div className={styles.statNumber}>2,000+</div>
            <div className={styles.statLabel}>回答</div>
          </div>
        </div>
      </main>
    </div>
  );
}
