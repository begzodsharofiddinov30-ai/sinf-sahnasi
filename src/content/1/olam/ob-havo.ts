// QORALAMA: o'qituvchi tekshirib chiqishi kerak
import { defineLesson } from '../../schema';

export default defineLesson({
  notes: {
    goal: 'O‘quvchilar ob-havo turlarini nomlaydi va ob-havoga mos kiyinishni biladi.',
    questions: ['Bugun ob-havo qanday?', 'Yomg‘irda nima kiyamiz?', 'Qishda qanday kiyinamiz?'],
    minutes: 15,
  },
  scenes: [
    {
      id: 'turlar',
      type: 'explain',
      title: 'Ob-havo',
      steps: [
        { text: '**Quyoshli** — issiq va yorug‘.', visual: { kind: 'picture', item: 'quyosh' } },
        { text: '**Bulutli** — osmon kulrang.', visual: { kind: 'picture', item: 'bulut' } },
        { text: '**Yomg‘irli** — tomchilar tushadi.', visual: { kind: 'picture', item: 'tomchi' } },
        { text: '**Qorli** — sovuq, qor yog‘adi.', visual: { kind: 'picture', item: 'qor' } },
      ],
      hint: 'Sinfda “ob-havo burchagi” tashkil qiling.',
    },
    {
      id: 'belgi',
      type: 'drag-match',
      prompt: 'So‘zni rasmiga olib boring',
      pairs: [
        { item: { label: 'quyoshli' }, target: { visual: { kind: 'picture', item: 'quyosh' } } },
        { item: { label: 'yomg‘irli' }, target: { visual: { kind: 'picture', item: 'tomchi' } } },
        { item: { label: 'qorli' }, target: { visual: { kind: 'picture', item: 'qor' } } },
      ],
    },
    {
      id: 'kiyim',
      type: 'choose-answer',
      question: 'Yomg‘irda nima olamiz?',
      visual: { kind: 'picture', item: 'tomchi' },
      options: [{ label: 'Soyabon' }, { label: 'Ko‘zoynak' }, { label: 'Shim' }],
      correct: 0,
    },
    {
      id: 'fasl-kiyim',
      type: 'sort-groups',
      prompt: 'Qishda yoki yozda kiyamiz?',
      groups: [{ label: 'Qishda' }, { label: 'Yozda' }],
      items: [
        { label: 'qalin palto', group: 0 },
        { label: 'qo‘lqop', group: 0 },
        { label: 'panama', group: 1 },
        { label: 'kalta yengli ko‘ylak', group: 1 },
      ],
    },
    {
      id: 'bugun',
      type: 'choose-answer',
      question: 'Osmonda bulut, tomchilar tushyapti. Ob-havo qanday?',
      options: [{ label: 'Yomg‘irli' }, { label: 'Quyoshli' }, { label: 'Qorli' }],
      correct: 0,
    },
    {
      id: 'yakun',
      type: 'recap',
      title: 'Bugun o‘rgandik',
      points: ['Ob-havo: **quyoshli, bulutli, yomg‘irli, qorli**.', 'Ob-havoga qarab **kiyinamiz**.'],
    },
  ],
});
