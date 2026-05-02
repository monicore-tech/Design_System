import React from 'react';
import { cn } from '@/lib/utils';

export const Progress = ({ label, value, colorClass }: { label?: string; value: number; colorClass?: string }) => (
  <div className="w-full">
    {label && (
      <div className="flex justify-between mb-1.5 text-[12px] font-medium text-gray-500 dark:text-gray-400">
        <span>{label}</span>
        <span>{value}%</span>
      </div>
    )}
    <div className="h-1.5 bg-[var(--bg-surface)] rounded-pill overflow-hidden">
      <div 
        className={cn("h-full transition-all duration-1000 ease-out", colorClass || "bg-[var(--accent-primary)]")} 
        style={{ width: `${value}%` }} 
      />
    </div>
  </div>
);

export const Avatar = ({ initials, src, size = 'md', className }: { initials: string; src?: string; size?: 'sm' | 'md' | 'lg'; className?: string }) => {
  const sizes = {
    sm: 'w-7 h-7 text-[10px]',
    md: 'w-10 h-10 text-[13px]',
    lg: 'w-14 h-14 text-[18px]',
  };
  return (
    <div className={cn(
      "rounded-full border-[2.5px] border-[var(--bg-page)] bg-[var(--bg-surface)] flex items-center justify-center font-bold text-gray-500 shrink-0 overflow-hidden transition-transform hover:scale-105",
      sizes[size],
      className
    )}>
      {src ? <img src={src} alt={initials} className="w-full h-full object-cover" /> : initials}
    </div>
  );
};

export const AvatarGroup = ({ children }: { children: React.ReactNode }) => (
  <div className="flex -space-x-2.5 hover:space-x-1 transition-all duration-300">
    {children}
  </div>
);
