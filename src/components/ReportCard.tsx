import type { Report } from '../types';
import { formatDate } from '../lib/format';
import { Icon } from './Icon';
import { StatusBadge } from './StatusBadge';

interface ReportCardProps {
  report: Report;
}

// A student's own report, shown in the "My Reports" list.
export function ReportCard({ report }: ReportCardProps) {
  return (
    <div className="flex flex-col gap-2 rounded-2xl border border-slate-100 bg-white p-4 shadow-card sm:flex-row sm:items-center sm:justify-between">
      <div className="min-w-0">
        <div className="truncate font-medium text-slate-900">{report.title}</div>
        <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-slate-500">
          <span className="inline-flex items-center gap-1">
            <Icon name="clipboard" className="h-3.5 w-3.5" />
            {report.category}
          </span>
          <span className="inline-flex items-center gap-1">
            <Icon name="pin" className="h-3.5 w-3.5" />
            {report.location}
          </span>
          <span className="inline-flex items-center gap-1">
            <Icon name="calendar" className="h-3.5 w-3.5" />
            {formatDate(report.date)}
          </span>
        </div>
      </div>
      <StatusBadge status={report.status} />
    </div>
  );
}
