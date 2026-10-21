// QORALAMA: o'qituvchi tekshirib chiqishi kerak
import { defineLesson } from '../../schema';

export default defineLesson({
  notes: {
    goal: 'O‘quvchilar lug‘at turlarini biladi va so‘zni alifbo tartibida topa oladi.',
    questions: ['Izohli lug‘at nima beradi?', 'So‘zni lug‘atdan qanday topamiz?', 'Imlo lug‘ati nima uchun kerak?'],
    minutes: 20,
  },
  scenes: [
    {
      id: 'turlar',
      type: 'explain',
      title: 'Lug‘atlar',
      steps: [
        {
          text: '**Izohli lug‘at** — so‘z ma’nosini tushuntiradi.',
          visual: { kind: 'picture', item: 'kitob' },
        },
        { text: '**Imlo lug‘ati** — to‘g‘ri yozilishini ko‘rsatadi.' },
        {
          text: 'So‘zlar **alifbo tartibida** joylashadi.',
          visual: { kind: 'tiles', items: ['anor', 'bog‘', 'daraxt'] },
          replace: true,
        },
      ],
    },
    {
      id: 'birinchi',
      type: 'choose-answer',
      question: 'Lug‘atda qaysi so‘z oldin keladi?',
      options: [{ label: 'bola' }, { label: 'daryo' }, { label: 'yulduz' }],
      correct: 0,
    },
    {
      id: 'ikkinchi',
      type: 'choose-answer',
      question: 'Qaysi biri oldin: “kitob” yoki “kino”?',
      options: [{ label: 'kino' }, { label: 'kitob' }],
      correct: 0,
      explanation: 'Birinchi harflar bir xil (k, i), uchinchi harf: n (kino) alifboda t (kitob) dan oldin.',
    },
    {
      id: 'lugat',
      type: 'drag-match',
      prompt: 'Ehtiyojni lug‘atga olib boring',
      pairs: [
        { item: { label: 'So‘z ma’nosini bilish' }, target: { label: 'izohli lug‘at' } },
        { item: { label: 'To‘g‘ri yozilishi' }, target: { label: 'imlo lug‘ati' } },
        { item: { label: 'Ingliz tilidagi tarjimasi' }, target: { label: 'tarjima lug‘ati' } },
      ],
    },
    {
      id: 'tartib',
      type: 'drag-match',
      prompt: 'So‘zlarni alifbo tartibiga qo‘ying',
      pairs: [
        { item: { label: 'anor' }, target: { label: '1' } },
        { item: { label: 'baliq' }, target: { label: '2' } },
        { item: { label: 'daraxt' }, target: { label: '3' } },
        { item: { label: 'ertak' }, target: { label: '4' } },
      ],
    },
    {
      id: 'yakun',
      type: 'recap',
      title: 'Bugun o‘rgandik',
      points: ['Lug‘atda so‘zlar **alifbo tartibida**.', 'Izohli — **ma’no**, imlo — **yozilish**.'],
    },
  ],
});
