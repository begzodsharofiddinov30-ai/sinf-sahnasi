// Oflayn tayyorlik va yangilanishlar holati
import { createContext, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { getOfflineStatus } from '../lib/offline';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

interface PwaCtx {
  portable: boolean;
  offlineReady: boolean;
  needRefresh: boolean;
  update: () => void;
  canInstall: boolean;
  install: () => Promise<void>;
}

const Ctx = createContext<PwaCtx>({
  portable: false,
  offlineReady: false,
  needRefresh: false,
  update: () => {},
  canInstall: false,
  install: async () => {},
});

export function PwaProvider({ children }: { children: ReactNode }) {
  const [offlineReady, setOfflineReady] = useState(false);
  const [needRefresh, setNeedRefresh] = useState(false);
  const [installEvt, setInstallEvt] = useState<BeforeInstallPromptEvent | null>(null);
  const updater = useRef<(reload?: boolean) => Promise<void>>(async () => {});

  useEffect(() => {
    if (__PORTABLE__ || location.protocol === 'file:' || !('serviceWorker' in navigator)) return;
    let alive = true;
    // Faqat production build'da service worker bor
    void import('virtual:pwa-register').then(({ registerSW }) => {
      if (!alive) return;
      updater.current = registerSW({
        immediate: true,
        onOfflineReady: () => setOfflineReady(true),
        onNeedRefresh: () => setNeedRefresh(true),
      });
    });
    // Oldingi tashrifdan kesh tayyor bo'lsa
    void getOfflineStatus().then((s) => alive && s.state === 'ready' && setOfflineReady(true));
    return () => {
      alive = false;
    };
  }, []);

  useEffect(() => {
    const on = (e: Event) => {
      e.preventDefault();
      setInstallEvt(e as BeforeInstallPromptEvent);
    };
    window.addEventListener('beforeinstallprompt', on);
    return () => window.removeEventListener('beforeinstallprompt', on);
  }, []);

  const value = useMemo<PwaCtx>(
    () => ({
      portable: __PORTABLE__ || (typeof location !== 'undefined' && location.protocol === 'file:'),
      offlineReady,
      needRefresh,
      update: () => void updater.current(true),
      canInstall: installEvt !== null,
      install: async () => {
        if (!installEvt) return;
        await installEvt.prompt();
        setInstallEvt(null);
      },
    }),
    [offlineReady, needRefresh, installEvt],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function usePwa(): PwaCtx {
  return useContext(Ctx);
}
