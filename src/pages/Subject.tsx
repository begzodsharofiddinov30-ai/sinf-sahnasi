// Fan sahifasi: mavzular ro'yxati, qidiruv va "Sevimlilar" filtri
import { useId, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Layout } from '../app/Layout';
import { useSettings } from '../app/SettingsProvider';
import { Icon } from '../components/Icon';
import { topicsFor } from '../content/catalog';
import { topicId } from '../content/schema';
import { findSubject, parseGrade } from '../content/subjects';
import { matchesQuery } from '../lib/text';
import { NotFoundPage } from './NotFound';

export function SubjectPage() {
  const params = useParams();
  const grade = parseGrade(params.grade);
  const subject = findSubject(params.subject);
  const { isFavourite, toggleFavourite } = useSettings();
  const [query, setQuery] = useState('');
  const [onlyFav, setOnlyFav] = useState(false);
  const searchId = useId();

  if (!grade || !subject) return <NotFoundPage />;

  const all = topicsFor(grade, subject.id);
  const list = all.filter((t) => matchesQuery(`${t.title} ${t.summary}`, query) && (!onlyFav || isFavourite(topicId(t))));

  return (
    <Layout crumbs={[{ label: `${grade}-sinf`, to: `/sinf/${grade}` }, { label: subject.title }]}>
      <h1 className="text-title font-black">{subject.title}</h1>
      <p className="text-body font-bold text-ink-soft">{grade}-sinf · mavzular</p>

      <div className="mt-[2rem] flex flex-wrap items-center gap-[1.5rem]">
        <label htmlFor={searchId} className="flex min-h-tap flex-1 items-center gap-3 rounded-xl2 border-[0.15rem] border-line bg-surface px-5 focus-within:border-primary">
          <Icon name="search" className="h-[1.4em] w-[1.4em] text-ink-soft" />
          <span className="sr-only">Mavzu qidirish</span>
          <input
            id={searchId}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Mavzu qidirish…"
            className="min-w-0 flex-1 bg-transparent py-3 text-body font-bold outline-none placeholder:text-ink-soft/70"
          />
        </label>
        <button
          type="button"
          aria-pressed={onlyFav}
          onClick={() => setOnlyFav((v) => !v)}
          className="inline-flex min-h-tap items-center gap-3 rounded-xl2 border-[0.15rem] border-line bg-surface px-6 text-meta font-extrabold aria-pressed:border-primary aria-pressed:bg-primary aria-pressed:text-on-primary"
        >
          <Icon name="star" filled={onlyFav} /> Sevimlilar
        </button>
      </div>

      {all.length === 0 ? (
        <p className="mt-[3rem] text-body font-bold text-ink-soft">Bu fan uchun hali mavzu qo‘shilmagan.</p>
      ) : list.length === 0 ? (
        <p className="mt-[3rem] text-body font-bold text-ink-soft">{onlyFav ? 'Sevimli mavzu topilmadi.' : 'Hech narsa topilmadi.'}</p>
      ) : (
        <ul className="mt-[2rem] flex flex-col gap-[1.2rem]">
          {list.map((t, i) => {
            const id = topicId(t);
            const fav = isFavourite(id);
            return (
              <li key={id} className="flex items-stretch gap-[1rem]">
                <Link
                  to={`/sinf/${id}`}
                  className="flex flex-1 items-center gap-[1.5rem] rounded-xl2 border-[0.15rem] border-line bg-surface px-[1.8rem] py-[1.2rem] hover:border-primary"
                >
                  <span className="grid h-[4rem] w-[4rem] shrink-0 place-items-center rounded-full bg-primary-soft text-body font-black text-primary">{i + 1}</span>
                  <span className="min-w-0">
                    <span className="block text-body font-black">{t.title}</span>
                    <span className="block text-meta font-bold text-ink-soft">{t.summary}</span>
                  </span>
                </Link>
                <button
                  type="button"
                  aria-pressed={fav}
                  aria-label={fav ? `${t.title} — sevimlilardan olib tashlash` : `${t.title} — sevimlilarga qo‘shish`}
                  onClick={() => toggleFavourite(id)}
                  className="grid min-w-[5.5rem] place-items-center rounded-xl2 border-[0.15rem] border-line bg-surface text-[2.4rem] text-ink-soft hover:border-primary aria-pressed:text-accent"
                >
                  <Icon name="star" filled={fav} />
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </Layout>
  );
}
