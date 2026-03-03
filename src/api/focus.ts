import supabase from '@/lib/supabase';
import type { FocusInsert } from '@/types/types';

export async function createFocusSession(session: FocusInsert) {
  const { data, error } = await supabase
    .from('focus_sessions')
    .insert(session)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function getFocusSessionsByDate(userId: string, date: string) {
  const { data, error } = await supabase
    .from('focus_sessions')
    .select('*')
    .eq('user_id', userId)
    .gte('start_time', `${date}T00:00:00`)
    .lt('start_time', `${date}T23:59:59`)
    .order('start_time', { ascending: false });

  if (error) throw error;
  return data;
}
