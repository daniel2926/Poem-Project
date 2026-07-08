import { useState } from 'react';
import type { Schedule } from '../types';
import { INITIAL_SCHEDULE } from '../data/schedule';

// Owns the cleaning schedule and lets the dorm head add/remove assignments.
export function useSchedule() {
  const [schedule, setSchedule] = useState<Schedule>(INITIAL_SCHEDULE);

  function addAssignment(day: string, name: string) {
    setSchedule((prev) => ({ ...prev, [day]: [...prev[day], name] }));
  }

  function removeAssignment(day: string, name: string) {
    setSchedule((prev) => ({ ...prev, [day]: prev[day].filter((n) => n !== name) }));
  }

  return { schedule, addAssignment, removeAssignment };
}
