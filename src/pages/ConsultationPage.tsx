import { useState, type FormEvent } from 'react';
import type { Booking } from '../types';
import { inputClass } from '../constants';
import { COUNSELORS, CONSULTATION_SLOTS } from '../data/consultations';
import { PageHeader } from '../components/PageHeader';
import { Section } from '../components/Section';
import { EmptyState } from '../components/EmptyState';
import { Icon } from '../components/Icon';
import type { NewBookingInput } from '../hooks/useConsultations';

interface ConsultationPageProps {
  bookings: Booking[];
  defaultName: string; // student's account name (pre-fills the form)
  onBook: (input: NewBookingInput) => void;
  onCancel: (id: string) => void;
}

// Consultation Booking (student, PRIVATE) — a simple form: pick a counselor,
// confirm your name, choose a predefined slot. On submit it appears under
// "My Bookings". This data never appears in any admin/discipline view.
export function ConsultationPage({
  bookings,
  defaultName,
  onBook,
  onCancel,
}: ConsultationPageProps) {
  const [counselor, setCounselor] = useState(COUNSELORS[0].name);
  const [studentName, setStudentName] = useState(defaultName);
  const [slotLabel, setSlotLabel] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!studentName.trim()) {
      setError('Please enter your name.');
      return;
    }
    if (!slotLabel) {
      setError('Please choose a time slot.');
      return;
    }
    onBook({ studentName: studentName.trim(), counselor, slotLabel });
    setSlotLabel('');
    setError('');
    setSuccess('Booked! See it under My Bookings below.');
  }

  return (
    <div>
      <PageHeader title="Consultation" subtitle="Book a private session with a counselor." />

      <div className="mb-4 flex items-start gap-2 rounded-xl bg-brand/5 px-3 py-2 text-sm text-brand">
        <Icon name="shield" className="mt-0.5 h-4 w-4 shrink-0" />
        <span>Private to you — your bookings are never shared with the admin.</span>
      </div>

      <Section className="mb-6">
        <h2 className="text-lg font-semibold text-slate-900">Book a session</h2>

        {success && (
          <div className="mt-3 flex items-start gap-2 rounded-xl bg-mint-soft px-3 py-2 text-sm text-green-800">
            <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0" />
            <span>{success}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate className="mt-4 space-y-4">
          {/* Counselor */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">Counselor</label>
            <div className="space-y-2">
              {COUNSELORS.map((c) => {
                const active = counselor === c.name;
                return (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setCounselor(c.name)}
                    className={`flex w-full items-center gap-3 rounded-xl border px-3 py-2.5 text-left transition ${
                      active
                        ? 'border-brand bg-brand/5 ring-1 ring-brand/20'
                        : 'border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-sky-soft text-sm font-semibold text-brand">
                      {c.name.replace(/^(Ms\.|Mr\.)\s*/, '').charAt(0)}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-medium text-slate-800">{c.name}</span>
                      <span className="block text-xs text-slate-400">{c.focus}</span>
                    </span>
                    {active && <Icon name="check" className="h-5 w-5 text-brand" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Your name */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">Your name</label>
            <input
              className={inputClass}
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              placeholder="Your name"
            />
          </div>

          {/* Slot */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">Time slot</label>
            <div className="grid grid-cols-2 gap-2">
              {CONSULTATION_SLOTS.map((s) => {
                const active = slotLabel === s.label;
                return (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setSlotLabel(s.label)}
                    className={`rounded-xl border px-3 py-2.5 text-sm font-medium transition ${
                      active
                        ? 'border-brand bg-brand text-white shadow-soft'
                        : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    {s.label}
                  </button>
                );
              })}
            </div>
          </div>

          {error && (
            <p className="rounded-xl bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>
          )}

          <button
            type="submit"
            className="w-full rounded-xl bg-brand px-5 py-3 text-sm font-semibold text-white shadow-soft transition hover:bg-brand-dark active:scale-[0.98]"
          >
            Confirm Booking
          </button>
        </form>
      </Section>

      {/* My bookings */}
      <Section>
        <div className="mb-3 flex items-baseline justify-between">
          <h2 className="text-lg font-semibold text-slate-900">My Bookings</h2>
          <span className="text-sm text-slate-400">
            {bookings.length} booking{bookings.length !== 1 ? 's' : ''}
          </span>
        </div>

        {bookings.length === 0 ? (
          <EmptyState text="No bookings yet. Fill in the form above to book a session." />
        ) : (
          <div className="space-y-2">
            {bookings.map((b) => (
              <div
                key={b.id}
                className="flex items-center justify-between gap-3 rounded-2xl border border-green-200 bg-mint-soft/50 p-3"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-mint text-white">
                    <Icon name="check" className="h-5 w-5" />
                  </span>
                  <div className="text-sm">
                    <div className="font-semibold text-slate-800">{b.counselor}</div>
                    <div className="text-slate-500">
                      {b.slotLabel} ·{' '}
                      <span className="font-medium text-green-700">Confirmed</span>
                    </div>
                    <div className="text-xs text-slate-400">For {b.studentName}</div>
                  </div>
                </div>
                <button
                  onClick={() => onCancel(b.id)}
                  aria-label="Cancel booking"
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 transition hover:bg-red-50 hover:text-red-600 active:scale-95"
                >
                  <Icon name="x" className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </Section>
    </div>
  );
}
