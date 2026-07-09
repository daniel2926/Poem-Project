import { useState, type ReactNode } from 'react';
import type { User } from '../types';
import { adminNav, type NavItem, type PageId } from '../nav';
import { Logo } from './Logo';
import { Icon } from './Icon';

interface AdminShellProps {
  user: User;
  page: PageId;
  onNavigate: (page: PageId) => void;
  onSignOut: () => void;
  children: ReactNode;
}

// A single sidebar link.
function NavLink({
  item,
  active,
  onClick,
}: {
  item: NavItem;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      aria-current={active ? 'page' : undefined}
      className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
        active
          ? 'bg-white text-brand shadow-sm'
          : 'text-white/75 hover:bg-white/10 hover:text-white'
      }`}
    >
      <Icon name={item.icon} className="h-5 w-5 shrink-0" />
      {item.label}
    </button>
  );
}

// Admin experience: a classic laptop-first WEB DASHBOARD with a fixed sidebar
// (a mobile drawer for small screens), holding tables, filters, and stats.
export function AdminShell({ user, page, onNavigate, onSignOut, children }: AdminShellProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const items = adminNav();

  function go(p: PageId) {
    onNavigate(p);
    setMenuOpen(false);
  }

  const panel = (
    <div className="flex h-full flex-col">
      <div className="px-4 py-5">
        <Logo size="sm" variant="onDark" />
      </div>
      <div className="flex-1 overflow-y-auto px-3">
        <p className="px-3 pb-2 text-[11px] font-semibold uppercase tracking-wider text-white/40">
          Menu
        </p>
        <nav className="space-y-1">
          {items.map((item) => (
            <NavLink
              key={item.id}
              item={item}
              active={page === item.id}
              onClick={() => go(item.id)}
            />
          ))}
        </nav>
      </div>
      <div className="border-t border-white/10 px-3 py-3">
        <div className="mb-2 flex items-center gap-3 px-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15 text-sm font-semibold text-white">
            {user.name.charAt(0)}
          </div>
          <div className="min-w-0">
            <div className="truncate text-sm font-medium text-white">{user.name}</div>
            <div className="truncate text-xs text-white/50">Admin · {user.dorm}</div>
          </div>
        </div>
        <button
          onClick={onSignOut}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-white/75 transition hover:bg-white/10 hover:text-white"
        >
          <Icon name="logout" className="h-5 w-5 shrink-0" />
          Sign Out
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen">
      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 hidden w-64 bg-navy lg:block">{panel}</aside>

      {/* Mobile top bar */}
      <header className="flex items-center gap-3 bg-navy px-4 py-3 text-white lg:hidden">
        <button
          onClick={() => setMenuOpen(true)}
          aria-label="Open menu"
          className="rounded-lg p-1.5 transition hover:bg-white/10"
        >
          <Icon name="menu" className="h-6 w-6" />
        </button>
        <Logo size="sm" variant="onDark" />
      </header>

      {/* Mobile drawer */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-slate-900/50" onClick={() => setMenuOpen(false)} />
          <div className="absolute inset-y-0 left-0 w-64 bg-navy shadow-xl">{panel}</div>
        </div>
      )}

      {/* Main content */}
      <div className="lg:pl-64">
        <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">{children}</main>
      </div>
    </div>
  );
}
