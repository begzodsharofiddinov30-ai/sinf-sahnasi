// Sozlamalar: ovoz, ko'rinish, rejimlar, sinf ro'yxati
import { useId, useState, useSyncExternalStore, type ReactNode } from 'react';
import { Layout } from '../app/Layout';
import { useSettings } from '../app/SettingsProvider';
import { formatPhone, nameError } from '../app/teacher';
import { useTeacher } from '../app/TeacherProvider';
import { BigButton, BigLink } from '../components/BigButton';
import { Icon } from '../components/Icon';
import { playSfx } from '../lib/audio';
import { cloudEnabled, getCloudStatus, loadMeta, pushNow, subscribeCloud, type CloudStatus } from '../lib/cloud';
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

const CLOUD_TEXT: Record<CloudStatus, string> = {
  synced: 'Bulutda saqlangan',
  pending: 'Yuborish kutilmoqda (internet bo‘lganda yuklanadi)',
  syncing: 'Yuklanmoqda…',
  error: 'Bulut bilan bog‘lanib bo‘lmadi',
  local: 'Faqat shu kompyuterda',
};

function CloudLine() {
  const { teacher } = useTeacher();
  const st = useSyncExternalStore(subscribeCloud, getCloudStatus);
  if (!teacher?.phone || !cloudEnabled()) return null;
  const meta = loadMeta();
  const at = meta.syncedAt ? new Date(meta.syncedAt) : null;
  return (
    <div className="flex flex-wrap items-center gap-[1rem]">
      <p className="flex-1 text-meta font-bold" aria-live="polite">
        {CLOUD_TEXT[st]}
        {st === 'synced' && at ? ` · ${String(at.getHours()).padStart(2, '0')}:${String(at.getMinutes()).padStart(2, '0')}` : ''}
      </p>
      <BigButton
        size="md"
        variant="secondary"
        disabled={st === 'syncing'}
        onClick={() => void pushNow({ firstName: teacher.firstName, lastName: teacher.lastName, phone: teacher.phone! })}
      >
        Hozir sinxronlash
      </BigButton>
    </div>
  );
}

function TeacherSection() {
  const { teacher, register, signOut } = useTeacher();
  const [edit, setEdit] = useState(false);
  const [first, setFirst] = useState(teacher?.firstName ?? '');
  const [last, setLast] = useState(teacher?.lastName ?? '');
  const [confirmOut, setConfirmOut] = useState(false);
  const err = nameError(first, 'Ism') ?? nameError(last, 'Familiya');
  if (!teacher) return null;
  const input = 'min-h-tap rounded-xl2 border-[0.15rem] border-line bg-surface px-[1rem] text-body font-bold outline-none focus:border-primary';
  return (
    <Section title="O‘qituvchi">
      <div className="flex flex-col gap-[1rem] rounded-xl2 bg-surface p-[1.8rem] ring-[0.15rem] ring-line">
        {edit ? (
          <>
            <div className="flex flex-wrap gap-[1rem]">
              <input aria-label="Ism" value={first} onChange={(e) => setFirst(e.target.value)} className={input} />
              <input aria-label="Familiya" value={last} onChange={(e) => setLast(e.target.value)} className={input} />
            </div>
            {err && <p className="text-meta font-bold text-warn">{err}</p>}
            <div className="flex gap-[1rem]">
              <BigButton
                size="md"
                disabled={!!err}
                onClick={() => {
                  void register(first, last);
                  setEdit(false);
                }}
              >
                Saqlash
              </BigButton>
              <BigButton size="md" variant="ghost" onClick={() => setEdit(false)}>
                Bekor qilish
              </BigButton>
            </div>
          </>
        ) : (
          <div className="flex flex-wrap items-center gap-[1rem]">
            <p className="flex-1 text-lead font-black">
              {teacher.firstName} {teacher.lastName}
              {teacher.phone && <span className="block text-body font-bold text-ink-soft">{formatPhone(teacher.phone)}</span>}
            </p>
            {/* Bulutdagi hisobda ism — tanish kaliti, shuning uchun bu yerda o'zgartirilmaydi */}
            {!teacher.phone && (
              <BigButton size="md" variant="secondary" onClick={() => setEdit(true)}>
                Ismni o‘zgartirish
              </BigButton>
            )}
          </div>
        )}
        <CloudLine />
        {confirmOut ? (
          <div className="flex flex-wrap items-center gap-[1rem]">
            <span className="text-meta font-bold">
              {teacher.phone
                ? 'Chiqilsinmi? Ma’lumotlaringiz bulutda qoladi va shu kompyuterdan o‘chiriladi.'
                : 'Chiqilsinmi? Ismingiz o‘chadi (sinf ro‘yxati va sozlamalar qoladi).'}
            </span>
            <BigButton size="md" variant="accent" onClick={() => void signOut()}>
              Ha, chiqish
            </BigButton>
            <BigButton size="md" variant="ghost" onClick={() => setConfirmOut(false)}>
              Yo‘q
            </BigButton>
          </div>
        ) : (
          <div>
            <BigButton size="md" variant="ghost" onClick={() => setConfirmOut(true)}>
              Chiqish (boshqa o‘qituvchi uchun)
            </BigButton>
          </div>
        )}
        <p className="text-meta text-ink-soft">
          {teacher.phone && cloudEnabled()
            ? 'Ism, raqam va sinf sozlamalari bulutda saqlanadi — boshqa kompyuterda xuddi shu ism va raqam bilan kiring. Parol yo‘q.'
            : 'Ism faqat shu kompyuterda saqlanadi. Parol yo‘q, hech qayerga yuborilmaydi.'}
        </p>
      </div>
    </Section>
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
        <TeacherSection />
        <Section title="Ovoz">
          <Toggle label="Ovoz" checked={settings.soundOn} onChange={(v) => update({ soundOn: v })} />
          <Toggle
            label="Animatsiya ovozlari"
            hint="Sahna almashishi, yangi qadam, sakrash va bayram ovozlari. O‘chirsangiz, faqat javob ovozlari qoladi."
            checked={settings.animSounds}
            onChange={(v) => update({ animSounds: v })}
          />
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
