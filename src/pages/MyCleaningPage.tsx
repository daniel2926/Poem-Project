import { useState } from 'react';
import type { AttendanceTask, PlaceSchedule } from '../types';
import { assignmentFor } from '../lib/schedule';
import { formatDateTime } from '../lib/format';
import { PageHeader } from '../components/PageHeader';
import { Section } from '../components/Section';
import { EmptyState } from '../components/EmptyState';
import { Icon } from '../components/Icon';
import { AttendanceBadge } from '../components/AttendanceBadge';

interface MyCleaningPageProps {
  studentName: string;
  schedule: PlaceSchedule;
  dorm: string;
  task: AttendanceTask | null; // the student's own attendance task
  onSubmitProof: (photoName: string) => void;
}

// The student's cleaning task card: shows status and lets them "Mark Done" by
// attaching a proof photo (mock) → Pending verification.
function TaskCard({
  task,
  onSubmitProof,
}: {
  task: AttendanceTask;
  onSubmitProof: (photoName: string) => void;
}) {
  const [photoName, setPhotoName] = useState('');

  const canSubmit = task.status === 'To do' || task.status === 'Missed';

  return (
    <Section>
      <div className="mb-3 flex items-center justify-between gap-3">
        <h2 className="text-lg font-semibold text-slate-900">My task</h2>
        <AttendanceBadge status={task.status} />
      </div>

      {/* Already submitted / decided states */}
      {task.status === 'Pending' && (
        <div className="rounded-xl bg-amber-50 px-3 py-2.5 text-sm text-amber-800">
          <div className="flex items-center gap-2 font-medium">
            <Icon name="clock" className="h-4 w-4" />
            Waiting for the dorm head to verify your proof.
          </div>
          <div className="mt-1 text-xs text-amber-700/80">
            {task.photoName} · sent {formatDateTime(task.submittedAt)}
          </div>
        </div>
      )}

      {task.status === 'Approved' && (
        <div className="flex items-center gap-2 rounded-xl bg-mint-soft px-3 py-2.5 text-sm text-green-800">
          <Icon name="check" className="h-4 w-4" />
          Verified — nice work! Your cleaning is done.
        </div>
      )}

      {task.status === 'Excused' && (
        <div className="flex items-center gap-2 rounded-xl bg-sky-soft px-3 py-2.5 text-sm text-sky">
          <Icon name="check" className="h-4 w-4" />
          You missed this one, but the dorm head excused it — no point lost.
        </div>
      )}

      {task.status === 'Demerit' && (
        <div className="flex items-center gap-2 rounded-xl bg-red-50 px-3 py-2.5 text-sm text-red-700">
          <Icon name="x" className="h-4 w-4" />
          Missed — a −1 demerit was recorded on your discipline page.
        </div>
      )}

      {/* Submit / resubmit proof */}
      {canSubmit && (
        <div>
          {task.status === 'Missed' && (
            <p className="mb-3 text-sm text-red-600">
              You missed the deadline. You can still send proof.
            </p>
          )}
          <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-dashed border-slate-300 px-3 py-3 transition hover:border-brand">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-500">
              <Icon name="camera" className="h-5 w-5" />
            </span>
            <span className="min-w-0 flex-1 truncate text-sm text-slate-600">
              {photoName || 'Choose a proof photo'}
            </span>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => setPhotoName(e.target.files?.[0]?.name ?? '')}
            />
            <span className="ml-auto shrink-0 text-xs text-slate-400">Mock only</span>
          </label>

          <button
            type="button"
            disabled={!photoName}
            onClick={() => onSubmitProof(photoName)}
            className="mt-3 w-full rounded-xl bg-brand px-5 py-3 text-sm font-semibold text-white shadow-soft transition enabled:hover:bg-brand-dark enabled:active:scale-[0.98] disabled:opacity-50"
          >
            Mark Done
          </button>
          <p className="mt-2 text-xs text-slate-400">
            Attach a photo of your finished spot to mark the task done.
          </p>
        </div>
      )}
    </Section>
  );
}

// Student's OWN cleaning schedule + task — read-only schedule, but they can
// mark their own task done with a proof photo. Only the dorm head/admin manages
// the schedule and verifies proofs.
export function MyCleaningPage({
  studentName,
  schedule,
  dorm,
  task,
  onSubmitProof,
}: MyCleaningPageProps) {
  const mine = assignmentFor(studentName, schedule);

  return (
    <div className="space-y-5">
      <PageHeader title="My Cleaning" subtitle="Your cleaning duty and task status." />

      {!mine ? (
        <Section>
          <EmptyState text="You're not assigned to a cleaning place yet." />
        </Section>
      ) : (
        <>
          {/* Big "your place" card */}
          <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-brand to-brand-light p-6 text-white shadow-soft">
            <div className="flex items-center gap-2 text-sm text-white/80">
              <Icon name="broom" className="h-4 w-4" />
              Your place
            </div>
            <div className="mt-1 text-3xl font-bold tracking-tight">{mine.place}</div>
            <div className="mt-1 text-sm text-white/80">{dorm}</div>
          </div>

          {/* Task + proof */}
          {task && <TaskCard task={task} onSubmitProof={onSubmitProof} />}

          {/* Teammates */}
          <Section>
            <h2 className="mb-3 flex items-center gap-2 text-lg font-semibold text-slate-900">
              <Icon name="user" className="h-5 w-5 text-brand" />
              Cleaning with you
            </h2>
            {mine.teammates.length === 0 ? (
              <p className="text-sm text-slate-500">Just you on this spot — nice and simple.</p>
            ) : (
              <div className="flex flex-wrap gap-2">
                {mine.teammates.map((name) => (
                  <span
                    key={name}
                    className="rounded-full bg-brand/10 px-3 py-1.5 text-sm font-medium text-brand"
                  >
                    {name}
                  </span>
                ))}
              </div>
            )}
          </Section>

          <p className="px-1 text-xs text-slate-400">
            The dorm head manages this schedule and verifies proof photos.
          </p>
        </>
      )}
    </div>
  );
}
