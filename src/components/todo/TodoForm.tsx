import { useState } from 'react';
import { Plus } from 'lucide-react';
import type { Category, Priority, TodoFormData } from '../../types';
import { PRIORITY_CONFIG, CATEGORY_COLORS } from '../../types';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Textarea } from '../ui/Textarea';

interface TodoFormProps {
  initialData?: Partial<TodoFormData>;
  categories: Category[];
  onSubmit: (data: TodoFormData) => void;
  onCancel: () => void;
  onAddCategory: (name: string, color: string) => void;
  isEditing?: boolean;
}

export function TodoForm({ initialData, categories, onSubmit, onCancel, onAddCategory, isEditing }: TodoFormProps) {
  const [title, setTitle] = useState(initialData?.title ?? '');
  const [description, setDescription] = useState(initialData?.description ?? '');
  const [priority, setPriority] = useState<Priority>(initialData?.priority ?? 'medium');
  const [dueDate, setDueDate] = useState(initialData?.dueDate ?? '');
  const [selectedCategories, setSelectedCategories] = useState<string[]>(initialData?.categoryIds ?? []);
  const [titleError, setTitleError] = useState('');

  const [showAddCategory, setShowAddCategory] = useState(false);
  const [newCatName, setNewCatName] = useState('');
  const [newCatColor, setNewCatColor] = useState(CATEGORY_COLORS[0].value);

  const toggleCategory = (id: string) => {
    setSelectedCategories((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleAddCategory = () => {
    if (!newCatName.trim()) return;
    onAddCategory(newCatName.trim(), newCatColor);
    setNewCatName('');
    setNewCatColor(CATEGORY_COLORS[0].value);
    setShowAddCategory(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setTitleError('タイトルを入力してください');
      return;
    }
    onSubmit({
      title: title.trim(),
      description: description.trim() || undefined,
      priority,
      categoryIds: selectedCategories,
      dueDate: dueDate || undefined,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <Input
        id="todo-title"
        label="タイトル *"
        placeholder="TODOのタイトル"
        value={title}
        onChange={(e) => { setTitle(e.target.value); setTitleError(''); }}
        error={titleError}
        autoFocus
      />

      <Textarea
        id="todo-desc"
        label="説明"
        placeholder="詳細説明（任意）"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        rows={3}
      />

      <div className="flex flex-col gap-1.5">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">優先度</span>
        <div className="flex gap-2 flex-wrap">
          {(Object.keys(PRIORITY_CONFIG) as Priority[]).map((p) => {
            const cfg = PRIORITY_CONFIG[p];
            const selected = priority === p;
            return (
              <button
                key={p}
                type="button"
                onClick={() => setPriority(p)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition-colors
                  ${selected
                    ? `${cfg.bgColor} ${cfg.textColor} ${cfg.borderColor} border-2`
                    : 'bg-white dark:bg-gray-700 text-gray-500 dark:text-gray-400 border-gray-200 dark:border-gray-600 hover:border-gray-300'
                  }`}
              >
                {cfg.label}
              </button>
            );
          })}
        </div>
      </div>

      <Input
        id="todo-due"
        label="期限日"
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />

      <div className="flex flex-col gap-1.5">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">カテゴリ</span>
        <div className="flex gap-2 flex-wrap">
          {categories.map((cat) => {
            const selected = selectedCategories.includes(cat.id);
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => toggleCategory(cat.id)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition-colors
                  ${selected
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                    : 'border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:border-gray-300'
                  }`}
              >
                <span className={`inline-block w-2 h-2 rounded-full mr-1.5 ${cat.color}`} />
                {cat.name}
              </button>
            );
          })}
          <button
            type="button"
            onClick={() => setShowAddCategory((v) => !v)}
            className="px-3 py-1.5 rounded-lg text-sm border border-dashed border-gray-300 dark:border-gray-600 text-gray-400 hover:border-gray-400 transition-colors flex items-center gap-1"
          >
            <Plus size={12} />新規
          </button>
        </div>
        {showAddCategory && (
          <div className="flex gap-2 mt-1 items-center flex-wrap">
            <input
              type="text"
              value={newCatName}
              onChange={(e) => setNewCatName(e.target.value)}
              placeholder="カテゴリ名"
              className="flex-1 min-w-24 px-2.5 py-1.5 text-sm rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="flex gap-1">
              {CATEGORY_COLORS.map((c) => (
                <button
                  key={c.value}
                  type="button"
                  onClick={() => setNewCatColor(c.value)}
                  className={`w-5 h-5 rounded-full ${c.value} ${newCatColor === c.value ? 'ring-2 ring-offset-1 ring-blue-500' : ''}`}
                  title={c.label}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={handleAddCategory}
              className="px-2.5 py-1.5 text-sm rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
            >
              追加
            </button>
          </div>
        )}
      </div>

      <div className="flex gap-2 justify-end pt-2 border-t border-gray-100 dark:border-gray-700">
        <Button type="button" variant="secondary" onClick={onCancel}>キャンセル</Button>
        <Button type="submit" variant="primary">
          {isEditing ? '保存する' : 'TODOを追加'}
        </Button>
      </div>
    </form>
  );
}
