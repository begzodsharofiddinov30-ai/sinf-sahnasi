// QORALAMA: o'qituvchi tekshirib chiqishi kerak
import { defineLesson } from '../../schema';

export default defineLesson({
  notes: {
    goal: 'O‘quvchilar tabrik xatining qismlarini biladi va qisqa tabrik yoza oladi.',
    questions: ['Tabrik xati qanday boshlanadi?', 'Kimni tabriklamoqchisiz?', 'Xat oxirida nima yoziladi?'],
    minutes: 15,
  },
  scenes: [
    {
      id: 'qism',
      type: 'explain',
      title: 'Tabrik xati qismlari',
      steps: [
        { text: '**Murojaat**: «Hurmatli ustozim!»', visual: { kind: 'tiles', items: ['Murojaat'] } },
        {
          text: '**Tabrik**: «Sizni bayram bilan tabriklayman!»',
          visual: { kind: 'tiles', items: ['Tabrik'] },
        },
        { text: '**Tilak**: «Sizga sog‘lik tilayman.»', visual: { kind: 'tiles', items: ['Tilak'] } },
        { text: '**Imzo**: «Shogirdingiz Malika.»', visual: { kind: 'tiles', items: ['Imzo'] } },
      ],
    },
    {
      id: 'tartib',
      type: 'drag-match',
      prompt: 'Qismni tartib raqamiga olib boring',
      pairs: [
        { item: { label: 'Murojaat' }, target: { label: '1' } },
        { item: { label: 'Tabrik' }, target: { label: '2' } },
        { item: { label: 'Tilak' }, target: { label: '3' } },
        { item: { label: 'Imzo' }, target: { label: '4' } },
      ],
    },
    {
      id: 'murojaat',
      type: 'choose-answer',
      question: 'Qaysi biri murojaat?',
      options: [{ label: 'Aziz onajonim!' }, { label: 'Sog‘ bo‘ling.' }, { label: 'O‘g‘lingiz Sardor.' }],
      correct: 0,
    },
    {
      id: 'imzo',
      type: 'choose-answer',
      question: 'Xat oxirida nima yoziladi?',
      options: [{ label: 'Kim yozgani (imzo)' }, { label: 'Murojaat' }, { label: 'Sana' }],
      correct: 0,
    },
    {
      id: 'qism-2',
      type: 'sort-groups',
      prompt: 'Bu qaysi qism?',
      groups: [{ label: 'Tilak' }, { label: 'Imzo' }],
      items: [
        { label: 'Baxtli bo‘ling!', group: 0 },
        { label: 'Nabirangiz Dilnoza.', group: 1 },
        { label: 'Uzoq umr ko‘ring!', group: 0 },
        { label: 'Do‘stingiz Aziz.', group: 1 },
      ],
    },
    {
      id: 'yakun',
      type: 'recap',
      title: 'Bugun o‘rgandik',
      points: ['Tabrik xati: **murojaat, tabrik, tilak, imzo**.', 'Xatni **odob** bilan yozamiz.'],
    },
  ],
});
