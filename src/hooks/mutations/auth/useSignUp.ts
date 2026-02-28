import { signUp } from '@/api/auth';
import { useMutation } from '@tanstack/react-query';

export default function useSignUp() {
  return useMutation({
    mutationFn: signUp,
  });
}
