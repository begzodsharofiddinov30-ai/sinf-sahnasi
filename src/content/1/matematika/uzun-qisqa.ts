// QORALAMA: o'qituvchi tekshirib chiqishi kerak
import { defineLesson } from '../../schema';

export default defineLesson({
  notes: {
    goal: 'O‘quvchilar narsalarni uzunligi, balandligi va kattaligiga qarab taqqoslaydi va to‘g‘ri so‘zni ishlatadi.',
    questions: ['Sinfda eng baland narsa qaysi?', 'Qalam uzunmi yoki qisqa?', 'Qanday qilib aniq taqqoslash mumkin?'],
    minutes: 15,
  },
  scenes: [
    {
      id: 'taqqos',
      type: 'explain',
      title: 'Taqqoslaymiz',
      steps: [
        { text: 'Daraxt **baland**, gul **past**.', visual: { kind: 'picture', item: 'daraxt' } },
        { text: 'Gul **past**.', visual: { kind: 'picture', item: 'gul' } },
        {
          text: 'Poyezd **uzun**, mashina **qisqa**.',
          visual: { kind: 'picture', item: 'mashina' },
          replace: true,
        },
      ],
      hint: 'Ikki o‘quvchini yonma-yon turg‘izib, kim balandroq ekanini ko‘rsating.',
    },
    {
      id: 'baland',
      type: 'choose-answer',
      question: 'Qaysi biri **baland**?',
      options: [
        { label: 'A', visual: { kind: 'picture', item: 'daraxt' } },
        { label: 'B', visual: { kind: 'picture', item: 'gul' } },
      ],
      correct: 0,
    },
    {
      id: 'katta',
      type: 'choose-answer',
      question: 'Qaysi biri **katta**?',
      options: [
        { label: 'A', visual: { kind: 'picture', item: 'sigir' } },
        { label: 'B', visual: { kind: 'picture', item: 'mushuk' } },
      ],
      correct: 0,
    },
    {
      id: 'zid',
      type: 'drag-match',
      prompt: 'Qarama-qarshisini toping',
      pairs: [
        { item: { label: 'uzun' }, target: { label: 'qisqa' } },
        { item: { label: 'baland' }, target: { label: 'past' } },
        { item: { label: 'katta' }, target: { label: 'kichik' } },
      ],
    },
    {
      id: 'kattami',
      type: 'sort-groups',
      prompt: 'Mushukdan kattami yoki kichikmi?',
      groups: [{ label: 'Kattaroq' }, { label: 'Kichikroq' }],
      items: [
        { label: 'sigir', visual: { kind: 'picture', item: 'sigir' }, group: 0 },
        { label: 'qush', visual: { kind: 'picture', item: 'qush' }, group: 1 },
        { label: 'daraxt', visual: { kind: 'picture', item: 'daraxt' }, group: 0 },
        { label: 'olma', visual: { kind: 'picture', item: 'olma' }, group: 1 },
      ],
    },
    {
      id: 'qanday',
      type: 'choose-answer',
      question: 'Ikki qalamni qanday to‘g‘ri taqqoslaymiz?',
      options: [{ label: 'Uchlarini bir joyga qo‘yib' }, { label: 'Ko‘z bilan uzoqdan' }, { label: 'Rangiga qarab' }],
      correct: 0,
    },
    {
      id: 'yakun',
      type: 'recap',
      title: 'Bugun o‘rgandik',
      points: [
        '**Uzun–qisqa**, **baland–past**, **katta–kichik**.',
        'Taqqoslashda narsalarni **yonma-yon** qo‘yamiz.',
      ],
    },
  ],
});
