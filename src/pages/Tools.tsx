// Asboblar sahifasi: darsdan tashqari ham foydalanish uchun
import { useState } from 'react';
import { Layout } from '../app/Layout';
import { MotionSettings } from '../app/MotionSettings';
import { ToolsPanel, type ToolTab } from '../tools/ToolsPanel';

export function ToolsPage() {
  const [tab, setTab] = useState<ToolTab>('picker');
  return (
    <Layout crumbs={[{ label: 'Asboblar' }]}>
      <h1 className="text-title font-black">Asboblar</h1>
      <div className="mt-[2rem] max-w-[70rem]">
        <MotionSettings>
          <ToolsPanel tab={tab} onTab={setTab} />
        </MotionSettings>
      </div>
    </Layout>
  );
}
