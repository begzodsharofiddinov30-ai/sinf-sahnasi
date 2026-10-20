# Yangi mavzu qo‘shish (tarkib qo‘llanmasi)

Darslar — bu **ma’lumot**, kod emas. Yangi mavzu qo‘shish uchun komponentlarga tegish shart emas: bitta fayl yozasiz va katalogga bitta qator qo‘shasiz.

## 1. Qadam-baqadam

1. Fayl yarating: `src/content/<sinf>/<fan>/<mavzu>.ts`
   - `<sinf>`: `1`, `2`, `3` yoki `4`
   - `<fan>`: `matematika`, `ona-tili`, `oqish`, `olam` (ro‘yxat: `src/content/subjects.ts`)
   - `<mavzu>`: faqat kichik lotin harflari, raqam va `-` (masalan `geometrik-shakllar`)
2. Faylga quyidagi shablonni nusxalang va to‘ldiring.
3. `src/content/catalog.ts` ga mavzuni qo‘shing:
   ```ts
   { grade: 1, subject: 'matematika', slug: 'geometrik-shakllar', title: 'Geometrik shakllar', summary: 'Doira, kvadrat va uchburchak.' },
   ```
4. Tekshiring:
   ```
   npm run validate:content
   ```
   Xato bo‘lsa, qaysi fayl, qaysi sahna va nima noto‘g‘riligi aniq yoziladi.
5. `npm run dev` bilan ochib, darsni boshidan oxirigacha o‘ting.

## 2. Dars fayli shabloni

```ts
// QORALAMA: o'qituvchi tekshirib chiqishi kerak
import { defineLesson } from '../../schema';

export default defineLesson({
  notes: {
    goal: 'O‘quvchilar ... ni tushunadi.',
    questions: ['1-savol?', '2-savol?', '3-savol?'], // aniq 3 ta
    minutes: 15,
  },
  scenes: [
    // 6–10 ta sahna, kamida 3 xil tur; oxirida 'recap' tavsiya etiladi
  ],
});
```

## 3. Umumiy qoidalar

- Har bir sahnada `id` bo‘lishi va dars ichida **takrorlanmasligi** shart.
- Matnda `**so‘z**` — so‘zni ajratib ko‘rsatadi (rang + qalin + tagiga chiziq).
- O‘zbekcha `o‘`, `g‘` uchun **‘** (U+2018) belgisini, tutuq belgisi uchun **’** (U+2019) ni ishlating. Oddiy `'` ham ishlaydi, lekin u holda matnni qo‘shtirnoq `"..."` ichiga oling.
- Har bir sahnaga ixtiyoriy qo‘shimchalar:
  - `hint: '...'` — o‘qituvchi maslahati (H tugmasi), bolalarga ko‘rinmaydi, faqat ochilganda;
  - `audio: 'audio/1-sinf/salom.mp3'` — `public/` ichidagi ovoz fayli (internet manzili emas!);
  - `timerSec: 30` — sahna taymeri (5–600 soniya).
- Xato javobdagi so‘zlar **yumshoq** bo‘lsin: “Yana bir bor sanab ko‘ring”, hech qachon “Noto‘g‘ri!” emas.
- Bitta sahnada — **bitta g‘oya**.

## 4. Tasvirlar (`visual`)

Ko‘p sahnalarda `visual` maydoni bor. Turlari:

| Tasvir | Namuna |
| --- | --- |
| Rasmlar to‘plami (1–20) | `{ kind: 'items', item: 'olma', count: 5 }` |
| Katta raqam | `{ kind: 'number', value: 7 }` |
| Plitkalar (misol) | `{ kind: 'tiles', items: ['2', '+', '3', '=', '5'], highlight: [4] }` |
| So‘z (harflar ajratilgan) | `{ kind: 'word', text: 'olma', highlight: [0] }` |
| Bitta katta rasm | `{ kind: 'picture', item: 'quyosh', label: 'Quyosh' }` |
| Maskot | `{ kind: 'mascot', mood: 'happy' }` — `neutral`, `happy`, `think`, `cheer` |
| Soat | `{ kind: 'clock', h: 3, m: 30 }` |
| O‘nlik ramka | `{ kind: 'tenframe', count: 7, frames: 1 }` |
| O‘nlik bloklar | `{ kind: 'blocks', tens: 2, ones: 3 }` |
| Teng guruhlar | `{ kind: 'groups', item: 'olma', groups: 3, each: 2 }` |

