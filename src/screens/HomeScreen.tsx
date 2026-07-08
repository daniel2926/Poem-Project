import { Logo } from '../components/Logo';
import { Button } from '../components/Button';
import { Section } from '../components/Section';

interface HomeScreenProps {
  onSignIn: () => void;
  onCreateAccount: () => void;
}

// Landing screen: brand, subtitle, and the two entry points.
export function HomeScreen({ onSignIn, onCreateAccount }: HomeScreenProps) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-10">
      <div className="w-full max-w-md">
        <div className="mb-6 flex flex-col items-center text-center">
          <Logo size="lg" variant="onLight" withText={false} />
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900">CampusFlow</h1>
          <p className="mt-2 text-slate-500">
            Report and manage dorm facility &amp; room damage — all in one place.
          </p>
        </div>

        <Section>
          <div className="flex flex-col gap-3">
            <Button variant="primary" fullWidth onClick={onSignIn}>
              Sign In
            </Button>
            <Button variant="secondary" fullWidth onClick={onCreateAccount}>
              Create Account
            </Button>
          </div>
        </Section>

        <p className="mt-4 text-center text-xs text-slate-400">
          Prototype · mock data · resets on refresh
        </p>
      </div>
    </div>
  );
}
