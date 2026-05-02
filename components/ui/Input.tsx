import React from 'react';
import { cn } from '@/lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  hint?: string;
  error?: boolean;
  success?: boolean;
  icon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, hint, error, success, icon, className, ...props }, ref) => {
    return (
      <div className="mb-5 w-full">
        {label && (
          <label className="block text-[12px] font-semibold tracking-[0.06em] uppercase text-gray-500 dark:text-gray-400 mb-2">
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 w-4 h-4">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            className={cn(
              'w-full px-4 py-[11px] font-sans text-[14px] text-[var(--text-main)] bg-[var(--bg-card)] dark:bg-white/5 border-[1.5px] border-[var(--border-main)] rounded-md outline-none transition-all duration-300 placeholder:text-gray-400 dark:placeholder:text-gray-600',
              'focus:border-[var(--color-brand)] focus:shadow-[0_0_0_3px_rgba(var(--color-brand),0.08)]',
              error && 'border-red focus:border-red focus:shadow-[0_0_0_3px_rgba(200,55,45,0.08)]',
              success && 'border-green focus:border-green focus:shadow-[0_0_0_3px_rgba(26,122,74,0.08)]',
              icon && 'pl-10',
              className
            )}
            {...props}
          />
        </div>
        {hint && (
          <p className={cn(
            'text-[12px] text-gray-400 dark:text-gray-500 mt-1.5',
            error && 'text-red',
            success && 'text-green'
          )}>
            {hint}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  hint?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, hint, className, ...props }, ref) => {
    return (
      <div className="mb-5 w-full">
        {label && (
          <label className="block text-[12px] font-semibold tracking-[0.06em] uppercase text-gray-500 dark:text-gray-400 mb-2">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          className={cn(
            'w-full px-4 py-[11px] font-sans text-[14px] text-[var(--text-main)] bg-[var(--bg-card)] dark:bg-white/5 border-[1.5px] border-[var(--border-main)] rounded-md outline-none transition-all duration-300 placeholder:text-gray-400 dark:placeholder:text-gray-600',
            'focus:border-[var(--color-brand)] focus:shadow-[0_0_0_3px_rgba(var(--color-brand),0.08)]',
            className
          )}
          {...props}
        />
        {hint && <p className="text-[12px] text-gray-400 dark:text-gray-500 mt-1.5">{hint}</p>}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';
