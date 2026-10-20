// Ish varag'i: darsdan avtomatik tuziladi, A4 ga chop etiladi
import { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useTeacher } from '../app/TeacherProvider';
import { BigButton } from '../components/BigButton';
import { ClockFace } from '../components/ClockFace';
import { Icon } from '../components/Icon';
import { plainText } from '../components/RichText';
import { cardLabel } from '../components/CardView';
import { findTopic } from '../content/catalog';
import { useLesson } from '../content/useLesson';
import { formatClock } from '../player/exercises';
import { buildWorksheet, type WsItem } from '../worksheet/worksheet';
import { Pic, PrintCard, PrintFrame, PrintVisual } from '../worksheet/PrintVisual';
import { NotFoundPage } from './NotFound';

function Answer({ show, children }: { show: boolean; children: string }) {
  if (!show) return null;
  return <p className="mt-[2mm] text-[11pt] font-bold italic text-[#1F7A4D]">Javob: {children}</p>;
}

function Item({ it, n, answers }: { it: WsItem; n: number; answers: boolean }) {
  const head = (text: string) => (
    <h2 className="mb-[3mm] text-[14pt] font-black">
      {n}. {plainText(text)}
    </h2>
  );
  switch (it.kind) {
    case 'count':
      return (
        <>
          {head(it.prompt)}
          <div className="flex flex-wrap items-end gap-[3mm]">
            {Array.from({ length: it.count }, (_, i) => (
              <Pic key={i} name={it.item} mm={13} />
            ))}
            <span className="ml-[6mm] text-[14pt]">Nechta? ________</span>
          </div>
          <Answer show={answers}>{String(it.count)}</Answer>
        </>
      );
    case 'choose':
      return (
        <>
          {head(it.question)}
          {it.visual && (
            <div className="mb-[3mm]">
              <PrintVisual v={it.visual} />
            </div>
          )}
          <div className="flex flex-wrap gap-[8mm]">
            {it.options.map((o, i) => (
              <span key={i} className="inline-flex items-center gap-[2mm]">
                <span className="inline-block h-[6mm] w-[6mm] rounded-full border-[0.5mm] border-black" aria-hidden="true" />
                <PrintCard c={o} />
              </span>
            ))}
          </div>
          <Answer show={answers}>{cardLabel(it.options[it.correct])}</Answer>
        </>
      );
    case 'word':
      return (
        <>
          {head(it.prompt)}
          <div className="flex flex-wrap items-center gap-[6mm]">
            {it.picture && <Pic name={it.picture} mm={22} />}
            <span className="inline-flex gap-[2mm]">
              {Array.from({ length: it.slots }, (_, i) => (
                <span key={i} className="inline-block h-[13mm] w-[13mm] border-[0.5mm] border-black" />
              ))}
            </span>
          </div>
          <p className="mt-[2mm] text-[13pt]">
            Bo‘laklar: <b className="tracking-wider">{it.letters.join('   ')}</b>
          </p>
          <Answer show={answers}>{it.answer}</Answer>
        </>
      );
    case 'match':
      return (
        <>
          {head(`${it.prompt} (chiziq bilan tutashtiring)`)}
          <div className="grid grid-cols-[1fr_30mm_1fr] items-center gap-y-[4mm]">
            {it.left.map((l, i) => (
              <div key={i} className="contents">
                <div className="flex items-center justify-end gap-[2mm]">
                  <PrintCard c={l} />
                  <span className="inline-block h-[3mm] w-[3mm] rounded-full bg-black" />
                </div>
                <span />
                <div className="flex items-center gap-[2mm]">
                  <span className="inline-block h-[3mm] w-[3mm] rounded-full bg-black" />
                  <PrintCard c={it.right[i]} />
                </div>
              </div>
            ))}
          </div>
          <Answer show={answers}>{it.left.map((l, i) => `${cardLabel(l)} — ${cardLabel(it.right[it.answer[i]])}`).join('; ')}</Answer>
        </>
      );
    case 'sort':
      return (
        <>
          {head(`${it.prompt} (to‘g‘ri ustunga yozing)`)}
          <p className="mb-[3mm] text-[13pt]">{it.items.map((c) => cardLabel(c)).join(' · ')}</p>
          <table className="w-full border-collapse text-[13pt]">
            <thead>
              <tr>
                {it.groups.map((g, i) => (
                  <th key={i} className="border-[0.4mm] border-black p-[2mm] text-left font-black">
                    {cardLabel(g)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                {it.groups.map((_, i) => (
                  <td key={i} className="h-[24mm] border-[0.4mm] border-black align-top" />
                ))}
              </tr>
            </tbody>
          </table>
          <Answer show={answers}>
            {it.groups.map((g, gi) => `${cardLabel(g)}: ${it.items.filter((_, k) => it.answer[k] === gi).map(cardLabel).join(', ')}`).join('; ')}
          </Answer>
        </>
      );
    case 'numberline': {
      const ticks = Array.from({ length: it.max - it.min + 1 }, (_, i) => it.min + i);
      const w = 170;
      const x = (n: number) => 5 + ((n - it.min) / (it.max - it.min)) * (w - 10);
      return (
        <>
          {head(it.prompt)}
          <svg viewBox={`0 0 ${w} 22`} style={{ width: `${w}mm`, height: '22mm' }} aria-label="Son o‘qi">
            <line x1="2" y1="10" x2={w - 2} y2="10" stroke="black" strokeWidth="0.6" />
            {ticks.map((n) => (
              <g key={n}>
                <line x1={x(n)} y1="7" x2={x(n)} y2="13" stroke="black" strokeWidth="0.5" />
                <text x={x(n)} y="19" fontSize="4" textAnchor="middle" fontWeight="700">
                  {n}
                </text>
              </g>
            ))}
            {it.start !== undefined && <path d={`M${x(it.start) - 2} 2 L${x(it.start) + 2} 2 L${x(it.start)} 6 Z`} fill="black" />}
          </svg>
          <p className="text-[13pt]">Javob: ________</p>
          {it.answer !== undefined && <Answer show={answers}>{String(it.answer)}</Answer>}
        </>
      );
    }
    case 'tenframe':
      return (
        <>
          {head(it.prompt)}
          <PrintFrame frames={it.frames} filled={it.prefilled} />
          <p className="mt-[2mm] text-[12pt] text-[#444]">Doiracha chizing yoki ustidan chizib qo‘ying.</p>
          {it.target !== undefined && <Answer show={answers}>{`${it.target} ta`}</Answer>}
        </>
      );
    case 'clock':
      return (
        <>
          {head(`${it.prompt} — millarni chizing`)}
          <span className="inline-block h-[40mm] w-[40mm]">
            <ClockFace time={it.time} hideHands className="h-full w-full" />
          </span>
          <Answer show={answers}>{formatClock(it.time)}</Answer>
        </>
      );
  }
}

export function WorksheetPage() {
  const { grade, subject, slug } = useParams();
  const id = `${grade}/${subject}/${slug}`;
  const topic = findTopic(id);
  const state = useLesson(topic ? id : null);
  const [answers, setAnswers] = useState(false);
  const { teacher } = useTeacher();
  const ws = useMemo(() => (state.status === 'ready' ? buildWorksheet(state.lesson) : null), [state]);

  if (!topic || state.status === 'missing') return <NotFoundPage message="Bu mavzu topilmadi." />;

  return (
    <div className="min-h-[100dvh] bg-surface-2 print:bg-white">
      <div className="no-print flex flex-wrap items-center gap-[1rem] border-b-[0.15rem] border-line bg-surface px-[2rem] py-[0.8rem]">
        <Link to={`/sinf/${id}`} className="inline-flex min-h-tap items-center gap-2 rounded-xl2 px-4 text-meta font-extrabold hover:bg-surface-2">
          <Icon name="back" /> Mavzuga qaytish
        </Link>
        <span className="flex-1" />
        <label className="inline-flex min-h-tap cursor-pointer items-center gap-3 text-meta font-bold">
          <input type="checkbox" checked={answers} onChange={(e) => setAnswers(e.target.checked)} className="h-[1.8rem] w-[1.8rem] accent-[rgb(var(--primary))]" />
          Javoblar bilan (o‘qituvchi nusxasi)
        </label>
        <BigButton size="md" onClick={() => window.print()}>
          Chop etish
        </BigButton>
      </div>

      <article className="worksheet mx-auto my-[1rem] w-[210mm] max-w-full bg-white p-[14mm] text-black shadow print:m-0 print:w-auto print:p-0 print:shadow-none">
        <header className="mb-[6mm] border-b-[0.6mm] border-black pb-[3mm]">
          <div className="flex justify-between text-[12pt]">
            <span>Ism: ______________________</span>
            <span>Sana: ____________</span>
          </div>
          <h1 className="mt-[4mm] text-[20pt] font-black">{topic.title}</h1>
          <p className="text-[11pt]">
            {topic.grade}-sinf · Ish varag‘i{answers ? ' · JAVOBLAR' : ''}
            {teacher ? ` · O‘qituvchi: ${teacher.firstName} ${teacher.lastName}` : ''}
          </p>
        </header>
        {!ws ? (
          <p className="text-[14pt]">Yuklanmoqda…</p>
        ) : ws.items.length === 0 ? (
          <p className="text-[14pt]">Bu dars uchun ish varag‘i topshiriqlari yo‘q.</p>
        ) : (
          <ol className="flex list-none flex-col gap-[7mm] p-0">
            {ws.items.map((it, i) => (
              <li key={it.id} className="ws-item">
                <Item it={it} n={i + 1} answers={answers} />
              </li>
            ))}
          </ol>
        )}
        {ws && ws.remember.length > 0 && (
          <aside className="ws-item mt-[8mm] rounded-[3mm] border-[0.5mm] border-black p-[4mm]">
            <h2 className="text-[13pt] font-black">Esda tuting</h2>
            <ul className="ml-[6mm] list-disc text-[12pt]">
              {ws.remember.map((r, i) => (
                <li key={i}>{plainText(r)}</li>
              ))}
            </ul>
          </aside>
        )}
        <p className="mt-[6mm] text-[8pt] text-[#555]">Qoralama — o‘qituvchi tekshirgan holda foydalaning.</p>
      </article>
    </div>
  );
}
