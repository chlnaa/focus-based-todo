import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatTime = (totalSeconds: number) => {
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;

  const hours = h.toString().padStart(2, '0');
  const minutes = m.toString().padStart(2, '0');
  const seconds = s.toString().padStart(2, '0');

  const fullTimeDisplay = `${hours}:${minutes}:${seconds}`;
  return { fullTimeDisplay, hours, minutes, seconds };
};
