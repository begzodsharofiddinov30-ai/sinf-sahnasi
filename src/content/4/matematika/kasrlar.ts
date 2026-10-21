// QORALAMA: o'qituvchi tekshirib chiqishi kerak
import { defineLesson } from '../../schema';

export default defineLesson({
  notes: {
    goal: 'O‘quvchilar oddiy kasr, surat va maxraj tushunchalarini biladi va sonning qismini topadi.',
    questions: ['3/4 da surat qaysi?', 'Maxraj nimani ko‘rsatadi?', '8 ning 3/4 qismi nechaga teng?'],
    minutes: 25,
  },
  scenes: [
    {
      id: 'kasr',
      type: 'explain',
      title: 'Kasr',
      steps: [
        {
          text: '**3/4** — butunni 4 ga bo‘lib, 3 qismini oldik.',
          visual: { kind: 'tiles', items: ['3', '/', '4'] },
        },
        {
          text: '**Maxraj** (pastda) — nechta teng qismga bo‘lingan.',
          visual: { kind: 'tiles', items: ['4 — maxraj'] },
        },
        {
          text: '**Surat** (tepada) — nechta qism olingan.',
          visual: { kind: 'tiles', items: ['3 — surat'] },
        },
      ],
    },
    {
      id: 'surat',
      type: 'choose-answer',
      question: '2/5 kasrda surat qaysi?',
      options: [{ label: '2' }, { label: '5' }],
      correct: 0,
    },
    {
      id: 'qism',
      type: 'choose-answer',
      question: '8 ning 1/4 qismi?',
      visual: { kind: 'groups', item: 'olma', groups: 4, each: 2 },
      options: [{ label: '2' }, { label: '4' }, { label: '32' }],
      correct: 0,
    },
    {
      id: 'qism2',
      type: 'choose-answer',
      question: '8 ning 3/4 qismi?',
      options: [{ label: '6' }, { label: '3' }, { label: '24' }],
      correct: 0,
      explanation: '8 : 4 = 2, 2 × 3 = 6.',
    },
    {
      id: 'katta',
      type: 'choose-answer',
      question: 'Qaysi biri katta?',
      options: [{ label: '1/2' }, { label: '1/4' }],
      correct: 0,
      retryHint: 'Pitsani 2 ga yoki 4 ga bo‘lsak, qaysi bo‘lak katta?',
    },
    {
      id: 'nom',
      type: 'drag-match',
      prompt: 'Kasrni nomiga olib boring',
      pairs: [
        { item: { label: '1/2' }, target: { label: 'yarim' } },
        { item: { label: '1/4' }, target: { label: 'chorak' } },
        { item: { label: '3/4' }, target: { label: 'to‘rtdan uch' } },
      ],
    },
    {
      id: 'yakun',
      type: 'recap',
      title: 'Bugun o‘rgandik',
      points: ['Kasr: **surat / maxraj**.', 'Sonning qismini topish: **maxrajga bo‘lib, suratga ko‘paytiramiz**.'],
    },
  ],
});
