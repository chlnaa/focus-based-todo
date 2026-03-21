import { create } from 'zustand';
import { combine, devtools } from 'zustand/middleware';
import type { Session as SupabaseSession } from '@supabase/supabase-js';

type Session = {
  user: {
    id: string;
    email?: string;
  };
};

type State = {
  isLoaded: boolean;
  session: Session | null;
};

const initialState: State = {
  isLoaded: false,
  session: null,
};

function mapSession(session: SupabaseSession | null): Session | null {
  if (!session) return null;

  return {
    user: {
      id: session.user.id,
      email: session.user.email ?? undefined,
    },
  };
}

const useSessionStore = create(
  devtools(
    combine(initialState, (set) => ({
      actions: {
        setSession: (session: SupabaseSession | null) =>
          set({ session: mapSession(session), isLoaded: true }),
      },
    })),
    {
      name: 'sessionStore',
      enabled: import.meta.env.DEV,
    },
  ),
);

export const useSession = () => useSessionStore((store) => store.session);

export const useIsSessionLoaded = () =>
  useSessionStore((store) => store.isLoaded);

export const useSetSession = () =>
  useSessionStore((store) => store.actions.setSession);
