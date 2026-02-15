# API Documentation 📡

## Overview

المشروع يستخدم Next.js API Routes لإخفاء API keys والتواصل مع Gemini AI بشكل آمن.

---

## Endpoint: `/api/chat`

### Method: `POST`

### Description
يستقبل رسائل من الـ Frontend ويرسلها إلى Gemini API مع حماية الـ API Key.

### Request Body

```typescript
{
  message: string;          // نص الرسالة
  history: Array<{          // سجل المحادثة
    role: 'user' | 'model';
    parts: Array<{ text: string }>;
  }>;
  image?: string;           // Base64 encoded image (اختياري)
}
```

### Example Request

```javascript
const response = await fetch('/api/chat', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    message: 'مرحبا! كيف حالك؟',
    history: [
      {
        role: 'user',
        parts: [{ text: 'السلام عليكم' }]
      },
      {
        role: 'model',
        parts: [{ text: 'وعليكم السلام! كيف يمكنني مساعدتك؟' }]
      }
    ]
  })
});

const data = await response.json();
```

### Response

#### Success (200)

```json
{
  "success": true,
  "reply": "مرحبا بك يا رهف! أنا بخير، شكراً لسؤالك. كيف يمكنني مساعدتك اليوم؟ ❤️"
}
```

#### Error (500)

```json
{
  "error": "Internal server error",
  "details": "Error message details"
}
```

---

## System Prompt

الـ API يستخدم System Prompt مخصص لشخصية قيس:

```javascript
const SYSTEM_PROMPT = `
أنت مساعد ذكي رومانسي تم إنشاؤه بواسطة قيس جازي خصيصاً لرهف...
`;
```

هذا يعطي الـ AI شخصية مميزة ورومانسية.

---

## Specific Answers

يوجد إجابات محددة مسبقاً لأسئلة معينة:

```javascript
const specificAnswers = {
  "من قيس": "قيس هو الشخص الذي صنعني خصيصاً لرهف...",
  "ما رأيك في رهف": "رهف هي إنسانة رائعة...",
  // ...
};
```

إذا تطابق السؤال، يتم إرجاع الإجابة الجاهزة مباشرة.

---

## Image Processing

### عند إرسال صورة:

1. Frontend يحول الصورة إلى Base64
2. يرسلها في الـ Request Body
3. Backend يحولها لـ Gemini Vision format:

```javascript
{
  inlineData: {
    mimeType: 'image/jpeg',
    data: base64Image
  }
}
```

4. Gemini يحلل الصورة ويرد

---

## Environment Variables

الـ API يحتاج إلى:

```bash
GEMINI_API_KEY=your_gemini_api_key
```

**مهم**: هذا المتغير يُستخدم فقط في الـ Backend ولا يظهر في الـ Frontend أبداً.

---

## Security Features

### 1. API Key Protection
```typescript
const API_KEY = process.env.GEMINI_API_KEY;
if (!API_KEY) {
  return Response.json(
    { error: 'API key not configured' },
    { status: 500 }
  );
}
```

### 2. CORS Headers
```typescript
return Response.json(data, {
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST',
    'Access-Control-Allow-Headers': 'Content-Type',
  },
});
```

### 3. Error Handling
```typescript
try {
  // API call
} catch (error) {
  console.error('Error:', error);
  return Response.json(
    { error: 'Internal server error' },
    { status: 500 }
  );
}
```

---

## Usage Examples

### Example 1: Simple Text Message

```typescript
const sendMessage = async (message: string, history: any[]) => {
  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, history })
    });
    
    const data = await response.json();
    
    if (data.success) {
      console.log('Reply:', data.reply);
    } else {
      console.error('Error:', data.error);
    }
  } catch (error) {
    console.error('Network error:', error);
  }
};
```

### Example 2: Message with Image

```typescript
const sendImageMessage = async (
  message: string,
  image: File,
  history: any[]
) => {
  // Convert image to base64
  const base64 = await fileToBase64(image);
  
  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message,
        history,
        image: base64
      })
    });
    
    const data = await response.json();
    
    if (data.success) {
      console.log('Reply:', data.reply);
    }
  } catch (error) {
    console.error('Error:', error);
  }
};

// Helper function
const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const base64 = (reader.result as string).split(',')[1];
      resolve(base64);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};
```

---

## Rate Limiting

**Gemini Free Tier Limits:**
- 60 requests per minute
- 1500 requests per day

**Recommendation:**
- أضف rate limiting في الـ API Route إذا لزم الأمر
- استخدم caching للإجابات المتكررة

---

## Testing

### Local Testing

```bash
# Start dev server
npm run dev

# Test endpoint
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{
    "message": "مرحبا",
    "history": []
  }'
```

### Production Testing

```bash
curl -X POST https://your-project.vercel.app/api/chat \
  -H "Content-Type: application/json" \
  -d '{
    "message": "مرحبا",
    "history": []
  }'
```

---

## Troubleshooting

### خطأ: "API key not configured"
**الحل**: تأكد من وجود `GEMINI_API_KEY` في `.env.local` محلياً أو في Vercel Environment Variables

### خطأ: "Failed to fetch"
**الحل**: 
- تحقق من أن الـ server يعمل (`npm run dev`)
- تحقق من الـ Network tab في DevTools

### خطأ: "Internal server error"
**الحل**:
- راجع Console logs
- تحقق من صحة API Key
- راجع Vercel Function Logs

---

## Future Improvements

### Recommendations:

1. **Add Rate Limiting**:
```typescript
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 10 // max 10 requests per minute
});
```

2. **Add Caching**:
```typescript
// Cache specific answers to reduce API calls
const cache = new Map();

if (cache.has(message)) {
  return Response.json({
    success: true,
    reply: cache.get(message)
  });
}
```

3. **Add Analytics**:
```typescript
// Log requests for monitoring
await db.collection('api_logs').add({
  timestamp: new Date(),
  message: message.substring(0, 100),
  userId: 'rahaf',
  hasImage: !!image
});
```

4. **Add Request Validation**:
```typescript
// Validate request body
if (!message || typeof message !== 'string') {
  return Response.json(
    { error: 'Invalid message format' },
    { status: 400 }
  );
}

if (message.length > 5000) {
  return Response.json(
    { error: 'Message too long' },
    { status: 400 }
  );
}
```

---

## Contact & Support

للمزيد من المعلومات أو الدعم:
- **Repository**: https://github.com/qaes26/-ai-rahaf
- **Gemini AI Docs**: https://ai.google.dev/docs
- **Next.js API Routes**: https://nextjs.org/docs/app/building-your-application/routing/route-handlers

---

**Created with ❤️ by Qais for Rahaf**
