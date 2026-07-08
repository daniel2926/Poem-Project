// Single source of truth for status values, badge colors, and other shared
// constants. Change a color or label here and it updates everywhere.

import type { Category, Day, Role, Status } from './types';

export const DORM = 'Dorm A';

// The "signed-in" student for the Student / Dorm Head previews.
export const CURRENT_STUDENT = 'Andi Pratama';

export const CATEGORIES: Category[] = [
  'Room Maintenance',
  'Facility Issue',
  'Gas Replacement',
];

export const STATUSES: Status[] = [
  'Submitted',
  'Under Review',
  'In Progress',
  'Completed',
  'Rejected',
  'Cancelled',
];

// Badge styles: light background, dark text (per the design spec).
export const STATUS_STYLES: Record<Status, { badge: string; dot: string }> = {
  Submitted: { badge: 'bg-gray-100 text-gray-700', dot: 'bg-gray-400' },
  'Under Review': { badge: 'bg-amber-100 text-amber-800', dot: 'bg-amber-500' },
  'In Progress': { badge: 'bg-blue-100 text-blue-800', dot: 'bg-blue-500' },
  Completed: { badge: 'bg-green-100 text-green-800', dot: 'bg-green-500' },
  Rejected: { badge: 'bg-red-100 text-red-800', dot: 'bg-red-500' },
  Cancelled: { badge: 'bg-slate-100 text-slate-400', dot: 'bg-slate-300' },
};

export const ROLES: { key: Role; label: string }[] = [
  { key: 'student', label: 'Student' },
  { key: 'dormHead', label: 'Student (Dorm Head)' },
  { key: 'admin', label: 'Admin' },
];

export const DAYS: Day[] = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

// Shared input styles (kept here so every form field looks the same).
export const inputClass =
  'w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 ' +
  'placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-navy/30 focus:border-navy transition';

export const filterSelectClass =
  'rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-600 ' +
  'focus:outline-none focus:ring-2 focus:ring-navy/30 focus:border-navy transition';
