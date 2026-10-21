// QORALAMA: o'qituvchi tekshirib chiqishi kerak
import { defineLesson } from '../../schema';

export default defineLesson({
  notes: {
    goal: 'O‘quvchilar qavsli va qavssiz ifodalarda amallar tartibini to‘g‘ri bajaradi.',
    questions: [
      '2 + 3 × 4 da avval qaysi amal bajariladi?',
      'Qavs nima uchun kerak?',
      '(2 + 3) × 4 ning javobi nechaga teng?',
    ],
    minutes: 20,
  },
  scenes: [
    {
      id: 'qoida',
      type: 'explain',
      title: 'Tartib',
      steps: [
        { text: '**1.** Avval **qavs** ichidagi amal.', visual: { kind: 'tiles', items: ['( )'] } },
        { text: '**2.** Keyin **×** va **:**', visual: { kind: 'tiles', items: ['×', ':'] } },
        { text: '**3.** Oxirida **+** va **−**', visual: { kind: 'tiles', items: ['+', '−'] } },
        {
          text: '2 + 3 × 4 = 2 + 12 = **14**',
          visual: { kind: 'tiles', items: ['2 + 3 × 4', '=', '14'] },
          replace: true,
        },
      ],
    },
    {
      id: 'qavssiz',
      type: 'choose-answer',
      question: '2 + 3 × 4 = ?',
      options: [{ label: '14' }, { label: '20' }, { label: '24' }],
      correct: 0,
      retryHint: 'Avval ko‘paytiring: 3 × 4.',
    },
    {
      id: 'qavsli',
      type: 'choose-answer',
      question: '(2 + 3) × 4 = ?',
      options: [{ label: '20' }, { label: '14' }, { label: '9' }],
      correct: 0,
    },
    {
      id: 'birinchi',
      type: 'choose-answer',
      question: '10 − 6 : 2 da avval qaysi amal?',
      options: [{ label: 'Bo‘lish' }, { label: 'Ayirish' }],
      correct: 0,
    },
    {
      id: 'javob',
      type: 'drag-match',
      prompt: 'Ifodani javobiga olib boring',
      pairs: [
        { item: { label: '5 + 2 × 3' }, target: { label: '11' } },
        { item: { label: '(5 + 2) × 3' }, target: { label: '21' } },
        { item: { label: '20 − 4 × 4' }, target: { label: '4' } },
      ],
    },
    {
      id: 'yakun',
      type: 'recap',
      title: 'Bugun o‘rgandik',
      points: ['Tartib: **qavs** → **× :** → **+ −**.', '2 + 3 × 4 = **14**, (2 + 3) × 4 = **20**.'],
    },
  ],
});
