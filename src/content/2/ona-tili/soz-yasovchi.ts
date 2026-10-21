// QORALAMA: o'qituvchi tekshirib chiqishi kerak
import { defineLesson } from '../../schema';

export default defineLesson({
  notes: {
    goal: 'O‘quvchilar -chi, -zor, -li qo‘shimchalari yordamida yangi so‘z yasaydi.',
    questions: ['“Baliqchi” qanday yasalgan?', '“Gulzor” nima?', '“Kuchli” so‘zidagi qo‘shimcha qaysi?'],
    minutes: 15,
  },
  scenes: [
    {
      id: 'qoshimcha',
      type: 'explain',
      title: 'Yangi so‘z yasaymiz',
      steps: [
        {
          text: 'baliq + **chi** = baliqchi (kasb).',
          visual: { kind: 'tiles', items: ['baliq', '+', 'chi', '=', 'baliqchi'] },
        },
        {
          text: 'gul + **zor** = gulzor (ko‘p gul o‘sgan joy).',
          visual: { kind: 'tiles', items: ['gul', '+', 'zor', '=', 'gulzor'] },
          replace: true,
        },
        {
          text: 'kuch + **li** = kuchli (belgi).',
          visual: { kind: 'tiles', items: ['kuch', '+', 'li', '=', 'kuchli'] },
          replace: true,
        },
      ],
    },
    {
      id: 'ishchi',
      type: 'build-word',
      prompt: 'Yasang: ishchi',
      word: 'ishchi',
      tiles: ['ish', 'chi'],
      extra: ['zor'],
    },
    {
      id: 'olmazor',
      type: 'build-word',
      prompt: 'Yasang: olmazor',
      word: 'olmazor',
      tiles: ['olma', 'zor'],
      extra: ['chi'],
      picture: 'olma',
    },
    {
      id: 'qoshimcha-2',
      type: 'sort-groups',
      prompt: 'Qaysi qo‘shimcha?',
      groups: [{ label: '-chi' }, { label: '-zor' }, { label: '-li' }],
      items: [
        { label: 'baliqchi', group: 0 },
        { label: 'gulzor', group: 1 },
        { label: 'aqlli', group: 2 },
        { label: 'sportchi', group: 0 },
        { label: 'olmazor', group: 1 },
        { label: 'kuchli', group: 2 },
      ],
    },
    {
      id: 'ma-no',
      type: 'choose-answer',
      question: '“Gulzor” nima degani?',
      options: [{ label: 'Gul ko‘p o‘sgan joy' }, { label: 'Gul sotuvchi' }, { label: 'Gulning rangi' }],
      correct: 0,
    },
    {
      id: 'yakun',
      type: 'recap',
      title: 'Bugun o‘rgandik',
      points: ['**-chi** — kasb: baliqchi.', '**-zor** — joy: gulzor. **-li** — belgi: kuchli.'],
    },
  ],
});
