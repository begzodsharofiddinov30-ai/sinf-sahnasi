// QORALAMA: o'qituvchi tekshirib chiqishi kerak
import { defineLesson } from '../../schema';

export default defineLesson({
  notes: {
    goal: 'O‘quvchilar 4 va 5 ga ko‘paytirish jadvalini teng guruhlar va sakrab sanash orqali o‘rganadi.',
    questions: ['5 × 4 ni qanday tez topamiz?', 'Beshtalab sanab ko‘ring.', '4 × 5 va 5 × 4 ning javobi bir xilmi?'],
    minutes: 20,
  },
  scenes: [
    {
      id: 'beshlab',
      type: 'explain',
      title: '4 × 5',
      steps: [
        {
          text: '4 ta savatda **5 tadan** olma.',
          visual: { kind: 'groups', item: 'olma', groups: 4, each: 5 },
        },
        {
          text: 'Beshtalab sanaymiz: 5, 10, 15, **20**.',
          visual: { kind: 'tiles', items: ['5', '10', '15', '20'], highlight: [3] },
        },
        {
          text: '4 × 5 = **20**',
          visual: { kind: 'tiles', items: ['4', '×', '5', '=', '20'], highlight: [4] },
          replace: true,
        },
      ],
    },
    {
      id: 'besh-uch',
      type: 'number-line',
      prompt: '5 × 3 = ? Beshtalab sakrang',
      min: 0,
      max: 20,
      start: 0,
      step: 5,
      answer: 15,
    },
    {
      id: 'jadval',
      type: 'drag-match',
      prompt: 'Misolni javobiga olib boring',
      pairs: [
        { item: { label: '4 × 3' }, target: { label: '12' } },
        { item: { label: '5 × 6' }, target: { label: '30' } },
        { item: { label: '4 × 7' }, target: { label: '28' } },
        { item: { label: '5 × 9' }, target: { label: '45' } },
      ],
    },
    {
      id: 'tort-sakkiz',
      type: 'choose-answer',
      question: '4 × 8 = ?',
      options: [{ label: '32' }, { label: '36' }, { label: '12' }],
      correct: 0,
      retryHint: '4 × 4 = 16. Ikki marta 16 nechchi?',
    },
    {
      id: 'rasm',
      type: 'choose-answer',
      question: 'Rasmga qaysi misol mos?',
      visual: { kind: 'groups', item: 'yulduz', groups: 5, each: 4 },
      options: [{ label: '5 × 4' }, { label: '5 + 4' }, { label: '4 × 4' }],
      correct: 0,
    },
    {
      id: 'barmoq',
      type: 'choose-answer',
      question: 'Bir qo‘lda 5 ta barmoq. 6 ta qo‘lda nechta barmoq bor?',
      options: [{ label: '30' }, { label: '11' }, { label: '25' }],
      correct: 0,
      timerSec: 30,
    },
    {
      id: 'yakun',
      type: 'recap',
      title: 'Bugun o‘rgandik',
      points: ['4 × 5 = **20**', 'Beshtalab sanash: 5, 10, 15, 20…', 'O‘rin almashsa, javob **o‘zgarmaydi**.'],
    },
  ],
});
