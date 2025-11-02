"use client";

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

export default function GithubCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useAuth();

  useEffect(() => {
    const accessToken = searchParams.get('access_token');
    const userJson = searchParams.get('user');

    if (accessToken && userJson) {
      try {
        const user = JSON.parse(userJson);
        login(accessToken, user);
        router.push('/'); // ログイン成功後、ホームページへリダイレクト
      } catch (error) {
        console.error('Failed to parse user data from GitHub callback', error);
        router.push('/login?error=github_login_failed'); // エラー時はログインページへ
      }
    } else {
      router.push('/login?error=github_login_failed'); // トークンがない場合もログインページへ
    }
  }, [searchParams, login, router]);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      <p>GitHub認証中...</p>
    </div>
  );
}
