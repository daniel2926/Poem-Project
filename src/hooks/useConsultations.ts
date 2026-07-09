import { useState } from 'react';
import type { ConsultationSlot } from '../types';
import { INITIAL_SLOTS } from '../data/consultations';

// Owns consultation slots. Booking an open slot marks it confirmed for the
// current student. This data is PRIVATE — it never reaches the admin views.
export function useConsultations() {
  const [slots, setSlots] = useState<ConsultationSlot[]>(INITIAL_SLOTS);

  function book(slotId: string, student: string) {
    setSlots((prev) =>
      prev.map((s) =>
        s.id === slotId && !s.booked ? { ...s, booked: true, bookedBy: student } : s,
      ),
    );
  }

  function cancel(slotId: string, student: string) {
    setSlots((prev) =>
      prev.map((s) =>
        s.id === slotId && s.bookedBy === student
          ? { ...s, booked: false, bookedBy: null }
          : s,
      ),
    );
  }

  return { slots, book, cancel };
}
