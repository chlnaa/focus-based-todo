import type { Theme } from '@/types/types';
import { create } from 'zustand';

type ThemeStore = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const applyTheme = (theme: Theme) => {
  const htmlTag = document.documentElement;
  htmlTag.classList.remove('dark', 'light');

  if (theme === 'system') {
    const isDarkTheme = window.matchMedia(
      '(prefers-color-scheme:dark)',
    ).matches;

    htmlTag.classList.add(isDarkTheme ? 'dark' : 'light');
  } else {
    htmlTag.classList.add(theme);
  }
};

const useThemeStore = create<ThemeStore>((set) => ({
  theme: 'system',

  setTheme: (theme) => {
    localStorage.setItem('theme', theme);
    applyTheme(theme);
    set({ theme });
  },
}));

export const useSetTheme = () => useThemeStore((store) => store.setTheme);
