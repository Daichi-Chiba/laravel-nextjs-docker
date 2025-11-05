'use client';

import { useState } from 'react';
import Link from 'next/link';
import styles from './Header.module.css';
import { useAuth } from '@/contexts/AuthContext';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <Link href="/" className={styles.logo} onClick={closeMenu}>
          Tech Stack Overflow
        </Link>

        {/* ハンバーガーメニューボタン */}
        <button 
          className={styles.hamburger}
          onClick={toggleMenu}
          aria-label="メニュー"
        >
          <span className={isMenuOpen ? styles.hamburgerOpen : ''}></span>
          <span className={isMenuOpen ? styles.hamburgerOpen : ''}></span>
          <span className={isMenuOpen ? styles.hamburgerOpen : ''}></span>
        </button>

        {/* ユーザー情報（常時表示） */}
        {isAuthenticated && (
          <div className={styles.userInfo}>
            <span className={styles.userName}>{user?.name}</span>
          </div>
        )}

        {/* スライドメニュー */}
        <div className={`${styles.menu} ${isMenuOpen ? styles.menuOpen : ''}`}>
          <div className={styles.menuHeader}>
            <span className={styles.menuTitle}>メニュー</span>
            <button className={styles.closeButton} onClick={closeMenu}>
              ✕
            </button>
          </div>

          <div className={styles.menuContent}>
            <Link href="/questions" className={styles.menuLink} onClick={closeMenu}>
              <span className={styles.menuIcon}>📋</span>
              質問一覧
            </Link>
            <Link href="/questions/create" className={styles.menuLink} onClick={closeMenu}>
              <span className={styles.menuIcon}>✏️</span>
              質問を投稿
            </Link>
            <Link href="/tags" className={styles.menuLink} onClick={closeMenu}>
              <span className={styles.menuIcon}>🏷️</span>
              タグ
            </Link>
            <Link href="/users" className={styles.menuLink} onClick={closeMenu}>
              <span className={styles.menuIcon}>👥</span>
              ユーザー
            </Link>

            <div className={styles.menuDivider}></div>

            {isAuthenticated ? (
              <>
                <Link href="/profile" className={styles.menuLink} onClick={closeMenu}>
                  <span className={styles.menuIcon}>👤</span>
                  プロフィール
                </Link>
                <Link href="/bookmarks" className={styles.menuLink} onClick={closeMenu}>
                  <span className={styles.menuIcon}>🔖</span>
                  ブックマーク
                </Link>
                <Link href="/notifications" className={styles.menuLink} onClick={closeMenu}>
                  <span className={styles.menuIcon}>🔔</span>
                  通知
                </Link>
                <button className={styles.logoutButton} onClick={() => { logout(); closeMenu(); }}>
                  <span className={styles.menuIcon}>🚪</span>
                  ログアウト
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className={styles.loginButton} onClick={closeMenu}>
                  ログイン
                </Link>
                <Link href="/register" className={styles.registerButton} onClick={closeMenu}>
                  新規登録
                </Link>
              </>
            )}
          </div>
        </div>

        {/* オーバーレイ */}
        {isMenuOpen && (
          <div className={styles.overlay} onClick={closeMenu}></div>
        )}
      </nav>
    </header>
  );
};
