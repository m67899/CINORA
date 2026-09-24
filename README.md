# Cinora

Foundation اولیه اپلیکیشن سینمایی Cinora.

## وضعیت

این مرحله فقط زیرساخت پروژه است و هیچ صفحه محصولی مانند Login، Home، Reels، Live TV یا Rooms در آن ساخته نشده است. مسیر `/` صرفاً یک route صحت‌سنجی Foundation است.

## توسعه محلی

1. `cp .env.example .env` را اجرا کنید و `DATABASE_URL` را به PostgreSQL واقعی خود بدهید.
2. `npm install`
3. برای ساخت migration: `npm run db:generate`
4. برای اجرای migration: `npm run db:migrate`
5. `npm run dev`

## بررسی کیفیت

`npm run typecheck`، `npm run lint` و `npm run build` باید پیش از Merge موفق باشند.

جزئیات boundaryهای Authentication و Content Sources در کد `src/server` قرار دارد؛ تا زمان تهیه credential واقعی، اتصال‌ها عمداً فعال نیستند.