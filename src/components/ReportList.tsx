import type { Report } from '../types';
import { ReportCard } from './ReportCard';
import { EmptyState } from './EmptyState';

interface ReportListProps {
  reports: Report[];
  emptyText?: string;
}

// Renders report cards, or a friendly empty state when there are none.
export function ReportList({ reports, emptyText = 'No reports yet.' }: ReportListProps) {
  if (reports.length === 0) {
    return <EmptyState text={emptyText} />;
  }
  return (
    <div className="space-y-3">
      {reports.map((r) => (
        <ReportCard key={r.id} report={r} />
      ))}
    </div>
  );
}
