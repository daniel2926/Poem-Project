import type { ButtonHTMLAttributes } from 'react';

type Variant = 'primary' | 'secondary' | 'ghost';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  fullWidth?: boolean;
}

const VARIANTS: Record<Variant, string> = {
  primary: 'bg-brand text-white shadow-soft hover:bg-brand-dark active:scale-[0.98]',
  secondary: 'border border-slate-200 bg-white text-slate-700 hover:bg-sky-soft/60',
  ghost: 'text-brand hover:bg-brand/5',
};

// Shared button so every screen's buttons look and behave the same.
export function Button({
  variant = 'primary',
  fullWidth = false,
  className = '',
  ...rest
}: ButtonProps) {
  return (
    <button
      className={`rounded-xl px-5 py-2.5 text-sm font-semibold transition disabled:opacity-50 ${
        VARIANTS[variant]
      } ${fullWidth ? 'w-full' : ''} ${className}`}
      {...rest}
    />
  );
}
