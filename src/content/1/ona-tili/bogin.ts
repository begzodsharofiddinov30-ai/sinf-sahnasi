// QORALAMA: o'qituvchi tekshirib chiqishi kerak
import { defineLesson } from '../../schema';

export default defineLesson({
  notes: {
    goal: 'O‘quvchilar so‘zlarni bo‘g‘inlarga ajratadi va bo‘g‘inlarni sanaydi.',
    questions: [
      '“Ki-tob” so‘zida nechta bo‘g‘in bor?',
      'Qarsak chalib, ismingizni bo‘g‘inlarga ajrating.',
      'Har bir bo‘g‘inda nechta unli bo‘ladi?',
    ],
    minutes: 15,
  },
  scenes: [
    {
      id: 'qarsak',
      type: 'explain',
      title: 'Bo‘g‘in nima?',
      steps: [
        { text: 'So‘zni qarsak bilan aytamiz: **ki** — **tob**.', visual: { kind: 'tiles', items: ['ki', 'tob'] } },
        { text: '“Kitob” so‘zida **2** ta bo‘g‘in.', visual: { kind: 'picture', item: 'kitob' } },
        { text: 'Har bir bo‘g‘inda **bitta unli** bor.', visual: { kind: 'word', text: 'kitob', highlight: [1, 3] }, replace: true },
      ],
      hint: 'Har bir bo‘g‘inga bitta qarsak chaling. Iyakni qo‘l ustiga qo‘yib ham sanash mumkin.',
    },
    {
      id: 'olma',
      type: 'choose-answer',
      question: '“Olma” so‘zida nechta bo‘g‘in?',
      visual: { kind: 'picture', item: 'olma' },
      options: [{ label: '1' }, { label: '2' }, { label: '3' }],
      correct: 1,
      retryHint: 'Qarsak chalib ayting: ol — ma.',
      explanation: 'ol — ma: 2 ta bo‘g‘in.',
    },
    {
      id: 'bir-ikki',
      type: 'sort-groups',
      prompt: 'So‘zlarni bo‘g‘in soniga qarab ajrating',
      groups: [{ label: '1 bo‘g‘in' }, { label: '2 bo‘g‘in' }],
      items: [
        { label: 'gul', visual: { kind: 'picture', item: 'gul' }, group: 0 },
        { label: 'baliq', visual: { kind: 'picture', item: 'baliq' }, group: 1 },
        { label: 'qush', visual: { kind: 'picture', item: 'qush' }, group: 0 },
        { label: 'bulut', visual: { kind: 'picture', item: 'bulut' }, group: 1 },
        { label: 'qor', visual: { kind: 'picture', item: 'qor' }, group: 0 },
        { label: 'quyosh', visual: { kind: 'picture', item: 'quyosh' }, group: 1 },
      ],
      retryHint: 'So‘zni qarsak bilan ayting va qarsaklarni sanang.',
    },
    {
      id: 'bulut',
      type: 'build-word',
      prompt: 'Bo‘g‘inlardan so‘z yasang',
      word: 'bulut',
      tiles: ['bu', 'lut'],
      extra: ['ta'],
      picture: 'bulut',
    },
    {
      id: 'mashina',
      type: 'build-word',
      prompt: 'Uch bo‘g‘inli so‘z',
      word: 'mashina',
      tiles: ['ma', 'shi', 'na'],
      picture: 'mashina',
      hint: '“shi” bo‘g‘inida “sh” bitta tovush.',
    },
    {
      id: 'nechta',
      type: 'choose-answer',
      question: '“Mashina” so‘zida nechta bo‘g‘in?',
      options: [{ label: '2' }, { label: '3' }, { label: '4' }],
      correct: 1,
      timerSec: 20,
    },
    {
      id: 'daraxt',
      type: 'build-word',
      prompt: 'So‘zni yig‘ing',
      word: 'daraxt',
      tiles: ['da', 'raxt'],
      extra: ['ra'],
      picture: 'daraxt',
    },
    {
      id: 'yakun',
      type: 'recap',
      title: 'Bugun o‘rgandik',
      points: ['So‘z **bo‘g‘in**larga bo‘linadi.', 'Har bir bo‘g‘inda **bitta unli** bor.', 'Bo‘g‘inlarni **qarsak** bilan sanaymiz.'],
    },
  ],
});
