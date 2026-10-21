// QORALAMA: o'qituvchi tekshirib chiqishi kerak
import { defineLesson } from '../../schema';

export default defineLesson({
  notes: {
    goal: 'O‘quvchilar Vatan haqidagi she’rni ifodali o‘qiydi va asosiy his-tuyg‘uni aniqlaydi.',
    questions: ['She’rda nimalar tasvirlangan?', 'Vatan deganda nimani tushunasiz?', 'She’rni qanday ohangda o‘qiymiz?'],
    minutes: 15,
  },
  scenes: [
    {
      id: 'sher',
      type: 'story',
      title: 'Vatanim',
      pages: [
        { text: 'Tog‘lari baland, **dalasi** keng,', visual: { kind: 'picture', item: 'daraxt' } },
        { text: 'Bog‘lari gulzor, **anori** teng.', visual: { kind: 'picture', item: 'anor' } },
        { text: 'Osmoni moviy, **quyoshi** porloq —', visual: { kind: 'picture', item: 'quyosh' } },
        { text: '**Vatanim** mening — eng aziz tuproq!', visual: { kind: 'mascot', mood: 'cheer' } },
      ],
      hint: 'Asl she’r.',
    },
    {
      id: 'mavzu',
      type: 'choose-answer',
      question: 'She’r nima haqida?',
      options: [{ label: 'Vatan haqida' }, { label: 'Qish haqida' }, { label: 'Mushuk haqida' }],
      correct: 0,
    },
    {
      id: 'qofiya',
      type: 'drag-match',
      prompt: 'Ohangdosh so‘zini toping',
      pairs: [
        { item: { label: 'keng' }, target: { label: 'teng' } },
        { item: { label: 'porloq' }, target: { label: 'tuproq' } },
      ],
    },
    {
      id: 'his',
      type: 'choose-answer',
      question: 'She’rdagi his-tuyg‘u qanday?',
      options: [{ label: 'Faxr va mehr' }, { label: 'Qo‘rquv' }, { label: 'Zerikish' }],
      correct: 0,
    },
    {
      id: 'sherda',
      type: 'sort-groups',
      prompt: 'She’rda tilga olinganmi?',
      groups: [{ label: 'Bor' }, { label: 'Yo‘q' }],
      items: [
        { label: 'tog‘lar', group: 0 },
        { label: 'anor', group: 0 },
        { label: 'dengiz', group: 1 },
        { label: 'quyosh', group: 0 },
        { label: 'qor', group: 1 },
      ],
    },
    {
      id: 'yakun',
      type: 'recap',
      title: 'Bugun o‘rgandik',
      points: ['She’r **ohangdosh** so‘zlar bilan yoziladi.', 'Vatanni **sevamiz** va asraymiz.'],
    },
  ],
});
