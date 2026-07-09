// Navigation model. Each service is its OWN page/route. The sidebar (desktop)
// and mobile menu are both driven by the list of NavItems for the current user.

import type { User } from './types';

// A page id — used as the route key in the shell's state.
export type PageId =
  | 'home'
  | 'reports'
  | 'cleaning'
  | 'consultation'
  | 'permission'
  | 'discipline';

export interface NavItem {
  id: PageId;
  label: string;
  icon: string; // an Icon `name`
}

// Build the nav for a given user. Order matters — it's the sidebar order.
export function navFor(user: User): NavItem[] {
  const home: NavItem = { id: 'home', label: 'Home', icon: 'home' };

  if (user.role === 'admin') {
    return [
      home,
      { id: 'reports', label: 'Reports', icon: 'clipboard' },
      { id: 'cleaning', label: 'Cleaning Schedule', icon: 'broom' },
      { id: 'permission', label: 'Dorm Permission', icon: 'door' },
      { id: 'discipline', label: 'Discipline', icon: 'shield' },
    ];
  }

  // Student (and dorm head). Dorm heads additionally get the cleaning page.
  const items: NavItem[] = [
    home,
    { id: 'reports', label: 'My Reports', icon: 'clipboard' },
    { id: 'consultation', label: 'Consultation', icon: 'book' },
    { id: 'permission', label: 'Dorm Permission', icon: 'door' },
    { id: 'discipline', label: 'My Discipline', icon: 'shield' },
  ];
  if (user.isDormHead) {
    // Slot the cleaning page right after Reports for dorm heads.
    items.splice(2, 0, { id: 'cleaning', label: 'Cleaning Schedule', icon: 'broom' });
  }
  return items;
}

// Short descriptions used on the Home dashboard cards.
export const PAGE_BLURB: Record<PageId, string> = {
  home: '',
  reports: 'Report dorm damage and track your requests.',
  cleaning: 'Generate and view weekly cleaning assignments.',
  consultation: 'Book a private time slot with the campus consultant.',
  permission: 'Request permission to leave the dorm and track approvals.',
  discipline: 'View points, violations, and punishment schedules.',
};
