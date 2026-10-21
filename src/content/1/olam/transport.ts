// QORALAMA: o'qituvchi tekshirib chiqishi kerak
import { defineLesson } from '../../schema';

export default defineLesson({
  notes: {
    goal: 'O‘quvchilar transport turlarini yerda, suvda va havoda harakatlanishiga qarab ajratadi.',
    questions: [
      'Maktabga nima bilan kelasiz?',
      'Havoda qanday transport uchadi?',
      'Avtobusda o‘zimizni qanday tutamiz?',
    ],
    minutes: 15,
  },
  scenes: [
    {
      id: 'turlar',
      type: 'explain',
      title: 'Transport',
      steps: [
        { text: '**Yerda**: mashina, avtobus, poyezd.', visual: { kind: 'picture', item: 'mashina' } },
        { text: '**Suvda**: kema, qayiq.', visual: { kind: 'picture', item: 'suv' }, replace: true },
        {
          text: '**Havoda**: samolyot, vertolyot.',
          visual: { kind: 'picture', item: 'bulut' },
          replace: true,
        },
      ],
    },
    {
      id: 'qayerda',
      type: 'sort-groups',
      prompt: 'Qayerda harakatlanadi?',
      groups: [{ label: 'Yerda' }, { label: 'Suvda' }, { label: 'Havoda' }],
      items: [
        { label: 'avtobus', group: 0 },
        { label: 'kema', group: 1 },
        { label: 'samolyot', group: 2 },
        { label: 'poyezd', group: 0 },
        { label: 'qayiq', group: 1 },
        { label: 'vertolyot', group: 2 },
      ],
    },
    {
      id: 'mashinalar',
      type: 'count-and-tap',
      prompt: 'Mashinalarni sanang',
      item: 'mashina',
      count: 6,
      layout: 'row',
    },
    {
      id: 'avtobus',
      type: 'choose-answer',
      question: 'Avtobusda qanday o‘tiramiz?',
      options: [{ label: 'Tinch, kattalarga joy beramiz' }, { label: 'Baqirib yuguramiz' }],
      correct: 0,
    },
    {
      id: 'kamar',
      type: 'choose-answer',
      question: 'Mashinada nima taqamiz?',
      options: [{ label: 'Xavfsizlik kamari' }, { label: 'Shlyapa' }],
      correct: 0,
    },
    {
      id: 'yakun',
      type: 'recap',
      title: 'Bugun o‘rgandik',
      points: ['Transport: **yerda, suvda, havoda**.', 'Transportda **xavfsizlik** qoidalariga amal qilamiz.'],
    },
  ],
});
