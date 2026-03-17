import supabase from '@/lib/supabase';
import type { FocusInsert } from '@/types/types';
import dayjs from 'dayjs';

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

export async function getTodayFocusTime(userId: string, date: string) {
  const start = dayjs(date).startOf('day').toDate();
  const end = dayjs(date).add(1, 'day').startOf('day').toDate();

  const { data, error } = await supabase
    .from('focus_sessions')
    .select('duration')
    .eq('user_id', userId)
    .gte('start_time', start.toISOString())
    .lt('start_time', end.toISOString());

  if (error) throw error;
  return data?.reduce((sum, row) => sum + row.duration, 0) ?? 0;
}

export async function getTodoFocusTime(todoId: string) {
  const { data, error } = await supabase
    .from('focus_sessions')
    .select('duration')
    .eq('todo_id', todoId);

  if (error) throw error;

  const total = data?.reduce((acc, curr) => acc + curr.duration, 0) ?? 0;
  return total;
}

export async function getDailyAggregation(
  userId: string,
  from: string,
  to: string,
) {
  const start = dayjs(from).startOf('day').toISOString();
  const end = dayjs(to).add(1, 'day').startOf('day').toISOString();

  const { data, error } = await supabase
    .from('focus_sessions')
    .select('start_time, duration')
    .eq('user_id', userId)
    .gte('start_time', start)
    .lt('start_time', end);

  if (error) throw error;

  const map: Record<string, number> = {};

  data?.forEach((session) => {
    const date = dayjs(session.start_time).format('YYYY-MM-DD');
    map[date] = (map[date] || 0) + session.duration;
  });

  return map;
}

export async function getAllDailyAggregation(userId: string) {
  const { data, error } = await supabase
    .from('focus_sessions')
    .select('start_time, duration')
    .eq('user_id', userId);

  if (error) throw error;

  const map: Record<string, number> = {};

  data?.forEach((session) => {
    const date = dayjs(session.start_time).format('YYYY-MM-DD');
    map[date] = (map[date] || 0) + session.duration;
  });

  return map;
}
