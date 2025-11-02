"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Card, CardContent, CardHeader } from '@/components/Card/Card';
import { Input } from '@/components/Input/Input';
import { Button } from '@/components/Button/Button';
import styles from './page.module.css';

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:8000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "ログインができませんでした");
      }

      // トークンをローカルストレージに保存
      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("user", JSON.stringify(data.user));

      // ホームページにリダイレクト
      router.push("/");
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "不明なエラーが発生しました";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleGithubLogin = () => {
    window.location.href = "http://localhost:8000/api/auth/github/redirect";
  };

  return (
    <div className={styles.loginPage}>
      <Card className={styles.loginPage__card}>
        <CardHeader>
          <h1 className={styles.loginPage__title}>🔐 ログイン</h1>
        </CardHeader>
        <CardContent>
          {error && (
            <div className={styles.loginPage__error}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className={styles.loginPage__formGroup}>
              <label htmlFor="email" className={styles.loginPage__label}>
                メールアドレス
              </label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className={styles.loginPage__input}
              />
            </div>

            <div className={styles.loginPage__formGroup}>
              <label htmlFor="password" className={styles.loginPage__label}>
                パスワード
              </label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className={styles.loginPage__input}
              />
            </div>

            <Button type="submit" variant="primary" disabled={loading} className={styles.loginPage__button}>
              {loading ? "ログイン中..." : "ログイン"}
            </Button>
          </form>

          <div className={styles.loginPage__divider}>または</div>

          <Button variant="secondary" onClick={handleGithubLogin} className={styles.loginPage__githubButton}>
            GitHubでログイン
          </Button>

          <p className={styles.loginPage__registerLink}>
            アカウントをお持ちでない方は
            <Link href="/register">
              会員登録
            </Link>
          </p>

          <Link href="/" className={styles.loginPage__homeLink}>
            ← ホームに戻る
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
