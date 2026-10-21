// QORALAMA: o'qituvchi tekshirib chiqishi kerak
import { defineLesson } from '../../schema';

export default defineLesson({
  notes: {
    goal: 'O‘quvchilar hikoya boshlanishini o‘qib, mantiqiy davomini tanlaydi va o‘zi aytadi.',
    questions: ['Hikoya qanday boshlandi?', 'Keyin nima bo‘lishi mumkin?', 'Sizning yakuningiz qanday?'],
    minutes: 15,
  },
  scenes: [
    {
      id: 'bosh',
      type: 'story',
      title: 'Yo‘qolgan mushukcha',
      pages: [
        {
          text: 'Malikaning **Paxmoq** degan mushukchasi bor edi.',
          visual: { kind: 'picture', item: 'mushuk' },
        },
        { text: 'Bir kuni Paxmoq **ko‘rinmay** qoldi.', visual: { kind: 'mascot', mood: 'think' } },
        { text: 'Malika uni hovlida, bog‘da **qidirdi**…', visual: { kind: 'mascot', mood: 'think' } },
      ],
      hint: 'Bolalar o‘z yakunini og‘zaki aytsin.',
    },
    {
      id: 'davom',
      type: 'choose-answer',
      question: 'Qaysi davom mantiqiy?',
      options: [
        { label: 'Malika uni daraxt tagida topdi' },
        { label: 'Mushuk uchib ketdi' },
        { label: 'Malika qidirmadi' },
      ],
      correct: 0,
    },
    {
      id: 'his',
      type: 'choose-answer',
      question: 'Malika mushukni topganda o‘zini qanday his qildi?',
      options: [{ label: 'Xursand bo‘ldi' }, { label: 'Jahli chiqdi' }],
      correct: 0,
    },
    {
      id: 'tartib',
      type: 'drag-match',
      prompt: 'Voqealarni tartibga qo‘ying',
      pairs: [
        { item: { label: 'Mushuk yo‘qoldi' }, target: { label: '1' } },
        { item: { label: 'Malika qidirdi' }, target: { label: '2' } },
        { item: { label: 'Mushuk topildi' }, target: { label: '3' } },
      ],
    },
    {
      id: 'nom',
      type: 'choose-answer',
      question: 'Hikoyaga yaxshi nom?',
      options: [{ label: 'Yo‘qolgan mushukcha' }, { label: 'Qishki o‘yin' }, { label: 'Mening maktabim' }],
      correct: 0,
    },
    {
      id: 'yakun',
      type: 'recap',
      title: 'Bugun o‘rgandik',
      points: ['Hikoya: **boshlanish, voqea, yakun**.', 'Davomi **mantiqiy** bo‘lishi kerak.'],
    },
  ],
});
