export type Priority = 'low' | 'medium' | 'high' | 'urgent';

export type TodoStatus = 'active' | 'completed';

export type SortField = 'createdAt' | 'dueDate' | 'priority' | 'title';

export type SortDirection = 'asc' | 'desc';

export interface Todo {
  id: string;
  title: string;
  description?: string;
  priority: Priority;
  status: TodoStatus;
  categoryIds: string[];
  dueDate?: string;
  createdAt: string;
  updatedAt: string;
  completedAt?: string;
}

export interface Category {
  id: string;
  name: string;
  color: string;
  createdAt: string;
}

export interface FilterState {
  searchQuery: string;
  status: TodoStatus | 'all';
  priorities: Priority[];
  categoryIds: string[];
  showOverdueOnly: boolean;
}

export interface SortState {
  field: SortField;
  direction: SortDirection;
}

export interface TodoStats {
  total: number;
  completed: number;
  active: number;
  overdue: number;
  completionRate: number;
  byPriority: Record<Priority, number>;
  byCategory: Record<string, number>;
  dueSoon: number;
}

export interface ModalState {
  type: 'create' | 'edit' | 'delete' | null;
  todoId?: string;
}

export type TodoFormData = Pick<Todo, 'title' | 'description' | 'priority' | 'categoryIds' | 'dueDate'>;

export const PRIORITY_CONFIG: Record<Priority, { label: string; textColor: string; bgColor: string; borderColor: string }> = {
  low: {
    label: '低',
    textColor: 'text-gray-500 dark:text-gray-400',
    bgColor: 'bg-gray-100 dark:bg-gray-700',
    borderColor: 'border-gray-300 dark:border-gray-600',
  },
  medium: {
    label: '中',
    textColor: 'text-blue-600 dark:text-blue-400',
    bgColor: 'bg-blue-50 dark:bg-blue-900/30',
    borderColor: 'border-blue-300 dark:border-blue-600',
  },
  high: {
    label: '高',
    textColor: 'text-orange-600 dark:text-orange-400',
    bgColor: 'bg-orange-50 dark:bg-orange-900/30',
    borderColor: 'border-orange-300 dark:border-orange-600',
  },
  urgent: {
    label: '緊急',
    textColor: 'text-red-600 dark:text-red-400',
    bgColor: 'bg-red-50 dark:bg-red-900/30',
    borderColor: 'border-red-300 dark:border-red-600',
  },
};

export const CATEGORY_COLORS = [
  { label: '青', value: 'bg-blue-500' },
  { label: '緑', value: 'bg-green-500' },
  { label: '紫', value: 'bg-purple-500' },
  { label: '赤', value: 'bg-red-500' },
  { label: '黄', value: 'bg-yellow-500' },
  { label: 'ピンク', value: 'bg-pink-500' },
  { label: '水色', value: 'bg-cyan-500' },
  { label: 'オレンジ', value: 'bg-orange-500' },
];

export const DEFAULT_CATEGORIES: Category[] = [
  { id: 'work', name: '仕事', color: 'bg-blue-500', createdAt: new Date().toISOString() },
  { id: 'personal', name: 'プライベート', color: 'bg-green-500', createdAt: new Date().toISOString() },
  { id: 'shopping', name: '買い物', color: 'bg-purple-500', createdAt: new Date().toISOString() },
  { id: 'health', name: '健康', color: 'bg-red-500', createdAt: new Date().toISOString() },
];
