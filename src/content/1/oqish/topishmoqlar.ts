// QORALAMA: o'qituvchi tekshirib chiqishi kerak
import { defineLesson } from '../../schema';

export default defineLesson({
  notes: {
    goal: 'O‘quvchilar topishmoqdagi belgilarga qarab javobni topadi va o‘ylashni mashq qiladi.',
    questions: [
      'Topishmoqda narsaning nomi aytiladimi?',
      'Javobni qanday topdingiz?',
      'O‘zingiz topishmoq o‘ylab topa olasizmi?',
    ],
    minutes: 15,
  },
  scenes: [
    {
      id: 'nima',
      type: 'explain',
      title: 'Topishmoq nima?',
      steps: [
        {
          text: 'Topishmoqda narsaning **nomi aytilmaydi**, faqat **belgilari** aytiladi.',
          visual: { kind: 'mascot', mood: 'think' },
        },
        {
          text: 'Biz o‘ylab, **javob**ini topamiz!',
          visual: { kind: 'mascot', mood: 'happy' },
          replace: true,
        },
      ],
    },
    {
      id: 'quyosh',
      type: 'choose-answer',
      question: 'Osmonda yonadi, hammani isitadi, kechasi ko‘rinmaydi. Bu nima?',
      options: [
        { label: 'A', visual: { kind: 'picture', item: 'quyosh' } },
        { label: 'B', visual: { kind: 'picture', item: 'oy' } },
        { label: 'C', visual: { kind: 'picture', item: 'bulut' } },
      ],
      correct: 0,
    },
    {
      id: 'quyon',
      type: 'choose-answer',
      question: 'Uzun quloq, kalta dum, sabzi yeydi. Bu kim?',
      options: [
        { label: 'A', visual: { kind: 'picture', item: 'quyon' } },
        { label: 'B', visual: { kind: 'picture', item: 'tulki' } },
        { label: 'C', visual: { kind: 'picture', item: 'mushuk' } },
      ],
      correct: 0,
    },
    {
      id: 'yomgir',
      type: 'choose-answer',
      question: 'Tomchi-tomchi tushadi, yerni sug‘oradi. Bu nima?',
      options: [
        { label: 'A', visual: { kind: 'picture', item: 'tomchi', label: 'yomg‘ir' } },
        { label: 'B', visual: { kind: 'picture', item: 'qor' } },
        { label: 'C', visual: { kind: 'picture', item: 'quyosh' } },
      ],
      correct: 0,
    },
    {
      id: 'mushuk',
      type: 'choose-answer',
      question: 'Uyda yashaydi, «miyov» deydi, sichqon tutadi. Bu kim?',
      options: [
        { label: 'A', visual: { kind: 'picture', item: 'it' } },
        { label: 'B', visual: { kind: 'picture', item: 'mushuk' } },
        { label: 'C', visual: { kind: 'picture', item: 'sigir' } },
      ],
      correct: 1,
    },
    {
      id: 'oy',
      type: 'choose-answer',
      question: 'Kechasi chiqadi, ba’zan to‘la, ba’zan yarim bo‘ladi. Bu nima?',
      options: [
        { label: 'A', visual: { kind: 'picture', item: 'quyosh' } },
        { label: 'B', visual: { kind: 'picture', item: 'yulduz' } },
        { label: 'C', visual: { kind: 'picture', item: 'oy' } },
      ],
      correct: 2,
      timerSec: 30,
    },
    {
      id: 'belgi',
      type: 'drag-match',
      prompt: 'Belgini javobiga olib boring',
      pairs: [
        {
          item: { label: '«Vov-vov» deydi, uyni qo‘riqlaydi' },
          target: { visual: { kind: 'picture', item: 'it' } },
        },
        {
          item: { label: '«Mo‘-o‘» deydi, sut beradi' },
          target: { visual: { kind: 'picture', item: 'sigir' } },
        },
        {
          item: { label: 'Qizil, shirin, yumaloq meva' },
          target: { visual: { kind: 'picture', item: 'olma' } },
        },
      ],
    },
    {
      id: 'yakun',
      type: 'recap',
      title: 'Bugun o‘rgandik',
      points: ['Topishmoqda **belgilar** aytiladi.', 'Diqqat bilan tinglab, **o‘ylab** javob topamiz.'],
      praise: 'Barakalla, zukko bolalar!',
    },
  ],
});
