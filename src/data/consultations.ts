import type { ConsultationSlot } from '../types';

// Available time slots with the campus consultant. A student can book an open
// slot; this data is PRIVATE and never shown in any admin/discipline view.
export const INITIAL_SLOTS: ConsultationSlot[] = [
  { id: 's1', date: '2026-07-13', time: '09:00', booked: false, bookedBy: null },
  { id: 's2', date: '2026-07-13', time: '10:30', booked: false, bookedBy: null },
  { id: 's3', date: '2026-07-14', time: '13:00', booked: false, bookedBy: null },
  { id: 's4', date: '2026-07-14', time: '15:30', booked: false, bookedBy: null },
  { id: 's5', date: '2026-07-15', time: '09:00', booked: false, bookedBy: null },
  { id: 's6', date: '2026-07-15', time: '11:00', booked: false, bookedBy: null },
];
