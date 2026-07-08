import type { Category, Status } from '../types';
import { CATEGORIES, STATUSES, filterSelectClass } from '../constants';
import { Icon } from './Icon';

interface FilterBarProps {
  status: Status | 'All';
  category: Category | 'All';
  onStatus: (status: Status | 'All') => void;
  onCategory: (category: Category | 'All') => void;
}

// Two dropdowns to filter the admin report list by status and category.
export function FilterBar({ status, category, onStatus, onCategory }: FilterBarProps) {
  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
      <div className="flex items-center gap-2">
        <Icon name="filter" className="hidden h-4 w-4 text-slate-400 sm:block" />
        <select
          className={filterSelectClass}
          value={status}
          onChange={(e) => onStatus(e.target.value as Status | 'All')}
          aria-label="Filter by status"
        >
          <option value="All">All statuses</option>
          {STATUSES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>
      <select
        className={filterSelectClass}
        value={category}
        onChange={(e) => onCategory(e.target.value as Category | 'All')}
        aria-label="Filter by category"
      >
        <option value="All">All categories</option>
        {CATEGORIES.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>
    </div>
  );
}
