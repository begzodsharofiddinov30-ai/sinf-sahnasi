// QORALAMA: o'qituvchi tekshirib chiqishi kerak
import { defineLesson } from '../../schema';

export default defineLesson({
  notes: {
    goal: 'O‘quvchilar ko‘p xonali sonlarni ustun usulida o‘tish bilan qo‘shadi va ayiradi.',
    questions: ['Ustun usulida qayerdan boshlaymiz?', '10 dan oshsa nima qilamiz?', 'Ayirishni qanday tekshiramiz?'],
    minutes: 25,
  },
  scenes: [
    {
      id: 'ustun',
      type: 'explain',
      title: 'Ustun usuli',
      steps: [
        {
          text: 'Xonalarni **tagma-tag** yozamiz: birlar tagida birlar.',
          visual: { kind: 'tiles', items: ['1 568', '+', '2 357'] },
        },
        {
          text: 'Birlar: 8 + 7 = 15 → **5** yozamiz, **1** o‘nlik dilga.',
          visual: { kind: 'tiles', items: ['…5'] },
        },
        {
          text: 'O‘nlar: 6 + 5 + 1 = 12 → **2**, 1 dilga. Yuzlar: 5 + 3 + 1 = **9**.',
          visual: { kind: 'tiles', items: ['…925'] },
        },
        {
          text: 'Javob: **3 925**',
          visual: { kind: 'tiles', items: ['1 568', '+', '2 357', '=', '3 925'], highlight: [4] },
          replace: true,
        },
      ],
    },
    {
      id: 'q1',
      type: 'choose-answer',
      question: '2 345 + 1 432 = ?',
      options: [{ label: '3 777' }, { label: '3 677' }, { label: '4 777' }],
      correct: 0,
    },
    {
      id: 'q2',
      type: 'choose-answer',
      question: '4 608 + 1 395 = ?',
      options: [{ label: '6 003' }, { label: '5 903' }, { label: '6 103' }],
      correct: 0,
      retryHint: 'Har bir xonada dilga olingan birni unutmang.',
    },
    {
      id: 'a1',
      type: 'choose-answer',
      question: '5 000 − 1 250 = ?',
      options: [{ label: '3 750' }, { label: '4 250' }, { label: '3 850' }],
      correct: 0,
    },
    {
      id: 'javob',
      type: 'drag-match',
      prompt: 'Misolni javobiga olib boring',
      pairs: [
        { item: { label: '1 200 + 800' }, target: { label: '2 000' } },
        { item: { label: '3 500 − 1 500' }, target: { label: '2 000' } },
        { item: { label: '999 + 1' }, target: { label: '1 000' } },
      ],
    },
    {
      id: 'tekshir',
      type: 'choose-answer',
      question: '7 250 − 3 100 = 4 150. Qanday tekshiramiz?',
      options: [{ label: '4 150 + 3 100 = 7 250' }, { label: '4 150 − 3 100' }, { label: '7 250 + 3 100' }],
      correct: 0,
    },
    {
      id: 'yakun',
      type: 'recap',
      title: 'Bugun o‘rgandik',
      points: [
        'Xonalarni **tagma-tag** yozamiz.',
        '10 dan oshsa — **dilga olamiz**.',
        'Ayirishni **qo‘shish** bilan tekshiramiz.',
      ],
    },
  ],
});
