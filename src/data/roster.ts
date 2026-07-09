// Mock roster of students in this dorm. Used to generate cleaning
// assignments, pick a student for discipline, etc.
//
// `points` is each student's current discipline score (starts at 100 and is
// reduced by disciplinary actions). Kept here as the seed value; the live
// value lives in the useDiscipline hook.
export interface Student {
  name: string;
  points: number;
}

export const STUDENTS: Student[] = [
  { name: 'Andi Pratama', points: 100 },
  { name: 'Budi Santoso', points: 100 },
  { name: 'Citra Lestari', points: 100 },
  { name: 'Dewi Anggraini', points: 90 },
  { name: 'Eka Putra', points: 100 },
  { name: 'Farhan Hakim', points: 100 },
  { name: 'Gita Maharani', points: 85 },
];

// Convenience: just the names (many features only need the list of names).
export const ROSTER: string[] = STUDENTS.map((s) => s.name);
