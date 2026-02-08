import { create } from 'zustand';
import {
  combine,
  createJSONStorage,
  devtools,
  persist,
} from 'zustand/middleware';
import type { Todo } from '../types/types';
import dayjs from 'dayjs';

const initialTodos: Todo[] = [];

export const useTodoStore = create(
  persist(
    devtools(
      combine(
        {
          todos: initialTodos,
          selectedDate: dayjs().format('YYYY-MM-DD'),
          currentFocusTodoId: null as string | null,
        },

        (set) => ({
          addTodo: (text: string, date: string) => {
            const newTodo: Todo = {
              id: crypto.randomUUID(),
              text,
              date,
              createdAt: Date.now(),
              status: 'active',
              totalFocusTime: 0,
            };

            set(
              (state) => ({
                todos: [newTodo, ...state.todos],
              }),
              false,
              'todo/add',
            );
          },

          updateTodo: (id: string, updates: Partial<Todo>) => {
            set(
              (state) => ({
                todos: state.todos.map((todo) =>
                  todo.id === id ? { ...todo, ...updates } : todo,
                ),
              }),
              false,
              'todo/update',
            );
          },

          deleteTodo: (id: string) => {
            set(
              (state) => ({
                todos: state.todos.filter((todo) => todo.id !== id),
              }),
              false,
              'todo/delete',
            );
          },

          toggleTodo: (id: string) => {
            set(
              (state) => ({
                todos: state.todos.map((todo) =>
                  todo.id === id
                    ? {
                        ...todo,
                        status:
                          todo.status === 'active' ? 'completed' : 'active',
                      }
                    : todo,
                ),
              }),
              false,
              'todo/toggle',
            );
          },

          setSelectedDate: (date: string) => set({ selectedDate: date }),

          addFocusTime: (id: string, seconds: number) => {
            set(
              (state) => ({
                todos: state.todos.map((todo) =>
                  todo.id === id
                    ? {
                        ...todo,
                        totalFocusTime: (todo.totalFocusTime || 0) + seconds,
                      }
                    : todo,
                ),
              }),
              false,
              'todo/addFocusTime',
            );
          },
        }),
      ),
      { name: 'TodoStore' },
    ),
    {
      name: 'todo-storage',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export const useTodo = () => useTodoStore((store) => store.todos);

export const useAddTodo = () => useTodoStore((store) => store.addTodo);

export const useUpdateTodo = () => useTodoStore((store) => store.updateTodo);

export const useDeleteTodo = () => useTodoStore((store) => store.deleteTodo);

export const useToggleTodo = () => useTodoStore((store) => store.toggleTodo);

export const useSelectedDate = () =>
  useTodoStore((store) => store.selectedDate);

export const useSetSelectedDate = () =>
  useTodoStore((store) => store.setSelectedDate);

export const useAddFocusTime = () =>
  useTodoStore((store) => store.addFocusTime);
