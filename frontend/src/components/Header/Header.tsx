import Link from 'next/link';
import styles from './Header.module.css';

export const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.header__container}>
        <Link href="/" className={styles.header__logo}>
          T.S.O
        </Link>
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
        <div className={styles.header__actions}>
          <Link href="/login" className={styles.header__actionButton}>ログイン</Link>
          <Link href="/register" className={styles.header__actionButton}>登録</Link>
        </div>
      </div>
    </header>
  );
};
