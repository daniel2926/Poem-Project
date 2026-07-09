import type { ConsultationSlot, Counselor } from '../types';

// Campus counselors a student can choose from. This whole feature is PRIVATE —
// none of it is ever shown in an admin/discipline view.
export const COUNSELORS: Counselor[] = [
  { id: 'c1', name: 'Ms. Sari Wijaya', focus: 'Academic' },
  { id: 'c2', name: 'Mr. Budi Halim', focus: 'Personal / wellbeing' },
  { id: 'c3', name: 'Ms. Rina Kus', focus: 'Career' },
];

// Predefined time slots the student picks from.
export const CONSULTATION_SLOTS: ConsultationSlot[] = [
  { id: 's1', label: 'Mon, Jul 13 · 09:00' },
  { id: 's2', label: 'Mon, Jul 13 · 10:30' },
  { id: 's3', label: 'Tue, Jul 14 · 13:00' },
  { id: 's4', label: 'Tue, Jul 14 · 15:30' },
  { id: 's5', label: 'Wed, Jul 15 · 09:00' },
  { id: 's6', label: 'Wed, Jul 15 · 11:00' },
];
