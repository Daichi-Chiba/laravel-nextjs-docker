"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios'; // axiosをインポート

// ユーザー情報の型定義
interface User {
  id: number;
  name: string;
  email: string;
  // 必要に応じて他のユーザープロパティを追加
}

// AuthContextが提供する値の型定義
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (token: string, userData: User) => void;
  logout: () => void;
  checkAuth: () => Promise<void>;
}

// AuthContextの作成
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// AuthProviderコンポーネント
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // 認証状態をチェックする関数
  const checkAuth = useCallback(async () => {
    setIsLoading(true);
    const token = localStorage.getItem('access_token');
    if (token) {
      try {
        // バックエンドの/api/meエンドポイントを叩いてユーザー情報を取得
        const response = await axios.get<User>('http://localhost:8000/api/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(response.data);
        // localStorageに保存されているユーザー情報も更新
        localStorage.setItem('user', JSON.stringify(response.data));
      } catch (error) {
        console.error('認証チェック失敗:', error);
        // トークンが無効な場合はログアウト処理
        logout();
      }
    } else {
      setUser(null);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // ログイン処理
  const login = (token: string, userData: User) => {
    localStorage.setItem('access_token', token);
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
    // axiosのデフォルトヘッダーにトークンを設定
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  };

  // ログアウト処理
  const logout = async () => {
    const token = localStorage.getItem('access_token');
    if (token) {
      try {
        await axios.post('http://localhost:8000/api/logout', null, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } catch (error) {
        console.error('ログアウトAPI呼び出し失敗:', error);
      } finally {
        localStorage.removeItem('access_token');
        localStorage.removeItem('user');
        setUser(null);
        delete axios.defaults.headers.common['Authorization'];
        router.push('/login'); // ログアウト後はログインページへリダイレクト
      }
    }
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, isLoading, login, logout, checkAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

// AuthContextを使用するためのカスタムフック
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
