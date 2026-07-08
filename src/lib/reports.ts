// Report logic kept out of the components: building a new report, filtering,
// and counting. Pure functions the hooks and screens call.

import type { Category, Report, Status } from '../types';
import { STATUSES } from '../constants';
import { todayISO } from './format';

// The fields a student fills in on the form.
export interface NewReportInput {
  title: string;
  category: Category;
  location: string;
  description: string;
  photoName: string;
}

/** Build a full Report from the form input, defaulting status/date/etc. */
export function createReport(input: NewReportInput, student: string): Report {
  return {
    id: 'r' + Date.now(),
    ...input,
    student,
    status: 'Submitted',
    date: todayISO(),
    adminNote: '',
  };
}

/** Reports belonging to one student (for the "My Reports" list). */
export function getMyReports(reports: Report[], student: string): Report[] {
  return reports.filter((r) => r.student === student);
}

export interface ReportFilter {
  status: Status | 'All';
  category: Category | 'All';
}

/** Filter reports by status and/or category ('All' means no filter). */
export function filterReports(reports: Report[], filter: ReportFilter): Report[] {
  return reports.filter(
    (r) =>
      (filter.status === 'All' || r.status === filter.status) &&
      (filter.category === 'All' || r.category === filter.category),
  );
}

/** Count how many reports are in each status (for the admin summary). */
export function countByStatus(reports: Report[]): Record<Status, number> {
  const counts = Object.fromEntries(STATUSES.map((s) => [s, 0])) as Record<Status, number>;
  for (const r of reports) counts[r.status]++;
  return counts;
}
