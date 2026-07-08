import type { User } from '../types';

// Mock accounts. Passwords are plain text — this is a prototype with mock
// auth only, never do this in a real app. Admin accounts are "created by the
// school" (there is no public admin sign-up), so they only exist here.
export const MOCK_USERS: User[] = [
  {
    id: 'u1',
    name: 'Andi Pratama',
    email: 'student@campusflow.dev',
    password: 'password',
    role: 'student',
    isDormHead: false,
    dorm: 'Dorm A',
  },
  {
    id: 'u2',
    name: 'Citra Lestari',
    email: 'dormhead@campusflow.dev',
    password: 'password',
    role: 'student',
    isDormHead: true, // a dorm head: student + cleaning-schedule permission
    dorm: 'Dorm A',
  },
  {
    id: 'u3',
    name: 'Rina Hartono',
    email: 'admin@campusflow.dev',
    password: 'password',
    role: 'admin',
    isDormHead: false,
    dorm: 'Dorm A',
  },
];

// One-click demo logins shown on the Sign In screen.
export interface DemoLogin {
  label: string;
  hint: string;
  email: string;
  password: string;
}

export const DEMO_LOGINS: DemoLogin[] = [
  { label: 'Student', hint: 'submit & track reports', email: 'student@campusflow.dev', password: 'password' },
  { label: 'Dorm Head', hint: 'student + cleaning schedule', email: 'dormhead@campusflow.dev', password: 'password' },
  { label: 'Admin', hint: 'manage all reports', email: 'admin@campusflow.dev', password: 'password' },
];
