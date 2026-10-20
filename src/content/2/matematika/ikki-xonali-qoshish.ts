// QORALAMA: o'qituvchi tekshirib chiqishi kerak
import { defineLesson } from '../../schema';

export default defineLesson({
  notes: {
    goal: 'O‘quvchilar ikki xonali sonlarni xonama-xona qo‘shadi (o‘tishsiz).',
    questions: [
      'Avval nimani qo‘shamiz: o‘nliklarnimi yoki birliklarni?',
      '32 + 15 ni qanday hisoblaymiz?',
      'Javobni qanday tekshirish mumkin?',
    ],
    minutes: 20,
  },
  scenes: [
    {
      id: 'usul',
      type: 'explain',
      title: '32 + 15',
      steps: [
        { text: '**32** — 3 o‘nlik va 2 birlik.', visual: { kind: 'blocks', tens: 3, ones: 2 } },
        { text: '**15** — 1 o‘nlik va 5 birlik.', visual: { kind: 'blocks', tens: 1, ones: 5 } },
        { text: 'O‘nliklar: 3 + 1 = **4**', visual: { kind: 'tiles', items: ['30', '+', '10', '=', '40'] }, replace: true },
        { text: 'Birliklar: 2 + 5 = **7**', visual: { kind: 'tiles', items: ['2', '+', '5', '=', '7'] } },
        { text: 'Javob: **47**', visual: { kind: 'blocks', tens: 4, ones: 7 }, replace: true },
      ],
      hint: 'O‘nliklar ostiga o‘nliklarni, birliklar ostiga birliklarni yozdiring.',
    },
    {
      id: 'yigirma-bir',
      type: 'choose-answer',
      question: '21 + 34 = ?',
      options: [{ label: '55' }, { label: '45' }, { label: '56' }],
      correct: 0,
      retryHint: 'Avval o‘nliklarni qo‘shing: 20 + 30.',
    },
    {
      id: 'oq-10',
      type: 'number-line',
      prompt: '23 + 10 = ? Bitta o‘nlik sakrang',
      min: 20,
      max: 40,
      start: 23,
      step: 10,
      answer: 33,
      hint: '10 qo‘shganda birliklar o‘zgarmaydi, faqat o‘nliklar bittaga oshadi.',
    },
    {
      id: 'moslash',
      type: 'drag-match',
      prompt: 'Misolni javobiga olib boring',
      pairs: [
        { item: { label: '40 + 20' }, target: { label: '60' } },
        { item: { label: '12 + 13' }, target: { label: '25' } },
        { item: { label: '51 + 6' }, target: { label: '57' } },
      ],
    },
    {
      id: 'masala',
      type: 'choose-answer',
      question: 'Javonda 24 ta kitob bor edi. Yana 12 ta keltirishdi. Hammasi nechta?',
      visual: { kind: 'picture', item: 'kitob' },
      options: [{ label: '36' }, { label: '34' }, { label: '26' }],
      correct: 0,
      timerSec: 60,
    },
    {
      id: 'ellik',
      type: 'sort-groups',
      prompt: 'Javobi 50 dan katta yoki kichik?',
      groups: [{ label: '50 dan kichik' }, { label: '50 dan katta' }],
      items: [
        { label: '30 + 25', group: 1 },
        { label: '20 + 11', group: 0 },
        { label: '33 + 12', group: 0 },
        { label: '26 + 30', group: 1 },
        { label: '15 + 4', group: 0 },
        { label: '41 + 14', group: 1 },
      ],
      hint: 'Avval har bir misolni daftarda hisoblashsin.',
    },
    {
      id: 'yakun',
      type: 'recap',
      title: 'Bugun o‘rgandik',
      points: ['O‘nliklarni **o‘nliklarga** qo‘shamiz.', 'Birliklarni **birliklarga** qo‘shamiz.', '32 + 15 = 47'],
    },
  ],
});
