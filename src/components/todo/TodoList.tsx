import type { Category, Todo } from '../../types';
import { TodoItem } from './TodoItem';
import { EmptyState } from '../ui/EmptyState';

interface TodoListProps {
  todos: Todo[];
  allTodosCount: number;
  categories: Category[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onToggleComplete: (id: string) => void;
  onClearFilters: () => void;
  onAddTodo: () => void;
}

export function TodoList({
  todos,
  allTodosCount,
  categories,
  onEdit,
  onDelete,
  onToggleComplete,
  onClearFilters,
  onAddTodo,
}: TodoListProps) {
  const hasFilters = allTodosCount > 0 && todos.length === 0;
  const isEmpty = allTodosCount === 0;

  if (todos.length === 0) {
    return (
      <EmptyState
        hasFilters={hasFilters && !isEmpty}
        onClearFilters={onClearFilters}
        onAddTodo={isEmpty ? onAddTodo : undefined}
      />
    );
  }

  return (
    <ul className="flex flex-col gap-2">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          categories={categories}
          onEdit={() => onEdit(todo.id)}
          onDelete={() => onDelete(todo.id)}
          onToggleComplete={() => onToggleComplete(todo.id)}
        />
      ))}
    </ul>
  );
}
