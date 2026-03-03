export const todoKeys = {
  all: ['todo'] as const,

  allTodos: (userId: string) => [...todoKeys.all, 'all', userId] as const,

  dateRoot: () => [...todoKeys.all, 'date'] as const,

  byDate: (date: string, userId: string) =>
    [...todoKeys.all, 'date', date, userId] as const,

  byId: (id: string) => [...todoKeys.all, 'item', id] as const,
};

export const focusKeys = {
  all: (userId: string) => ['focus', userId] as const,

  byDate: (userId: string, date: string) =>
    [...focusKeys.all(userId), 'date', date] as const,
};
