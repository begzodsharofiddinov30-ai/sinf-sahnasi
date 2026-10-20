// Sozlamalar konteksti: hammasi faqat shu kompyuterda (localStorage)
import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { configureAudio } from '../lib/audio';
import { writeJSON } from '../lib/storage';
import { DEFAULT_SETTINGS, loadFavourites, loadLastLesson, loadSettings, type LastLesson, type Settings } from './settings';

interface SettingsCtx {
  settings: Settings;
  update: (patch: Partial<Settings>) => void;
  favourites: string[];
  isFavourite: (id: string) => boolean;
  toggleFavourite: (id: string) => void;
  lastLesson: LastLesson | null;
  setLastLesson: (v: LastLesson | null) => void;
  resetAll: () => void;
}

const Ctx = createContext<SettingsCtx | null>(null);

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<Settings>(loadSettings);
  const [favourites, setFavourites] = useState<string[]>(loadFavourites);
  const [lastLesson, setLast] = useState<LastLesson | null>(loadLastLesson);

  useEffect(() => {
    writeJSON('settings', settings);
    configureAudio({ enabled: settings.soundOn, volume: settings.volume, calm: settings.calmMode, animSounds: settings.animSounds });
    const root = document.documentElement;
    root.style.setProperty('--font-scale', String(settings.fontScale));
    root.dataset.theme = settings.highContrast ? 'contrast' : 'default';
    root.dataset.motion = settings.calmMode || settings.lightMode ? 'reduced' : 'full';
    root.dataset.perf = settings.lightMode ? 'light' : 'normal';
  }, [settings]);

  const update = useCallback((patch: Partial<Settings>) => setSettings((s) => ({ ...s, ...patch })), []);

  const toggleFavourite = useCallback((id: string) => {
    setFavourites((list) => {
      const next = list.includes(id) ? list.filter((x) => x !== id) : [...list, id];
      writeJSON('favourites', next);
      return next;
    });
  }, []);

  const setLastLesson = useCallback((v: LastLesson | null) => {
    setLast(v);
    writeJSON('lastLesson', v);
  }, []);

  const resetAll = useCallback(() => {
    setSettings(DEFAULT_SETTINGS);
    setFavourites([]);
    writeJSON('favourites', []);
    setLastLesson(null);
  }, [setLastLesson]);

  const value = useMemo<SettingsCtx>(
    () => ({
      settings,
      update,
      favourites,
      isFavourite: (id) => favourites.includes(id),
      toggleFavourite,
      lastLesson,
      setLastLesson,
      resetAll,
    }),
    [settings, update, favourites, toggleFavourite, lastLesson, setLastLesson, resetAll],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useSettings(): SettingsCtx {
  const v = useContext(Ctx);
  if (!v) throw new Error('useSettings SettingsProvider ichida ishlatilishi kerak');
  return v;
}
