// QORALAMA: o'qituvchi tekshirib chiqishi kerak
import { defineLesson } from '../../schema';

export default defineLesson({
  notes: {
    goal: 'O‘quvchilar qushlarning belgilarini, qishlovchi va ko‘chmanchi qushlarni farqlaydi.',
    questions: [
      'Qushning qanday belgilari bor?',
      'Qaysi qushlar qishda ham qoladi?',
      'Qushlarga qanday yordam beramiz?',
    ],
    minutes: 15,
  },
  scenes: [
    {
      id: 'belgi',
      type: 'explain',
      title: 'Qushlar',
      steps: [
        {
          text: 'Qushlarning **pati**, **qanoti** va **tumshug‘i** bor.',
          visual: { kind: 'picture', item: 'qush' },
        },
        {
          text: '**Ko‘chmanchi** qushlar kuzda iliq yurtlarga uchib ketadi: qaldirg‘och, laylak.',
          visual: { kind: 'tiles', items: ['qaldirg‘och', 'laylak'] },
          replace: true,
        },
        {
          text: '**Qishlovchi** qushlar qishda ham qoladi: chumchuq, qarg‘a.',
          visual: { kind: 'tiles', items: ['chumchuq', 'qarg‘a'] },
          replace: true,
        },
      ],
    },
    {
      id: 'turi',
      type: 'sort-groups',
      prompt: 'Qanday qush?',
      groups: [{ label: 'Qishlovchi' }, { label: 'Ko‘chmanchi' }],
      items: [
        { label: 'chumchuq', group: 0 },
        { label: 'qaldirg‘och', group: 1 },
        { label: 'qarg‘a', group: 0 },
        { label: 'laylak', group: 1 },
      ],
    },
    {
      id: 'belgi-2',
      type: 'choose-answer',
      question: 'Qaysi biri qushda bo‘ladi?',
      options: [{ label: 'Pat va qanot' }, { label: 'Tangacha' }, { label: 'Yung va dum' }],
      correct: 0,
    },
    {
      id: 'qushlar',
      type: 'count-and-tap',
      prompt: 'Daraxtdagi qushlarni sanang',
      item: 'qush',
      count: 7,
      layout: 'scatter',
    },
    {
      id: 'yordam',
      type: 'choose-answer',
      question: 'Qishda qushlarga qanday yordam beramiz?',
      options: [{ label: 'Don sepamiz, inlar yasaymiz' }, { label: 'Qo‘rqitamiz' }],
      correct: 0,
    },
    {
      id: 'yakun',
      type: 'recap',
      title: 'Bugun o‘rgandik',
      points: ['Qushlar: **pat, qanot, tumshuq**.', 'Qishda qushlarga **yem** beramiz.'],
    },
  ],
});
