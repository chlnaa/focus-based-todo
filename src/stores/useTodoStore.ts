import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import dayjs from 'dayjs';

interface TodoUIState {
  selectedDate: string;
  setSelectedDate: (date: string) => void;
}

export const useTodoStore = create<TodoUIState>()(
  devtools((set) => ({
    selectedDate: dayjs().format('YYYY-MM-DD'),
    setSelectedDate: (date: string) => set({ selectedDate: date }),
  })),
);

export const useSelectedDate = () =>
  useTodoStore((store) => store.selectedDate);

export const useSetSelectedDate = () =>
  useTodoStore((store) => store.setSelectedDate);
