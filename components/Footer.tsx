'use client';

import React from 'react';
import { Pill } from './ui/Pill';
import { useDesign } from '@/lib/DesignContext';

export const Footer = () => {
  const { state } = useDesign();
  const { identity } = state;

  return (
    <footer className="py-10 border-t border-gray-200 dark:border-gray-800 flex flex-col md:flex-row items-center justify-between mt-10 sg-container transition-colors duration-300">
      <div>
        <div className="font-display text-[16px] font-bold text-black dark:text-white">{identity.brandName}</div>
        <div className="text-[12px] text-gray-400 dark:text-gray-500 mt-1">{identity.version} · Crafted by Cody Reich</div>
      </div>
      <div className="flex gap-2 mt-4 md:mt-0">
        <Pill variant="primary" className="text-[11px]">{identity.status}</Pill>
        <Pill variant="default" className="text-[11px]">Last updated May 2025</Pill>
      </div>
    </footer>
  );
};
