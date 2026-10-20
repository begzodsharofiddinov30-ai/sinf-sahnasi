// QORALAMA: o'qituvchi tekshirib chiqishi kerak
import { defineLesson } from '../../schema';

export default defineLesson({
  notes: {
    goal: 'O‘quvchilar asosiy geometrik shakllarni taniydi, nomlaydi va atrofdagi narsalardan topadi.',
    questions: [
      'Sinfimizda qanday shakllarni ko‘ryapsiz?',
      'Uchburchakning nechta burchagi bor?',
      'Doira bilan kvadratning farqi nimada?',
    ],
    minutes: 15,
  },
  scenes: [
    {
      id: 'tanishuv',
      type: 'explain',
      title: 'Shakllar',
      steps: [
        { text: 'Bu — **doira**. Uning burchagi yo‘q.', visual: { kind: 'picture', item: 'doira' } },
        {
          text: 'Bu — **uchburchak**: 3 ta tomon, 3 ta burchak.',
          visual: { kind: 'picture', item: 'uchburchak' },
        },
        { text: 'Bu — **kvadrat**: 4 ta teng tomon.', visual: { kind: 'picture', item: 'kvadrat' } },
        {
          text: 'Bu — **to‘rtburchak**: 4 ta tomon, ikkitasi uzunroq.',
          visual: { kind: 'picture', item: 'tortburchak' },
        },
      ],
      hint: 'Har bir shaklni havoda barmoq bilan chizdiring.',
    },
    {
      id: 'qaysi-doira',
      type: 'choose-answer',
      question: 'Qaysi biri **doira**?',
      options: [
        { label: 'A', visual: { kind: 'picture', item: 'kvadrat' } },
        { label: 'B', visual: { kind: 'picture', item: 'doira' } },
        { label: 'C', visual: { kind: 'picture', item: 'uchburchak' } },
      ],
      correct: 1,
      retryHint: 'Doiraning burchagi bo‘lmaydi.',
    },
    {
      id: 'uchburchaklar',
      type: 'count-and-tap',
      prompt: 'Uchburchaklarni sanang!',
      item: 'uchburchak',
      count: 5,
      layout: 'scatter',
    },
    {
      id: 'burchak',
      type: 'sort-groups',
      prompt: 'Burchagi bormi?',
      groups: [{ label: 'Burchagi yo‘q' }, { label: 'Burchagi bor' }],
      items: [
        { label: 'doira', visual: { kind: 'picture', item: 'doira' }, group: 0 },
        { label: 'kvadrat', visual: { kind: 'picture', item: 'kvadrat' }, group: 1 },
        { label: 'uchburchak', visual: { kind: 'picture', item: 'uchburchak' }, group: 1 },
        { label: 'koptok', visual: { kind: 'picture', item: 'koptok' }, group: 0 },
        { label: 'to‘rtburchak', visual: { kind: 'picture', item: 'tortburchak' }, group: 1 },
        { label: 'tanga', visual: { kind: 'picture', item: 'tanga' }, group: 0 },
      ],
      retryHint: 'Shaklning chetini barmoq bilan aylanib chiqing. Burchakka urildingizmi?',
    },
    {
      id: 'nomlar',
      type: 'drag-match',
      prompt: 'Nomini shakliga olib boring',
      pairs: [
        { item: { label: 'doira' }, target: { visual: { kind: 'picture', item: 'doira' } } },
        { item: { label: 'kvadrat' }, target: { visual: { kind: 'picture', item: 'kvadrat' } } },
        { item: { label: 'uchburchak' }, target: { visual: { kind: 'picture', item: 'uchburchak' } } },
        { item: { label: 'to‘rtburchak' }, target: { visual: { kind: 'picture', item: 'tortburchak' } } },
      ],
    },
    {
      id: 'burchaklar',
      type: 'choose-answer',
      question: 'Uchburchakning nechta burchagi bor?',
      visual: { kind: 'picture', item: 'uchburchak' },
      options: [{ label: '2' }, { label: '3' }, { label: '4' }],
      correct: 1,
      timerSec: 20,
    },
    {
      id: 'atrofda',
      type: 'choose-answer',
      question: 'Qaysi narsa **doira** shaklida?',
      options: [
        { label: 'tanga', visual: { kind: 'picture', item: 'tanga' } },
        { label: 'kitob', visual: { kind: 'picture', item: 'kitob' } },
        { label: 'qog‘oz', visual: { kind: 'picture', item: 'qogoz' } },
      ],
      correct: 0,
    },
    {
      id: 'yakun',
      type: 'recap',
      title: 'Bugun o‘rgandik',
      points: [
        '**Doira**da burchak yo‘q.',
        '**Uchburchak**da 3 ta, **kvadrat**da 4 ta burchak.',
        'Shakllar atrofimizda hamma joyda bor.',
      ],
    },
  ],
});
