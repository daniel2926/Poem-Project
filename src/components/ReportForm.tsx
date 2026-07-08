import { useState, type FormEvent } from 'react';
import type { Category } from '../types';
import { CATEGORIES, inputClass } from '../constants';
import type { NewReportInput } from '../lib/reports';
import { Section } from './Section';
import { Field } from './Field';
import { Icon } from './Icon';

interface ReportFormProps {
  onSubmit: (input: NewReportInput) => void;
}

// "Report Damage" form. Collects input and validates it, then hands a clean
// NewReportInput to the parent — the actual adding lives in the useReports hook.
export function ReportForm({ onSubmit }: ReportFormProps) {
  const [category, setCategory] = useState<Category>(CATEGORIES[0]);
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [photoName, setPhotoName] = useState('');
  const [errors, setErrors] = useState<{ title?: string; description?: string; location?: string }>({});
  const [success, setSuccess] = useState('');

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const nextErrors: typeof errors = {};
    if (!title.trim()) nextErrors.title = 'Please enter a title.';
    if (!description.trim()) nextErrors.description = 'Please describe the problem.';
    if (!location.trim()) nextErrors.location = 'Please enter a location.';
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      setSuccess('');
      return;
    }

    onSubmit({
      title: title.trim(),
      category,
      location: location.trim(),
      description: description.trim(),
      photoName,
    });

    // Reset for the next report.
    setTitle('');
    setLocation('');
    setDescription('');
    setPhotoName('');
    setCategory(CATEGORIES[0]);
    setErrors({});
    setSuccess('Report submitted! Track its status in “My Reports” below.');
  }

  return (
    <Section>
      <h2 className="text-lg font-semibold text-slate-900">Report Damage</h2>
      <p className="text-sm text-slate-500">Tell us what’s broken and we’ll track the fix.</p>

      {success && (
        <div className="mt-4 flex items-start gap-2 rounded-lg bg-green-50 px-3 py-2 text-sm text-green-800">
          <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0" />
          <span>{success}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Category">
          <select
            className={inputClass}
            value={category}
            onChange={(e) => setCategory(e.target.value as Category)}
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Location" error={errors.location}>
          <input
            className={inputClass + (errors.location ? ' border-red-400' : '')}
            placeholder="e.g. Room 204, 2nd floor kitchen"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </Field>

        <Field label="Title" error={errors.title} className="sm:col-span-2">
          <input
            className={inputClass + (errors.title ? ' border-red-400' : '')}
            placeholder="Short summary of the problem"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Field>

        <Field label="Description" error={errors.description} className="sm:col-span-2">
          <textarea
            rows={3}
            className={inputClass + (errors.description ? ' border-red-400' : '')}
            placeholder="What happened? Any details that help us fix it faster."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Field>

        <Field label="Photo (optional)" className="sm:col-span-2">
          <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-dashed border-slate-300 px-3 py-3 transition hover:border-navy">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-500">
              <Icon name="camera" className="h-5 w-5" />
            </span>
            <span className="min-w-0 flex-1 truncate text-sm text-slate-600">
              {photoName || 'Choose a photo'}
            </span>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => setPhotoName(e.target.files?.[0]?.name ?? '')}
            />
            <span className="ml-auto shrink-0 text-xs text-slate-400">Mock only</span>
          </label>
        </Field>

        <div className="sm:col-span-2">
          <button
            type="submit"
            className="w-full rounded-lg bg-navy px-5 py-2.5 font-medium text-white transition hover:bg-navy-dark sm:w-auto"
          >
            Submit Report
          </button>
        </div>
      </form>
    </Section>
  );
}
