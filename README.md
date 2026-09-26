# Cinora

Foundation اولیه اپلیکیشن سینمایی Cinora.

## وضعیت

این مرحله فقط زیرساخت پروژه است و هیچ صفحه محصولی مانند Login، Home، Reels، Live TV یا Rooms در آن ساخته نشده است. مسیر `/` صرفاً یک route صحت‌سنجی Foundation است.

## توسعه محلی

1. `cp .env.example .env` را اجرا کنید و `DATABASE_URL` را به PostgreSQL واقعی خود بدهید.
2. `npm install`
3. پس از تغییر schema، migration را با `npm run db:generate` تولید و فایل SQL تولیدشده را review کنید.
4. migrationها را فقط روی همان PostgreSQL با `npm run db:migrate` اعمال کنید؛ این دستور به `DATABASE_URL` نیاز دارد و بدون آن fail می‌شود.
5. `npm run dev`

برای محیط توسعه از PostgreSQL واقعی جداگانه استفاده کنید و مقدار `DATABASE_URL` را در `.env` نگه دارید؛ فایل `.env` هرگز commit نمی‌شود. از `db:push` یا تغییر دستی migrationهای اجراشده استفاده نکنید؛ تغییرات schema باید migration نسخه‌دار جدید باشند.

## بررسی کیفیت

`npm run typecheck`، `npm run lint` و `npm run build` باید پیش از Merge موفق باشند.

جزئیات boundaryهای Authentication و Content Sources در کد `src/server` قرار دارد؛ تا زمان تهیه credential واقعی، اتصال‌ها عمداً فعال نیستند.