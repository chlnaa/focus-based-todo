export const todoKeys = {
  base: ['todo'] as const,

  byDate: (date: string) => [...todoKeys.base, date] as const,
};
