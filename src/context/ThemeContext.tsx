import type { Theme } from '@/types/types';
import { createContext, useContext, useEffect, useState } from 'react';

type ThemeContextType = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const ThemeContext = createContext<ThemeContextType | null>(null);

const applyTheme = (theme: Theme) => {
  const htmlTag = document.documentElement;
  htmlTag.classList.remove('dark', 'light');

  if (theme === 'system') {
    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    htmlTag.classList.add(isDark ? 'dark' : 'light');
  } else {
    htmlTag.classList.add(theme);
  }
};

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(() => {
    return (localStorage.getItem('theme') as Theme) ?? 'system';
  });

  const setTheme = (theme: Theme) => {
    localStorage.setItem('theme', theme);
    applyTheme(theme);
    setThemeState(theme);
  };

  useEffect(() => {
    applyTheme(theme);
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext)!.theme;
export const useSetTheme = () => useContext(ThemeContext)!.setTheme;
