import { useContext } from 'react';
import ThemeContext from '../contexts/ThemeContextContext';

export const useTheme = () => useContext(ThemeContext);