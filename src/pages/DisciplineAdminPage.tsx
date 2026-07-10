import { useState, type FormEvent } from 'react';
import type { DisciplineRecord } from '../types';
import { inputClass } from '../constants';
import { ROSTER } from '../data/roster';
import { VIOLATIONS } from '../data/discipline';
import { pointsFor, type NewDisciplineInput } from '../lib/discipline';
import { formatDateTime } from '../lib/format';
import { PageHeader } from '../components/PageHeader';
import { Section } from '../components/Section';
import { Field } from '../components/Field';
import { EmptyState } from '../components/EmptyState';
import { Icon } from '../components/Icon';
import { StudentPicker } from '../components/StudentPicker';

interface DisciplineAdminPageProps {
  records: DisciplineRecord[];
  onRecord: (input: NewDisciplineInput) => void;
}

// Admin Discipline page: record an action against a student — pick the student,
// choose a violation (which deducts its points), and assign a punishment + when
// it must be served. The student sees the result on their side.
export function DisciplineAdminPage({ records, onRecord }: DisciplineAdminPageProps) {
  const [student, setStudent] = useState(ROSTER[0]);
  const [violationId, setViolationId] = useState(VIOLATIONS[0].id);
  const [punishment, setPunishment] = useState('');
  const [scheduleAt, setScheduleAt] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [success, setSuccess] = useState('');
  const [search, setSearch] = useState(''); // filters the "Student points" list

  const violation = VIOLATIONS.find((v) => v.id === violationId) ?? VIOLATIONS[0];

  // Students matching the search box (case-insensitive, by name).
  const filteredRoster = ROSTER.filter((name) =>
    name.toLowerCase().includes(search.trim().toLowerCase()),
  );

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const next: Record<string, string> = {};
    if (!punishment.trim()) next.punishment = 'Please describe the punishment.';
    if (!scheduleAt) next.scheduleAt = 'Please set a punishment date/time.';
    setErrors(next);
    if (Object.keys(next).length > 0) {
      setSuccess('');
      return;
    }

    onRecord({ student, violation, punishment, scheduleAt });
    setPunishment('');
    setScheduleAt('');
    setErrors({});
    setSuccess(`Recorded. ${student} loses ${violation.points} points.`);
  }

  // Newest records first for the log.
  const log = records.slice().reverse();

  return (
    <div>
      <PageHeader
        title="Discipline"
        subtitle="Record disciplinary actions and set punishment schedules."
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Record form */}
        <Section>
          <h2 className="text-lg font-semibold text-slate-900">Record an action</h2>
          <p className="text-sm text-slate-500">
            Choosing a violation deducts its points from the student.
          </p>

          {success && (
            <div className="mt-4 flex items-start gap-2 rounded-xl bg-mint-soft px-3 py-2 text-sm text-green-800">
              <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0" />
              <span>{success}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate className="mt-4 space-y-4">
            <Field label="Student">
              <StudentPicker
                students={ROSTER}
                value={student}
                onChange={setStudent}
                pointsFor={(name) => pointsFor(name, records)}
              />
            </Field>

            <Field label="Violation">
              <select
                className={inputClass}
                value={violationId}
                onChange={(e) => setViolationId(e.target.value)}
              >
                {VIOLATIONS.map((v) => (
                  <option key={v.id} value={v.id}>
                    {v.label} (−{v.points} pts)
                  </option>
                ))}
              </select>
            </Field>

            <Field label="Punishment" error={errors.punishment}>
              <input
                className={inputClass + (errors.punishment ? ' border-red-400' : '')}
                placeholder="e.g. Extra cleaning duty: Courtyard"
                value={punishment}
                onChange={(e) => setPunishment(e.target.value)}
              />
            </Field>

            <Field label="Punishment schedule (date & time)" error={errors.scheduleAt}>
              <input
                type="datetime-local"
                className={inputClass + (errors.scheduleAt ? ' border-red-400' : '')}
                value={scheduleAt}
                onChange={(e) => setScheduleAt(e.target.value)}
              />
            </Field>

            <button
              type="submit"
              className="w-full rounded-xl bg-brand px-5 py-3 text-sm font-semibold text-white shadow-soft transition hover:bg-brand-dark active:scale-[0.98] sm:w-auto"
            >
              Record & Deduct {violation.points} pts
            </button>
          </form>
        </Section>

        {/* Points overview + recent log */}
        <div className="space-y-6">
          <Section>
            <h2 className="mb-3 text-lg font-semibold text-slate-900">Student points</h2>

            {/* Search: filters the list below by name as you type. */}
            <div className="relative mb-3">
              <Icon
                name="search"
                className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
              />
              <input
                className={inputClass + ' pl-9'}
                placeholder="Search a student…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            {filteredRoster.length === 0 ? (
              <EmptyState text={`No student matches "${search}".`} />
            ) : (
              <div className="space-y-1.5">
                {filteredRoster.map((name) => {
                  const pts = pointsFor(name, records);
                  return (
                    <div
                      key={name}
                      className="flex items-center justify-between rounded-lg px-3 py-2 text-sm odd:bg-slate-50"
                    >
                      <span className="text-slate-700">{name}</span>
                      <span
                        className={`font-semibold ${
                          pts >= 90 ? 'text-green-600' : pts >= 70 ? 'text-amber-600' : 'text-red-600'
                        }`}
                      >
                        {pts} pts
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </Section>

          <Section>
            <h2 className="mb-3 text-lg font-semibold text-slate-900">Recent actions</h2>
            {log.length === 0 ? (
              <EmptyState text="No disciplinary actions recorded yet." />
            ) : (
              <div className="space-y-2">
                {log.map((r) => (
                  <div key={r.id} className="rounded-xl border border-slate-200 p-3 text-sm">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-medium text-slate-900">{r.student}</span>
                      <span className="font-semibold text-red-600">−{r.points} pts</span>
                    </div>
                    <div className="mt-1 text-slate-600">{r.violation}</div>
                    <div className="mt-1 text-xs text-slate-500">
                      {r.punishment} · {formatDateTime(r.scheduleAt)}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Section>
        </div>
      </div>
    </div>
  );
}
