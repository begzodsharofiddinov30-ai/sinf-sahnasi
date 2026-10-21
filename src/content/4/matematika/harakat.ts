// QORALAMA: o'qituvchi tekshirib chiqishi kerak
import { defineLesson } from '../../schema';

export default defineLesson({
  notes: {
    goal: 'O‘quvchilar tezlik, vaqt va masofa orasidagi bog‘lanishni biladi va masalalar yechadi.',
    questions: ['Tezlik nima?', 'Masofani qanday topamiz?', 'Vaqtni qanday topamiz?'],
    minutes: 25,
  },
  scenes: [
    {
      id: 'formula',
      type: 'explain',
      title: 'Uch kattalik',
      steps: [
        { text: '**Masofa = tezlik × vaqt**', visual: { kind: 'tiles', items: ['s', '=', 'v', '×', 't'] } },
        {
          text: 'Mashina soatiga 60 km yurdi, 3 soat: 60 × 3 = **180 km**',
          visual: { kind: 'tiles', items: ['60 × 3 = 180 km'] },
          replace: true,
        },
        {
          text: '**Tezlik = masofa : vaqt**, **vaqt = masofa : tezlik**',
          visual: { kind: 'tiles', items: ['v = s : t', 't = s : v'] },
          replace: true,
        },
      ],
    },
    {
      id: 'masofa',
      type: 'choose-answer',
      question: 'Velosipedchi soatiga 15 km, 2 soat yurdi. Masofa?',
      options: [{ label: '30 km' }, { label: '17 km' }, { label: '13 km' }],
      correct: 0,
    },
    {
      id: 'tezlik',
      type: 'choose-answer',
      question: 'Poyezd 4 soatda 200 km yurdi. Tezligi?',
      options: [{ label: '50 km/soat' }, { label: '800 km/soat' }, { label: '204 km/soat' }],
      correct: 0,
    },
    {
      id: 'vaqt',
      type: 'choose-answer',
      question: '120 km yo‘lni soatiga 40 km tezlikda necha soatda bosib o‘tadi?',
      options: [{ label: '3 soat' }, { label: '80 soat' }, { label: '4 soat' }],
      correct: 0,
    },
    {
      id: 'formula-2',
      type: 'drag-match',
      prompt: 'Nimani topish kerak bo‘lsa, qanday amal?',
      pairs: [
        { item: { label: 'masofa' }, target: { label: 'tezlik × vaqt' } },
        { item: { label: 'tezlik' }, target: { label: 'masofa : vaqt' } },
        { item: { label: 'vaqt' }, target: { label: 'masofa : tezlik' } },
      ],
    },
    {
      id: 'yakun',
      type: 'recap',
      title: 'Bugun o‘rgandik',
      points: ['**s = v × t**', 'Tezlik — bir soatda bosib o‘tilgan **masofa**.'],
    },
  ],
});
