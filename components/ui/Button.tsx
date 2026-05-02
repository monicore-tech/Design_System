import React from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent' | 'ghost' | 'link';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', isLoading, ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center gap-2 font-sans font-medium transition-all duration-220 ease-brand-out whitespace-nowrap letter-spacing-[0.01em] disabled:opacity-70 disabled:pointer-events-none';
    
    const variants = {
      primary: 'bg-[var(--accent-primary)] text-[var(--accent-primary-contrast)] hover:opacity-90 hover:-translate-y-px hover:shadow-md rounded-pill border border-[var(--accent-primary)]',
      secondary: 'bg-transparent text-[var(--text-main)] border-[1.5px] border-[var(--text-main)] hover:bg-[var(--text-main)] hover:text-[var(--bg-page)] rounded-pill',
      accent: 'bg-[var(--accent-tertiary)] text-[var(--accent-tertiary-contrast)] hover:opacity-90 hover:-translate-y-px hover:shadow-[0_8px_24px_rgba(var(--accent-tertiary),0.3)] rounded-pill',
      ghost: 'bg-[var(--bg-surface)] text-gray-600 dark:text-gray-400 border border-[var(--border-subtle)] hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-black dark:hover:text-white rounded-md',
      link: 'bg-none text-[var(--accent-secondary)] underline underline-offset-[3px] hover:opacity-80',
    };

    const sizes = {
      sm: 'px-3.5 py-1.5 text-[12px]',
      md: 'px-[22px] py-2.5 text-[14px]',
      lg: 'px-8 py-3.5 text-[16px]',
    };

    return (
      <button
        ref={ref}
        className={cn(
          baseStyles,
          variants[variant],
          size !== 'md' || variant !== 'link' ? sizes[size] : '',
          isLoading && 'opacity-70 pointer-events-none',
          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';
