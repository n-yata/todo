import { Pencil, Trash2, Calendar } from 'lucide-react';
import type { Category, Todo } from '../../types';
import { PRIORITY_CONFIG } from '../../types';
import { Badge } from '../ui/Badge';
import { formatDueDate, getDueDateColor, isOverdue } from '../../utils/dateUtils';

interface TodoItemProps {
  todo: Todo;
  categories: Category[];
  onEdit: () => void;
  onDelete: () => void;
  onToggleComplete: () => void;
}

export function TodoItem({ todo, categories, onEdit, onDelete, onToggleComplete }: TodoItemProps) {
  const isCompleted = todo.status === 'completed';
  const overdueFlag = isOverdue(todo.dueDate, todo.status);
  const priorityCfg = PRIORITY_CONFIG[todo.priority];
  const todoCategories = categories.filter((c) => todo.categoryIds.includes(c.id));
  const dueDateColor = getDueDateColor(todo.dueDate, todo.status);

  return (
    <li className={`group flex items-start gap-3 p-4 rounded-xl border transition-all duration-150
      bg-white dark:bg-gray-800
      ${overdueFlag
        ? 'border-red-200 dark:border-red-800/50'
        : 'border-gray-200 dark:border-gray-700'
      }
      hover:border-gray-300 dark:hover:border-gray-600 hover:shadow-sm`}
    >
      {/* Checkbox */}
      <button
        onClick={onToggleComplete}
        className={`mt-0.5 shrink-0 w-5 h-5 rounded-full border-2 transition-all duration-150 flex items-center justify-center
          ${isCompleted
            ? 'bg-green-500 border-green-500'
            : 'border-gray-300 dark:border-gray-500 hover:border-blue-400'
          }`}
        aria-label={isCompleted ? '未完了に戻す' : '完了にする'}
      >
        {isCompleted && (
          <svg viewBox="0 0 12 10" fill="none" className="w-3 h-3">
            <path d="M1 5l3.5 3.5L11 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </button>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <p className={`font-medium text-sm leading-snug break-words
            ${isCompleted ? 'line-through text-gray-400 dark:text-gray-500' : 'text-gray-900 dark:text-white'}`}
          >
            {todo.title}
          </p>
          {/* Actions - visible on hover */}
          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
            <button
              onClick={onEdit}
              className="p-1.5 rounded-lg text-gray-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors"
              aria-label="編集"
            >
              <Pencil size={14} />
            </button>
            <button
              onClick={onDelete}
              className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors"
              aria-label="削除"
            >
              <Trash2 size={14} />
            </button>
          </div>
        </div>

        {todo.description && (
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">{todo.description}</p>
        )}

        <div className="flex items-center gap-1.5 mt-2 flex-wrap">
          {/* Priority badge */}
          <Badge className={`${priorityCfg.bgColor} ${priorityCfg.textColor}`}>
            {priorityCfg.label}
          </Badge>

          {/* Category badges */}
          {todoCategories.map((cat) => (
            <Badge key={cat.id} className="bg-gray-100 dark:bg-gray-700">
              <span className={`inline-block w-2 h-2 rounded-full ${cat.color}`} />
              <span className="text-gray-600 dark:text-gray-300">{cat.name}</span>
            </Badge>
          ))}

          {/* Due date */}
          {todo.dueDate && (
            <span className={`flex items-center gap-1 text-xs ${dueDateColor}`}>
              <Calendar size={11} />
              {formatDueDate(todo.dueDate)}
              {overdueFlag && ' (期限超過)'}
            </span>
          )}
        </div>
      </div>
    </li>
  );
}
