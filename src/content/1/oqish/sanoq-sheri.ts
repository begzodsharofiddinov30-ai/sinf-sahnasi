// QORALAMA: o'qituvchi tekshirib chiqishi kerak
import { defineLesson } from '../../schema';

export default defineLesson({
  notes: {
    goal: 'O‘quvchilar sanoq she’rini ritm bilan o‘qiydi va sanoqni mustahkamlaydi.',
    questions: [
      'She’rda nechagacha sanadik?',
      'Sanoq she’ri o‘yinda nima uchun kerak?',
      'O‘zingiz sanoq tuzib ko‘ring.',
    ],
    minutes: 10,
  },
  scenes: [
    {
      id: 'sher',
      type: 'story',
      title: 'Bir, ikki, uch',
      pages: [
        { text: '**Bir**, ikki, uch — olmadan kuch!', visual: { kind: 'items', item: 'olma', count: 3 } },
        { text: '**To‘rt**, besh — qushlar ketti tez.', visual: { kind: 'items', item: 'qush', count: 5 } },
        { text: '**Olti**, yetti — bahor yetdi.', visual: { kind: 'items', item: 'gul', count: 7 } },
        {
          text: '**Sakkiz**, to‘qqiz, o‘n — o‘ynaymiz endi biz!',
          visual: { kind: 'items', item: 'yulduz', count: 10 },
        },
      ],
      hint: 'Asl sanoq she’ri; qarsak bilan o‘qing.',
    },
    {
      id: 'olmalar',
      type: 'count-and-tap',
      prompt: 'She’rdagi olmalarni sanang',
      item: 'olma',
      count: 3,
      layout: 'row',
    },
    {
      id: 'nechagacha',
      type: 'choose-answer',
      question: 'She’rda nechagacha sanadik?',
      options: [{ label: '10' }, { label: '5' }, { label: '20' }],
      correct: 0,
    },
    {
      id: 'keyingi',
      type: 'choose-answer',
      question: '“Olti” dan keyin qaysi son?',
      options: [{ label: 'yetti' }, { label: 'besh' }, { label: 'sakkiz' }],
      correct: 0,
    },
    {
      id: 'son',
      type: 'drag-match',
      prompt: 'So‘zni raqamiga olib boring',
      pairs: [
        { item: { label: 'uch' }, target: { label: '3' } },
        { item: { label: 'besh' }, target: { label: '5' } },
        { item: { label: 'yetti' }, target: { label: '7' } },
        { item: { label: 'o‘n' }, target: { label: '10' } },
      ],
    },
    {
      id: 'yakun',
      type: 'recap',
      title: 'Bugun o‘rgandik',
      points: ['Sanoq she’ri bilan **sanash** oson.', '1 dan 10 gacha ritm bilan sanadik.'],
    },
  ],
});
