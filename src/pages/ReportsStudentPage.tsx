import type { Report } from '../types';
import type { NewReportInput } from '../lib/reports';
import { PageHeader } from '../components/PageHeader';
import { ReportForm } from '../components/ReportForm';
import { ReportList } from '../components/ReportList';

interface ReportsStudentPageProps {
  myReports: Report[];
  onAddReport: (input: NewReportInput) => void;
}

// Student Reports page: submit a damage report and track your own reports.
export function ReportsStudentPage({ myReports, onAddReport }: ReportsStudentPageProps) {
  return (
    <div>
      <PageHeader title="My Reports" subtitle="Report dorm damage and track your requests." />

      <div className="space-y-6">
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
      </div>
    </div>
  );
}
