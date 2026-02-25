import supabase from '@/lib/supabase';

type AuthParams = {
  email: string;
  password: string;
};

export async function signUp({ email, password }: AuthParams) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) throw error;
  return data;
}

export async function signInWithPassword({ email, password }: AuthParams) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;
  return data;
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();

  if (error) {
    await supabase.auth.signOut({
      scope: 'local',
    });
  }
}

export async function requestPasswordResetEmail(email: AuthParams['email']) {
  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${import.meta.env.VITE_PUBLIC_URL}/reset-password`,
  });

  if (error) throw error;
  return data;
}

export async function updatePassword(password: AuthParams['password']) {
  const { data, error } = await supabase.auth.updateUser({
    password,
  });

  if (error) throw error;
  return data;
}
