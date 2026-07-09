import type { ReactNode } from 'react';
import type { User } from '../types';
import { studentTabs, type PageId } from '../nav';
import { Icon } from './Icon';

interface StudentShellProps {
  user: User;
  page: PageId;
  onNavigate: (page: PageId) => void;
  onSignOut: () => void;
  children: ReactNode;
}

// The student experience is styled like a native MOBILE APP: a phone-width
// frame (centered on desktop), a friendly top bar, card-based scrolling
// content, and a bottom tab bar for navigation.
export function StudentShell({ user, page, onNavigate, onSignOut, children }: StudentShellProps) {
  const tabs = studentTabs();

  return (
    <div className="flex justify-center">
      {/* Phone frame — the whole page scrolls; the top bar and bottom tab bar
          are pinned so they stay put while the content scrolls between them. */}
      <div className="relative w-full max-w-md bg-cream shadow-soft sm:my-4 sm:rounded-[2rem] sm:border sm:border-slate-100">
        {/* Top app bar (sticks to the top of the viewport) */}
        <header className="sticky top-0 z-30 flex items-center gap-3 rounded-t-[2rem] bg-brand px-5 pb-4 pt-5 text-white">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/15">
            <Icon name="building" className="h-5 w-5" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-xs text-white/70">CampusFlow</div>
            <div className="truncate text-sm font-semibold">
              Hi, {user.name.split(' ')[0]} 👋
            </div>
          </div>
          <button
            onClick={onSignOut}
            aria-label="Sign out"
            className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/15 transition active:scale-95"
          >
            <Icon name="logout" className="h-5 w-5" />
          </button>
        </header>

        {/* Content — bottom padding reserves room for the fixed tab bar */}
        <main className="px-4 pb-28 pt-4">{children}</main>

        {/* Bottom tab bar — sticks to the bottom of the viewport while scrolling */}
        <nav className="sticky bottom-0 z-30 rounded-b-[2rem] border-t border-slate-100 bg-white/95 px-2 pb-2 pt-1.5 backdrop-blur">
          <div className="flex items-stretch justify-around">
            {tabs.map((tab) => {
              const active = page === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => onNavigate(tab.id)}
                  aria-current={active ? 'page' : undefined}
                  className="flex flex-1 flex-col items-center gap-0.5 rounded-xl py-1.5 transition active:scale-95"
                >
                  <span
                    className={`flex h-9 w-9 items-center justify-center rounded-xl transition ${
                      active ? 'bg-brand text-white shadow-soft' : 'text-slate-400'
                    }`}
                  >
                    <Icon name={tab.icon} className="h-5 w-5" />
                  </span>
                  <span
                    className={`text-[10px] font-medium ${
                      active ? 'text-brand' : 'text-slate-400'
                    }`}
                  >
                    {tab.label}
                  </span>
                </button>
              );
            })}
          </div>
        </nav>
      </div>
    </div>
  );
}
