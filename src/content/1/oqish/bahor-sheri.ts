// QORALAMA: o'qituvchi tekshirib chiqishi kerak
import { defineLesson } from '../../schema';

export default defineLesson({
  notes: {
    goal: 'O‘quvchilar kichik she’rni ifodali o‘qiydi va unda tasvirlangan bahor belgilarini topadi.',
    questions: [
      'She’rda qaysi fasl haqida aytilgan?',
      'Bahorning qanday belgilarini bilasiz?',
      'She’rni qanday ovozda o‘qiymiz?',
    ],
    minutes: 15,
  },
  scenes: [
    {
      id: 'sher',
      type: 'story',
      title: 'Bahor keldi',
      pages: [
        { text: 'Bahor keldi, **quyosh** kuldi,', visual: { kind: 'picture', item: 'quyosh' } },
        { text: 'Qorlar erib, **ariq** to‘ldi.', visual: { kind: 'picture', item: 'suv' } },
        { text: '**Gul**lar ochdi bog‘ida,', visual: { kind: 'picture', item: 'gul' } },
        { text: '**Qush**lar qaytdi chog‘ida.', visual: { kind: 'picture', item: 'qush' } },
      ],
      hint: 'She’r shu dastur uchun yozilgan (asl matn).',
    },
    {
      id: 'fasl',
      type: 'choose-answer',
      question: 'She’r qaysi fasl haqida?',
      options: [{ label: 'Bahor' }, { label: 'Qish' }, { label: 'Kuz' }],
      correct: 0,
    },
    {
      id: 'belgilar',
      type: 'sort-groups',
      prompt: 'She’rda bormi?',
      groups: [{ label: 'Bor' }, { label: 'Yo‘q' }],
      items: [
        { label: 'quyosh', visual: { kind: 'picture', item: 'quyosh' }, group: 0 },
        { label: 'gul', visual: { kind: 'picture', item: 'gul' }, group: 0 },
        { label: 'qor odam', visual: { kind: 'picture', item: 'qor' }, group: 1 },
        { label: 'qush', visual: { kind: 'picture', item: 'qush' }, group: 0 },
        { label: 'barg to‘kilishi', visual: { kind: 'picture', item: 'barg' }, group: 1 },
      ],
    },
    {
      id: 'qofiya',
      type: 'drag-match',
      prompt: 'Ohangdosh so‘zini toping',
      pairs: [
        { item: { label: 'kuldi' }, target: { label: 'to‘ldi' } },
        { item: { label: 'bog‘ida' }, target: { label: 'chog‘ida' } },
      ],
    },
    {
      id: 'ovoz',
      type: 'choose-answer',
      question: 'She’rni qanday ovozda o‘qiymiz?',
      options: [{ label: 'Quvnoq' }, { label: 'Xafa' }, { label: 'Qo‘rqib' }],
      correct: 0,
    },
    {
      id: 'yakun',
      type: 'recap',
      title: 'Bugun o‘rgandik',
      points: ['She’r **ohangdosh** so‘zlar bilan chiroyli bo‘ladi.', 'Bahorda quyosh isitadi, gullar ochiladi.'],
    },
  ],
});
