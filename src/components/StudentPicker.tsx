import { useState } from 'react';
import { inputClass } from '../constants';
import { Icon } from './Icon';

interface StudentPickerProps {
  students: string[];
  value: string; // currently selected student name
  onChange: (name: string) => void;
  pointsFor?: (name: string) => number; // optional trailing "— N pts" hint
}

// A searchable student picker for the discipline form. Instead of scrolling a
// giant <select>, the admin types to filter and taps a name — works whether
// there are 7 students or thousands.
export function StudentPicker({ students, value, onChange, pointsFor }: StudentPickerProps) {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);

  const q = query.trim().toLowerCase();
  const matches = q
    ? students.filter((name) => name.toLowerCase().includes(q))
    : students;
  const shown = matches.slice(0, 50); // cap the visible list; search narrows it

  function pick(name: string) {
    onChange(name);
    setQuery('');
    setOpen(false);
  }

  return (
    <div className="relative">
      {/* Search input */}
      <div className="relative">
        <Icon
          name="search"
          className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
        />
        <input
          className={inputClass + ' pl-9'}
          placeholder="Search a student…"
          value={query}
          onFocus={() => setOpen(true)}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          // Delay closing so a click on a result registers first.
          onBlur={() => setTimeout(() => setOpen(false), 120)}
        />
      </div>

      {/* Currently selected (shown when not actively browsing) */}
      {!open && value && (
        <div className="mt-2 flex items-center gap-2 rounded-xl border border-brand/20 bg-brand/5 px-3 py-2 text-sm">
          <Icon name="user" className="h-4 w-4 text-brand" />
          <span className="font-medium text-slate-800">{value}</span>
          {pointsFor && (
            <span className="ml-auto text-xs text-slate-500">{pointsFor(value)} pts</span>
          )}
        </div>
      )}

      {/* Results dropdown */}
      {open && (
        <div className="absolute z-20 mt-1 max-h-60 w-full overflow-y-auto rounded-xl border border-slate-200 bg-white py-1 shadow-soft">
          {shown.length === 0 ? (
            <div className="px-3 py-3 text-sm text-slate-400">No student matches “{query}”.</div>
          ) : (
            shown.map((name) => {
              const active = name === value;
              return (
                <button
                  key={name}
                  type="button"
                  // onMouseDown fires before input blur, so the pick registers.
                  onMouseDown={() => pick(name)}
                  className={`flex w-full items-center gap-2 px-3 py-2 text-left text-sm transition hover:bg-slate-50 ${
                    active ? 'text-brand' : 'text-slate-700'
                  }`}
                >
                  <Icon name="user" className="h-4 w-4 shrink-0 text-slate-400" />
                  <span className="min-w-0 flex-1 truncate">{name}</span>
                  {pointsFor && (
                    <span className="shrink-0 text-xs text-slate-400">{pointsFor(name)} pts</span>
                  )}
                  {active && <Icon name="check" className="h-4 w-4 shrink-0 text-brand" />}
                </button>
              );
            })
          )}
          {matches.length > shown.length && (
            <div className="px-3 py-2 text-xs text-slate-400">
              Showing {shown.length} of {matches.length} — keep typing to narrow.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
