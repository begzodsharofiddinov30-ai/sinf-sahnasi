// QORALAMA: o'qituvchi tekshirib chiqishi kerak
import { defineLesson } from '../../schema';

export default defineLesson({
  notes: {
    goal: 'O‘quvchilar ot yasovchi qo‘shimchalar yordamida yangi otlar yasaydi.',
    questions: [
      '“Kutubxona” qanday yasalgan?',
      '“Do‘stlik” so‘zidagi qo‘shimcha qaysi?',
      'Yana qanday ot yasash mumkin?',
    ],
    minutes: 20,
  },
  scenes: [
    {
      id: 'qoshimcha',
      type: 'explain',
      title: 'Ot yasaymiz',
      steps: [
        {
          text: '**-chi**: ishchi, sportchi. **-kor**: paxtakor.',
          visual: { kind: 'tiles', items: ['ish + chi', 'paxta + kor'] },
        },
        {
          text: '**-zor**: olmazor. **-lik**: do‘stlik.',
          visual: { kind: 'tiles', items: ['olma + zor', 'do‘st + lik'] },
          replace: true,
        },
        {
          text: '**-xona**: kutubxona, oshxona.',
          visual: { kind: 'tiles', items: ['kutub + xona', 'osh + xona'] },
          replace: true,
        },
      ],
    },
    {
      id: 'qoshimcha-2',
      type: 'sort-groups',
      prompt: 'Qaysi qo‘shimcha?',
      groups: [{ label: '-lik' }, { label: '-xona' }],
      items: [
        { label: 'do‘stlik', group: 0 },
        { label: 'oshxona', group: 1 },
        { label: 'yaxshilik', group: 0 },
        { label: 'kutubxona', group: 1 },
      ],
    },
    {
      id: 'dostlik',
      type: 'build-word',
      prompt: 'Yasang: do‘stlik',
      word: 'do‘stlik',
      tiles: ['do‘st', 'lik'],
      extra: ['chi'],
    },
    {
      id: 'gulzor',
      type: 'build-word',
      prompt: 'Yasang: gulzor',
      word: 'gulzor',
      tiles: ['gul', 'zor'],
      extra: ['kor'],
    },
    {
      id: 'mano',
      type: 'drag-match',
      prompt: 'So‘zni ma’nosiga olib boring',
      pairs: [
        { item: { label: 'oshxona' }, target: { label: 'ovqat pishiriladigan joy' } },
        { item: { label: 'baliqchi' }, target: { label: 'baliq tutuvchi' } },
        { item: { label: 'paxtazor' }, target: { label: 'paxta ekilgan dala' } },
      ],
    },
    {
      id: 'yakun',
      type: 'recap',
      title: 'Bugun o‘rgandik',
      points: ['Ot yasovchilar: **-chi, -kor, -zor, -lik, -xona**.', 'Qo‘shimcha **yangi ma’no** beradi.'],
    },
  ],
});
