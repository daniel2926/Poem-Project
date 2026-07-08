import type { Report, Status } from '../types';
import { STATUSES, inputClass } from '../constants';
import { formatDate } from '../lib/format';
import { Icon } from './Icon';
import { StatusBadge } from './StatusBadge';

interface ReportDetailProps {
  report: Report;
  onClose: () => void;
  onUpdate: (id: string, changes: Partial<Report>) => void;
}

// Slide-over panel where the admin reviews a report, changes its status
// (badge updates live), and adds a note.
export function ReportDetail({ report, onClose, onUpdate }: ReportDetailProps) {
  return (
    <div className="fixed inset-0 z-50 flex">
      <div className="absolute inset-0 bg-slate-900/40" onClick={onClose} />
      <div className="relative ml-auto flex h-full w-full max-w-md flex-col bg-white shadow-xl">
        <div className="sticky top-0 flex items-center justify-between border-b border-slate-200 bg-white px-5 py-4">
          <h3 className="font-semibold text-slate-900">Report details</h3>
          <button
            onClick={onClose}
            aria-label="Close"
            className="text-slate-400 transition hover:text-slate-700"
          >
            <Icon name="x" className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 space-y-5 overflow-y-auto p-5">
          <div>
            <div className="flex items-start justify-between gap-3">
              <h4 className="text-lg font-semibold text-slate-900">{report.title}</h4>
              <StatusBadge status={report.status} />
            </div>
            <div className="mt-3 space-y-1.5 text-sm text-slate-500">
              <div className="flex items-center gap-2">
                <Icon name="clipboard" className="h-4 w-4" />
                {report.category}
              </div>
              <div className="flex items-center gap-2">
                <Icon name="user" className="h-4 w-4" />
                {report.student}
              </div>
              <div className="flex items-center gap-2">
                <Icon name="pin" className="h-4 w-4" />
                {report.location}
              </div>
              <div className="flex items-center gap-2">
                <Icon name="calendar" className="h-4 w-4" />
                {formatDate(report.date)}
              </div>
              {report.photoName && (
                <div className="flex items-center gap-2">
                  <Icon name="camera" className="h-4 w-4" />
                  {report.photoName}
                </div>
              )}
            </div>
          </div>

          <div>
            <h5 className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-400">
              Description
            </h5>
            <p className="whitespace-pre-wrap text-sm text-slate-700">
              {report.description || '—'}
            </p>
          </div>

          <div>
            <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-400">
              Status
            </label>
            <select
              className={inputClass}
              value={report.status}
              onChange={(e) => onUpdate(report.id, { status: e.target.value as Status })}
            >
              {STATUSES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-400">
              Admin note
            </label>
            <textarea
              rows={4}
              className={inputClass}
              placeholder="Add a note for the record…"
              value={report.adminNote}
              onChange={(e) => onUpdate(report.id, { adminNote: e.target.value })}
            />
            <p className="mt-1 text-xs text-slate-400">Changes save automatically in this demo.</p>
          </div>
        </div>

        <div className="border-t border-slate-200 p-4">
          <button
            onClick={onClose}
            className="w-full rounded-lg bg-navy py-2.5 font-medium text-white transition hover:bg-navy-dark"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
