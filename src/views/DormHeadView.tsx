import type { Report, Schedule } from '../types';
import type { NewReportInput } from '../lib/reports';
import { StudentView } from './StudentView';
import { CleaningSchedule } from '../components/CleaningSchedule';

interface DormHeadViewProps {
  myReports: Report[];
  onAddReport: (input: NewReportInput) => void;
  schedule: Schedule;
  roster: string[];
  onAddAssignment: (day: string, name: string) => void;
  onRemoveAssignment: (day: string, name: string) => void;
}

// A dorm head is a Student PLUS one extra permission: managing the cleaning
// schedule. So we reuse StudentView and append the editable schedule.
export function DormHeadView({
  myReports,
  onAddReport,
  schedule,
  roster,
  onAddAssignment,
  onRemoveAssignment,
}: DormHeadViewProps) {
  return (
    <div className="space-y-6">
      <StudentView myReports={myReports} onAddReport={onAddReport} />
      <CleaningSchedule
        schedule={schedule}
        editable
        roster={roster}
        onAdd={onAddAssignment}
        onRemove={onRemoveAssignment}
      />
    </div>
  );
}
