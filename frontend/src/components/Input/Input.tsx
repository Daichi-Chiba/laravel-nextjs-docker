import React from 'react';
import styles from './Input.module.css';
import clsx from 'clsx';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>((
  { className, error, type = 'text', ...props },
  ref
) => {
  const inputClasses = clsx(
    styles.input,
    error && styles['input--error'],
    className
  );

  return (
    <input
      type={type}
      className={inputClasses}
      ref={ref}
      {...props}
    />
  );
});

Input.displayName = 'Input';
