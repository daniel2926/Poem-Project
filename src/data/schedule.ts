import type { PlaceSchedule } from '../types';

// The cleaning PLACES students get assigned to. "Generate Schedule" spreads
// every student evenly across these, filling each once before doubling up.
export const CLEANING_PLACES: string[] = [
  'Common Room',
  'Shared Kitchen',
  'Bathrooms',
  'Hallways',
  'Laundry Room',
  'Courtyard',
];

// Start with no assignments — the schedule is produced by "Generate Schedule".
export const EMPTY_SCHEDULE: PlaceSchedule = Object.fromEntries(
  CLEANING_PLACES.map((p) => [p, [] as string[]]),
);
