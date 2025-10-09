import { createContext } from 'react';
import { FontSize, SidebarMode, Theme } from './theme-constants';

interface ThemeContextProps {
  theme: Theme;
  fontSize: FontSize;
  sidebarMode: SidebarMode;
  sidebarOpen: boolean;
  toggleTheme: (newTheme?: Theme) => void;
  setTheme: (theme: Theme) => void;
  setFontSize: (size: FontSize) => void;
  setSidebarMode: (mode: SidebarMode) => void;
  setSidebarOpen: (open: boolean) => void;
}

const ThemeContext = createContext<ThemeContextProps>({
  theme: 'light',
  fontSize: 'medium',
  sidebarMode: 'static',
  sidebarOpen: true,
  toggleTheme: () => {},
  setTheme: () => {},
  setFontSize: () => {},
  setSidebarMode: () => {},
  setSidebarOpen: () => {}
});

export default ThemeContext;