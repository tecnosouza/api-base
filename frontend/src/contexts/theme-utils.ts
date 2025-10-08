export const THEME_STORAGE_KEY = 'theme';

export const getInitialTheme = (): string => {
  if (typeof window !== 'undefined' && window.localStorage) {
    const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
    return storedTheme || 'light';
  }
  return 'light';
};