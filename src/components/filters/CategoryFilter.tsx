import type { Category } from '../../types';

interface CategoryFilterProps {
  categories: Category[];
  selected: string[];
  onToggle: (id: string) => void;
}

export function CategoryFilter({ categories, selected, onToggle }: CategoryFilterProps) {
  return (
    <div className="flex gap-1.5 flex-wrap">
      {categories.map((cat) => {
        const isSelected = selected.includes(cat.id);
        return (
          <button
            key={cat.id}
            onClick={() => onToggle(cat.id)}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium border transition-colors
              ${isSelected
                ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-blue-400 dark:border-blue-600'
                : 'bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 border-gray-200 dark:border-gray-700 hover:border-gray-300'
              }`}
          >
            <span className={`w-2 h-2 rounded-full ${cat.color}`} />
            {cat.name}
          </button>
        );
      })}
    </div>
  );
}
