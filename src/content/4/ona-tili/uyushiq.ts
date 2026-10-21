// QORALAMA: o'qituvchi tekshirib chiqishi kerak
import { defineLesson } from '../../schema';

export default defineLesson({
  notes: {
    goal: 'O‘quvchilar uyushiq bo‘laklarni topadi va ular orasida vergulni to‘g‘ri qo‘yadi.',
    questions: ['Uyushiq bo‘laklar nima?', 'Ular orasiga qanday belgi qo‘yiladi?', '“va” dan oldin vergul qo‘yiladimi?'],
    minutes: 20,
  },
  scenes: [
    {
      id: 'qoida',
      type: 'explain',
      title: 'Uyushiq bo‘laklar',
      steps: [
        {
          text: 'Bir xil so‘roqqa javob beradigan bo‘laklar — **uyushiq**.',
          visual: { kind: 'mascot', mood: 'think' },
        },
        {
          text: '«Bog‘da **olma, nok, o‘rik** pishdi.»',
          visual: { kind: 'tiles', items: ['olma,', 'nok,', 'o‘rik'] },
          replace: true,
        },
        {
          text: '**va** bilan bog‘lansa, vergul qo‘yilmaydi: olma **va** nok.',
          visual: { kind: 'tiles', items: ['olma', 'va', 'nok'] },
          replace: true,
        },
      ],
    },
    {
      id: 'vergul',
      type: 'choose-answer',
      question: 'Qaysi gapda vergul to‘g‘ri?',
      options: [
        { label: 'Men qalam, daftar, kitob oldim.' },
        { label: 'Men qalam daftar, kitob oldim.' },
        { label: 'Men, qalam daftar kitob oldim.' },
      ],
      correct: 0,
    },
    {
      id: 'va',
      type: 'choose-answer',
      question: '«Aziz va Sardor keldi.» “va” oldidan vergul kerakmi?',
      options: [{ label: 'Yo‘q' }, { label: 'Ha' }],
      correct: 0,
    },
    {
      id: 'topish',
      type: 'choose-answer',
      question: '«Bolalar yugurishdi, sakrashdi, kulishdi.» Uyushiq bo‘laklar?',
      options: [{ label: 'yugurishdi, sakrashdi, kulishdi' }, { label: 'Bolalar' }, { label: 'faqat kulishdi' }],
      correct: 0,
    },
    {
      id: 'gap',
      type: 'build-word',
      prompt: 'Gapni to‘g‘ri tuzing',
      word: 'Bozordan olma, nok, uzum oldik.',
      tiles: ['Bozordan ', 'olma, ', 'nok, ', 'uzum ', 'oldik.'],
    },
    {
      id: 'yakun',
      type: 'recap',
      title: 'Bugun o‘rgandik',
      points: [
        'Uyushiq bo‘laklar **bir xil so‘roqqa** javob beradi.',
        'Ular orasiga **vergul**; **va** dan oldin vergul yo‘q.',
      ],
    },
  ],
});
