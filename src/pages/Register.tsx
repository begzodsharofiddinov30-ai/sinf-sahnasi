// Ro'yxatdan o'tish: faqat ism va familiya. Parol va hisob yo'q.
import { useId, useState, type FormEvent } from 'react';
import { nameError } from '../app/teacher';
import { useTeacher } from '../app/TeacherProvider';
import { BigButton } from '../components/BigButton';
import { MASCOT_NAME, Mascot } from '../components/Mascot';

export function RegisterPage() {
  const { register } = useTeacher();
  const [first, setFirst] = useState('');
  const [last, setLast] = useState('');
  const [tried, setTried] = useState(false);
  const fid = useId();
  const lid = useId();
  const fErr = nameError(first, 'Ism');
  const lErr = nameError(last, 'Familiya');

  const submit = (e: FormEvent) => {
    e.preventDefault();
    setTried(true);
    if (!fErr && !lErr) register(first, last);
  };

  const field = 'w-full rounded-xl2 border-[0.2rem] bg-surface px-[1.5rem] py-[0.8rem] text-lead font-bold outline-none focus:border-primary';

  return (
    <main className="grid min-h-[100dvh] place-items-center bg-bg px-[2rem] py-[2rem]">
      <form onSubmit={submit} noValidate className="flex w-full max-w-[56rem] flex-col gap-[1.5rem] rounded-xl3 bg-surface p-[2.5rem] ring-[0.15rem] ring-line" aria-labelledby={`${fid}-title`}>
        <div className="flex items-center gap-[1.5rem]">
          <span className="block h-[10rem] shrink-0">
            <Mascot mood="happy" className="h-full w-auto" />
          </span>
          <div>
            <h1 id={`${fid}-title`} className="text-title font-black">
              Xush kelibsiz!
            </h1>
            <p className="text-body font-bold text-ink-soft">Men {MASCOT_NAME}man. Keling, tanishamiz.</p>
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
        {tried && fErr && (
          <p id={`${fid}-err`} className="-mt-[1rem] text-meta font-bold text-warn">
            {fErr}
          </p>
        )}

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
        {tried && lErr && (
          <p id={`${lid}-err`} className="-mt-[1rem] text-meta font-bold text-warn">
            {lErr}
          </p>
        )}

        <BigButton type="submit" size="xl">
          Kirish
        </BigButton>
        <p className="text-meta text-ink-soft">
          Parol ham, hisob ham kerak emas. Ismingiz faqat <b>shu kompyuterda</b> saqlanadi va hech qayerga yuborilmaydi. Uni Sozlamalarda
          o‘zgartirish mumkin.
        </p>
      </form>
    </main>
  );
}
