// Dars pleyeri: to'liq ekran, sahnalar, boshqaruv paneli
import { AnimatePresence, motion } from 'framer-motion';
import { useCallback, useEffect, useMemo, useReducer, useState, type PointerEvent } from 'react';
import { FullscreenToggle } from '../components/FullscreenToggle';
import { Icon } from '../components/Icon';
import { ProgressDots } from '../components/ProgressDots';
import type { Lesson } from '../content/schema';
import { exitFullscreen, isFullscreen, toggleFullscreen } from '../lib/fullscreen';
import { formatMs } from '../tools/logic';
import { ToolsPanel, type ToolTab } from '../tools/ToolsPanel';
import { useTimerLeft, useTools } from '../tools/ToolsProvider';
import { AudioButton } from './AudioButton';
import { initPlayer, isAtEnd, isAtStart, playerReducer } from './engine';
import { usePlayerKeys, type KeyAction } from './keyboard';
import { SceneErrorBoundary } from './SceneErrorBoundary';
import { SceneTimer } from './SceneTimer';
import { getSceneEntry, sceneStepCount } from './sceneRegistry';

/** Asboblar taymeri ishlayotgan bo'lsa, panel yopiq paytda ham ko'rinib turadi */
function TimerChip({ onOpen }: { onOpen: () => void }) {
  const { timer } = useTools();
  const left = useTimerLeft();
  if (timer.endAt === null && !timer.finished) return null;
  return (
    <button
      type="button"
      onClick={onOpen}
      className={`flex min-h-tap items-center gap-2 rounded-full px-5 text-meta font-extrabold tabular-nums ${timer.finished ? 'bg-accent text-ink' : 'bg-primary-soft text-ink'}`}
      aria-label={timer.finished ? 'Taymer: vaqt tugadi' : `Taymer: ${formatMs(left)}`}
    >
      <Icon name="timer" /> {timer.finished ? 'Vaqt tugadi!' : formatMs(left)}
    </button>
  );
}

const toolBtn =
  'grid min-h-tap min-w-tap place-items-center rounded-full bg-surface-2 text-[2rem] text-ink hover:bg-primary-soft aria-pressed:bg-primary aria-pressed:text-on-primary';

export interface PlayerProps {
  lesson: Lesson;
  title: string;
  initialScene?: number;
  onExit: () => void;
  onSceneChange?: (index: number) => void;
}

