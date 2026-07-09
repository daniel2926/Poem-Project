import type { User } from '../types';
import { studentNav, PAGE_BLURB, PAGE_ACCENT, type PageId } from '../nav';
import { Icon } from '../components/Icon';
import { DormArt } from '../components/DormArt';

interface StudentHomePageProps {
  user: User;
  onNavigate: (page: PageId) => void;
}

// Student Home — the app's landing screen. A friendly dorm hero, a greeting,
// and a tappable card per service. Feels like a phone app home.
export function StudentHomePage({ user, onNavigate }: StudentHomePageProps) {
  const services = studentNav(user).filter((s) => s.id !== 'home');

  return (
    <div className="space-y-5">
      {/* Hero */}
      <div className="overflow-hidden rounded-3xl bg-white shadow-card">
        <DormArt className="h-36 w-full" />
        <div className="px-4 pb-4 pt-3">
          <h1 className="text-xl font-bold tracking-tight text-slate-900">
            Welcome home, {user.name.split(' ')[0]}!
          </h1>
          <p className="mt-0.5 text-sm text-slate-500">
            {user.isDormHead
              ? 'Everything for your dorm, in one place.'
              : 'Tap a service below to get started.'}
          </p>
        </div>
      </div>

      {/* Service cards */}
      <div className="grid grid-cols-2 gap-3">
        {services.map((service) => {
          const accent = PAGE_ACCENT[service.id];
          return (
            <button
              key={service.id}
              onClick={() => onNavigate(service.id)}
              className="flex flex-col items-start rounded-2xl bg-white p-4 text-left shadow-card transition active:scale-[0.97]"
            >
              <span
                className={`flex h-11 w-11 items-center justify-center rounded-2xl ring-4 ${accent.bg} ${accent.text} ${accent.ring}`}
              >
                <Icon name={service.icon} className="h-6 w-6" />
              </span>
              <span className="mt-3 text-sm font-semibold text-slate-900">{service.label}</span>
              <span className="mt-0.5 text-xs leading-snug text-slate-400">
                {PAGE_BLURB[service.id]}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
