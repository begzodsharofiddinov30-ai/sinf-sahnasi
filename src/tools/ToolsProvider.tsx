// O'qituvchi asboblari holati: ro'yxat, tanlash, hisob, taymer (dars almashsa ham saqlanadi)
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { playSfx } from '../lib/audio';
import { onExternalChange, readJSON, writeJSON } from '../lib/storage';
import { DEFAULT_TEAMS, changeScore, pickNext } from './logic';

export interface Team {
  name: string;
  score: number;
}

export interface TimerState {
  /** Umumiy vaqt, ms */
  total: number;
  /** Ishlayotgan bo'lsa — tugash vaqti (Date.now() bo'yicha) */
  endAt: number | null;
  /** To'xtatilganda qolgan vaqt, ms */
  left: number;
  finished: boolean;
}

interface ToolsCtx {
  names: string[];
  setNames: (n: string[]) => void;
  pool: string[];
  lastPicked: string | null;
  pick: () => string | null;
  resetPool: () => void;
  teams: Team[];
  setTeamCount: (n: 2 | 3) => void;
  addScore: (i: number, delta: number) => void;
  renameTeam: (i: number, name: string) => void;
  resetScores: () => void;
  timer: TimerState;
  startTimer: (ms?: number) => void;
  pauseTimer: () => void;
  resetTimer: (ms?: number) => void;
}

const Ctx = createContext<ToolsCtx | null>(null);

const isStrings = (v: unknown): v is string[] => Array.isArray(v) && v.every((x) => typeof x === 'string');

function loadTeams(): Team[] {
  const raw = readJSON<unknown>('scores', null);
  if (Array.isArray(raw) && (raw.length === 2 || raw.length === 3)) {
    const ok = raw.every((t) => t && typeof t.name === 'string' && typeof t.score === 'number');
    if (ok) return (raw as Team[]).map((t) => ({ name: t.name.slice(0, 20), score: changeScore(Math.floor(t.score), 0) }));
  }
  return DEFAULT_TEAMS.slice(0, 2).map((name) => ({ name, score: 0 }));
}

const DEFAULT_TIMER = 3 * 60_000;

export function ToolsProvider({ children }: { children: ReactNode }) {
  const [names, setNamesState] = useState<string[]>(() => {
    const v = readJSON<unknown>('classList', []);
    return isStrings(v) ? v : [];
  });
  const [picker, setPicker] = useState<{ pool: string[]; last: string | null }>(() => {
    const v = readJSON<{ pool?: unknown; last?: unknown }>('picker', {});
    return { pool: isStrings(v.pool) ? v.pool : [], last: typeof v.last === 'string' ? v.last : null };
  });
  const [teams, setTeams] = useState<Team[]>(loadTeams);
  const [timer, setTimer] = useState<TimerState>({ total: DEFAULT_TIMER, endAt: null, left: DEFAULT_TIMER, finished: false });
  const pickerRef = useRef(picker);
  pickerRef.current = picker;

  // Bulutdan yangi ro'yxat yoki hisob kelsa
  useEffect(
    () =>
      onExternalChange((keys) => {
        if (keys.includes('classList')) {
          const v = readJSON<unknown>('classList', []);
          setNamesState(isStrings(v) ? v : []);
        }
        if (keys.includes('scores')) setTeams(loadTeams());
      }),
    [],
  );

  useEffect(() => void writeJSON('picker', picker), [picker]);
  useEffect(() => void writeJSON('scores', teams), [teams]);

  // Taymer tugaganini kuzatish (bitta joyda — panel yopiq bo'lsa ham ishlaydi)
  useEffect(() => {
    if (timer.endAt === null) return;
    const wait = Math.max(0, timer.endAt - Date.now());
    const id = window.setTimeout(() => {
      setTimer((t) => ({ ...t, endAt: null, left: 0, finished: true }));
      playSfx('chime');
      window.setTimeout(() => playSfx('chime'), 700);
    }, wait);
    return () => window.clearTimeout(id);
  }, [timer.endAt]);

  const setNames = useCallback((n: string[]) => {
    setNamesState(n);
    writeJSON('classList', n);
    setPicker({ pool: [], last: null });
  }, []);

  const pick = useCallback(() => {
    const r = pickNext(names, pickerRef.current.pool, pickerRef.current.last);
    const next = { pool: r.pool, last: r.name };
    pickerRef.current = next;
    setPicker(next);
    return r.name;
  }, [names]);

  const value = useMemo<ToolsCtx>(
    () => ({
      names,
      setNames,
      // Bo'sh hovuz = yangi aylanish, hamma yana tanlanishi mumkin
      pool: picker.pool.length === 0 ? names : picker.pool.filter((n) => names.includes(n)),
      lastPicked: picker.last,
      pick,
      resetPool: () => setPicker({ pool: [], last: null }),
      teams,
      setTeamCount: (n) =>
        setTeams((ts) => (n === ts.length ? ts : n > ts.length ? [...ts, { name: DEFAULT_TEAMS[2], score: 0 }] : ts.slice(0, n))),
      addScore: (i, delta) => setTeams((ts) => ts.map((t, k) => (k === i ? { ...t, score: changeScore(t.score, delta) } : t))),
      renameTeam: (i, name) => setTeams((ts) => ts.map((t, k) => (k === i ? { ...t, name: name.slice(0, 20) } : t))),
      resetScores: () => setTeams((ts) => ts.map((t) => ({ ...t, score: 0 }))),
      timer,
      startTimer: (ms) =>
        setTimer((t) => {
          const left = ms ?? (t.finished || t.left <= 0 ? t.total : t.left);
          return { total: ms ?? t.total, endAt: Date.now() + left, left, finished: false };
        }),
      pauseTimer: () => setTimer((t) => (t.endAt === null ? t : { ...t, endAt: null, left: Math.max(0, t.endAt - Date.now()) })),
      resetTimer: (ms) => setTimer((t) => ({ total: ms ?? t.total, endAt: null, left: ms ?? t.total, finished: false })),
    }),
    [names, setNames, picker, pick, teams, timer],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useTools(): ToolsCtx {
  const v = useContext(Ctx);
  if (!v) throw new Error('useTools ToolsProvider ichida ishlatilishi kerak');
  return v;
}

/** Taymerning qolgan vaqti (ms), ishlayotganda har 250 ms yangilanadi */
export function useTimerLeft(): number {
  const { timer } = useTools();
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    if (timer.endAt === null) return;
    const id = window.setInterval(() => setNow(Date.now()), 250);
    return () => window.clearInterval(id);
  }, [timer.endAt]);
  return timer.endAt === null ? timer.left : Math.max(0, timer.endAt - now);
}
