import { useSession } from '@/stores/session';
import { Navigate, Outlet } from 'react-router';

export default function AuthGuardLayout() {
  const session = useSession();

  if (!session) {
    return <Navigate to="/sign-in" replace />;
  }

  return <Outlet />;
}
