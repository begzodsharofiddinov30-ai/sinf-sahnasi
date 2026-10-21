// QORALAMA: o'qituvchi tekshirib chiqishi kerak
import { defineLesson } from '../../schema';

export default defineLesson({
  notes: {
    goal: 'O‘quvchilar undosh tovushlarni unlilardan farqlaydi va so‘zning boshidagi undoshni topadi.',
    questions: [
      'Undosh tovushni cho‘zib aytish mumkinmi?',
      '“Mushuk” qaysi tovush bilan boshlanadi?',
      'Ismingizning birinchi tovushi unlimi yoki undosh?',
    ],
    minutes: 15,
  },
  scenes: [
    {
      id: 'undosh',
      type: 'explain',
      title: 'Undoshlar',
      steps: [
        {
          text: '**Undosh** tovush aytilganda havo to‘siqqa uchraydi: b, m, k, t.',
          visual: { kind: 'tiles', items: ['b', 'm', 'k', 't'] },
        },
        {
          text: 'Undosh unli bilan birga **bo‘g‘in** hosil qiladi: **ma**, **ko**.',
          visual: { kind: 'tiles', items: ['m+a', 'k+o'] },
          replace: true,
        },
      ],
    },
    {
      id: 'mushuk',
      type: 'choose-answer',
      question: '“Mushuk” qaysi tovush bilan boshlanadi?',
      visual: { kind: 'picture', item: 'mushuk' },
      options: [{ label: 'm' }, { label: 'u' }, { label: 'sh' }],
      correct: 0,
    },
    {
      id: 'baliq',
      type: 'choose-answer',
      question: '“Baliq” qaysi tovush bilan boshlanadi?',
      visual: { kind: 'picture', item: 'baliq' },
      options: [{ label: 'b' }, { label: 'a' }, { label: 'l' }],
      correct: 0,
    },
    {
      id: 'ajrat',
      type: 'sort-groups',
      prompt: 'Unlimi yoki undoshmi?',
      groups: [{ label: 'Unli' }, { label: 'Undosh' }],
      items: [
        { label: 'd', group: 1 },
        { label: 'a', group: 0 },
        { label: 's', group: 1 },
        { label: 'u', group: 0 },
        { label: 'q', group: 1 },
        { label: 'i', group: 0 },
      ],
    },
    {
      id: 'rasm',
      type: 'drag-match',
      prompt: 'Rasmni birinchi tovushiga olib boring',
      pairs: [
        { item: { visual: { kind: 'picture', item: 'kitob' } }, target: { label: 'k' } },
        { item: { visual: { kind: 'picture', item: 'gul' } }, target: { label: 'g' } },
        { item: { visual: { kind: 'picture', item: 'tulki' } }, target: { label: 't' } },
      ],
    },
    {
      id: 'yakun',
      type: 'recap',
      title: 'Bugun o‘rgandik',
      points: ['Undoshlar: b, d, k, m, s, t…', 'Undosh + unli = **bo‘g‘in**.'],
    },
  ],
});
