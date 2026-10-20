// QORALAMA: o'qituvchi tekshirib chiqishi kerak
import { defineLesson } from '../../schema';

export default defineLesson({
  notes: {
    goal: 'O‘quvchilar dialogni rollarga bo‘lib, qahramon kayfiyatiga mos ohang bilan o‘qiydi.',
    questions: [
      'Qahramon gapi qanday belgi bilan boshlanadi?',
      'Xafa qahramon gapini qanday o‘qiymiz?',
      'Qaysi qahramon rolini o‘ynagingiz keladi?',
    ],
    minutes: 15,
  },
  scenes: [
    {
      id: 'nima',
      type: 'explain',
      title: 'Rollarda o‘qish',
      steps: [
        {
          text: 'Har bir o‘quvchi **bitta qahramon** so‘zini o‘qiydi.',
          visual: { kind: 'mascot', mood: 'happy' },
        },
        { text: 'Qahramon gapi **tire** (—) bilan boshlanadi.', visual: { kind: 'tiles', items: ['—'] } },
        {
          text: 'Ovozni qahramonga **moslab** o‘qiymiz: quvnoq, xafa, hayron.',
          visual: { kind: 'mascot', mood: 'think' },
          replace: true,
        },
      ],
      hint: 'Ikki o‘quvchini doskaga chiqarib, rollarni taqsimlang.',
    },
    {
      id: 'suhbat',
      type: 'story',
      title: 'Qushcha va Bo‘tajon',
      pages: [
        { text: '**Qushcha:** — Bo‘tajon, nega xafasan?', visual: { kind: 'picture', item: 'qush' } },
        {
          text: '**Bo‘tajon:** — Do‘stlarim bilan o‘ynagim keldi, lekin ular uzoqda.',
          visual: { kind: 'mascot', mood: 'think' },
        },
        {
          text: '**Qushcha:** — Men uchib borib, ularni chaqirib kelaman!',
          visual: { kind: 'picture', item: 'qush' },
        },
        {
          text: '**Bo‘tajon:** — Rahmat, qushcha! Sen haqiqiy do‘stsan!',
          visual: { kind: 'mascot', mood: 'cheer' },
        },
      ],
    },
    {
      id: 'nechta',
      type: 'choose-answer',
      question: 'Suhbatda nechta qahramon gapirdi?',
      options: [{ label: '2' }, { label: '3' }, { label: '1' }],
      correct: 0,
    },
    {
      id: 'ohang',
      type: 'choose-answer',
      question: 'Bo‘tajonning birinchi gapini qanday ohangda o‘qiymiz?',
      options: [{ label: 'Xafa ovozda' }, { label: 'Quvnoq ovozda' }, { label: 'Baqirib' }],
      correct: 0,
    },
    {
      id: 'kim',
      type: 'drag-match',
      prompt: 'Gapni aytgan qahramonga olib boring',
      pairs: [
        {
          item: { label: 'Qushcha', visual: { kind: 'picture', item: 'qush' } },
          target: { label: 'Men ularni chaqirib kelaman!' },
        },
        {
          item: { label: 'Bo‘tajon', visual: { kind: 'mascot', mood: 'happy' } },
          target: { label: 'Sen haqiqiy do‘stsan!' },
        },
      ],
    },
    {
      id: 'belgi',
      type: 'choose-answer',
      question: 'Qahramon gapi qaysi belgi bilan boshlanadi?',
      options: [{ label: '— (tire)' }, { label: '? (so‘roq)' }, { label: '( (qavs)' }],
      correct: 0,
    },
    {
      id: 'yakun',
      type: 'recap',
      title: 'Bugun o‘rgandik',
      points: ['Qahramon gapi **tire** bilan boshlanadi.', 'Ohangni qahramon **kayfiyatiga** moslaymiz.'],
    },
  ],
});
