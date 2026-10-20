// Pleyer sahifasi: darsni yuklaydi va to'liq ekranda ko'rsatadi
import { useCallback } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { MotionSettings } from '../app/MotionSettings';
import { useSettings } from '../app/SettingsProvider';
import { findTopic } from '../content/catalog';
import { useLesson } from '../content/useLesson';
import { Player } from '../player/Player';
import { NotFoundPage } from './NotFound';

export function PlayerPage() {
  const { grade, subject, slug } = useParams();
  const [search] = useSearchParams();
  const id = `${grade}/${subject}/${slug}`;
  const topic = findTopic(id);
  const state = useLesson(topic ? id : null);
  const navigate = useNavigate();
  const { setLastLesson } = useSettings();

  const onExit = useCallback(() => navigate(`/sinf/${id}`), [navigate, id]);
  const onSceneChange = useCallback((scene: number) => setLastLesson({ id, scene }), [setLastLesson, id]);

  if (!topic || state.status === 'missing') return <NotFoundPage message="Bu dars topilmadi." />;
  if (state.status === 'loading') return <div className="grid min-h-[100dvh] place-items-center text-lead font-extrabold">Yuklanmoqda…</div>;
  if (state.lesson.scenes.length === 0) return <NotFoundPage message="Bu darsning sahnalari hali tayyor emas." />;

  return (
    <MotionSettings>
      <Player
        key={id}
        lesson={state.lesson}
        title={topic.title}
        initialScene={Number(search.get('s')) || 0}
        onExit={onExit}
        onSceneChange={onSceneChange}
      />
    </MotionSettings>
  );
}
