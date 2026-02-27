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
    .single();

  if (error) throw error;
  return data;
}

export async function deleteTodo(id: string): Promise<void> {
  const { error } = await supabase.from('todo').delete().eq('id', id);

  if (error) throw error;
}
