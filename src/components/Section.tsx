import type { ReactNode } from 'react';

interface SectionProps {
  children: ReactNode;
  className?: string;
}

// A white card on the gray background — the app's basic content container.
export function Section({ children, className = '' }: SectionProps) {
  return (
    <section
      className={`rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6 ${className}`}
    >
      {children}
    </section>
  );
}
