import { useSession } from '@/stores/session';
import { Navigate, Outlet } from 'react-router';
import Navbar from '../header/Navbar';

export default function MemberOnlyLayout() {
  const session = useSession();
  if (!session) return <Navigate to={'/sign-in'} replace={true} />;

  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}
