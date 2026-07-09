// Navigation model. Each service is its OWN page/route. The Admin sidebar and
// the Student bottom tab bar are both driven by NavItems for the current user.

import type { User } from './types';

// A page id — used as the route key in the shell's state.
export type PageId =
  | 'home'
  | 'reports'
  | 'cleaning'
  | 'consultation'
  | 'permission'
  | 'discipline'
  | 'help';

export interface NavItem {
  id: PageId;
  label: string;
  icon: string; // an Icon `name`
}

// Admin web-dashboard sidebar order.
export function adminNav(): NavItem[] {
  return [
    { id: 'home', label: 'Home', icon: 'home' },
    { id: 'reports', label: 'Reports', icon: 'clipboard' },
    { id: 'cleaning', label: 'Cleaning Schedule', icon: 'broom' },
    { id: 'permission', label: 'Dorm Permission', icon: 'door' },
    { id: 'discipline', label: 'Discipline', icon: 'shield' },
    { id: 'help', label: 'Help / FAQ', icon: 'help' },
  ];
}

// Every service a student can reach (used for the Home cards). Everyone gets a
// Cleaning page; dorm heads manage it, regular students just view their own.
export function studentNav(user: User): NavItem[] {
  const cleaningLabel = user.isDormHead ? 'Cleaning' : 'My Cleaning';
  return [
    { id: 'home', label: 'Home', icon: 'home' },
    { id: 'reports', label: 'Reports', icon: 'clipboard' },
    { id: 'cleaning', label: cleaningLabel, icon: 'broom' },
    { id: 'consultation', label: 'Consultation', icon: 'book' },
    { id: 'permission', label: 'Permission', icon: 'door' },
    { id: 'discipline', label: 'Discipline', icon: 'shield' },
    { id: 'help', label: 'Help / FAQ', icon: 'help' },
  ];
}

// The bottom tab bar. Short labels keep all tabs readable on a phone.
// (For dorm heads, Cleaning also stays reachable from the Home cards.)
export function studentTabs(): NavItem[] {
  return [
    { id: 'home', label: 'Home', icon: 'home' },
    { id: 'reports', label: 'Reports', icon: 'clipboard' },
    { id: 'consultation', label: 'Consult', icon: 'book' },
    { id: 'permission', label: 'Leave', icon: 'door' },
    { id: 'discipline', label: 'Points', icon: 'shield' },
    { id: 'help', label: 'Help', icon: 'help' },
  ];
}

// Which nav a role uses (for the Home dashboard cards).
export function navFor(user: User): NavItem[] {
  return user.role === 'admin' ? adminNav() : studentNav(user);
}

// Short descriptions used on the Home dashboard cards.
export const PAGE_BLURB: Record<PageId, string> = {
  home: '',
  reports: 'Report dorm damage and track your requests.',
  cleaning: 'See your cleaning place and duties.',
  consultation: 'Book a private slot with a campus counselor.',
  permission: 'Request to leave the dorm and track approvals.',
  discipline: 'See your points, violations, and punishment schedule.',
  help: 'Dorm rules and answers to common questions.',
};

// A cheerful accent color per service (used for the Home cards + icons).
export const PAGE_ACCENT: Record<PageId, { bg: string; text: string; ring: string }> = {
  home: { bg: 'bg-brand/10', text: 'text-brand', ring: 'ring-brand/20' },
  reports: { bg: 'bg-sky-soft', text: 'text-sky', ring: 'ring-sky/30' },
  cleaning: { bg: 'bg-mint-soft', text: 'text-mint', ring: 'ring-mint/30' },
  consultation: { bg: 'bg-brand/10', text: 'text-brand', ring: 'ring-brand/20' },
  permission: { bg: 'bg-sun-soft', text: 'text-amber-500', ring: 'ring-sun/40' },
  discipline: { bg: 'bg-mint-soft', text: 'text-mint', ring: 'ring-mint/30' },
  help: { bg: 'bg-sky-soft', text: 'text-sky', ring: 'ring-sky/30' },
};
