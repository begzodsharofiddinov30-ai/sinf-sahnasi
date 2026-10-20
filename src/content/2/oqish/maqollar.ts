// QORALAMA: o'qituvchi tekshirib chiqishi kerak
import { defineLesson } from '../../schema';

export default defineLesson({
  notes: {
    goal: 'O‘quvchilar maqol nima ekanini tushunadi, mashhur maqollarni to‘ldiradi va ma’nosini hayotiy vaziyat bilan bog‘laydi.',
    questions: ['Maqol nima?', 'Qaysi maqollarni bilasiz?', '“Tomchi-tomchi ko‘l bo‘lur” ni qachon aytamiz?'],
    minutes: 15,
  },
  scenes: [
    {
      id: 'nima',
      type: 'explain',
      title: 'Maqol nima?',
      steps: [
        {
          text: '**Maqol** — xalq donoligi: qisqa va ma’noli gap.',
          visual: { kind: 'mascot', mood: 'think' },
        },
        {
          text: 'Masalan: «**Tomchi-tomchi ko‘l bo‘lur.**»',
          visual: { kind: 'picture', item: 'tomchi' },
          replace: true,
        },
        {
          text: 'Ma’nosi: kichik ishlar yig‘ilib, **katta** natija beradi.',
          visual: { kind: 'picture', item: 'suv' },
          replace: true,
        },
      ],
    },
    {
      id: 'toldir',
      type: 'drag-match',
      prompt: 'Maqolni to‘ldiring',
      pairs: [
        { item: { label: 'Mehnat qilsang,' }, target: { label: 'rohat ko‘rasan.' } },
        { item: { label: 'Tomchi-tomchi' }, target: { label: 'ko‘l bo‘lur.' } },
        { item: { label: 'Sabr tagi —' }, target: { label: 'sariq oltin.' } },
        { item: { label: 'Ona yurting —' }, target: { label: 'oltin beshiging.' } },
      ],
      retryHint: 'Maqolni ovoz chiqarib o‘qing — qaysi davomi mos?',
    },
    {
      id: 'hunar',
      type: 'choose-answer',
      question: '«Bir yigitga yetmish hunar oz.» Bu maqol nima haqida?',
      options: [{ label: 'Ko‘p narsani o‘rganish kerak' }, { label: 'Yigitlar ko‘p' }, { label: 'Hunar kerak emas' }],
      correct: 0,
    },
    {
      id: 'mehnat',
      type: 'choose-answer',
      question: 'Qaysi maqol **mehnat** haqida?',
      options: [
        { label: 'Mehnat qilsang, rohat ko‘rasan.' },
        { label: 'Ona yurting — oltin beshiging.' },
        { label: 'Sabr tagi — sariq oltin.' },
      ],
      correct: 0,
    },
    {
      id: 'aziz',
      type: 'story',
      title: 'Azizning so‘zlari',
      pages: [
        { text: 'Aziz har kuni **bitta** yangi so‘z yod oldi.', visual: { kind: 'picture', item: 'kitob' } },
        {
          text: 'Bir yildan keyin u **yuzlab** so‘z biladigan bo‘ldi!',
          visual: { kind: 'mascot', mood: 'cheer' },
        },
      ],
    },
    {
      id: 'mos',
      type: 'choose-answer',
      question: 'Aziz haqidagi hikoyaga qaysi maqol mos?',
      options: [{ label: 'Tomchi-tomchi ko‘l bo‘lur.' }, { label: 'Sabr tagi — sariq oltin.' }],
      correct: 0,
    },
    {
      id: 'yakun',
      type: 'recap',
      title: 'Bugun o‘rgandik',
      points: ['**Maqol** — xalq donoligi.', 'Maqolni hayotdagi **voqea** bilan bog‘laymiz.'],
    },
  ],
});
