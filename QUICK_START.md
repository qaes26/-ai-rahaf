# البدء السريع ⚡

## للمطور (قيس) - 5 خطوات فقط!

### 1️⃣ تثبيت المكتبات
```bash
npm install
```

### 2️⃣ إعداد Firebase
اتبع الخطوات في `FIREBASE_SETUP.md` (5 دقائق فقط)

### 3️⃣ إضافة المفاتيح
انسخ قيم Firebase في ملف `.env.local`:
```bash
GEMINI_API_KEY=AIzaSyCD_CoBanF2aC5Qsu1rGrf56Lk7zdcDKV0
NEXT_PUBLIC_FIREBASE_API_KEY=...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=...
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
NEXT_PUBLIC_FIREBASE_APP_ID=...
```

### 4️⃣ تشغيل المشروع
```bash
npm run dev
```
افتح: http://localhost:3000

### 5️⃣ النشر على Vercel
```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

ثم:
1. اذهب إلى https://vercel.com/
2. Import من GitHub
3. أضف Environment Variables (نفس قيم `.env.local`)
4. Deploy!

---

## للمستخدمة (رهف) - استخدام بسيط!

### تسجيل الدخول:
- **Username**: `rahaf`
- **Password**: `rahaf2025`

### استخدام المحادثة:
1. اكتبي رسالتك
2. أو ارفعي صورة 📷
3. اضغطي إرسال ✈️

### عرض السجلات:
اضغطي "سجل المحادثات" لمشاهدة جميع المحادثات السابقة

---

## روابط مهمة 🔗

- **الدليل الكامل**: `README.md`
- **إعداد Firebase**: `FIREBASE_SETUP.md`
- **دليل النشر**: `DEPLOY_GUIDE.md`
- **دليل المستخدم**: `USER_GUIDE.md`
- **ملخص التغييرات**: `SUMMARY.md`

---

## تحتاج مساعدة؟ ✋

### أثناء التطوير:
```bash
# مشكلة في التثبيت؟
rm -rf node_modules package-lock.json
npm install

# الصفحة لا تعمل؟
# تحقق من Console في المتصفح (F12)

# Firebase لا يعمل؟
# راجع قيم .env.local
```

### بعد النشر:
- راجع Vercel Dashboard → Runtime Logs
- تحقق من Environment Variables في Vercel
- راجع Firebase Console → Firestore

---

**المشروع جاهز! ابدأ الآن 🚀**
