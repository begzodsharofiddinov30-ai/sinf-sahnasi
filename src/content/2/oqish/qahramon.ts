// QORALAMA: o'qituvchi tekshirib chiqishi kerak
import { defineLesson } from '../../schema';

export default defineLesson({
  notes: {
    goal: 'O‘quvchilar qahramonning xatti-harakatiga qarab uning xarakterini aniqlaydi.',
    questions: ['Qahramon nima qildi?', 'Uni qanday so‘z bilan tavsiflaymiz?', 'Siz qahramon o‘rnida nima qilardingiz?'],
    minutes: 15,
  },
  scenes: [
    {
      id: 'hikoya',
      type: 'story',
      title: 'Topilgan hamyon',
      pages: [
        { text: 'Nodira ko‘chada **hamyon** topib oldi.', visual: { kind: 'mascot', mood: 'think' } },
        {
          text: 'Ichida pul va bir kampirning **rasmi** bor edi.',
          visual: { kind: 'mascot', mood: 'think' },
        },
        {
          text: 'Nodira hamyonni egasini qidirib, **qaytarib berdi**.',
          visual: { kind: 'mascot', mood: 'happy' },
        },
        { text: 'Kampir: «Sen **halol** qizsan!» — dedi.', visual: { kind: 'mascot', mood: 'cheer' } },
      ],
      hint: 'Asl hikoya.',
    },
    {
      id: 'xarakter',
      type: 'choose-answer',
      question: 'Nodira qanday qiz?',
      options: [{ label: 'Halol' }, { label: 'Dangasa' }, { label: 'Qo‘rqoq' }],
      correct: 0,
    },
    {
      id: 'nega',
      type: 'choose-answer',
      question: 'Nega shunday deymiz?',
      options: [{ label: 'Hamyonni egasiga qaytardi' }, { label: 'Pulni oldi' }, { label: 'Hamyonni tashladi' }],
      correct: 0,
    },
    {
      id: 'sifat',
      type: 'sort-groups',
      prompt: 'Yaxshi fazilatmi?',
      groups: [{ label: 'Yaxshi fazilat' }, { label: 'Yomon odat' }],
      items: [
        { label: 'halol', group: 0 },
        { label: 'mehribon', group: 0 },
        { label: 'yolg‘onchi', group: 1 },
        { label: 'mehnatkash', group: 0 },
        { label: 'ochko‘z', group: 1 },
      ],
    },
    {
      id: 'xatti',
      type: 'drag-match',
      prompt: 'Ishni fazilatga olib boring',
      pairs: [
        { item: { label: 'Kasalni ko‘rgani bordi' }, target: { label: 'mehribon' } },
        { item: { label: 'Haqiqatni aytdi' }, target: { label: 'rostgo‘y' } },
        { item: { label: 'Har kuni mashq qildi' }, target: { label: 'tirishqoq' } },
      ],
    },
    {
      id: 'yakun',
      type: 'recap',
      title: 'Bugun o‘rgandik',
      points: ['Qahramonni **ishiga** qarab tavsiflaymiz.', 'Nodira — **halol** qiz.'],
    },
  ],
});
