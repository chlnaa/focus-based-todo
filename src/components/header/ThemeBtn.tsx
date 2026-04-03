import { Sun } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import type { Theme } from '@/types/types';

const THEMES: Theme[] = ['system', 'dark', 'light'];

export default function ThemeBtn() {
  const onChangeTheme = (theme: Theme) => {
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

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="outline-none focus:ring-0 focus-visible:ring-0">
        <Sun className="w-5 h-5 sm:w-6 sm:h-6" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-35 p-0">
        {THEMES.map((theme) => (
          <DropdownMenuItem key={`theme-button-${theme}`} asChild>
            <div
              className="hover:bg-muted cursor-pointer p-3"
              onClick={() => onChangeTheme(theme)}
            >
              {theme}
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
