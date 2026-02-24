import supabase from '@/lib/supabase';

type SignUpParams = {
  email: string;
  password: string;
};

export async function signUp({ email, password }: SignUpParams) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) throw error;
  return data;
}
