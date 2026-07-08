import type { ReactNode } from 'react';

interface FieldProps {
  label: string;
  error?: string;
  className?: string;
  children: ReactNode;
}

// A labeled form field with an optional validation message underneath.
export function Field({ label, error, className = '', children }: FieldProps) {
  return (
    <div className={className}>
      <label className="mb-1 block text-sm font-medium text-slate-700">{label}</label>
      {children}
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}
