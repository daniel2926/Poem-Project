import type { User } from '../types';
import { adminNav, PAGE_BLURB, PAGE_ACCENT, type PageId } from '../nav';
import { Icon } from '../components/Icon';

interface HomePageProps {
  user: User;
  onNavigate: (page: PageId) => void;
}

// Admin Home dashboard landing. Greets the admin and links to each management
// area — the entry point, not a service itself.
export function HomePage({ user, onNavigate }: HomePageProps) {
  const services = adminNav().filter((item) => item.id !== 'home');

  return (
    <div>
      <div className="mb-6 rounded-2xl bg-gradient-to-r from-brand to-brand-light px-6 py-6 text-white shadow-soft">
        <h1 className="text-2xl font-bold tracking-tight">
          Welcome back, {user.name.split(' ')[0]} 👋
        </h1>
        <p className="mt-1 text-sm text-white/80">Manage dorm operations across all students.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {services.map((service) => {
          const accent = PAGE_ACCENT[service.id];
          return (
            <button
              key={service.id}
              onClick={() => onNavigate(service.id)}
              className="group flex flex-col items-start rounded-2xl border border-slate-100 bg-white p-5 text-left shadow-card transition hover:-translate-y-0.5 hover:shadow-soft"
            >
              <span
                className={`flex h-11 w-11 items-center justify-center rounded-xl ${accent.bg} ${accent.text}`}
              >
                <Icon name={service.icon} className="h-6 w-6" />
              </span>
              <h2 className="mt-4 flex items-center gap-1 font-semibold text-slate-900">
                {service.label}
                <Icon
                  name="chevron"
                  className="h-4 w-4 text-slate-300 transition group-hover:translate-x-0.5 group-hover:text-brand"
                />
              </h2>
              <p className="mt-1 text-sm text-slate-500">{PAGE_BLURB[service.id]}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
