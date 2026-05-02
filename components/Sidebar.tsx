'use client';

import React from 'react';
import { useDesign } from '@/lib/DesignContext';
import { cn } from '@/lib/utils';
import { Settings, X, Palette, Type, Square, Info, Sun, Moon, Wand2 } from 'lucide-react';

const GOOGLE_FONTS_DISPLAY = [
  'Playfair Display',
  'Libre Baskerville',
  'Lora',
  'Cormorant Garamond',
  'Inter',
  'Montserrat',
  'Outfit',
  'Fraunces',
  'Bricolage Grotesque',
  'Oswald',
  'Bebas Neue',
  'Urbanist',
  'Clash Display',
  'Cabinet Grotesk',
  'Syne',
  'Unbounded',
  'Space Grotesk',
  'Newsreader',
];

const GOOGLE_FONTS_SANS = [
  'DM Sans',
  'Inter',
  'Manrope',
  'Public Sans',
  'Outfit',
  'Montserrat',
  'Work Sans',
  'Roboto',
  'Instrument Sans',
  'Figtree',
  'Plus Jakarta Sans',
  'Nunito',
  'Golos Text',
  'Lexend',
  'Satoshi',
  'General Sans',
  'Switzer',
  'Onest',
];

export const Sidebar = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const { state, updateTheme, updateAutoHarmony, updateColor, updateFont, updateRadius, updateIdentity } = useDesign();

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-10 right-10 z-[110] w-14 h-14 bg-black text-white dark:bg-white dark:text-black rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
      >
        <Settings className="w-6 h-6" />
      </button>

      <div
        className={cn(
          'fixed inset-y-0 right-0 z-[120] w-80 bg-white dark:bg-gray-900 border-l border-gray-200 dark:border-gray-800 shadow-2xl transition-transform duration-300 ease-in-out transform flex flex-col',
          isOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        <div className="flex items-center justify-between p-5 border-b border-gray-100 dark:border-gray-800">
          <h2 className="font-display font-bold text-lg dark:text-white">Customize</h2>
          <div className="flex gap-2">
            <button 
              onClick={() => {
                if (confirm('Reset all changes?')) {
                  window.location.reload();
                }
              }}
              className="text-[10px] font-bold tracking-widest uppercase text-gray-400 hover:text-red transition-colors"
            >
              Reset
            </button>
            <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-black dark:hover:text-white transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-8 no-scrollbar">
          {/* THEME */}
          <section>
            <div className="flex items-center gap-2 mb-4 text-[11px] font-bold tracking-widest uppercase text-gray-400">
              <Palette className="w-3.5 h-3.5" />
              Theme
            </div>
            <div className="flex p-1 bg-gray-100 dark:bg-gray-800 rounded-lg">
              <button
                onClick={() => updateTheme('light')}
                className={cn(
                  'flex-1 flex items-center justify-center gap-2 py-2 text-[12px] font-medium rounded-md transition-all',
                  state.theme === 'light' ? 'bg-white text-black shadow-sm' : 'text-gray-500 hover:text-black dark:hover:text-white'
                )}
              >
                <Sun className="w-3.5 h-3.5" /> Light
              </button>
              <button
                onClick={() => updateTheme('dark')}
                className={cn(
                  'flex-1 flex items-center justify-center gap-2 py-2 text-[12px] font-medium rounded-md transition-all',
                  state.theme === 'dark' ? 'bg-gray-700 text-white shadow-sm' : 'text-gray-500 hover:text-white'
                )}
              >
                <Moon className="w-3.5 h-3.5" /> Dark
              </button>
            </div>
          </section>

          {/* COLORS */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 text-[11px] font-bold tracking-widest uppercase text-gray-400">
                <Palette className="w-3.5 h-3.5" />
                Palette Slots
              </div>
              <button 
                onClick={() => updateAutoHarmony(!state.isAutoHarmony)}
                className={cn(
                  "flex items-center gap-1.5 text-[10px] font-bold uppercase transition-all px-2 py-1 rounded-md",
                  state.isAutoHarmony ? "bg-blue/10 text-blue" : "bg-gray-100 dark:bg-gray-800 text-gray-400"
                )}
              >
                <Wand2 className="w-3 h-3" /> {state.isAutoHarmony ? "Auto" : "Manual"}
              </button>
            </div>
            <div className="space-y-4">
              {[
                { label: 'Primary Accent', key: 'primary' },
                ...(state.isAutoHarmony ? [] : [
                  { label: 'Secondary Accent', key: 'secondary' },
                  { label: 'Tertiary Accent', key: 'tertiary' }
                ])
              ].map((c) => (
                <div key={c.key} className="flex items-center justify-between">
                  <span className="text-[13px] font-medium text-gray-600 dark:text-gray-400">{c.label}</span>
                  <input
                    type="color"
                    value={state.colors[c.key as keyof typeof state.colors] || '#000000'}
                    onChange={(e) => updateColor(c.key as any, e.target.value)}
                    className="w-8 h-8 rounded cursor-pointer border-none bg-transparent"
                  />
                </div>
              ))}
              {state.isAutoHarmony && (
                <p className="text-[11px] text-gray-400 italic">Secondary and Tertiary are auto-generated based on Primary hue shift.</p>
              )}
            </div>
          </section>

          {/* TYPOGRAPHY */}
          <section>
            <div className="flex items-center gap-2 mb-4 text-[11px] font-bold tracking-widest uppercase text-gray-400">
              <Type className="w-3.5 h-3.5" />
              Typography
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-[12px] font-medium text-gray-600 dark:text-gray-400 mb-1.5 text-xs">Display Font</label>
                <select
                  value={state.fonts.display}
                  onChange={(e) => updateFont('display', e.target.value)}
                  className="w-full px-3 py-2 text-[13px] bg-white dark:bg-gray-800 dark:text-white border border-gray-200 dark:border-gray-700 rounded-md outline-none focus:border-black dark:focus:border-white transition-colors"
                >
                  {GOOGLE_FONTS_DISPLAY.map(font => (
                    <option key={font} value={font}>{font}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-[12px] font-medium text-gray-600 dark:text-gray-400 mb-1.5 text-xs">Body Font</label>
                <select
                  value={state.fonts.sans}
                  onChange={(e) => updateFont('sans', e.target.value)}
                  className="w-full px-3 py-2 text-[13px] bg-white dark:bg-gray-800 dark:text-white border border-gray-200 dark:border-gray-700 rounded-md outline-none focus:border-black dark:focus:border-white transition-colors"
                >
                  {GOOGLE_FONTS_SANS.map(font => (
                    <option key={font} value={font}>{font}</option>
                  ))}
                </select>
              </div>
            </div>
          </section>

          {/* RADII */}
          <section>
            <div className="flex items-center gap-2 mb-4 text-[11px] font-bold tracking-widest uppercase text-gray-400">
              <Square className="w-3.5 h-3.5" />
              Border Radii
            </div>
            <div className="space-y-4">
              {[
                { label: 'Small (sm)', key: 'sm', max: 8 },
                { label: 'Medium (md)', key: 'md', max: 16 },
                { label: 'Large (lg)', key: 'lg', max: 32 },
                { label: 'Extra Large (xl)', key: 'xl', max: 48 },
              ].map((r) => (
                <div key={r.key}>
                  <div className="flex justify-between mb-1.5">
                    <span className="text-[12px] font-medium text-gray-600 dark:text-gray-400">{r.label}</span>
                    <span className="text-[12px] text-gray-400 dark:text-gray-500">{state.radii[r.key as keyof typeof state.radii]}px</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max={r.max}
                    value={state.radii[r.key as keyof typeof state.radii]}
                    onChange={(e) => updateRadius(r.key as any, parseInt(e.target.value))}
                    className="w-full accent-black dark:accent-white h-1.5 bg-gray-100 dark:bg-gray-800 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
              ))}
            </div>
          </section>

          {/* BRAND IDENTITY */}
          <section>
            <div className="flex items-center gap-2 mb-4 text-[11px] font-bold tracking-widest uppercase text-gray-400">
              <Info className="w-3.5 h-3.5" />
              Brand Identity
            </div>
            <div className="space-y-4 pb-10">
              {[
                { label: 'Brand Name', key: 'brandName' },
                { label: 'Eyebrow', key: 'eyebrow' },
                { label: 'Title', key: 'title', multiline: true },
                { label: 'Description', key: 'description', multiline: true },
                { label: 'Version', key: 'version' },
                { label: 'Aesthetic', key: 'aesthetic' },
                { label: 'Framework', key: 'framework' },
                { label: 'Status', key: 'status' },
              ].map((i) => (
                <div key={i.key}>
                  <label className="block text-[12px] font-medium text-gray-600 dark:text-gray-400 mb-1.5 text-xs">{i.label}</label>
                  {i.multiline ? (
                    <textarea
                      value={state.identity[i.key as keyof typeof state.identity]}
                      onChange={(e) => updateIdentity(i.key as any, e.target.value)}
                      rows={3}
                      className="w-full px-3 py-2 text-[13px] bg-white dark:bg-gray-800 dark:text-white border border-gray-200 dark:border-gray-700 rounded-md outline-none focus:border-black dark:focus:border-white transition-colors"
                    />
                  ) : (
                    <input
                      type="text"
                      value={state.identity[i.key as keyof typeof state.identity]}
                      onChange={(e) => updateIdentity(i.key as any, e.target.value)}
                      className="w-full px-3 py-2 text-[13px] bg-white dark:bg-gray-800 dark:text-white border border-gray-200 dark:border-gray-700 rounded-md outline-none focus:border-black dark:focus:border-white transition-colors"
                    />
                  )}
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 z-[115] bg-black/5 dark:bg-white/5 backdrop-blur-[2px]"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};
