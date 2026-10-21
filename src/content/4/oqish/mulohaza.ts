// QORALAMA: o'qituvchi tekshirib chiqishi kerak
import { defineLesson } from '../../schema';

export default defineLesson({
  notes: {
    goal: 'O‘quvchilar o‘z fikrini dalil bilan asoslaydi va mulohaza matni tuzilishini biladi.',
    questions: ['Fikrni qanday asoslaymiz?', 'Dalil nima?', '“Kitob o‘qish foydali” — dalil keltiring.'],
    minutes: 20,
  },
  scenes: [
    {
      id: 'tuzilish',
      type: 'explain',
      title: 'Mulohaza',
      steps: [
        { text: '**Fikr**: Kitob o‘qish foydali.', visual: { kind: 'tiles', items: ['Fikr'] } },
        { text: '**Dalil**: Chunki u yangi bilim beradi.', visual: { kind: 'tiles', items: ['Dalil'] } },
        {
          text: '**Xulosa**: Shuning uchun har kuni o‘qiyman.',
          visual: { kind: 'tiles', items: ['Xulosa'] },
        },
      ],
    },
    {
      id: 'qism',
      type: 'drag-match',
      prompt: 'Gapni qismga olib boring',
      pairs: [
        { item: { label: 'Sport sog‘liq uchun muhim.' }, target: { label: 'Fikr' } },
        { item: { label: 'Chunki u tanani chiniqtiradi.' }, target: { label: 'Dalil' } },
        { item: { label: 'Demak, har kuni mashq qilish kerak.' }, target: { label: 'Xulosa' } },
      ],
    },
    {
      id: 'dalil',
      type: 'choose-answer',
      question: '“Daraxt ekish kerak” fikriga eng yaxshi dalil?',
      options: [
        { label: 'Chunki daraxt havoni tozalaydi' },
        { label: 'Chunki menga yoqadi' },
        { label: 'Chunki shunday' },
      ],
      correct: 0,
    },
    {
      id: 'soz',
      type: 'choose-answer',
      question: 'Dalil ko‘pincha qaysi so‘z bilan boshlanadi?',
      options: [{ label: 'Chunki' }, { label: 'Lekin' }, { label: 'Ammo' }],
      correct: 0,
    },
    {
      id: 'xulosa',
      type: 'choose-answer',
      question: 'Xulosa ko‘pincha qaysi so‘z bilan boshlanadi?',
      options: [{ label: 'Demak / shuning uchun' }, { label: 'Chunki' }, { label: 'Birinchidan' }],
      correct: 0,
    },
    {
      id: 'yakun',
      type: 'recap',
      title: 'Bugun o‘rgandik',
      points: ['Mulohaza: **fikr → dalil → xulosa**.', 'Fikrni **“chunki”** bilan asoslaymiz.'],
    },
  ],
});
