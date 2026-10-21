// QORALAMA: o'qituvchi tekshirib chiqishi kerak
import { defineLesson } from '../../schema';

export default defineLesson({
  notes: {
    goal: 'O‘quvchilar hikoyada voqealar rivojining bosqichlarini aniqlaydi.',
    questions: ['Hikoya qanday boshlandi?', 'Eng qiziq (avj) nuqta qayerda?', 'Yechim qanday bo‘ldi?'],
    minutes: 20,
  },
  scenes: [
    {
      id: 'hikoya',
      type: 'story',
      title: 'Bo‘ron',
      pages: [
        { text: 'Yozgi lagerda bolalar **chodir** tikishdi.', visual: { kind: 'mascot', mood: 'happy' } },
        {
          text: 'Kechqurun kuchli **bo‘ron** turdi, chodir yiqila boshladi!',
          visual: { kind: 'mascot', mood: 'think' },
        },
        {
          text: 'Bolalar **birgalikda** arqonlarni mahkam bog‘lashdi.',
          visual: { kind: 'mascot', mood: 'cheer' },
        },
        {
          text: 'Ertalab quyosh chiqdi — chodir **butun** edi.',
          visual: { kind: 'picture', item: 'quyosh' },
        },
      ],
      hint: 'Asl hikoya.',
    },
    {
      id: 'bosqich',
      type: 'drag-match',
      prompt: 'Voqeani bosqichga olib boring',
      pairs: [
        { item: { label: 'Bolalar chodir tikishdi' }, target: { label: 'Boshlanish' } },
        { item: { label: 'Bo‘ron turdi, chodir yiqilyapti' }, target: { label: 'Avj nuqta' } },
        { item: { label: 'Birgalikda chodirni saqlab qolishdi' }, target: { label: 'Yechim' } },
      ],
    },
    {
      id: 'avj',
      type: 'choose-answer',
      question: 'Eng hayajonli joy qaysi?',
      options: [{ label: 'Bo‘ron turgan payt' }, { label: 'Ertalab quyosh chiqqani' }],
      correct: 0,
    },
    {
      id: 'saboq',
      type: 'choose-answer',
      question: 'Hikoyaning saboqi?',
      options: [{ label: 'Birgalikda qiyinchilikni yengamiz' }, { label: 'Lagerga bormaslik kerak' }],
      correct: 0,
    },
    {
      id: 'tartib',
      type: 'choose-answer',
      question: 'Syujetning to‘g‘ri tartibi?',
      options: [{ label: 'boshlanish → avj → yechim' }, { label: 'yechim → boshlanish → avj' }],
      correct: 0,
    },
    {
      id: 'yakun',
      type: 'recap',
      title: 'Bugun o‘rgandik',
      points: ['Syujet: **boshlanish → avj nuqta → yechim**.', 'Avj — eng **hayajonli** joy.'],
    },
  ],
});
