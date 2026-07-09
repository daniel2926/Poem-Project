// Shared data types for the whole app.

// Exactly two roles. A dorm head is a Student with `isDormHead: true` —
// not a separate role/authority.
export type Role = 'student' | 'admin';

export type Category = 'Room Maintenance' | 'Facility Issue' | 'Gas Replacement';

export type Status =
  | 'Submitted'
  | 'Under Review'
  | 'In Progress'
  | 'Completed'
  | 'Rejected'
  | 'Cancelled';

export type Day =
  | 'Monday'
  | 'Tuesday'
  | 'Wednesday'
  | 'Thursday'
  | 'Friday'
  | 'Saturday'
  | 'Sunday';

// A user account (mock auth — password stored in plain text, demo only).
export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: Role;
  isDormHead: boolean;
  dorm: string;
}

export interface Report {
  id: string;
  title: string;
  category: Category;
  student: string; // the student's name (links a report to its author)
  status: Status;
  date: string; // ISO 'YYYY-MM-DD'
  location: string;
  photoName: string; // mock filename only — no real upload
  adminNote: string;
  description: string;
}

// --- Cleaning schedule --------------------------------------------------
// The dorm head / admin generates an assignment of every student to a
// cleaning place. `place -> assigned student names`.
export type PlaceSchedule = Record<string, string[]>;

// --- Cleaning attendance / proof ----------------------------------------
// Each assigned student has one cleaning task. Lifecycle:
//   'To do'    → student hasn't submitted proof yet
//   'Pending'  → proof submitted, awaiting dorm-head verification
//   'Approved' → dorm head verified the proof (done, no demerit)
//   'Missed'   → no approved proof by the deadline
//   'Excused'  → missed, but the dorm head waived the demerit
//   'Demerit'  → missed, dorm head confirmed the −1 point deduction
export type AttendanceStatus =
  | 'To do'
  | 'Pending'
  | 'Approved'
  | 'Missed'
  | 'Excused'
  | 'Demerit';

export interface AttendanceTask {
  id: string;
  student: string; // student name
  place: string; // their assigned cleaning place
  status: AttendanceStatus;
  photoName: string; // mock proof filename ('' until submitted)
  submittedAt: string; // ISO datetime proof was submitted ('' if none)
}

// --- Consultation booking (PRIVATE to the student) ----------------------
// A predefined, selectable time slot (label shown in the form).
export interface ConsultationSlot {
  id: string;
  label: string; // e.g. 'Mon, Jul 13 · 09:00'
}

// A campus counselor the student can pick.
export interface Counselor {
  id: string;
  name: string;
  focus: string; // short specialty label, e.g. 'Academic'
}

// A confirmed booking the student created via the form. PRIVATE — never shown
// in any admin/discipline view.
export interface Booking {
  id: string;
  student: string; // the student's account name (owner)
  studentName: string; // name the student entered on the form
  counselor: string; // counselor name
  slotLabel: string; // chosen slot's label
}

// --- Dorm permission ----------------------------------------------------
export type PermissionStatus = 'Pending' | 'Approved' | 'Rejected';

export interface PermissionRequest {
  id: string;
  student: string; // student name (author)
  reason: string;
  destination: string;
  leaveAt: string; // ISO datetime 'YYYY-MM-DDTHH:mm'
  returnAt: string; // ISO datetime 'YYYY-MM-DDTHH:mm'
  status: PermissionStatus;
}

// --- Discipline ---------------------------------------------------------
// A violation the admin can record, with the point penalty it carries.
export interface Violation {
  id: string;
  label: string;
  points: number; // how many points it deducts (a positive number)
}

// One disciplinary action recorded against a student. Deducts points and
// assigns a punishment + when it must be served.
export interface DisciplineRecord {
  id: string;
  student: string; // student name
  violation: string; // the violation label
  points: number; // points deducted by this record
  punishment: string;
  scheduleAt: string; // ISO datetime the punishment is scheduled for
  date: string; // ISO 'YYYY-MM-DD' the record was created
}
