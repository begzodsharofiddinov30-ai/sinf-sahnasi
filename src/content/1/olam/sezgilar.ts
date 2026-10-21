// QORALAMA: o'qituvchi tekshirib chiqishi kerak
import { defineLesson } from '../../schema';

export default defineLesson({
  notes: {
    goal: 'O‘quvchilar besh sezgi a’zosini va ularning vazifasini biladi.',
    questions: ['Ko‘z bilan nima qilamiz?', 'Qaysi a’zo bilan hidlaymiz?', 'Sezgi a’zolarini qanday asraymiz?'],
    minutes: 15,
  },
  scenes: [
    {
      id: 'sezgi',
      type: 'explain',
      title: 'Sezgi a’zolari',
      steps: [
        { text: '**Ko‘z** — ko‘ramiz.', visual: { kind: 'mascot', mood: 'happy' } },
        { text: '**Quloq** — eshitamiz.' },
        { text: '**Burun** — hidlaymiz.' },
        { text: '**Til** — ta’mini bilamiz.' },
        { text: '**Teri** — ushlab sezamiz.' },
      ],
    },
    {
      id: 'vazifa',
      type: 'drag-match',
      prompt: 'A’zoni vazifasiga olib boring',
      pairs: [
        { item: { label: 'ko‘z' }, target: { label: 'ko‘rish' } },
        { item: { label: 'quloq' }, target: { label: 'eshitish' } },
        { item: { label: 'burun' }, target: { label: 'hidlash' } },
        { item: { label: 'til' }, target: { label: 'ta’m bilish' } },
      ],
    },
    {
      id: 'gul',
      type: 'choose-answer',
      question: 'Gulning hidini qaysi a’zo bilan bilamiz?',
      visual: { kind: 'picture', item: 'gul' },
      options: [{ label: 'Burun' }, { label: 'Quloq' }, { label: 'Ko‘z' }],
      correct: 0,
    },
    {
      id: 'qongiroq',
      type: 'choose-answer',
      question: 'Qo‘ng‘iroq ovozini nima bilan eshitamiz?',
      options: [{ label: 'Quloq' }, { label: 'Til' }, { label: 'Teri' }],
      correct: 0,
    },
    {
      id: 'asrash',
      type: 'choose-answer',
      question: 'Ko‘zni qanday asraymiz?',
      options: [
        { label: 'Yorug‘da o‘qiymiz' },
        { label: 'Qorong‘ida o‘qiymiz' },
        { label: 'Telefonga yaqin qaraymiz' },
      ],
      correct: 0,
    },
    {
      id: 'yakun',
      type: 'recap',
      title: 'Bugun o‘rgandik',
      points: ['Besh sezgi: **ko‘rish, eshitish, hidlash, ta’m, teginish**.', 'Sezgi a’zolarini **asraymiz**.'],
    },
  ],
});
