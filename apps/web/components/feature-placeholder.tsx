import type { ReactNode } from 'react';

interface FeaturePlaceholderProps {
  title: string;
  description: string;
  actions?: ReactNode;
}

export function FeaturePlaceholder({ title, description, actions }: FeaturePlaceholderProps) {
  return (
    <div className="rounded-xl border border-dashed border-slate-300 bg-white p-8 text-center shadow-sm dark:border-slate-700 dark:bg-slate-900/60">
      <h2 className="text-xl font-semibold font-sans text-slate-900 dark:text-white">{title}</h2>
      <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{description}</p>
      {actions && <div className="mt-4 flex justify-center gap-2">{actions}</div>}
    </div>
  );
}
