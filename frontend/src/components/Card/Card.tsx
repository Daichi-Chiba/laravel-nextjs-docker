import React from 'react';
import styles from './Card.module.css';
import clsx from 'clsx';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  flat?: boolean; // 影なしのフラットなカード
}

interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
}

interface CardContentProps {
  children: React.ReactNode;
  className?: string;
}

interface CardFooterProps {
  children: React.ReactNode;
  className?: string;
}

export const Card = ({ children, className, flat }: CardProps) => {
  const cardClasses = clsx(
    styles.card,
    flat && styles['card--flat'],
    className
  );
  return <div className={cardClasses}>{children}</div>;
};

export const CardHeader = ({ children, className }: CardHeaderProps) => {
  return <div className={clsx(styles.card__header, className)}>{children}</div>;
};

export const CardContent = ({ children, className }: CardContentProps) => {
  return <div className={clsx(styles.card__content, className)}>{children}</div>;
};

export const CardFooter = ({ children, className }: CardFooterProps) => {
  return <div className={clsx(styles.card__footer, className)}>{children}</div>;
};
