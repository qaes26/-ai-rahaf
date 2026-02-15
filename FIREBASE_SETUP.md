# دليل إعداد Firebase خطوة بخطوة 🔥

## الخطوة 1: إنشاء مشروع Firebase

1. **افتح المتصفح واذهب إلى:**
   ```
   https://console.firebase.google.com/
   ```

2. **سجّل الدخول بحساب Google الخاص بك**

3. **اضغط على زر "Add project" أو "إضافة مشروع"**

4. **اكتب اسم المشروع:**
   - اكتب: `qais-gpt` (أو أي اسم تحبه)
   - اضغط "Continue"

5. **Google Analytics:**
   - يمكنك تعطيله (غير ضروري للمشروع)
   - اضغط "Create project"

6. **انتظر قليلاً حتى ينتهي إنشاء المشروع**
   - اضغط "Continue" عندما يظهر "Your new project is ready"

---

## الخطوة 2: تفعيل Firestore Database

1. **من القائمة الجانبية، اضغط على "Build"**

2. **اختر "Firestore Database"**

3. **اضغط على زر "Create database"**

4. **اختر الوضع:**
   - اختر **"Start in test mode"** (للتجربة والتطوير)
   - اضغط "Next"

5. **اختر المنطقة الجغرافية:**
   - اختر أقرب منطقة لك (مثلاً: `asia-south1` أو `europe-west`)
   - اضغط "Enable"

6. **انتظر حتى يكتمل الإعداد** ✅

---

## الخطوة 3: الحصول على مفاتيح Firebase

1. **اضغط على رمز الترس ⚙️ في الأعلى (بجانب "Project Overview")**

2. **اختر "Project settings"**

3. **انزل للأسفل حتى تجد "Your apps"**

4. **اضغط على أيقونة الويب `</>`** (Web)

5. **سجّل التطبيق:**
   - App nickname: اكتب `Qais GPT Web`
   - **لا تختر** "Also set up Firebase Hosting"
   - اضغط "Register app"

6. **انسخ الكود الذي يظهر لك:**
   
   سيظهر لك شيء مثل هذا:
   ```javascript
   const firebaseConfig = {
     apiKey: "AIzaSyABC123...",
     authDomain: "qais-gpt.firebaseapp.com",
     projectId: "qais-gpt",
     storageBucket: "qais-gpt.appspot.com",
     messagingSenderId: "123456789",
     appId: "1:123456789:web:abc123def456"
   };
   ```

7. **انسخ كل قيمة وضعها في ملف `.env.local`**

---

## الخطوة 4: تحديث ملف .env.local

افتح ملف `.env.local` في مشروعك وضع القيم كالتالي:

```bash
# Gemini API Key (ضع مفتاحك هنا)
GEMINI_API_KEY=your_gemini_api_key_here

# ضع قيم Firebase هنا (من الخطوة السابقة)
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyABC123...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=qais-gpt.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=qais-gpt
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=qais-gpt.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abc123def456
```

---

## الخطوة 5: تشغيل المشروع

في Terminal أو Command Prompt:

```bash
# تثبيت المكتبات (أول مرة فقط)
npm install

# تشغيل المشروع
npm run dev
```

افتح المتصفح على: `http://localhost:3000`

---

## الخطوة 6: اختبار تسجيل الدخول

1. افتح `http://localhost:3000`
2. ستنتقل تلقائياً لصفحة تسجيل الدخول
3. **اسم المستخدم:** `rahaf`
4. **كلمة المرور:** `rahaf2025`
5. اضغط "تسجيل الدخول" ❤️

---

## الخطوة 7: رفع المشروع على Vercel

### أ. دفع الكود على GitHub

```bash
git add .
git commit -m "Secure version with Firebase"
git push origin main
```

### ب. ربط Vercel بـ GitHub

1. اذهب إلى: https://vercel.com/
2. سجّل الدخول بحساب GitHub
3. اضغط "Add New" > "Project"
4. اختر المشروع من GitHub
5. **مهم جداً:** أضف Environment Variables:
   - انسخ كل المتغيرات من `.env.local`
   - الصقها في Vercel > Settings > Environment Variables
6. اضغط "Deploy"

### ج. انتظر الـ Deployment

- سيستغرق 1-2 دقيقة
- بعد الانتهاء، ستحصل على رابط مثل: `https://your-project.vercel.app`

---

## 🎉 تم! المشروع جاهز

- **الدخول للمحادثة:** `https://your-project.vercel.app/chat`
- **لوحة التحكم:** `https://your-project.vercel.app/admin`
- **الإيميل المفتاح محمي** ولن يظهر في GitHub أبداً!

---

## ❓ مشاكل شائعة وحلولها

### 1. خطأ "Firebase: Error (auth/configuration-not-found)"
**الحل:** تأكد من نسخ جميع قيم Firebase بشكل صحيح في `.env.local`

### 2. خطأ "Missing or insufficient permissions"
**الحل:** غيّر Firebase Rules في Console:
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

### 3. المشروع لا يعمل بعد `npm run dev`
**الحل:** 
```bash
# احذف المجلدات وأعد التثبيت
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### 4. الصور لا تعمل في Gemini
**الحل:** تأكد من أن `GEMINI_API_KEY` موجود في Vercel Environment Variables

---

**صُنع بحب من قيس لرهف ❤️**
