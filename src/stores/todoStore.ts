import { create } from 'zustand';
import { combine, devtools } from 'zustand/middleware';
import type { Todo } from '../types/types';

const initialTodos: Todo[] = [
  {
    id: '1',
    text: 'study to Zustand',
    date: '2026-01-19',
    createdAt: Date.now() - 10000,
    status: 'active',
    totalFocusTime: 0,
  },
  {
    id: '2',
    text: 'study to React',
    date: '2026-01-19',
    createdAt: Date.now() - 20000,
    status: 'completed',
    totalFocusTime: 1800,
  },
];

export const useTodoStore = create(
  devtools(
    combine(
      { todos: initialTodos },

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
                      status: todo.status === 'active' ? 'completed' : 'active',
                    }
                  : todo,
              ),
            }),
            false,
            'todo/toggle',
          );
        },
      }),
    ),
    { name: 'TodoStore' },
  ),
);

export const useTodo = () => useTodoStore((store) => store.todos);

export const useAddTodo = () => useTodoStore((store) => store.addTodo);

export const useUpdateTodo = () => useTodoStore((store) => store.updateTodo);

export const useDeleteTodo = () => useTodoStore((store) => store.deleteTodo);
