import type { Report, Schedule, User } from '../types';
import type { NewReportInput } from '../lib/reports';
import { DashboardHeader } from '../components/DashboardHeader';
import { ReportForm } from '../components/ReportForm';
import { ReportList } from '../components/ReportList';
import { CleaningSchedule } from '../components/CleaningSchedule';

interface StudentDashboardProps {
  user: User;
  myReports: Report[];
  onAddReport: (input: NewReportInput) => void;
  schedule: Schedule;
  roster: string[];
  onAddAssignment: (day: string, name: string) => void;
  onRemoveAssignment: (day: string, name: string) => void;
  onSignOut: () => void;
}

// Student view: submit a report, track your own reports. Dorm heads also get
// the "Manage Cleaning Schedule" section — a normal student does not.
export function StudentDashboard({
  user,
  myReports,
  onAddReport,
  schedule,
  roster,
  onAddAssignment,
  onRemoveAssignment,
  onSignOut,
}: StudentDashboardProps) {
  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      <DashboardHeader user={user} onSignOut={onSignOut} />

      <main className="mx-auto max-w-3xl space-y-6 px-4 pt-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Hi, {user.name.split(' ')[0]} 👋
          </h1>
          <p className="text-sm text-slate-500">Report damage and track your requests.</p>
        </div>

        <ReportForm onSubmit={onAddReport} />

        <div>
          <div className="mb-3 flex items-baseline justify-between">
            <h2 className="text-lg font-semibold text-slate-900">My Reports</h2>
            <span className="text-sm text-slate-400">
              {myReports.length} report{myReports.length !== 1 ? 's' : ''}
            </span>
          </div>
          <ReportList
            reports={myReports}
            emptyText="No reports yet. Submit your first report above."
          />
        </div>

        {user.isDormHead && (
          <CleaningSchedule
            schedule={schedule}
            editable
            dorm={user.dorm}
            roster={roster}
            onAdd={onAddAssignment}
            onRemove={onRemoveAssignment}
          />
        )}
      </main>
    </div>
  );
}
