import type { AttendanceStatus } from '../types';

// Pill styles per attendance status (shared by student + dorm-head views).
const STYLES: Record<AttendanceStatus, string> = {
  'To do': 'bg-slate-100 text-slate-600',
  Pending: 'bg-amber-100 text-amber-800',
  Approved: 'bg-green-100 text-green-800',
  Missed: 'bg-red-100 text-red-800',
  Excused: 'bg-sky-soft text-sky',
  Demerit: 'bg-red-100 text-red-800',
};

// A short human label; most match the status name, but a couple read nicer.
const LABELS: Record<AttendanceStatus, string> = {
  'To do': 'To do',
  Pending: 'Pending verification',
  Approved: 'Approved',
  Missed: 'Missed',
  Excused: 'Excused',
  Demerit: 'Demerit −1',
};

export function AttendanceBadge({ status }: { status: AttendanceStatus }) {
  return (
    <span
      className={`inline-flex shrink-0 items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${STYLES[status]}`}
    >
      {LABELS[status]}
    </span>
  );
}
