// QORALAMA: o'qituvchi tekshirib chiqishi kerak
import { defineLesson } from '../../schema';

export default defineLesson({
  notes: {
    goal: 'O‘quvchilar 11–20 sonlarni o‘nlik va birliklar orqali tushunadi, sanaydi va taqqoslaydi.',
    questions: [
      '15 sonida nechta o‘nlik va nechta birlik bor?',
      '19 dan keyin qaysi son keladi?',
      '12 va 21 ning farqi nimada?',
    ],
    minutes: 15,
  },
  scenes: [
    {
      id: 'onlik',
      type: 'explain',
      title: 'O‘ndan keyin',
      steps: [
        { text: 'Mana **10** — bitta to‘la ramka.', visual: { kind: 'tenframe', count: 10, frames: 2 } },
        {
          text: 'Yana **1** qo‘shsak — **11** (o‘n bir).',
          visual: { kind: 'tenframe', count: 11, frames: 2 },
          replace: true,
        },
        {
          text: '**15** — o‘n besh: 10 va yana 5.',
          visual: { kind: 'tenframe', count: 15, frames: 2 },
          replace: true,
        },
        {
          text: '10 + 5 = **15**',
          visual: { kind: 'tiles', items: ['10', '+', '5', '=', '15'], highlight: [4] },
        },
      ],
      hint: 'Ikki qo‘l barmoqlari (10) va yana bir necha choʻp bilan ko‘rsating.',
    },
    { id: 'ramka-13', type: 'ten-frame', prompt: '**13** ni ramkada ko‘rsating', frames: 2, target: 13 },
    {
      id: 'oq-17',
      type: 'number-line',
      prompt: 'O‘qda **17** ni toping va bosing',
      min: 10,
      max: 20,
      start: 10,
      step: 1,
      answer: 17,
    },
    {
      id: 'qaysi-son',
      type: 'choose-answer',
      question: 'Bu qaysi son?',
      visual: { kind: 'tenframe', count: 18, frames: 2 },
      options: [{ label: '18' }, { label: '8' }, { label: '81' }],
      correct: 0,
      retryHint: 'Birinchi ramka to‘la — bu 10. Yana nechta?',
    },
    {
      id: 'yulduzlar',
      type: 'count-and-tap',
      prompt: 'Yulduzlarni sanang!',
      item: 'yulduz',
      count: 14,
      layout: 'scatter',
    },
    {
      id: 'keyingi',
      type: 'choose-answer',
      question: '**19** dan keyin qaysi son keladi?',
      options: [{ label: '18' }, { label: '20' }, { label: '91' }],
      correct: 1,
      timerSec: 20,
    },
    {
      id: 'kichik-katta',
      type: 'sort-groups',
      prompt: '10 dan kichikmi yoki kattami?',
      groups: [{ label: '10 dan kichik' }, { label: '10 dan katta' }],
      items: [
        { label: '7', group: 0 },
        { label: '12', group: 1 },
        { label: '3', group: 0 },
        { label: '16', group: 1 },
        { label: '9', group: 0 },
        { label: '20', group: 1 },
      ],
    },
    {
      id: 'yakun',
      type: 'recap',
      title: 'Bugun o‘rgandik',
      points: ['11–20 sonlar: **bitta o‘nlik** va yana birliklar.', '15 = 10 + 5', '19 dan keyin — **20**.'],
    },
  ],
});
