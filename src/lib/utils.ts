import type { Todo } from '@/types/types';
import { clsx, type ClassValue } from 'clsx';
import dayjs from 'dayjs';
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

  const fullTimeDisplay =
    Number(hours) > 0 ? `${hours}h:${minutes}m` : `${minutes}m:${seconds}s`;
  return { fullTimeDisplay, hours, minutes, seconds };
};

export const getDayStats = (dayTodos: Todo[]) => {
  const totalCount = dayTodos.length;

  const totalFocusSeconds = dayTodos.reduce(
    (acc, todo) => acc + (todo.totalFocusTime || 0),
    0,
  );

  const completedCount = dayTodos.filter(
    (todo) => todo.status === 'completed',
  ).length;

  const completionRate =
    dayTodos.length > 0
      ? Math.floor((completedCount / dayTodos.length) * 100)
      : 0;

  return {
    totalCount,
    totalFocusSeconds,
    completionRate,
    completedCount,
  };
};

export const isToday = (date: string | Date | number): boolean => {
  return dayjs(date).isSame(dayjs(), 'day');
};
