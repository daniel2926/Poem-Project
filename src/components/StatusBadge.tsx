import type { Status } from '../types';
import { STATUS_STYLES } from '../constants';

interface StatusBadgeProps {
  status: Status;
}

// Colored pill for a report status. Colors come from the shared constants.
export function StatusBadge({ status }: StatusBadgeProps) {
  const style = STATUS_STYLES[status];
  return (
    <span
      className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium ${style.badge}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${style.dot}`} />
      {status}
    </span>
  );
}
