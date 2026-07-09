// Cleaning-schedule logic, kept out of the components.
//
// generateSchedule assigns every student to exactly ONE cleaning place:
//   - no student appears twice (each is placed once)
//   - assignments are spread as evenly as possible across all places
//   - every place is filled once before any place gets a second student
//   - the order is shuffled so each edit produces a fresh assignment

import type { PlaceSchedule } from '../types';

/** Return a shuffled copy of `items` (Fisher–Yates). */
function shuffle<T>(items: T[]): T[] {
  const out = items.slice();
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

/**
 * Assign each student to one place. Students are shuffled and dealt out
 * round-robin across (shuffled) places, so every place is filled once before
 * any doubles up, and the load stays even (counts differ by at most one).
 */
export function generateSchedule(students: string[], places: string[]): PlaceSchedule {
  const result: PlaceSchedule = Object.fromEntries(places.map((p) => [p, [] as string[]]));
  if (places.length === 0) return result;

  const shuffledPlaces = shuffle(places);
  const shuffledStudents = shuffle(students);

  shuffledStudents.forEach((student, i) => {
    const place = shuffledPlaces[i % shuffledPlaces.length];
    result[place].push(student);
  });

  return result;
}

/** One student's assignment: the place they're on and who's on it with them. */
export interface MyAssignment {
  place: string;
  teammates: string[]; // others assigned to the same place
}

/** Find a student's own cleaning assignment, or null if they aren't assigned. */
export function assignmentFor(
  student: string,
  schedule: PlaceSchedule,
): MyAssignment | null {
  for (const [place, names] of Object.entries(schedule)) {
    if (names.includes(student)) {
      return { place, teammates: names.filter((n) => n !== student) };
    }
  }
  return null;
}
