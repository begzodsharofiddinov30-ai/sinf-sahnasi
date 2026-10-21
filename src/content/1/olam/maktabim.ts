// QORALAMA: o'qituvchi tekshirib chiqishi kerak
import { defineLesson } from '../../schema';

export default defineLesson({
  notes: {
    goal: 'O‘quvchilar maktab xonalari va maktabdagi xulq qoidalarini biladi.',
    questions: [
      'Maktabimizda qanday xonalar bor?',
      'Darsda qanday o‘tiramiz?',
      'O‘qituvchi bilan qanday salomlashamiz?',
    ],
    minutes: 15,
  },
  scenes: [
    {
      id: 'xonalar',
      type: 'explain',
      title: 'Maktab',
      steps: [
        { text: '**Sinf** xonasida o‘qiymiz.', visual: { kind: 'picture', item: 'kitob' } },
        { text: '**Kutubxona**dan kitob olamiz.' },
        { text: '**Sport zali**da o‘ynaymiz.', visual: { kind: 'picture', item: 'koptok' }, replace: true },
      ],
    },
    {
      id: 'qayerda',
      type: 'drag-match',
      prompt: 'Qayerda nima qilamiz?',
      pairs: [
        { item: { label: 'kutubxona' }, target: { label: 'kitob olamiz' } },
        { item: { label: 'sport zali' }, target: { label: 'to‘p o‘ynaymiz' } },
        { item: { label: 'oshxona' }, target: { label: 'ovqatlanamiz' } },
      ],
    },
    {
      id: 'xulq',
      type: 'sort-groups',
      prompt: 'To‘g‘ri xulqmi?',
      groups: [{ label: 'To‘g‘ri' }, { label: 'Noto‘g‘ri' }],
      items: [
        { label: 'Qo‘l ko‘tarib javob berish', group: 0 },
        { label: 'Darsda baqirish', group: 1 },
        { label: 'Salomlashish', group: 0 },
        { label: 'Partani chizish', group: 1 },
      ],
    },
    {
      id: 'salom',
      type: 'choose-answer',
      question: 'O‘qituvchi sinfga kirsa nima qilamiz?',
      options: [{ label: 'Turib salomlashamiz' }, { label: 'Gaplashaveramiz' }, { label: 'Yugurib chiqamiz' }],
      correct: 0,
    },
    {
      id: 'sumka',
      type: 'choose-answer',
      question: 'Ertaga darsga nimani olamiz?',
      options: [{ label: 'Daftar va qalam' }, { label: 'O‘yinchoq mashina' }, { label: 'Yostiq' }],
      correct: 0,
    },
    {
      id: 'yakun',
      type: 'recap',
      title: 'Bugun o‘rgandik',
      points: ['Maktabda **odobli** bo‘lamiz.', 'Har bir xonaning **o‘z vazifasi** bor.'],
    },
  ],
});
