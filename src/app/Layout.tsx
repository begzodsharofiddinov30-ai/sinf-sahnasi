// Sahifalar uchun umumiy ramka: yuqori panel va kontent
import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '../components/Icon';
import { OfflineBadge } from '../components/OfflineBadge';

export interface Crumb {
  label: string;
  to?: string;
}

// Telefonda tugmalarda faqat belgi qoladi, yozuv ekran o'quvchi uchun saqlanadi
const navBtn =
  'inline-flex min-h-tap min-w-tap shrink-0 items-center justify-center gap-3 rounded-xl2 px-5 text-meta font-extrabold text-ink hover:bg-surface-2 max-sm:px-2';
const navLabel = 'max-sm:sr-only';

export function Layout({ crumbs = [], children }: { crumbs?: Crumb[]; children: ReactNode }) {
  return (
    <div className="flex min-h-[100dvh] flex-col">
      <header
        data-app-header
        className="flex items-center gap-3 border-b-[0.15rem] border-line bg-surface px-[2rem] py-[0.6rem] max-sm:flex-wrap max-sm:gap-x-1 max-sm:px-[1rem]"
      >
        <Link to="/" className={navBtn} aria-label="Bosh sahifa">
          <Icon name="home" />
          <span className={navLabel}>Bosh sahifa</span>
        </Link>
        {/* Telefonda yo'l ko'rsatkich alohida pastki qatorga tushadi */}
        <nav
          aria-label="Joylashuv"
          className="flex min-w-0 flex-1 items-center gap-2 text-meta font-bold text-ink-soft max-sm:order-last max-sm:basis-full max-sm:empty:hidden"
        >
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
        <div className="min-w-0 max-sm:ml-auto">
          <OfflineBadge />
        </div>
        <Link to="/asboblar" className={navBtn}>
          <Icon name="tools" />
          <span className={navLabel}>Asboblar</span>
        </Link>
        <Link to="/sozlamalar" className={navBtn} aria-label="Sozlamalar">
          <Icon name="settings" />
          <span className={navLabel}>Sozlamalar</span>
        </Link>
      </header>
      <main className="mx-auto w-full max-w-[110rem] flex-1 px-[3rem] py-[2.5rem] max-sm:px-[1.7rem] max-sm:py-[2rem]">{children}</main>
    </div>
  );
}
