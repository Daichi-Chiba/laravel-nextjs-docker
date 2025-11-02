'use client';

import { useState } from 'react';
import Link from 'next/link';
import styles from './Header.module.css';
import clsx from 'clsx';
import { useAuth } from '@/contexts/AuthContext'; // useAuthフックをインポート
import { Button } from '@/components/Button/Button'; // Buttonコンポーネントをインポート

export const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth(); // 認証状態を取得

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className={styles.header}>
      <div className={styles.header__container}>
        <Link href="/" className={styles.header__logo}>
          T.S.O
        </Link>

        {/* PC用ナビゲーション */}
        <nav className={styles.header__nav}>
          <ul className={styles.header__navList}>
            <li className={styles.header__navItem}>
              <Link href="/questions" className={styles.header__navLink}>質問</Link>
            </li>
            <li className={styles.header__navItem}>
              <Link href="/tags" className={styles.header__navLink}>タグ</Link>
            </li>
            <li className={styles.header__navItem}>
              <Link href="/users" className={styles.header__navLink}>ユーザー</Link>
            </li>
          </ul>
        </nav>

        {/* PC用アクションボタン */}
        <div className={styles.header__actions}>
          {isAuthenticated ? (
            <>
              <span className={styles.header__userName}>{user?.name}</span>
              <Button variant="secondary" onClick={logout}>ログアウト</Button>
            </>
          ) : (
            <>
              <Link href="/login" className={styles.header__actionButton}>ログイン</Link>
              <Link href="/register" className={styles.header__actionButton}>登録</Link>
            </>
          )}
        </div>

        {/* モバイル用ハンバーガーメニューボタン */}
        <button className={styles.header__mobileMenuButton} onClick={toggleMobileMenu}>
          {isMobileMenuOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          )}
        </button>
      </div>

      {/* モバイル用メニュー（開閉可能） */}
      {isMobileMenuOpen && (
        <div className={clsx(styles.header__mobileNav, isMobileMenuOpen && styles['header__mobileNav--open'])}>
          <ul className={styles.header__mobileNavList}>
            <li className={styles.header__mobileNavItem}>
              <Link href="/questions" className={styles.header__mobileNavLink} onClick={toggleMobileMenu}>質問</Link>
            </li>
            <li className={styles.header__mobileNavItem}>
              <Link href="/tags" className={styles.header__mobileNavLink} onClick={toggleMobileMenu}>タグ</Link>
            </li>
            <li className={styles.header__mobileNavItem}>
              <Link href="/users" className={styles.header__mobileNavLink} onClick={toggleMobileMenu}>ユーザー</Link>
            </li>
          </ul>
          <div className={styles.header__mobileActions}>
            {isAuthenticated ? (
              <>
                <span className={styles.header__userName}>{user?.name}</span>
                <Button variant="secondary" onClick={logout}>ログアウト</Button>
              </>
            ) : (
              <>
                <Link href="/login" className={styles.header__actionButton} onClick={toggleMobileMenu}>ログイン</Link>
                <Link href="/register" className={styles.header__actionButton} onClick={toggleMobileMenu}>登録</Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
