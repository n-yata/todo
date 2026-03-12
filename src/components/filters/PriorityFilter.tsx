import type { Priority } from '../../types';
import { PRIORITY_CONFIG } from '../../types';

interface PriorityFilterProps {
  selected: Priority[];
  onToggle: (p: Priority) => void;
}

export function PriorityFilter({ selected, onToggle }: PriorityFilterProps) {
  return (
    <div className="flex gap-1.5 flex-wrap">
      {(Object.keys(PRIORITY_CONFIG) as Priority[]).map((p) => {
        const cfg = PRIORITY_CONFIG[p];
        const isSelected = selected.includes(p);
        return (
          <button
            key={p}
            onClick={() => onToggle(p)}
            className={`px-2.5 py-1 rounded-lg text-xs font-medium border transition-colors
              ${isSelected
                ? `${cfg.bgColor} ${cfg.textColor} ${cfg.borderColor}`
                : 'bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 border-gray-200 dark:border-gray-700 hover:border-gray-300'
              }`}
          >
            {cfg.label}
          </button>
        );
      })}
    </div>
  );
}
