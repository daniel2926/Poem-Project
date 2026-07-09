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

// --- Consultation booking (PRIVATE to the student) ----------------------
// A time slot with the campus consultant. Booking one flips `booked`.
export interface ConsultationSlot {
  id: string;
  date: string; // ISO 'YYYY-MM-DD'
  time: string; // e.g. '09:00'
  booked: boolean;
  bookedBy: string | null; // student name, or null while open
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
