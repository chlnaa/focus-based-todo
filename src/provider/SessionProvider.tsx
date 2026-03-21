import GlobalLoader from '@/components/GlobalLoader';
import supabase from '@/lib/supabase';
import { useIsSessionLoaded, useSetSession } from '@/stores/session';
import type { ReactNode } from 'react';
import { useEffect } from 'react';

interface SessionProviderProps {
  children: ReactNode;
}

export default function SessionProvider({ children }: SessionProviderProps) {
  const setSession = useSetSession();
  const isSessionLoaded = useIsSessionLoaded();

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
    });

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      },
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, [setSession]);

  if (!isSessionLoaded) return <GlobalLoader />;

  return <>{children}</>;
}
