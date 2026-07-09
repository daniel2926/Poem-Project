import { useState, type ReactNode } from 'react';
import type { User } from '../types';
import { navFor, type NavItem, type PageId } from '../nav';
import { Logo } from './Logo';
import { Icon } from './Icon';

interface AppShellProps {
  user: User;
  page: PageId;
  onNavigate: (page: PageId) => void;
  onSignOut: () => void;
  children: ReactNode;
}

function roleLabel(user: User): string {
  if (user.role === 'admin') return 'Admin';
  return user.isDormHead ? 'Student · Dorm Head' : 'Student';
}

// A single sidebar / menu link.
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
      className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition ${
        active ? 'bg-white/15 text-white' : 'text-white/70 hover:bg-white/10 hover:text-white'
      }`}
    >
      <Icon name={item.icon} className="h-5 w-5 shrink-0" />
      {item.label}
    </button>
  );
}

// The nav list (shared by the desktop sidebar and the mobile drawer).
function NavList({
  items,
  page,
  onNavigate,
}: {
  items: NavItem[];
  page: PageId;
  onNavigate: (p: PageId) => void;
}) {
  return (
    <nav className="space-y-1">
      {items.map((item) => (
        <NavLink
          key={item.id}
          item={item}
          active={page === item.id}
          onClick={() => onNavigate(item.id)}
        />
      ))}
    </nav>
  );
}

// App shell for signed-in users: a fixed navy sidebar on desktop, a slide-in
// drawer on mobile, and the active service page rendered in the main area.
export function AppShell({ user, page, onNavigate, onSignOut, children }: AppShellProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const items = navFor(user);

  function go(p: PageId) {
    onNavigate(p);
    setMenuOpen(false);
  }

  // Contents of the navy panel (reused on desktop + mobile).
  const panel = (
    <div className="flex h-full flex-col">
      <div className="px-4 py-4">
        <Logo size="sm" variant="onDark" />
      </div>
      <div className="flex-1 overflow-y-auto px-3">
        <NavList items={items} page={page} onNavigate={go} />
      </div>
      <div className="border-t border-white/10 px-3 py-3">
        <div className="mb-2 px-3">
          <div className="truncate text-sm font-medium text-white">{user.name}</div>
          <div className="truncate text-xs text-white/50">
            {roleLabel(user)} · {user.dorm}
          </div>
        </div>
        <button
          onClick={onSignOut}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-white/70 transition hover:bg-white/10 hover:text-white"
        >
          <Icon name="logout" className="h-5 w-5 shrink-0" />
          Sign Out
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
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
        <main className="mx-auto max-w-5xl px-4 py-6 sm:px-6">{children}</main>
      </div>
    </div>
  );
}
