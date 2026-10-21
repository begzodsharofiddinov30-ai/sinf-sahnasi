// QORALAMA: o'qituvchi tekshirib chiqishi kerak
import { defineLesson } from '../../schema';

export default defineLesson({
  notes: {
    goal: 'O‘quvchilar jarangli va jarangsiz undosh juftlarini farqlaydi.',
    questions: [
      'b va p ni aytganda tomog‘ingizda nima sezasiz?',
      'd ning jarangsiz jufti qaysi?',
      'Qaysi so‘zlarda adashish mumkin?',
    ],
    minutes: 15,
  },
  scenes: [
    {
      id: 'juft',
      type: 'explain',
      title: 'Juft undoshlar',
      steps: [
        {
          text: 'Kaftni tomoqqa qo‘ying: **b** aytganda titraydi — **jarangli**.',
          visual: { kind: 'mascot', mood: 'think' },
        },
        {
          text: '**p** aytganda titramaydi — **jarangsiz**.',
          visual: { kind: 'tiles', items: ['b', '—', 'p'] },
        },
        {
          text: 'Juftlar: b–p, d–t, g–k, z–s, v–f, j–sh',
          visual: { kind: 'tiles', items: ['b–p', 'd–t', 'g–k', 'z–s', 'v–f', 'j–sh'] },
          replace: true,
        },
      ],
    },
    {
      id: 'juftlar',
      type: 'drag-match',
      prompt: 'Jarangli undoshning jarangsiz juftini toping',
      pairs: [
        { item: { label: 'b' }, target: { label: 'p' } },
        { item: { label: 'd' }, target: { label: 't' } },
        { item: { label: 'g' }, target: { label: 'k' } },
        { item: { label: 'z' }, target: { label: 's' } },
      ],
    },
    {
      id: 'qaysi',
      type: 'sort-groups',
      prompt: 'Jaranglimi yoki jarangsizmi?',
      groups: [{ label: 'Jarangli' }, { label: 'Jarangsiz' }],
      items: [
        { label: 'b', group: 0 },
        { label: 't', group: 1 },
        { label: 'z', group: 0 },
        { label: 'k', group: 1 },
        { label: 'd', group: 0 },
        { label: 's', group: 1 },
      ],
    },
    {
      id: 'kitob',
      type: 'choose-answer',
      question: '“Kitob” so‘zining oxirida qaysi harf yoziladi?',
      visual: { kind: 'picture', item: 'kitob' },
      options: [{ label: 'b' }, { label: 'p' }],
      correct: 0,
    },
    {
      id: 'juft-2',
      type: 'choose-answer',
      question: '“g” ning jufti qaysi?',
      options: [{ label: 'k' }, { label: 't' }, { label: 's' }],
      correct: 0,
    },
    {
      id: 'yakun',
      type: 'recap',
      title: 'Bugun o‘rgandik',
      points: ['Jarangli: **b, d, g, z, v, j**.', 'Jarangsiz juftlari: **p, t, k, s, f, sh**.'],
    },
  ],
});
