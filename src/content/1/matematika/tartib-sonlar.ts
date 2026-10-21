// QORALAMA: o'qituvchi tekshirib chiqishi kerak
import { defineLesson } from '../../schema';

export default defineLesson({
  notes: {
    goal: 'O‘quvchilar tartib sonlarni (birinchi, ikkinchi...) qatordagi o‘rinni aytish uchun ishlatadi.',
    questions: ['Navbatda nechanchi turibsiz?', 'Haftaning birinchi kuni qaysi?', 'Qatorda chapdan uchinchi kim?'],
    minutes: 15,
  },
  scenes: [
    {
      id: 'tartib',
      type: 'explain',
      title: 'Nechanchi?',
      steps: [
        {
          text: 'Sanoq son — **nechta?** Tartib son — **nechanchi?**',
          visual: { kind: 'mascot', mood: 'think' },
        },
        {
          text: 'Birinchi, ikkinchi, uchinchi…',
          visual: { kind: 'tiles', items: ['1-', '2-', '3-', '4-', '5-'] },
          replace: true,
        },
        {
          text: 'Qatorda **uchinchi** — qush.',
          visual: { kind: 'tiles', items: ['olma', 'gul', 'qush', 'baliq'], highlight: [2] },
          replace: true,
        },
      ],
      hint: '5 ta o‘quvchini qatorga qo‘yib, “nechanchi?” deb so‘rang.',
    },
    {
      id: 'nechanchi',
      type: 'choose-answer',
      question: 'Qatorda **baliq** nechanchi turibdi? (chapdan)',
      visual: { kind: 'tiles', items: ['olma', 'gul', 'qush', 'baliq'] },
      options: [{ label: 'to‘rtinchi' }, { label: 'uchinchi' }, { label: 'ikkinchi' }],
      correct: 0,
    },
    {
      id: 'birinchi',
      type: 'choose-answer',
      question: '**Birinchi** turgan narsa qaysi?',
      visual: { kind: 'tiles', items: ['yulduz', 'koptok', 'gul'] },
      options: [{ label: 'yulduz' }, { label: 'koptok' }, { label: 'gul' }],
      correct: 0,
    },
    {
      id: 'yozuv',
      type: 'drag-match',
      prompt: 'So‘zni yozuviga olib boring',
      pairs: [
        { item: { label: 'birinchi' }, target: { label: '1-' } },
        { item: { label: 'ikkinchi' }, target: { label: '2-' } },
        { item: { label: 'uchinchi' }, target: { label: '3-' } },
        { item: { label: 'beshinchi' }, target: { label: '5-' } },
      ],
    },
    {
      id: 'turi',
      type: 'sort-groups',
      prompt: 'Sanoq sonmi yoki tartib sonmi?',
      groups: [{ label: 'Nechta? (sanoq)' }, { label: 'Nechanchi? (tartib)' }],
      items: [
        { label: 'besh', group: 0 },
        { label: 'beshinchi', group: 1 },
        { label: 'ikki', group: 0 },
        { label: 'ikkinchi', group: 1 },
        { label: 'o‘n', group: 0 },
        { label: 'o‘ninchi', group: 1 },
      ],
    },
    {
      id: 'hafta',
      type: 'choose-answer',
      question: 'Haftaning **birinchi** kuni qaysi?',
      options: [{ label: 'Dushanba' }, { label: 'Yakshanba' }, { label: 'Juma' }],
      correct: 0,
    },
    {
      id: 'yakun',
      type: 'recap',
      title: 'Bugun o‘rgandik',
      points: ['Tartib son **nechanchi?** so‘rog‘iga javob beradi.', '1- — birinchi, 2- — ikkinchi.'],
    },
  ],
});
