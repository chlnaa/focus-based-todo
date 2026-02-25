import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import useSignIn from '@/hooks/mutations/useSignIn';
import { useState } from 'react';
import { Link } from 'react-router';
import { toast } from 'sonner';

export default function SignInPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { mutate: signInWithPassword } = useSignIn({
    onError: (error) => {
      toast.error(error.message);
      setPassword('');
    },
  });

  const handleSignInClick = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) return;
    signInWithPassword({
      email,
      password,
    });
  };

  return (
    <div className="flex flex-col gap-8">
      <h2 className="text-xl font-bold">Sign In</h2>
      <form className="flex flex-col gap-2" onSubmit={handleSignInClick}>
        <label htmlFor="email">Email</label>
        <Input
          className="py-6"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="example@abc.com"
          required
        />
        <label htmlFor="password">Password</label>
        <Input
          className="py-6"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="password"
        />
        <Button className="w-full" type="submit">
          Sign In
        </Button>
      </form>
      <div className="flex flex-col gap-2">
        <Link className="text-muted-foreground hover:underline" to={'/sign-up'}>
          Don't have an account? Sign Up
        </Link>
        <Link
          className="text-muted-foreground hover:underline"
          to={'/forget-password'}
        >
          Forgot password?
        </Link>
      </div>
    </div>
  );
}
