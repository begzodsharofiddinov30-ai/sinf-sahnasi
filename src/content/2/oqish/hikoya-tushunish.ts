// QORALAMA: o'qituvchi tekshirib chiqishi kerak
import { defineLesson } from '../../schema';

export default defineLesson({
  notes: {
    goal: 'O‘quvchilar hikoyani o‘qib, kim, qayerda, nima bo‘ldi savollariga javob beradi va voqealarni tartiblaydi.',
    questions: ['Hikoya qahramoni kim?', 'Voqea qayerda bo‘ldi?', 'Siz ham daraxt ekkanmisiz?'],
    minutes: 20,
  },
  scenes: [
    {
      id: 'bog',
      type: 'story',
      title: 'Bog‘dagi yordam',
      pages: [
        {
          text: 'Bahor kuni Malika va bobosi **bog‘**ga chiqishdi.',
          visual: { kind: 'picture', item: 'daraxt' },
        },
        { text: 'Bobosi kichkina **o‘rik** ko‘chati o‘tqazdi.', visual: { kind: 'picture', item: 'barg' } },
        { text: 'Malika ko‘chatga **suv** quydi.', visual: { kind: 'picture', item: 'suv' } },
        { text: 'Yozda daraxtda shirin **o‘riklar** pishdi.', visual: { kind: 'picture', item: 'quyosh' } },
        {
          text: 'Malika: «Bu bizning **mehnat**imiz!» — dedi va kuldi.',
          visual: { kind: 'mascot', mood: 'cheer' },
        },
      ],
      hint: 'O‘qib bo‘lgach, kitobni yopib savollar bering.',
    },
    {
      id: 'kim-bilan',
      type: 'choose-answer',
      question: 'Malika kim bilan bog‘ga chiqdi?',
      options: [{ label: 'Bobosi bilan' }, { label: 'Onasi bilan' }, { label: 'Do‘sti bilan' }],
      correct: 0,
    },
    {
      id: 'fasl',
      type: 'choose-answer',
      question: 'Ko‘chatni qaysi faslda o‘tqazishdi?',
      options: [{ label: 'Bahorda' }, { label: 'Qishda' }, { label: 'Kuzda' }],
      correct: 0,
    },
    {
      id: 'nima-qildi',
      type: 'choose-answer',
      question: 'Malika nima qildi?',
      options: [{ label: 'Ko‘chatga suv quydi' }, { label: 'Daraxtni kesdi' }, { label: 'Uxlab qoldi' }],
      correct: 0,
    },
    {
      id: 'bormi',
      type: 'sort-groups',
      prompt: 'Hikoyada bormi?',
      groups: [{ label: 'Bor' }, { label: 'Yo‘q' }],
      items: [
        { label: 'bobo', group: 0 },
        { label: 'ko‘chat', group: 0 },
        { label: 'mashina', group: 1 },
        { label: 'suv', group: 0 },
        { label: 'qor', group: 1 },
        { label: 'tulki', group: 1 },
      ],
    },
    {
      id: 'tartib',
      type: 'drag-match',
      prompt: 'Voqealarni tartib raqamiga olib boring',
      pairs: [
        { item: { label: 'Bog‘ga chiqishdi' }, target: { label: '1' } },
        { item: { label: 'Ko‘chat o‘tqazishdi' }, target: { label: '2' } },
        { item: { label: 'O‘riklar pishdi' }, target: { label: '3' } },
      ],
    },
    {
      id: 'yakun',
      type: 'recap',
      title: 'Bugun o‘rgandik',
      points: [
        'Hikoyani tushunish uchun so‘raymiz: **kim?** **qayerda?** **nima bo‘ldi?**',
        'Mehnatning **samarasi** bo‘ladi.',
      ],
    },
  ],
});
