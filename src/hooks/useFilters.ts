import { useState } from 'react';
import { useLocalStorage } from './useLocalStorage';
import type { FilterState, SortState, Priority, SortField, SortDirection } from '../types';

const DEFAULT_FILTERS: FilterState = {
  searchQuery: '',
  status: 'all',
  priorities: [],
  categoryIds: [],
  showOverdueOnly: false,
};

const DEFAULT_SORT: SortState = { field: 'createdAt', direction: 'desc' };

export function useFilters() {
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);
  const [sort, setSort] = useLocalStorage<SortState>('sortState', DEFAULT_SORT);

  const setSearchQuery = (searchQuery: string) =>
    setFilters((prev) => ({ ...prev, searchQuery }));

  const setStatus = (status: FilterState['status']) =>
    setFilters((prev) => ({ ...prev, status }));

  const togglePriority = (p: Priority) =>
    setFilters((prev) => ({
      ...prev,
      priorities: prev.priorities.includes(p)
        ? prev.priorities.filter((x) => x !== p)
        : [...prev.priorities, p],
    }));

  const toggleCategory = (id: string) =>
    setFilters((prev) => ({
      ...prev,
      categoryIds: prev.categoryIds.includes(id)
        ? prev.categoryIds.filter((x) => x !== id)
        : [...prev.categoryIds, id],
    }));

  const toggleOverdueOnly = () =>
    setFilters((prev) => ({ ...prev, showOverdueOnly: !prev.showOverdueOnly }));

  const setSortField = (field: SortField) => {
    setSort((prev) => ({
      field,
      direction: prev.field === field && prev.direction === 'asc' ? 'desc' : 'asc',
    }));
  };

  const setSortDirection = (direction: SortDirection) =>
    setSort((prev) => ({ ...prev, direction }));

  const resetFilters = () => setFilters(DEFAULT_FILTERS);

  return {
    filters,
    sort,
    setSearchQuery,
    setStatus,
    togglePriority,
    toggleCategory,
    toggleOverdueOnly,
    setSortField,
    setSortDirection,
    resetFilters,
  };
}
