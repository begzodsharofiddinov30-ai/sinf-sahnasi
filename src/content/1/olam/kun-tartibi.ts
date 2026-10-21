// QORALAMA: o'qituvchi tekshirib chiqishi kerak
import { defineLesson } from '../../schema';

export default defineLesson({
  notes: {
    goal: 'O‘quvchilar kun qismlarini (ertalab, kunduzi, kechqurun, tun) va to‘g‘ri kun tartibini biladi.',
    questions: ['Ertalab nima qilasiz?', 'Nechada uxlaysiz?', 'Nega kun tartibi kerak?'],
    minutes: 15,
  },
  scenes: [
    {
      id: 'qismlar',
      type: 'explain',
      title: 'Kun qismlari',
      steps: [
        { text: '**Ertalab** turamiz, yuvinamiz.', visual: { kind: 'picture', item: 'quyosh' } },
        { text: '**Kunduzi** maktabda o‘qiymiz.', visual: { kind: 'picture', item: 'kitob' } },
        { text: '**Kechqurun** dars tayyorlaymiz.', visual: { kind: 'picture', item: 'qalam' } },
        { text: '**Tunda** uxlaymiz.', visual: { kind: 'picture', item: 'oy' } },
      ],
    },
    {
      id: 'qachon',
      type: 'drag-match',
      prompt: 'Ishni kun qismiga olib boring',
      pairs: [
        { item: { label: 'Nonushta' }, target: { label: 'ertalab' } },
        { item: { label: 'Darslar' }, target: { label: 'kunduzi' } },
        { item: { label: 'Uyqu' }, target: { label: 'tunda' } },
      ],
    },
    {
      id: 'turish',
      type: 'clock',
      prompt: 'Ertalab soat 7:00 da turamiz. Soatni qo‘ying',
      start: { h: 12, m: 0 },
      target: { h: 7, m: 0 },
    },
    {
      id: 'uyqu',
      type: 'choose-answer',
      question: 'Bolalar kechasi taxminan necha soat uxlashi kerak?',
      options: [{ label: '10 soatcha' }, { label: '2 soat' }, { label: '20 soat' }],
      correct: 0,
    },
    {
      id: 'ertalab-kech',
      type: 'sort-groups',
      prompt: 'Ertalabmi yoki kechqurunmi?',
      groups: [{ label: 'Ertalab' }, { label: 'Kechqurun' }],
      items: [
        { label: 'Nonushta', group: 0 },
        { label: 'Badantarbiya', group: 0 },
        { label: 'Kechki ovqat', group: 1 },
        { label: 'Uyquga yotish', group: 1 },
      ],
    },
    {
      id: 'yakun',
      type: 'recap',
      title: 'Bugun o‘rgandik',
      points: ['Kun: **ertalab, kunduzi, kechqurun, tun**.', 'Vaqtida yotib, vaqtida turamiz.'],
    },
  ],
});
