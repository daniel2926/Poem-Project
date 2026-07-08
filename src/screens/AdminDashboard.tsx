import { useState } from 'react';
import type { Category, Report, Schedule, Status, User } from '../types';
import { countByStatus, filterReports } from '../lib/reports';
import { formatDate } from '../lib/format';
import { DashboardHeader } from '../components/DashboardHeader';
import { Section } from '../components/Section';
import { FilterBar } from '../components/FilterBar';
import { StatusBadge } from '../components/StatusBadge';
import { EmptyState } from '../components/EmptyState';
import { Icon } from '../components/Icon';
import { ReportDetail } from '../components/ReportDetail';
import { CleaningSchedule } from '../components/CleaningSchedule';

// A small summary stat (e.g. "12 Total", "3 In Progress").
function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3 text-center shadow-sm">
      <div className="text-2xl font-bold text-slate-900">{value}</div>
      <div className="text-xs text-slate-500">{label}</div>
    </div>
  );
}

// One clickable row in the admin's "All Reports" list.
function AdminRow({ report, onClick }: { report: Report; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="flex w-full flex-col gap-2 rounded-xl border border-slate-200 bg-white p-4 text-left transition hover:border-navy hover:shadow-sm sm:flex-row sm:items-center sm:gap-4"
    >
      <div className="min-w-0 flex-1">
        <div className="truncate font-medium text-slate-900">{report.title}</div>
        <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-slate-500">
          <span className="inline-flex items-center gap-1">
            <Icon name="clipboard" className="h-3.5 w-3.5" />
            {report.category}
          </span>
          <span className="inline-flex items-center gap-1">
            <Icon name="user" className="h-3.5 w-3.5" />
            {report.student}
          </span>
          <span className="inline-flex items-center gap-1">
            <Icon name="calendar" className="h-3.5 w-3.5" />
            {formatDate(report.date)}
          </span>
        </div>
      </div>
      <StatusBadge status={report.status} />
      <Icon name="chevron" className="hidden h-4 w-4 shrink-0 text-slate-300 sm:block" />
    </button>
  );
}

interface AdminDashboardProps {
  user: User;
  reports: Report[];
  onUpdateReport: (id: string, changes: Partial<Report>) => void;
  schedule: Schedule;
  onSignOut: () => void;
}

// Admin view (a denser, oversight-focused layout): a stats row, all reports
// with filters + a detail panel, and a read-only cleaning schedule.
export function AdminDashboard({
  user,
  reports,
  onUpdateReport,
  schedule,
  onSignOut,
}: AdminDashboardProps) {
  const [statusFilter, setStatusFilter] = useState<Status | 'All'>('All');
  const [categoryFilter, setCategoryFilter] = useState<Category | 'All'>('All');
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const counts = countByStatus(reports);
  const filtered = filterReports(reports, { status: statusFilter, category: categoryFilter });
  const selected = reports.find((r) => r.id === selectedId) ?? null;

  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      <DashboardHeader user={user} onSignOut={onSignOut} />

      <main className="mx-auto max-w-5xl space-y-6 px-4 pt-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Admin Dashboard</h1>
          <p className="text-sm text-slate-500">Oversee reports across all students.</p>
        </div>

        {/* Summary stats */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <Stat label="Total reports" value={reports.length} />
          <Stat label="Under Review" value={counts['Under Review']} />
          <Stat label="In Progress" value={counts['In Progress']} />
          <Stat label="Completed" value={counts['Completed']} />
        </div>

        <Section>
          <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">All Reports</h2>
              <p className="text-sm text-slate-500">
                Showing {filtered.length} of {reports.length} report
                {reports.length !== 1 ? 's' : ''}
              </p>
            </div>
            <FilterBar
              status={statusFilter}
              category={categoryFilter}
              onStatus={setStatusFilter}
              onCategory={setCategoryFilter}
            />
          </div>

          {filtered.length === 0 ? (
            <EmptyState text="No reports match your filters." />
          ) : (
            <div className="space-y-2">
              {filtered.map((r) => (
                <AdminRow key={r.id} report={r} onClick={() => setSelectedId(r.id)} />
              ))}
            </div>
          )}
        </Section>

        {/* Oversight only — the admin can view but not edit the schedule. */}
        <CleaningSchedule schedule={schedule} editable={false} dorm={user.dorm} />
      </main>

      {selected && (
        <ReportDetail
          report={selected}
          onClose={() => setSelectedId(null)}
          onUpdate={onUpdateReport}
        />
      )}
    </div>
  );
}
