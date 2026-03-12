import { Sun, Moon, Plus, CheckSquare } from 'lucide-react';

interface HeaderProps {
  isDark: boolean;
  onToggleDark: () => void;
  totalCount: number;
  activeCount: number;
  onAddTodo: () => void;
}

export function Header({ isDark, onToggleDark, totalCount, activeCount, onAddTodo }: HeaderProps) {
  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40 shadow-sm">
      <div className="max-w-3xl mx-auto px-4 py-3 flex items-center gap-3">
        {/* Logo & Title */}
        <div className="flex items-center gap-2">
          <CheckSquare className="text-blue-600 dark:text-blue-400" size={22} />
          <div>
            <h1 className="text-lg font-bold text-gray-900 dark:text-white leading-none">TodoFlow</h1>
            <p className="text-xs text-gray-400 dark:text-gray-500 leading-none">stay organized</p>
          </div>
        </div>

        {/* Stats chips */}
        {totalCount > 0 && (
          <div className="flex gap-2 ml-2">
            <span className="px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 text-xs font-medium">
              {activeCount} 件未完了
            </span>
            <span className="px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs font-medium">
              {totalCount} 件合計
            </span>
          </div>
        )}

        {/* Right actions */}
        <div className="flex items-center gap-2 ml-auto">
          <button
            onClick={onToggleDark}
            className="p-2 rounded-xl text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            aria-label={isDark ? 'ライトモードに切り替え' : 'ダークモードに切り替え'}
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button
            onClick={onAddTodo}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium transition-colors shadow-sm"
          >
            <Plus size={16} />
            <span className="hidden sm:inline">新しいTODO</span>
            <span className="sm:hidden">追加</span>
          </button>
        </div>
      </div>
    </header>
  );
}
