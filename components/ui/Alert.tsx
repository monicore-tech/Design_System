import React from 'react';
import { cn } from '@/lib/utils';
import { Info, Check, AlertTriangle, X } from 'lucide-react';

interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'info' | 'success' | 'warning' | 'danger';
  title?: string;
}

export const Alert: React.FC<AlertProps> = ({ 
  children, 
  variant = 'info', 
  title, 
  className, 
  ...props 
}) => {
  const variants = {
    info: 'bg-[var(--accent-secondary-glass)] border-[var(--accent-secondary-glass)] text-[var(--accent-secondary)] backdrop-blur-md',
    success: 'bg-green-light/50 dark:bg-green/10 border-green/30 text-[#165C38] dark:text-green-light backdrop-blur-md',
    warning: 'bg-[var(--accent-tertiary-glass)] border-[var(--accent-tertiary-glass)] text-[var(--accent-tertiary)] backdrop-blur-md',
    danger: 'bg-red-light/50 dark:bg-red/10 border-red/30 text-[#9A2820] dark:text-red-light backdrop-blur-md',
  };

  const Icons = {
    info: <Info className="w-full h-full" />,
    success: <Check className="w-full h-full" />,
    warning: <AlertTriangle className="w-full h-full" />,
    danger: <X className="w-full h-full" />,
  };

  const iconBg = {
    info: 'bg-[var(--accent-secondary)]',
    success: 'bg-green-600',
    warning: 'bg-[var(--accent-tertiary)]',
    danger: 'bg-red-600',
  };

  return (
    <div
      className={cn(
        'flex gap-3 items-start p-[14px_18px] rounded-md border mb-3 text-[14px] transition-all duration-300',
        variants[variant],
        className
      )}
      {...props}
    >
      <div className={cn(
        'w-[18px] h-[18px] rounded-full flex items-center justify-center p-[3px] flex-shrink-0 mt-[2px] text-white shadow-sm',
        iconBg[variant]
      )}>
        {Icons[variant]}
      </div>
      <div className="flex-1">
        {title && <div className="font-semibold mb-0.5">{title}</div>}
        <div className="opacity-90">{children}</div>
      </div>
    </div>
  );
};
