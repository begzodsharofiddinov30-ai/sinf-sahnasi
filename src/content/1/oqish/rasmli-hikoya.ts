// QORALAMA: o'qituvchi tekshirib chiqishi kerak
import { defineLesson } from '../../schema';

export default defineLesson({
  notes: {
    goal: 'O‘quvchilar rasmlarni to‘g‘ri tartibda joylashtirib, ular asosida qisqa hikoya aytadi.',
    questions: ['Birinchi rasmda nima bor?', 'Keyin nima bo‘ldi?', 'Hikoyaga qanday nom beramiz?'],
    minutes: 15,
  },
  scenes: [
    {
      id: 'rasmlar',
      type: 'story',
      title: 'Daraxt qanday o‘sdi',
      pages: [
        { text: 'Bola yerga **urug‘** ekdi.', visual: { kind: 'picture', item: 'barg' } },
        { text: 'Unga **suv** quydi.', visual: { kind: 'picture', item: 'suv' } },
        { text: '**Quyosh** isitdi.', visual: { kind: 'picture', item: 'quyosh' } },
        { text: 'Katta **daraxt** o‘sdi!', visual: { kind: 'picture', item: 'daraxt' } },
      ],
    },
    {
      id: 'tartib',
      type: 'drag-match',
      prompt: 'Rasmni tartib raqamiga olib boring',
      pairs: [
        { item: { visual: { kind: 'picture', item: 'barg' } }, target: { label: '1' } },
        { item: { visual: { kind: 'picture', item: 'suv' } }, target: { label: '2' } },
        { item: { visual: { kind: 'picture', item: 'daraxt' } }, target: { label: '3' } },
      ],
    },
    {
      id: 'nom',
      type: 'choose-answer',
      question: 'Hikoyaga qaysi nom mos?',
      options: [{ label: 'Daraxt qanday o‘sdi' }, { label: 'Qishki o‘yin' }, { label: 'Mening mushugim' }],
      correct: 0,
    },
    {
      id: 'kerak',
      type: 'choose-answer',
      question: 'Daraxt o‘sishi uchun nima kerak?',
      options: [{ label: 'Suv va quyosh' }, { label: 'Faqat qor' }, { label: 'Hech narsa' }],
      correct: 0,
    },
    {
      id: 'birinchi',
      type: 'choose-answer',
      question: 'Bola eng avval nima qildi?',
      options: [{ label: 'Urug‘ ekdi' }, { label: 'Meva terdi' }, { label: 'Suv quydi' }],
      correct: 0,
    },
    {
      id: 'yakun',
      type: 'recap',
      title: 'Bugun o‘rgandik',
      points: ['Rasmlarni **tartib** bilan qo‘yamiz.', 'Har rasmga **bitta gap** aytamiz.'],
    },
  ],
});
