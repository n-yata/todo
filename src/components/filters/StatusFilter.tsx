import type { FilterState } from '../../types';

interface StatusFilterProps {
  status: FilterState['status'];
  onChange: (status: FilterState['status']) => void;
}

const OPTIONS: { value: FilterState['status']; label: string }[] = [
  { value: 'all', label: 'すべて' },
  { value: 'active', label: '未完了' },
  { value: 'completed', label: '完了済み' },
];

export function StatusFilter({ status, onChange }: StatusFilterProps) {
  return (
    <div className="flex gap-1 p-1 bg-gray-100 dark:bg-gray-700/50 rounded-xl">
      {OPTIONS.map((opt) => (
        <button
          key={opt.value}
          onClick={() => onChange(opt.value)}
          className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors
            ${status === opt.value
              ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
              : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
            }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}
