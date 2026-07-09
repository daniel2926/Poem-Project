import { useState } from 'react';
import type { PlaceSchedule } from '../types';
import { CLEANING_PLACES } from '../data/schedule';
import { ROSTER } from '../data/roster';
import { generateSchedule } from '../lib/schedule';

// Owns the editable cleaning-schedule inputs — the list of students and the
// list of places — plus the derived assignment. The dorm head edits the two
// lists; the schedule re-generates automatically on every change (each student
// to exactly one place, spread evenly, no duplication).
export function useSchedule() {
  const [students, setStudents] = useState<string[]>(ROSTER);
  const [places, setPlaces] = useState<string[]>(CLEANING_PLACES);
  const [schedule, setSchedule] = useState<PlaceSchedule>(() =>
    generateSchedule(ROSTER, CLEANING_PLACES),
  );

  // Any edit to the lists re-derives a fresh assignment immediately.
  function apply(nextStudents: string[], nextPlaces: string[]) {
    setStudents(nextStudents);
    setPlaces(nextPlaces);
    setSchedule(generateSchedule(nextStudents, nextPlaces));
  }

  function addStudent(name: string) {
    const trimmed = name.trim();
    if (!trimmed || students.includes(trimmed)) return;
    apply([...students, trimmed], places);
  }

  function removeStudent(name: string) {
    apply(
      students.filter((s) => s !== name),
      places,
    );
  }

  function addPlace(place: string) {
    const trimmed = place.trim();
    if (!trimmed || places.includes(trimmed)) return;
    apply(students, [...places, trimmed]);
  }

  function removePlace(place: string) {
    apply(
      students,
      places.filter((p) => p !== place),
    );
  }

  // Reshuffle the current students/places into a fresh, even assignment.
  function regenerate() {
    setSchedule(generateSchedule(students, places));
  }

  return {
    students,
    places,
    schedule,
    addStudent,
    removeStudent,
    addPlace,
    removePlace,
    regenerate,
  };
}
