import { Modal } from '../ui/Modal';
import { TodoForm } from './TodoForm';
import type { Category, Todo, TodoFormData } from '../../types';

interface TodoModalProps {
  isOpen: boolean;
  onClose: () => void;
  todo?: Todo;
  categories: Category[];
  onSubmit: (data: TodoFormData) => void;
  onAddCategory: (name: string, color: string) => void;
}

export function TodoModal({ isOpen, onClose, todo, categories, onSubmit, onAddCategory }: TodoModalProps) {
  const title = todo ? 'TODOを編集' : '新しいTODOを追加';

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <TodoForm
        initialData={todo}
        categories={categories}
        onSubmit={(data) => { onSubmit(data); onClose(); }}
        onCancel={onClose}
        onAddCategory={onAddCategory}
        isEditing={!!todo}
      />
    </Modal>
  );
}
