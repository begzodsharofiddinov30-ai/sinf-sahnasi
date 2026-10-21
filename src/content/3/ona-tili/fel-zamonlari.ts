// QORALAMA: o'qituvchi tekshirib chiqishi kerak
import { defineLesson } from '../../schema';

export default defineLesson({
  notes: {
    goal: 'O‘quvchilar fe’lning o‘tgan, hozirgi va kelasi zamon shakllarini farqlaydi.',
    questions: ['Kecha nima qildingiz?', 'Hozir nima qilyapsiz?', 'Ertaga nima qilasiz?'],
    minutes: 15,
  },
  scenes: [
    {
      id: 'zamon',
      type: 'explain',
      title: 'Uch zamon',
      steps: [
        { text: '**O‘tgan** zamon: o‘qi**di** (kecha).', visual: { kind: 'tiles', items: ['o‘qidi'] } },
        {
          text: '**Hozirgi** zamon: o‘qi**yapti** (hozir).',
          visual: { kind: 'tiles', items: ['o‘qiyapti'] },
        },
        { text: '**Kelasi** zamon: o‘qi**ydi** (ertaga).', visual: { kind: 'tiles', items: ['o‘qiydi'] } },
      ],
    },
    {
      id: 'qaysi',
      type: 'sort-groups',
      prompt: 'Qaysi zamon?',
      groups: [{ label: 'O‘tgan' }, { label: 'Hozirgi' }, { label: 'Kelasi' }],
      items: [
        { label: 'yozdi', group: 0 },
        { label: 'yozyapti', group: 1 },
        { label: 'yozadi', group: 2 },
        { label: 'keldi', group: 0 },
        { label: 'kelyapti', group: 1 },
        { label: 'keladi', group: 2 },
      ],
    },
    {
      id: 'kecha',
      type: 'choose-answer',
      question: '«Kecha biz bog‘ga ___.»',
      options: [{ label: 'bordik' }, { label: 'boramiz' }, { label: 'boryapmiz' }],
      correct: 0,
    },
    {
      id: 'ertaga',
      type: 'choose-answer',
      question: '«Ertaga yomg‘ir ___.»',
      options: [{ label: 'yog‘adi' }, { label: 'yog‘di' }, { label: 'yog‘yapti' }],
      correct: 0,
    },
    {
      id: 'soz',
      type: 'drag-match',
      prompt: 'Vaqt so‘zini fe’lga olib boring',
      pairs: [
        { item: { label: 'kecha' }, target: { label: 'o‘ynadi' } },
        { item: { label: 'hozir' }, target: { label: 'o‘ynayapti' } },
        { item: { label: 'ertaga' }, target: { label: 'o‘ynaydi' } },
      ],
    },
    {
      id: 'yakun',
      type: 'recap',
      title: 'Bugun o‘rgandik',
      points: ['Fe’l **zamon**ni bildiradi.', 'O‘tgan — **-di**, hozirgi — **-yapti**, kelasi — **-adi/-ydi**.'],
    },
  ],
});
