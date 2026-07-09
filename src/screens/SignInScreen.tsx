import { useState, type FormEvent } from 'react';
import { inputClass } from '../constants';
import { DEMO_LOGINS } from '../data/users';
import { Logo } from '../components/Logo';
import { Button } from '../components/Button';
import { Section } from '../components/Section';
import { Field } from '../components/Field';

interface SignInScreenProps {
  // Returns an error message, or null on success (App then routes to a dashboard).
  onSignIn: (email: string, password: string) => string | null;
  onGoSignUp: () => void;
  onBack: () => void;
}

export function SignInScreen({ onSignIn, onGoSignUp, onBack }: SignInScreenProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  function attempt(nextEmail: string, nextPassword: string) {
    if (!nextEmail.trim() || !nextPassword) {
      setError('Please enter your email and password.');
      return;
    }
    const message = onSignIn(nextEmail, nextPassword);
    if (message) setError(message);
    // On success there's nothing to do — App swaps to the dashboard.
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    attempt(email, password);
  }

  function handleDemo(demoEmail: string, demoPassword: string) {
    setEmail(demoEmail);
    setPassword(demoPassword);
    setError('');
    attempt(demoEmail, demoPassword);
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">
        <div className="mb-6 flex flex-col items-center">
          <Logo size="md" variant="onLight" />
          <h1 className="mt-4 text-xl font-semibold text-slate-900">Welcome back</h1>
          <p className="text-sm text-slate-500">Sign in to your account</p>
        </div>

        <Section>
          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            <Field label="Email">
              <input
                type="email"
                className={inputClass}
                placeholder="you@campusflow.dev"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Field>
            <Field label="Password">
              <input
                type="password"
                className={inputClass}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Field>

            {error && (
              <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>
            )}

            <Button type="submit" variant="primary" fullWidth>
              Sign In
            </Button>
          </form>

          <div className="mt-5 border-t border-slate-100 pt-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
              Quick demo logins
            </p>
            <div className="mt-2 grid gap-2 sm:grid-cols-3">
              {DEMO_LOGINS.map((d) => (
                <button
                  key={d.email}
                  type="button"
                  onClick={() => handleDemo(d.email, d.password)}
                  className="rounded-lg border border-slate-200 px-3 py-2 text-left transition hover:border-navy hover:bg-navy/5"
                >
                  <span className="block text-sm font-medium text-slate-800">{d.label}</span>
                  <span className="block text-xs text-slate-400">{d.hint}</span>
                </button>
              ))}
            </div>
            <p className="mt-2 text-xs text-slate-400">Password for all demo accounts: password</p>
          </div>
        </Section>

        <div className="mt-4 flex items-center justify-between text-sm">
          <button onClick={onBack} className="text-slate-500 hover:text-slate-800">
            ← Back
          </button>
          <span className="text-slate-500">
            No account?{' '}
            <button onClick={onGoSignUp} className="font-medium text-navy hover:underline">
              Create one
            </button>
          </span>
        </div>
      </div>
    </div>
  );
}
