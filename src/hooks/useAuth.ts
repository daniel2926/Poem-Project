import { useState } from 'react';
import type { User } from '../types';
import { MOCK_USERS } from '../data/users';
import { authenticate, createStudent, emailExists, type SignUpInput } from '../lib/auth';

// Owns the mock auth state: who's signed in, plus sign in / sign up / sign out.
// signIn and signUp return an error message string, or null on success.
export function useAuth() {
  const [users, setUsers] = useState<User[]>(MOCK_USERS);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  function signIn(email: string, password: string): string | null {
    const user = authenticate(users, email, password);
    if (!user) return 'Incorrect email or password.';
    setCurrentUser(user);
    return null;
  }

  function signUp(input: SignUpInput): string | null {
    if (emailExists(users, input.email)) {
      return 'An account with this email already exists.';
    }
    const user = createStudent(input);
    setUsers((prev) => [...prev, user]);
    setCurrentUser(user);
    return null;
  }

  function signOut() {
    setCurrentUser(null);
  }

  return { currentUser, signIn, signUp, signOut };
}
