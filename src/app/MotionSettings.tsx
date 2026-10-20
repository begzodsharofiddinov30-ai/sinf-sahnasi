// framer-motion sozlamasi: sokin/yengil rejimda harakat o'chadi
import { MotionConfig } from 'framer-motion';
import type { ReactNode } from 'react';
import { useSettings } from './SettingsProvider';

export function MotionSettings({ children }: { children: ReactNode }) {
  const { settings } = useSettings();
  return <MotionConfig reducedMotion={settings.calmMode || settings.lightMode ? 'always' : 'user'}>{children}</MotionConfig>;
}
