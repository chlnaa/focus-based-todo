export default function EmptyTodo() {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
      <p className="text-lg font-medium">No tasks for today</p>
      <p className="text-sm mt-1">Add your first todo and start focusing ✨</p>
    </div>
  );
}