**Rasmlar ro‘yxati** (`item`): `olma`, `nok`, `anor`, `uzum`, `yulduz`, `koptok`, `baliq`, `gul`, `qush`, `mashina`, `qalam`, `barg`, `quyosh`, `bulut`, `tomchi`, `kitob`, `daraxt`, `qor`, `suv`, `muz`, `choynak`, `doira`, `kvadrat`, `uchburchak`, `tortburchak`, `mushuk`, `it`, `sigir`, `quyon`, `tulki`, `svetofor`, `sayyora`, `sovun`, `shisha`, `qogoz`, `tanga`, `oy`. Yangi rasm qo‘shish uchun: `src/content/schema.ts` dagi `PICTURE_NAMES` va `src/components/Picture.tsx` (faqat asl yoki CC0 rasm, ASSETS.md ga yozing).

## 5. Har bir sahna turi uchun shablon

Quyidagi bloklarni `scenes: [ ... ]` ichiga nusxalang. (Bu shablonlar avtomatik testda validatordan o‘tkaziladi — ular doim to‘g‘ri.)

### explain — tushuntirish (har bosishda keyingi qadam)

```ts
{
  id: 'tushuntirish',
  type: 'explain',
  title: 'Qo‘shish nima?',
  steps: [
    { text: 'Savatda **2** ta olma bor.', visual: { kind: 'items', item: 'olma', count: 2 } },
    { text: 'Yana **3** ta qo‘shamiz.', visual: { kind: 'items', item: 'olma', count: 3 } },
    { text: 'Hammasi — **5** ta!', visual: { kind: 'tiles', items: ['2', '+', '3', '=', '5'] }, replace: true },
  ],
  hint: 'Bolalar barmoq bilan ko‘rsatsin.',
}
```

`replace: true` — oldingi tasvirlarni tozalaydi. Qadamlar soni: 1–10.

### count-and-tap — bosib sanash

```ts
{
  id: 'sanash',
  type: 'count-and-tap',
  prompt: 'Baliqlarni bittadan bosib sanang!',
  item: 'baliq',
  count: 6,
  layout: 'scatter',
}
```

`layout`: `'row'` (qatorda) yoki `'scatter'` (tarqoq). `count`: 1–20.

### choose-answer — javob tanlash (2–4 variant)

```ts
{
  id: 'savol',
  type: 'choose-answer',
  question: 'Nechta gul bor?',
  visual: { kind: 'items', item: 'gul', count: 7 },
  options: [{ label: '6' }, { label: '7' }, { label: '8' }],
  correct: 1,
  retryHint: 'Gullarni barmoq bilan ko‘rsatib sanang.',
  explanation: 'Yettita gul — 7.',
  timerSec: 30,
}
```

`correct` — to‘g‘ri variantning **tartib raqami, 0 dan** (birinchisi 0, ikkinchisi 1…). Variantlar rasmli ham bo‘lishi mumkin: `{ label: 'A', visual: { kind: 'clock', h: 5, m: 30 } }`.

### drag-match — moslashtirish (sudrab olib borish)

```ts
{
  id: 'moslash',
  type: 'drag-match',
  prompt: 'So‘zni rasmiga olib boring',
  pairs: [
    { item: { label: 'gul' }, target: { visual: { kind: 'picture', item: 'gul' } } },
    { item: { label: 'kitob' }, target: { visual: { kind: 'picture', item: 'kitob' } } },
    { item: { label: 'quyosh' }, target: { visual: { kind: 'picture', item: 'quyosh' } } },
  ],
  retryHint: 'So‘zni o‘qing va rasmga qarang.',
}
```

2–6 juft. `item` lar avtomatik aralashtiriladi. Har bir kartochkada `label` yoki `visual` (yoki ikkalasi) bo‘ladi.

### build-word — so‘z yasash

