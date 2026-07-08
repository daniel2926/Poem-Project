import { useState } from 'react';
import type { Report } from '../types';
import { INITIAL_REPORTS } from '../data/reports';
import { createReport, type NewReportInput } from '../lib/reports';

// Owns the reports list and the two ways it changes:
// - addReport: a student submits a new report (status "Submitted")
// - updateReport: an admin changes the status or note
export function useReports() {
  const [reports, setReports] = useState<Report[]>(INITIAL_REPORTS);

  function addReport(input: NewReportInput, student: string) {
    setReports((prev) => [createReport(input, student), ...prev]);
  }

  function updateReport(id: string, changes: Partial<Report>) {
    setReports((prev) => prev.map((r) => (r.id === id ? { ...r, ...changes } : r)));
  }

  return { reports, addReport, updateReport };
}
