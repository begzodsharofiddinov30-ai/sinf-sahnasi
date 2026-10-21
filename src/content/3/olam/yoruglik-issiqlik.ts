// QORALAMA: o'qituvchi tekshirib chiqishi kerak
import { defineLesson } from '../../schema';

export default defineLesson({
  notes: {
    goal: 'O‘quvchilar tabiiy va sun’iy yorug‘lik va issiqlik manbalarini farqlaydi.',
    questions: [
      'Eng katta yorug‘lik manbai qaysi?',
      'Qaysi manbani odam yaratgan?',
      'Issiqlik bilan ehtiyot bo‘lish qoidalari?',
    ],
    minutes: 15,
  },
  scenes: [
    {
      id: 'manba',
      type: 'explain',
      title: 'Manbalar',
      steps: [
        { text: '**Tabiiy** manba: Quyosh, olov.', visual: { kind: 'picture', item: 'quyosh' } },
        {
          text: '**Sun’iy** manba: chiroq, pechka.',
          visual: { kind: 'mascot', mood: 'think' },
          replace: true,
        },
      ],
    },
    {
      id: 'tur',
      type: 'sort-groups',
      prompt: 'Tabiiymi yoki sun’iymi?',
      groups: [{ label: 'Tabiiy' }, { label: 'Sun’iy' }],
      items: [
        { label: 'Quyosh', group: 0 },
        { label: 'elektr chiroq', group: 1 },
        { label: 'chaqmoq', group: 0 },
        { label: 'fonar', group: 1 },
      ],
    },
    {
      id: 'eng',
      type: 'choose-answer',
      question: 'Yerdagi eng katta yorug‘lik va issiqlik manbai?',
      options: [{ label: 'Quyosh' }, { label: 'Chiroq' }, { label: 'Oy' }],
      correct: 0,
    },
    {
      id: 'oy',
      type: 'choose-answer',
      question: 'Oy o‘zi nur sochadimi?',
      options: [{ label: 'Yo‘q, Quyosh nurini qaytaradi' }, { label: 'Ha' }],
      correct: 0,
    },
    {
      id: 'soya',
      type: 'choose-answer',
      question: 'Soya qachon paydo bo‘ladi?',
      options: [{ label: 'Narsa yorug‘likni to‘sganda' }, { label: 'Qorong‘ida' }],
      correct: 0,
    },
    {
      id: 'yakun',
      type: 'recap',
      title: 'Bugun o‘rgandik',
      points: ['Manbalar: **tabiiy** va **sun’iy**.', 'Quyosh — eng katta manba.'],
    },
  ],
});
