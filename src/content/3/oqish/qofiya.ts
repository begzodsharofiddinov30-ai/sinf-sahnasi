// QORALAMA: o'qituvchi tekshirib chiqishi kerak
import { defineLesson } from '../../schema';

export default defineLesson({
  notes: {
    goal: 'O‘quvchilar she’rdagi qofiyalarni topadi va oddiy qofiya tanlaydi.',
    questions: ['Qofiya nima?', 'She’rdagi qofiyalarni toping.', 'O‘zingiz qofiya topa olasizmi?'],
    minutes: 15,
  },
  scenes: [
    {
      id: 'qofiya',
      type: 'explain',
      title: 'Qofiya',
      steps: [
        {
          text: '**Qofiya** — satr oxiridagi **ohangdosh** so‘zlar.',
          visual: { kind: 'mascot', mood: 'happy' },
        },
        {
          text: 'gul — **bul**bul, tog‘ — **bog‘**',
          visual: { kind: 'tiles', items: ['gul — bulbul', 'tog‘ — bog‘'] },
          replace: true,
        },
      ],
    },
    {
      id: 'sher',
      type: 'story',
      title: 'Kuz',
      pages: [
        { text: 'Sarg‘aydi bog‘da **barglar**,', visual: { kind: 'picture', item: 'barg' } },
        { text: 'Qaytdi uyga **turnalar**.', visual: { kind: 'picture', item: 'qush' } },
        { text: 'Yomg‘ir yog‘ar **sim-sim**,', visual: { kind: 'picture', item: 'tomchi' } },
        { text: 'Kuzni kutar **jim-jim**.', visual: { kind: 'mascot', mood: 'think' } },
      ],
      hint: 'Asl she’r.',
    },
    {
      id: 'juft',
      type: 'drag-match',
      prompt: 'Qofiyadosh so‘zni toping',
      pairs: [
        { item: { label: 'tog‘' }, target: { label: 'bog‘' } },
        { item: { label: 'gul' }, target: { label: 'bulbul' } },
        { item: { label: 'sim-sim' }, target: { label: 'jim-jim' } },
        { item: { label: 'quyosh' }, target: { label: 'yosh' } },
      ],
    },
    {
      id: 'qofiya-2',
      type: 'choose-answer',
      question: '“Qor” so‘ziga qaysi so‘z qofiyadosh?',
      options: [{ label: 'bor' }, { label: 'qish' }, { label: 'oq' }],
      correct: 0,
    },
    {
      id: 'fasl',
      type: 'choose-answer',
      question: 'She’r qaysi fasl haqida?',
      options: [{ label: 'Kuz' }, { label: 'Bahor' }, { label: 'Yoz' }],
      correct: 0,
    },
    {
      id: 'yakun',
      type: 'recap',
      title: 'Bugun o‘rgandik',
      points: ['Qofiya — **ohangdosh** so‘zlar.', 'She’r qofiya bilan **musiqiy** bo‘ladi.'],
    },
  ],
});
