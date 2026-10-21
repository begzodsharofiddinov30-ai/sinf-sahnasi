// QORALAMA: o'qituvchi tekshirib chiqishi kerak
import { defineLesson } from '../../schema';

export default defineLesson({
  notes: {
    goal: 'O‘quvchilar qoldiqli bo‘lishni bajaradi va qoldiq bo‘luvchidan kichik bo‘lishini biladi.',
    questions: [
      '7 ta olmani 2 kishiga bo‘lsak, nechta ortadi?',
      'Qoldiq nima?',
      'Qoldiq bo‘luvchidan katta bo‘lishi mumkinmi?',
    ],
    minutes: 20,
  },
  scenes: [
    {
      id: 'qoldiq',
      type: 'explain',
      title: 'Qoldiq',
      steps: [
        {
          text: '**7** ta olmani **2** kishiga bo‘lamiz.',
          visual: { kind: 'items', item: 'olma', count: 7 },
        },
        {
          text: 'Har biriga **3** tadan, **1** ta ortib qoladi.',
          visual: { kind: 'groups', item: 'olma', groups: 2, each: 3 },
          replace: true,
        },
        { text: '7 : 2 = 3 (qoldiq **1**)', visual: { kind: 'tiles', items: ['7 : 2 = 3', 'qoldiq 1'] } },
      ],
      hint: 'Qoldiq har doim bo‘luvchidan kichik.',
    },
    {
      id: 'tokqiz',
      type: 'choose-answer',
      question: '9 : 4 = 2, qoldiq nechta?',
      options: [{ label: '1' }, { label: '2' }, { label: '0' }],
      correct: 0,
    },
    {
      id: 'onbir',
      type: 'choose-answer',
      question: '11 : 3 = ?',
      options: [{ label: '3 (qoldiq 2)' }, { label: '4 (qoldiq 1)' }, { label: '3 (qoldiq 1)' }],
      correct: 0,
    },
    {
      id: 'qoida',
      type: 'choose-answer',
      question: '5 ga bo‘lganda qoldiq qanday bo‘lishi mumkin?',
      options: [{ label: '0, 1, 2, 3 yoki 4' }, { label: '5 yoki 6' }, { label: 'Istalgan son' }],
      correct: 0,
    },
    {
      id: 'javob',
      type: 'drag-match',
      prompt: 'Misolni javobiga olib boring',
      pairs: [
        { item: { label: '10 : 3' }, target: { label: '3 (qoldiq 1)' } },
        { item: { label: '13 : 5' }, target: { label: '2 (qoldiq 3)' } },
        { item: { label: '8 : 3' }, target: { label: '2 (qoldiq 2)' } },
      ],
    },
    {
      id: 'yakun',
      type: 'recap',
      title: 'Bugun o‘rgandik',
      points: ['Teng bo‘linmasa — **qoldiq** qoladi.', 'Qoldiq **bo‘luvchidan kichik**.'],
    },
  ],
});
