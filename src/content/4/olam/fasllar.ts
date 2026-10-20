// QORALAMA: o'qituvchi tekshirib chiqishi kerak
import { defineLesson } from '../../schema';

export default defineLesson({
  notes: {
    goal: 'O‘quvchilar to‘rt faslni va har birining tabiatdagi belgilarini ayta oladi.',
    questions: [
      'Hozir qaysi fasl? Buni qanday bildingiz?',
      'Qaysi faslda daraxtlar barg to‘kadi?',
      'Sizga qaysi fasl yoqadi va nima uchun?',
    ],
    minutes: 15,
  },
  scenes: [
    {
      id: 'tort-fasl',
      type: 'story',
      title: 'To‘rt fasl',
      pages: [
        { text: 'Yilda **to‘rt** fasl bor: bahor, yoz, kuz va qish.', visual: { kind: 'tiles', items: ['Bahor', 'Yoz', 'Kuz', 'Qish'] } },
        { text: '**Bahor**da daraxtlar gullaydi, qushlar qaytib keladi.', visual: { kind: 'picture', item: 'gul' } },
        { text: '**Yoz**da quyosh qizdiradi, mevalar pishadi.', visual: { kind: 'picture', item: 'quyosh' } },
        { text: '**Kuz**da barglar sarg‘ayib to‘kiladi.', visual: { kind: 'picture', item: 'barg' } },
        { text: '**Qish**da qor yog‘adi, kunlar qisqa bo‘ladi.', visual: { kind: 'picture', item: 'qor' } },
      ],
    },
    {
      id: 'belgilar',
      type: 'drag-match',
      prompt: 'Belgini o‘z fasliga olib boring',
      pairs: [
        { item: { label: 'qor', visual: { kind: 'picture', item: 'qor' } }, target: { label: 'Qish' } },
        { item: { label: 'barg', visual: { kind: 'picture', item: 'barg' } }, target: { label: 'Kuz' } },
        { item: { label: 'gul', visual: { kind: 'picture', item: 'gul' } }, target: { label: 'Bahor' } },
        { item: { label: 'quyosh', visual: { kind: 'picture', item: 'quyosh' } }, target: { label: 'Yoz' } },
      ],
      retryHint: 'Bu narsani yilning qaysi paytida ko‘p ko‘ramiz?',
    },
    {
      id: 'uzun-kun',
      type: 'choose-answer',
      question: 'Qaysi faslda kunlar eng **uzun**?',
      options: [{ label: 'Bahor' }, { label: 'Yoz' }, { label: 'Kuz' }, { label: 'Qish' }],
      correct: 1,
      explanation: 'Yozda quyosh erta chiqib, kech botadi.',
      retryHint: 'Qachon kech soatgacha yorug‘ bo‘ladi?',
    },
    {
      id: 'issiq-sovuq',
      type: 'sort-groups',
      prompt: 'Qaysi biri yozda, qaysi biri qishda bo‘ladi?',
      groups: [
        { label: 'Yoz', visual: { kind: 'picture', item: 'quyosh' } },
        { label: 'Qish', visual: { kind: 'picture', item: 'qor' } },
      ],
      items: [
        { label: 'Daryoda suzish', group: 0 },
        { label: 'Qor odam yasash', group: 1 },
        { label: 'Tarvuz pishadi', group: 0 },
        { label: 'Issiq qo‘lqop', group: 1 },
        { label: 'Chana uchish', group: 1 },
        { label: 'Yozgi ta’til', group: 0 },
      ],
    },
    {
      id: 'nega',
      type: 'explain',
      title: 'Nega fasllar almashadi?',
      steps: [
        { text: 'Yer **Quyosh** atrofida aylanadi.', visual: { kind: 'picture', item: 'quyosh' } },
        { text: 'Bir to‘liq aylanish — **bir yil**.', visual: { kind: 'tiles', items: ['12 oy', '=', '1 yil'] }, replace: true },
        { text: 'Har faslda **3** oy bor.', visual: { kind: 'tiles', items: ['4 fasl', '×', '3 oy', '=', '12 oy'] }, replace: true },
      ],
      hint: 'To‘p va chiroq bilan Yerning aylanishini ko‘rsatish mumkin.',
    },
    {
      id: 'kuzdan-keyin',
      type: 'choose-answer',
      question: 'Kuzdan keyin qaysi fasl keladi?',
      options: [{ label: 'Qish' }, { label: 'Bahor' }, { label: 'Yoz' }],
      correct: 0,
      timerSec: 20,
    },
    {
      id: 'oylar',
      type: 'sort-groups',
      prompt: 'Oylarni fasllarga ajrating',
      groups: [{ label: 'Bahor' }, { label: 'Yoz' }, { label: 'Kuz' }],
      items: [
        { label: 'Mart', group: 0 },
        { label: 'Iyul', group: 1 },
        { label: 'Oktabr', group: 2 },
        { label: 'Aprel', group: 0 },
        { label: 'Avgust', group: 1 },
        { label: 'Sentabr', group: 2 },
        { label: 'May', group: 0 },
        { label: 'Iyun', group: 1 },
        { label: 'Noyabr', group: 2 },
      ],
      hint: 'Qish oylari (dekabr, yanvar, fevral) ataylab qo‘shilmagan — og‘zaki so‘rang.',
    },
    {
      id: 'yakun',
      type: 'recap',
      title: 'Bugun o‘rgandik',
      points: ['Yilda **4** fasl bor.', 'Har faslda **3** oy.', 'Fasllar ketma-ket almashadi: bahor → yoz → kuz → qish.'],
    },
  ],
});
