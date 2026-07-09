import { useState } from 'react';
import type { PageId } from './nav';
import { useAuth } from './hooks/useAuth';
import { useReports } from './hooks/useReports';
import { useSchedule } from './hooks/useSchedule';
import { usePermissions } from './hooks/usePermissions';
import { useConsultations } from './hooks/useConsultations';
import { useDiscipline } from './hooks/useDiscipline';
import { getMyReports } from './lib/reports';
import { getMyPermissions } from './lib/permissions';
import { SplashScreen } from './screens/SplashScreen';
import { HomeScreen } from './screens/HomeScreen';
import { SignInScreen } from './screens/SignInScreen';
import { SignUpScreen } from './screens/SignUpScreen';
import { AppShell } from './components/AppShell';
import { HomePage } from './pages/HomePage';
import { ReportsStudentPage } from './pages/ReportsStudentPage';
import { ReportsAdminPage } from './pages/ReportsAdminPage';
import { CleaningPage } from './pages/CleaningPage';
import { ConsultationPage } from './pages/ConsultationPage';
import { PermissionStudentPage } from './pages/PermissionStudentPage';
import { PermissionAdminPage } from './pages/PermissionAdminPage';
import { DisciplineAdminPage } from './pages/DisciplineAdminPage';
import { DisciplineStudentPage } from './pages/DisciplineStudentPage';

// The pre-login flow (before an account is signed in).
type AuthScreen = 'splash' | 'home' | 'signin' | 'signup';

// App root: owns the mock auth, the pre-login flow, and — once signed in — the
// per-service page routing inside the AppShell. All real logic lives in the
// hooks (/hooks) and helpers (/lib); each service is its own page (/pages).
export function App() {
  const { currentUser, signIn, signUp, signOut } = useAuth();
  const { reports, addReport, updateReport } = useReports();
  const { schedule, generate } = useSchedule();
  const { requests, addRequest, setStatus } = usePermissions();
  const { slots, book, cancel } = useConsultations();
  const { records, addRecord } = useDiscipline();

  const [authScreen, setAuthScreen] = useState<AuthScreen>('splash');
  const [page, setPage] = useState<PageId>('home');

  function handleSignOut() {
    signOut();
    setAuthScreen('home');
    setPage('home'); // reset so the next login lands on the dashboard
  }

  // --- Signed in: render the active service page inside the shell. ---
  if (currentUser) {
    const isAdmin = currentUser.role === 'admin';
    const canEditSchedule = isAdmin || currentUser.isDormHead;

    function renderPage() {
      switch (page) {
        case 'reports':
          return isAdmin ? (
            <ReportsAdminPage reports={reports} onUpdateReport={updateReport} />
          ) : (
            <ReportsStudentPage
              myReports={getMyReports(reports, currentUser!.name)}
              onAddReport={(input) => addReport(input, currentUser!.name)}
            />
          );

        case 'cleaning':
          return (
            <CleaningPage
              schedule={schedule}
              onGenerate={generate}
              canEdit={canEditSchedule}
              dorm={currentUser!.dorm}
            />
          );

        case 'consultation':
          return (
            <ConsultationPage
              slots={slots}
              studentName={currentUser!.name}
              onBook={(id) => book(id, currentUser!.name)}
              onCancel={(id) => cancel(id, currentUser!.name)}
            />
          );

        case 'permission':
          return isAdmin ? (
            <PermissionAdminPage requests={requests} onSetStatus={setStatus} />
          ) : (
            <PermissionStudentPage
              myRequests={getMyPermissions(requests, currentUser!.name)}
              onSubmit={(input) => addRequest(input, currentUser!.name)}
            />
          );

        case 'discipline':
          return isAdmin ? (
            <DisciplineAdminPage records={records} onRecord={addRecord} />
          ) : (
            <DisciplineStudentPage studentName={currentUser!.name} records={records} />
          );

        case 'home':
        default:
          return <HomePage user={currentUser!} onNavigate={setPage} />;
      }
    }

    return (
      <AppShell
        user={currentUser}
        page={page}
        onNavigate={setPage}
        onSignOut={handleSignOut}
      >
        {renderPage()}
      </AppShell>
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
