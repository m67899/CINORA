# Cinora Agent Rules

Cinora یک محصول واقعی است، نه نمونه نمایشی. هر تغییر باید کوچک، قابل بررسی و مطابق مستندات جامع محصول باشد.

- قابلیت نهایی Mock یا Fake نسازید. اگر سرویس خارجی یا credential موجود نیست، interface/service boundary و خطای configuration ایجاد کنید و محدودیت را گزارش دهید.
- بدون دلیل فایل حذف یا معماری عوض نشود.
- هر Feature در Issue جدا ساخته شود.
- پیش از Merge، تست، Type Check و Build اجرا و موفقیت آن‌ها بررسی شود.
- قابلیت خارج از مستند جامع Cinora اضافه نشود.
- تغییرات بزرگ ابتدا بررسی و به بخش‌های کوچک قابل بازبینی تقسیم شوند.
- هیچ Secret، Token، credential یا فایل محیطی واقعی داخل Repository قرار نگیرد.
- منطق Business، Database و API در UI component قرار نگیرد.
- برای تغییرات schema فقط migration versioned استفاده شود؛ جدول یا مدل تکراری نسازید.