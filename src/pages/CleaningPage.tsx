import { useState, type FormEvent } from 'react';
import type { AttendanceTask, PlaceSchedule } from '../types';
import { inputClass } from '../constants';
import { PageHeader } from '../components/PageHeader';
import { Section } from '../components/Section';
import { EmptyState } from '../components/EmptyState';
import { Icon } from '../components/Icon';
import { AttendancePanel } from '../components/AttendancePanel';

// The attendance actions the dorm-head panel needs (passed straight through).
export interface CleaningAttendance {
  tasks: AttendanceTask[];
  deadline: string;
  deadlinePassed: boolean;
  setDeadline: (value: string) => void;
  approve: (student: string) => void;
  reject: (student: string) => void;
  endDeadlineNow: () => void;
  confirmDemerit: (student: string) => void;
  excuse: (student: string) => void;
  confirmAllDemerits: () => void;
}

interface CleaningPageProps {
  schedule: PlaceSchedule;
  students: string[];
  places: string[];
  onAddStudent: (name: string) => void;
  onRemoveStudent: (name: string) => void;
  onAddPlace: (place: string) => void;
  onRemovePlace: (place: string) => void;
  onRegenerate: () => void; // reshuffle into a fresh assignment (dorm head)
  canEdit: boolean; // admin or dorm head
  dorm: string;
  attendance: CleaningAttendance; // proof verification + demerits
}

// Static accent class sets (Tailwind can't see dynamically-built class names).
const ACCENTS = {
  brand: {
    icon: 'text-brand',
    addBtn: 'bg-brand',
    chip: 'bg-brand/10 text-brand',
  },
  mint: {
    icon: 'text-mint',
    addBtn: 'bg-mint',
    chip: 'bg-mint-soft text-green-700',
  },
} as const;

// A small "add + list of removable chips" editor used for both students and
// places. Adding is one action (Enter or the + button); removing is one tap.
function ChipEditor({
  title,
  icon,
  placeholder,
  items,
  onAdd,
  onRemove,
  accent,
}: {
  title: string;
  icon: string;
  placeholder: string;
  items: string[];
  onAdd: (value: string) => void;
  onRemove: (value: string) => void;
  accent: keyof typeof ACCENTS;
}) {
  const [value, setValue] = useState('');
  const style = ACCENTS[accent];

  function submit(e: FormEvent) {
    e.preventDefault();
    if (!value.trim()) return;
    onAdd(value);
    setValue('');
  }

  return (
    <div>
      <h3 className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
        <Icon name={icon} className={`h-4 w-4 ${style.icon}`} />
        {title}
        <span className="ml-auto text-xs font-normal text-slate-400">{items.length}</span>
      </h3>

      <form onSubmit={submit} className="flex gap-2">
        <input
          className={inputClass}
          placeholder={placeholder}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button
          type="submit"
          aria-label={`Add ${title}`}
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-white transition hover:opacity-90 active:scale-95 ${style.addBtn}`}
        >
          <Icon name="plus" className="h-5 w-5" />
        </button>
      </form>

      <div className="mt-3 flex flex-wrap gap-2">
        {items.length === 0 && (
          <span className="text-sm italic text-slate-400">Nothing added yet.</span>
        )}
        {items.map((item) => (
          <span
            key={item}
            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium ${style.chip}`}
          >
            {item}
            <button
              onClick={() => onRemove(item)}
              aria-label={`Remove ${item}`}
              className="transition hover:text-red-600"
            >
              <Icon name="x" className="h-3.5 w-3.5" />
            </button>
          </span>
        ))}
      </div>
    </div>
  );
}

