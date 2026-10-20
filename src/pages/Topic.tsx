// Mavzu sahifasi: o'qituvchi uchun eslatmalar va "Darsni boshlash"
import { useNavigate, useParams } from 'react-router-dom';
import { Layout } from '../app/Layout';
import { useSettings } from '../app/SettingsProvider';
import { BigButton, BigLink } from '../components/BigButton';
import { Icon } from '../components/Icon';
import { findTopic } from '../content/catalog';
import { findSubject } from '../content/subjects';
import { useLesson } from '../content/useLesson';
import { enterFullscreen } from '../lib/fullscreen';
import { NotFoundPage } from './NotFound';

export function TopicPage() {
  const { grade, subject, slug } = useParams();
  const id = `${grade}/${subject}/${slug}`;
  const topic = findTopic(id);
  const state = useLesson(topic ? id : null);
  const { settings, isFavourite, toggleFavourite, lastLesson } = useSettings();
  const navigate = useNavigate();

  if (!topic || state.status === 'missing') return <NotFoundPage message="Bu mavzu topilmadi." />;
  const subj = findSubject(topic.subject);
  const fav = isFavourite(id);

  const start = (scene = 0) => {
    // To'liq ekran faqat foydalanuvchi bosganda ruxsat etiladi — shu yerda so'raymiz
    if (settings.autoFullscreen) void enterFullscreen();
    navigate(`/dars/${id}${scene > 0 ? `?s=${scene}` : ''}`);
  };

  const lesson = state.status === 'ready' ? state.lesson : null;
  const resume = lastLesson?.id === id && lastLesson.scene > 0 && lesson && lastLesson.scene < lesson.scenes.length ? lastLesson.scene : 0;

  return (
    <Layout
      crumbs={[
        { label: `${topic.grade}-sinf`, to: `/sinf/${topic.grade}` },
        { label: subj?.title ?? topic.subject, to: `/sinf/${topic.grade}/${topic.subject}` },
        { label: topic.title },
      ]}
    >
      <div className="flex flex-wrap items-start justify-between gap-[2rem]">
        <div className="min-w-0">
          <h1 className="text-title font-black">{topic.title}</h1>
          <p className="text-body font-bold text-ink-soft">{topic.summary}</p>
        </div>
        <button
          type="button"
          aria-pressed={fav}
          onClick={() => toggleFavourite(id)}
          className="no-print inline-flex min-h-tap items-center gap-3 rounded-xl2 border-[0.15rem] border-line bg-surface px-6 text-meta font-extrabold aria-pressed:border-accent aria-pressed:bg-accent-soft"
        >
          <Icon name="star" filled={fav} className="h-[1.3em] w-[1.3em] text-accent" />
          {fav ? 'Sevimlilarda' : 'Sevimlilarga qo‘shish'}
        </button>
      </div>

      <p className="mt-[1rem] inline-block rounded-lg bg-warn-soft px-4 py-1 text-meta font-bold text-warn">
        Qoralama: dars mazmunini o‘qituvchi tekshirib chiqishi kerak
      </p>

      {!lesson ? (
        <p className="mt-[2rem] text-body font-bold text-ink-soft">Yuklanmoqda…</p>
      ) : (
        <>
          <div className="no-print mt-[2rem] flex flex-wrap items-center gap-[1.5rem]">
            <BigButton size="xl" onClick={() => start(0)} disabled={lesson.scenes.length === 0}>
              <Icon name="play" /> Darsni boshlash
            </BigButton>
            {resume > 0 && (
              <BigButton size="lg" variant="secondary" onClick={() => start(resume)}>
                {resume + 1}-sahnadan davom ettirish
              </BigButton>
            )}
            {lesson.scenes.length > 0 && (
              <BigLink to={`/ish-varagi/${id}`} size="lg" variant="secondary">
                Ish varag‘i
              </BigLink>
            )}
            <span className="text-meta font-bold text-ink-soft">
              {lesson.scenes.length > 0 ? `${lesson.scenes.length} ta sahna` : 'Sahnalar hali tayyorlanmoqda'}
            </span>
          </div>

          <section className="mt-[2.5rem] grid gap-[2rem] lg:grid-cols-[2fr_1fr]" aria-label="O‘qituvchi uchun eslatma">
            <div className="rounded-xl3 bg-surface p-[2rem] ring-[0.15rem] ring-line">
              <h2 className="text-lead font-black">Dars maqsadi</h2>
              <p className="mt-2 text-body">{lesson.notes.goal}</p>
              <h2 className="mt-[1.5rem] text-lead font-black">Muhokama uchun savollar</h2>
              <ol className="mt-2 list-decimal space-y-2 pl-[2.5rem] text-body">
                {lesson.notes.questions.map((q, i) => (
                  <li key={i}>{q}</li>
                ))}
              </ol>
            </div>
            <div className="flex flex-col gap-[1rem] rounded-xl3 bg-primary-soft p-[2rem]">
              <h2 className="text-lead font-black">Taxminiy vaqt</h2>
              <p className="flex items-center gap-3 text-title font-black text-primary">
                <Icon name="timer" /> {lesson.notes.minutes} daq.
              </p>
            </div>
          </section>
        </>
      )}
    </Layout>
  );
}
