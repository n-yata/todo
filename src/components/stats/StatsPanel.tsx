import { CheckCircle2, Circle, AlertCircle, Clock, ChevronDown, ChevronUp } from 'lucide-react';
import type { TodoStats } from '../../types';
import { StatCard } from './StatCard';
import { ProgressBar } from './ProgressBar';

interface StatsPanelProps {
  stats: TodoStats;
  isExpanded: boolean;
  onToggle: () => void;
}

export function StatsPanel({ stats, isExpanded, onToggle }: StatsPanelProps) {
  if (stats.total === 0) return null;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
      {/* Collapsed view - always show */}
      <div className="p-4 flex items-center gap-4">
        <div className="flex-1">
          <ProgressBar value={stats.completionRate} label={`完了率`} />
        </div>
        <button
          onClick={onToggle}
          className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
        >
          {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          {isExpanded ? '折りたたむ' : '詳細'}
        </button>
      </div>

      {/* Expanded view */}
      {isExpanded && (
        <div className="border-t border-gray-100 dark:border-gray-700 p-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <StatCard
              icon={<Circle size={20} />}
              value={stats.active}
              label="未完了"
              accent="blue"
            />
            <StatCard
              icon={<CheckCircle2 size={20} />}
              value={stats.completed}
              label="完了済み"
              accent="green"
            />
            <StatCard
              icon={<AlertCircle size={20} />}
              value={stats.overdue}
              label="期限超過"
              accent={stats.overdue > 0 ? 'red' : 'blue'}
            />
            <StatCard
              icon={<Clock size={20} />}
              value={stats.dueSoon}
              label="3日以内に期限"
              accent={stats.dueSoon > 0 ? 'amber' : 'blue'}
            />
          </div>
        </div>
      )}
    </div>
  );
}
