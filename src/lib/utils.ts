import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatTime = (totalSeconds: number) => {
  const hours = Math.floor(totalSeconds / 3600);
  const mins = Math.floor((totalSeconds % 3600) / 60);
  const secs = totalSeconds % 60;

  const hDisplay = hours > 0 ? `${hours.toString().padStart(2, '0')}:` : '';
  const mDisplay = mins.toString().padStart(2, '0');
  const sDisplay = secs.toString().padStart(2, '0');

  return `${hDisplay}${mDisplay}:${sDisplay}`;
};
