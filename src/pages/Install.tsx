// "Ilovani o'rnatish": Edge/Chrome'da o'rnatish va oflayn ishlatish yo'riqnomasi
import type { ReactNode } from 'react';
import { Layout } from '../app/Layout';
import { usePwa } from '../app/PwaProvider';
import { BigButton } from '../components/BigButton';

function Step({ n, children }: { n: number; children: ReactNode }) {
  return (
    <li className="flex gap-[1.2rem]">
      <span className="grid h-[3.2rem] w-[3.2rem] shrink-0 place-items-center rounded-full bg-primary text-body font-black text-on-primary">{n}</span>
      <div className="pt-[0.3rem] text-body">{children}</div>
    </li>
  );
}

export function InstallPage() {
  const { offlineReady, canInstall, install, portable, needRefresh, update } = usePwa();
  return (
    <Layout crumbs={[{ label: 'Ilovani o‘rnatish' }]}>
      <h1 className="text-title font-black">Ilovani o‘rnatish</h1>
      <p className="mt-[0.5rem] max-w-[70rem] text-body text-ink-soft">
        Bir marta uyda internet bor paytda o‘rnating — keyin maktabda internetsiz ham ish stolidagi belgidan ochiladi.
      </p>

      <div className="mt-[1.5rem] flex flex-wrap items-center gap-[1rem]">
        <span className={`rounded-full px-5 py-2 text-meta font-extrabold ${offlineReady ? 'bg-success-soft text-success' : 'bg-warn-soft text-warn'}`}>
          {portable ? 'Bu — portativ versiya (USB). O‘rnatish shart emas.' : offlineReady ? '✓ Oflayn tayyor' : 'Hali oflayn tayyor emas — sahifani ochiq qoldiring'}
        </span>
        {canInstall && (
          <BigButton size="lg" onClick={() => void install()}>
            Hozir o‘rnatish
          </BigButton>
        )}
        {needRefresh && (
          <BigButton size="lg" variant="accent" onClick={update}>
            Yangi versiyani o‘rnatish
          </BigButton>
        )}
      </div>

      <section className="mt-[2.5rem] grid max-w-[90rem] gap-[2rem] lg:grid-cols-2">
        <div className="rounded-xl3 bg-surface p-[2rem] ring-[0.15rem] ring-line">
          <h2 className="text-lead font-black">Microsoft Edge</h2>
          <ol className="mt-[1rem] flex flex-col gap-[1rem]">
            <Step n={1}>Sayt manzilini Edge’da oching (internet kerak).</Step>
            <Step n={2}>
              Yuqori o‘ng burchakdagi <b>…</b> (Sozlamalar va boshqalar) → <b>Ilovalar</b> → <b>Ushbu saytni ilova sifatida o‘rnatish</b>.
            </Step>
            <Step n={3}>
              <b>O‘rnatish</b> ni bosing. Ish stoliga belgi qo‘shishga ruxsat bering.
            </Step>
          </ol>
        </div>
        <div className="rounded-xl3 bg-surface p-[2rem] ring-[0.15rem] ring-line">
          <h2 className="text-lead font-black">Google Chrome</h2>
          <ol className="mt-[1rem] flex flex-col gap-[1rem]">
            <Step n={1}>Sayt manzilini Chrome’da oching (internet kerak).</Step>
            <Step n={2}>
              Manzil satridagi <b>o‘rnatish</b> belgisini (monitor va strelka) yoki <b>⋮</b> → <b>Saqlash va ulashish</b> → <b>O‘rnatish…</b> ni bosing.
            </Step>
            <Step n={3}>
              <b>O‘rnatish</b> ni tasdiqlang. Ilova alohida oynada ochiladi.
            </Step>
          </ol>
        </div>
      </section>

      <section className="mt-[2.5rem] max-w-[90rem] rounded-xl3 bg-primary-soft p-[2rem]">
        <h2 className="text-lead font-black">Yangilanishlar qanday keladi?</h2>
        <ul className="mt-[1rem] flex list-disc flex-col gap-[0.6rem] pl-[2rem] text-body">
          <li>Internet bo‘lganda ilova yangi versiyani o‘zi yuklab oladi.</li>
          <li>Tayyor bo‘lsa, yuqorida <b>“Yangi versiya — yangilash”</b> tugmasi chiqadi.</li>
          <li>
            <b>Maslahat:</b> darsdan oldin uyda ilovani ochib, yangilang va <b>Sozlamalar › Tekshiruv</b> sahifasida hammasi “✓” ekanini ko‘ring.
          </li>
          <li>Joriy versiya: {__APP_VERSION__} (Sozlamalarda ham ko‘rinadi).</li>
        </ul>
      </section>

      <section className="mt-[2.5rem] max-w-[90rem] rounded-xl3 bg-surface p-[2rem] ring-[0.15rem] ring-line">
        <h2 className="text-lead font-black">Internet umuman yo‘q bo‘lsa</h2>
        <p className="mt-[0.6rem] text-body">
          Portativ versiya — bitta <b>index.html</b> fayl. Uni USB fleshkaga yozib, ikki marta bosib oching. O‘rnatish ham, internet ham kerak emas
          (batafsil: README.md).
        </p>
      </section>
    </Layout>
  );
}
