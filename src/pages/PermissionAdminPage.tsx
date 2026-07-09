import type { PermissionRequest, PermissionStatus } from '../types';
import { formatDateTime } from '../lib/format';
import { PageHeader } from '../components/PageHeader';
import { Section } from '../components/Section';
import { EmptyState } from '../components/EmptyState';
import { Icon } from '../components/Icon';
import { PermissionBadge } from '../components/PermissionBadge';

interface PermissionAdminPageProps {
  requests: PermissionRequest[];
  onSetStatus: (id: string, status: PermissionStatus) => void;
}

// Admin view of Dorm Permission: every request with Approve / Reject controls.
// Setting a status updates the corresponding student's view.
export function PermissionAdminPage({ requests, onSetStatus }: PermissionAdminPageProps) {
  const pending = requests.filter((r) => r.status === 'Pending');
  const decided = requests.filter((r) => r.status !== 'Pending');

  function Row({ r }: { r: PermissionRequest }) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <Icon name="user" className="h-4 w-4 text-slate-400" />
              <span className="font-medium text-slate-900">{r.student}</span>
              <PermissionBadge status={r.status} />
            </div>
            <div className="mt-2 space-y-1 text-sm text-slate-600">
              <div>{r.reason}</div>
              <div className="flex items-center gap-1 text-slate-500">
                <Icon name="pin" className="h-3.5 w-3.5" />
                {r.destination}
              </div>
              <div className="text-slate-500">
                {formatDateTime(r.leaveAt)} → {formatDateTime(r.returnAt)}
              </div>
            </div>
          </div>

          {r.status === 'Pending' ? (
            <div className="flex shrink-0 gap-2">
              <button
                onClick={() => onSetStatus(r.id, 'Approved')}
                className="inline-flex items-center gap-1.5 rounded-lg bg-green-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-green-700"
              >
                <Icon name="check" className="h-4 w-4" />
                Approve
              </button>
              <button
                onClick={() => onSetStatus(r.id, 'Rejected')}
                className="inline-flex items-center gap-1.5 rounded-lg border border-red-300 bg-white px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50"
              >
                <Icon name="x" className="h-4 w-4" />
                Reject
              </button>
            </div>
          ) : (
            <button
              onClick={() => onSetStatus(r.id, 'Pending')}
              className="shrink-0 self-start rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-medium text-slate-500 transition hover:bg-slate-50"
            >
              Reset to Pending
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div>
      <PageHeader title="Dorm Permission" subtitle="Approve or reject requests." />

      <Section>
        <div className="mb-3 flex items-baseline justify-between">
          <h2 className="text-lg font-semibold text-slate-900">Pending</h2>
          <span className="text-sm text-slate-400">{pending.length}</span>
        </div>
        {pending.length === 0 ? (
          <EmptyState text="All caught up." />
        ) : (
          <div className="space-y-3">
            {pending.map((r) => (
              <Row key={r.id} r={r} />
            ))}
          </div>
        )}
      </Section>

      <div className="mt-6">
        <Section>
          <h2 className="mb-3 text-lg font-semibold text-slate-900">Decided</h2>
          {decided.length === 0 ? (
            <EmptyState text="Nothing decided yet." />
          ) : (
            <div className="space-y-3">
              {decided.map((r) => (
                <Row key={r.id} r={r} />
              ))}
            </div>
          )}
        </Section>
      </div>
    </div>
  );
}
