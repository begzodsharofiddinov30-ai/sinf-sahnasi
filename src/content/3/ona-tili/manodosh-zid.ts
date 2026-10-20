// QORALAMA: o'qituvchi tekshirib chiqishi kerak
import { defineLesson } from '../../schema';

export default defineLesson({
  notes: {
    goal: 'O‘quvchilar ma’nodosh va zid ma’noli so‘zlarni topadi va nutqida qo‘llaydi.',
    questions: [
      '“Tez” so‘ziga ma’nodosh so‘z toping.',
      '“Issiq” ning zid ma’nolisi qaysi?',
      'Ma’nodosh so‘zlar nutqni qanday boyitadi?',
    ],
    minutes: 15,
  },
  scenes: [
    {
      id: 'nima',
      type: 'explain',
      title: 'So‘zlar do‘stligi',
      steps: [
        {
          text: '**Ma’nodosh** so‘zlar ma’nosi yaqin: **chiroyli — go‘zal**.',
          visual: { kind: 'tiles', items: ['chiroyli', '=', 'go‘zal'] },
        },
        {
          text: '**Zid ma’noli** so‘zlar qarama-qarshi: **katta — kichik**.',
          visual: { kind: 'tiles', items: ['katta', '↔', 'kichik'] },
          replace: true,
        },
        {
          text: '**issiq — sovuq**, **kun — tun**',
          visual: { kind: 'tiles', items: ['issiq — sovuq', 'kun — tun'] },
          replace: true,
        },
      ],
    },
    {
      id: 'zid',
      type: 'drag-match',
      prompt: 'Zid ma’noli juftini toping',
      pairs: [
        { item: { label: 'katta' }, target: { label: 'kichik' } },
        { item: { label: 'issiq' }, target: { label: 'sovuq' } },
        { item: { label: 'baland' }, target: { label: 'past' } },
        { item: { label: 'kun' }, target: { label: 'tun' } },
      ],
    },
    {
      id: 'manodosh',
      type: 'drag-match',
      prompt: 'Ma’nodosh juftini toping',
      pairs: [
        { item: { label: 'chiroyli' }, target: { label: 'go‘zal' } },
        { item: { label: 'do‘st' }, target: { label: 'o‘rtoq' } },
        { item: { label: 'tez' }, target: { label: 'chaqqon' } },
      ],
    },
    {
      id: 'shirin',
      type: 'choose-answer',
      question: '«Shirin» so‘zining zid ma’nolisi?',
      options: [{ label: 'achchiq' }, { label: 'mazali' }, { label: 'qizil' }],
      correct: 0,
    },
    {
      id: 'juftlar',
      type: 'sort-groups',
      prompt: 'Qanday juftlik?',
      groups: [{ label: 'Ma’nodosh' }, { label: 'Zid ma’noli' }],
      items: [
        { label: 'yaxshi — a’lo', group: 0 },
        { label: 'oq — qora', group: 1 },
        { label: 'katta — ulkan', group: 0 },
        { label: 'kirish — chiqish', group: 1 },
        { label: 'xursand — shod', group: 0 },
        { label: 'yangi — eski', group: 1 },
      ],
    },
    {
      id: 'yakun',
      type: 'recap',
      title: 'Bugun o‘rgandik',
      points: ['**Ma’nodosh** — ma’nosi yaqin so‘zlar.', '**Zid ma’noli** — qarama-qarshi so‘zlar.'],
    },
  ],
});
