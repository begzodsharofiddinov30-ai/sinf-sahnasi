// QORALAMA: o'qituvchi tekshirib chiqishi kerak
import { defineLesson } from '../../schema';

export default defineLesson({
  notes: {
    goal: 'O‘quvchilar Quyosh tizimining tuzilishi, Yerning o‘rni va kun-tun almashinuvi sababini biladi.',
    questions: ['Quyosh sayyorami yoki yulduz?', 'Kun va tun nega almashadi?', 'Qaysi sayyoralarni bilasiz?'],
    minutes: 20,
  },
  scenes: [
    {
      id: 'tizim',
      type: 'explain',
      title: 'Quyosh tizimi',
      steps: [
        { text: '**Quyosh** — yulduz, u o‘zidan nur sochadi.', visual: { kind: 'picture', item: 'quyosh' } },
        {
          text: 'Quyosh atrofida **8 ta sayyora** aylanadi.',
          visual: { kind: 'picture', item: 'sayyora' },
          replace: true,
        },
        {
          text: 'Biz **Yer**da yashaymiz — u Quyoshdan **3-sayyora**.',
          visual: { kind: 'tiles', items: ['Merkuriy', 'Venera', 'Yer'], highlight: [2] },
          replace: true,
        },
        { text: '**Oy** — Yerning yo‘ldoshi.', visual: { kind: 'picture', item: 'oy' }, replace: true },
      ],
      hint: 'Chiroq (Quyosh) va koptok (Yer) bilan kun-tunni ko‘rsating.',
    },
    {
      id: 'nechta',
      type: 'choose-answer',
      question: 'Quyosh tizimida nechta sayyora bor?',
      options: [{ label: '8' }, { label: '9' }, { label: '3' }],
      correct: 0,
    },
    {
      id: 'katta',
      type: 'choose-answer',
      question: 'Eng katta sayyora qaysi?',
      options: [{ label: 'Yupiter' }, { label: 'Yer' }, { label: 'Merkuriy' }],
      correct: 0,
    },
    {
      id: 'kun-tun',
      type: 'choose-answer',
      question: 'Kun va tun nega almashadi?',
      options: [
        { label: 'Yer o‘z o‘qi atrofida aylanadi' },
        { label: 'Quyosh o‘chib qoladi' },
        { label: 'Oy Quyoshni yopadi' },
      ],
      correct: 0,
    },
    {
      id: 'kim',
      type: 'drag-match',
      prompt: 'Osmon jismini turiga olib boring',
      pairs: [
        {
          item: { label: 'Quyosh', visual: { kind: 'picture', item: 'quyosh' } },
          target: { label: 'yulduz' },
        },
        {
          item: { label: 'Yer', visual: { kind: 'picture', item: 'sayyora' } },
          target: { label: 'sayyora' },
        },
        { item: { label: 'Oy', visual: { kind: 'picture', item: 'oy' } }, target: { label: 'yo‘ldosh' } },
      ],
    },
    {
      id: 'sayyorami',
      type: 'sort-groups',
      prompt: 'Sayyorami yoki yo‘qmi?',
      groups: [{ label: 'Sayyora' }, { label: 'Sayyora emas' }],
      items: [
        { label: 'Mars', group: 0 },
        { label: 'Oy', group: 1 },
        { label: 'Venera', group: 0 },
        { label: 'Quyosh', group: 1 },
        { label: 'Saturn', group: 0 },
        { label: 'bulut', group: 1 },
      ],
    },
    {
      id: 'yakun',
      type: 'recap',
      title: 'Bugun o‘rgandik',
      points: [
        '**Quyosh** — yulduz, atrofida **8** ta sayyora.',
        '**Yer** — 3-sayyora, **Oy** — uning yo‘ldoshi.',
        'Yer aylangani uchun **kun** va **tun** almashadi.',
      ],
    },
  ],
});
