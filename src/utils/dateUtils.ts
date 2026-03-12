import { format, isToday, isTomorrow, isPast, parseISO, addDays, startOfDay } from 'date-fns';
import { ja } from 'date-fns/locale';
import type { TodoStatus } from '../types';

export function getToday(): string {
  return new Date().toISOString().split('T')[0];
}

export function getThreeDaysFromNow(): string {
  return addDays(startOfDay(new Date()), 3).toISOString().split('T')[0];
}

export function formatDueDate(dateStr: string | undefined): string {
  if (!dateStr) return '';
  const date = parseISO(dateStr);
  if (isToday(date)) return '今日';
  if (isTomorrow(date)) return '明日';
  const yesterday = addDays(new Date(), -1);
  if (date.toDateString() === yesterday.toDateString()) return '昨日';
  const currentYear = new Date().getFullYear();
  if (date.getFullYear() === currentYear) {
    return format(date, 'M月d日', { locale: ja });
  }
  return format(date, 'yyyy年M月d日', { locale: ja });
}

export function isOverdue(dateStr: string | undefined, status: TodoStatus): boolean {
  if (!dateStr || status === 'completed') return false;
  return dateStr < getToday();
}

export function isDueSoon(dateStr: string | undefined, status: TodoStatus): boolean {
  if (!dateStr || status === 'completed') return false;
  const today = getToday();
  const threeDays = getThreeDaysFromNow();
  return dateStr >= today && dateStr <= threeDays;
}

export function getDueDateColor(dateStr: string | undefined, status: TodoStatus): string {
  if (!dateStr) return 'text-gray-400 dark:text-gray-500';
  if (isOverdue(dateStr, status)) return 'text-red-500 dark:text-red-400';
  const today = getToday();
  if (dateStr === today) return 'text-amber-500 dark:text-amber-400';
  if (isDueSoon(dateStr, status)) return 'text-orange-500 dark:text-orange-400';
  return 'text-gray-500 dark:text-gray-400';
}

export function isPastDate(dateStr: string): boolean {
  return isPast(parseISO(dateStr));
}
