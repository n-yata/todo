import { ArrowUp, ArrowDown } from 'lucide-react';
import type { SortField, SortState } from '../../types';

interface SortControlProps {
  sort: SortState;
  onSortField: (field: SortField) => void;
}

const SORT_OPTIONS: { value: SortField; label: string }[] = [
  { value: 'createdAt', label: '作成日' },
  { value: 'dueDate', label: '期限日' },
  { value: 'priority', label: '優先度' },
  { value: 'title', label: 'タイトル' },
];

export function SortControl({ sort, onSortField }: SortControlProps) {
  return (
    <div className="flex items-center gap-1">
      <select
        value={sort.field}
        onChange={(e) => onSortField(e.target.value as SortField)}
        className="px-2.5 py-1 text-xs rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
      >
        {SORT_OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
      <button
        onClick={() => onSortField(sort.field)}
        className="p-1.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
        title={sort.direction === 'asc' ? '昇順' : '降順'}
      >
        {sort.direction === 'asc' ? <ArrowUp size={14} /> : <ArrowDown size={14} />}
      </button>
    </div>
  );
}
