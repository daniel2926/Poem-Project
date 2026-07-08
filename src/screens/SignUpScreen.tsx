import { useState, type FormEvent } from 'react';
import { DORMS, inputClass } from '../constants';
import type { SignUpInput } from '../lib/auth';
import { Logo } from '../components/Logo';
import { Button } from '../components/Button';
import { Section } from '../components/Section';
import { Field } from '../components/Field';

interface SignUpScreenProps {
  // Returns an error message, or null on success (App then opens the dashboard).
  onSignUp: (input: SignUpInput) => string | null;
  onGoSignIn: () => void;
  onBack: () => void;
}

export function SignUpScreen({ onSignUp, onGoSignIn, onBack }: SignUpScreenProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [dorm, setDorm] = useState(DORMS[0]);
  const [errors, setErrors] = useState<{ name?: string; email?: string; password?: string; form?: string }>({});

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const next: typeof errors = {};
    if (!name.trim()) next.name = 'Please enter your name.';
    if (!email.trim()) next.email = 'Please enter your email.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) next.email = 'Please enter a valid email.';
    if (password.length < 6) next.password = 'Use at least 6 characters.';
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    const message = onSignUp({ name, email, password, dorm });
    if (message) setErrors({ form: message });
    // On success App swaps to the Student dashboard.
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-10">
      <div className="w-full max-w-md">
        <div className="mb-6 flex flex-col items-center">
          <Logo size="md" variant="onLight" />
          <h1 className="mt-4 text-xl font-semibold text-slate-900">Create your account</h1>
          <p className="text-sm text-slate-500">Student sign-up</p>
        </div>

        <Section>
          <div className="mb-4 rounded-lg bg-blue-50 px-3 py-2 text-xs text-blue-800">
            Admin accounts are created by the school — there’s no public admin sign-up.
          </div>

          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            <Field label="Full name" error={errors.name}>
              <input
                className={inputClass + (errors.name ? ' border-red-400' : '')}
                placeholder="e.g. Andi Pratama"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Field>
            <Field label="Email" error={errors.email}>
              <input
                type="email"
                className={inputClass + (errors.email ? ' border-red-400' : '')}
                placeholder="you@campusflow.dev"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Field>
            <Field label="Password" error={errors.password}>
              <input
                type="password"
                className={inputClass + (errors.password ? ' border-red-400' : '')}
                placeholder="At least 6 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Field>
            <Field label="Dorm">
              <select className={inputClass} value={dorm} onChange={(e) => setDorm(e.target.value)}>
                {DORMS.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </Field>

            {errors.form && (
              <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{errors.form}</p>
            )}

            <Button type="submit" variant="primary" fullWidth>
              Create Account
            </Button>
          </form>
        </Section>

        <div className="mt-4 flex items-center justify-between text-sm">
          <button onClick={onBack} className="text-slate-500 hover:text-slate-800">
            ← Back
          </button>
          <span className="text-slate-500">
            Already have an account?{' '}
            <button onClick={onGoSignIn} className="font-medium text-navy hover:underline">
              Sign in
            </button>
          </span>
        </div>
      </div>
    </div>
  );
}
