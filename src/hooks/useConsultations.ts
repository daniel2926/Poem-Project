import { useState } from 'react';
import type { Booking } from '../types';

// The fields the consultation form collects.
export interface NewBookingInput {
  studentName: string;
  counselor: string;
  slotLabel: string;
}

// Owns consultation bookings (starts empty). Submitting the form adds a
// confirmed booking for the current student. This data is PRIVATE — it never
// reaches the admin views.
export function useConsultations() {
  const [bookings, setBookings] = useState<Booking[]>([]);

  function addBooking(input: NewBookingInput, student: string) {
    setBookings((prev) => [
      { id: 'b' + Date.now(), student, ...input },
      ...prev,
    ]);
  }

  function cancelBooking(id: string) {
    setBookings((prev) => prev.filter((b) => b.id !== id));
  }

  return { bookings, addBooking, cancelBooking };
}
