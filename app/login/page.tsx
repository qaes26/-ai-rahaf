'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      console.log('[v0] Login attempt - username:', username)
      console.log('[v0] Login attempt - password:', password)

      // Simple hardcoded authentication
      if (username === 'rahaf' && password === 'rahaf2025') {
        console.log('[v0] Login successful, setting cookie')
        // Set auth cookie/session
        document.cookie = 'auth=true; path=/; max-age=86400' // 24 hours
        console.log('[v0] Cookie set, redirecting to /chat')
        
        // Small delay to ensure cookie is set
        await new Promise(resolve => setTimeout(resolve, 100))
        
        window.location.href = '/chat'
      } else {
        console.log('[v0] Login failed - incorrect credentials')
        setError('اسم المستخدم أو كلمة المرور غير صحيحة')
        setLoading(false)
      }
    } catch (err) {
      console.error('[v0] Login error:', err)
      setError('حدث خطأ أثناء تسجيل الدخول')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 via-rose-100 to-pink-200">
      <div className="w-full max-w-md p-8 bg-white rounded-3xl shadow-2xl border-4 border-pink-200">
        <div className="text-center mb-8">
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-rose-500 to-pink-600 flex items-center justify-center text-white shadow-lg">
            <i className="fa-solid fa-user-tie text-3xl"></i>
          </div>
          <h1 className="text-3xl font-bold text-rose-900 mb-2">قيس GPT</h1>
          <p className="text-rose-600 text-sm">مرحباً يا رهف، سجلي دخولك</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-rose-900 mb-2">
              اسم المستخدم
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 border-2 border-pink-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-400 focus:border-transparent transition"
              placeholder="rahaf"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-rose-900 mb-2">
              كلمة المرور
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border-2 border-pink-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-400 focus:border-transparent transition"
              placeholder="••••••••"
              required
            />
          </div>

          {error && (
            <div className="p-3 bg-red-100 border border-red-300 text-red-700 rounded-xl text-sm text-center">
              <i className="fa-solid fa-exclamation-circle ml-1"></i>
              {error}
            </div>
          )}

          <div className="p-3 bg-blue-50 border border-blue-200 text-blue-700 rounded-xl text-xs text-center">
            <i className="fa-solid fa-info-circle ml-1"></i>
            <div className="font-bold mb-1">معلومات تسجيل الدخول:</div>
            <div>اسم المستخدم: <span className="font-mono bg-blue-100 px-2 py-1 rounded">rahaf</span></div>
            <div>كلمة المرور: <span className="font-mono bg-blue-100 px-2 py-1 rounded">rahaf2025</span></div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-rose-500 to-pink-600 text-white font-bold rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <i className="fa-solid fa-spinner fa-spin"></i>
                جاري التحميل...
              </span>
            ) : (
              'تسجيل الدخول ❤️'
            )}
          </button>
        </form>

        <div className="mt-6 text-center text-xs text-rose-400">
          صُنع بحب من قيس جازي لرهف ❤️
        </div>
      </div>
    </div>
  )
}
