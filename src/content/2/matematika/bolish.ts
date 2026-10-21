// QORALAMA: o'qituvchi tekshirib chiqishi kerak
import { defineLesson } from '../../schema';

export default defineLesson({
  notes: {
    goal: 'O‘quvchilar bo‘lishni narsalarni teng guruhlarga taqsimlash sifatida tushunadi va : belgisini o‘qiydi.',
    questions: [
      '6 ta konfetni 2 kishiga teng bo‘lsak, har biriga nechta?',
      '“8 : 2” qanday o‘qiladi?',
      'Teng bo‘lish nima degani?',
    ],
    minutes: 20,
  },
  scenes: [
    {
      id: 'nima',
      type: 'explain',
      title: 'Bo‘lish',
      steps: [
        { text: '**6** ta nok bor.', visual: { kind: 'items', item: 'nok', count: 6 } },
        {
          text: 'Ularni **2** kishiga teng bo‘lamiz.',
          visual: { kind: 'groups', item: 'nok', groups: 2, each: 3 },
          replace: true,
        },
        {
          text: 'Har biriga **3** tadan: 6 : 2 = 3',
          visual: { kind: 'tiles', items: ['6', ':', '2', '=', '3'], highlight: [4] },
        },
      ],
      hint: 'Haqiqiy narsalarni (qalam, tayoqcha) ikki o‘quvchiga navbat bilan tarqating.',
    },
    {
      id: 'sakkiz',
      type: 'choose-answer',
      question: '8 ta olmani 2 bolaga teng bo‘lsak, har biriga nechta?',
      visual: { kind: 'groups', item: 'olma', groups: 2, each: 4 },
      options: [{ label: '4' }, { label: '6' }, { label: '2' }],
      correct: 0,
    },
    {
      id: 'olti',
      type: 'choose-answer',
      question: '6 ta yulduzni 3 guruhga teng bo‘lsak, har birida nechta?',
      visual: { kind: 'groups', item: 'yulduz', groups: 3, each: 2 },
      options: [{ label: '2' }, { label: '3' }, { label: '6' }],
      correct: 0,
    },
    {
      id: 'javob',
      type: 'drag-match',
      prompt: 'Misolni javobiga olib boring',
      pairs: [
        { item: { label: '10 : 2' }, target: { label: '5' } },
        { item: { label: '9 : 3' }, target: { label: '3' } },
        { item: { label: '8 : 4' }, target: { label: '2' } },
        { item: { label: '6 : 1' }, target: { label: '6' } },
      ],
    },
    {
      id: 'teng',
      type: 'sort-groups',
      prompt: 'Teng bo‘lindimi?',
      groups: [{ label: 'Teng' }, { label: 'Teng emas' }],
      items: [
        { label: '3 va 3', group: 0 },
        { label: '4 va 2', group: 1 },
        { label: '5 va 5', group: 0 },
        { label: '1 va 6', group: 1 },
      ],
    },
    {
      id: 'masala',
      type: 'choose-answer',
      question: '12 ta qalam 4 ta qutiga teng solindi. Har bir qutida nechta?',
      options: [{ label: '3' }, { label: '4' }, { label: '8' }],
      correct: 0,
      timerSec: 45,
    },
    {
      id: 'yakun',
      type: 'recap',
      title: 'Bugun o‘rgandik',
      points: ['Bo‘lish — **teng taqsimlash**.', '6 : 2 = 3 («6 ni 2 ga bo‘lsak, 3»)'],
    },
  ],
});
