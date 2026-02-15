# دليل رفع المشروع على GitHub 📤

## قبل الرفع - تحقق من هذه النقاط ✅

### 1. تأكد أن `.env.local` في `.gitignore`
```bash
# تحقق من الملف
cat .gitignore
# يجب أن تشاهد السطر:
# .env.local
```
✅ **مهم جداً**: هذا يمنع رفع API Keys على GitHub!

### 2. تأكد أن المشروع يعمل محلياً
```bash
npm run dev
```
- افتح http://localhost:3000
- جرب تسجيل الدخول
- أرسل رسالة
- تأكد أنها تحفظ في Firebase

---

## خطوات الرفع على GitHub

### الخطوة 1: تجهيز المشروع

```bash
# 1. تأكد أنك في مجلد المشروع
pwd
# يجب أن تشاهد: /path/to/your/project

# 2. تحقق من الملفات المتغيرة
git status
```

### الخطوة 2: إضافة جميع الملفات

```bash
# إضافة جميع الملفات الجديدة والمعدلة
git add .

# تحقق من الملفات التي ستُرفع
git status
```

**ملاحظة**: يجب ألا تشاهد `.env.local` في القائمة! ✅

### الخطوة 3: عمل Commit

```bash
# عمل commit مع رسالة واضحة
git commit -m "Secure version: Hide API keys + Add Firebase + Login system"
```

### الخطوة 4: الدفع إلى GitHub

```bash
# تحديد الـ Branch
git branch
# يجب أن تشاهد: * main (أو master)

# دفع التغييرات
git push origin main
# أو إذا كان master:
# git push origin master
```

---

## ماذا لو واجهت أخطاء؟

### ❌ خطأ: "Please tell me who you are"

```bash
git config --global user.email "your-email@example.com"
git config --global user.name "Your Name"
```

ثم أعد الـ commit:
```bash
git commit -m "Secure version: Hide API keys + Add Firebase"
git push origin main
```

### ❌ خطأ: "Updates were rejected"

```bash
# جلب التحديثات من GitHub أولاً
git pull origin main --rebase

# ثم ادفع مرة ثانية
git push origin main
```

### ❌ خطأ: "Authentication failed"

**الحل 1 - باستخدام Personal Access Token (موصى به):**

1. اذهب إلى GitHub → Settings → Developer settings → Personal access tokens
2. اضغط "Generate new token (classic)"
3. اختر Scopes: `repo` (كامل)
4. انسخ الـ Token

ثم:
```bash
git remote set-url origin https://YOUR_TOKEN@github.com/qaes26/-ai-rahaf.git
git push origin main
```

**الحل 2 - باستخدام SSH:**
```bash
git remote set-url origin git@github.com:qaes26/-ai-rahaf.git
git push origin main
```

---

## التحقق من نجاح الرفع

### 1. افتح GitHub Repository
```
https://github.com/qaes26/-ai-rahaf
```

### 2. تحقق من الملفات
يجب أن تشاهد:
- ✅ `app/` folder
- ✅ `lib/` folder
- ✅ `package.json`
- ✅ `README.md`
- ✅ `.gitignore`
- ❌ **لا تشاهد** `.env.local` (مهم!)

### 3. تحقق من آخر Commit
يجب أن تشاهد رسالة الـ commit الأخيرة:
"Secure version: Hide API keys + Add Firebase + Login system"

---

## بعد الرفع - النشر على Vercel

الآن المشروع جاهز للنشر! اتبع `DEPLOY_GUIDE.md`

أو مباشرة:

1. اذهب إلى: https://vercel.com/
2. سجل دخول بحساب GitHub
3. اضغط "Add New" → "Project"
4. اختر `qaes26/-ai-rahaf`
5. أضف Environment Variables (من `.env.local`)
6. Deploy!

---

## نصائح مهمة 💡

### 1. لا ترفع `.env.local` أبداً!
```bash
# للتحقق قبل كل push:
git status | grep ".env.local"
# يجب ألا تظهر أي نتيجة
```

### 2. استخدم رسائل Commit واضحة
```bash
# ✅ جيد:
git commit -m "Add admin dashboard for chat logs"
git commit -m "Fix: Image upload not working"
git commit -m "Update: Improve loading animation"

# ❌ سيء:
git commit -m "update"
git commit -m "fix bug"
git commit -m "changes"
```

### 3. اعمل Push بانتظام
```bash
# بعد كل تغيير كبير:
git add .
git commit -m "وصف واضح للتغيير"
git push origin main
```

---

## Commands مفيدة 🛠️

### عرض التاريخ:
```bash
git log --oneline
```

### التراجع عن آخر Commit (قبل Push):
```bash
git reset --soft HEAD~1
```

### مشاهدة التغييرات:
```bash
git diff
```

### مشاهدة الـ Branches:
```bash
git branch -a
```

---

## Checklist قبل كل Push ✅

- [ ] `npm run dev` يعمل بدون أخطاء
- [ ] `.env.local` موجود في `.gitignore`
- [ ] `git status` لا يظهر `.env.local`
- [ ] رسالة Commit واضحة
- [ ] تم اختبار التغييرات محلياً

---

**جاهز للرفع؟ ابدأ الآن! 🚀**

```bash
git add .
git commit -m "Secure version with Firebase integration"
git push origin main
```

ثم اذهب إلى `DEPLOY_GUIDE.md` للنشر على Vercel!
