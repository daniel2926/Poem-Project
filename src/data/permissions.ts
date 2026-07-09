import type { PermissionRequest } from '../types';

// Seed dorm-permission requests so the Admin queue isn't empty on first load.
// Andi Pratama is the demo student account, so give them some history.
export const INITIAL_PERMISSIONS: PermissionRequest[] = [
  {
    id: 'p1',
    student: 'Andi Pratama',
    reason: 'Family visit',
    destination: 'Bandung',
    leaveAt: '2026-07-11T08:00',
    returnAt: '2026-07-12T20:00',
    status: 'Approved',
  },
  {
    id: 'p2',
    student: 'Andi Pratama',
    reason: 'Doctor appointment',
    destination: 'City Hospital',
    leaveAt: '2026-07-09T14:00',
    returnAt: '2026-07-09T18:00',
    status: 'Pending',
  },
  {
    id: 'p3',
    student: 'Budi Santoso',
    reason: 'Weekend at home',
    destination: 'Bogor',
    leaveAt: '2026-07-12T07:00',
    returnAt: '2026-07-13T21:00',
    status: 'Pending',
  },
];
