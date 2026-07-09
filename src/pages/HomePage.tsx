import type { User } from '../types';
import { navFor, PAGE_BLURB, type PageId } from '../nav';
import { Icon } from '../components/Icon';

interface HomePageProps {
  user: User;
  onNavigate: (page: PageId) => void;
}

// Landing/Home dashboard shown right after login. Greets the user and links to
// each service they can access — the entry point, not a service itself.
export function HomePage({ user, onNavigate }: HomePageProps) {
  // Every nav item except Home itself becomes a service card.
  const services = navFor(user).filter((item) => item.id !== 'home');

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Welcome back, {user.name.split(' ')[0]} 👋
        </h1>
        <p className="mt-0.5 text-sm text-slate-500">
          {user.role === 'admin'
            ? 'Manage dorm operations across all students.'
            : 'Here are the dorm services available to you.'}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <button
            key={service.id}
            onClick={() => onNavigate(service.id)}
            className="group flex flex-col items-start rounded-2xl border border-slate-200 bg-white p-5 text-left shadow-sm transition hover:border-navy hover:shadow-md"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-navy/5 text-navy transition group-hover:bg-navy group-hover:text-white">
              <Icon name={service.icon} className="h-6 w-6" />
            </span>
            <h2 className="mt-4 flex items-center gap-1 font-semibold text-slate-900">
              {service.label}
              <Icon
                name="chevron"
                className="h-4 w-4 text-slate-300 transition group-hover:translate-x-0.5 group-hover:text-navy"
              />
            </h2>
            <p className="mt-1 text-sm text-slate-500">{PAGE_BLURB[service.id]}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
