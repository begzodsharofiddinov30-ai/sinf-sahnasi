# Rasm, ovoz va shriftlar manbasi

Loyihadagi barcha tasvir va ovozlar **asl (original)** — shu loyiha uchun kod sifatida yaratilgan — yoki ochiq litsenziyali. Hech qanday mashhur multfilm qahramoni, maskot yoki brend nusxalanmagan yoki taqlid qilinmagan. Ilova ishlayotganda internetdan hech narsa yuklanmaydi.

## Maskot

| Nomi | Fayl | Manba | Litsenziya |
| --- | --- | --- | --- |
| **Bo‘tajon** — boshida do‘ppi bo‘lgan kichkina tuyacha (4 kayfiyat: oddiy, xursand, o‘ylayapti, quvnoq) | `src/components/Mascot.tsx` (ichki SVG) | Asl, shu loyiha uchun chizilgan | Loyiha bilan birga |
| Ilova ikonkasi (Bo‘tajon boshi) | `public/icon.svg`, `public/icons/*.png` | Asl; PNG’lar shu SVG’dan avtomatik chizilgan | Loyiha bilan birga |

## Rasmlar

| Rasmlar | Fayl | Manba | Litsenziya |
| --- | --- | --- | --- |
| olma, nok, anor, uzum, yulduz, koptok, baliq, gul, qush, mashina, qalam, barg, quyosh, bulut, tomchi, kitob, daraxt, qor, suv, muz, choynak, doira, kvadrat, uchburchak, to‘rtburchak, mushuk, it, sigir, quyon, tulki, svetofor, sayyora, sovun, shisha, qog‘oz, tanga, oy | `src/components/Picture.tsx` (ichki SVG) | Asl, oddiy geometrik shakllardan chizilgan | Loyiha bilan birga |
| Fan piktogrammalari | `src/components/SubjectIcon.tsx` | Asl | Loyiha bilan birga |
| Interfeys piktogrammalari (uy, strelka, yulduzcha, lampochka va h.k.) | `src/components/Icon.tsx` | Asl, oddiy chiziqlar | Loyiha bilan birga |
| Soat, o‘nlik ramka, o‘nlik bloklar, bayram yulduzchalari | `src/components/ClockFace.tsx`, `TenFrameGrid.tsx`, `Visual.tsx`, `Celebration.tsx` | Asl | Loyiha bilan birga |

## Ovozlar

| Ovoz | Fayl | Manba | Litsenziya |
| --- | --- | --- | --- |
| “pop”, “to‘g‘ri”, yumshoq “yana urinib ko‘ring”, qo‘ng‘iroqcha, “tik”; animatsiya ovozlari: “tin” (qadam), “shuv” (sahna almashishi), ko‘tarish, sakrash, uchqunlar | `src/lib/audio.ts` | Asl — brauzerda Web Audio API orqali sintez qilinadi, audio fayl yo‘q | Loyiha bilan birga |
| Oldindan yozilgan nutq | `public/audio/` | **Hozircha yo‘q.** Qo‘shilsa — shu jadvalga yozing | — |

## Matnlar

| Matn | Manba |
| --- | --- |
| Ertak, hikoya, topishmoq va suhbatlar (Bo‘tajon va quyoncha, Dangasa tulki va mehnatkash quyon, Nodira va kitob, Qushlar uyasi va boshqalar) | Asl, shu loyiha uchun yozilgan |
| Maqollar (“Tomchi-tomchi ko‘l bo‘lur” va boshqalar) | O‘zbek xalq og‘zaki ijodi (jamoat mulki) |

## Shrift

| Shrift | Paket | Manba | Litsenziya |
| --- | --- | --- | --- |
| Nunito (600, 800, 900; faqat lotin qismi, o‘ ‘ ’ belgilari bilan) | `@fontsource/nunito` 5.1.0 — build vaqtida loyihaga joylanadi | Google Fonts / Fontsource | SIL Open Font License 1.1 |

## Dasturiy kutubxonalar

React, React Router, framer-motion, Tailwind CSS, Vite, vite-plugin-pwa (Workbox), vite-plugin-singlefile — barchasi MIT litsenziyasi ostida. To‘liq ro‘yxat: `package.json`.

## Yangi narsa qo‘shganda

Faqat o‘zingiz yaratgan yoki **CC0 / jamoat mulki** bo‘lgan rasm va ovozlarni ishlating va shu faylga qator qo‘shing: nomi, fayl yo‘li, manba (havola), litsenziya.
