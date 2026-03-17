export const todoKeys = {
  all: ['todo'] as const,

  allTodos: (userId: string) => [...todoKeys.all, 'all', userId] as const,

  dateRoot: () => [...todoKeys.all, 'date'] as const,

  byDate: (date: string, userId: string) =>
    [...todoKeys.all, 'date', date, userId] as const,

  byId: (id: string) => [...todoKeys.all, 'item', id] as const,
};

export const focusKeys = {
  root: ['focus'] as const,

  all: (userId: string) => [...focusKeys.root, userId] as const,

  weekly: (userId: string, from: string, to: string) =>
    [...focusKeys.all(userId), 'daily', from, to] as const,

  byDate: (userId: string, date: string) =>
    [...focusKeys.all(userId), 'date', date] as const,

  total: (userId: string) => [...focusKeys.all(userId), 'total'] as const,

  todo: (userId: string, todoId: string) =>
    [...focusKeys.all(userId), 'todo', todoId] as const,
};
