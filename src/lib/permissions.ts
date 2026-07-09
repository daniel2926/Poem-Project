// Dorm-permission logic — pure functions, no React.

import type { PermissionRequest, PermissionStatus } from '../types';

// The fields a student fills in when requesting to leave the dorm.
export interface NewPermissionInput {
  reason: string;
  destination: string;
  leaveAt: string; // 'YYYY-MM-DDTHH:mm'
  returnAt: string; // 'YYYY-MM-DDTHH:mm'
}

/** Build a full request from the form input; new requests start Pending. */
export function createPermission(
  input: NewPermissionInput,
  student: string,
): PermissionRequest {
  return {
    id: 'p' + Date.now(),
    student,
    reason: input.reason.trim(),
    destination: input.destination.trim(),
    leaveAt: input.leaveAt,
    returnAt: input.returnAt,
    status: 'Pending',
  };
}

/** Requests belonging to one student (their own status list). */
export function getMyPermissions(
  requests: PermissionRequest[],
  student: string,
): PermissionRequest[] {
  return requests.filter((r) => r.student === student);
}

// Badge styles for each permission status (matches the app's badge language).
export const PERMISSION_STYLES: Record<PermissionStatus, string> = {
  Pending: 'bg-amber-100 text-amber-800',
  Approved: 'bg-green-100 text-green-800',
  Rejected: 'bg-red-100 text-red-800',
};
