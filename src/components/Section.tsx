import type { ReactNode } from 'react';

interface SectionProps {
  children: ReactNode;
  className?: string;
}

// A white card on the gray background — the app's basic content container.
export function Section({ children, className = '' }: SectionProps) {
  return (
    <section
      className={`rounded-2xl border border-slate-100 bg-white p-5 shadow-card sm:p-6 ${className}`}
    >
      {children}
    </section>
  );
}
