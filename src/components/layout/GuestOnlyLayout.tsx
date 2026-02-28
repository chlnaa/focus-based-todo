import { useSession } from '@/stores/session';
import { Navigate, Outlet } from 'react-router';
import Navbar from '../header/Navbar';

export default function GuestOnlyLayout() {
  const session = useSession();
  if (session) return <Navigate to={'/'} replace={true} />;
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}
