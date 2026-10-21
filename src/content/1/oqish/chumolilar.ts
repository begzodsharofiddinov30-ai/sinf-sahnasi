// QORALAMA: o'qituvchi tekshirib chiqishi kerak
import { defineLesson } from '../../schema';

export default defineLesson({
  notes: {
    goal: 'O‘quvchilar ertakni tinglab, birgalikda ishlashning foydasi haqida xulosa chiqaradi.',
    questions: ['Chumolilar nima qilishdi?', 'Nega ular uddalashdi?', 'Siz kim bilan birga ishlaysiz?'],
    minutes: 15,
  },
  scenes: [
    {
      id: 'ertak',
      type: 'story',
      title: 'Ahil chumolilar',
      pages: [
        { text: 'Bir chumoli katta **non ushog‘i**ni topibdi.', visual: { kind: 'mascot', mood: 'think' } },
        {
          text: 'U yolg‘iz ko‘tarolmabdi va do‘stlarini **chaqiribdi**.',
          visual: { kind: 'mascot', mood: 'think' },
        },
        {
          text: 'O‘nta chumoli birga ko‘taribdi — non uyaga yetibdi!',
          visual: { kind: 'mascot', mood: 'cheer' },
        },
        {
          text: 'Shundan beri ular hamma ishni **birga** qilishar ekan.',
          visual: { kind: 'mascot', mood: 'happy' },
        },
      ],
      hint: 'Asl ertak.',
    },
    {
      id: 'nima-topdi',
      type: 'choose-answer',
      question: 'Chumoli nima topdi?',
      options: [{ label: 'Non ushog‘ini' }, { label: 'Olma' }, { label: 'Barg' }],
      correct: 0,
    },
    {
      id: 'nega',
      type: 'choose-answer',
      question: 'Nega chumolilar uddalashdi?',
      options: [{ label: 'Birga ishlashdi' }, { label: 'Kuchli edi' }, { label: 'Shamol yordam berdi' }],
      correct: 0,
    },
    {
      id: 'chumolilar',
      type: 'count-and-tap',
      prompt: 'Nechta chumoli yordamga keldi? Yulduzlarni sanang',
      item: 'yulduz',
      count: 10,
      layout: 'row',
    },
    {
      id: 'saboq',
      type: 'choose-answer',
      question: 'Ertakdan qanday saboq olamiz?',
      options: [{ label: 'Birga ishlasak — oson' }, { label: 'Yolg‘iz yaxshi' }, { label: 'Ishlamaslik kerak' }],
      correct: 0,
    },
    {
      id: 'yakun',
      type: 'recap',
      title: 'Bugun o‘rgandik',
      points: ['**Ahillik** — kuch.', 'Qiyin ishni **birga** qilamiz.'],
    },
  ],
});
