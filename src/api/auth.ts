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
