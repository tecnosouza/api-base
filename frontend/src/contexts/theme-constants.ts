import React, { createContext } from 'react';

export type Theme = 'light' | 'dark';
export type FontSize = 'small' | 'medium' | 'large';
export type SidebarMode = 'static' | 'dynamic';

export interface ThemeContextType {
  theme: Theme;
  fontSize: FontSize;
  sidebarMode: SidebarMode;
  toggleTheme: () => void;
  setFontSize: (size: FontSize) => void;
  setSidebarMode: (mode: SidebarMode) => void;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);