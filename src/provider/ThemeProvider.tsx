import type { Theme } from '@/types/types';
import { useSetTheme } from '@/stores/themeStore';
import { useEffect } from 'react';

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const setTheme = useSetTheme();

  useEffect(() => {
    const stored = localStorage.getItem('theme') as Theme | null;
    setTheme(stored ?? 'system');
  }, [setTheme]);

  return <>{children}</>;
}
