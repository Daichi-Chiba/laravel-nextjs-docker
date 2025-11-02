"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Card, CardContent, CardHeader } from '@/components/Card/Card';
import { Input } from '@/components/Input/Input';
import { Button } from '@/components/Button/Button';
import styles from './page.module.css';

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== passwordConfirmation) {
      setError("パスワードが一致しません");
      return;
    }

    if (password.length < 8) {
      setError("パスワードは8文字以上で入力してください");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://localhost:8000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
          password_confirmation: passwordConfirmation,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "登録に失敗しました");
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

  return (
    <div className={styles.registerPage}>
      <Card className={styles.registerPage__card}>
        <CardHeader>
          <h1 className={styles.registerPage__title}>👤 会員登録</h1>
        </CardHeader>
        <CardContent>
          {error && (
            <div className={styles.registerPage__error}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className={styles.registerPage__formGroup}>
              <label htmlFor="name" className={styles.registerPage__label}>
                お名前
              </label>
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className={styles.registerPage__input}
              />
            </div>

            <div className={styles.registerPage__formGroup}>
              <label htmlFor="email" className={styles.registerPage__label}>
                メールアドレス
              </label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className={styles.registerPage__input}
              />
            </div>

            <div className={styles.registerPage__formGroup}>
              <label htmlFor="password" className={styles.registerPage__label}>
                パスワード
              </label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className={styles.registerPage__input}
              />
            </div>

            <div className={styles.registerPage__formGroup}>
              <label htmlFor="passwordConfirmation" className={styles.registerPage__label}>
                パスワード確認
              </label>
              <Input
                id="passwordConfirmation"
                type="password"
                value={passwordConfirmation}
                onChange={(e) => setPasswordConfirmation(e.target.value)}
                required
                className={styles.registerPage__input}
              />
            </div>

            <Button type="submit" variant="primary" disabled={loading} className={styles.registerPage__button}>
              {loading ? "登録中..." : "会員登録"}
            </Button>
          </form>

          <p className={styles.registerPage__loginLink}>
            すでにアカウントをお持ちの方は
            <Link href="/login">
              ログイン
            </Link>
          </p>

          <Link href="/" className={styles.registerPage__homeLink}>
            ← ホームに戻る
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
