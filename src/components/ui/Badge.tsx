import type { ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  className?: string;
  onRemove?: () => void;
}

export function Badge({ children, className = '', onRemove }: BadgeProps) {
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${className}`}>
      {children}
      {onRemove && (
        <button
          onClick={onRemove}
          className="ml-0.5 hover:opacity-70 transition-opacity"
          aria-label="削除"
        >
          ×
        </button>
      )}
    </span>
  );
}
