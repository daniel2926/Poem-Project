// Mock auth logic — pure functions, no React, no real security.

import type { User } from '../types';

export interface SignUpInput {
  name: string;
  email: string;
  password: string;
  dorm: string;
}

/** Find the user matching an email + password, or null if none. */
export function authenticate(users: User[], email: string, password: string): User | null {
  const target = email.trim().toLowerCase();
  return users.find((u) => u.email.toLowerCase() === target && u.password === password) ?? null;
}

/** True if an account already uses this email. */
export function emailExists(users: User[], email: string): boolean {
  const target = email.trim().toLowerCase();
  return users.some((u) => u.email.toLowerCase() === target);
}

/** Build a new Student account from sign-up input (public sign-up is students only). */
export function createStudent(input: SignUpInput): User {
  return {
    id: 'u' + Date.now(),
    name: input.name.trim(),
    email: input.email.trim(),
    password: input.password,
    role: 'student',
    isDormHead: false,
    dorm: input.dorm,
  };
}
