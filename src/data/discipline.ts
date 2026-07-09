import type { DisciplineRecord, Violation } from '../types';

// The violations an admin can record. Each carries a fixed point penalty.
export const VIOLATIONS: Violation[] = [
  { id: 'v1', label: 'Late curfew', points: 5 },
  { id: 'v2', label: 'Missed cleaning duty', points: 10 },
  { id: 'v3', label: 'Noise complaint', points: 5 },
  { id: 'v4', label: 'Unauthorized guest', points: 15 },
  { id: 'v5', label: 'Property damage', points: 20 },
];

// Seed discipline records. These explain the starting points in roster.ts
// (Dewi -10, Gita -15) so the student view has something to show.
export const INITIAL_DISCIPLINE: DisciplineRecord[] = [
  {
    id: 'd1',
    student: 'Dewi Anggraini',
    violation: 'Missed cleaning duty',
    points: 10,
    punishment: 'Extra cleaning: Courtyard',
    scheduleAt: '2026-07-12T16:00',
    date: '2026-07-05',
  },
  {
    id: 'd2',
    student: 'Gita Maharani',
    violation: 'Unauthorized guest',
    points: 15,
    punishment: 'Written reflection + meeting with dorm head',
    scheduleAt: '2026-07-10T17:00',
    date: '2026-07-03',
  },
];
