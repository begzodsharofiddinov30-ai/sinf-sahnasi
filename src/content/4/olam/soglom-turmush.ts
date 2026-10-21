// QORALAMA: o'qituvchi tekshirib chiqishi kerak
import { defineLesson } from '../../schema';

export default defineLesson({
  notes: {
    goal: 'O‘quvchilar sog‘lom turmush tarzi tamoyillarini biladi va kundalik hayotida qo‘llaydi.',
    questions: [
      'Sog‘lom turmush tarzi nima?',
      'Kuniga qancha harakat qilish kerak?',
      'Ekran oldida qancha vaqt o‘tirasiz?',
    ],
    minutes: 20,
  },
  scenes: [
    {
      id: 'qoida',
      type: 'explain',
      title: 'Sog‘lom turmush',
      steps: [
        {
          text: 'Har kuni **harakat**: o‘yin, sport, piyoda yurish.',
          visual: { kind: 'picture', item: 'koptok' },
        },
        { text: 'Yetarli **uyqu** — 9–10 soat.', visual: { kind: 'picture', item: 'oy' }, replace: true },
        {
          text: 'To‘g‘ri **ovqat** va toza **suv**.',
          visual: { kind: 'picture', item: 'olma' },
          replace: true,
        },
        { text: 'Ekran vaqtini **cheklaymiz**.', visual: { kind: 'mascot', mood: 'think' }, replace: true },
      ],
    },
    {
      id: 'odat',
      type: 'sort-groups',
      prompt: 'Foydali odatmi?',
      groups: [{ label: 'Foydali' }, { label: 'Zararli' }],
      items: [
        { label: 'Ertalabki badantarbiya', group: 0 },
        { label: 'Kechgacha telefon o‘ynash', group: 1 },
        { label: 'Ochiq havoda o‘yin', group: 0 },
        { label: 'Nonushtasiz chiqish', group: 1 },
        { label: 'Suv ichish', group: 0 },
      ],
    },
    {
      id: 'uyqu',
      type: 'choose-answer',
      question: '4-sinf o‘quvchisi taxminan necha soat uxlashi kerak?',
      options: [{ label: '9–10 soat' }, { label: '4 soat' }, { label: '15 soat' }],
      correct: 0,
    },
    {
      id: 'harakat',
      type: 'choose-answer',
      question: 'Kuniga qancha faol harakat foydali?',
      options: [{ label: 'Kamida 1 soat' }, { label: '5 daqiqa' }, { label: 'Umuman kerak emas' }],
      correct: 0,
    },
    {
      id: 'ekran',
      type: 'choose-answer',
      question: 'Kompyuterda uzoq o‘tirganda nima qilamiz?',
      options: [{ label: 'Tanaffus qilib, ko‘zni dam oldiramiz' }, { label: 'To‘xtovsiz o‘tiramiz' }],
      correct: 0,
    },
    {
      id: 'yakun',
      type: 'recap',
      title: 'Bugun o‘rgandik',
      points: ['**Harakat, uyqu, to‘g‘ri ovqat** — sog‘liq garovi.', 'Ekran vaqtini **cheklaymiz**.'],
    },
  ],
});