```ts
{
  id: 'soz',
  type: 'build-word',
  prompt: 'Rasmga qarang va so‘zni yig‘ing',
  word: 'qush',
  tiles: ['q', 'u', 'sh'],
  extra: ['s'],
  picture: 'qush',
}
```

`tiles` birlashganda aynan `word` chiqishi shart (validator tekshiradi). `sh`, `ch`, `ng`, `o‘`, `g‘` — bitta bo‘lak. Bo‘g‘inlar bilan: `word: 'kitob', tiles: ['ki', 'tob']`. `extra` — chalg‘ituvchi ortiqcha bo‘laklar (ixtiyoriy).

### sort-groups — guruhlarga ajratish (2–3 guruh)

```ts
{
  id: 'ajratish',
  type: 'sort-groups',
  prompt: 'Unli va undosh harflarni ajrating',
  groups: [{ label: 'Unli' }, { label: 'Undosh' }],
  items: [
    { label: 'a', group: 0 },
    { label: 'm', group: 1 },
    { label: 'o', group: 0 },
    { label: 'k', group: 1 },
  ],
}
```

`group` — guruhning tartib raqami, 0 dan. 2–12 ta narsa.

### number-line — son o‘qi

```ts
{
  id: 'oq',
  type: 'number-line',
  prompt: '8 − 3 = ? Orqaga sakrang!',
  min: 0,
  max: 10,
  start: 8,
  step: -1,
  answer: 5,
  retryHint: '8 dan boshlab 3 marta orqaga sakrang.',
}
```

Oraliq (`max − min`) 20 dan oshmasin. `step`: “Sakrash” tugmasi qadami (`1`, `-1`, `3`, `10`…). `answer` bo‘lsa, bolalar to‘g‘ri sonni o‘qdan bosadi; bo‘lmasa — erkin o‘rganish.

### ten-frame — o‘nlik ramka

```ts
{
  id: 'ramka',
  type: 'ten-frame',
  prompt: 'Ramkada 7 ta. **3** tasini olib tashlang!',
  frames: 1,
  prefilled: 7,
  target: 4,
}
```

`frames: 2` — 20 gacha. `target` bo‘lsa, shuncha katak to‘lganda maqtov chiqadi.

### clock — soat

```ts
{
  id: 'soat',
  type: 'clock',
  prompt: 'Soatni **8:30** ga qo‘ying',
  start: { h: 12, m: 0 },
  target: { h: 8, m: 30 },
}
```

`h`: 1–12, `m`: 0–55 (5 ga karrali). `target` bo‘lmasa — erkin ko‘rsatish; `showDigital: true` — raqamli vaqt darhol ko‘rinadi.

### story — hikoya (har bosishda keyingi sahifa)

```ts
{
  id: 'hikoya',
  type: 'story',
  title: 'Tomchining sayohati',
  pages: [
    { text: 'Kichkina tomchi **daryo**da yashardi.', visual: { kind: 'picture', item: 'suv' } },
    { text: '**Quyosh** isitdi va tomchi bug‘ga aylandi.', visual: { kind: 'picture', item: 'quyosh' } },
  ],
}
```

1–8 sahifa. Har sahifaga `audio: 'audio/...mp3'` qo‘shish mumkin.

### recap — yakun (fikrlar birma-bir, oxirida maqtov)

```ts
{
  id: 'yakun',
  type: 'recap',
  title: 'Bugun o‘rgandik',
  points: ['Qo‘shganda narsalar **ko‘payadi**.', '2 + 3 = 3 + 2'],
  praise: 'Barakalla! Siz ajoyib ishladingiz!',
}
```

1–5 ta fikr. Bu fikrlar ish varag‘ida “Esda tuting” bo‘limiga ham tushadi.

## 6. Ish varag‘i

Alohida yozish shart emas: `count-and-tap`, `choose-answer`, `build-word`, `drag-match`, `sort-groups`, `number-line`, `ten-frame`, `clock` (`target` bilan) va `recap` sahnalaridan avtomatik tuziladi (eng ko‘pi 8 ta topshiriq).

## 7. Audio

Yo‘riqnoma: `public/audio/README.md`. Faqat o‘zingiz yozgan yoki CC0 ovozlar; har birini ASSETS.md ga yozing.
