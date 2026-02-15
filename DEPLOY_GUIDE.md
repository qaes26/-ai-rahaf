# دليل النشر السريع 🚀

## قبل البدء - تحقق من هذه الأشياء ✅

1. **Firebase جاهز؟**
   - إذا لم تنشئ مشروع Firebase بعد، افتح ملف `FIREBASE_SETUP.md` واتبع الخطوات
   - تأكد من وضع قيم Firebase في ملف `.env.local`

2. **تجربة محلية:**
   ```bash
   npm install
   npm run dev
   ```
   - افتح `http://localhost:3000`
   - جرب تسجيل الدخول (rahaf / rahaf2025)
   - أرسل رسالة وتأكد أنها تعمل

---

## الطريقة 1: النشر المباشر من GitHub (موصى بها) 🌟

### الخطوة 1: رفع الكود على GitHub

```bash
# تأكد من أنك في مجلد المشروع
cd /path/to/your/project

# إضافة جميع الملفات
git add .

# عمل commit
git commit -m "Secure version: API hidden + Firebase integrated"

# رفع على GitHub
git push origin main
```

**ملاحظة مهمة:** ملف `.env.local` لن يرفع على GitHub (موجود في `.gitignore`) ✅

---

### الخطوة 2: ربط Vercel بـ GitHub

1. **اذهب إلى Vercel:**
   - افتح https://vercel.com/
   - سجّل دخول بحساب GitHub نفسه

2. **استورد المشروع:**
   - اضغط "Add New" → "Project"
   - اختر repository: `qaes26/-ai-rahaf`
   - اضغط "Import"

3. **إعدادات المشروع:**
   - **Framework Preset**: Next.js (يتعرف عليه تلقائياً)
   - **Root Directory**: `./` (اتركه كما هو)
   - **Build Command**: `npm run build` (تلقائي)

---

### الخطوة 3: إضافة Environment Variables (مهم جداً!) 🔑

قبل الضغط على "Deploy"، اضغط على "Environment Variables":

انسخ هذه القيم من ملف `.env.local` وضعها واحدة واحدة:

```
Name: GEMINI_API_KEY
Value: your_gemini_api_key_here
```

```
Name: NEXT_PUBLIC_FIREBASE_API_KEY
Value: [قيمتك من Firebase]
```

```
Name: NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
Value: [قيمتك من Firebase]
```

```
Name: NEXT_PUBLIC_FIREBASE_PROJECT_ID
Value: [قيمتك من Firebase]
```

```
Name: NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
Value: [قيمتك من Firebase]
```

```
Name: NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
Value: [قيمتك من Firebase]
```

```
Name: NEXT_PUBLIC_FIREBASE_APP_ID
Value: [قيمتك من Firebase]
```

**اضغط "Add" بعد كل متغير**

---

### الخطوة 4: Deploy!

1. بعد إضافة جميع المتغيرات، اضغط **"Deploy"**
2. انتظر 1-3 دقائق حتى يكتمل البناء
3. عند الانتهاء، ستظهر رسالة "Congratulations!" 🎉

---

### الخطوة 5: اختبار المشروع

ستحصل على رابط مثل: `https://ai-rahaf.vercel.app`

**اختبر هذه الصفحات:**
- `https://your-project.vercel.app/` → يجب أن يوجهك لـ `/login`
- `https://your-project.vercel.app/login` → صفحة تسجيل الدخول
- `https://your-project.vercel.app/chat` → المحادثة (بعد تسجيل الدخول)
- `https://your-project.vercel.app/admin` → لوحة التحكم

---

## الطريقة 2: النشر من v0 مباشرة 🎯

إذا كنت تستخدم v0، يمكنك:

1. **اضغط زر "Publish" في الأعلى**
2. **اختر Connect to Vercel**
3. **أضف Environment Variables كما في الطريقة الأولى**
4. **اضغط Deploy**

---

## بعد النشر - خطوات إضافية 🔧

### 1. تحديث Firebase Rules (للأمان)

في Firebase Console → Firestore Database → Rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /conversations/{document=**} {
      // السماح بالقراءة والكتابة للجميع
      allow read, write: if true;
      
      // أو للحماية الأفضل (إذا أضفت Firebase Auth):
      // allow read, write: if request.auth != null;
    }
  }
}
```

اضغط "Publish"

---

### 2. تخصيص Domain (اختياري)

في Vercel Dashboard:
1. اذهب إلى Settings → Domains
2. أضف domain مخصص مثل `rahaf-ai.com`
3. اتبع التعليمات لربط الـ DNS

---

### 3. مراقبة الأخطاء

في Vercel Dashboard:
- اذهب إلى Runtime Logs لمشاهدة الأخطاء
- تحقق من Function Logs للـ API

---

## مشاكل شائعة وحلولها 🔧

### ❌ خطأ: "Missing environment variables"
**الحل:**
1. اذهب إلى Vercel Dashboard
2. Settings → Environment Variables
3. تأكد من إضافة جميع المتغيرات السبعة
4. Redeploy المشروع

### ❌ خطأ: "Firebase configuration error"
**الحل:**
- تأكد من أن قيم Firebase صحيحة
- تحقق من أنها بدون علامات اقتباس زائدة
- أعد deploy

### ❌ الصفحة بيضاء فارغة
**الحل:**
- افتح Console في المتصفح (F12)
- شاهد الأخطاء
- غالباً ستكون Firebase configuration خاطئة

### ❌ خطأ 500 عند إرسال رسالة
**الحل:**
- تحقق من `GEMINI_API_KEY` في Vercel Environment Variables
- تأكد من أن المفتاح صحيح وفعال

---

## التحديثات المستقبلية 🔄

عند تحديث الكود:

```bash
git add .
git commit -m "Update: وصف التحديث"
git push origin main
```

**Vercel سيعمل auto-deploy تلقائياً!** ✨

---

## الأمان والخصوصية 🔒

✅ **ما تم تأمينه:**
- GEMINI_API_KEY مخفي في Backend (لا يظهر في Browser)
- ملف `.env.local` لا يرفع على GitHub
- Firebase keys في Environment Variables فقط
- نظام تسجيل دخول بسيط

✅ **كل المحادثات محفوظة في Firebase**
- يمكنك مراجعتها من `/admin`
- أو مباشرة من Firebase Console

---

## روابط مهمة 🔗

- **Vercel Dashboard**: https://vercel.com/dashboard
- **Firebase Console**: https://console.firebase.google.com/
- **GitHub Repository**: https://github.com/qaes26/-ai-rahaf

---

**صُنع بحب ❤️ من قيس لرهف**

إذا واجهت أي مشكلة، افتح مشكلة (Issue) في GitHub أو راجع ملف `FIREBASE_SETUP.md`
