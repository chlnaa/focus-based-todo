import { signInWithPassword } from '@/api/auth';
import type { UseMutationCallback } from '@/types/types';
import { useMutation } from '@tanstack/react-query';

export default function useSignIn(callbacks?: UseMutationCallback) {
  return useMutation({
    mutationFn: signInWithPassword,
    onError: (error) => {
      if (callbacks?.onError) callbacks.onError(error);
    },
  });
}
