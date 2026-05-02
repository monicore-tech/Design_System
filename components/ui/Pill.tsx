import React from 'react';
import { cn } from '@/lib/utils';

interface PillProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'primary' | 'secondary' | 'tertiary' | 'black';
  dotColor?: string;
}

export const Pill: React.FC<PillProps> = ({ 
  children, 
  variant = 'default', 
  dotColor, 
  className, 
  ...props 
}) => {
  const variants = {
    default: 'bg-[var(--bg-surface)] text-gray-600 dark:text-gray-400',
    primary: 'bg-[var(--accent-primary-glass)] text-[var(--accent-primary)]',
    secondary: 'bg-[var(--accent-secondary-glass)] text-[var(--accent-secondary)]',
    tertiary: 'bg-[var(--accent-tertiary-glass)] text-[var(--accent-tertiary)]',
    black: 'bg-[var(--text-main)] text-[var(--bg-page)]',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-pill text-[12px] font-medium transition-colors border border-[var(--border-subtle)]',
        variants[variant],
        className
      )}
      {...props}
    >
      {dotColor && (
        <span 
          className="w-1.5 h-1.5 rounded-full inline-block" 
          style={{ backgroundColor: dotColor }} 
        />
      )}
      {children}
    </span>
  );
};
