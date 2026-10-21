// QORALAMA: o'qituvchi tekshirib chiqishi kerak
import { defineLesson } from '../../schema';

export default defineLesson({
  notes: {
    goal: 'O‘quvchilar oddiy oziq zanjirlarini tuzadi va tabiatda hamma narsa bog‘liqligini tushunadi.',
    questions: ['Oziq zanjiri nima?', 'Zanjir nimadan boshlanadi?', 'Bitta halqa yo‘qolsa nima bo‘ladi?'],
    minutes: 20,
  },
  scenes: [
    {
      id: 'zanjir',
      type: 'explain',
      title: 'Oziq zanjiri',
      steps: [
        { text: 'Zanjir **o‘simlik**dan boshlanadi.', visual: { kind: 'picture', item: 'barg' } },
        {
          text: 'O‘t → **quyon** → **tulki**',
          visual: { kind: 'tiles', items: ['o‘t', '→', 'quyon', '→', 'tulki'] },
          replace: true,
        },
        {
          text: 'Bitta halqa yo‘qolsa — butun zanjir **buziladi**.',
          visual: { kind: 'mascot', mood: 'think' },
          replace: true,
        },
      ],
    },
    {
      id: 'zanjir-2',
      type: 'drag-match',
      prompt: 'Kim kimni yeydi?',
      pairs: [
        { item: { label: 'quyon', visual: { kind: 'picture', item: 'quyon' } }, target: { label: 'o‘t' } },
        { item: { label: 'tulki', visual: { kind: 'picture', item: 'tulki' } }, target: { label: 'quyon' } },
        {
          item: { label: 'qush', visual: { kind: 'picture', item: 'qush' } },
          target: { label: 'chigirtka' },
        },
      ],
    },
    {
      id: 'boshi',
      type: 'choose-answer',
      question: 'Oziq zanjiri odatda nimadan boshlanadi?',
      options: [{ label: 'O‘simlikdan' }, { label: 'Tulkidan' }, { label: 'Toshdan' }],
      correct: 0,
    },
    {
      id: 'yoqolsa',
      type: 'choose-answer',
      question: 'Agar quyonlar yo‘qolsa, tulkilarga nima bo‘ladi?',
      options: [{ label: 'Oziq kamayadi' }, { label: 'Hech narsa' }],
      correct: 0,
    },
    {
      id: 'ovqat',
      type: 'sort-groups',
      prompt: 'Nima bilan oziqlanadi?',
      groups: [{ label: 'O‘simlikxo‘r' }, { label: 'Yirtqich' }],
      items: [
        { label: 'quyon', group: 0 },
        { label: 'tulki', group: 1 },
        { label: 'sigir', group: 0 },
        { label: 'bo‘ri', group: 1 },
      ],
    },
    {
      id: 'yakun',
      type: 'recap',
      title: 'Bugun o‘rgandik',
      points: ['Oziq zanjiri: **o‘simlik → o‘txo‘r → yirtqich**.', 'Tabiatda hamma narsa **bog‘liq**.'],
    },
  ],
});
