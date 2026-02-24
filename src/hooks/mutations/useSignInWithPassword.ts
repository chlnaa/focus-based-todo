import { signInWithPassword } from '@/api/auth';
import { useMutation } from '@tanstack/react-query';

export default function useSignInWithPassword() {
  return useMutation({
    mutationFn: signInWithPassword,
  });
}
