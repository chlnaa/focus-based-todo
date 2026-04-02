import { create } from 'zustand';

type Theme = 'light' | 'dark';

type ThemeStore = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
};

export const useThemeStore = create<ThemeStore>((set) => ({
  theme: 'light',

  setTheme: (theme) => {
    localStorage.setItem('theme', theme);
    document.documentElement.classList.toggle('dark', theme === 'dark');

    set({ theme });
  },

  toggleTheme: () =>
    set((state) => {
      const nextTheme = state.theme === 'light' ? 'dark' : 'light';

      localStorage.setItem('theme', nextTheme);
      document.documentElement.classList.toggle('dark', nextTheme === 'dark');

      return { theme: nextTheme };
    }),
}));
