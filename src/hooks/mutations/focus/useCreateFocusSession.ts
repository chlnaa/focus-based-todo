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

    onSuccess: async () => {
      if (!userId) return;

      await queryClient.invalidateQueries({
        queryKey: focusKeys.root,
      });

      callbacks?.onSuccess?.();
    },

    onError: (error: any) => {
      callbacks?.onError?.(error);
    },
  });
}
