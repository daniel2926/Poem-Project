import { useState } from 'react';
import { FAQS } from '../data/faqs';
import { inputClass } from '../constants';
import { PageHeader } from '../components/PageHeader';
import { Section } from '../components/Section';
import { EmptyState } from '../components/EmptyState';
import { Icon } from '../components/Icon';

// Help / FAQ page: a searchable list of questions; tapping one expands its
// answer (accordion). Hardcoded content, no AI, no backend.
export function FaqPage() {
  const [search, setSearch] = useState('');
  const [openId, setOpenId] = useState<string | null>(null);

  // Filter by question OR answer text so a keyword in the answer still matches.
  const q = search.trim().toLowerCase();
  const results = FAQS.filter(
    (f) => f.question.toLowerCase().includes(q) || f.answer.toLowerCase().includes(q),
  );

  return (
    <div className="space-y-5">
      <PageHeader title="Help / FAQ" subtitle="Dorm rules and common questions." />

      {/* Search box */}
      <div className="relative">
        <Icon
          name="search"
          className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
        />
        <input
          className={inputClass + ' pl-9'}
          placeholder="Search questions…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Accordion list */}
      {results.length === 0 ? (
        <Section>
          <EmptyState text={`No questions match "${search}".`} />
        </Section>
      ) : (
        <div className="space-y-3">
          {results.map((f) => {
            const open = openId === f.id;
            return (
              <div
                key={f.id}
                className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-card"
              >
                <button
                  onClick={() => setOpenId(open ? null : f.id)}
                  aria-expanded={open}
                  className="flex w-full items-center gap-3 px-4 py-3.5 text-left transition hover:bg-slate-50"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-sky-soft text-sky">
                    <Icon name="help" className="h-4 w-4" />
                  </span>
                  <span className="min-w-0 flex-1 font-semibold text-slate-900">{f.question}</span>
                  <Icon
                    name="chevronDown"
                    className={`h-5 w-5 shrink-0 text-slate-400 transition-transform ${
                      open ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {open && (
                  <div className="border-t border-slate-100 px-4 py-3.5 pl-[3.75rem] text-sm leading-relaxed text-slate-600">
                    {f.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      <p className="px-1 text-xs text-slate-400">
        {results.length} of {FAQS.length} question{FAQS.length !== 1 ? 's' : ''} shown.
      </p>
    </div>
  );
}
