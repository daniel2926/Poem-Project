import type { ConsultationSlot } from '../types';
import { formatDate } from '../lib/format';
import { PageHeader } from '../components/PageHeader';
import { Section } from '../components/Section';
import { EmptyState } from '../components/EmptyState';
import { Icon } from '../components/Icon';

interface ConsultationPageProps {
  slots: ConsultationSlot[];
  studentName: string;
  onBook: (slotId: string) => void;
  onCancel: (slotId: string) => void;
}

// Consultation Booking (student, PRIVATE). Available slots can be booked; a
// booking is confirmed and listed under "My Bookings". This data never appears
// in any admin/discipline view.
export function ConsultationPage({
  slots,
  studentName,
  onBook,
  onCancel,
}: ConsultationPageProps) {
  const myBookings = slots.filter((s) => s.bookedBy === studentName);
  const available = slots.filter((s) => !s.booked);

  return (
    <div>
      <PageHeader
        title="Consultation Booking"
        subtitle="Book a private time slot with the campus consultant."
      />

      <div className="flex items-start gap-2 rounded-lg bg-navy/5 px-3 py-2 text-sm text-navy">
        <Icon name="shield" className="mt-0.5 h-4 w-4 shrink-0" />
        <span>Private to you — your consultation bookings are never shared with the admin.</span>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Available slots */}
        <Section>
          <h2 className="text-lg font-semibold text-slate-900">Available slots</h2>
          <p className="text-sm text-slate-500">Pick a time that works for you.</p>

          {available.length === 0 ? (
            <div className="mt-4">
              <EmptyState text="No open slots right now. Check back later." />
            </div>
          ) : (
            <div className="mt-4 space-y-2">
              {available.map((slot) => (
                <div
                  key={slot.id}
                  className="flex items-center justify-between gap-3 rounded-xl border border-slate-200 p-3"
                >
                  <div className="flex items-center gap-3 text-sm">
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-navy">
                      <Icon name="clock" className="h-5 w-5" />
                    </span>
                    <div>
                      <div className="font-medium text-slate-800">{formatDate(slot.date)}</div>
                      <div className="text-slate-500">{slot.time}</div>
                    </div>
                  </div>
                  <button
                    onClick={() => onBook(slot.id)}
                    className="rounded-lg bg-navy px-4 py-2 text-sm font-medium text-white transition hover:bg-navy-dark"
                  >
                    Book
                  </button>
                </div>
              ))}
            </div>
          )}
        </Section>

        {/* My bookings */}
        <Section>
          <h2 className="text-lg font-semibold text-slate-900">My Bookings</h2>
          <p className="text-sm text-slate-500">Your confirmed consultation slots.</p>

          {myBookings.length === 0 ? (
            <div className="mt-4">
              <EmptyState text="You haven't booked a consultation yet." />
            </div>
          ) : (
            <div className="mt-4 space-y-2">
              {myBookings.map((slot) => (
                <div
                  key={slot.id}
                  className="flex items-center justify-between gap-3 rounded-xl border border-green-200 bg-green-50 p-3"
                >
                  <div className="flex items-center gap-3 text-sm">
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-green-100 text-green-700">
                      <Icon name="check" className="h-5 w-5" />
                    </span>
                    <div>
                      <div className="font-medium text-slate-800">{formatDate(slot.date)}</div>
                      <div className="text-slate-500">
                        {slot.time} ·{' '}
                        <span className="font-medium text-green-700">Confirmed</span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => onCancel(slot.id)}
                    className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
                  >
                    Cancel
                  </button>
                </div>
              ))}
            </div>
          )}
        </Section>
      </div>
    </div>
  );
}
