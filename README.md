# قيس GPT - مخصص لرهف ❤️

مشروع شخصي: مساعد AI رومانسي مصمم خصيصاً من قيس إلى رهف، مع ميزات حماية API وتسجيل المحادثات.

## 🌟 المميزات

- 💬 محادثات ذكية باستخدام Gemini AI
- 🔒 حماية API Key في الـ Backend
- 📸 دعم رفع الصور وتحليلها
- 🔐 نظام تسجيل دخول بسيط
- 📊 لوحة تحكم لمراقبة سجلات المحادثات
- 💾 حفظ المحادثات في Firebase Firestore
- 🎨 تصميم رومانسي بالعربية (RTL)
- 📱 متجاوب مع جميع الأجهزة

## 🚀 البدء السريع

### 1. تثبيت المشروع

```bash
npm install
# أو
yarn install
# أو
pnpm install
```

### 2. إعداد Firebase

1. اذهب إلى [Firebase Console](https://console.firebase.google.com/)
2. أنشئ مشروع جديد
3. فعّل **Firestore Database**:
   - اذهب إلى Build > Firestore Database
   - اضغط "Create database"
   - اختر وضع الاختبار (Test mode) للبداية
   - اختر المنطقة القريبة منك
4. احصل على مفاتيح Firebase:
   - اذهب إلى Project Settings (⚙️ > Project settings)
   - انزل إلى "Your apps"
   - اضغط على رمز الويب `</>` لإضافة تطبيق ويب
   - سجل التطبيق (اختر اسم مثل "Qais GPT")
   - انسخ بيانات `firebaseConfig`

### 3. إعداد المتغيرات البيئية

أنشئ ملف `.env.local` في جذر المشروع:

```bash
# Gemini API Key
GEMINI_API_KEY=your_gemini_api_key_here

# Firebase Configuration (ضع مفاتيحك هنا)
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

> **ملاحظة مهمة**: تم نقل `GEMINI_API_KEY` إلى الـ Backend ولن يظهر في الكود المرفوع على GitHub

### 4. تشغيل المشروع محلياً

```bash
npm run dev
```

افتح [http://localhost:3000](http://localhost:3000) في المتصفح.

### 5. تسجيل الدخول

- **اسم المستخدم**: `rahaf`
- **كلمة المرور**: `rahaf2025`

(يمكنك تغييرها من ملف `app/login/page.tsx`)

## 📁 هيكل المشروع

```
├── app/
│   ├── api/
│   │   └── chat/
│   │       └── route.ts          # API endpoint (Backend)
│   ├── admin/
│   │   └── page.tsx              # لوحة تحكم المحادثات
│   ├── chat/
│   │   └── page.tsx              # صفحة المحادثة الرئيسية
│   ├── login/
│   │   └── page.tsx              # صفحة تسجيل الدخول
│   ├── layout.tsx                # التخطيط الرئيسي
│   ├── globals.css               # الأنماط العامة
│   └── page.tsx                  # الصفحة الرئيسية (Redirect)
├── lib/
│   └── firebase.ts               # إعدادات Firebase
├── public/                       # الملفات الثابتة
└── .env.local                    # المتغيرات البيئية (لا ترفعه على Git!)
```

## 🔐 الأمان

### API Key محمي
- تم نقل `GEMINI_API_KEY` من Frontend إلى Backend
- يتم استدعاء Gemini API فقط من `/app/api/chat/route.ts`
- لا يمكن لأي شخص رؤية المفتاح في الكود المصدري

### Firebase Security Rules (موصى بها)

في Firebase Console > Firestore Database > Rules، ضع هذه القواعد:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /conversations/{document=**} {
      // السماح بالقراءة والكتابة للجميع (للتطوير)
      allow read, write: if true;
      
      // أو لحماية أفضل (بعد إضافة Authentication):
      // allow read, write: if request.auth != null;
    }
  }
}
```

## 📦 النشر على Vercel

### 1. دفع الكود إلى GitHub

```bash
git add .
git commit -m "Secure API and add Firebase integration"
git push origin main
```

### 2. ربط المشروع بـ Vercel

1. اذهب إلى [Vercel Dashboard](https://vercel.com/dashboard)
2. اضغط "Add New Project"
3. استورد المشروع من GitHub
4. أضف المتغيرات البيئية:
   - اذهب إلى Settings > Environment Variables
   - أضف جميع المتغيرات من `.env.local`
5. اضغط Deploy

### 3. الوصول للمشروع

- **المحادثة**: `https://your-project.vercel.app/chat`
- **لوحة التحكم**: `https://your-project.vercel.app/admin`
- **تسجيل الدخول**: `https://your-project.vercel.app/login`

## 🎨 التخصيص

### تغيير بيانات تسجيل الدخول

في `app/login/page.tsx`، عدّل السطر:

```typescript
if (username === 'rahaf' && password === 'rahaf2025') {
```

### تغيير شخصية AI

في `app/api/chat/route.ts`، عدّل `SYSTEM_PROMPT`

### إضافة إجابات سريعة

في `app/api/chat/route.ts`، أضف إلى `specificAnswers`:

```typescript
"السؤال الجديد": "الإجابة الجديدة ❤️"
```

## 🛠️ التقنيات المستخدمة

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **AI**: Google Gemini 2.0
- **Database**: Firebase Firestore
- **Deployment**: Vercel Serverless Functions
- **Icons**: Font Awesome 6
- **Markdown**: Marked.js

## 📝 الملاحظات

- تم إزالة API Key من الملف القديم `index.html`
- جميع المحادثات يتم حفظها تلقائياً في Firebase
- يمكنك الوصول لسجل المحادثات من صفحة `/admin`
- المشروع يدعم رفع الصور وتحليلها بواسطة Gemini Vision

## ❤️ صُنع بحب

من قيس جازي إلى رهف 🌹