export function Player({ lesson, title, initialScene = 0, onExit, onSceneChange }: PlayerProps) {
  const stepCounts = useMemo(() => lesson.scenes.map(sceneStepCount), [lesson]);
  const [state, dispatch] = useReducer(playerReducer, undefined, () => initPlayer(stepCounts, initialScene));
  const scene = lesson.scenes[state.index];
  const entry = scene ? getSceneEntry(scene) : undefined;
  const atEnd = isAtEnd(state);
  const total = lesson.scenes.length;

  useEffect(() => {
    onSceneChange?.(state.index);
  }, [state.index, onSceneChange]);

  const [tools, setTools] = useState<ToolTab | null>(null);
  const [lastTab, setLastTab] = useState<ToolTab>('picker');
  const openTools = (t: ToolTab = lastTab) => {
    setLastTab(t);
    setTools(t);
  };
  const next = useCallback(() => dispatch({ type: 'next' }), []);
  const exit = useCallback(() => {
    void exitFullscreen();
    onExit();
  }, [onExit]);

  const onKey = (a: KeyAction) => {
    switch (a) {
      case 'next':
        if (atEnd) return;
        return next();
      case 'prev':
        return dispatch({ type: 'prev' });
      case 'hint':
        return dispatch({ type: 'toggleHint' });
      case 'reveal':
        return dispatch({ type: 'reveal' });
      case 'fullscreen':
        return void toggleFullscreen();
      case 'tools':
        return tools ? setTools(null) : openTools();
      case 'exit':
        // Avval maslahat va asboblarni, keyin to'liq ekranni yopamiz, so'ng darsdan chiqamiz
        if (state.hintOpen) return dispatch({ type: 'closeHint' });
        if (tools) return setTools(null);
        if (isFullscreen()) return void exitFullscreen();
        return exit();
    }
  };
  usePlayerKeys(onKey);

  // Sichqoncha bilan bosilgandan keyin fokusni bo'shatamiz: Space/pult yana "Keyingi" bo'lsin
  const releaseFocus = (_e: PointerEvent) => {
    window.setTimeout(() => {
      const el = document.activeElement;
      if (el instanceof HTMLElement && el !== document.body) el.blur();
    }, 0);
  };

  const SceneView = entry?.component;

  return (
    <div className="fixed inset-0 flex flex-col bg-bg text-ink" onPointerUp={releaseFocus} data-testid="player">
      {/* Yuqori panel */}
      <header className="flex items-center gap-[1rem] px-[1.5rem] py-[0.8rem]">
        <button type="button" onClick={exit} className={toolBtn} aria-label="Darsdan chiqish (Esc)" title="Chiqish (Esc)">
          <Icon name="close" />
        </button>
        <h1 className="min-w-0 flex-1 truncate text-meta font-extrabold text-ink-soft">{title}</h1>
        <p className="text-meta font-extrabold tabular-nums text-ink-soft" aria-live="polite">
          <span className="sr-only">Sahna </span>
          {state.index + 1} / {total}
        </p>
        <TimerChip onOpen={() => openTools('timer')} />
        {scene?.timerSec && <SceneTimer key={`t-${state.index}`} seconds={scene.timerSec} />}
        {scene?.audio && <AudioButton key={`a-${state.index}`} src={scene.audio} className={toolBtn} />}
        <button
          type="button"
          onClick={() => dispatch({ type: 'toggleHint' })}
          className={toolBtn}
          aria-pressed={state.hintOpen}
          aria-label="O‘qituvchi maslahati (H)"
          title="Maslahat (H)"
        >
          <Icon name="hint" />
        </button>
        <button
          type="button"
          onClick={() => dispatch({ type: 'reveal' })}
          className={toolBtn}
          aria-pressed={state.revealed}
          aria-label="Javobni ko‘rsatish (J)"
          title="Javobni ko‘rsatish (J)"
        >
          <Icon name="eye" />
        </button>
        <button
          type="button"
          onClick={() => (tools ? setTools(null) : openTools())}
          className={toolBtn}
          aria-pressed={tools !== null}
          aria-label="O‘qituvchi asboblari (T)"
          title="Asboblar (T)"
        >
          <Icon name="tools" />
        </button>
        <FullscreenToggle className={toolBtn} />
      </header>

      {/* Sahna */}
      <main className="relative min-h-0 flex-1 overflow-hidden">
        <AnimatePresence initial={false}>
          <motion.section
            key={`${state.index}-${scene?.id}`}
            className="absolute inset-0"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            aria-roledescription="sahna"
            aria-label={`${state.index + 1}-sahna`}
          >
            <SceneErrorBoundary>
              {scene && SceneView ? (
                <SceneView scene={scene} step={state.step} revealed={state.revealed} onNext={next} />
              ) : (
                <div className="grid h-full place-items-center text-lead font-extrabold">Noma’lum sahna turi</div>
              )}
            </SceneErrorBoundary>
          </motion.section>
        </AnimatePresence>

        <AnimatePresence>
          {state.hintOpen && (
            <div key="hint" className="pointer-events-none absolute inset-x-0 bottom-[1rem] flex justify-center px-[1rem]">
            <motion.aside
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.2 }}
              className="pointer-events-auto flex w-[min(60rem,90vw)] items-start gap-4 rounded-xl2 border-[0.2rem] border-accent bg-accent-soft p-[1.2rem] shadow-lg"
              role="note"
              aria-label="O‘qituvchi maslahati"
            >
              <Icon name="hint" className="mt-1 h-[2.2rem] w-[2.2rem] shrink-0" />
              <p className="text-body font-bold">{scene?.hint ?? 'Bu sahna uchun maslahat yozilmagan.'}</p>
            </motion.aside>
            </div>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {tools && (
            <motion.aside
              key="tools"
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 60 }}
              transition={{ duration: 0.25 }}
              className="absolute bottom-0 right-0 top-0 z-40 w-[min(46rem,94vw)] overflow-y-auto border-l-[0.2rem] border-line bg-bg p-[1.5rem] shadow-2xl"
              aria-label="O‘qituvchi asboblari"
            >
              <div className="mb-[1rem] flex items-center justify-between">
                <h2 className="text-lead font-black">Asboblar</h2>
                <button type="button" onClick={() => setTools(null)} className={toolBtn} aria-label="Asboblarni yopish">
                  <Icon name="close" />
                </button>
              </div>
              <ToolsPanel tab={tools} onTab={openTools} />
            </motion.aside>
          )}
        </AnimatePresence>
      </main>

      {/* Pastki panel */}
      <footer className="flex items-center gap-[1.5rem] px-[1.5rem] py-[1rem]">
        <button
          type="button"
          onClick={() => dispatch({ type: 'prev' })}
          disabled={isAtStart(state)}
          className="flex min-h-[5rem] items-center gap-2 rounded-xl2 bg-surface px-[1.6rem] text-body font-extrabold text-ink ring-[0.15rem] ring-line disabled:opacity-40"
          aria-label="Orqaga (←)"
        >
          <Icon name="back" /> Orqaga
        </button>
        <div className="flex flex-1 justify-center">
          <ProgressDots total={total} current={state.index} onJump={(i) => dispatch({ type: 'goto', index: i })} />
        </div>
        {atEnd ? (
          <button type="button" onClick={exit} className="flex min-h-[5rem] items-center gap-2 rounded-xl2 bg-success px-[2rem] text-body font-extrabold text-on-primary">
            <Icon name="check" /> Tugatish
          </button>
        ) : (
          <button
            type="button"
            onClick={next}
            className="flex min-h-[5rem] items-center gap-2 rounded-xl2 bg-primary px-[2rem] text-body font-extrabold text-on-primary shadow-[0_0.3rem_0_rgb(0_0_0/0.18)]"
            aria-label="Keyingi (→, Space)"
          >
            Keyingi <Icon name="next" />
          </button>
        )}
      </footer>
    </div>
  );
}
