// QORALAMA: o'qituvchi tekshirib chiqishi kerak
import { defineLesson } from '../../schema';

export default defineLesson({
  notes: {
    goal: 'O‘quvchilar sh, ch, ng harf birikmalari bitta tovushni bildirishini tushunadi va so‘zlarda topadi.',
    questions: [
      '“Shamol” so‘zida nechta tovush bor?',
      'Qaysi so‘zlarda “ch” bor?',
      '“Tong” so‘zi qaysi tovush bilan tugaydi?',
    ],
    minutes: 15,
  },
  scenes: [
    {
      id: 'birikma',
      type: 'explain',
      title: 'Ikki harf — bitta tovush',
      steps: [
        { text: '**sh**: **sh**amol, qu**sh**.', visual: { kind: 'tiles', items: ['sh'] } },
        { text: '**ch**: **ch**ana, to‘p**ch**a.', visual: { kind: 'tiles', items: ['ch'] } },
        { text: '**ng**: to**ng**, ming.', visual: { kind: 'tiles', items: ['ng'] } },
      ],
      hint: 'Bolalar “s” va “sh” ni, “n” va “ng” ni farqlab aytsin.',
    },
    {
      id: 'qaysi',
      type: 'sort-groups',
      prompt: 'Qaysi tovush bor?',
      groups: [{ label: 'sh' }, { label: 'ch' }, { label: 'ng' }],
      items: [
        { label: 'qush', group: 0 },
        { label: 'chana', group: 1 },
        { label: 'tong', group: 2 },
        { label: 'shamol', group: 0 },
        { label: 'choynak', group: 1 },
        { label: 'ming', group: 2 },
      ],
    },
    {
      id: 'qosh',
      type: 'build-word',
      prompt: 'Yig‘ing: qo‘sh',
      word: 'qo‘sh',
      tiles: ['q', 'o‘', 'sh'],
      extra: ['s'],
    },
    {
      id: 'choynak',
      type: 'build-word',
      prompt: 'Yig‘ing: choynak',
      word: 'choynak',
      tiles: ['ch', 'o', 'y', 'n', 'a', 'k'],
      picture: 'choynak',
    },
    {
      id: 'tong',
      type: 'choose-answer',
      question: '“Tong” so‘zi qaysi tovush bilan tugaydi?',
      options: [{ label: 'ng' }, { label: 'n' }, { label: 'g' }],
      correct: 0,
    },
    {
      id: 'yakun',
      type: 'recap',
      title: 'Bugun o‘rgandik',
      points: ['**sh**, **ch**, **ng** — har biri **bitta** tovush.', 'Ular ikki harf bilan yoziladi.'],
    },
  ],
});
