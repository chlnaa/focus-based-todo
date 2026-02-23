import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { Link } from 'react-router';

export default function SignUpPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-xl font-bold">Sign Up</h1>
      <form className="flex flex-col gap-2" action="submit">
        <Input
          className="py-6"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="example@abc.com"
        />
        <Input
          className="py-6"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="password"
        />
        <Button className="w-full">Sign Up</Button>
      </form>
      <div>
        <Link className="text-muted-foreground hover:underline" to={'/sign-in'}>
          Already have an account? Log in
        </Link>
      </div>
    </div>
  );
}
