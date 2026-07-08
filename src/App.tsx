import { useState } from 'react';
import type { Screen } from './types';
import { ROSTER } from './data/roster';
import { useAuth } from './hooks/useAuth';
import { useReports } from './hooks/useReports';
import { useSchedule } from './hooks/useSchedule';
import { getMyReports } from './lib/reports';
import { SplashScreen } from './screens/SplashScreen';
import { HomeScreen } from './screens/HomeScreen';
import { SignInScreen } from './screens/SignInScreen';
import { SignUpScreen } from './screens/SignUpScreen';
import { StudentDashboard } from './screens/StudentDashboard';
import { AdminDashboard } from './screens/AdminDashboard';

// App root: owns the mock auth + navigation and routes to the right screen.
// All real logic lives in the hooks (/hooks) and helpers (/lib).
export function App() {
  const { currentUser, signIn, signUp, signOut } = useAuth();
  const { reports, addReport, updateReport } = useReports();
  const { schedule, addAssignment, removeAssignment } = useSchedule();
  const [screen, setScreen] = useState<Screen>('splash');

  function handleSignOut() {
    signOut();
    setScreen('home');
  }

  // Signed in → show the dashboard for this account's role.
  if (currentUser) {
    if (currentUser.role === 'admin') {
      return (
        <AdminDashboard
          user={currentUser}
          reports={reports}
          onUpdateReport={updateReport}
          schedule={schedule}
          onSignOut={handleSignOut}
        />
      );
    }
    return (
      <StudentDashboard
        user={currentUser}
        myReports={getMyReports(reports, currentUser.name)}
        onAddReport={(input) => addReport(input, currentUser.name)}
        schedule={schedule}
        roster={ROSTER}
        onAddAssignment={addAssignment}
        onRemoveAssignment={removeAssignment}
        onSignOut={handleSignOut}
      />
    );
  }

  // Signed out → splash / home / auth flow.
  switch (screen) {
    case 'splash':
      return <SplashScreen onFinish={() => setScreen('home')} />;
    case 'signin':
      return (
        <SignInScreen
          onSignIn={signIn}
          onGoSignUp={() => setScreen('signup')}
          onBack={() => setScreen('home')}
        />
      );
    case 'signup':
      return (
        <SignUpScreen
          onSignUp={signUp}
          onGoSignIn={() => setScreen('signin')}
          onBack={() => setScreen('home')}
        />
      );
    case 'home':
    default:
      return (
        <HomeScreen
          onSignIn={() => setScreen('signin')}
          onCreateAccount={() => setScreen('signup')}
        />
      );
  }
}
