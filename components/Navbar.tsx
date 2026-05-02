'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { useDesign } from '@/lib/DesignContext';
import { Sun, Moon } from 'lucide-react';

export const Navbar = () => {
  const [activeSection, setActiveSection] = useState('colors');
  const { state, updateTheme } = useDesign();
  const { identity, theme } = state;

  const initials = identity.brandName
    .split(' ')
    .map((word) => word[0])
    .join('')
    .substring(0, 2)
    .toUpperCase();

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['colors', 'typography', 'spacing', 'buttons', 'components', 'layout', 'motion', 'tokens'];
      const current = sections.find(section => {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          return rect.top >= 0 && rect.top <= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Colors', href: '#colors', id: 'colors' },
    { name: 'Typography', href: '#typography', id: 'typography' },
    { name: 'Spacing', href: '#spacing', id: 'spacing' },
    { name: 'Buttons', href: '#buttons', id: 'buttons' },
    { name: 'Components', href: '#components', id: 'components' },
    { name: 'Layout', href: '#layout', id: 'layout' },
    { name: 'Motion', href: '#motion', id: 'motion' },
    { name: 'Tokens', href: '#tokens', id: 'tokens' },
  ];

  return (
    <nav className="sticky top-0 z-[100] h-[52px] transition-all duration-500 border-b border-[var(--border-main)] bg-[var(--glass-bg)] backdrop-blur-xl">
      <div className="sg-container h-full flex items-center justify-center relative">
        <Link href="/" className="font-display font-bold text-[15px] text-[var(--text-main)] absolute left-10 shrink-0 hidden md:block">
          {initials}
        </Link>
        <div className="flex h-full overflow-x-auto no-scrollbar">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={link.href}
              className={cn(
                'text-[12px] font-medium tracking-[0.06em] uppercase text-gray-500 px-3.5 h-full flex items-center whitespace-nowrap transition-all duration-300 border-b-2 border-transparent hover:text-[var(--text-main)]',
                activeSection === link.id && 'text-[var(--text-main)] border-[var(--color-red)]'
              )}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(link.id)?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              {link.name}
            </a>
          ))}
        </div>
        <button
          onClick={() => updateTheme(theme === 'light' ? 'dark' : 'light')}
          className="absolute right-10 p-2 text-gray-400 hover:text-[var(--text-main)] transition-colors"
          aria-label="Toggle theme"
        >
          {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
        </button>
      </div>
    </nav>
  );
};
