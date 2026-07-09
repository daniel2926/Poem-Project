import type { DisciplineRecord } from '../types';
import { pointsFor, recordsFor } from '../lib/discipline';
import { formatDateTime, formatDate } from '../lib/format';
import { PageHeader } from '../components/PageHeader';
import { Section } from '../components/Section';
import { EmptyState } from '../components/EmptyState';
import { Icon } from '../components/Icon';

interface DisciplineStudentPageProps {
  studentName: string;
  records: DisciplineRecord[];
}

// Student Discipline page: see your own points, violations, and the punishment
// schedule set by the admin. (Separate from consultation, which stays private.)
export function DisciplineStudentPage({ studentName, records }: DisciplineStudentPageProps) {
  const points = pointsFor(studentName, records);
  const mine = recordsFor(studentName, records);
  const pointColor = points >= 90 ? 'text-green-600' : points >= 70 ? 'text-amber-600' : 'text-red-600';

  return (
    <div>
      <PageHeader
        title="My Discipline"
        subtitle="Your points, violations, and punishment schedule."
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Points card */}
        <Section className="flex flex-col items-center justify-center text-center">
          <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-navy/5 text-navy">
            <Icon name="award" className="h-7 w-7" />
          </span>
          <div className={`mt-3 text-4xl font-bold ${pointColor}`}>{points}</div>
          <div className="text-sm text-slate-500">discipline points</div>
          <div className="mt-2 text-xs text-slate-400">Starts at 100 · reduced by violations.</div>
        </Section>

        {/* Violations + punishments */}
        <div className="lg:col-span-2">
          <Section>
            <div className="mb-3 flex items-baseline justify-between">
              <h2 className="text-lg font-semibold text-slate-900">Violations & punishments</h2>
              <span className="text-sm text-slate-400">
                {mine.length} record{mine.length !== 1 ? 's' : ''}
              </span>
            </div>

            {mine.length === 0 ? (
              <EmptyState text="No violations on record. Keep it up! 🎉" />
            ) : (
              <div className="space-y-3">
                {mine.map((r) => (
                  <div key={r.id} className="rounded-xl border border-slate-200 p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="font-medium text-slate-900">{r.violation}</div>
                      <span className="shrink-0 font-semibold text-red-600">−{r.points} pts</span>
                    </div>
                    <div className="mt-2 space-y-1 text-sm text-slate-600">
                      <div className="flex items-center gap-2">
                        <Icon name="shield" className="h-4 w-4 text-slate-400" />
                        <span>{r.punishment}</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-500">
                        <Icon name="clock" className="h-4 w-4 text-slate-400" />
                        <span>Scheduled: {formatDateTime(r.scheduleAt)}</span>
                      </div>
                      <div className="text-xs text-slate-400">Recorded {formatDate(r.date)}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Section>
        </div>
      </div>
    </div>
  );
}
