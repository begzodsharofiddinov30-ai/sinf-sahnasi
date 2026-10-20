// QORALAMA: o'qituvchi tekshirib chiqishi kerak
import { defineLesson } from '../../schema';

export default defineLesson({
  notes: {
    goal: 'O‘quvchilar ertakning boshlanma, voqea va yakun qismlarini ajratadi va ertakdan saboq chiqaradi.',
    questions: ['Ertaklar qanday boshlanadi?', 'Ertakdagi qiyinchilik nima edi?', 'Ertakdan qanday saboq oldingiz?'],
    minutes: 20,
  },
  scenes: [
    {
      id: 'qismlar',
      type: 'explain',
      title: 'Ertak qanday tuzilgan?',
      steps: [
        { text: '**Boshlanma**: «Bir bor ekan, bir yo‘q ekan…»', visual: { kind: 'mascot', mood: 'happy' } },
        {
          text: '**Voqea**: qahramon qiyinchilikka uchraydi.',
          visual: { kind: 'mascot', mood: 'think' },
          replace: true,
        },
        {
          text: '**Yakun**: yaxshilik g‘alaba qiladi.',
          visual: { kind: 'mascot', mood: 'cheer' },
          replace: true,
        },
      ],
    },
    {
      id: 'tulki-quyon',
      type: 'story',
      title: 'Dangasa tulki va mehnatkash quyon',
      pages: [
        {
          text: 'Bir bor ekan, bir yo‘q ekan, o‘rmonda **quyon** va **tulki** yashar ekan.',
          visual: { kind: 'picture', item: 'quyon' },
        },
        {
          text: 'Kuzda quyon qish uchun **sabzi** yig‘ibdi, tulki esa faqat **o‘ynabdi**.',
          visual: { kind: 'picture', item: 'tulki' },
        },
        {
          text: 'Qish kelibdi. Tulki och qolib, quyonning eshigini qoqibdi.',
          visual: { kind: 'picture', item: 'qor' },
        },
        {
          text: 'Quyon tulkini mehmon qilibdi. Tulki: «Endi men ham **mehnat** qilaman», — debdi.',
          visual: { kind: 'mascot', mood: 'happy' },
        },
      ],
      hint: 'Bu ertak shu dastur uchun yozilgan (asl matn).',
    },
    {
      id: 'qism',
      type: 'drag-match',
      prompt: 'Qismni ertakdagi joyiga olib boring',
      pairs: [
        { item: { label: 'Boshlanma' }, target: { label: 'Bir bor ekan, bir yo‘q ekan…' } },
        { item: { label: 'Voqea' }, target: { label: 'Tulki och qoldi' } },
        { item: { label: 'Yakun' }, target: { label: 'Tulki mehnat qilishga va’da berdi' } },
      ],
    },
    {
      id: 'saboq',
      type: 'choose-answer',
      question: 'Ertakdan qanday saboq olamiz?',
      options: [
        { label: 'Mehnat qilish kerak' },
        { label: 'Faqat o‘ynash kerak' },
        { label: 'Yolg‘on gapirish kerak' },
      ],
      correct: 0,
    },
    {
      id: 'mehnatkash',
      type: 'choose-answer',
      question: 'Qaysi qahramon mehnatkash?',
      options: [
        { label: 'Quyon', visual: { kind: 'picture', item: 'quyon' } },
        { label: 'Tulki', visual: { kind: 'picture', item: 'tulki' } },
      ],
      correct: 0,
    },
    {
      id: 'boshlanish',
      type: 'choose-answer',
      question: 'O‘zbek ertaklari ko‘pincha qanday boshlanadi?',
      options: [{ label: 'Bir bor ekan, bir yo‘q ekan…' }, { label: 'Yaxshi qoling!' }, { label: 'Tamom.' }],
      correct: 0,
    },
    {
      id: 'yakun',
      type: 'recap',
      title: 'Bugun o‘rgandik',
      points: ['Ertak: **boshlanma**, **voqea**, **yakun**.', 'Ertakdan **saboq** olamiz.'],
    },
  ],
});
