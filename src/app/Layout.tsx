// Sahifalar uchun umumiy ramka: yuqori panel va kontent
import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '../components/Icon';
import { OfflineBadge } from '../components/OfflineBadge';

export interface Crumb {
  label: string;
  to?: string;
}

const navBtn =
  'inline-flex min-h-tap items-center gap-3 rounded-xl2 px-5 text-meta font-extrabold text-ink hover:bg-surface-2';

export function Layout({ crumbs = [], children }: { crumbs?: Crumb[]; children: ReactNode }) {
  return (
    <div className="flex min-h-[100dvh] flex-col">
      <header data-app-header className="flex items-center gap-3 border-b-[0.15rem] border-line bg-surface px-[2rem] py-[0.6rem]">
        <Link to="/" className={navBtn} aria-label="Bosh sahifa">
          <Icon name="home" />
          <span>Bosh sahifa</span>
        </Link>
        <nav aria-label="Joylashuv" className="flex min-w-0 flex-1 items-center gap-2 text-meta font-bold text-ink-soft">
          {crumbs.map((c, i) => (
            <span key={i} className="flex min-w-0 items-center gap-2">
              <Icon name="next" className="h-[0.9em] w-[0.9em] shrink-0" />
              {c.to ? (
                <Link to={c.to} className="truncate rounded-lg px-2 py-1 hover:bg-surface-2 hover:text-ink">
                  {c.label}
                </Link>
              ) : (
                <span className="truncate text-ink" aria-current="page">
                  {c.label}
                </span>
              )}
            </span>
          ))}
        </nav>
        <OfflineBadge />
        <Link to="/asboblar" className={navBtn}>
          <Icon name="tools" />
          <span>Asboblar</span>
        </Link>
        <Link to="/sozlamalar" className={navBtn} aria-label="Sozlamalar">
          <Icon name="settings" />
          <span>Sozlamalar</span>
        </Link>
      </header>
      <main className="mx-auto w-full max-w-[110rem] flex-1 px-[3rem] py-[2.5rem]">{children}</main>
    </div>
  );
}