// Cleaning Schedule page. The dorm head/admin adds students and places; the
// assignment (each student to one place, evenly, no duplicates) re-generates
// automatically on every change and is shown as a table below.
export function CleaningPage({
  schedule,
  students,
  places,
  onAddStudent,
  onRemoveStudent,
  onAddPlace,
  onRemovePlace,
  onRegenerate,
  canEdit,
  dorm,
  attendance,
}: CleaningPageProps) {
  const hasResult = places.length > 0 && students.length > 0;

  return (
    <div>
      <PageHeader
        title="Cleaning Schedule"
        subtitle={`Cleaning assignments for ${dorm} — updates automatically.`}
      />

      {canEdit && (
        <Section className="mb-6">
          <div className="mb-4 flex items-start gap-2 rounded-xl bg-mint-soft px-3 py-2 text-sm text-green-800">
            <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0" />
            <span>
              Add students and places below — the schedule builds itself. Use Auto-generate for a
              fresh shuffle.
            </span>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <ChipEditor
              title="Students"
              icon="user"
              placeholder="Add a student name…"
              items={students}
              onAdd={onAddStudent}
              onRemove={onRemoveStudent}
              accent="brand"
            />
            <ChipEditor
              title="Places"
              icon="broom"
              placeholder="Add a cleaning place…"
              items={places}
              onAdd={onAddPlace}
              onRemove={onRemovePlace}
              accent="mint"
            />
          </div>
        </Section>
      )}

      <Section>
        <div className="mb-3 flex items-center justify-between gap-3">
          <h2 className="text-lg font-semibold text-slate-900">Assignments</h2>
          {canEdit && hasResult && (
            <button
              type="button"
              onClick={onRegenerate}
              className="inline-flex shrink-0 items-center gap-1.5 rounded-xl bg-brand px-3.5 py-2 text-sm font-semibold text-white shadow-soft transition hover:bg-brand-dark active:scale-95"
            >
              <Icon name="refresh" className="h-4 w-4" />
              Auto-generate
            </button>
          )}
        </div>
        {!hasResult ? (
          <EmptyState
            text={
              canEdit
                ? 'Add at least one student and one place to see the schedule.'
                : 'No cleaning schedule yet.'
            }
          />
        ) : (
          <div className="overflow-hidden rounded-2xl border border-slate-100">
            <table className="w-full text-left text-sm">
              <thead className="bg-sky-soft/60 text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-4 py-3 font-semibold">Place</th>
                  <th className="px-4 py-3 font-semibold">Assigned students</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {places.map((place) => {
                  const names = schedule[place] ?? [];
                  return (
                    <tr key={place} className="align-top">
                      <td className="whitespace-nowrap px-4 py-3 font-medium text-slate-800">
                        <span className="inline-flex items-center gap-2">
                          <Icon name="broom" className="h-4 w-4 text-mint" />
                          {place}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex flex-wrap gap-1.5">
                          {names.length === 0 ? (
                            <span className="text-xs italic text-slate-400">—</span>
                          ) : (
                            names.map((name) => (
                              <span
                                key={name}
                                className="rounded-full bg-brand/10 px-2.5 py-1 text-brand"
                              >
                                {name}
                              </span>
                            ))
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {hasResult && (
          <p className="mt-4 text-xs text-slate-400">
            {students.length} student{students.length !== 1 ? 's' : ''} across {places.length}{' '}
            place{places.length !== 1 ? 's' : ''} · each student appears exactly once.
          </p>
        )}
      </Section>

      {/* Attendance: verify proofs + handle missed duties (dorm head / admin). */}
      <div className="mt-6">
        <AttendancePanel
          tasks={attendance.tasks}
          deadline={attendance.deadline}
          deadlinePassed={attendance.deadlinePassed}
          onSetDeadline={attendance.setDeadline}
          onApprove={attendance.approve}
          onReject={attendance.reject}
          onEndDeadline={attendance.endDeadlineNow}
          onConfirmDemerit={attendance.confirmDemerit}
          onExcuse={attendance.excuse}
          onConfirmAll={attendance.confirmAllDemerits}
        />
      </div>
    </div>
  );
}
