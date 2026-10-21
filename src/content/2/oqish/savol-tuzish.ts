// QORALAMA: o'qituvchi tekshirib chiqishi kerak
import { defineLesson } from '../../schema';

export default defineLesson({
  notes: {
    goal: 'O‘quvchilar matnga kim, nima, qayerda, qachon so‘roqlari bilan savol tuzadi va javob beradi.',
    questions: ['Qaysi so‘roq so‘zlarini bilasiz?', 'Matnga qanday savol beramiz?', 'Do‘stingizga savol bering.'],
    minutes: 15,
  },
  scenes: [
    {
      id: 'matn',
      type: 'story',
      title: 'Bog‘dagi sayr',
      pages: [
        {
          text: '**Shanba** kuni Aziz va Malika **bog‘**ga borishdi.',
          visual: { kind: 'picture', item: 'daraxt' },
        },
        { text: 'Ular **o‘rdaklar**ga non berishdi.', visual: { kind: 'picture', item: 'qush' } },
        { text: 'Keyin **muzqaymoq** yeb, uyga qaytishdi.', visual: { kind: 'mascot', mood: 'happy' } },
      ],
    },
    {
      id: 'soroq',
      type: 'drag-match',
      prompt: 'Savolga mos javobni toping',
      pairs: [
        { item: { label: 'Kim bog‘ga bordi?' }, target: { label: 'Aziz va Malika' } },
        { item: { label: 'Qachon borishdi?' }, target: { label: 'Shanba kuni' } },
        { item: { label: 'Qayerga borishdi?' }, target: { label: 'Bog‘ga' } },
      ],
    },
    {
      id: 'nima',
      type: 'choose-answer',
      question: 'Ular o‘rdaklarga nima berishdi?',
      options: [{ label: 'Non' }, { label: 'Muzqaymoq' }, { label: 'Olma' }],
      correct: 0,
    },
    {
      id: 'soroq-soz',
      type: 'choose-answer',
      question: '«Ular ... uyga qaytishdi?» qaysi so‘roq so‘zi mos?',
      options: [{ label: 'Qachon' }, { label: 'Kim' }, { label: 'Nima' }],
      correct: 0,
    },
    {
      id: 'soroq-2',
      type: 'sort-groups',
      prompt: 'Qaysi so‘roq?',
      groups: [{ label: 'Kim?' }, { label: 'Qayerda?' }],
      items: [
        { label: 'Malika', group: 0 },
        { label: 'bog‘da', group: 1 },
        { label: 'Aziz', group: 0 },
        { label: 'uyda', group: 1 },
      ],
    },
    {
      id: 'yakun',
      type: 'recap',
      title: 'Bugun o‘rgandik',
      points: ['So‘roq so‘zlari: **kim? nima? qayerda? qachon?**', 'Savol bilan matnni **yaxshiroq** tushunamiz.'],
    },
  ],
});
