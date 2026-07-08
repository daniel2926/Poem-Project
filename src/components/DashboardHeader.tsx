import type { User } from '../types';
import { Logo } from './Logo';

interface DashboardHeaderProps {
  user: User;
  onSignOut: () => void;
}

function roleLabel(user: User): string {
  if (user.role === 'admin') return 'Admin';
  return user.isDormHead ? 'Student · Dorm Head' : 'Student';
}

// Top bar shared by both dashboards: brand, who's signed in, and Sign Out.
export function DashboardHeader({ user, onSignOut }: DashboardHeaderProps) {
  return (
    <header className="bg-navy text-white">
      <div className="mx-auto flex max-w-5xl items-center gap-3 px-4 py-3.5">
        <Logo size="sm" variant="onDark" />
        <div className="ml-auto flex items-center gap-3">
          <div className="hidden text-right sm:block">
            <div className="text-sm font-medium leading-tight">{user.name}</div>
            <div className="text-xs text-white/60">
              {roleLabel(user)} · {user.dorm}
            </div>
          </div>
          <button
            onClick={onSignOut}
            className="rounded-lg bg-white/10 px-3 py-1.5 text-sm font-medium transition hover:bg-white/20"
          >
            Sign Out
          </button>
        </div>
      </div>
    </header>
  );
}
