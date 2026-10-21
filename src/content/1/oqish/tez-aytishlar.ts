// QORALAMA: o'qituvchi tekshirib chiqishi kerak
import { defineLesson } from '../../schema';

export default defineLesson({
  notes: {
    goal: 'O‘quvchilar tez aytishlarni avval sekin, keyin tez va aniq talaffuz qiladi.',
    questions: ['Tez aytish nima uchun kerak?', 'Qaysi tovush qiyin bo‘ldi?', 'O‘zingiz tez aytish tuza olasizmi?'],
    minutes: 10,
  },
  scenes: [
    {
      id: 'nima',
      type: 'explain',
      title: 'Tez aytish',
      steps: [
        {
          text: '**Tez aytish** — tilni chaqqon qiladigan qiziq gap.',
          visual: { kind: 'mascot', mood: 'happy' },
        },
        {
          text: 'Avval **sekin**, keyin **tez** aytamiz!',
          visual: { kind: 'mascot', mood: 'cheer' },
          replace: true,
        },
      ],
    },
    {
      id: 'aytish',
      type: 'story',
      title: 'Aytib ko‘ring',
      pages: [
        {
          text: '**Shoshgan shoshqaloq shoh shohsupaga shoshildi.**',
          visual: { kind: 'mascot', mood: 'cheer' },
        },
        { text: '**Qora qarg‘a qorda qoldi.**', visual: { kind: 'picture', item: 'qor' } },
        { text: '**Ona olma oldi, ota o‘rik oldi.**', visual: { kind: 'picture', item: 'olma' } },
      ],
      hint: 'Bu tez aytishlar asl, shu dastur uchun tuzilgan.',
    },
    {
      id: 'tovush',
      type: 'choose-answer',
      question: '“Qora qarg‘a qorda qoldi” da qaysi tovush ko‘p takrorlanadi?',
      options: [{ label: 'q' }, { label: 'sh' }, { label: 'm' }],
      correct: 0,
    },
    {
      id: 'qanday',
      type: 'choose-answer',
      question: 'Tez aytishni qanday o‘rganamiz?',
      options: [{ label: 'Avval sekin, keyin tez' }, { label: 'Darhol juda tez' }, { label: 'Ichimizda' }],
      correct: 0,
    },
    {
      id: 'sh-bormi',
      type: 'sort-groups',
      prompt: '“sh” bormi?',
      groups: [{ label: 'sh bor' }, { label: 'sh yo‘q' }],
      items: [
        { label: 'shoh', group: 0 },
        { label: 'qarg‘a', group: 1 },
        { label: 'shoshildi', group: 0 },
        { label: 'olma', group: 1 },
      ],
    },
    {
      id: 'yakun',
      type: 'recap',
      title: 'Bugun o‘rgandik',
      points: ['Tez aytish **talaffuzni** yaxshilaydi.', 'Avval **sekin**, keyin **tez**!'],
      praise: 'Barakalla, tillaringiz chaqqon!',
    },
  ],
});
