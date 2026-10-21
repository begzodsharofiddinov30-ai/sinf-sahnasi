// QORALAMA: o'qituvchi tekshirib chiqishi kerak
import { defineLesson } from '../../schema';

export default defineLesson({
  notes: {
    goal: 'O‘quvchilar atoqli va turdosh otlarni farqlaydi va atoqli otlarni bosh harf bilan yozadi.',
    questions: [
      '“Shahar” va “Toshkent” so‘zlarining farqi nima?',
      'Qaysi otlar bosh harf bilan yoziladi?',
      'Atoqli otlarga misol keltiring.',
    ],
    minutes: 15,
  },
  scenes: [
    {
      id: 'farq',
      type: 'explain',
      title: 'Atoqli va turdosh',
      steps: [
        {
          text: '**Turdosh** ot — umumiy nom: shahar, daryo, mushuk.',
          visual: { kind: 'tiles', items: ['shahar', 'daryo', 'mushuk'] },
        },
        {
          text: '**Atoqli** ot — alohida nom: Toshkent, Amudaryo, Paxmoq.',
          visual: { kind: 'tiles', items: ['Toshkent', 'Amudaryo', 'Paxmoq'] },
          replace: true,
        },
        {
          text: 'Atoqli otlar **bosh harf** bilan yoziladi.',
          visual: { kind: 'mascot', mood: 'happy' },
          replace: true,
        },
      ],
    },
    {
      id: 'turi',
      type: 'sort-groups',
      prompt: 'Atoqlimi yoki turdoshmi?',
      groups: [{ label: 'Turdosh' }, { label: 'Atoqli' }],
      items: [
        { label: 'daryo', group: 0 },
        { label: 'Sirdaryo', group: 1 },
        { label: 'shahar', group: 0 },
        { label: 'Samarqand', group: 1 },
        { label: 'qiz', group: 0 },
        { label: 'Dilnoza', group: 1 },
      ],
    },
    {
      id: 'juft',
      type: 'drag-match',
      prompt: 'Turdosh otga mos atoqli otni toping',
      pairs: [
        { item: { label: 'shahar' }, target: { label: 'Buxoro' } },
        { item: { label: 'daryo' }, target: { label: 'Amudaryo' } },
        { item: { label: 'davlat' }, target: { label: 'O‘zbekiston' } },
      ],
    },
    {
      id: 'xato',
      type: 'choose-answer',
      question: 'Qaysi so‘z xato yozilgan?',
      options: [{ label: 'samarqand' }, { label: 'Andijon' }, { label: 'Xiva' }],
      correct: 0,
    },
    {
      id: 'toshkent',
      type: 'build-word',
      prompt: 'Atoqli otni to‘g‘ri yozing',
      word: 'Toshkent',
      tiles: ['T', 'o', 'sh', 'k', 'e', 'n', 't'],
      extra: ['s'],
      retryHint: 'Atoqli ot bosh harf bilan boshlanadi.',
    },
    {
      id: 'yakun',
      type: 'recap',
      title: 'Bugun o‘rgandik',
      points: ['**Turdosh** ot — umumiy nom.', '**Atoqli** ot — alohida nom, **bosh harf** bilan.'],
    },
  ],
});
