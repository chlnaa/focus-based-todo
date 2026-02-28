export const todoKeys = {
  all: ['todo'] as const,

  allTodos: (userId: string) => [...todoKeys.all, 'all', userId] as const,

  byDate: (date: string) => [...todoKeys.all, 'date', date] as const,

  detail: (id: string) => [...todoKeys.all, 'detail', id] as const,
};
