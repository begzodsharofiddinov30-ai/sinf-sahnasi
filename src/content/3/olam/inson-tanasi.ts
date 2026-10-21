// QORALAMA: o'qituvchi tekshirib chiqishi kerak
import { defineLesson } from '../../schema';

export default defineLesson({
  notes: {
    goal: 'O‘quvchilar asosiy ichki a’zolar va ularning vazifasini biladi.',
    questions: ['Yurak nima qiladi?', 'Nafas olganda qaysi a’zo ishlaydi?', 'Sog‘lom bo‘lish uchun nima qilamiz?'],
    minutes: 20,
  },
  scenes: [
    {
      id: 'azo',
      type: 'explain',
      title: 'A’zolar',
      steps: [
        { text: '**Yurak** — tanaga qon haydaydi.', visual: { kind: 'mascot', mood: 'happy' } },
        { text: '**O‘pka** — nafas olamiz.' },
        { text: '**Suyaklar** (skelet) tanani tutib turadi.' },
        { text: '**Muskullar** harakatlantiradi.' },
      ],
      hint: 'Bolalar yurak urishini bilagida sanab ko‘rsin.',
    },
    {
      id: 'vazifa',
      type: 'drag-match',
      prompt: 'A’zoni vazifasiga olib boring',
      pairs: [
        { item: { label: 'yurak' }, target: { label: 'qon haydaydi' } },
        { item: { label: 'o‘pka' }, target: { label: 'nafas oladi' } },
        { item: { label: 'suyaklar' }, target: { label: 'tanani tutadi' } },
        { item: { label: 'miya' }, target: { label: 'o‘ylaydi' } },
      ],
    },
    {
      id: 'yugurish',
      type: 'choose-answer',
      question: 'Yugurgandan keyin yurak qanday uradi?',
      options: [{ label: 'Tezroq' }, { label: 'Sekinroq' }, { label: 'To‘xtaydi' }],
      correct: 0,
    },
    {
      id: 'foydali',
      type: 'sort-groups',
      prompt: 'Tanaga foydalimi?',
      groups: [{ label: 'Foydali' }, { label: 'Zararli' }],
      items: [
        { label: 'Badantarbiya', group: 0 },
        { label: 'Tamaki tutuni', group: 1 },
        { label: 'Toza havo', group: 0 },
        { label: 'Juda kam uxlash', group: 1 },
      ],
    },
    {
      id: 'yurak-joy',
      type: 'choose-answer',
      question: 'Yurak qayerda joylashgan?',
      options: [{ label: 'Ko‘krak qafasida' }, { label: 'Oyoqda' }, { label: 'Qo‘lda' }],
      correct: 0,
    },
    {
      id: 'yakun',
      type: 'recap',
      title: 'Bugun o‘rgandik',
      points: ['Yurak — **qon**, o‘pka — **nafas**, suyak — **tayanch**.', 'Harakat va to‘g‘ri ovqat — **sog‘lik**.'],
    },
  ],
});
