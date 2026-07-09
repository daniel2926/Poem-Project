import { useMemo, useState } from 'react';
import type { AttendanceStatus, AttendanceTask, PlaceSchedule } from '../types';
import { assignmentFor } from '../lib/schedule';

// Per-student attendance state we persist across schedule regenerations. Keyed
// by student name so a task keeps its proof/status even if places shuffle.
interface TaskState {
  status: AttendanceStatus;
  photoName: string;
  submittedAt: string;
}

// The default cleaning deadline (mock). The dorm head can end it early with
// "Pass deadline now", which flips un-submitted tasks to Missed immediately.
const DEFAULT_DEADLINE = '2026-07-16T20:00';

// A fresh task starts as "To do" with no proof.
function blankState(): TaskState {
  return { status: 'To do', photoName: '', submittedAt: '' };
}

// Owns cleaning attendance: one task per assigned student, derived from the
// live schedule. Students submit proof; the dorm head verifies it, and
// confirms a demerit / excuse for anyone who missed the deadline.
//
// `onDemerit(student)` is called when the dorm head confirms a −1 demerit, so
// the caller can record it on the discipline page.
export function useAttendance(
  schedule: PlaceSchedule,
  onDemerit: (student: string) => void,
) {
  // Explicit per-student state (only students who've acted or been actioned).
  const [state, setState] = useState<Record<string, TaskState>>({});
  const [deadline, setDeadline] = useState<string>(DEFAULT_DEADLINE);
  const [deadlinePassed, setDeadlinePassed] = useState(false);

  // Derive the visible task list from the current schedule + stored state.
  // Anyone assigned to a place gets a task; if the deadline has passed and they
  // still have no submitted proof, their task shows as "Missed".
  const tasks: AttendanceTask[] = useMemo(() => {
    const list: AttendanceTask[] = [];
    for (const [place, names] of Object.entries(schedule)) {
      for (const student of names) {
        const s = state[student] ?? blankState();
        let status = s.status;
        if (deadlinePassed && status === 'To do') status = 'Missed';
        list.push({
          id: student, // one task per student
          student,
          place,
          status,
          photoName: s.photoName,
          submittedAt: s.submittedAt,
        });
      }
    }
    return list;
  }, [schedule, state, deadlinePassed]);

  function patch(student: string, next: Partial<TaskState>) {
    setState((prev) => ({
      ...prev,
      [student]: { ...(prev[student] ?? blankState()), ...next },
    }));
  }

  // Student: submit proof photo → Pending verification.
  function submitProof(student: string, photoName: string, when: string) {
    patch(student, { status: 'Pending', photoName, submittedAt: when });
  }

  // Dorm head: approve a submitted proof.
  function approve(student: string) {
    patch(student, { status: 'Approved' });
  }

  // Dorm head: reject a proof → back to "To do" so the student can resubmit.
  function reject(student: string) {
    patch(student, { status: 'To do', photoName: '', submittedAt: '' });
  }

  // Dorm head: end the deadline now → un-submitted tasks become Missed.
  function endDeadlineNow() {
    setDeadlinePassed(true);
  }

  // Dorm head: confirm the −1 demerit for a missed student (records discipline).
  function confirmDemerit(student: string) {
    patch(student, { status: 'Demerit' });
    onDemerit(student);
  }

  // Dorm head: excuse a missed student (no deduction).
  function excuse(student: string) {
    patch(student, { status: 'Excused' });
  }

  // Confirm the demerit for every currently-missed student at once.
  function confirmAllDemerits() {
    for (const t of tasks) {
      if (t.status === 'Missed') {
        patch(t.student, { status: 'Demerit' });
        onDemerit(t.student);
      }
    }
  }

  // My own task (for the student view).
  function taskForStudent(student: string): AttendanceTask | null {
    const found = assignmentFor(student, schedule);
    if (!found) return null;
    const s = state[student] ?? blankState();
    let status = s.status;
    if (deadlinePassed && status === 'To do') status = 'Missed';
    return {
      id: student,
      student,
      place: found.place,
      status,
      photoName: s.photoName,
      submittedAt: s.submittedAt,
    };
  }

  return {
    tasks,
    deadline,
    deadlinePassed,
    setDeadline,
    submitProof,
    approve,
    reject,
    endDeadlineNow,
    confirmDemerit,
    excuse,
    confirmAllDemerits,
    taskForStudent,
  };
}
