"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Card, CardContent, CardHeader } from '@/components/Card/Card';
import { Input } from '@/components/Input/Input';
import { Button } from '@/components/Button/Button';
import styles from './page.module.css';
import api from '@/lib/axios'; // apiをインポート
import { useAuth } from '@/contexts/AuthContext'; // useAuthをインポート

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { login } = useAuth(); // login関数を取得

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await api.post("/login", { email, password });

      // 認証状態を更新
      login(response.data.access_token, response.data.user);

      // ホームページにリダイレクト
      router.push("/");
    } catch (err: any) {
      setError(err.response?.data?.message || "不明なエラーが発生しました");
    } finally {
      setLoading(false);
    }
  };

  const handleGithubLogin = async () => {
    try {
      const response = await api.get("/auth/github/redirect");
      window.location.href = response.data.redirect_url;
    } catch (err: any) {
      setError(err.response?.data?.message || "GitHubログインに失敗しました");
    }
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
