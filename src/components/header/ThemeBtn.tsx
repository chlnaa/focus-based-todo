import { CheckIcon, Sun } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import type { Theme } from '@/types/types';
import { useSetTheme, useTheme } from '@/context/ThemeContext';

const THEMES: Theme[] = ['system', 'dark', 'light'];

export default function ThemeBtn() {
  const currentTheme = useTheme();
  const setTheme = useSetTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="outline-none focus:ring-0 focus-visible:ring-0">
        <Sun className="w-5 h-5 sm:w-6 sm:h-6" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-35 p-0">
        {THEMES.map((theme) => (
          <DropdownMenuItem key={`theme-button-${theme}`} asChild>
            <div
              className="hover:bg-muted flex cursor-pointer items-center justify-between p-3"
              onClick={() => setTheme(theme)}
            >
              {theme}
              {currentTheme === theme && <CheckIcon className="h-4 w-4" />}
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
