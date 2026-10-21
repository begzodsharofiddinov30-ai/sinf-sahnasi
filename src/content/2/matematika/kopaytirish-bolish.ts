// QORALAMA: o'qituvchi tekshirib chiqishi kerak
import { defineLesson } from '../../schema';

export default defineLesson({
  notes: {
    goal: 'O‘quvchilar ko‘paytirish va bo‘lish o‘zaro bog‘liqligini tushunadi va bo‘lishni ko‘paytirish bilan tekshiradi.',
    questions: [
      '3 × 4 = 12 bo‘lsa, 12 : 3 nechaga teng?',
      'Bo‘lishni qanday tekshiramiz?',
      'Bitta rasmdan nechta misol tuzish mumkin?',
    ],
    minutes: 20,
  },
  scenes: [
    {
      id: 'dost',
      type: 'explain',
      title: 'Bir rasm — to‘rt misol',
      steps: [
        {
          text: '3 qator, har birida 4 ta yulduz.',
          visual: { kind: 'groups', item: 'yulduz', groups: 3, each: 4 },
        },
        {
          text: '3 × 4 = **12** va 4 × 3 = **12**',
          visual: { kind: 'tiles', items: ['3 × 4 = 12', '4 × 3 = 12'] },
        },
        {
          text: '12 : 3 = **4** va 12 : 4 = **3**',
          visual: { kind: 'tiles', items: ['12 : 3 = 4', '12 : 4 = 3'] },
        },
      ],
    },
    {
      id: 'tekshir',
      type: 'choose-answer',
      question: '5 × 2 = 10. Demak 10 : 2 = ?',
      options: [{ label: '5' }, { label: '2' }, { label: '10' }],
      correct: 0,
    },
    {
      id: 'teskari',
      type: 'choose-answer',
      question: 'Bo‘lishni qanday tekshiramiz?',
      options: [{ label: 'Ko‘paytirish bilan' }, { label: 'Qo‘shish bilan' }, { label: 'Tekshirib bo‘lmaydi' }],
      correct: 0,
    },
    {
      id: 'juft',
      type: 'drag-match',
      prompt: 'Ko‘paytirishni mos bo‘lishga olib boring',
      pairs: [
        { item: { label: '2 × 4 = 8' }, target: { label: '8 : 2 = 4' } },
        { item: { label: '3 × 5 = 15' }, target: { label: '15 : 3 = 5' } },
        { item: { label: '2 × 6 = 12' }, target: { label: '12 : 2 = 6' } },
      ],
    },
    {
      id: 'rasm',
      type: 'choose-answer',
      question: 'Rasmga **mos kelmaydigan** misol qaysi?',
      visual: { kind: 'groups', item: 'gul', groups: 2, each: 5 },
      options: [{ label: '2 + 5 = 7' }, { label: '2 × 5 = 10' }, { label: '10 : 2 = 5' }],
      correct: 0,
    },
    {
      id: 'yakun',
      type: 'recap',
      title: 'Bugun o‘rgandik',
      points: ['Ko‘paytirish va bo‘lish — **do‘st** amallar.', '3 × 4 = 12 → 12 : 3 = 4'],
    },
  ],
});
