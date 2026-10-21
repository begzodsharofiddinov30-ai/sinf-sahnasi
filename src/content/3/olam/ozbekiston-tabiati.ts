// QORALAMA: o'qituvchi tekshirib chiqishi kerak
import { defineLesson } from '../../schema';

export default defineLesson({
  notes: {
    goal: 'O‘quvchilar O‘zbekistonning asosiy tabiiy hududlari, daryo va cho‘llarini biladi.',
    questions: ['O‘zbekistonda qanday tog‘lar bor?', 'Eng katta daryolarimiz?', 'Qizilqum nima?'],
    minutes: 15,
  },
  scenes: [
    {
      id: 'tabiat',
      type: 'explain',
      title: 'Vatanimiz tabiati',
      steps: [
        {
          text: 'Sharqda **tog‘lar**: Tyan-Shan va Pomir-Oloy tizmalari.',
          visual: { kind: 'mascot', mood: 'happy' },
        },
        { text: 'Katta **cho‘l** — Qizilqum.', visual: { kind: 'picture', item: 'quyosh' }, replace: true },
        {
          text: 'Katta daryolar — **Amudaryo** va **Sirdaryo**.',
          visual: { kind: 'picture', item: 'suv' },
          replace: true,
        },
      ],
    },
    {
      id: 'chol',
      type: 'choose-answer',
      question: 'O‘zbekistondagi katta cho‘l?',
      options: [{ label: 'Qizilqum' }, { label: 'Sahroi Kabir' }, { label: 'Gobi' }],
      correct: 0,
    },
    {
      id: 'daryo',
      type: 'choose-answer',
      question: 'Qaysi biri O‘zbekiston daryosi?',
      options: [{ label: 'Sirdaryo' }, { label: 'Volga' }, { label: 'Dunay' }],
      correct: 0,
    },
    {
      id: 'qayerda',
      type: 'sort-groups',
      prompt: 'Qayerda ko‘p uchraydi?',
      groups: [{ label: 'Tog‘da' }, { label: 'Cho‘lda' }],
      items: [
        { label: 'archa', group: 0 },
        { label: 'saksovul', group: 1 },
        { label: 'qor qoplagan cho‘qqi', group: 0 },
        { label: 'qum barxanlari', group: 1 },
      ],
    },
    {
      id: 'orol',
      type: 'choose-answer',
      question: 'Qaysi dengiz qurib bormoqda va uni asrash kerak?',
      options: [{ label: 'Orol dengizi' }, { label: 'Qora dengiz' }],
      correct: 0,
    },
    {
      id: 'yakun',
      type: 'recap',
      title: 'Bugun o‘rgandik',
      points: ['Tog‘lar, **Qizilqum** cho‘li, **Amudaryo** va **Sirdaryo**.', 'Tabiatimizni **asraymiz**.'],
    },
  ],
});
