import createCursorPagination from '@/lib/pagination';
import supabase from '@/lib/supabase';
import type { TodoEntity, TodoInsert } from '@/types/types';

export async function getAllTodos(userId: string): Promise<TodoEntity[]> {
  const { data, error } = await supabase
    .from('todo')
    .select('*')
    .eq('user_id', userId)
    .order('date', { ascending: false });

  if (error) throw error;
  return data;
}

export async function getTodosByDate(
  date: string,
  userId: string,
): Promise<TodoEntity[]> {
  const { data, error } = await supabase
    .from('todo')
    .select('*')
    .eq('user_id', userId)
    .eq('date', date)
    .order('created_at', { ascending: true });

  if (error) throw error;

  return data ?? [];
}

export async function getTodoById(id: string): Promise<TodoEntity> {
  const { data, error } = await supabase
    .from('todo')
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw error;
  return data;
}

export async function createTodo(payload: TodoInsert): Promise<TodoEntity> {
  const { data, error } = await supabase
    .from('todo')
    .insert(payload)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateTodo(
  id: string,
  updates: Partial<TodoEntity>,
): Promise<TodoEntity> {
  const { data, error } = await supabase
    .from('todo')
    .update(updates)
    .eq('id', id)
    .select()
    .maybeSingle();

  if (error) throw error;

  if (!data) {
    throw new Error('Update failed: no data returned');
  }

  return data;
}

export async function deleteTodo(id: string): Promise<void> {
  const { error } = await supabase.from('todo').delete().eq('id', id);

  if (error) throw error;
}

export async function fetchInfiniteTodayTodos({
  pageParam,
  date,
  userId,
}: {
  pageParam?: string;
  date: string;
  userId: string;
}) {
  if (!userId) throw new Error('userId is required');
  const query = supabase
    .from('todo')
    .select('*')
    .eq('user_id', userId)
    .eq('date', date);
  return createCursorPagination<TodoEntity>({
    query,
    cursor: pageParam,
    field: 'created_at',
    limit: 10,
  });
}
