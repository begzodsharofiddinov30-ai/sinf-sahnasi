import { Layout } from '../app/Layout';
import { BigLink } from '../components/BigButton';
import { Mascot } from '../components/Mascot';

export function NotFoundPage({ message = 'Bunday sahifa topilmadi.' }: { message?: string }) {
  return (
    <Layout>
      <div className="flex flex-col items-center gap-[2rem] py-[3rem] text-center">
        <span className="block h-[14rem]">
          <Mascot mood="think" className="h-full w-auto" />
        </span>
        <p className="text-lead font-extrabold">{message}</p>
        <BigLink to="/">Bosh sahifaga</BigLink>
      </div>
    </Layout>
  );
}
