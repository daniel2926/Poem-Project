import { useState } from 'react';
import type { PermissionRequest, PermissionStatus } from '../types';
import { INITIAL_PERMISSIONS } from '../data/permissions';
import { createPermission, type NewPermissionInput } from '../lib/permissions';

// Owns dorm-permission requests: a student submits one (Pending), the admin
// sets it Approved / Rejected, and the student sees the updated status.
export function usePermissions() {
  const [requests, setRequests] = useState<PermissionRequest[]>(INITIAL_PERMISSIONS);

  function addRequest(input: NewPermissionInput, student: string) {
    setRequests((prev) => [createPermission(input, student), ...prev]);
  }

  function setStatus(id: string, status: PermissionStatus) {
    setRequests((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)));
  }

  return { requests, addRequest, setStatus };
}
