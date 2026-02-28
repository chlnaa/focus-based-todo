import { requestPasswordResetEmail } from '@/api/auth';
import type { UseMutationCallback } from '@/types/types';
import { useMutation } from '@tanstack/react-query';

export default function useRequestPasswordResetEmail(
  callbacks?: UseMutationCallback,
) {
  return useMutation({
    mutationFn: requestPasswordResetEmail,
    onSuccess: () => {
      if (callbacks?.onSuccess) callbacks.onSuccess();
    },
    onError: (error) => {
      if (callbacks?.onError) callbacks.onError(error);
    },
  });
}
