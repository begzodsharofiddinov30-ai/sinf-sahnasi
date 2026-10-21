// QORALAMA: o'qituvchi tekshirib chiqishi kerak
import { defineLesson } from '../../schema';

export default defineLesson({
  notes: {
    goal: 'O‘quvchilar egalik qo‘shimchalarini (-im, -ing, -i) to‘g‘ri qo‘llaydi.',
    questions: [
      '“Kitobim” — kimning kitobi?',
      '“Uying” so‘zida qanday qo‘shimcha bor?',
      'Egalik qo‘shimchasi nima bildiradi?',
    ],
    minutes: 15,
  },
  scenes: [
    {
      id: 'egalik',
      type: 'explain',
      title: 'Kimniki?',
      steps: [
        { text: 'Men: kitob**im**', visual: { kind: 'tiles', items: ['kitob', '+', 'im'] } },
        { text: 'Sen: kitob**ing**', visual: { kind: 'tiles', items: ['kitob', '+', 'ing'] } },
        { text: 'U: kitob**i**', visual: { kind: 'tiles', items: ['kitob', '+', 'i'] } },
      ],
    },
    {
      id: 'shaxs',
      type: 'drag-match',
      prompt: 'Olmoshni so‘zga olib boring',
      pairs: [
        { item: { label: 'men' }, target: { label: 'qalamim' } },
        { item: { label: 'sen' }, target: { label: 'qalaming' } },
        { item: { label: 'u' }, target: { label: 'qalami' } },
      ],
    },
    {
      id: 'kimniki',
      type: 'choose-answer',
      question: '“Daftaring” — kimning daftari?',
      options: [{ label: 'Sening' }, { label: 'Mening' }, { label: 'Uning' }],
      correct: 0,
    },
    {
      id: 'uyimiz',
      type: 'build-word',
      prompt: 'Yig‘ing: uyimiz (bizning uy)',
      word: 'uyimiz',
      tiles: ['uy', 'imiz'],
      extra: ['ing'],
    },
    {
      id: 'qoshimcha',
      type: 'sort-groups',
      prompt: 'Qaysi egalik?',
      groups: [{ label: '-im (men)' }, { label: '-ing (sen)' }],
      items: [
        { label: 'bog‘im', group: 0 },
        { label: 'bog‘ing', group: 1 },
        { label: 'otam', group: 0 },
        { label: 'oting', group: 1 },
      ],
    },
    {
      id: 'yakun',
      type: 'recap',
      title: 'Bugun o‘rgandik',
      points: ['Egalik qo‘shimchasi **kimniki** ekanini bildiradi.', '-im, -ing, -i, -imiz, -ingiz.'],
    },
  ],
});
