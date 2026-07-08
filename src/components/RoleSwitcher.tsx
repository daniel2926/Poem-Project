import type { Role } from '../types';
import { ROLES } from '../constants';

interface RoleSwitcherProps {
  role: Role;
  onChange: (role: Role) => void;
}

// Mock preview toggle (NOT real authentication) to switch between views.
export function RoleSwitcher({ role, onChange }: RoleSwitcherProps) {
  return (
    <div className="inline-flex flex-wrap gap-1 rounded-xl bg-slate-100 p-1">
      {ROLES.map((r) => (
        <button
          key={r.key}
          onClick={() => onChange(r.key)}
          aria-pressed={role === r.key}
          className={`rounded-lg px-3 py-1.5 text-sm font-medium transition ${
            role === r.key
              ? 'bg-navy text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          {r.label}
        </button>
      ))}
    </div>
  );
}
