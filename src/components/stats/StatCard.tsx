import type { ReactNode } from 'react';

interface StatCardProps {
  icon: ReactNode;
  value: number;
  label: string;
  accent?: 'red' | 'amber' | 'green' | 'blue';
}

const accentClasses = {
  red: 'text-red-500 bg-red-50 dark:bg-red-900/20',
  amber: 'text-amber-500 bg-amber-50 dark:bg-amber-900/20',
  green: 'text-green-500 bg-green-50 dark:bg-green-900/20',
  blue: 'text-blue-500 bg-blue-50 dark:bg-blue-900/20',
};

export function StatCard({ icon, value, label, accent = 'blue' }: StatCardProps) {
  return (
    <div className={`flex items-center gap-3 px-4 py-3 rounded-xl ${accentClasses[accent]}`}>
      <div className="shrink-0">{icon}</div>
      <div>
        <div className="text-2xl font-bold leading-none">{value}</div>
        <div className="text-xs opacity-70 mt-0.5">{label}</div>
      </div>
    </div>
  );
}
