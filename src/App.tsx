import { useState } from 'react';
import type { Role } from './types';
import { CURRENT_STUDENT, DORM } from './constants';
import { ROSTER } from './data/roster';
import { useReports } from './hooks/useReports';
import { useSchedule } from './hooks/useSchedule';
import { getMyReports } from './lib/reports';
import { Icon } from './components/Icon';
import { RoleSwitcher } from './components/RoleSwitcher';
import { StudentView } from './views/StudentView';
import { DormHeadView } from './views/DormHeadView';
import { AdminView } from './views/AdminView';

// App root: owns the role toggle, wires the state hooks to the views, and
// renders the shared header. All real logic lives in the hooks and /lib.
export function App() {
  const [role, setRole] = useState<Role>('student');
  const { reports, addReport, updateReport } = useReports();
  const { schedule, addAssignment, removeAssignment } = useSchedule();

  const myReports = getMyReports(reports, CURRENT_STUDENT);

  const contextLabel =
    role === 'admin'
      ? `Admin · ${DORM}`
      : `${CURRENT_STUDENT} · ${DORM}${role === 'dormHead' ? ' · Dorm Head' : ''}`;

  return (
    <div className="min-h-screen bg-gray-50 pb-16 text-slate-800">
      {/* Brand header */}
      <header className="bg-navy text-white">
        <div className="mx-auto flex max-w-5xl items-center gap-3 px-4 py-5 sm:py-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10">
            <Icon name="building" className="h-6 w-6" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold tracking-tight">CampusFlow</h1>
              <span className="rounded-full bg-white/15 px-2 py-0.5 text-[11px] font-medium text-white/90">
                Prototype
              </span>
            </div>
            <p className="text-sm text-white/70">
              Report and manage dorm facility &amp; room damage.
            </p>
          </div>
        </div>
      </header>

      {/* Role switcher (mock preview toggle) */}
      <div className="mx-auto max-w-5xl px-4 pt-5">
        <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wide text-slate-400">
              Preview as
            </div>
            <div className="mt-1">
              <RoleSwitcher role={role} onChange={setRole} />
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <Icon name="user" className="h-4 w-4" />
            {contextLabel}
          </div>
        </div>
        <p className="mt-2 text-xs text-slate-400">
          This role switcher is a mock preview toggle, not real authentication.
        </p>
      </div>

      {/* Active view */}
      <main className="mx-auto max-w-5xl px-4 pt-6">
        {role === 'student' && (
          <StudentView myReports={myReports} onAddReport={addReport} />
        )}
        {role === 'dormHead' && (
          <DormHeadView
            myReports={myReports}
            onAddReport={addReport}
            schedule={schedule}
            roster={ROSTER}
            onAddAssignment={addAssignment}
            onRemoveAssignment={removeAssignment}
          />
        )}
        {role === 'admin' && (
          <AdminView reports={reports} onUpdateReport={updateReport} schedule={schedule} />
        )}
      </main>

      <footer className="mx-auto max-w-5xl px-4 pt-10 text-center text-xs text-slate-400">
        MyDorm prototype · mock data only · state resets on refresh
      </footer>
    </div>
  );
}
