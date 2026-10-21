// QORALAMA: o'qituvchi tekshirib chiqishi kerak
import { defineLesson } from '../../schema';

export default defineLesson({
  notes: {
    goal: 'O‘quvchilar noma’lum ko‘paytuvchi, bo‘linuvchi va bo‘luvchili tenglamalarni yechadi.',
    questions: [
      'x × 4 = 20 da x ni qanday topamiz?',
      'x : 3 = 6 bo‘lsa, x nechaga teng?',
      'Bo‘lishni qanday tekshiramiz?',
    ],
    minutes: 25,
  },
  scenes: [
    {
      id: 'qoida',
      type: 'explain',
      title: 'Qoidalar',
      steps: [
        {
          text: 'Noma’lum ko‘paytuvchi = ko‘paytma : ma’lum ko‘paytuvchi',
          visual: { kind: 'tiles', items: ['x × 4 = 20', '→', 'x = 20 : 4 = 5'] },
        },
        {
          text: 'Noma’lum bo‘linuvchi = bo‘linma × bo‘luvchi',
          visual: { kind: 'tiles', items: ['x : 3 = 6', '→', 'x = 6 × 3 = 18'] },
          replace: true,
        },
        {
          text: 'Noma’lum bo‘luvchi = bo‘linuvchi : bo‘linma',
          visual: { kind: 'tiles', items: ['24 : x = 6', '→', 'x = 24 : 6 = 4'] },
          replace: true,
        },
      ],
    },
    {
      id: 't1',
      type: 'choose-answer',
      question: 'x × 6 = 42. x = ?',
      options: [{ label: '7' }, { label: '36' }, { label: '48' }],
      correct: 0,
    },
    {
      id: 't2',
      type: 'choose-answer',
      question: 'x : 5 = 8. x = ?',
      options: [{ label: '40' }, { label: '13' }, { label: '3' }],
      correct: 0,
    },
    {
      id: 't3',
      type: 'choose-answer',
      question: '36 : x = 9. x = ?',
      options: [{ label: '4' }, { label: '27' }, { label: '45' }],
      correct: 0,
    },
    {
      id: 'javob',
      type: 'drag-match',
      prompt: 'Tenglamani yechimiga olib boring',
      pairs: [
        { item: { label: 'x × 3 = 27' }, target: { label: 'x = 9' } },
        { item: { label: 'x : 2 = 16' }, target: { label: 'x = 32' } },
        { item: { label: '56 : x = 8' }, target: { label: 'x = 7' } },
      ],
    },
    {
      id: 'tekshir',
      type: 'choose-answer',
      question: 'x : 4 = 5 uchun x = 20. Tekshirish qaysi?',
      options: [{ label: '20 : 4 = 5' }, { label: '20 × 4 = 80' }, { label: '20 − 4 = 16' }],
      correct: 0,
    },
    {
      id: 'yakun',
      type: 'recap',
      title: 'Bugun o‘rgandik',
      points: ['Ko‘paytma : ko‘paytuvchi = **noma’lum ko‘paytuvchi**.', 'Bo‘linma × bo‘luvchi = **bo‘linuvchi**.'],
    },
  ],
});
