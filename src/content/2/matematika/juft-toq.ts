// QORALAMA: o'qituvchi tekshirib chiqishi kerak
import { defineLesson } from '../../schema';

export default defineLesson({
  notes: {
    goal: 'O‘quvchilar juft va toq sonlarni farqlaydi va ikkitalab sanaydi.',
    questions: ['Qaysi sonlar juft?', '7 nega toq son?', 'Sinfimizdagi o‘quvchilar soni juftmi yoki toqmi?'],
    minutes: 15,
  },
  scenes: [
    {
      id: 'nima',
      type: 'explain',
      title: 'Juft va toq',
      steps: [
        {
          text: '**Juft** son: juftlab bo‘lsak, ortiqcha qolmaydi. 6 — juft.',
          visual: { kind: 'groups', item: 'koptok', groups: 3, each: 2 },
        },
        {
          text: '**Toq** son: bittasi yolg‘iz qoladi. 5 — toq.',
          visual: { kind: 'items', item: 'koptok', count: 5 },
          replace: true,
        },
        {
          text: 'Juft sonlar: 2, 4, 6, 8, 10…',
          visual: { kind: 'tiles', items: ['2', '4', '6', '8', '10'] },
          replace: true,
        },
      ],
      hint: 'O‘quvchilarni juft-juft qilib turg‘azing — kimdir yolg‘iz qoladimi?',
    },
    {
      id: 'ajrat',
      type: 'sort-groups',
      prompt: 'Juftmi yoki toqmi?',
      groups: [{ label: 'Juft' }, { label: 'Toq' }],
      items: [
        { label: '4', group: 0 },
        { label: '7', group: 1 },
        { label: '10', group: 0 },
        { label: '3', group: 1 },
        { label: '8', group: 0 },
        { label: '9', group: 1 },
        { label: '12', group: 0 },
        { label: '15', group: 1 },
      ],
      retryHint: 'Oxirgi raqamga qarang: 0, 2, 4, 6, 8 bo‘lsa — juft.',
    },
    {
      id: 'toq',
      type: 'choose-answer',
      question: 'Qaysi son **toq**?',
      options: [{ label: '6' }, { label: '11' }, { label: '14' }],
      correct: 1,
    },
    {
      id: 'ikkitalab',
      type: 'number-line',
      prompt: 'Ikkitalab sakrab **14** ga yeting va uni bosing',
      min: 0,
      max: 20,
      start: 0,
      step: 2,
      answer: 14,
    },
    {
      id: 'qushlar',
      type: 'count-and-tap',
      prompt: 'Qushlarni sanang!',
      item: 'qush',
      count: 7,
      layout: 'row',
    },
    {
      id: 'yetti',
      type: 'choose-answer',
      question: '7 — qanday son?',
      visual: { kind: 'items', item: 'qush', count: 7 },
      options: [{ label: 'Toq' }, { label: 'Juft' }],
      correct: 0,
    },
    {
      id: 'yakun',
      type: 'recap',
      title: 'Bugun o‘rgandik',
      points: ['**Juft** sonlar: 0, 2, 4, 6, 8 bilan tugaydi.', '**Toq** sonlar: 1, 3, 5, 7, 9 bilan tugaydi.'],
    },
  ],
});
