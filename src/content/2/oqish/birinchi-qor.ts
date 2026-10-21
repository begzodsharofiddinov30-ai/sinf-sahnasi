// QORALAMA: o'qituvchi tekshirib chiqishi kerak
import { defineLesson } from '../../schema';

export default defineLesson({
  notes: {
    goal: 'O‘quvchilar hikoyani o‘qib, tabiat tasvirini topadi va o‘z kuzatishini aytadi.',
    questions: ['Birinchi qor qachon yog‘di?', 'Bolalar nima qilishdi?', 'Siz birinchi qorda nima qilasiz?'],
    minutes: 15,
  },
  scenes: [
    {
      id: 'hikoya',
      type: 'story',
      title: 'Birinchi qor',
      pages: [
        {
          text: 'Ertalab Sardor derazadan qaradi — hamma yoq **oppoq**!',
          visual: { kind: 'picture', item: 'qor' },
        },
        { text: 'Daraxtlar **oq po‘stin** kiyganday edi.', visual: { kind: 'picture', item: 'daraxt' } },
        { text: 'Bolalar hovlida **qor odam** yasashdi.', visual: { kind: 'mascot', mood: 'cheer' } },
        { text: 'Sardor qushlar uchun **don** sepib qo‘ydi.', visual: { kind: 'picture', item: 'qush' } },
      ],
      hint: 'Asl hikoya. “Oq po‘stin” — tasviriy ifoda ekanini tushuntiring.',
    },
    {
      id: 'fasl',
      type: 'choose-answer',
      question: 'Hikoya qaysi fasl haqida?',
      options: [{ label: 'Qish' }, { label: 'Yoz' }, { label: 'Bahor' }],
      correct: 0,
    },
    {
      id: 'tasvir',
      type: 'choose-answer',
      question: '“Daraxtlar oq po‘stin kiyganday” — bu nima degani?',
      options: [
        { label: 'Daraxtlarni qor qopladi' },
        { label: 'Daraxtlarga kiyim kiygizishdi' },
        { label: 'Daraxtlar oqardi' },
      ],
      correct: 0,
    },
    {
      id: 'yaxshilik',
      type: 'choose-answer',
      question: 'Sardor qanday yaxshilik qildi?',
      options: [{ label: 'Qushlarga don sepdi' }, { label: 'Qor otdi' }, { label: 'Uxladi' }],
      correct: 0,
    },
    {
      id: 'bormi',
      type: 'sort-groups',
      prompt: 'Hikoyada bormi?',
      groups: [{ label: 'Bor' }, { label: 'Yo‘q' }],
      items: [
        { label: 'qor odam', group: 0 },
        { label: 'qushlar', group: 0 },
        { label: 'gul', group: 1 },
        { label: 'daraxtlar', group: 0 },
        { label: 'daryo', group: 1 },
      ],
    },
    {
      id: 'yakun',
      type: 'recap',
      title: 'Bugun o‘rgandik',
      points: ['Hikoyada **tasviriy** so‘zlar bor.', 'Qishda qushlarga **g‘amxo‘rlik** qilamiz.'],
    },
  ],
});
