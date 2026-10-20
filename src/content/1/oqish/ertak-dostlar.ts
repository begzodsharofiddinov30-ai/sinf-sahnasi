// QORALAMA: o'qituvchi tekshirib chiqishi kerak
import { defineLesson } from '../../schema';

export default defineLesson({
  notes: {
    goal: 'O‘quvchilar ertakni tinglab, qahramonlarni va voqealar ketma-ketligini aytadi, do‘stlik haqida xulosa chiqaradi.',
    questions: [
      'Ertak qahramonlari kimlar?',
      'Bo‘tajon qanday yordam berdi?',
      'Siz do‘stingizga qanday yordam bergansiz?',
    ],
    minutes: 15,
  },
  scenes: [
    {
      id: 'ertak',
      type: 'story',
      title: 'Bo‘tajon va quyoncha',
      pages: [
        {
          text: 'Bir bor ekan, bir yo‘q ekan, **Bo‘tajon** ismli kichkina tuyacha bor ekan.',
          visual: { kind: 'mascot', mood: 'happy' },
        },
        {
          text: 'Bir kuni u daryo bo‘yida yig‘layotgan **quyoncha**ni ko‘ribdi.',
          visual: { kind: 'picture', item: 'quyon' },
        },
        {
          text: '— Nega yig‘layapsan? — debdi Bo‘tajon. — Uyimga yo‘l topolmayapman, — debdi quyoncha.',
          visual: { kind: 'mascot', mood: 'think' },
        },
        {
          text: 'Bo‘tajon quyonchani **o‘rkachi**ga mindirib, uyiga olib boribdi.',
          visual: { kind: 'mascot', mood: 'cheer' },
        },
        {
          text: 'Shundan beri ular eng yaqin **do‘st** bo‘lib qolishibdi.',
          visual: { kind: 'mascot', mood: 'happy' },
        },
      ],
      hint: 'Har sahifadan keyin to‘xtab, “Keyin nima bo‘ladi?” deb so‘rang.',
    },
    {
      id: 'qahramon',
      type: 'choose-answer',
      question: 'Ertakning bosh qahramoni kim?',
      options: [{ label: 'Bo‘tajon' }, { label: 'Tulki' }, { label: 'Sigir' }],
      correct: 0,
    },
    {
      id: 'nega',
      type: 'choose-answer',
      question: 'Quyoncha nega yig‘layotgan edi?',
      options: [{ label: 'Uyiga yo‘l topolmadi' }, { label: 'Ovqat yemadi' }, { label: 'Uxlagisi keldi' }],
      correct: 0,
    },
    {
      id: 'kimlar',
      type: 'sort-groups',
      prompt: 'Ertakda kimlar bor edi?',
      groups: [{ label: 'Ertakda bor' }, { label: 'Ertakda yo‘q' }],
      items: [
        { label: 'quyoncha', visual: { kind: 'picture', item: 'quyon' }, group: 0 },
        { label: 'tuyacha', visual: { kind: 'mascot', mood: 'happy' }, group: 0 },
        { label: 'tulki', visual: { kind: 'picture', item: 'tulki' }, group: 1 },
        { label: 'sigir', visual: { kind: 'picture', item: 'sigir' }, group: 1 },
        { label: 'mushuk', visual: { kind: 'picture', item: 'mushuk' }, group: 1 },
      ],
    },
    {
      id: 'tartib',
      type: 'drag-match',
      prompt: 'Voqealarni tartib raqamiga olib boring',
      pairs: [
        { item: { label: 'Bo‘tajon quyonchani ko‘rdi' }, target: { label: '1' } },
        { item: { label: 'Quyoncha yo‘lini yo‘qotganini aytdi' }, target: { label: '2' } },
        { item: { label: 'Bo‘tajon uni uyiga olib bordi' }, target: { label: '3' } },
      ],
    },
    {
      id: 'qanday',
      type: 'choose-answer',
      question: 'Bo‘tajon qanday tuyacha?',
      options: [{ label: 'Mehribon' }, { label: 'Yalqov' }, { label: 'Qo‘rqoq' }],
      correct: 0,
      explanation: 'U do‘stiga yordam berdi.',
    },
    {
      id: 'yakun',
      type: 'recap',
      title: 'Bugun o‘rgandik',
      points: ['Yaxshi do‘st qiyin paytda **yordam** beradi.', 'Ertakda voqealar **ketma-ket** bo‘ladi.'],
    },
  ],
});
