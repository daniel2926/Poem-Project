import { useState } from 'react';
import type { DisciplineRecord } from '../types';
import { INITIAL_DISCIPLINE } from '../data/discipline';
import { createDiscipline, type NewDisciplineInput } from '../lib/discipline';

// Owns discipline records. Recording an action deducts the violation's points
// from the student and stores the punishment + its schedule. Points are
// derived from these records (see lib/discipline.pointsFor).
export function useDiscipline() {
  const [records, setRecords] = useState<DisciplineRecord[]>(INITIAL_DISCIPLINE);

  function addRecord(input: NewDisciplineInput) {
    setRecords((prev) => [...prev, createDiscipline(input)]);
  }

  return { records, addRecord };
}
