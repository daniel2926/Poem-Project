import type { DisciplineRecord } from '../types';
import { pointsFor, recordsFor, BASE_POINTS } from '../lib/discipline';
import { formatDateTime, formatDate } from '../lib/format';
import { PageHeader } from '../components/PageHeader';
import { Section } from '../components/Section';
import { EmptyState } from '../components/EmptyState';
import { Icon } from '../components/Icon';

interface DisciplineStudentPageProps {
  studentName: string;
  records: DisciplineRecord[];
}

// A small labelled stat tile.
function StatTile({ label, value, tone }: { label: string; value: string; tone: string }) {
  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-3 text-center shadow-card">
      <div className={`text-2xl font-bold ${tone}`}>{value}</div>
      <div className="mt-0.5 text-xs text-slate-500">{label}</div>
    </div>
  );
}

// Student Discipline page: your points, violations, and punishment schedule —
// laid out as a clear hero card + stats + a separated record list (not one
// cramped column).
export function DisciplineStudentPage({ studentName, records }: DisciplineStudentPageProps) {
  const points = pointsFor(studentName, records);
  const base = BASE_POINTS[studentName] ?? 100;
  const mine = recordsFor(studentName, records); // newest first
  const lost = mine.reduce((sum, r) => sum + r.points, 0);

  // Warm→cool gradient for the hero based on how healthy the score is.
  const heroTone =
    points >= 90
      ? 'from-mint to-green-600'
      : points >= 70
        ? 'from-sun to-amber-500'
        : 'from-red-500 to-red-600';

  return (
    <div className="space-y-5">
      <PageHeader title="My Discipline" subtitle="Your points, violations & punishments." />

      {/* Hero points card */}
      <div
        className={`overflow-hidden rounded-3xl bg-gradient-to-br ${heroTone} p-6 text-white shadow-soft`}
      >
        <div className="flex items-center gap-2 text-sm text-white/85">
          <Icon name="award" className="h-4 w-4" />
          Discipline points
        </div>
        <div className="mt-1 flex items-end gap-1">
          <span className="text-5xl font-bold leading-none tracking-tight">{points}</span>
          <span className="mb-1 text-lg font-medium text-white/80">/ {base}</span>
        </div>
        {/* Progress bar */}
        <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/25">
          <div
            className="h-full rounded-full bg-white"
            style={{ width: `${Math.round((points / base) * 100)}%` }}
          />
        </div>
        <div className="mt-2 text-xs text-white/80">
          {points === base
            ? 'Perfect record — keep it up! 🎉'
            : `${lost} point${lost !== 1 ? 's' : ''} deducted so far.`}
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-3">
        <StatTile label="Current" value={String(points)} tone="text-slate-900" />
        <StatTile label="Deducted" value={`−${lost}`} tone="text-red-600" />
        <StatTile
          label="Records"
          value={String(mine.length)}
          tone="text-slate-900"
        />
      </div>

      {/* Violations & punishments — clearly separated section */}
      <Section>
        <div className="mb-3 flex items-baseline justify-between">
          <h2 className="text-lg font-semibold text-slate-900">Violations &amp; punishments</h2>
          <span className="text-sm text-slate-400">{mine.length}</span>
        </div>

        {mine.length === 0 ? (
          <EmptyState text="No violations on record. Keep it up! 🎉" />
        ) : (
          <div className="space-y-3">
            {mine.map((r) => (
              <div key={r.id} className="rounded-2xl border border-slate-100 bg-white p-4 shadow-card">
                <div className="flex items-start justify-between gap-3">
                  <div className="font-semibold text-slate-900">{r.violation}</div>
                  <span className="shrink-0 rounded-full bg-red-50 px-2.5 py-0.5 text-xs font-semibold text-red-600">
                    −{r.points} pts
                  </span>
                </div>
                <div className="mt-2 space-y-1 text-sm text-slate-600">
                  <div className="flex items-center gap-2">
                    <Icon name="shield" className="h-4 w-4 text-slate-400" />
                    <span>{r.punishment}</span>
                  </div>
                  {r.scheduleAt && (
                    <div className="flex items-center gap-2 text-slate-500">
                      <Icon name="clock" className="h-4 w-4 text-slate-400" />
                      <span>Scheduled: {formatDateTime(r.scheduleAt)}</span>
                    </div>
                  )}
                  <div className="text-xs text-slate-400">Recorded {formatDate(r.date)}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </Section>
    </div>
  );
}
