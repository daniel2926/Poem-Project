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
    if (!reason.trim()) next.reason = 'Required';
    if (!destination.trim()) next.destination = 'Required';
    if (!leaveAt) next.leaveAt = 'Required';
    if (!returnAt) next.returnAt = 'Required';
    if (leaveAt && returnAt && returnAt < leaveAt) {
      next.returnAt = 'Must be after leave';
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
    setSuccess('Request sent.');
  }

  return (
    <div>
      <PageHeader title="Dorm Permission" subtitle="Ask to leave · track status." />

      <div className="space-y-6">
        {/* Request form — full width, on top */}
        <Section>
          <h2 className="text-lg font-semibold text-slate-900">New request</h2>

          {success && (
            <div className="mt-4 flex items-start gap-2 rounded-xl bg-mint-soft px-3 py-2 text-sm text-green-800">
              <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0" />
              <span>{success}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate className="mt-4 space-y-4">
            <Field label="Reason" error={errors.reason}>
              <input
                className={inputClass + (errors.reason ? ' border-red-400' : '')}
                placeholder="Family visit"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
              />
            </Field>
            <Field label="Destination" error={errors.destination}>
              <input
                className={inputClass + (errors.destination ? ' border-red-400' : '')}
                placeholder="Bandung"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
              />
            </Field>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field label="Leave" error={errors.leaveAt}>
                <input
                  type="datetime-local"
                  className={inputClass + (errors.leaveAt ? ' border-red-400' : '')}
                  value={leaveAt}
                  onChange={(e) => setLeaveAt(e.target.value)}
                />
              </Field>
              <Field label="Return" error={errors.returnAt}>
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
              className="w-full rounded-xl bg-brand px-5 py-3 text-sm font-semibold text-white shadow-soft transition hover:bg-brand-dark active:scale-[0.98]"
            >
              Send
            </button>
          </form>
        </Section>

        {/* My requests — full width, below the form */}
        <Section>
          <div className="mb-3 flex items-baseline justify-between gap-2">
            <h2 className="whitespace-nowrap text-lg font-semibold text-slate-900">My Requests</h2>
            <span className="shrink-0 text-sm text-slate-400">{myRequests.length}</span>
          </div>

          {myRequests.length === 0 ? (
            <EmptyState text="No requests yet." />
          ) : (
            <div className="space-y-3">
              {myRequests.map((r) => (
                <div key={r.id} className="rounded-2xl border border-slate-100 bg-white p-4 shadow-card">
                  <div className="mb-1.5 flex justify-end">
                    <PermissionBadge status={r.status} />
                  </div>
                  <div className="font-semibold text-slate-900">{r.reason}</div>
                  <div className="mt-1 flex items-center gap-1 text-sm text-slate-500">
                    <Icon name="pin" className="h-3.5 w-3.5 shrink-0" />
                    {r.destination}
                  </div>
                  <div className="mt-1.5 text-sm text-slate-500">
                    {formatDateTime(r.leaveAt)} → {formatDateTime(r.returnAt)}
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
