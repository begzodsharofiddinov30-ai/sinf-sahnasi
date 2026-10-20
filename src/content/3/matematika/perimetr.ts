// QORALAMA: o'qituvchi tekshirib chiqishi kerak
import { defineLesson } from '../../schema';

export default defineLesson({
  notes: {
    goal: 'O‘quvchilar perimetr tushunchasini biladi va kvadrat, to‘rtburchak, uchburchak perimetrini hisoblaydi.',
    questions: [
      'Perimetr nima?',
      'Kvadratning perimetrini qanday tez topamiz?',
      'Hayotda perimetr qayerda kerak bo‘ladi?',
    ],
    minutes: 20,
  },
  scenes: [
    {
      id: 'nima',
      type: 'explain',
      title: 'Perimetr',
      steps: [
        {
          text: '**Perimetr** — shaklning barcha tomonlari **yig‘indisi**.',
          visual: { kind: 'picture', item: 'kvadrat' },
        },
        {
          text: 'Kvadrat tomoni 3 sm: 3 + 3 + 3 + 3 = **12** sm',
          visual: { kind: 'tiles', items: ['3', '+', '3', '+', '3', '+', '3', '=', '12'] },
        },
        {
          text: 'To‘rtburchak: 5 + 2 + 5 + 2 = **14** sm',
          visual: { kind: 'picture', item: 'tortburchak' },
          replace: true,
        },
      ],
      hint: 'Partaning chetini qadam bilan aylanib chiqing — bu ham perimetr.',
    },
    {
      id: 'kvadrat-4',
      type: 'choose-answer',
      question: 'Tomoni 4 sm bo‘lgan kvadratning perimetri?',
      visual: { kind: 'picture', item: 'kvadrat' },
      options: [{ label: '16 sm' }, { label: '8 sm' }, { label: '4 sm' }],
      correct: 0,
    },
    {
      id: 'uchburchak',
      type: 'choose-answer',
      question: 'Uchburchak tomonlari 3, 4 va 5 sm. Perimetri?',
      visual: { kind: 'picture', item: 'uchburchak' },
      options: [{ label: '12 sm' }, { label: '7 sm' }, { label: '60 sm' }],
      correct: 0,
    },
    {
      id: 'qanday',
      type: 'choose-answer',
      question: 'Perimetrni topish uchun nima qilamiz?',
      options: [
        { label: 'Barcha tomonlarni qo‘shamiz' },
        { label: 'Ikki tomonni ko‘paytiramiz' },
        { label: 'Bitta tomonni o‘lchaymiz' },
      ],
      correct: 0,
    },
    {
      id: 'moslash',
      type: 'drag-match',
      prompt: 'Shaklni perimetriga olib boring',
      pairs: [
        { item: { label: 'kvadrat, tomoni 2 sm' }, target: { label: '8 sm' } },
        { item: { label: 'kvadrat, tomoni 5 sm' }, target: { label: '20 sm' } },
        { item: { label: 'to‘rtburchak: 6 sm va 3 sm' }, target: { label: '18 sm' } },
      ],
    },
    {
      id: 'sakrash',
      type: 'number-line',
      prompt: 'Kvadrat tomoni 5 sm. Har tomonga bitta sakrash. Perimetr?',
      min: 0,
      max: 20,
      start: 0,
      step: 5,
      answer: 20,
    },
    {
      id: 'yakun',
      type: 'recap',
      title: 'Bugun o‘rgandik',
      points: ['Perimetr — barcha tomonlar **yig‘indisi**.', 'Kvadrat: tomon × **4**.'],
    },
  ],
});
