// Ro'yxatdan o'tish: ism, familiya va telefon raqam. Parol va hisob yo'q.
import { useId, useState, type FormEvent } from 'react';
import { formatPhone, nameError, phoneError, type Teacher } from '../app/teacher';
import { useTeacher } from '../app/TeacherProvider';
import { BigButton } from '../components/BigButton';
import { MASCOT_NAME, Mascot } from '../components/Mascot';
import { cloudEnabled } from '../lib/cloud';

/** Raqamlarni "90 123 45 67" ko'rinishiga keltiradi */
function maskLocal(raw: string): string {
  const d = raw.replace(/\D/g, '').replace(/^998(?=\d{9})/, '').slice(0, 9);
  return [d.slice(0, 2), d.slice(2, 5), d.slice(5, 7), d.slice(7, 9)].filter(Boolean).join(' ');
}

export function RegisterPage({ existing, reason }: { existing?: Teacher; reason?: 'renamed' }) {
  const { register } = useTeacher();
  const cloud = cloudEnabled();
  const [first, setFirst] = useState(existing?.firstName ?? '');
  const [last, setLast] = useState(existing?.lastName ?? '');
  const [phone, setPhone] = useState(existing?.phone ? maskLocal(existing.phone) : '');
  const [agree, setAgree] = useState(false);
  const [tried, setTried] = useState(false);
  const [busy, setBusy] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const fid = useId();
  const lid = useId();
  const pid = useId();
  const cid = useId();
  const fErr = nameError(first, 'Ism');
  const lErr = nameError(last, 'Familiya');
  const pErr = cloud ? phoneError(phone) : null;
  const aErr = cloud && !agree ? 'Davom etish uchun rozilik belgisini qo‘ying' : null;

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setTried(true);
    setServerError(null);
    if (fErr || lErr || pErr || aErr || busy) return;
    setBusy(true);
    const r = await register(first, last, cloud ? phone : undefined);
    setBusy(false);
    if (!r.ok) setServerError(r.message);
  };

  const field = 'w-full rounded-xl2 border-[0.2rem] bg-surface px-[1.5rem] py-[0.7rem] text-lead font-bold outline-none focus:border-primary';
  const err = (id: string, text: string | null) =>
    tried && text ? (
      <p id={`${id}-err`} className="-mt-[0.8rem] text-meta font-bold text-warn">
        {text}
      </p>
    ) : null;

  return (
    <main className="grid min-h-[100dvh] place-items-center bg-bg px-[2rem] py-[2rem]">
      <form onSubmit={submit} noValidate className="flex w-full max-w-[56rem] flex-col gap-[1.2rem] rounded-xl3 bg-surface p-[2.5rem] ring-[0.15rem] ring-line" aria-labelledby={`${fid}-title`}>
        <div className="flex items-center gap-[1.5rem]">
          <span className="block h-[9rem] shrink-0">
            <Mascot mood="happy" className="h-full w-auto" />
          </span>
          <div>
            <h1 id={`${fid}-title`} className="text-title font-black">
              {reason === 'renamed' ? 'Ism o‘zgargan' : existing ? 'Ma’lumotni to‘ldiring' : 'Xush kelibsiz!'}
            </h1>
            <p className="text-body font-bold text-ink-soft">
              {reason === 'renamed'
                ? 'Ismingiz boshqa kompyuterda o‘zgartirilgan. Yangi ism-familiyani kiriting.'
                : existing
                  ? 'Endi boshqa kompyuterda ham kirish uchun telefon raqamingiz kerak.'
                  : `Men ${MASCOT_NAME}man. Keling, tanishamiz.`}
            </p>
          </div>
        </div>

        <label htmlFor={fid} className="text-body font-extrabold">
          Ismingiz
        </label>
        <input
          id={fid}
          value={first}
          onChange={(e) => setFirst(e.target.value)}
          autoComplete="given-name"
          autoFocus
          aria-invalid={tried && !!fErr}
          aria-describedby={tried && fErr ? `${fid}-err` : undefined}
          className={`${field} ${tried && fErr ? 'border-warn' : 'border-line'}`}
        />
        {err(fid, fErr)}

        <label htmlFor={lid} className="text-body font-extrabold">
          Familiyangiz
        </label>
        <input
          id={lid}
          value={last}
          onChange={(e) => setLast(e.target.value)}
          autoComplete="family-name"
          aria-invalid={tried && !!lErr}
          aria-describedby={tried && lErr ? `${lid}-err` : undefined}
          className={`${field} ${tried && lErr ? 'border-warn' : 'border-line'}`}
        />
        {err(lid, lErr)}

        {cloud && (
          <>
            <label htmlFor={pid} className="text-body font-extrabold">
              Telefon raqamingiz
            </label>
            <div className="flex items-stretch gap-[0.8rem]">
              <span className="grid place-items-center rounded-xl2 bg-surface-2 px-[1.2rem] text-lead font-black" aria-hidden="true">
                +998
              </span>
              <input
                id={pid}
                type="tel"
                inputMode="numeric"
                value={phone}
                onChange={(e) => setPhone(maskLocal(e.target.value))}
                placeholder="90 123 45 67"
                autoComplete="tel-national"
                aria-invalid={tried && !!pErr}
                aria-describedby={`${pid}-hint${tried && pErr ? ` ${pid}-err` : ''}`}
                className={`${field} ${tried && pErr ? 'border-warn' : 'border-line'}`}
              />
            </div>
            <p id={`${pid}-hint`} className="-mt-[0.6rem] text-meta text-ink-soft">
              Raqam faqat sizni boshqa kompyuterda tanish uchun. SMS yuborilmaydi, parol kerak emas.
            </p>
            {err(pid, pErr)}

            <label htmlFor={cid} className="flex cursor-pointer items-start gap-[1rem] text-meta font-bold">
              <input id={cid} type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} className="mt-[0.2rem] h-[2rem] w-[2rem] shrink-0 accent-[rgb(var(--primary))]" />
              <span>
                Ism, familiya va telefon raqamim hamda sinf sozlamalarim (o‘quvchilar ismlari ro‘yxati, sevimlilar) bulutda saqlanishiga roziman.
                Ularni istalgan vaqt o‘chirishni so‘rashim mumkin.
              </span>
            </label>
            {err(cid, aErr)}
          </>
        )}

        {serverError && (
          <p role="alert" className="rounded-xl2 bg-warn-soft px-[1.2rem] py-[0.8rem] text-body font-bold text-warn">
            {serverError}
          </p>
        )}

        <BigButton type="submit" size="xl" disabled={busy}>
          {busy ? 'Tekshirilmoqda…' : 'Kirish'}
        </BigButton>
        <p className="text-meta text-ink-soft">
          {cloud
            ? 'Boshqa kompyuterda xuddi shu ism, familiya va raqam bilan kirsangiz, sinf ro‘yxati va sozlamalaringiz qaytadi.'
            : 'Bu versiyada ismingiz faqat shu kompyuterda saqlanadi.'}
          {existing?.phone ? ` Joriy raqam: ${formatPhone(existing.phone)}.` : ''}
        </p>
      </form>
    </main>
  );
}
