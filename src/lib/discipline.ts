// Discipline logic — pure functions, no React.

import type { DisciplineRecord, Violation } from '../types';
import { STUDENTS } from '../data/roster';
import { todayISO } from './format';

// The starting points for each student (before any recorded discipline).
export const BASE_POINTS: Record<string, number> = Object.fromEntries(
  STUDENTS.map((s) => [s.name, s.points]),
);

// The fields the admin fills in to record a disciplinary action.
export interface NewDisciplineInput {
  student: string;
  violation: Violation;
  punishment: string;
  scheduleAt: string; // 'YYYY-MM-DDTHH:mm'
}

/** Build a discipline record; its point penalty comes from the violation. */
export function createDiscipline(input: NewDisciplineInput): DisciplineRecord {
  return {
    id: 'd' + Date.now(),
    student: input.student,
    violation: input.violation.label,
    points: input.violation.points,
    punishment: input.punishment.trim(),
    scheduleAt: input.scheduleAt,
    date: todayISO(),
  };
}

/** A −1 demerit for a missed cleaning duty (confirmed by the dorm head). */
export function createDemerit(student: string): DisciplineRecord {
  return {
    id: 'dm' + Date.now() + Math.random().toString(36).slice(2, 6),
    student,
    violation: 'Missed cleaning duty',
    points: 1,
    punishment: 'Cleaning attendance demerit',
    scheduleAt: '',
    date: todayISO(),
  };
}

/**
 * Current points for a student: base points minus every recorded penalty.
 * (Points can't go below zero.)
 */
export function pointsFor(student: string, records: DisciplineRecord[]): number {
  const base = BASE_POINTS[student] ?? 100;
  const deducted = records
    .filter((r) => r.student === student)
    .reduce((sum, r) => sum + r.points, 0);
  return Math.max(0, base - deducted);
}

/** All discipline records for one student, newest first. */
export function recordsFor(
  student: string,
  records: DisciplineRecord[],
): DisciplineRecord[] {
  return records.filter((r) => r.student === student).slice().reverse();
}
