import { useMemo, useState } from 'react';
import { useDarkMode } from './hooks/useDarkMode';
import { useTodos } from './hooks/useTodos';
import { useFilters } from './hooks/useFilters';
import { applyFiltersAndSort, countActiveFilters } from './utils/todoUtils';
import { computeStats } from './utils/statsUtils';
import type { ModalState, TodoFormData } from './types';
import { Header } from './components/layout/Header';
import { StatsPanel } from './components/stats/StatsPanel';
import { FilterBar } from './components/filters/FilterBar';
import { TodoList } from './components/todo/TodoList';
import { TodoModal } from './components/todo/TodoModal';
import { ConfirmDialog } from './components/ui/ConfirmDialog';

export default function App() {
  const { isDark, toggleDark } = useDarkMode();
  const { todos, categories, addTodo, updateTodo, deleteTodo, toggleComplete, addCategory } = useTodos();
  const {
    filters, sort,
    setSearchQuery, setStatus, togglePriority, toggleCategory,
    toggleOverdueOnly, setSortField, resetFilters,
  } = useFilters();

  const [modal, setModal] = useState<ModalState>({ type: null });
  const [statsExpanded, setStatsExpanded] = useState(false);

  const filteredTodos = useMemo(
    () => applyFiltersAndSort(todos, filters, sort, categories),
    [todos, filters, sort, categories]
  );

  const stats = useMemo(() => computeStats(todos, categories), [todos, categories]);
  const activeFilterCount = useMemo(() => countActiveFilters(filters), [filters]);

  const editingTodo = modal.type === 'edit' && modal.todoId
    ? todos.find((t) => t.id === modal.todoId)
    : undefined;

  const deletingTodo = modal.type === 'delete' && modal.todoId
    ? todos.find((t) => t.id === modal.todoId)
    : undefined;

  const handleSubmit = (data: TodoFormData) => {
    if (modal.type === 'edit' && modal.todoId) {
      updateTodo(modal.todoId, data);
    } else {
      addTodo(data);
    }
    setModal({ type: null });
  };

  const handleConfirmDelete = () => {
    if (modal.todoId) deleteTodo(modal.todoId);
    setModal({ type: null });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
      <Header
        isDark={isDark}
        onToggleDark={toggleDark}
        totalCount={todos.length}
        activeCount={stats.active}
        onAddTodo={() => setModal({ type: 'create' })}
      />

      <main className="max-w-3xl mx-auto px-4 py-6 flex flex-col gap-4">
        {/* Stats Panel */}
        <StatsPanel
          stats={stats}
          isExpanded={statsExpanded}
          onToggle={() => setStatsExpanded((v) => !v)}
        />

        {/* Filter Bar */}
        <FilterBar
          filters={filters}
          sort={sort}
          categories={categories}
          activeFilterCount={activeFilterCount}
          onSearchChange={setSearchQuery}
          onStatusChange={setStatus}
          onPriorityToggle={togglePriority}
          onCategoryToggle={toggleCategory}
          onOverdueToggle={toggleOverdueOnly}
          onSortField={setSortField}
          onReset={resetFilters}
        />

        {/* Result count */}
        {todos.length > 0 && (
          <div className="text-xs text-gray-400 dark:text-gray-500 px-1">
            {filteredTodos.length} 件表示
            {activeFilterCount > 0 && ` (全 ${todos.length} 件中)`}
          </div>
        )}

        {/* Todo List */}
        <TodoList
          todos={filteredTodos}
          allTodosCount={todos.length}
          categories={categories}
          onEdit={(id) => setModal({ type: 'edit', todoId: id })}
          onDelete={(id) => setModal({ type: 'delete', todoId: id })}
          onToggleComplete={toggleComplete}
          onClearFilters={resetFilters}
          onAddTodo={() => setModal({ type: 'create' })}
        />
      </main>

      {/* Create / Edit Modal */}
      <TodoModal
        isOpen={modal.type === 'create' || modal.type === 'edit'}
        onClose={() => setModal({ type: null })}
        todo={editingTodo}
        categories={categories}
        onSubmit={handleSubmit}
        onAddCategory={addCategory}
      />

      {/* Delete Confirm Dialog */}
      <ConfirmDialog
        isOpen={modal.type === 'delete'}
        title="TODOを削除"
        message={`「${deletingTodo?.title ?? ''}」を削除してもよろしいですか？この操作は元に戻せません。`}
        onConfirm={handleConfirmDelete}
        onCancel={() => setModal({ type: null })}
      />
    </div>
  );
}
