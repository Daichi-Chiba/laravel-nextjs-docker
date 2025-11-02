import React from 'react';
import styles from './Button.module.css';
import clsx from 'clsx';

// ボタンのプロパティ（props）の型を定義
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  icon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>((
  { children, variant = 'secondary', disabled, icon, className, ...props }, 
  ref
) => {
  // clsx を使ってクラス名を動的に結合
  const buttonClasses = clsx(
    styles.button, // ベースとなるクラス
    variant === 'primary' && styles['button--primary'], // variantがprimaryの場合
    variant === 'secondary' && styles['button--secondary'], // variantがsecondaryの場合
    disabled && styles['button--disabled'], // disabled属性がある場合
    className // 親コンポーネントから渡された追加のクラス
  );

  return (
    <button className={buttonClasses} disabled={disabled} ref={ref} {...props}>
      {icon && <span className={styles.button__icon}>{icon}</span>}
      {children}
    </button>
  );
});

Button.displayName = 'Button';
