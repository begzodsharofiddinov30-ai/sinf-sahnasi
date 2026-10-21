// QORALAMA: o'qituvchi tekshirib chiqishi kerak
import { defineLesson } from '../../schema';

export default defineLesson({
  notes: {
    goal: 'O‘quvchilar o‘zbek tilidagi 6 ta unli tovushni taniydi va so‘zdan topadi.',
    questions: ['Unli tovushni qanday aytamiz?', 'O‘zbek tilida nechta unli bor?', 'Ismingizda qaysi unlilar bor?'],
    minutes: 15,
  },
  scenes: [
    {
      id: 'unli',
      type: 'explain',
      title: 'Unlilar',
      steps: [
        { text: '**Unli** tovushlar cho‘zib aytiladi: a-a-a!', visual: { kind: 'mascot', mood: 'happy' } },
        {
          text: 'O‘zbek tilida **6 ta** unli bor.',
          visual: { kind: 'tiles', items: ['a', 'o', 'u', 'e', 'i', 'o‘'] },
          replace: true,
        },
        {
          text: '“**O**lm**a**” so‘zida 2 ta unli: o va a.',
          visual: { kind: 'word', text: 'olma', highlight: [0, 3] },
          replace: true,
        },
      ],
    },
    {
      id: 'nechta',
      type: 'choose-answer',
      question: 'O‘zbek tilida nechta unli tovush bor?',
      options: [{ label: '6' }, { label: '10' }, { label: '3' }],
      correct: 0,
    },
    {
      id: 'unli-undosh',
      type: 'sort-groups',
      prompt: 'Unlimi yoki undoshmi?',
      groups: [{ label: 'Unli' }, { label: 'Undosh' }],
      items: [
        { label: 'e', group: 0 },
        { label: 't', group: 1 },
        { label: 'o‘', group: 0 },
        { label: 'r', group: 1 },
        { label: 'i', group: 0 },
        { label: 'n', group: 1 },
      ],
    },
    {
      id: 'birinchi',
      type: 'choose-answer',
      question: '“Uzum” so‘zi qaysi unli bilan boshlanadi?',
      visual: { kind: 'picture', item: 'uzum' },
      options: [{ label: 'u' }, { label: 'o' }, { label: 'a' }],
      correct: 0,
    },
    {
      id: 'ari',
      type: 'build-word',
      prompt: 'Unlini qo‘ying: ari',
      word: 'ari',
      tiles: ['a', 'r', 'i'],
      extra: ['o'],
    },
    {
      id: 'nechta-unli',
      type: 'choose-answer',
      question: '“Kitob” so‘zida nechta unli bor?',
      visual: { kind: 'word', text: 'kitob' },
      options: [{ label: '2' }, { label: '3' }, { label: '1' }],
      correct: 0,
    },
    {
      id: 'yakun',
      type: 'recap',
      title: 'Bugun o‘rgandik',
      points: ['Unlilar: **a, o, u, e, i, o‘**.', 'Unlini **cho‘zib** aytish mumkin.'],
    },
  ],
});
