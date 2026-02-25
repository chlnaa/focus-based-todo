import type { Session } from '@supabase/supabase-js';
import { create } from 'zustand';
import { combine, devtools } from 'zustand/middleware';

type State = {
  isLoaded: boolean;
  session: Session | null;
};

const initialState = {
  isLoaded: false,
  session: null,
} as State;

const useSessionStore = create(
  devtools(
    combine(initialState, (set) => ({
      actions: {
        setSession: (session: Session | null) =>
          set({ session, isLoaded: true }),
      },
    })),
    {
      name: 'sessionStore',
    },
  ),
);

export const useSession = () => useSessionStore((store) => store.session);

export const useIsSessionLoaded = () =>
  useSessionStore((store) => store.isLoaded);

export const useSetSession = () =>
  useSessionStore((store) => store.actions.setSession);
