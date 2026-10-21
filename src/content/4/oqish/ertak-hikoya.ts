// QORALAMA: o'qituvchi tekshirib chiqishi kerak
import { defineLesson } from '../../schema';

export default defineLesson({
  notes: {
    goal: 'O‘quvchilar ertak va hikoya janrlarining farqli belgilarini aniqlaydi.',
    questions: [
      'Ertakda qanday voqealar bo‘ladi?',
      'Hikoya qanday voqealarni aytadi?',
      'Sevimli ertak va hikoyangizni ayting.',
    ],
    minutes: 20,
  },
  scenes: [
    {
      id: 'farq',
      type: 'explain',
      title: 'Farqi',
      steps: [
        {
          text: '**Ertak** — uydirma, sehrli voqealar; hayvonlar gapiradi.',
          visual: { kind: 'mascot', mood: 'cheer' },
        },
        {
          text: '**Hikoya** — hayotda bo‘lishi mumkin bo‘lgan voqealar.',
          visual: { kind: 'picture', item: 'kitob' },
          replace: true,
        },
      ],
    },
    {
      id: 'janr',
      type: 'sort-groups',
      prompt: 'Ertakmi yoki hikoyami?',
      groups: [{ label: 'Ertak' }, { label: 'Hikoya' }],
      items: [
        { label: 'Gapiruvchi tulki', group: 0 },
        { label: 'Bola maktabga bordi', group: 1 },
        { label: 'Uchar gilam', group: 0 },
        { label: 'Qiz onasiga yordam berdi', group: 1 },
        { label: 'Sehrli tayoq', group: 0 },
      ],
    },
    {
      id: 'boshlanish',
      type: 'choose-answer',
      question: '“Bir bor ekan, bir yo‘q ekan…” — qaysi janr?',
      options: [{ label: 'Ertak' }, { label: 'Hikoya' }],
      correct: 0,
    },
    {
      id: 'hikoya',
      type: 'choose-answer',
      question: '“Sardor velosipedda bog‘ga bordi.” — bu?',
      options: [{ label: 'Hikoya' }, { label: 'Ertak' }],
      correct: 0,
    },
    {
      id: 'umumiy',
      type: 'choose-answer',
      question: 'Ertak va hikoyada nima umumiy?',
      options: [{ label: 'Ikkalasida qahramon va voqea bor' }, { label: 'Ikkalasi ham she’r' }],
      correct: 0,
    },
    {
      id: 'yakun',
      type: 'recap',
      title: 'Bugun o‘rgandik',
      points: ['Ertak — **sehrli, uydirma**.', 'Hikoya — **hayotiy** voqea.'],
    },
  ],
});
