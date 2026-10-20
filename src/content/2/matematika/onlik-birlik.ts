// QORALAMA: o'qituvchi tekshirib chiqishi kerak
import { defineLesson } from '../../schema';

export default defineLesson({
  notes: {
    goal: 'O‘quvchilar ikki xonali sonni o‘nliklar va birliklarga ajratadi.',
    questions: [
      '23 sonida nechta o‘nlik bor?',
      '10 ta tayoqchani bog‘lasak, nima hosil bo‘ladi?',
      '40 va 4 ning farqi nimada?',
    ],
    minutes: 15,
  },
  scenes: [
    {
      id: 'onlik',
      type: 'explain',
      title: 'O‘nlik nima?',
      steps: [
        { text: 'Mana **10** ta birlik.', visual: { kind: 'blocks', tens: 0, ones: 10 } },
        { text: 'Ularni birlashtirsak — **1 o‘nlik**.', visual: { kind: 'blocks', tens: 1, ones: 0 }, replace: true },
        { text: '**23** — bu 2 ta o‘nlik va 3 ta birlik.', visual: { kind: 'blocks', tens: 2, ones: 3 }, replace: true },
        { text: '20 + 3 = **23**', visual: { kind: 'tiles', items: ['20', '+', '3', '=', '23'], highlight: [4] } },
      ],
      hint: '10 ta cho‘pni rezinka bilan bog‘lab, “bitta o‘nlik” deb ko‘rsating.',
    },
    {
      id: 'qaysi-son',
      type: 'choose-answer',
      question: 'Bu qaysi son?',
      visual: { kind: 'blocks', tens: 3, ones: 4 },
      options: [{ label: '34' }, { label: '43' }, { label: '7' }],
      correct: 0,
      retryHint: 'Avval o‘nliklarni (ustunlar), keyin birliklarni sanang.',
    },
    {
      id: 'ramka-14',
      type: 'ten-frame',
      prompt: '**14** ni ramkada ko‘rsating',
      frames: 2,
      target: 14,
      hint: 'Birinchi ramka to‘lsa — bu bitta o‘nlik.',
    },
    {
      id: 'moslash',
      type: 'drag-match',
      prompt: 'Sonni bloklariga olib boring',
      pairs: [
        { item: { label: '42' }, target: { visual: { kind: 'blocks', tens: 4, ones: 2 } } },
        { item: { label: '24' }, target: { visual: { kind: 'blocks', tens: 2, ones: 4 } } },
        { item: { label: '15' }, target: { visual: { kind: 'blocks', tens: 1, ones: 5 } } },
      ],
      retryHint: 'Birinchi raqam — o‘nliklar soni.',
    },
    {
      id: 'ellik-olti',
      type: 'choose-answer',
      question: '**56** sonida nechta o‘nlik bor?',
      options: [{ label: '5' }, { label: '6' }, { label: '11' }],
      correct: 0,
      explanation: '56 = 5 o‘nlik va 6 birlik.',
    },
    {
      id: 'onlab',
      type: 'number-line',
      prompt: 'O‘nlab sanaymiz: 10 dan 30 gacha sakrang',
      min: 10,
      max: 30,
      start: 10,
      step: 10,
      answer: 30,
    },
    {
      id: 'yetmish',
      type: 'choose-answer',
      question: '7 o‘nlik va 0 birlik — bu qaysi son?',
      options: [{ label: '7' }, { label: '70' }, { label: '17' }],
      correct: 1,
      timerSec: 20,
    },
    {
      id: 'yakun',
      type: 'recap',
      title: 'Bugun o‘rgandik',
      points: ['**10** ta birlik = **1** o‘nlik.', 'Ikki xonali son: o‘nliklar va birliklar.', '23 = 20 + 3'],
    },
  ],
});
