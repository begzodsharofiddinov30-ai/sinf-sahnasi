// QORALAMA: o'qituvchi tekshirib chiqishi kerak
import { defineLesson } from '../../schema';

export default defineLesson({
  notes: {
    goal: 'O‘quvchilar matnning asosiy voqealarini qisqa qilib qayta hikoyalaydi.',
    questions: [
      'Qisqa hikoyalashda nima aytiladi?',
      'Qaysi tafsilotni tashlab yuborish mumkin?',
      'Matnni 3 gapda ayting.',
    ],
    minutes: 15,
  },
  scenes: [
    {
      id: 'matn',
      type: 'story',
      title: 'Yo‘qolgan kalit',
      pages: [
        {
          text: 'Bir kuni Bobur maktabdan qaytayotib **kalitini** yo‘qotib qo‘ydi.',
          visual: { kind: 'mascot', mood: 'think' },
        },
        {
          text: 'U yo‘l bo‘ylab **qaytib**, diqqat bilan qidirdi.',
          visual: { kind: 'mascot', mood: 'think' },
        },
        {
          text: 'Do‘sti **Sevara** kalitni maktab hovlisida topib oldi.',
          visual: { kind: 'mascot', mood: 'happy' },
        },
        { text: 'Bobur unga **rahmat** aytdi.', visual: { kind: 'mascot', mood: 'cheer' } },
      ],
    },
    {
      id: 'qisqa',
      type: 'choose-answer',
      question: 'Eng yaxshi qisqa hikoya?',
      options: [
        { label: 'Bobur kalitini yo‘qotdi, Sevara uni topib berdi.' },
        { label: 'Bobur maktabdan qaytdi.' },
        { label: 'Kalit temirdan edi.' },
      ],
      correct: 0,
    },
    {
      id: 'tartib',
      type: 'drag-match',
      prompt: 'Asosiy voqealarni tartiblang',
      pairs: [
        { item: { label: 'Kalit yo‘qoldi' }, target: { label: '1' } },
        { item: { label: 'Bobur qidirdi' }, target: { label: '2' } },
        { item: { label: 'Sevara topdi' }, target: { label: '3' } },
      ],
    },
    {
      id: 'kerakmas',
      type: 'choose-answer',
      question: 'Qisqa hikoyada nimani aytmasa ham bo‘ladi?',
      options: [{ label: 'Mayda tafsilotlarni' }, { label: 'Asosiy voqeani' }, { label: 'Qahramonni' }],
      correct: 0,
    },
    {
      id: 'kim',
      type: 'choose-answer',
      question: 'Kalitni kim topib berdi?',
      options: [{ label: 'Sevara' }, { label: 'Bobur' }, { label: 'O‘qituvchi' }],
      correct: 0,
    },
    {
      id: 'yakun',
      type: 'recap',
      title: 'Bugun o‘rgandik',
      points: ['Qisqacha hikoyada **asosiy** voqealar aytiladi.', '**Kim? Nima bo‘ldi? Qanday tugadi?**'],
    },
  ],
});
