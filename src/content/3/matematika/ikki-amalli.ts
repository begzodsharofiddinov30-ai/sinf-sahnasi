// QORALAMA: o'qituvchi tekshirib chiqishi kerak
import { defineLesson } from '../../schema';

export default defineLesson({
  notes: {
    goal: 'O‘quvchilar ikki amalli masalani rejalashtiradi va bosqichma-bosqich yechadi.',
    questions: ['Masalani yechish uchun nechta amal kerak?', 'Avval nimani topamiz?', 'Javobni qanday tekshiramiz?'],
    minutes: 20,
  },
  scenes: [
    {
      id: 'masala',
      type: 'story',
      title: 'Masala',
      pages: [
        {
          text: 'Do‘konda **3** quti olma bor, har birida **8** tadan.',
          visual: { kind: 'groups', item: 'olma', groups: 3, each: 8 },
        },
        { text: 'Ulardan **5** ta olma sotildi.', visual: { kind: 'mascot', mood: 'think' } },
        { text: 'Nechta olma qoldi?', visual: { kind: 'mascot', mood: 'think' } },
      ],
    },
    {
      id: 'reja',
      type: 'explain',
      title: 'Yechish rejasi',
      steps: [
        { text: '**1.** Jami olma: 3 × 8 = **24**', visual: { kind: 'tiles', items: ['3 × 8 = 24'] } },
        { text: '**2.** Qoldi: 24 − 5 = **19**', visual: { kind: 'tiles', items: ['24 − 5 = 19'] } },
      ],
    },
    {
      id: 'birinchi',
      type: 'choose-answer',
      question: 'Bu masalada avval nimani topdik?',
      options: [{ label: 'Jami olmalarni' }, { label: 'Sotilganlarni' }, { label: 'Qutilarni' }],
      correct: 0,
    },
    {
      id: 'masala2',
      type: 'choose-answer',
      question: '4 ta qatorda 6 tadan stul. 10 ta stul olib ketildi. Nechta qoldi?',
      options: [{ label: '14' }, { label: '24' }, { label: '10' }],
      correct: 0,
      timerSec: 60,
    },
    {
      id: 'masala3',
      type: 'choose-answer',
      question: 'Aziz 2 ta daftar (3000 so‘mdan) va 1 ta qalam (2000 so‘m) oldi. Hammasi?',
      options: [{ label: '8000 so‘m' }, { label: '5000 so‘m' }, { label: '6000 so‘m' }],
      correct: 0,
    },
    {
      id: 'yakun',
      type: 'recap',
      title: 'Bugun o‘rgandik',
      points: ['Murakkab masalani **bosqichlarga** bo‘lamiz.', 'Har bosqich — **bitta amal**.'],
    },
  ],
});
