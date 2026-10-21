// QORALAMA: o'qituvchi tekshirib chiqishi kerak
import { defineLesson } from '../../schema';

export default defineLesson({
  notes: {
    goal: 'O‘quvchilar masalni o‘qib, qahramonning xatosini va saboqni aniqlaydi.',
    questions: ['Quyoncha nega yutqazdi?', 'Toshbaqa qanday edi?', 'Siz qachon shoshilgansiz?'],
    minutes: 15,
  },
  scenes: [
    {
      id: 'masal',
      type: 'story',
      title: 'Shoshqaloq quyoncha',
      pages: [
        {
          text: 'Quyoncha va **toshbaqa** sabzi terishga chiqishdi.',
          visual: { kind: 'picture', item: 'quyon' },
        },
        {
          text: 'Quyoncha **shoshilib**, xom va chirigan sabzilarni ham savatga tashladi.',
          visual: { kind: 'picture', item: 'quyon' },
        },
        {
          text: 'Toshbaqa **sekin**, lekin faqat yaxshi sabzilarni terdi.',
          visual: { kind: 'mascot', mood: 'think' },
        },
        {
          text: 'Uyda quyonchaning savatidagi sabzilarning yarmi **yaroqsiz** chiqdi.',
          visual: { kind: 'mascot', mood: 'think' },
        },
      ],
      hint: 'Asl masal.',
    },
    {
      id: 'nega',
      type: 'choose-answer',
      question: 'Quyonchaning xatosi nima edi?',
      options: [{ label: 'Shoshildi' }, { label: 'Sekin yurdi' }, { label: 'Uxlab qoldi' }],
      correct: 0,
    },
    {
      id: 'toshbaqa',
      type: 'choose-answer',
      question: 'Toshbaqa qanday ishladi?',
      options: [{ label: 'Sekin, lekin puxta' }, { label: 'Tez va chalkash' }],
      correct: 0,
    },
    {
      id: 'saboq',
      type: 'choose-answer',
      question: 'Masal saboqi?',
      options: [
        { label: 'Ishni shoshmay, puxta qilish kerak' },
        { label: 'Tez bo‘lish hamma narsa' },
        { label: 'Sabzi zararli' },
      ],
      correct: 0,
    },
    {
      id: 'kim',
      type: 'sort-groups',
      prompt: 'Kim qanday?',
      groups: [{ label: 'Shoshqaloq' }, { label: 'Puxta' }],
      items: [{ label: 'quyoncha', group: 0 }, { label: 'toshbaqa', group: 1 }],
    },
    {
      id: 'yakun',
      type: 'recap',
      title: 'Bugun o‘rgandik',
      points: ['**Shoshilgan** ishini buzar.', 'Puxta ish — **sifatli** natija.'],
    },
  ],
});
