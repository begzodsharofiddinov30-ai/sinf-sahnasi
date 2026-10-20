// Darsni kerak bo'lganda yuklash
import { useEffect, useState } from 'react';
import { loadLesson } from './loader';
import type { Lesson } from './schema';

export type LessonState = { status: 'loading' } | { status: 'missing' } | { status: 'ready'; lesson: Lesson };

export function useLesson(id: string | null): LessonState {
  // Natija qaysi dars uchun ekanini ham saqlaymiz: dars almashganda eskisi bir lahza ham ko'rinmasin
  const [state, setState] = useState<{ id: string | null; value: LessonState }>({ id: null, value: { status: 'loading' } });
  useEffect(() => {
    let alive = true;
    if (!id) {
      setState({ id, value: { status: 'missing' } });
      return;
    }
    loadLesson(id).then(
      (lesson) => alive && setState({ id, value: lesson ? { status: 'ready', lesson } : { status: 'missing' } }),
      () => alive && setState({ id, value: { status: 'missing' } }),
    );
    return () => {
      alive = false;
    };
  }, [id]);
  return state.id === id ? state.value : { status: 'loading' };
}
