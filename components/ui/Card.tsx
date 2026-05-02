import React from 'react';
import { cn } from '@/lib/utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'dark' | 'glass';
}

export const Card: React.FC<CardProps> = ({ 
  children, 
  variant = 'default', 
  className, 
  ...props 
}) => {
  return (
    <div
      className={cn(
        'border border-[var(--border-main)] rounded-lg overflow-hidden transition-all duration-300 hover:shadow-md hover:-translate-y-[3px]',
        variant === 'glass' ? 'glass-card' : 'bg-[var(--bg-card)] text-[var(--text-main)]',
        variant === 'dark' && 'dark:bg-black bg-gray-900 text-white border-gray-700',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export const CardHeader = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <div className={cn('relative', className)}>{children}</div>
);

export const CardBody = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <div className={cn('p-5', className)}>{children}</div>
);

export const CardFooter = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <div className={cn('px-5 py-3.5 border-t border-[var(--border-main)] flex items-center justify-between', className)}>{children}</div>
);
