type CursorPaginationParams<T> = {
  query: any;
  cursor?: string;
  field: keyof T;
  limit?: number;
};

export default async function createCursorPagination<T>({
  query,
  cursor,
  field,
  limit = 10,
}: CursorPaginationParams<T>) {
  let q = query.order(field, { ascending: false }).limit(limit);

  if (cursor) {
    q = q.lt(field, cursor);
  }

  const { data, error } = await q;

  if (error) throw error;

  return {
    data,
    nextCursor: data && data.length > 0 ? data[data.length - 1][field] : null,
  };
}
