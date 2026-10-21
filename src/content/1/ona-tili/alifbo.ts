// QORALAMA: o'qituvchi tekshirib chiqishi kerak
import { defineLesson } from '../../schema';

export default defineLesson({
  notes: {
    goal: 'O‘quvchilar o‘zbek lotin alifbosining boshlanishini biladi va so‘zlarni birinchi harf bo‘yicha tartiblaydi.',
    questions: [
      'Alifbo qaysi harf bilan boshlanadi?',
      'Alifboda nechta harf bor?',
      'Ismlarni alifbo tartibida qanday qo‘yamiz?',
    ],
    minutes: 15,
  },
  scenes: [
    {
      id: 'alifbo',
      type: 'explain',
      title: 'Alifbo',
      steps: [
        {
          text: 'O‘zbek alifbosi **A** harfi bilan boshlanadi.',
          visual: { kind: 'tiles', items: ['A', 'B', 'D', 'E', 'F'] },
        },
        {
          text: 'Unda **29** ta harf bor (o‘, g‘, sh, ch, ng bilan).',
          visual: { kind: 'mascot', mood: 'happy' },
          replace: true,
        },
        {
          text: 'Oxirgi harflar: … **O‘, G‘, Sh, Ch**, ng.',
          visual: { kind: 'tiles', items: ['O‘', 'G‘', 'Sh', 'Ch'] },
          replace: true,
        },
      ],
      hint: 'Alifbo qo‘shig‘ini birga ayting.',
    },
    {
      id: 'keyingi',
      type: 'choose-answer',
      question: '**A** dan keyin qaysi harf keladi?',
      options: [{ label: 'B' }, { label: 'D' }, { label: 'E' }],
      correct: 0,
    },
    {
      id: 'keyingi-2',
      type: 'choose-answer',
      question: '**D** dan keyin qaysi harf keladi?',
      options: [{ label: 'E' }, { label: 'F' }, { label: 'B' }],
      correct: 0,
    },
    {
      id: 'tartib',
      type: 'drag-match',
      prompt: 'Harfni alifbodagi o‘rniga olib boring',
      pairs: [
        { item: { label: 'A' }, target: { label: '1' } },
        { item: { label: 'B' }, target: { label: '2' } },
        { item: { label: 'D' }, target: { label: '3' } },
        { item: { label: 'E' }, target: { label: '4' } },
      ],
    },
    {
      id: 'birinchi',
      type: 'choose-answer',
      question: 'Qaysi so‘z alifboda **birinchi** turadi?',
      options: [{ label: 'anor' }, { label: 'gul' }, { label: 'kitob' }],
      correct: 0,
    },
    {
      id: 'yakun',
      type: 'recap',
      title: 'Bugun o‘rgandik',
      points: ['Alifbo **A, B, D, E, F**… bilan boshlanadi.', 'So‘zlarni **birinchi harfi** bo‘yicha tartiblaymiz.'],
    },
  ],
});
