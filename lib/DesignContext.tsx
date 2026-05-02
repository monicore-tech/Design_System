'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect, useCallback } from 'react';
import chroma from 'chroma-js';

type Theme = 'light' | 'dark';

interface DesignState {
  theme: Theme;
  isAutoHarmony: boolean;
  colors: {
    primary: string;
    secondary: string;
    tertiary: string;
  };
  fonts: {
    display: string;
    sans: string;
  };
  radii: {
    sm: number;
    md: number;
    lg: number;
    xl: number;
  };
  identity: {
    brandName: string;
    eyebrow: string;
    title: string;
    description: string;
    version: string;
    aesthetic: string;
    framework: string;
    status: string;
  };
}

interface DesignContextType {
  state: DesignState;
  updateTheme: (theme: Theme) => void;
  updateAutoHarmony: (enabled: boolean) => void;
  updateColor: (key: keyof DesignState['colors'], value: string) => void;
  updateFont: (key: keyof DesignState['fonts'], value: string) => void;
  updateRadius: (key: keyof DesignState['radii'], value: number) => void;
  updateIdentity: (key: keyof DesignState['identity'], value: string) => void;
}

const initialState: DesignState = {
  theme: 'light',
  isAutoHarmony: true,
  colors: {
    primary: '#0A0A0A',
    secondary: '#1A5AF5',
    tertiary: '#C8372D',
  },
  fonts: {
    display: 'Playfair Display',
    sans: 'DM Sans',
  },
  radii: {
    sm: 4,
    md: 8,
    lg: 14,
    xl: 22,
  },
  identity: {
    brandName: 'Monicore',
    eyebrow: 'Design System v2.0',
    title: 'Monicore\nStyle Guide',
    description: 'A complete design language for building consistent, high-performance digital experiences. Every token, component, and pattern in one place.',
    version: '2.0.0 — May 2025',
    aesthetic: 'Studio Minimalist',
    framework: 'Next.js · Tailwind CSS · Framer Motion',
    status: 'Production',
  },
};

const DesignContext = createContext<DesignContextType | undefined>(undefined);

export const DesignProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<DesignState>(initialState);

  const updateTheme = (theme: Theme) => setState((prev) => ({ ...prev, theme }));
  const updateAutoHarmony = (enabled: boolean) => setState((prev) => ({ ...prev, isAutoHarmony: enabled }));
  
  const updateColor = useCallback((key: keyof DesignState['colors'], value: string) => {
    setState((prev) => {
      const nextColors = { ...prev.colors, [key]: value };
      if (prev.isAutoHarmony && key === 'primary') {
        const base = chroma(value);
        nextColors.secondary = base.set('hsl.h', (base.get('hsl.h') + 30) % 360).hex();
        nextColors.tertiary = base.set('hsl.h', (base.get('hsl.h') + 150) % 360).hex();
      }
      return { ...prev, colors: nextColors };
    });
  }, []);

  const updateFont = (key: keyof DesignState['fonts'], value: string) => {
    setState((prev) => ({ ...prev, fonts: { ...prev.fonts, [key]: value } }));
  };

  const updateRadius = (key: keyof DesignState['radii'], value: number) => {
    setState((prev) => ({ ...prev, radii: { ...prev.radii, [key]: value } }));
  };

  const updateIdentity = (key: keyof DesignState['identity'], value: string) => {
    setState((prev) => ({ ...prev, identity: { ...prev.identity, [key]: value } }));
  };

  useEffect(() => {
    document.documentElement.classList.toggle('dark', state.theme === 'dark');
  }, [state.theme]);

  const getColorVars = (base: string, name: string) => {
    const color = chroma(base);
    const contrast = color.luminance() > 0.5 ? '#0A0A0A' : '#FAFAFA';
    return `
      --accent-${name}: ${base};
      --accent-${name}-light: ${color.brighten(0.5).hex()};
      --accent-${name}-dark: ${color.darken(0.5).hex()};
      --accent-${name}-glass: ${color.alpha(0.15).css()};
      --accent-${name}-contrast: ${contrast};
    `;
  };

  const displayFont = state.fonts.display;
  const sansFont = state.fonts.sans;
  
  // Logic to build a clean Google Fonts URL
  const families = new Set([displayFont, sansFont]);
  const familiesArray = Array.from(families).map(f => `family=${f.replace(/ /g, '+')}:wght@400;700;900`);
  const googleFontsUrl = `https://fonts.googleapis.com/css2?${familiesArray.join('&')}&display=swap`;

  return (
    <DesignContext.Provider value={{ state, updateTheme, updateAutoHarmony, updateColor, updateFont, updateRadius, updateIdentity }}>
      {children}
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('${googleFontsUrl}');
        
        :root {
          /* Fixed Anchors */
          --fixed-white: #FAFAFA;
          --fixed-black: #0A0A0A;

          /* Dynamic Colors */
          ${getColorVars(state.colors.primary, 'primary')}
          ${getColorVars(state.colors.secondary, 'secondary')}
          ${getColorVars(state.colors.tertiary, 'tertiary')}
          
          /* Dynamic Fonts */
          --font-display-family: '${displayFont}', serif;
          --font-sans-family: '${sansFont}', sans-serif;
          
          /* Radii */
          --radius-sm: ${state.radii.sm}px;
          --radius-md: ${state.radii.md}px;
          --radius-lg: ${state.radii.lg}px;
          --radius-xl: ${state.radii.xl}px;

          /* Theme Tokens */
          --bg-page: var(--fixed-white);
          --text-main: var(--fixed-black);
          --text-muted: #7A7670;
          --border-subtle: #E8E6E1;
          --bg-surface: #F5F5F4;
          --bg-card: var(--fixed-white);
          --surface-glass: rgba(255, 255, 255, 0.7);
        }

        .dark {
          --bg-page: var(--fixed-black);
          --text-main: var(--fixed-white);
          --text-muted: #A8A49A;
          --border-subtle: #2A2825;
          --bg-surface: #1A1A1A;
          --bg-card: #141414;
          --surface-glass: rgba(20, 20, 20, 0.6);
        }
      `}} />
    </DesignContext.Provider>
  );
};

export const useDesign = () => {
  const context = useContext(DesignContext);
  if (context === undefined) {
    throw new Error('useDesign must be used within a DesignProvider');
  }
  return context;
};
