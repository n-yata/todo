import type { Todo, Category, FilterState, SortState, Priority } from '../types';
import { getToday } from './dateUtils';

const PRIORITY_WEIGHT: Record<Priority, number> = {
  low: 1, medium: 2, high: 3, urgent: 4,
};

function filterBySearch(todos: Todo[], query: string): Todo[] {
  if (!query.trim()) return todos;
  const q = query.trim().toLowerCase();
  return todos.filter(
    (t) => t.title.toLowerCase().includes(q) || (t.description ?? '').toLowerCase().includes(q)
  );
}

function filterByStatus(todos: Todo[], status: FilterState['status']): Todo[] {
  if (status === 'all') return todos;
  return todos.filter((t) => t.status === status);
}

function filterByPriorities(todos: Todo[], priorities: Priority[]): Todo[] {
  if (priorities.length === 0) return todos;
  return todos.filter((t) => priorities.includes(t.priority));
}

function filterByCategories(todos: Todo[], categoryIds: string[]): Todo[] {
  if (categoryIds.length === 0) return todos;
  return todos.filter((t) => t.categoryIds.some((cid) => categoryIds.includes(cid)));
}

function filterByOverdue(todos: Todo[], showOverdueOnly: boolean): Todo[] {
  if (!showOverdueOnly) return todos;
  const today = getToday();
  return todos.filter(
    (t) => t.status === 'active' && t.dueDate !== undefined && t.dueDate < today
  );
}

function sortTodos(todos: Todo[], sort: SortState): Todo[] {
  const sorted = [...todos];
  sorted.sort((a, b) => {
    let cmp = 0;
    switch (sort.field) {
      case 'title':
        cmp = a.title.localeCompare(b.title, 'ja');
        break;
      case 'createdAt':
        cmp = a.createdAt.localeCompare(b.createdAt);
        break;
      case 'dueDate': {
        const da = a.dueDate ?? '';
        const db = b.dueDate ?? '';
        if (da === '' && db === '') cmp = 0;
        else if (da === '') cmp = 1;
        else if (db === '') cmp = -1;
        else cmp = da.localeCompare(db);
        break;
      }
      case 'priority':
        cmp = PRIORITY_WEIGHT[a.priority] - PRIORITY_WEIGHT[b.priority];
        break;
    }
    return sort.direction === 'asc' ? cmp : -cmp;
  });
  return sorted;
}

export function applyFiltersAndSort(
  todos: Todo[],
  filters: FilterState,
  sort: SortState,
  _categories: Category[]
): Todo[] {
  let result = todos;
  result = filterBySearch(result, filters.searchQuery);
  result = filterByStatus(result, filters.status);
  result = filterByPriorities(result, filters.priorities);
  result = filterByCategories(result, filters.categoryIds);
  result = filterByOverdue(result, filters.showOverdueOnly);
  result = sortTodos(result, sort);
  return result;
}

export function countActiveFilters(filters: FilterState): number {
  let count = 0;
  if (filters.searchQuery.trim()) count++;
  if (filters.status !== 'all') count++;
  if (filters.priorities.length > 0) count++;
  if (filters.categoryIds.length > 0) count++;
  if (filters.showOverdueOnly) count++;
  return count;
}
