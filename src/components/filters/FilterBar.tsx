import { RotateCcw, AlertCircle } from 'lucide-react';
import type { Category, FilterState, SortState, Priority, SortField } from '../../types';
import { SearchInput } from './SearchInput';
import { StatusFilter } from './StatusFilter';
import { PriorityFilter } from './PriorityFilter';
import { CategoryFilter } from './CategoryFilter';
import { SortControl } from './SortControl';

interface FilterBarProps {
  filters: FilterState;
  sort: SortState;
  categories: Category[];
  activeFilterCount: number;
  onSearchChange: (q: string) => void;
  onStatusChange: (s: FilterState['status']) => void;
  onPriorityToggle: (p: Priority) => void;
  onCategoryToggle: (id: string) => void;
  onOverdueToggle: () => void;
  onSortField: (field: SortField) => void;
  onReset: () => void;
}

export function FilterBar({
  filters, sort, categories, activeFilterCount,
  onSearchChange, onStatusChange, onPriorityToggle, onCategoryToggle,
  onOverdueToggle, onSortField, onReset,
}: FilterBarProps) {
  return (
    <div className="flex flex-col gap-3 p-4 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm">
      {/* Row 1: Search + Reset */}
      <div className="flex gap-2 items-center">
        <SearchInput value={filters.searchQuery} onChange={onSearchChange} />
        {activeFilterCount > 0 && (
          <button
            onClick={onReset}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700 transition-colors whitespace-nowrap"
          >
            <RotateCcw size={13} />
            リセット
            <span className="bg-blue-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-[10px]">
              {activeFilterCount}
            </span>
          </button>
        )}
      </div>

      {/* Row 2: Filters + Sort */}
      <div className="flex gap-3 flex-wrap items-center">
        <StatusFilter status={filters.status} onChange={onStatusChange} />
        <div className="w-px h-5 bg-gray-200 dark:bg-gray-700 hidden sm:block" />
        <PriorityFilter selected={filters.priorities} onToggle={onPriorityToggle} />
        {categories.length > 0 && (
          <>
            <div className="w-px h-5 bg-gray-200 dark:bg-gray-700 hidden sm:block" />
            <CategoryFilter categories={categories} selected={filters.categoryIds} onToggle={onCategoryToggle} />
          </>
        )}
        <div className="w-px h-5 bg-gray-200 dark:bg-gray-700 hidden sm:block" />
        <button
          onClick={onOverdueToggle}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium border transition-colors
            ${filters.showOverdueOnly
              ? 'bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 border-red-400'
              : 'bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 border-gray-200 dark:border-gray-700 hover:border-gray-300'
            }`}
        >
          <AlertCircle size={12} />
          期限超過
        </button>
        <div className="ml-auto">
          <SortControl sort={sort} onSortField={onSortField} />
        </div>
      </div>
    </div>
  );
}
