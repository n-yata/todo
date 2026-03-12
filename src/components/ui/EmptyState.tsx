import { ClipboardList, SearchX } from 'lucide-react';

interface EmptyStateProps {
  hasFilters: boolean;
  onClearFilters?: () => void;
  onAddTodo?: () => void;
}

export function EmptyState({ hasFilters, onClearFilters, onAddTodo }: EmptyStateProps) {
  if (hasFilters) {
    return (
      <div className="flex flex-col items-center justify-center py-16 gap-3 text-center">
        <SearchX className="text-gray-300 dark:text-gray-600" size={48} />
        <p className="text-gray-500 dark:text-gray-400 font-medium">条件に一致するTODOが見つかりません</p>
        {onClearFilters && (
          <button
            onClick={onClearFilters}
            className="text-sm text-blue-500 hover:underline"
          >
            フィルターをリセット
          </button>
        )}
      </div>
    );
  }
  return (
    <div className="flex flex-col items-center justify-center py-16 gap-3 text-center">
      <ClipboardList className="text-gray-300 dark:text-gray-600" size={48} />
      <p className="text-gray-500 dark:text-gray-400 font-medium">TODOがありません</p>
      <p className="text-gray-400 dark:text-gray-500 text-sm">新しいTODOを追加してみましょう</p>
      {onAddTodo && (
        <button
          onClick={onAddTodo}
          className="text-sm text-blue-500 hover:underline"
        >
          TODOを追加する
        </button>
      )}
    </div>
  );
}
