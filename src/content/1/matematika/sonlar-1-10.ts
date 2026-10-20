// QORALAMA: o'qituvchi tekshirib chiqishi kerak
import { defineLesson } from '../../schema';

export default defineLesson({
  notes: {
    goal: 'O‘quvchilar 1 dan 10 gacha narsalarni sanaydi va sonni raqam bilan bog‘laydi.',
    questions: [
      'Sinfimizda nechta deraza bor? Keling, birga sanaymiz.',
      'Qo‘lingizda nechta barmoq bor?',
      'Oxirgi sanagan son nimani bildiradi?',
    ],
    minutes: 15,
  },
  scenes: [
    {
      id: 'salom',
      type: 'explain',
      title: 'Keling, sanaymiz!',
      steps: [
        { text: 'Salom! Mening ismim **Bo‘tajon**.', visual: { kind: 'mascot', mood: 'happy' } },
        { text: 'Bugun narsalarni **sanashni** o‘rganamiz.', visual: { kind: 'items', item: 'olma', count: 3 } },
      ],
      hint: 'Bolalardan maskotga salom berishlarini so‘rang.',
    },
    {
      id: 'bir-ikki-uch',
      type: 'explain',
      title: '1, 2, 3',
      steps: [
        { text: 'Bitta olma — **bir**.', visual: { kind: 'items', item: 'olma', count: 1 }, replace: true },
        { text: 'Raqam bilan **1** deb yozamiz.', visual: { kind: 'number', value: 1 } },
        { text: 'Ikkita nok — **ikki**.', visual: { kind: 'items', item: 'nok', count: 2 }, replace: true },
        { text: 'Raqam bilan **2** deb yozamiz.', visual: { kind: 'number', value: 2 } },
        { text: 'Uchta anor — **uch**.', visual: { kind: 'items', item: 'anor', count: 3 }, replace: true },
        { text: 'Raqam bilan **3** deb yozamiz.', visual: { kind: 'number', value: 3 } },
      ],
      hint: 'Har bir raqamni barmoq bilan havoda chizdiring.',
    },
    {
      id: 'yulduzlar',
      type: 'count-and-tap',
      prompt: 'Yulduzchalarni bittadan bosib sanang!',
      item: 'yulduz',
      count: 4,
      layout: 'row',
      hint: 'Bitta o‘quvchini doskaga chiqaring, qolganlar ovoz chiqarib sanasin.',
    },
    {
      id: 'besh',
      type: 'explain',
      title: 'Besh',
      steps: [
        { text: 'Qo‘limizda **beshta** barmoq bor.', visual: { kind: 'items', item: 'gul', count: 5 } },
        { text: 'Beshta gul — **5**.', visual: { kind: 'number', value: 5 } },
      ],
    },
    {
      id: 'baliqlar',
      type: 'count-and-tap',
      prompt: 'Nechta baliq suzyapti? Bosib sanang.',
      item: 'baliq',
      count: 6,
      layout: 'scatter',
      hint: 'Sanalgan baliqda raqam paydo bo‘ladi — bitta baliqni ikki marta sanash mumkin emas.',
    },
    {
      id: 'gullar-savol',
      type: 'choose-answer',
      question: 'Nechta gul bor?',
      visual: { kind: 'items', item: 'gul', count: 7 },
      options: [{ label: '6' }, { label: '7' }, { label: '8' }],
      correct: 1,
      retryHint: 'Gullarni barmoq bilan ko‘rsatib, sekin sanang.',
      explanation: 'To‘g‘ri, yettita gul — 7.',
      timerSec: 30,
    },
    {
      id: 'anorlar',
      type: 'count-and-tap',
      prompt: 'Anorlarni sanang!',
      item: 'anor',
      count: 9,
      layout: 'scatter',
    },
    {
      id: 'besh-raqami',
      type: 'choose-answer',
      question: 'Qaysi biri **besh** raqami?',
      options: [
        { label: '3', visual: { kind: 'number', value: 3 } },
        { label: '5', visual: { kind: 'number', value: 5 } },
        { label: '8', visual: { kind: 'number', value: 8 } },
      ],
      correct: 1,
      retryHint: 'Beshta barmog‘ingizni ko‘rsating va yana qarang.',
    },
    {
      id: 'yakun',
      type: 'recap',
      title: 'Barakalla!',
      points: ['Narsalarni **bittadan** sanaymiz.', 'Oxirgi son — **hammasi** nechta ekanini bildiradi.', 'Biz **1 dan 10 gacha** sanay olamiz.'],
      praise: 'Siz juda zo‘r sanadingiz!',
    },
  ],
});
