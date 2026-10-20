// Bosh sahifa: to'rtta katta sinf tugmasi
import { Link } from 'react-router-dom';
import { Layout } from '../app/Layout';
import { useSettings } from '../app/SettingsProvider';
import { Icon } from '../components/Icon';
import { MASCOT_NAME, Mascot } from '../components/Mascot';
import { CATALOG, findTopic } from '../content/catalog';
import { topicId } from '../content/schema';
import { GRADES } from '../content/subjects';

const GRADE_TONES = ['bg-[#DCE9F7]', 'bg-[#FDE3CC]', 'bg-[#DDF0D5]', 'bg-[#EADCF5]'];

export function HomePage() {
  const { lastLesson, favourites } = useSettings();
  const last = lastLesson ? findTopic(lastLesson.id) : undefined;
  const favTopics = CATALOG.filter((t) => favourites.includes(topicId(t)));

  return (
    <Layout>
      <section className="flex items-center gap-[2rem]">
        <span className="block h-[11rem] shrink-0">
          <Mascot mood="happy" className="h-full w-auto" />
        </span>
        <div>
          <h1 className="text-title font-black">Sinf Sahnasi</h1>
          <p className="text-body font-bold text-ink-soft">Salom! Men {MASCOT_NAME}man. Qaysi sinf bilan dars o‘tamiz?</p>
        </div>
      </section>

      <nav aria-label="Sinflar" className="mt-[2.5rem] grid grid-cols-2 gap-[2rem] lg:grid-cols-4">
        {GRADES.map((g, i) => (
          <Link
            key={g}
            to={`/sinf/${g}`}
            className={`flex min-h-[14rem] flex-col items-center justify-center rounded-xl3 border-[0.2rem] border-transparent ${GRADE_TONES[i]} text-ink shadow-[0_0.4rem_0_rgb(0_0_0/0.08)] transition-transform hover:-translate-y-1 hover:border-primary`}
          >
            <span className="text-[7rem] font-black leading-none">{g}</span>
            <span className="text-lead font-extrabold">sinf</span>
          </Link>
        ))}
      </nav>

      {last && lastLesson && (
        <section className="mt-[2.5rem]">
          <Link
            to={`/dars/${lastLesson.id}?s=${lastLesson.scene}`}
            className="flex min-h-tap items-center gap-[1.5rem] rounded-xl2 border-[0.15rem] border-line bg-surface px-[2rem] py-[1.2rem] hover:border-primary"
          >
            <Icon name="play" className="h-[2.5rem] w-[2.5rem] text-primary" />
            <span>
              <span className="block text-meta font-bold text-ink-soft">Davom ettirish · {last.grade}-sinf</span>
              <span className="block text-body font-extrabold">
                {last.title} — {lastLesson.scene + 1}-sahna
              </span>
            </span>
          </Link>
        </section>
      )}

      {favTopics.length > 0 && (
        <section className="mt-[2.5rem]" aria-labelledby="fav-title">
          <h2 id="fav-title" className="flex items-center gap-3 text-lead font-black">
            <Icon name="star" filled className="h-[1em] w-[1em] text-accent" /> Sevimlilar
          </h2>
          <ul className="mt-4 flex flex-wrap gap-4">
            {favTopics.map((t) => (
              <li key={topicId(t)}>
                <Link
                  to={`/sinf/${topicId(t)}`}
                  className="inline-flex min-h-tap items-center rounded-xl2 bg-surface px-6 text-meta font-extrabold ring-[0.15rem] ring-line hover:ring-primary"
                >
                  {t.grade}-sinf · {t.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </Layout>
  );
}
