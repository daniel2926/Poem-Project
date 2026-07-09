import { useState, type FormEvent } from 'react';
import type { PermissionRequest } from '../types';
import { inputClass } from '../constants';
import { formatDateTime } from '../lib/format';
import type { NewPermissionInput } from '../lib/permissions';
import { PageHeader } from '../components/PageHeader';
import { Section } from '../components/Section';
import { Field } from '../components/Field';
import { EmptyState } from '../components/EmptyState';
import { Icon } from '../components/Icon';
import { PermissionBadge } from '../components/PermissionBadge';

interface PermissionStudentPageProps {
  myRequests: PermissionRequest[];
  onSubmit: (input: NewPermissionInput) => void;
}

// Student view of Dorm Permission: request to leave the dorm and track the
// status (Pending / Approved / Rejected) of each request.
export function PermissionStudentPage({ myRequests, onSubmit }: PermissionStudentPageProps) {
  const [reason, setReason] = useState('');
  const [destination, setDestination] = useState('');
  const [leaveAt, setLeaveAt] = useState('');
  const [returnAt, setReturnAt] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [success, setSuccess] = useState('');

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const next: Record<string, string> = {};
    if (!reason.trim()) next.reason = 'Please enter a reason.';
    if (!destination.trim()) next.destination = 'Please enter a destination.';
    if (!leaveAt) next.leaveAt = 'Please pick a leave date/time.';
    if (!returnAt) next.returnAt = 'Please pick a return date/time.';
    if (leaveAt && returnAt && returnAt < leaveAt) {
      next.returnAt = 'Return must be after the leave time.';
    }
    setErrors(next);
    if (Object.keys(next).length > 0) {
      setSuccess('');
      return;
    }

    onSubmit({ reason, destination, leaveAt, returnAt });
    setReason('');
    setDestination('');
    setLeaveAt('');
    setReturnAt('');
    setErrors({});
    setSuccess('Request submitted! Track its status below.');
  }

  return (
    <div>
      <PageHeader
        title="Dorm Permission"
        subtitle="Request permission to leave the dorm and track its status."
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Request form */}
        <Section>
          <h2 className="text-lg font-semibold text-slate-900">New request</h2>
          <p className="text-sm text-slate-500">Tell the admin where you're going and when.</p>

          {success && (
            <div className="mt-4 flex items-start gap-2 rounded-lg bg-green-50 px-3 py-2 text-sm text-green-800">
              <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0" />
              <span>{success}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate className="mt-4 space-y-4">
            <Field label="Reason" error={errors.reason}>
              <input
                className={inputClass + (errors.reason ? ' border-red-400' : '')}
                placeholder="e.g. Family visit"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
              />
            </Field>
            <Field label="Destination" error={errors.destination}>
              <input
                className={inputClass + (errors.destination ? ' border-red-400' : '')}
                placeholder="e.g. Bandung"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
              />
            </Field>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field label="Leave date & time" error={errors.leaveAt}>
                <input
                  type="datetime-local"
                  className={inputClass + (errors.leaveAt ? ' border-red-400' : '')}
                  value={leaveAt}
                  onChange={(e) => setLeaveAt(e.target.value)}
                />
              </Field>
              <Field label="Return date & time" error={errors.returnAt}>
                <input
                  type="datetime-local"
                  className={inputClass + (errors.returnAt ? ' border-red-400' : '')}
                  value={returnAt}
                  onChange={(e) => setReturnAt(e.target.value)}
                />
              </Field>
            </div>
            <button
              type="submit"
              className="w-full rounded-lg bg-navy px-5 py-2.5 text-sm font-medium text-white transition hover:bg-navy-dark sm:w-auto"
            >
              Submit Request
            </button>
          </form>
        </Section>

        {/* My requests */}
        <Section>
          <div className="mb-3 flex items-baseline justify-between">
            <h2 className="text-lg font-semibold text-slate-900">My Requests</h2>
            <span className="text-sm text-slate-400">
              {myRequests.length} request{myRequests.length !== 1 ? 's' : ''}
            </span>
          </div>

          {myRequests.length === 0 ? (
            <EmptyState text="No requests yet. Submit one to see its status here." />
          ) : (
            <div className="space-y-3">
              {myRequests.map((r) => (
                <div key={r.id} className="rounded-xl border border-slate-200 p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="font-medium text-slate-900">{r.reason}</div>
                      <div className="mt-1 flex items-center gap-1 text-sm text-slate-500">
                        <Icon name="pin" className="h-3.5 w-3.5" />
                        {r.destination}
                      </div>
                    </div>
                    <PermissionBadge status={r.status} />
                  </div>
                  <div className="mt-3 grid grid-cols-1 gap-1 text-sm text-slate-500 sm:grid-cols-2">
                    <span>Leave: {formatDateTime(r.leaveAt)}</span>
                    <span>Return: {formatDateTime(r.returnAt)}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Section>
      </div>
    </div>
  );
}
