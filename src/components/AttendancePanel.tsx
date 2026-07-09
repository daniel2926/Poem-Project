import type { AttendanceTask } from '../types';
import { inputClass } from '../constants';
import { formatDateTime } from '../lib/format';
import { Section } from './Section';
import { EmptyState } from './EmptyState';
import { Icon } from './Icon';
import { AttendanceBadge } from './AttendanceBadge';

interface AttendancePanelProps {
  tasks: AttendanceTask[];
  deadline: string;
  deadlinePassed: boolean;
  onSetDeadline: (value: string) => void;
  onApprove: (student: string) => void;
  onReject: (student: string) => void;
  onEndDeadline: () => void;
  onConfirmDemerit: (student: string) => void;
  onExcuse: (student: string) => void;
  onConfirmAll: () => void;
}

// Dorm-head / admin attendance panel: verify submitted proofs, run the
// deadline, and confirm demerits for missed students. (Mock proof photos have
// no real image data, so a camera tile + filename stands in for the thumbnail.)
export function AttendancePanel({
  tasks,
  deadline,
  deadlinePassed,
  onSetDeadline,
  onApprove,
  onReject,
  onEndDeadline,
  onConfirmDemerit,
  onExcuse,
  onConfirmAll,
}: AttendancePanelProps) {
  const pending = tasks.filter((t) => t.status === 'Pending');
  const missed = tasks.filter((t) => t.status === 'Missed');

  // Small counts for the overview chips.
  const count = (s: AttendanceTask['status']) => tasks.filter((t) => t.status === s).length;

  return (
    <div className="space-y-6">
      {/* Overview + deadline control */}
      <Section>
        <h2 className="text-lg font-semibold text-slate-900">Cleaning attendance</h2>
        <p className="text-sm text-slate-500">Verify proofs and handle missed duties.</p>

        {/* Status counts */}
        <div className="mt-3 flex flex-wrap gap-2 text-xs">
          <span className="rounded-full bg-slate-100 px-2.5 py-1 text-slate-600">
            To do {count('To do')}
          </span>
          <span className="rounded-full bg-amber-100 px-2.5 py-1 text-amber-800">
            Pending {count('Pending')}
          </span>
          <span className="rounded-full bg-green-100 px-2.5 py-1 text-green-800">
            Approved {count('Approved')}
          </span>
          <span className="rounded-full bg-red-100 px-2.5 py-1 text-red-800">
            Missed {count('Missed')}
          </span>
        </div>

        {/* Deadline control — its own row so nothing crowds together */}
        <div className="mt-4 rounded-2xl border border-slate-100 bg-slate-50/70 p-3">
          <div className="flex items-center justify-between gap-2">
            <label className="text-sm font-medium text-slate-700">Deadline</label>
            {deadlinePassed && (
              <span className="rounded-full bg-slate-200 px-2.5 py-0.5 text-xs font-medium text-slate-600">
                Closed
              </span>
            )}
          </div>
          <div className="mt-2 flex flex-col gap-2 sm:flex-row sm:items-center">
            <input
              type="datetime-local"
              className={inputClass + ' flex-1'}
              value={deadline}
              disabled={deadlinePassed}
              onChange={(e) => onSetDeadline(e.target.value)}
            />
            <button
              type="button"
              onClick={onEndDeadline}
              disabled={deadlinePassed}
              className="inline-flex shrink-0 items-center justify-center gap-1.5 rounded-xl bg-slate-800 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-900 active:scale-95 disabled:opacity-50 sm:w-auto"
            >
              <Icon name="clock" className="h-4 w-4" />
              {deadlinePassed ? 'Deadline ended' : 'End now'}
            </button>
          </div>
          <p className="mt-2 text-xs text-slate-400">
            Ending the deadline marks anyone without proof as “Missed”.
          </p>
        </div>
      </Section>

      {/* Submitted proofs to verify */}
      <Section>
        <h3 className="mb-3 text-lg font-semibold text-slate-900">Submitted proofs</h3>
        {pending.length === 0 ? (
          <EmptyState text="No proofs waiting for verification." />
        ) : (
          <div className="space-y-3">
            {pending.map((t) => (
              <div
                key={t.id}
                className="rounded-2xl border border-slate-100 bg-white p-3 shadow-card"
              >
                {/* Proof thumbnail + student info */}
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-sky-soft text-sky">
                    <Icon name="camera" className="h-5 w-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="truncate font-medium text-slate-900">{t.student}</div>
                    <div className="truncate text-xs text-slate-500">
                      {t.place} · {formatDateTime(t.submittedAt)}
                    </div>
                    <div className="truncate text-xs text-slate-400">{t.photoName || 'photo.jpg'}</div>
                  </div>
                </div>

                {/* Approve / Reject — own row, evenly split */}
                <div className="mt-3 grid grid-cols-2 gap-2">
                  <button
                    onClick={() => onApprove(t.student)}
                    className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-green-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-green-700 active:scale-95"
                  >
                    <Icon name="check" className="h-4 w-4" />
                    Approve
                  </button>
                  <button
                    onClick={() => onReject(t.student)}
                    className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-red-300 bg-white px-3 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-50 active:scale-95"
                  >
                    <Icon name="x" className="h-4 w-4" />
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </Section>

      {/* Missed → confirm demerit / excuse */}
      <Section>
        <div className="mb-3 flex items-center justify-between gap-3">
          <h3 className="text-lg font-semibold text-slate-900">Missed duties</h3>
          {missed.length > 0 && (
            <button
              onClick={onConfirmAll}
              className="shrink-0 rounded-xl bg-brand px-3 py-2 text-sm font-semibold text-white shadow-soft transition hover:bg-brand-dark active:scale-95"
            >
              Confirm all (−1 each)
            </button>
          )}
        </div>

        {!deadlinePassed && missed.length === 0 ? (
          <EmptyState text='No missed duties. (Use "End now" to close the deadline.)' />
        ) : missed.length === 0 ? (
          <EmptyState text="No missed duties — everyone submitted in time." />
        ) : (
          <div className="space-y-2">
            {missed.map((t) => (
              <div
                key={t.id}
                className="flex flex-col gap-3 rounded-2xl border border-red-100 bg-red-50/40 p-3 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex items-center gap-2">
                  <Icon name="user" className="h-4 w-4 text-slate-400" />
                  <span className="font-medium text-slate-900">{t.student}</span>
                  <AttendanceBadge status={t.status} />
                  <span className="text-xs text-slate-500">· {t.place}</span>
                </div>
                <div className="flex shrink-0 gap-2">
                  <button
                    onClick={() => onConfirmDemerit(t.student)}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-red-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-red-700"
                  >
                    <Icon name="shield" className="h-4 w-4" />
                    Confirm demerit
                  </button>
                  <button
                    onClick={() => onExcuse(t.student)}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
                  >
                    Excused
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </Section>
    </div>
  );
}
