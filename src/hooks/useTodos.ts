import { useLocalStorage } from './useLocalStorage';
import type { Todo, Category, TodoFormData } from '../types';
import { DEFAULT_CATEGORIES } from '../types';

export function useTodos() {
  const [todos, setTodos] = useLocalStorage<Todo[]>('todos', []);
  const [categories, setCategories] = useLocalStorage<Category[]>('categories', DEFAULT_CATEGORIES);

  const addTodo = (data: TodoFormData) => {
    const now = new Date().toISOString();
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      title: data.title,
      description: data.description,
      priority: data.priority,
      status: 'active',
      categoryIds: data.categoryIds,
      dueDate: data.dueDate,
      createdAt: now,
      updatedAt: now,
    };
    setTodos((prev) => [newTodo, ...prev]);
  };

  const updateTodo = (id: string, data: Partial<TodoFormData>) => {
    setTodos((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, ...data, updatedAt: new Date().toISOString() } : t
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };

  const toggleComplete = (id: string) => {
    setTodos((prev) =>
      prev.map((t) => {
        if (t.id !== id) return t;
        const now = new Date().toISOString();
        if (t.status === 'active') {
          return { ...t, status: 'completed', completedAt: now, updatedAt: now };
        } else {
          const { completedAt: _, ...rest } = t;
          return { ...rest, status: 'active', updatedAt: now };
        }
      })
    );
  };

  const addCategory = (name: string, color: string) => {
    const newCat: Category = {
      id: crypto.randomUUID(),
      name,
      color,
      createdAt: new Date().toISOString(),
    };
    setCategories((prev) => [...prev, newCat]);
  };

  const deleteCategory = (id: string) => {
    setCategories((prev) => prev.filter((c) => c.id !== id));
    setTodos((prev) =>
      prev.map((t) => ({ ...t, categoryIds: t.categoryIds.filter((cid) => cid !== id) }))
    );
  };

  return { todos, categories, addTodo, updateTodo, deleteTodo, toggleComplete, addCategory, deleteCategory };
}
