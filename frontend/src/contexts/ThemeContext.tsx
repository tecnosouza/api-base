import React, {  useEffect, useState } from 'react';
import { FontSize, SidebarMode, Theme } from './theme-constants';
import { getInitialTheme, THEME_STORAGE_KEY } from './theme-utils';
import ThemeContext from './ThemeContextContext';

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<Theme>(() => {
    const saved = localStorage.getItem(THEME_STORAGE_KEY);
    return (saved as Theme) || 'light';
  });

  const [fontSize, setFontSizeState] = useState<FontSize>(() => {
    const saved = localStorage.getItem('fontSize');
    return (saved as FontSize) || 'medium';
  });

  const [sidebarMode, setSidebarModeState] = useState<SidebarMode>(() => {
    const saved = localStorage.getItem('sidebarMode');
    return (saved as SidebarMode) || 'static';
  });

  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('fontSize', fontSize);
    const fontSizeMap = {
      small: '14px',
      medium: '16px',
      large: '18px'
    };
    document.documentElement.style.fontSize = fontSizeMap[fontSize];
  }, [fontSize]);

  useEffect(() => {
    localStorage.setItem('sidebarMode', sidebarMode);
  }, [sidebarMode]);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
  };

  const toggleTheme = (newTheme?: Theme) => {
    if (newTheme) {
      setThemeState(newTheme);
    } else {
      setThemeState(prev => prev === 'light' ? 'dark' : 'light');
    }
  };

  const setFontSize = (size: FontSize) => {
    setFontSizeState(size);
  };

  const setSidebarMode = (mode: SidebarMode) => {
    setSidebarModeState(mode);
  };

  return (
    <ThemeContext.Provider value={{
      theme,
      fontSize,
      sidebarMode,
      sidebarOpen,
      toggleTheme,
      setTheme,
      setFontSize,
      setSidebarMode,
      setSidebarOpen
    }}>
      {children}
    </ThemeContext.Provider>
  );
};
