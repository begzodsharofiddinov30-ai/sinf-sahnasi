// QORALAMA: o'qituvchi tekshirib chiqishi kerak
import { defineLesson } from '../../schema';

export default defineLesson({
  notes: {
    goal: 'O‘quvchilar ismlar, joy nomlari va gap boshidagi so‘z bosh harf bilan yozilishini biladi.',
    questions: [
      'Ismingiz qaysi harf bilan boshlanadi?',
      'Qaysi shaharlarni bilasiz?',
      'Gapning birinchi so‘zi qanday yoziladi?',
    ],
    minutes: 15,
  },
  scenes: [
    {
      id: 'qoida',
      type: 'explain',
      title: 'Bosh harf qayerda?',
      steps: [
        {
          text: 'Ismlar **bosh harf** bilan yoziladi.',
          visual: { kind: 'tiles', items: ['Aziz', 'Malika'] },
        },
        {
          text: 'Shahar nomlari ham: **Toshkent**, **Samarqand**.',
          visual: { kind: 'tiles', items: ['Toshkent', 'Samarqand'] },
          replace: true,
        },
        {
          text: 'Gapning **birinchi so‘zi** ham bosh harf bilan boshlanadi.',
          visual: { kind: 'word', text: 'Bugun bayram.', highlight: [0] },
          replace: true,
        },
      ],
    },
    {
      id: 'togri',
      type: 'choose-answer',
      question: 'Qaysi biri to‘g‘ri yozilgan?',
      options: [{ label: 'toshkent' }, { label: 'Toshkent' }, { label: 'toshKent' }],
      correct: 1,
    },
    {
      id: 'kerakmi',
      type: 'sort-groups',
      prompt: 'Bosh harf kerakmi?',
      groups: [{ label: 'Bosh harf bilan' }, { label: 'Kichik harf bilan' }],
      items: [
        { label: 'Nodira', group: 0 },
        { label: 'olma', group: 1 },
        { label: 'Buxoro', group: 0 },
        { label: 'kitob', group: 1 },
        { label: 'Bo‘tajon', group: 0 },
        { label: 'daraxt', group: 1 },
      ],
    },
    {
      id: 'aziz',
      type: 'build-word',
      prompt: 'Ismni to‘g‘ri yozing — bosh harf bilan!',
      word: 'Aziz',
      tiles: ['A', 'z', 'i', 'z'],
      extra: ['a'],
      retryHint: 'Ism bosh harf bilan boshlanadi.',
    },
    {
      id: 'xato',
      type: 'choose-answer',
      question: '«malika gul uzdi.» Qaysi so‘z xato yozilgan?',
      options: [{ label: 'malika' }, { label: 'gul' }, { label: 'uzdi' }],
      correct: 0,
      explanation: 'Malika — ism, u bosh harf bilan yoziladi. Gap boshi ham shu so‘z.',
    },
    {
      id: 'yakun',
      type: 'recap',
      title: 'Bugun o‘rgandik',
      points: ['**Ism**lar bosh harf bilan yoziladi.', '**Shahar** nomlari ham.', 'Gapning **birinchi so‘zi** ham.'],
    },
  ],
});
