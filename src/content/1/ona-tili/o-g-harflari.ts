// QORALAMA: o'qituvchi tekshirib chiqishi kerak
import { defineLesson } from '../../schema';

export default defineLesson({
  notes: {
    goal: 'O‘quvchilar o‘ va g‘ harflarini o va g dan farqlaydi va so‘zlarda to‘g‘ri yozadi.',
    questions: [
      '“Ot” va “o‘t” so‘zlarining farqi nima?',
      'g‘ harfi bor qaysi so‘zlarni bilasiz?',
      'o‘ harfini qanday yozamiz?',
    ],
    minutes: 15,
  },
  scenes: [
    {
      id: 'farq',
      type: 'explain',
      title: 'o va o‘, g va g‘',
      steps: [
        {
          text: '**ot** — hayvon, **o‘t** — olov yoki ko‘kat.',
          visual: { kind: 'tiles', items: ['ot', 'o‘t'] },
        },
        {
          text: '**gul** va **g‘oz** — boshqa-boshqa tovush.',
          visual: { kind: 'tiles', items: ['g', 'g‘'] },
          replace: true,
        },
        {
          text: 'o‘ va g‘ dagi belgi harfning **bir qismi**.',
          visual: { kind: 'tiles', items: ['o‘', 'g‘'] },
          replace: true,
        },
      ],
    },
    {
      id: 'qaysi',
      type: 'sort-groups',
      prompt: 'Qaysi harf bor?',
      groups: [{ label: 'o‘' }, { label: 'g‘' }],
      items: [
        { label: 'o‘rik', group: 0 },
        { label: 'g‘oz', group: 1 },
        { label: 'bo‘ri', group: 0 },
        { label: 'bog‘', group: 1 },
        { label: 'qo‘l', group: 0 },
        { label: 'tog‘', group: 1 },
      ],
    },
    {
      id: 'bog',
      type: 'build-word',
      prompt: 'Yig‘ing: bog‘',
      word: 'bog‘',
      tiles: ['b', 'o', 'g‘'],
      extra: ['g'],
    },
    {
      id: 'orik',
      type: 'build-word',
      prompt: 'Yig‘ing: o‘rik',
      word: 'o‘rik',
      tiles: ['o‘', 'r', 'i', 'k'],
      extra: ['o'],
    },
    {
      id: 'qaysi-soz',
      type: 'choose-answer',
      question: 'Qaysi so‘z to‘g‘ri yozilgan?',
      options: [{ label: 'qo‘l' }, { label: 'qol' }, { label: 'qo\'l‘' }],
      correct: 0,
    },
    {
      id: 'yakun',
      type: 'recap',
      title: 'Bugun o‘rgandik',
      points: ['**o‘** va **g‘** — alohida harflar.', 'ot — o‘t, gul — g‘oz: tovush boshqacha.'],
    },
  ],
});
