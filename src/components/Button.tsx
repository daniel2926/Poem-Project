import type { ButtonHTMLAttributes } from 'react';

type Variant = 'primary' | 'secondary' | 'ghost';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  fullWidth?: boolean;
}

const VARIANTS: Record<Variant, string> = {
  primary: 'bg-navy text-white hover:bg-navy-dark',
  secondary: 'border border-slate-300 bg-white text-slate-700 hover:bg-slate-50',
  ghost: 'text-navy hover:bg-navy/5',
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
      className={`rounded-lg px-5 py-2.5 text-sm font-medium transition disabled:opacity-50 ${
        VARIANTS[variant]
      } ${fullWidth ? 'w-full' : ''} ${className}`}
      {...rest}
    />
  );
}
