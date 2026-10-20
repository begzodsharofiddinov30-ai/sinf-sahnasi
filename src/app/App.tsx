// Ilova ildizi: sozlamalar, asboblar, PWA va HashRouter.
// Og'ir sahifalar (pleyer, asboblar, ish varag'i) kerak bo'lganda yuklanadi — birinchi ochilish tezroq.
import { lazy, Suspense, type ReactNode } from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { LIVE_REGION_ID } from '../lib/a11y';
import { GradePage } from '../pages/Grade';
import { HomePage } from '../pages/Home';
import { NotFoundPage } from '../pages/NotFound';
import { SubjectPage } from '../pages/Subject';
import { TopicPage } from '../pages/Topic';
import { ToolsProvider } from '../tools/ToolsProvider';
import { CloudSync } from './CloudSync';
import { PwaProvider } from './PwaProvider';
import { SettingsProvider } from './SettingsProvider';
import { TeacherGate, TeacherProvider } from './TeacherProvider';

const PlayerPage = lazy(() => import('../pages/PlayerPage').then((m) => ({ default: m.PlayerPage })));
const WorksheetPage = lazy(() => import('../pages/Worksheet').then((m) => ({ default: m.WorksheetPage })));
const ToolsPage = lazy(() => import('../pages/Tools').then((m) => ({ default: m.ToolsPage })));
const SettingsPage = lazy(() => import('../pages/Settings').then((m) => ({ default: m.SettingsPage })));
const SelfCheckPage = lazy(() => import('../pages/SelfCheck').then((m) => ({ default: m.SelfCheckPage })));
const AdminPage = lazy(() => import('../pages/Admin').then((m) => ({ default: m.AdminPage })));
const InstallPage = lazy(() => import('../pages/Install').then((m) => ({ default: m.InstallPage })));

export const ROUTER_FUTURE = { v7_startTransition: true, v7_relativeSplatPath: true } as const;

function Loading() {
  return <div className="grid min-h-[100dvh] place-items-center text-lead font-extrabold text-ink-soft">Yuklanmoqda…</div>;
}

const lazyPage = (node: ReactNode) => <Suspense fallback={<Loading />}>{node}</Suspense>;

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/sinf/:grade" element={<GradePage />} />
      <Route path="/sinf/:grade/:subject" element={<SubjectPage />} />
      <Route path="/sinf/:grade/:subject/:slug" element={<TopicPage />} />
      <Route path="/dars/:grade/:subject/:slug" element={lazyPage(<PlayerPage />)} />
      <Route path="/ish-varagi/:grade/:subject/:slug" element={lazyPage(<WorksheetPage />)} />
      <Route path="/sozlamalar" element={lazyPage(<SettingsPage />)} />
      <Route path="/sozlamalar/tekshiruv" element={lazyPage(<SelfCheckPage />)} />
      <Route path="/asboblar" element={lazyPage(<ToolsPage />)} />
      <Route path="/ornatish" element={lazyPage(<InstallPage />)} />
      <Route path="/admin" element={lazyPage(<AdminPage />)} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export function App() {
  // Avval o'qituvchi kiradi (bulutdan ma'lumot keladi), keyin sozlamalar va asboblar shu ma'lumotni o'qiydi
  return (
    <PwaProvider>
      <TeacherProvider>
        <TeacherGate>
          <SettingsProvider>
            <ToolsProvider>
              <HashRouter future={ROUTER_FUTURE}>
                <AppRoutes />
              </HashRouter>
              <CloudSync />
            </ToolsProvider>
          </SettingsProvider>
        </TeacherGate>
        <div id={LIVE_REGION_ID} className="sr-only" aria-live="polite" aria-atomic="true" />
      </TeacherProvider>
    </PwaProvider>
  );
}
