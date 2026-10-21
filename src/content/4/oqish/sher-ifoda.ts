// QORALAMA: o'qituvchi tekshirib chiqishi kerak
import { defineLesson } from '../../schema';

export default defineLesson({
  notes: {
    goal: 'O‘quvchilar she’rni pauza, mantiqiy urg‘u va to‘g‘ri ohang bilan ifodali o‘qiydi.',
    questions: ['Satr oxirida nima qilamiz?', 'Qaysi so‘zni urg‘u bilan aytamiz?', 'She’rning kayfiyati qanday?'],
    minutes: 20,
  },
  scenes: [
    {
      id: 'sher',
      type: 'story',
      title: 'Ona',
      pages: [
        { text: 'Tong otmay turar **onam**,', visual: { kind: 'mascot', mood: 'happy' } },
        { text: 'Uyni nurga to‘ldirar.', visual: { kind: 'picture', item: 'quyosh' } },
        { text: 'Bir **tabassumi** bilan', visual: { kind: 'mascot', mood: 'cheer' } },
        { text: 'Butun dunyo kuldirar.', visual: { kind: 'mascot', mood: 'cheer' } },
      ],
      hint: 'Asl she’r. Ajratilgan so‘zlarni urg‘u bilan o‘qiting.',
    },
    {
      id: 'qoida',
      type: 'explain',
      title: 'Ifodali o‘qish',
      steps: [
        { text: 'Satr oxirida **qisqa pauza**.', visual: { kind: 'tiles', items: ['|'] } },
        {
          text: 'Muhim so‘zni **urg‘u** bilan: **onam**, **tabassumi**.',
          visual: { kind: 'tiles', items: ['onam', 'tabassumi'] },
        },
        {
          text: 'Ohang — she’r **kayfiyatiga** mos: mehrli.',
          visual: { kind: 'mascot', mood: 'happy' },
          replace: true,
        },
      ],
    },
    {
      id: 'kayfiyat',
      type: 'choose-answer',
      question: 'She’rning kayfiyati qanday?',
      options: [{ label: 'Mehrli, iliq' }, { label: 'G‘amgin' }, { label: 'Qo‘rqinchli' }],
      correct: 0,
    },
    {
      id: 'qofiya',
      type: 'choose-answer',
      question: '“To‘ldirar” so‘ziga qofiyadosh so‘z qaysi?',
      options: [{ label: 'kuldirar' }, { label: 'onam' }, { label: 'tong' }],
      correct: 0,
    },
    {
      id: 'pauza',
      type: 'choose-answer',
      question: 'Satr oxirida nima qilamiz?',
      options: [{ label: 'Qisqa pauza' }, { label: 'Tezlashamiz' }, { label: 'Baqiramiz' }],
      correct: 0,
    },
    {
      id: 'yakun',
      type: 'recap',
      title: 'Bugun o‘rgandik',
      points: ['Ifodali o‘qish: **pauza, urg‘u, ohang**.', 'Ohang she’r **kayfiyatiga** mos bo‘ladi.'],
    },
  ],
});
