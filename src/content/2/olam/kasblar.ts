// QORALAMA: o'qituvchi tekshirib chiqishi kerak
import { defineLesson } from '../../schema';

export default defineLesson({
  notes: {
    goal: 'O‘quvchilar turli kasblarni va ularning jamiyat uchun ahamiyatini biladi.',
    questions: ['Ota-onangiz qanday kasb egasi?', 'Kim bo‘lmoqchisiz?', 'Qaysi kasblar odamlarni davolaydi?'],
    minutes: 15,
  },
  scenes: [
    {
      id: 'kasb',
      type: 'explain',
      title: 'Kasblar',
      steps: [
        { text: '**Shifokor** odamlarni davolaydi.', visual: { kind: 'mascot', mood: 'happy' } },
        { text: '**O‘qituvchi** bilim beradi.', visual: { kind: 'picture', item: 'kitob' } },
        {
          text: '**Dehqon** hosil yetishtiradi.',
          visual: { kind: 'picture', item: 'daraxt' },
          replace: true,
        },
        {
          text: '**Haydovchi** odamlarni tashiydi.',
          visual: { kind: 'picture', item: 'mashina' },
          replace: true,
        },
      ],
    },
    {
      id: 'ish',
      type: 'drag-match',
      prompt: 'Kasbni ishiga olib boring',
      pairs: [
        { item: { label: 'shifokor' }, target: { label: 'davolaydi' } },
        { item: { label: 'oshpaz' }, target: { label: 'ovqat pishiradi' } },
        { item: { label: 'quruvchi' }, target: { label: 'uy quradi' } },
        { item: { label: 'o‘qituvchi' }, target: { label: 'dars beradi' } },
      ],
    },
    {
      id: 'vosita',
      type: 'choose-answer',
      question: 'Sartarosh nima bilan ishlaydi?',
      options: [{ label: 'Qaychi va taroq' }, { label: 'Bolg‘a' }, { label: 'Rul' }],
      correct: 0,
    },
    {
      id: 'olov',
      type: 'choose-answer',
      question: 'Yong‘inni kim o‘chiradi?',
      options: [{ label: 'O‘t o‘chiruvchi' }, { label: 'Sotuvchi' }, { label: 'Pochtachi' }],
      correct: 0,
    },
    {
      id: 'qayerda',
      type: 'sort-groups',
      prompt: 'Qayerda ishlaydi?',
      groups: [{ label: 'Maktabda' }, { label: 'Shifoxonada' }],
      items: [
        { label: 'o‘qituvchi', group: 0 },
        { label: 'shifokor', group: 1 },
        { label: 'hamshira', group: 1 },
        { label: 'kutubxonachi', group: 0 },
      ],
    },
    {
      id: 'yakun',
      type: 'recap',
      title: 'Bugun o‘rgandik',
      points: ['Har bir **kasb** muhim.', 'Barcha kasb egalarini **hurmat** qilamiz.'],
    },
  ],
});
