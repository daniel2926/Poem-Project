import { useState } from 'react';
import type { PlaceSchedule } from '../types';
import { CLEANING_PLACES, EMPTY_SCHEDULE } from '../data/schedule';
import { ROSTER } from '../data/roster';
import { generateSchedule } from '../lib/schedule';

// Owns the cleaning schedule. "Generate" produces a fresh, even assignment of
// every student to exactly one place; clicking again re-generates.
export function useSchedule() {
  const [schedule, setSchedule] = useState<PlaceSchedule>(EMPTY_SCHEDULE);

  function generate() {
    setSchedule(generateSchedule(ROSTER, CLEANING_PLACES));
  }

  return { schedule, generate };
}
