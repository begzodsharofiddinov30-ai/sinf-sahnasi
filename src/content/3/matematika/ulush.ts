// QORALAMA: o'qituvchi tekshirib chiqishi kerak
import { defineLesson } from '../../schema';

export default defineLesson({
  notes: {
    goal: 'O‘quvchilar yarim (1/2) va chorak (1/4) ulushlarini teng bo‘lish orqali tushunadi.',
    questions: [
      'Yarim deganda nimani tushunasiz?',
      'Bo‘laklar nega teng bo‘lishi kerak?',
      'Bir soatning yarmi necha daqiqa?',
    ],
    minutes: 15,
  },
  scenes: [
    {
      id: 'ulush',
      type: 'explain',
      title: 'Yarim va chorak',
      steps: [
        {
          text: 'Butunni **2** teng bo‘lakka bo‘lsak — har biri **yarim** (1/2).',
          visual: { kind: 'picture', item: 'olma' },
        },
        {
          text: '**4** teng bo‘lakka bo‘lsak — har biri **chorak** (1/4).',
          visual: { kind: 'picture', item: 'anor' },
        },
        {
          text: 'Bo‘laklar albatta **teng** bo‘lishi kerak!',
          visual: { kind: 'mascot', mood: 'think' },
          replace: true,
        },
      ],
      hint: 'Qog‘oz varag‘ini avval ikkiga, keyin to‘rtga buklab ko‘rsating.',
    },
    {
      id: 'yarmi',
      type: 'choose-answer',
      question: '8 ta olmaning **yarmi** nechta?',
      visual: { kind: 'groups', item: 'olma', groups: 2, each: 4 },
      options: [{ label: '4' }, { label: '2' }, { label: '6' }],
      correct: 0,
    },
    {
      id: 'choragi',
      type: 'choose-answer',
      question: '12 ta qalamning **choragi** nechta?',
      visual: { kind: 'groups', item: 'qalam', groups: 4, each: 3 },
      options: [{ label: '3' }, { label: '4' }, { label: '6' }],
      correct: 0,
    },
    {
      id: 'soat',
      type: 'choose-answer',
      question: 'Bir soatning **yarmi** necha daqiqa?',
      visual: { kind: 'clock', h: 12, m: 30 },
      options: [{ label: '30' }, { label: '15' }, { label: '60' }],
      correct: 0,
    },
    {
      id: 'belgi',
      type: 'drag-match',
      prompt: 'So‘zni belgisiga olib boring',
      pairs: [
        { item: { label: 'yarim' }, target: { label: '1/2' } },
        { item: { label: 'chorak' }, target: { label: '1/4' } },
        { item: { label: 'butun' }, target: { label: '1' } },
      ],
    },
    {
      id: 'pirog',
      type: 'choose-answer',
      question: 'Pirogni 4 kishiga teng bo‘lsak, har biriga qancha tegadi?',
      options: [{ label: 'chorak (1/4)' }, { label: 'yarim (1/2)' }, { label: 'butun' }],
      correct: 0,
      timerSec: 30,
    },
    {
      id: 'yakun',
      type: 'recap',
      title: 'Bugun o‘rgandik',
      points: ['**Yarim** — 2 teng bo‘lakdan biri (1/2).', '**Chorak** — 4 teng bo‘lakdan biri (1/4).'],
    },
  ],
});
