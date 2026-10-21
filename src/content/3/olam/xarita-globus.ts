// QORALAMA: o'qituvchi tekshirib chiqishi kerak
import { defineLesson } from '../../schema';

export default defineLesson({
  notes: {
    goal: 'O‘quvchilar globus va xaritaning farqini, xaritadagi ranglar ma’nosini biladi.',
    questions: ['Globus nima?', 'Xaritada ko‘k rang nimani bildiradi?', 'O‘zbekistonni xaritadan topa olasizmi?'],
    minutes: 15,
  },
  scenes: [
    {
      id: 'farq',
      type: 'explain',
      title: 'Globus va xarita',
      steps: [
        {
          text: '**Globus** — Yerning kichik **dumaloq** modeli.',
          visual: { kind: 'picture', item: 'sayyora' },
        },
        {
          text: '**Xarita** — Yer yuzining **tekis** tasviri.',
          visual: { kind: 'picture', item: 'qogoz' },
          replace: true,
        },
        {
          text: 'Ranglar: **ko‘k** — suv, **yashil** — tekislik, **jigarrang** — tog‘.',
          visual: { kind: 'tiles', items: ['ko‘k', 'yashil', 'jigarrang'] },
          replace: true,
        },
      ],
      hint: 'Imkon bo‘lsa, haqiqiy globus olib keling.',
    },
    {
      id: 'rang',
      type: 'drag-match',
      prompt: 'Rangni ma’nosiga olib boring',
      pairs: [
        { item: { label: 'ko‘k' }, target: { label: 'suv' } },
        { item: { label: 'yashil' }, target: { label: 'tekislik' } },
        { item: { label: 'jigarrang' }, target: { label: 'tog‘' } },
      ],
    },
    {
      id: 'shakl',
      type: 'choose-answer',
      question: 'Globus qanday shaklda?',
      options: [{ label: 'Shar (dumaloq)' }, { label: 'Kvadrat' }, { label: 'Tekis' }],
      correct: 0,
    },
    {
      id: 'qulay',
      type: 'choose-answer',
      question: 'Uzoq safarga qaysi biri qulay?',
      options: [{ label: 'Xarita (buklab olish mumkin)' }, { label: 'Katta globus' }],
      correct: 0,
    },
    {
      id: 'tepa',
      type: 'choose-answer',
      question: 'Xaritada tepa tomoni odatda qaysi tomon?',
      options: [{ label: 'Shimol' }, { label: 'Janub' }, { label: 'G‘arb' }],
      correct: 0,
    },
    {
      id: 'yakun',
      type: 'recap',
      title: 'Bugun o‘rgandik',
      points: ['**Globus** — dumaloq, **xarita** — tekis.', 'Ko‘k — **suv**, jigarrang — **tog‘**.'],
    },
  ],
});
