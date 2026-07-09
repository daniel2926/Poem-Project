import type { PermissionStatus } from '../types';
import { PERMISSION_STYLES } from '../lib/permissions';

// Colored pill for a dorm-permission status (Pending / Approved / Rejected).
export function PermissionBadge({ status }: { status: PermissionStatus }) {
  return (
    <span
      className={`inline-flex shrink-0 items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${PERMISSION_STYLES[status]}`}
    >
      {status}
    </span>
  );
}
