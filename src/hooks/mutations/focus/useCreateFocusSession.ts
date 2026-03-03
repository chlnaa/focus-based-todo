import { createFocusSession } from '@/api/focus';
import { focusKeys } from '@/constants/queryKeys';
import { useSession } from '@/stores/session';
import type { UseMutationCallback } from '@/types/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useCreateFocusSession(callbacks?: UseMutationCallback) {
  const queryClient = useQueryClient();
  const session = useSession();
  const userId = session?.user.id;

  return useMutation({
    mutationFn: createFocusSession,

    onSuccess: async (newSession) => {
      if (!userId) return;

      const dateKey = newSession.start_time.split('T')[0];

      await queryClient.invalidateQueries({
        queryKey: focusKeys.byDate(userId, dateKey),
      });

      callbacks?.onSuccess?.();
    },

    onError: (error: any) => {
      callbacks?.onError?.(error);
    },
  });
}
