import type { Schedule } from '../types';
import { DAYS, DORM } from '../constants';
import { Icon } from './Icon';
import { Section } from './Section';

// Small helper: dropdown to add a student to one day (dorm head only).
interface AddAssignmentProps {
  day: string;
  available: string[];
  onAdd: (day: string, name: string) => void;
}

function AddAssignment({ day, available, onAdd }: AddAssignmentProps) {
  if (available.length === 0) {
    return <span className="shrink-0 text-xs text-slate-300 sm:w-44">All assigned</span>;
  }
  return (
    <select
      value=""
      onChange={(e) => {
        if (e.target.value) onAdd(day, e.target.value);
      }}
      aria-label={`Add student to ${day}`}
      className="shrink-0 rounded-lg border border-slate-300 px-2 py-1.5 text-sm text-slate-600 focus:border-navy focus:outline-none focus:ring-2 focus:ring-navy/30 sm:w-44"
    >
      <option value="">+ Add student…</option>
      {available.map((n) => (
        <option key={n} value={n}>
          {n}
        </option>
      ))}
    </select>
  );
}

interface CleaningScheduleProps {
  schedule: Schedule;
  editable: boolean;
  roster?: string[];
  onAdd?: (day: string, name: string) => void;
  onRemove?: (day: string, name: string) => void;
}

// Weekly cleaning schedule. Editable for the dorm head; read-only for the admin.
export function CleaningSchedule({
  schedule,
  editable,
  roster = [],
  onAdd,
  onRemove,
}: CleaningScheduleProps) {
  return (
    <Section>
      <div className="mb-1 flex items-start justify-between gap-3">
        <div>
          <h2 className="flex items-center gap-2 text-lg font-semibold text-slate-900">
            <Icon name="broom" className="h-5 w-5 text-navy" />
            {editable ? 'Manage Cleaning Schedule' : 'Cleaning Schedule'}
          </h2>
          <p className="mt-0.5 text-sm text-slate-500">Weekly cleaning duties for {DORM}.</p>
        </div>
        {!editable && (
          <span className="shrink-0 rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-500">
            View only
          </span>
        )}
      </div>

      <div className="mt-4 divide-y divide-slate-100">
        {DAYS.map((day) => {
          const assigned = schedule[day] ?? [];
          const available = roster.filter((n) => !assigned.includes(n));
          return (
            <div key={day} className="flex flex-col gap-2 py-3 sm:flex-row sm:items-center sm:gap-4">
              <div className="w-full shrink-0 font-medium text-slate-700 sm:w-28">{day}</div>
              <div className="flex flex-1 flex-wrap items-center gap-2">
                {assigned.length === 0 && (
                  <span className="text-sm italic text-slate-400">No one assigned yet</span>
                )}
                {assigned.map((name) => (
                  <span
                    key={name}
                    className="inline-flex items-center gap-1.5 rounded-full bg-navy/5 px-2.5 py-1 text-sm text-navy"
                  >
                    {name}
                    {editable && (
                      <button
                        onClick={() => onRemove?.(day, name)}
                        aria-label={`Remove ${name} from ${day}`}
                        className="transition hover:text-red-600"
                      >
                        <Icon name="x" className="h-3.5 w-3.5" />
                      </button>
                    )}
                  </span>
                ))}
              </div>
              {editable && onAdd && (
                <AddAssignment day={day} available={available} onAdd={onAdd} />
              )}
            </div>
          );
        })}
      </div>

      <p className="mt-4 text-xs text-slate-400">
        {editable
          ? 'As dorm head, you manage cleaning duties for your dorm. The admin can view this schedule for oversight.'
          : 'Read-only oversight. This schedule is managed by the dorm head; final authority stays with the admin.'}
      </p>
    </Section>
  );
}
