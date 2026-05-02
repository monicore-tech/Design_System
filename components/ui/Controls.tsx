import React from 'react';
import { cn } from '@/lib/utils';

export const Checkbox = ({ label, checked, onChange }: { label: string; checked?: boolean; onChange?: () => void }) => (
  <label className="flex items-center gap-3 cursor-pointer group">
    <div className={cn(
      "w-[18px] h-[18px] rounded border-[1.5px] border-[var(--border-subtle)] bg-[var(--bg-card)] flex items-center justify-center transition-all duration-200",
      checked ? "bg-[var(--accent-primary)] border-[var(--accent-primary)]" : "group-hover:border-[var(--text-main)]"
    )}>
      {checked && <div className="text-[var(--accent-primary-contrast)] text-[10px] font-bold">✓</div>}
    </div>
    <span className="text-[14px] text-[var(--text-main)]">{label}</span>
  </label>
);

export const Radio = ({ label, selected, onClick }: { label: string; selected?: boolean; onClick?: () => void }) => (
  <label className="flex items-center gap-3 cursor-pointer group" onClick={onClick}>
    <div className={cn(
      "w-[18px] h-[18px] rounded-full border-[1.5px] border-[var(--border-subtle)] bg-[var(--bg-card)] flex items-center justify-center transition-all duration-200",
      selected ? "border-[var(--accent-primary)]" : "group-hover:border-[var(--text-main)]"
    )}>
      {selected && <div className="w-2 h-2 rounded-full bg-[var(--accent-primary)]" />}
    </div>
    <span className="text-[14px] text-[var(--text-main)]">{label}</span>
  </label>
);

export const Toggle = ({ label, on, onClick }: { label: string; on?: boolean; onClick?: () => void }) => (
  <label className="flex items-center gap-3 cursor-pointer group" onClick={onClick}>
    <div className={cn(
      "w-11 h-6 rounded-pill bg-[var(--bg-surface)] relative transition-all duration-300",
      on ? "bg-[var(--accent-primary)]" : ""
    )}>
      <div className={cn(
        "absolute top-[3px] left-[3px] w-[18px] h-[18px] rounded-full bg-white shadow-sm transition-transform duration-300",
        on ? "translate-x-5" : "translate-x-0"
      )} />
    </div>
    <span className="text-[14px] text-[var(--text-main)]">{label}</span>
  </label>
);
