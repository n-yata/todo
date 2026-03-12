import type { Todo, Category, TodoStats, Priority } from '../types';
import { getToday, getThreeDaysFromNow } from './dateUtils';

export function computeStats(todos: Todo[], _categories: Category[]): TodoStats {
  const today = getToday();
  const threeDays = getThreeDaysFromNow();

  const completed = todos.filter((t) => t.status === 'completed').length;
  const active = todos.filter((t) => t.status === 'active').length;
  const overdue = todos.filter(
    (t) => t.status === 'active' && t.dueDate !== undefined && t.dueDate < today
  ).length;
  const dueSoon = todos.filter(
    (t) =>
      t.status === 'active' &&
      t.dueDate !== undefined &&
      t.dueDate >= today &&
      t.dueDate <= threeDays
  ).length;

  const completionRate = todos.length === 0 ? 0 : Math.round((completed / todos.length) * 100);

  const byPriority: Record<Priority, number> = {
    low: 0, medium: 0, high: 0, urgent: 0,
  };
  todos.forEach((t) => { byPriority[t.priority]++; });

  const byCategory: Record<string, number> = {};
  todos.forEach((t) => {
    t.categoryIds.forEach((cid) => {
      byCategory[cid] = (byCategory[cid] ?? 0) + 1;
    });
  });

  return { total: todos.length, completed, active, overdue, completionRate, byPriority, byCategory, dueSoon };
}
