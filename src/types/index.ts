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

// A weekly cleaning schedule: day of week -> list of assigned student names.
export type Schedule = Record<string, string[]>;

// Which pre-login screen is showing (splash/home/auth flow).
export type Screen = 'splash' | 'home' | 'signin' | 'signup';
