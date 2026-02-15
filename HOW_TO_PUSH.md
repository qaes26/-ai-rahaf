# كيفية رفع الملفات على GitHub

جميع الملفات جاهزة محلياً، لكن تحتاج لرفعها على GitHub. إليك الطريقة:

## الطريقة 1: استخدام واجهة v0 (الأسهل)

### الخطوة 1: افتح لوحة Git
1. انظر إلى الشريط الجانبي الأيسر في v0
2. ابحث عن أيقونة "Git" أو "GitHub" أو "Source Control"
3. اضغط عليها

### الخطوة 2: راجع التغييرات
ستظهر لك قائمة بجميع الملفات الجديدة والمعدلة:
- 31 ملف جديد
- index.html محذوف

### الخطوة 3: اكتب رسالة Commit
في صندوق النص، اكتب مثلاً:
```
Migrate to Next.js with secure API and Firebase integration
```

### الخطوة 4: Commit & Push
- اضغط على زر "Commit" أو "Commit & Push"
- أو اضغط على زر "Push to GitHub"

---

## الطريقة 2: استخدام زر Publish (إذا كان موجوداً)

1. ابحث عن زر "Publish" في أعلى يمين الشاشة
2. اضغط عليه
3. سيرفع جميع التغييرات تلقائياً

---

## الطريقة 3: Download وارفع يدوياً

إذا لم تنجح الطرق السابقة:

### 1. حمّل المشروع
- اضغط على القائمة (⋮) في أعلى يمين v0
- اختر "Download Project" أو "Download ZIP"
- فك ضغط الملف

### 2. ارفع على GitHub يدوياً

افتح Terminal في مجلد المشروع واكتب:

```bash
# تأكد أنك في branch الصحيح
git status

# إضافة جميع الملفات
git add .

# Commit التغييرات
git commit -m "Migrate to Next.js with secure API and Firebase integration"

# رفع على GitHub
git push origin project-deployment-with-vercel
```

---

## بعد الرفع على GitHub

### 1. تحقق من GitHub
اذهب إلى: `https://github.com/qaes26/-ai-rahaf`

يجب أن ترى:
- Branch جديد: `project-deployment-with-vercel`
- أو Pull Request جديد

### 2. دمج التغييرات (إذا كان PR موجود)
- افتح Pull Request
- راجع التغييرات
- اضغط "Merge Pull Request"

### 3. النشر على Vercel
- اذهب إلى: https://vercel.com/new
- استورد المشروع من GitHub
- أضف Environment Variables (من ملف .env.local)
- اضغط "Deploy"

---

## ملاحظات مهمة

### الملفات المحمية (لن تُرفع)
هذه الملفات محمية في `.gitignore` ولن تظهر على GitHub:
- `.env.local` (يحتوي على API Keys)
- `node_modules/`
- `.next/`
- جميع الملفات الحساسة

### الملفات التي سيتم رفعها (31 ملف)
- `package.json`
- `next.config.ts`
- `tsconfig.json`
- `tailwind.config.ts`
- `app/` (جميع الصفحات)
- `lib/` (Firebase و utils)
- جميع ملفات التوثيق (*.md)
- `.gitignore`

### تحقق من الأمان قبل الرفع
تأكد أن `.env.local` غير موجود في قائمة الملفات التي سيتم رفعها!

---

## المساعدة

إذا واجهت مشكلة:
1. تأكد أنك مسجل دخول على GitHub في v0
2. تأكد أن المشروع متصل بـ repository الصحيح
3. جرب تحديث الصفحة وحاول مرة أخرى

المشروع جاهز 100% للرفع - فقط اتبع الخطوات أعلاه!
