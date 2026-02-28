import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import useRequestPasswordResetEmail from '@/hooks/mutations/auth/useRequestPasswordResetEmail';
import { useState } from 'react';
import { toast } from 'sonner';

export default function ForgetPasswordPage() {
  const [email, setEmail] = useState('');

  const {
    mutate: requestPasswordResetEmail,
    isPending: isRequestPasswordResetEmailPending,
  } = useRequestPasswordResetEmail({
    onSuccess: () => {
      toast.info('We’ve sent a verification link to your email.');
      setEmail('');
    },
    onError: (error) => {
      toast.error(error.message);
      setEmail('');
    },
  });

  const handleSendEmailClick = () => {
    if (email.trim() === '') return;
    requestPasswordResetEmail(email);
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-1">
        <h2 className="text-xl font-bold">Forgot password?</h2>
        <p>We have sent a password reset link to your email address.</p>
      </div>
      <Input
        className="py-6"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={isRequestPasswordResetEmailPending}
        placeholder="example@abc.com"
      />
      <Button
        className="w-full"
        onClick={handleSendEmailClick}
        disabled={isRequestPasswordResetEmailPending}
      >
        Resend verification email
      </Button>
    </div>
  );
}
