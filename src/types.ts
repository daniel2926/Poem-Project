// Shared data types for the whole app.

// The three previewable roles. A dorm head is a Student with one extra
// permission (managing the cleaning schedule) — not a separate authority.
export type Role = 'student' | 'dormHead' | 'admin';

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

export interface Report {
  id: string;
  title: string;
  category: Category;
  student: string;
  status: Status;
  date: string; // ISO 'YYYY-MM-DD'
  location: string;
  photoName: string; // mock filename only — no real upload
  adminNote: string;
  description: string;
}

// A weekly cleaning schedule: day of week -> list of assigned student names.
export type Schedule = Record<string, string[]>;
