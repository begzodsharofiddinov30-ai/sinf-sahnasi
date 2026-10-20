// QORALAMA: o'qituvchi tekshirib chiqishi kerak
import { defineLesson } from '../../schema';

export default defineLesson({
  notes: {
    goal: 'O‘quvchilar otni topadi va kim? nima? so‘roqlarini to‘g‘ri beradi.',
    questions: ['Ot nimani bildiradi?', 'Odamlar qaysi so‘roqqa javob beradi?', 'Sinfdagi narsalarni nomlang.'],
    minutes: 15,
  },
  scenes: [
    {
      id: 'ot',
      type: 'explain',
      title: 'Ot',
      steps: [
        { text: '**Ot** — narsa, odam yoki hayvon **nomi**.', visual: { kind: 'mascot', mood: 'happy' } },
        {
          text: 'Odamlar **Kim?** so‘rog‘iga javob beradi: ona, o‘quvchi, Aziz.',
          visual: { kind: 'tiles', items: ['ona', 'o‘quvchi', 'Aziz'] },
          replace: true,
        },
        {
          text: 'Narsa va hayvonlar **Nima?** so‘rog‘iga: kitob, olma, mushuk.',
          visual: { kind: 'tiles', items: ['kitob', 'olma', 'mushuk'] },
          replace: true,
        },
      ],
    },
    {
      id: 'kim-nima',
      type: 'sort-groups',
      prompt: 'Kim? yoki Nima?',
      groups: [{ label: 'Kim?' }, { label: 'Nima?' }],
      items: [
        { label: 'o‘qituvchi', group: 0 },
        { label: 'daftar', group: 1 },
        { label: 'buvi', group: 0 },
        { label: 'mushuk', group: 1 },
        { label: 'shifokor', group: 0 },
        { label: 'daraxt', group: 1 },
      ],
      retryHint: 'Odam bo‘lsa — Kim? Boshqa narsa bo‘lsa — Nima?',
    },
    {
      id: 'qaysi-ot',
      type: 'choose-answer',
      question: 'Qaysi so‘z **ot**?',
      options: [{ label: 'yugurdi' }, { label: 'kitob' }, { label: 'chiroyli' }],
      correct: 1,
    },
    {
      id: 'daftar',
      type: 'build-word',
      prompt: 'Bo‘g‘inlardan otni yasang',
      word: 'daftar',
      tiles: ['daf', 'tar'],
      extra: ['ta'],
    },
    {
      id: 'gapda',
      type: 'choose-answer',
      question: '«Malika gul suvordi.» Gapdagi otlarni toping.',
      options: [{ label: 'Malika, gul' }, { label: 'suvordi' }, { label: 'gul, suvordi' }],
      correct: 0,
    },
    {
      id: 'yakun',
      type: 'recap',
      title: 'Bugun o‘rgandik',
      points: ['**Ot** — narsa, odam, hayvon nomi.', 'Odam — **Kim?**, narsa va hayvon — **Nima?**'],
    },
  ],
});
