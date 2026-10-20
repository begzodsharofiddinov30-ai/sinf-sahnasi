// Sinf sahifasi: fanlar kartochkalari
import { Link, useParams } from 'react-router-dom';
import { Layout } from '../app/Layout';
import { SubjectIcon } from '../components/SubjectIcon';
import { topicsFor } from '../content/catalog';
import { SUBJECTS, parseGrade } from '../content/subjects';
import { NotFoundPage } from './NotFound';

export function GradePage() {
  const grade = parseGrade(useParams().grade);
  if (!grade) return <NotFoundPage />;

  return (
    <Layout crumbs={[{ label: `${grade}-sinf` }]}>
      <h1 className="text-title font-black">{grade}-sinf</h1>
      <p className="text-body font-bold text-ink-soft">Fanni tanlang</p>
      <nav aria-label="Fanlar" className="mt-[2rem] grid grid-cols-1 gap-[2rem] md:grid-cols-2">
        {SUBJECTS.map((s) => {
          const n = topicsFor(grade, s.id).length;
          return (
            <Link
              key={s.id}
              to={`/sinf/${grade}/${s.id}`}
              className={`flex min-h-[11rem] items-center gap-[2rem] rounded-xl3 border-[0.2rem] border-transparent px-[2.5rem] ${s.tone} shadow-[0_0.4rem_0_rgb(0_0_0/0.08)] transition-transform hover:-translate-y-1 hover:border-primary ${n === 0 ? 'opacity-70' : ''}`}
            >
              <SubjectIcon kind={s.icon} />
              <span>
                <span className="block text-lead font-black">{s.title}</span>
                <span className="block text-meta font-bold">{n > 0 ? `${n} ta mavzu` : 'Hozircha mavzu yo‘q'}</span>
              </span>
            </Link>
          );
        })}
      </nav>
    </Layout>
  );
}
