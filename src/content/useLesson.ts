// Darsni kerak bo'lganda yuklash
import { useEffect, useState } from 'react';
import { loadLesson } from './loader';
import type { Lesson } from './schema';

export type LessonState = { status: 'loading' } | { status: 'missing' } | { status: 'ready'; lesson: Lesson };

export function useLesson(id: string | null): LessonState {
  const [state, setState] = useState<LessonState>({ status: 'loading' });
  useEffect(() => {
    let alive = true;
    if (!id) {
      setState({ status: 'missing' });
      return;
    }
    setState({ status: 'loading' });
    loadLesson(id).then(
      (lesson) => alive && setState(lesson ? { status: 'ready', lesson } : { status: 'missing' }),
      () => alive && setState({ status: 'missing' }),
    );
    return () => {
      alive = false;
    };
  }, [id]);
  return state;
}
