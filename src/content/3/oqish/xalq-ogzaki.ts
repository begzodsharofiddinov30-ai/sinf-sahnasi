// QORALAMA: o'qituvchi tekshirib chiqishi kerak
import { defineLesson } from '../../schema';

export default defineLesson({
  notes: {
    goal: 'O‘quvchilar xalq og‘zaki ijodi janrlarini farqlaydi.',
    questions: ['Xalq og‘zaki ijodi nima?', 'Alla qachon aytiladi?', 'Qaysi janrlarni bilasiz?'],
    minutes: 15,
  },
  scenes: [
    {
      id: 'janr',
      type: 'explain',
      title: 'Xalq og‘zaki ijodi',
      steps: [
        {
          text: 'Xalq yaratgan va **og‘izdan og‘izga** o‘tgan asarlar.',
          visual: { kind: 'mascot', mood: 'think' },
        },
        {
          text: 'Janrlar: **ertak, maqol, topishmoq, alla, tez aytish**.',
          visual: { kind: 'tiles', items: ['ertak', 'maqol', 'topishmoq', 'alla', 'tez aytish'] },
          replace: true,
        },
      ],
    },
    {
      id: 'janr-2',
      type: 'drag-match',
      prompt: 'Namunani janriga olib boring',
      pairs: [
        { item: { label: 'Bir bor ekan, bir yo‘q ekan…' }, target: { label: 'ertak' } },
        { item: { label: 'Tomchi-tomchi ko‘l bo‘lur.' }, target: { label: 'maqol' } },
        { item: { label: 'Uzun quloq, kalta dum…' }, target: { label: 'topishmoq' } },
        { item: { label: 'Alla, bolam, alla…' }, target: { label: 'alla' } },
      ],
    },
    {
      id: 'alla',
      type: 'choose-answer',
      question: 'Alla qachon aytiladi?',
      options: [{ label: 'Bolani uxlatayotganda' }, { label: 'Bayramda' }, { label: 'Darsda' }],
      correct: 0,
    },
    {
      id: 'muallif',
      type: 'choose-answer',
      question: 'Xalq og‘zaki ijodining muallifi kim?',
      options: [{ label: 'Xalq' }, { label: 'Bitta yozuvchi' }, { label: 'Noma’lum mashina' }],
      correct: 0,
    },
    {
      id: 'janr-3',
      type: 'sort-groups',
      prompt: 'Qisqami yoki uzunmi?',
      groups: [{ label: 'Qisqa' }, { label: 'Uzunroq' }],
      items: [
        { label: 'maqol', group: 0 },
        { label: 'ertak', group: 1 },
        { label: 'topishmoq', group: 0 },
        { label: 'doston', group: 1 },
      ],
    },
    {
      id: 'yakun',
      type: 'recap',
      title: 'Bugun o‘rgandik',
      points: ['Xalq og‘zaki ijodi — **xalq** yaratgan boylik.', 'Ertak, maqol, topishmoq, alla.'],
    },
  ],
});
