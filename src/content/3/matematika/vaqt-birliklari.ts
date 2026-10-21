// QORALAMA: o'qituvchi tekshirib chiqishi kerak
import { defineLesson } from '../../schema';

export default defineLesson({
  notes: {
    goal: 'O‘quvchilar vaqt birliklari va ular orasidagi munosabatni biladi.',
    questions: ['Bir sutkada necha soat bor?', 'Haftada necha kun?', 'Yilda necha oy?'],
    minutes: 15,
  },
  scenes: [
    {
      id: 'birlik',
      type: 'explain',
      title: 'Vaqt birliklari',
      steps: [
        { text: '1 soat = **60** daqiqa', visual: { kind: 'clock', h: 1, m: 0 } },
        {
          text: '1 sutka = **24** soat',
          visual: { kind: 'tiles', items: ['1 sutka', '=', '24 soat'] },
          replace: true,
        },
        {
          text: '1 hafta = **7** kun, 1 yil = **12** oy',
          visual: { kind: 'tiles', items: ['1 hafta = 7 kun', '1 yil = 12 oy'] },
          replace: true,
        },
      ],
    },
    {
      id: 'juft',
      type: 'drag-match',
      prompt: 'Vaqt birligini teng qiymatiga olib boring',
      pairs: [
        { item: { label: '1 soat' }, target: { label: '60 daqiqa' } },
        { item: { label: '1 sutka' }, target: { label: '24 soat' } },
        { item: { label: '1 hafta' }, target: { label: '7 kun' } },
        { item: { label: '1 yil' }, target: { label: '12 oy' } },
      ],
    },
    {
      id: 'ikki-soat',
      type: 'choose-answer',
      question: '2 soat necha daqiqa?',
      options: [{ label: '120' }, { label: '60' }, { label: '200' }],
      correct: 0,
    },
    {
      id: 'ikki-hafta',
      type: 'choose-answer',
      question: '2 hafta necha kun?',
      options: [{ label: '14' }, { label: '12' }, { label: '7' }],
      correct: 0,
    },
    {
      id: 'chorak',
      type: 'clock',
      prompt: 'Soatni **9:15** ga qo‘ying (chorak o‘tdi)',
      start: { h: 9, m: 0 },
      target: { h: 9, m: 15 },
    },
    {
      id: 'uzun',
      type: 'sort-groups',
      prompt: 'Bir soatdan uzunmi?',
      groups: [{ label: 'Bir soatdan qisqa' }, { label: 'Bir soatdan uzun' }],
      items: [
        { label: 'tish yuvish', group: 0 },
        { label: 'tungi uyqu', group: 1 },
        { label: 'qo‘l yuvish', group: 0 },
        { label: 'maktab kuni', group: 1 },
      ],
    },
    {
      id: 'yakun',
      type: 'recap',
      title: 'Bugun o‘rgandik',
      points: ['1 soat = **60** daqiqa, 1 sutka = **24** soat.', '1 hafta = **7** kun, 1 yil = **12** oy.'],
    },
  ],
});
