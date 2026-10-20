// QORALAMA: o'qituvchi tekshirib chiqishi kerak
import { defineLesson } from '../../schema';

export default defineLesson({
  notes: {
    goal: 'O‘quvchilar gapning bosh bo‘laklari — ega va kesimni topadi va so‘roqlarini beradi.',
    questions: ['Ega qaysi so‘roqlarga javob beradi?', 'Kesim nimani bildiradi?', 'Ega va kesimdan gap tuzing.'],
    minutes: 20,
  },
  scenes: [
    {
      id: 'nima',
      type: 'explain',
      title: 'Gapning bosh bo‘laklari',
      steps: [
        {
          text: '**Ega** — gapda kim? nima? haqida gap ketyapti.',
          visual: { kind: 'mascot', mood: 'think' },
        },
        { text: '**Kesim** — ega haqida nima deyilyapti: nima qildi? qanday?' },
        {
          text: '«**Bulbul sayradi.**» Ega — bulbul, kesim — sayradi.',
          visual: { kind: 'tiles', items: ['Bulbul', 'sayradi'] },
          replace: true,
        },
      ],
    },
    {
      id: 'ega',
      type: 'choose-answer',
      question: '«Shamol esdi.» Ega qaysi?',
      options: [{ label: 'Shamol' }, { label: 'esdi' }],
      correct: 0,
    },
    {
      id: 'kesim',
      type: 'choose-answer',
      question: '«Bolalar maydonda futbol o‘ynashdi.» Kesim qaysi?',
      options: [{ label: 'o‘ynashdi' }, { label: 'Bolalar' }, { label: 'maydonda' }],
      correct: 0,
    },
    {
      id: 'ajrat',
      type: 'sort-groups',
      prompt: 'Egami yoki kesimmi?',
      groups: [{ label: 'Ega' }, { label: 'Kesim' }],
      items: [
        { label: 'Quyosh', group: 0 },
        { label: 'chiqdi', group: 1 },
        { label: 'O‘quvchilar', group: 0 },
        { label: 'yozishdi', group: 1 },
        { label: 'Daryo', group: 0 },
        { label: 'toshdi', group: 1 },
      ],
    },
    {
      id: 'gap',
      type: 'drag-match',
      prompt: 'Egaga mos kesimni topib, gap tuzing',
      pairs: [
        { item: { label: 'Qushlar' }, target: { label: 'uchib ketdi.' } },
        { item: { label: 'Gullar' }, target: { label: 'ochildi.' } },
        { item: { label: 'Qo‘ng‘iroq' }, target: { label: 'jiringladi.' } },
      ],
    },
    {
      id: 'yakun',
      type: 'recap',
      title: 'Bugun o‘rgandik',
      points: [
        '**Ega** — kim? nima?',
        '**Kesim** — nima qildi? qanday?',
        'Ega va kesim — gapning **bosh bo‘laklari**.',
      ],
    },
  ],
});
