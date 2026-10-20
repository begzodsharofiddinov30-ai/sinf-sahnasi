// QORALAMA: o'qituvchi tekshirib chiqishi kerak
import { defineLesson } from '../../schema';

export default defineLesson({
  notes: {
    goal: 'O‘quvchilar tovushni eshitish, harfni esa ko‘rish va yozishni farqlaydi.',
    questions: [
      'Tovushni qanday bilamiz — ko‘zimiz bilanmi yoki qulog‘imiz bilan?',
      '“Olma” so‘zi qaysi tovush bilan boshlanadi?',
      'Ismingiz qaysi harf bilan boshlanadi?',
    ],
    minutes: 15,
  },
  scenes: [
    {
      id: 'farq',
      type: 'explain',
      title: 'Tovush va harf',
      steps: [
        { text: 'Biz **tovush**ni eshitamiz va aytamiz.', visual: { kind: 'mascot', mood: 'happy' } },
        { text: '**Harf**ni ko‘ramiz va yozamiz.', visual: { kind: 'tiles', items: ['O', 'o'] }, replace: true },
        { text: '“Olma” so‘zi **o** tovushi bilan boshlanadi.', visual: { kind: 'word', text: 'olma', highlight: [0] }, replace: true },
      ],
      hint: 'Bolalar “o” tovushini cho‘zib aytsin, keyin harfni havoda chizsin.',
    },
    {
      id: 'qaysi-o',
      type: 'choose-answer',
      question: 'Qaysi so‘z **o** tovushi bilan boshlanadi?',
      options: [
        { label: 'baliq', visual: { kind: 'picture', item: 'baliq' } },
        { label: 'olma', visual: { kind: 'picture', item: 'olma' } },
        { label: 'qush', visual: { kind: 'picture', item: 'qush' } },
      ],
      correct: 1,
      retryHint: 'Har bir so‘zni ovoz chiqarib ayting. Birinchi tovush qaysi?',
    },
    {
      id: 'katta-kichik',
      type: 'drag-match',
      prompt: 'Katta harfni kichik harfiga olib boring',
      pairs: [
        { item: { label: 'A' }, target: { label: 'a' } },
        { item: { label: 'B' }, target: { label: 'b' } },
        { item: { label: 'Q' }, target: { label: 'q' } },
        { item: { label: 'Sh' }, target: { label: 'sh' } },
      ],
    },
    {
      id: 'unli-undosh',
      type: 'sort-groups',
      prompt: 'Unli va undosh harflarni ajrating',
      groups: [{ label: 'Unli' }, { label: 'Undosh' }],
      items: [
        { label: 'a', group: 0 },
        { label: 'm', group: 1 },
        { label: 'o', group: 0 },
        { label: 'k', group: 1 },
        { label: 'u', group: 0 },
        { label: 'l', group: 1 },
        { label: 'i', group: 0 },
        { label: 'sh', group: 1 },
      ],
      hint: 'Unlilar cho‘zib aytiladi: a-a-a. O‘zbek tilida 6 ta unli: a, o, u, e, i, o‘.',
    },
    {
      id: 'b-tovushi',
      type: 'choose-answer',
      question: '“Baliq” so‘zi qaysi harf bilan boshlanadi?',
      visual: { kind: 'picture', item: 'baliq' },
      options: [{ label: 'B' }, { label: 'L' }, { label: 'Q' }],
      correct: 0,
    },
    {
      id: 'gul',
      type: 'build-word',
      prompt: 'Tovushlarni eshitib, harflarni qo‘ying',
      word: 'gul',
      tiles: ['g', 'u', 'l'],
      extra: ['k'],
      picture: 'gul',
    },
    {
      id: 'oxirgi',
      type: 'choose-answer',
      question: '“Kitob” so‘zi qaysi tovush bilan **tugaydi**?',
      visual: { kind: 'word', text: 'kitob' },
      options: [{ label: 'k' }, { label: 't' }, { label: 'b' }],
      correct: 2,
      retryHint: 'So‘zni sekin ayting va oxirgi tovushni tinglang.',
    },
    {
      id: 'yakun',
      type: 'recap',
      title: 'Bugun o‘rgandik',
      points: ['**Tovush**ni eshitamiz, **harf**ni ko‘ramiz.', 'Harflar **unli** va **undosh** bo‘ladi.', 'So‘zning birinchi va oxirgi tovushini topa olamiz.'],
    },
  ],
});
