// QORALAMA: o'qituvchi tekshirib chiqishi kerak
import { defineLesson } from '../../schema';

export default defineLesson({
  notes: {
    goal: 'O‘quvchilar son so‘z turkumini taniydi, sanoq va tartib sonlarni farqlaydi.',
    questions: ['Son qaysi so‘roqlarga javob beradi?', '“Beshinchi” qanday son?', 'Gapdan sonni toping.'],
    minutes: 15,
  },
  scenes: [
    {
      id: 'son',
      type: 'explain',
      title: 'Son',
      steps: [
        { text: '**Son** — miqdor yoki tartibni bildiradi.', visual: { kind: 'mascot', mood: 'think' } },
        {
          text: '**Nechta?** — uchta, beshta (sanoq son).',
          visual: { kind: 'tiles', items: ['uchta', 'beshta'] },
        },
        {
          text: '**Nechanchi?** — uchinchi, beshinchi (tartib son).',
          visual: { kind: 'tiles', items: ['uchinchi', 'beshinchi'] },
        },
      ],
    },
    {
      id: 'turi',
      type: 'sort-groups',
      prompt: 'Qanday son?',
      groups: [{ label: 'Nechta?' }, { label: 'Nechanchi?' }],
      items: [
        { label: 'ikki', group: 0 },
        { label: 'ikkinchi', group: 1 },
        { label: 'o‘n', group: 0 },
        { label: 'o‘ninchi', group: 1 },
        { label: 'to‘rt', group: 0 },
        { label: 'birinchi', group: 1 },
      ],
    },
    {
      id: 'gapda',
      type: 'choose-answer',
      question: '«Bog‘da yetti tup olma bor.» Sonni toping.',
      options: [{ label: 'yetti' }, { label: 'olma' }, { label: 'bog‘da' }],
      correct: 0,
    },
    {
      id: 'qaysi',
      type: 'choose-answer',
      question: 'Qaysi so‘z son?',
      options: [{ label: 'to‘qqiz' }, { label: 'to‘qidi' }, { label: 'to‘p' }],
      correct: 0,
    },
    {
      id: 'raqam',
      type: 'drag-match',
      prompt: 'So‘zni raqamga olib boring',
      pairs: [
        { item: { label: 'olti' }, target: { label: '6' } },
        { item: { label: 'sakkiz' }, target: { label: '8' } },
        { item: { label: 'o‘n ikki' }, target: { label: '12' } },
      ],
    },
    {
      id: 'yakun',
      type: 'recap',
      title: 'Bugun o‘rgandik',
      points: ['Son: **nechta?** **nechanchi?**', 'Sanoq son va **tartib** son.'],
    },
  ],
});
