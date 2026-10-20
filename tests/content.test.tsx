import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MotionConfig } from 'framer-motion';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { ROUTER_FUTURE } from '../src/app/App';
import { SettingsProvider } from '../src/app/SettingsProvider';
import { CATALOG } from '../src/content/catalog';
import { lessonFileIds, loadLesson } from '../src/content/loader';
import { topicId, type Lesson } from '../src/content/schema';
import { audioPaths, validateLesson } from '../src/content/validate';
import { WorksheetPage } from '../src/pages/Worksheet';
import { getSceneEntry, sceneStepCount } from '../src/player/sceneRegistry';
import { buildWorksheet } from '../src/worksheet/worksheet';

async function allLessons(): Promise<[string, Lesson][]> {
  const out: [string, Lesson][] = [];
  for (const id of lessonFileIds) out.push([id, (await loadLesson(id))!]);
  return out;
}

describe('seed tarkib', () => {
  it('har sinfda kamida 13 mavzu, har birida 6–10 sahna va kamida 3 xil tur', async () => {
    expect(CATALOG.length).toBeGreaterThanOrEqual(54);
    for (const g of [1, 2, 3, 4]) expect(CATALOG.filter((t) => t.grade === g).length, `${g}-sinf`).toBeGreaterThanOrEqual(12);
    for (const s of ['matematika', 'ona-tili', 'oqish', 'olam']) expect(CATALOG.some((t) => t.subject === s), s).toBe(true);
    for (const [id, lesson] of await allLessons()) {
      expect(validateLesson(lesson, id).errors, id).toEqual([]);
      expect(lesson.scenes.length, id).toBeGreaterThanOrEqual(6);
      expect(lesson.scenes.length, id).toBeLessThanOrEqual(10);
      expect(new Set(lesson.scenes.map((s) => s.type)).size, id).toBeGreaterThanOrEqual(3);
    }
  });

  it('barcha 11 sahna turi seed darslarda ishlatilgan', async () => {
    const types = new Set((await allLessons()).flatMap(([, l]) => l.scenes.map((s) => s.type)));
    expect(types.size).toBe(11);
  });

  it('har bir darsning har bir sahnasi xatosiz chiziladi (oddiy va javob ochilgan)', async () => {
    for (const [id, lesson] of await allLessons()) {
      for (const scene of lesson.scenes) {
        const View = getSceneEntry(scene)!.component;
        for (const revealed of [false, true]) {
          const { unmount } = render(
            <SettingsProvider>
              <MotionConfig reducedMotion="always">
                <View scene={scene} step={sceneStepCount(scene) - 1} revealed={revealed} onNext={() => {}} />
              </MotionConfig>
            </SettingsProvider>,
          );
          expect(document.body.textContent, `${id} › ${scene.id}`).not.toMatch(/ko‘rsatib bo‘lmadi/);
          unmount();
        }
      }
    }
  });

  it('sahnasiz dars endi xato hisoblanadi; audio yoʻllari yigʻiladi', () => {
    const notes = { goal: 'g', questions: ['a', 'b', 'c'], minutes: 5 };
    expect(validateLesson({ notes, scenes: [] }).errors.join()).toMatch(/kamida bitta sahna/);
    expect(
      audioPaths({ notes, scenes: [{ id: 'a', type: 'story', audio: 'audio/x.mp3', pages: [{ text: 't', audio: 'audio/y.mp3' }] }] }),
    ).toEqual(['audio/x.mp3', 'audio/y.mp3']);
  });
});

describe('ish varagʻi', () => {
  it('har bir dars uchun topshiriqlar tuziladi', async () => {
    for (const [id, lesson] of await allLessons()) {
      const ws = buildWorksheet(lesson);
      expect(ws.items.length, id).toBeGreaterThanOrEqual(2);
      expect(ws.items.length, id).toBeLessThanOrEqual(8);
      expect(ws.remember.length, id).toBeGreaterThan(0);
    }
  });

  it('sahifa chiziladi va javoblar tugmasi ishlaydi', async () => {
    const user = userEvent.setup();
    const t = CATALOG.find((c) => c.slug === 'soz-yasash')!;
    render(
      <SettingsProvider>
        <MemoryRouter initialEntries={[`/ish-varagi/${topicId(t)}`]} future={ROUTER_FUTURE}>
          <Routes>
            <Route path="/ish-varagi/:grade/:subject/:slug" element={<WorksheetPage />} />
          </Routes>
        </MemoryRouter>
      </SettingsProvider>,
    );
    expect(await screen.findByText('Esda tuting')).toBeInTheDocument();
    expect(screen.queryByText(/^Javob:/)).toBeNull();
    await user.click(screen.getByRole('checkbox', { name: /Javoblar bilan/ }));
    expect(screen.getAllByText(/^Javob:/).length).toBeGreaterThan(3);
    expect(screen.getByText(/Javob: baliq/)).toBeInTheDocument();
  });
});

describe('useLesson', () => {
  it('dars almashganda eski dars bir lahza ham qaytmaydi', async () => {
    const { renderHook, waitFor } = await import('@testing-library/react');
    const { useLesson } = await import('../src/content/useLesson');
    const { result, rerender } = renderHook(({ id }) => useLesson(id), { initialProps: { id: '1/matematika/sonlar-1-10' } });
    await waitFor(() => expect(result.current.status).toBe('ready'));
    rerender({ id: '1/matematika/kop-kam' });
    expect(result.current.status).toBe('loading');
    await waitFor(() => expect(result.current.status).toBe('ready'));
  });
});
