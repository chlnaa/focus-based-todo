import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useUpdatePassword } from '@/hooks/mutations/useUpdatePassword';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';

export default function ResetPasswordPage() {
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const { mutate: updatePassword, isPending: isUpdatePasswordPending } =
    useUpdatePassword({
      onSuccess: () => {
        toast.info('Password changed successfully.');
        navigate('/');
      },
      onError: (error) => {
        toast.error(error.message);
        setPassword('');
      },
    });

  const handleSendPasswordClick = () => {
    if (password.trim() === '') return;
    updatePassword(password);
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-1">
        <h2 className="text-xl font-bold">Reset Password</h2>
        <p>Please set a new password.</p>
      </div>
      <Input
        className="py-6"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        disabled={isUpdatePasswordPending}
        placeholder="password"
      />
      <Button
        className="w-full"
        onClick={handleSendPasswordClick}
        disabled={isUpdatePasswordPending}
      >
        Change Password
      </Button>
    </div>
  );
}
