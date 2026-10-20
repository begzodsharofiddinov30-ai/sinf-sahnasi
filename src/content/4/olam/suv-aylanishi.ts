// QORALAMA: o'qituvchi tekshirib chiqishi kerak
import { defineLesson } from '../../schema';

export default defineLesson({
  notes: {
    goal: 'O‘quvchilar suvning bug‘lanish, bulut hosil bo‘lishi va yog‘in orqali aylanishini tushuntiradi.',
    questions: [
      'Ko‘lmak suvi quyoshda qayerga yo‘qoladi?',
      'Bulut nimadan hosil bo‘ladi?',
      'Nima uchun suvni tejash kerak?',
    ],
    minutes: 20,
  },
  scenes: [
    {
      id: 'hikoya',
      type: 'story',
      title: 'Tomchining sayohati',
      pages: [
        { text: 'Kichkina tomchi **daryo**da yashardi.', visual: { kind: 'picture', item: 'suv' } },
        { text: '**Quyosh** isitdi va tomchi bug‘ga aylanib, osmonga ko‘tarildi. Bu — **bug‘lanish**.', visual: { kind: 'picture', item: 'quyosh' } },
        { text: 'Yuqorida havo sovuq. Bug‘ mayda tomchilarga aylanib, **bulut** hosil bo‘ldi.', visual: { kind: 'picture', item: 'bulut' } },
        { text: 'Tomchilar og‘irlashib, **yomg‘ir** bo‘lib yerga tushdi.', visual: { kind: 'picture', item: 'tomchi' } },
        { text: 'Yomg‘ir suvi yana **daryo**ga oqib keldi. Sayohat qaytadan boshlanadi!', visual: { kind: 'picture', item: 'suv' } },
      ],
      hint: 'Har sahifadan keyin “Keyin nima bo‘ladi?” deb so‘rang.',
    },
    {
      id: 'aylana',
      type: 'explain',
      title: 'Suvning aylanishi',
      steps: [
        { text: '**Bug‘lanish**: quyosh suvni isitadi.', visual: { kind: 'tiles', items: ['Bug‘lanish'] } },
        { text: '**Bulut**: bug‘ soviydi.', visual: { kind: 'tiles', items: ['→', 'Bulut'] } },
        { text: '**Yog‘in**: yomg‘ir yoki qor yog‘adi.', visual: { kind: 'tiles', items: ['→', 'Yog‘in'] } },
        { text: '**To‘planish**: suv daryo va ko‘llarga yig‘iladi.', visual: { kind: 'tiles', items: ['→', 'Daryo'] } },
      ],
    },
    {
      id: 'bosqichlar',
      type: 'drag-match',
      prompt: 'Bosqichni tavsifiga olib boring',
      pairs: [
        { item: { label: 'Bug‘lanish' }, target: { label: 'Suv isib, bug‘ga aylanadi' } },
        { item: { label: 'Bulut hosil bo‘lishi' }, target: { label: 'Bug‘ sovib, mayda tomchilarga aylanadi' } },
        { item: { label: 'Yog‘in' }, target: { label: 'Yomg‘ir yoki qor yog‘adi' } },
        { item: { label: 'To‘planish' }, target: { label: 'Suv daryo va ko‘llarga yig‘iladi' } },
      ],
    },
    {
      id: 'holatlar',
      type: 'sort-groups',
      prompt: 'Suv qaysi holatda?',
      groups: [
        { label: 'Qattiq', visual: { kind: 'picture', item: 'muz' } },
        { label: 'Suyuq', visual: { kind: 'picture', item: 'tomchi' } },
        { label: 'Gaz (bug‘)', visual: { kind: 'picture', item: 'choynak' } },
      ],
      items: [
        { label: 'Muz', group: 0 },
        { label: 'Yomg‘ir', group: 1 },
        { label: 'Choynakdan chiqqan bug‘', group: 2 },
        { label: 'Qor', group: 0 },
        { label: 'Daryo suvi', group: 1 },
      ],
      retryHint: 'Uni qo‘lda ushlab bo‘ladimi? Oqadimi? Yoki havoga uchadimi?',
    },
    {
      id: 'bulut-nima',
      type: 'choose-answer',
      question: 'Bulut nimadan iborat?',
      visual: { kind: 'picture', item: 'bulut' },
      options: [{ label: 'Mayda suv tomchilaridan' }, { label: 'Tutundan' }, { label: 'Paxtadan' }],
      correct: 0,
    },
    {
      id: 'tejash',
      type: 'choose-answer',
      question: 'Nima uchun suvni **tejash** kerak?',
      options: [{ label: 'Toza ichimlik suvi cheksiz emas' }, { label: 'Suv hech qachon tugamaydi' }, { label: 'Suvning foydasi yo‘q' }],
      correct: 0,
      hint: 'Uyda suvni qanday tejash mumkinligini muhokama qiling.',
    },
    {
      id: 'yakun',
      type: 'recap',
      title: 'Bugun o‘rgandik',
      points: ['Suv **bug‘lanadi**, **bulut** bo‘ladi, **yog‘in** bo‘lib tushadi.', 'Suv qattiq, suyuq va gaz holatida bo‘ladi.', 'Toza suvni **tejaymiz**.'],
    },
  ],
});
