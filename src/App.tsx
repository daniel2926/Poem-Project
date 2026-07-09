import { useState } from 'react';
import type { PageId } from './nav';
import { useAuth } from './hooks/useAuth';
import { useReports } from './hooks/useReports';
import { useSchedule } from './hooks/useSchedule';
import { useAttendance } from './hooks/useAttendance';
import { usePermissions } from './hooks/usePermissions';
import { useConsultations } from './hooks/useConsultations';
import { useDiscipline } from './hooks/useDiscipline';
import { nowISO } from './lib/format';
import { getMyReports } from './lib/reports';
import { getMyPermissions } from './lib/permissions';
import { SplashScreen } from './screens/SplashScreen';
import { HomeScreen } from './screens/HomeScreen';
import { SignInScreen } from './screens/SignInScreen';
import { SignUpScreen } from './screens/SignUpScreen';
import { StudentShell } from './components/StudentShell';
import { AdminShell } from './components/AdminShell';
import { HomePage } from './pages/HomePage';
import { StudentHomePage } from './pages/StudentHomePage';
import { ReportsStudentPage } from './pages/ReportsStudentPage';
import { ReportsAdminPage } from './pages/ReportsAdminPage';
import { CleaningPage } from './pages/CleaningPage';
import { MyCleaningPage } from './pages/MyCleaningPage';
import { ConsultationPage } from './pages/ConsultationPage';
import { PermissionStudentPage } from './pages/PermissionStudentPage';
import { PermissionAdminPage } from './pages/PermissionAdminPage';
import { DisciplineAdminPage } from './pages/DisciplineAdminPage';
import { DisciplineStudentPage } from './pages/DisciplineStudentPage';
import { FaqPage } from './pages/FaqPage';

// The pre-login flow (before an account is signed in).
type AuthScreen = 'splash' | 'home' | 'signin' | 'signup';

// App root: owns the mock auth, the pre-login flow, and — once signed in — the
// per-service page routing. Students get a mobile-app shell (bottom tabs);
// admins get a web-dashboard shell (sidebar). Logic lives in /hooks and /lib.
export function App() {
  const { currentUser, signIn, signUp, signOut } = useAuth();
  const { reports, addReport, updateReport } = useReports();
  const scheduleState = useSchedule();
  const { requests, addRequest, setStatus } = usePermissions();
  const { bookings, addBooking, cancelBooking } = useConsultations();
  const { records, addRecord, addDemerit } = useDiscipline();
  // Cleaning attendance derives its tasks from the live schedule; confirming a
  // demerit records a −1 point action on the student's discipline page.
  const attendance = useAttendance(scheduleState.schedule, addDemerit);

  const [authScreen, setAuthScreen] = useState<AuthScreen>('splash');
  const [page, setPage] = useState<PageId>('home');

  function handleSignOut() {
    signOut();
    setAuthScreen('home');
    setPage('home'); // reset so the next login lands on the home dashboard
  }

  // --- Signed in ---
  if (currentUser) {
    const user = currentUser;
    const isAdmin = user.role === 'admin';
    const canEditSchedule = isAdmin || user.isDormHead;

    // Cleaning: the admin/dorm head gets the full editor + attendance panel; a
    // regular student gets a read-only view of their OWN assignment + task.
    const cleaningPage = canEditSchedule ? (
      <CleaningPage
        schedule={scheduleState.schedule}
        students={scheduleState.students}
        places={scheduleState.places}
        onAddStudent={scheduleState.addStudent}
        onRemoveStudent={scheduleState.removeStudent}
        onAddPlace={scheduleState.addPlace}
        onRemovePlace={scheduleState.removePlace}
        onRegenerate={scheduleState.regenerate}
        canEdit={canEditSchedule}
        dorm={user.dorm}
        attendance={attendance}
      />
    ) : (
      <MyCleaningPage
        studentName={user.name}
        schedule={scheduleState.schedule}
        dorm={user.dorm}
        task={attendance.taskForStudent(user.name)}
        onSubmitProof={(photoName) =>
          attendance.submitProof(user.name, photoName, nowISO())
        }
      />
    );

    function renderPage() {
      switch (page) {
        case 'reports':
          return isAdmin ? (
            <ReportsAdminPage reports={reports} onUpdateReport={updateReport} />
          ) : (
            <ReportsStudentPage
              myReports={getMyReports(reports, user.name)}
              onAddReport={(input) => addReport(input, user.name)}
            />
          );

        case 'cleaning':
          return cleaningPage;

        case 'consultation':
          return (
            <ConsultationPage
              bookings={bookings}
              defaultName={user.name}
              onBook={(input) => addBooking(input, user.name)}
              onCancel={cancelBooking}
            />
          );

        case 'permission':
          return isAdmin ? (
            <PermissionAdminPage requests={requests} onSetStatus={setStatus} />
          ) : (
            <PermissionStudentPage
              myRequests={getMyPermissions(requests, user.name)}
              onSubmit={(input) => addRequest(input, user.name)}
            />
          );

        case 'discipline':
          return isAdmin ? (
            <DisciplineAdminPage records={records} onRecord={addRecord} />
          ) : (
            <DisciplineStudentPage studentName={user.name} records={records} />
          );

        case 'help':
          return <FaqPage />;

        case 'home':
        default:
          return isAdmin ? (
            <HomePage user={user} onNavigate={setPage} />
          ) : (
            <StudentHomePage user={user} onNavigate={setPage} />
          );
      }
    }

    if (isAdmin) {
      return (
        <AdminShell user={user} page={page} onNavigate={setPage} onSignOut={handleSignOut}>
          {renderPage()}
        </AdminShell>
      );
    }

    return (
      <StudentShell user={user} page={page} onNavigate={setPage} onSignOut={handleSignOut}>
        {renderPage()}
      </StudentShell>
    );
  }

  // --- Signed out: splash / home / auth flow. ---
  switch (authScreen) {
    case 'splash':
      return <SplashScreen onFinish={() => setAuthScreen('home')} />;
    case 'signin':
      return (
        <SignInScreen
          onSignIn={signIn}
          onGoSignUp={() => setAuthScreen('signup')}
          onBack={() => setAuthScreen('home')}
        />
      );
    case 'signup':
      return (
        <SignUpScreen
          onSignUp={signUp}
          onGoSignIn={() => setAuthScreen('signin')}
          onBack={() => setAuthScreen('home')}
        />
      );
    case 'home':
    default:
      return (
        <HomeScreen
          onSignIn={() => setAuthScreen('signin')}
          onCreateAccount={() => setAuthScreen('signup')}
        />
      );
  }
}
