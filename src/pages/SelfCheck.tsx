// Sozlamalar › Tekshiruv: darsdan oldin hamma narsa ishlashini tekshirish
import { useEffect, useState, type ReactNode } from 'react';
import { Layout } from '../app/Layout';
import { BigButton } from '../components/BigButton';
import { Icon } from '../components/Icon';
import { audioSupported, playSfx } from '../lib/audio';
import { enterFullscreen, exitFullscreen } from '../lib/fullscreen';
import { OFFLINE_TEXT, getOfflineStatus, type OfflineStatus } from '../lib/offline';
import { storageAvailable } from '../lib/storage';

type Mark = 'ok' | 'warn' | 'unknown';

function Row({ title, mark, children }: { title: string; mark: Mark; children: ReactNode }) {
  const icon = mark === 'ok' ? '✓' : mark === 'warn' ? '!' : '?';
  const tone = mark === 'ok' ? 'bg-success text-on-primary' : mark === 'warn' ? 'bg-accent text-ink' : 'bg-surface-2 text-ink';
  const word = mark === 'ok' ? 'Yaxshi' : mark === 'warn' ? 'Diqqat' : 'Tekshirilmagan';
  return (
    <li className="flex items-start gap-[1.5rem] rounded-xl2 bg-surface p-[1.5rem] ring-[0.15rem] ring-line">
      <span className={`grid h-[3.5rem] w-[3.5rem] shrink-0 place-items-center rounded-full text-lead font-black ${tone}`} aria-hidden="true">
        {icon}
      </span>
      <div className="flex min-w-0 flex-1 flex-col gap-[0.6rem]">
        <h2 className="text-body font-black">
          {title} <span className="sr-only">: {word}</span>
        </h2>
        {children}
      </div>
    </li>
  );
}

function browserName(): string {
  const ua = navigator.userAgent;
  if (/Edg\//.test(ua)) return 'Microsoft Edge';
  if (/Chrome\//.test(ua)) return 'Google Chrome';
  if (/Firefox\//.test(ua)) return 'Firefox';
  if (/Safari\//.test(ua)) return 'Safari';
  return 'Noma’lum brauzer';
}

export function SelfCheckPage() {
  const [offline, setOffline] = useState<OfflineStatus | null>(null);
  const [heard, setHeard] = useState<boolean | null>(null);
  const [played, setPlayed] = useState(false);
  const [fs, setFs] = useState<boolean | null>(null);
  const [size, setSize] = useState(() => ({ w: window.innerWidth, h: window.innerHeight }));

  useEffect(() => {
    void getOfflineStatus().then(setOffline);
    const on = () => setSize({ w: window.innerWidth, h: window.innerHeight });
    window.addEventListener('resize', on);
    return () => window.removeEventListener('resize', on);
  }, []);

  const testFullscreen = async () => {
    const ok = await enterFullscreen();
    setFs(ok);
    if (ok) window.setTimeout(() => void exitFullscreen(), 1500);
  };

  const sw = window.screen.width;
  const sh = window.screen.height;
  const dpr = window.devicePixelRatio || 1;

  return (
    <Layout crumbs={[{ label: 'Sozlamalar', to: '/sozlamalar' }, { label: 'Tekshiruv' }]}>
      <h1 className="text-title font-black">Tekshiruv</h1>
      <p className="text-body text-ink-soft">Darsdan oldin (uyda, internet bor paytda) shu sahifani ochib, hammasi “✓” ekanini tekshiring.</p>
      <ul className="mt-[2rem] flex max-w-[70rem] flex-col gap-[1rem]">
        <Row title="Oflayn rejim" mark={offline?.state === 'ready' || offline?.state === 'file' ? 'ok' : offline ? 'warn' : 'unknown'}>
          <p className="text-meta">
            {offline ? OFFLINE_TEXT[offline.state] : 'Tekshirilmoqda…'}
            {offline?.files ? ` (${offline.files} ta fayl saqlangan)` : ''}
          </p>
        </Row>
        <Row title="Ovoz" mark={!audioSupported() ? 'warn' : heard === true ? 'ok' : heard === false ? 'warn' : 'unknown'}>
          {!audioSupported() ? (
            <p className="text-meta">Brauzer ovoz chiqara olmaydi.</p>
          ) : (
            <div className="flex flex-wrap items-center gap-[1rem]">
              <BigButton
                size="md"
                onClick={() => {
                  playSfx('chime');
                  setPlayed(true);
                }}
              >
                <Icon name="volume" /> Ovozni sinash
              </BigButton>
              {played && (
                <>
                  <span className="text-meta font-bold">Eshitildimi?</span>
                  <BigButton size="md" variant="secondary" onClick={() => setHeard(true)}>
                    Ha
                  </BigButton>
                  <BigButton size="md" variant="secondary" onClick={() => setHeard(false)}>
                    Yo‘q
                  </BigButton>
                </>
              )}
              {heard === false && <p className="w-full text-meta">Kompyuter ovozini, kolonkani va Sozlamalardagi “Ovoz” tugmasini tekshiring.</p>}
            </div>
          )}
        </Row>
        <Row title="To‘liq ekran" mark={fs === true ? 'ok' : fs === false || !document.fullscreenEnabled ? 'warn' : 'unknown'}>
          <div className="flex flex-wrap items-center gap-[1rem]">
            <BigButton size="md" onClick={() => void testFullscreen()} disabled={!document.fullscreenEnabled}>
              <Icon name="fullscreen" /> Sinab ko‘rish
            </BigButton>
            <span className="text-meta">
              {fs === true ? 'Ishlaydi (1,5 soniyadan keyin qaytadi)' : fs === false ? 'Ochilmadi. F11 tugmasini sinab ko‘ring.' : document.fullscreenEnabled ? '' : 'Bu oynada ruxsat yo‘q'}
            </span>
          </div>
        </Row>
        <Row title="Ekran" mark={size.w >= 1280 && size.h >= 650 ? 'ok' : 'warn'}>
          <p className="text-meta">
            Ekran: {Math.round(sw * dpr)}×{Math.round(sh * dpr)} · Oyna: {size.w}×{size.h}
            {dpr !== 1 ? ` · Masshtab ${Math.round(dpr * 100)}%` : ''}
          </p>
          {size.w < 1280 && <p className="text-meta">Oyna tor. To‘liq ekran (F) yoki brauzer masshtabini 100% qiling.</p>}
        </Row>
        <Row title="Sozlamalarni saqlash" mark={storageAvailable() ? 'ok' : 'warn'}>
          <p className="text-meta">{storageAvailable() ? 'Ishlaydi' : 'Brauzer saqlashga ruxsat bermayapti — sozlamalar yopilganda yo‘qoladi.'}</p>
        </Row>
        <Row title="Brauzer va versiya" mark="ok">
          <p className="text-meta">
            {browserName()} · Ilova versiyasi {__APP_VERSION__}
          </p>
        </Row>
      </ul>
    </Layout>
  );
}
