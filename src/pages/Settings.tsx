// Sozlamalar: ovoz, ko'rinish, rejimlar, sinf ro'yxati
import { useId, useState, type ReactNode } from 'react';
import { Layout } from '../app/Layout';
import { useSettings } from '../app/SettingsProvider';
import { BigButton, BigLink } from '../components/BigButton';
import { Icon } from '../components/Icon';
import { playSfx } from '../lib/audio';
import { storageAvailable } from '../lib/storage';
import { ClassList } from '../tools/ClassList';

function Toggle({ label, hint, checked, onChange }: { label: string; hint?: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <label className="flex min-h-tap cursor-pointer items-center justify-between gap-6 rounded-xl2 bg-surface px-[1.8rem] py-[1rem] ring-[0.15rem] ring-line">
      <span>
        <span className="block text-body font-bold">{label}</span>
        {hint && <span className="block text-meta text-ink-soft">{hint}</span>}
      </span>
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} className="h-[2.4rem] w-[2.4rem] shrink-0 accent-[rgb(var(--primary))]" />
    </label>
  );
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="flex flex-col gap-[1rem]">
      <h2 className="text-lead font-black">{title}</h2>
      {children}
    </section>
  );
}

export function SettingsPage() {
  const { settings, update, resetAll } = useSettings();
  const volId = useId();
  const fontId = useId();
  const [confirm, setConfirm] = useState(false);

  return (
    <Layout crumbs={[{ label: 'Sozlamalar' }]}>
      <div className="flex flex-wrap items-center justify-between gap-[1rem]">
        <h1 className="text-title font-black">Sozlamalar</h1>
        <BigLink to="/sozlamalar/tekshiruv" variant="secondary" size="md">
          <Icon name="check" /> Tekshiruv
        </BigLink>
      </div>

      <div className="mt-[2rem] flex max-w-[70rem] flex-col gap-[2.5rem]">
        <Section title="Ovoz">
          <Toggle label="Ovoz" checked={settings.soundOn} onChange={(v) => update({ soundOn: v })} />
          <div className="flex min-h-tap items-center justify-between gap-6 rounded-xl2 bg-surface px-[1.8rem] py-[1rem] ring-[0.15rem] ring-line">
            <label htmlFor={volId} className="text-body font-bold">
              Ovoz balandligi: {Math.round(settings.volume * 100)}%
            </label>
            <input
              id={volId}
              type="range"
              min={0}
              max={1}
              step={0.1}
              value={settings.volume}
              onChange={(e) => update({ volume: Number(e.target.value) })}
              onPointerUp={() => playSfx('chime')}
              className="h-[2rem] w-[40%] accent-[rgb(var(--primary))]"
            />
          </div>
        </Section>

        <Section title="Ko‘rinish va rejimlar">
          <Toggle
            label="Sokin rejim"
            hint="Sakrash va tebranishlar o‘chadi, ovozlar yumshoqroq. Charchagan yoki tez hayajonlanadigan sinf uchun."
            checked={settings.calmMode}
            onChange={(v) => update({ calmMode: v })}
          />
          <Toggle
            label="Yengil rejim"
            hint="Kuchsiz kompyuter uchun: barcha animatsiya, soya va effektlar o‘chadi."
            checked={settings.lightMode}
            onChange={(v) => update({ lightMode: v })}
          />
          <Toggle label="Yuqori kontrast" hint="Oq fon, qora matn — yorug‘ xonada proyektor uchun." checked={settings.highContrast} onChange={(v) => update({ highContrast: v })} />
          <div className="flex flex-col gap-[0.8rem] rounded-xl2 bg-surface px-[1.8rem] py-[1rem] ring-[0.15rem] ring-line">
            <label htmlFor={fontId} className="text-body font-bold">
              Matn o‘lchami: {Math.round(settings.fontScale * 100)}%
            </label>
            <div className="flex items-center gap-[1rem]">
              <span className="text-meta font-bold" aria-hidden="true">
                A
              </span>
              <input
                id={fontId}
                type="range"
                min={0.8}
                max={1.6}
                step={0.1}
                value={settings.fontScale}
                onChange={(e) => update({ fontScale: Number(e.target.value) })}
                className="h-[2rem] flex-1 accent-[rgb(var(--primary))]"
              />
              <span className="text-lead font-black" aria-hidden="true">
                A
              </span>
            </div>
            <p className="text-body">Namuna: Bo‘tajon o‘nta olmani sanadi.</p>
          </div>
        </Section>

        <Section title="Dars">
          <Toggle label="Darsni to‘liq ekranda boshlash" checked={settings.autoFullscreen} onChange={(v) => update({ autoFullscreen: v })} />
        </Section>

        <Section title="Sinf">
          <div className="rounded-xl2 bg-surface p-[1.8rem] ring-[0.15rem] ring-line">
            <ClassList />
          </div>
        </Section>

        <Section title="Ma’lumot">
          <dl className="grid grid-cols-[auto_1fr] gap-x-[2rem] gap-y-[0.6rem] text-meta">
            <dt className="font-bold text-ink-soft">Ilova versiyasi</dt>
            <dd className="font-extrabold">{__APP_VERSION__}</dd>
            <dt className="font-bold text-ink-soft">Saqlash</dt>
            <dd className="font-extrabold">{storageAvailable() ? 'Faqat shu kompyuterda, hech qayerga yuborilmaydi' : 'Mavjud emas — sozlamalar saqlanmaydi'}</dd>
          </dl>
          <div className="flex flex-wrap items-center gap-[1rem]">
            {confirm ? (
              <>
                <span className="text-meta font-bold">Sozlamalar, sevimlilar va oxirgi dars o‘chsinmi? (Sinf ro‘yxati qoladi)</span>
                <BigButton
                  size="md"
                  variant="accent"
                  onClick={() => {
                    resetAll();
                    setConfirm(false);
                  }}
                >
                  Ha, tozalash
                </BigButton>
                <BigButton size="md" variant="ghost" onClick={() => setConfirm(false)}>
                  Yo‘q
                </BigButton>
              </>
            ) : (
              <BigButton size="md" variant="ghost" onClick={() => setConfirm(true)}>
                Sozlamalarni tiklash
              </BigButton>
            )}
          </div>
        </Section>
      </div>
    </Layout>
  );
}
