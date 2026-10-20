# Vercel’ga joylash (bepul statik sayt)

Bu qo‘llanma loyihani internetga chiqarish uchun. Bir marta sozlansa, keyingi o‘zgarishlar avtomatik joylanadi.

> Vercel’ning bepul tarifi (Hobby) shartlari vaqt o‘tishi bilan o‘zgarishi mumkin. Joylashdan oldin <https://vercel.com/pricing> sahifasida hozirgi shartlarni tekshiring (masalan, tijorat maqsadida foydalanish cheklovlari).

## 1. GitHub’ga yuklash

1. <https://github.com> da hisob oching (bo‘lmasa).
2. Yangi repozitoriy yarating: **New repository** → nom, masalan `sinf-sahnasi` → **Create repository**.
3. Kompyuterda loyiha papkasida (cmd yoki PowerShell):
   ```
   git init
   git add .
   git commit -m "Sinf Sahnasi"
   git branch -M main
   git remote add origin https://github.com/<foydalanuvchi>/sinf-sahnasi.git
   git push -u origin main
   ```
4. `.gitignore` fayli `node_modules`, `dist`, `dist-portable` va `.env` fayllarini yuklashga yo‘l qo‘ymaydi. Loyihada **hech qanday maxfiy kalit yoki parol yo‘q** va bo‘lmasligi kerak.

## 2. Vercel’ga ulash

1. <https://vercel.com> ga GitHub hisobi bilan kiring.
2. **Add New… → Project** → GitHub’dagi `sinf-sahnasi` repozitoriyasini tanlang → **Import**.
3. Sozlamalar (odatda o‘zi aniqlaydi, `vercel.json` ham shu qiymatlarni beradi):
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Install Command:** standart (`npm install`)
   - Environment Variables: **kerak emas**
4. **Deploy** ni bosing. 1–2 daqiqadan keyin `https://sinf-sahnasi-xxxx.vercel.app` kabi manzil beriladi.

## 3. Avtomatik yangilanish

- GitHub’dagi `main` tarmog‘iga har bir `git push` dan keyin Vercel saytni o‘zi qayta yig‘adi va joylaydi.
- O‘qituvchining o‘rnatilgan ilovasi yangi versiyani internet bo‘lganda o‘zi yuklaydi va **“Yangi versiya — yangilash”** tugmasini ko‘rsatadi. Darsdan oldin uyda ilovani ochib, yangilashni tavsiya qiling.
- Versiya raqami `package.json` dagi `version` maydonidan olinadi va **Sozlamalar** sahifasida ko‘rinadi. Har bir muhim o‘zgarishda uni oshiring (masalan, `1.0.0` → `1.1.0`).

## 4. `vercel.json` nima qiladi

- Barcha manzillarni `index.html` ga yo‘naltiradi (xavfsizlik to‘ri; ilova `#/` manzillardan foydalanadi).
- **Content-Security-Policy:** sayt faqat o‘z fayllarini yuklay oladi — tashqi skript, shrift, rasm, analitika yoki boshqa internet so‘rovlari brauzer tomonidan bloklanadi.
- `sw.js` va `index.html` keshlanmaydi (yangilanishlar tez yetib keladi), `assets/` fayllari esa uzoq muddat keshlanadi.

## 5. Joylashdan keyin tekshirish

1. Saytni oching → **Sozlamalar › Tekshiruv**: “Oflayn rejim” ✓ bo‘lishi kerak.
2. Edge/Chrome’da ilovani o‘rnating (**Ilovani o‘rnatish** sahifasi).
3. Internetni o‘chirib, ilovani ish stolidagi belgidan oching va bitta darsni oxirigacha o‘ting.

## Portativ versiya

Vercel’ga bog‘liq emas: `npm run build:portable` → `dist-portable/` papkasini USB’ga nusxalang. Batafsil: README.md.
