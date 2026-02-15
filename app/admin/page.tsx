'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { db } from '@/lib/firebase'
import { collection, query, orderBy, onSnapshot, limit } from 'firebase/firestore'

interface Conversation {
  id: string
  userMessage: string
  aiResponse: string
  hasImage: boolean
  timestamp: any
  user: string
}

export default function AdminPage() {
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Check authentication
    const authCookie = document.cookie.split('; ').find(row => row.startsWith('auth='))
    if (!authCookie) {
      router.push('/login')
      return
    }

    // Fetch conversations from Firebase
    const q = query(
      collection(db, 'conversations'),
      orderBy('timestamp', 'desc'),
      limit(100)
    )

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Conversation[]
      
      setConversations(data)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [router])

  const formatDate = (timestamp: any) => {
    if (!timestamp) return 'الآن'
    const date = timestamp.toDate()
    return new Intl.DateTimeFormat('ar-SA', {
      dateStyle: 'medium',
      timeStyle: 'short'
    }).format(date)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border-2 border-pink-200">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-rose-500 to-pink-600 flex items-center justify-center text-white shadow-lg">
                <i className="fa-solid fa-chart-line"></i>
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-rose-900">لوحة التحكم</h1>
                <p className="text-sm text-rose-600">سجلات المحادثات مع رهف</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => router.push('/chat')}
                className="px-4 py-2 bg-gradient-to-r from-rose-500 to-pink-600 text-white rounded-lg hover:shadow-lg transition-all text-sm"
              >
                <i className="fa-solid fa-comment ml-2"></i>
                المحادثة
              </button>
              <button
                onClick={() => {
                  document.cookie = 'auth=; path=/; max-age=0'
                  router.push('/login')
                }}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:shadow-lg transition-all text-sm"
              >
                <i className="fa-solid fa-right-from-bracket ml-2"></i>
                خروج
              </button>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-xl shadow-md p-6 border border-pink-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-rose-600 mb-1">إجمالي المحادثات</p>
                <p className="text-3xl font-bold text-rose-900">{conversations.length}</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-rose-100 flex items-center justify-center">
                <i className="fa-solid fa-messages text-rose-500 text-xl"></i>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-6 border border-pink-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-rose-600 mb-1">مع صور</p>
                <p className="text-3xl font-bold text-rose-900">
                  {conversations.filter(c => c.hasImage).length}
                </p>
              </div>
              <div className="w-12 h-12 rounded-full bg-pink-100 flex items-center justify-center">
                <i className="fa-solid fa-image text-pink-500 text-xl"></i>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-6 border border-pink-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-rose-600 mb-1">نصوص فقط</p>
                <p className="text-3xl font-bold text-rose-900">
                  {conversations.filter(c => !c.hasImage).length}
                </p>
              </div>
              <div className="w-12 h-12 rounded-full bg-rose-100 flex items-center justify-center">
                <i className="fa-solid fa-font text-rose-500 text-xl"></i>
              </div>
            </div>
          </div>
        </div>

        {/* Conversations List */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-pink-200">
          <h2 className="text-xl font-bold text-rose-900 mb-4 flex items-center gap-2">
            <i className="fa-solid fa-history"></i>
            سجل المحادثات
          </h2>

          {loading ? (
            <div className="text-center py-12">
              <i className="fa-solid fa-spinner fa-spin text-4xl text-rose-400 mb-4"></i>
              <p className="text-rose-600">جاري التحميل...</p>
            </div>
          ) : conversations.length === 0 ? (
            <div className="text-center py-12">
              <i className="fa-solid fa-inbox text-6xl text-rose-200 mb-4"></i>
              <p className="text-rose-600">لا توجد محادثات بعد</p>
            </div>
          ) : (
            <div className="space-y-4 max-h-[600px] overflow-y-auto">
              {conversations.map((conv) => (
                <div 
                  key={conv.id}
                  className="border border-pink-100 rounded-xl p-4 hover:shadow-md transition-all bg-gradient-to-br from-white to-pink-50"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-pink-100 flex items-center justify-center">
                        <i className="fa-solid fa-user text-pink-500 text-sm"></i>
                      </div>
                      <span className="font-bold text-rose-900 text-sm">{conv.user}</span>
                      {conv.hasImage && (
                        <span className="px-2 py-1 bg-rose-100 text-rose-600 rounded-full text-xs">
                          <i className="fa-solid fa-image ml-1"></i>
                          صورة
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-rose-400">
                      {formatDate(conv.timestamp)}
                    </span>
                  </div>

                  <div className="space-y-3">
                    <div className="bg-white p-3 rounded-lg border border-pink-100">
                      <p className="text-xs text-rose-500 font-semibold mb-1">رهف:</p>
                      <p className="text-gray-700 text-sm">{conv.userMessage}</p>
                    </div>

                    <div className="bg-gradient-to-r from-rose-500 to-pink-600 p-3 rounded-lg">
                      <p className="text-xs text-white/80 font-semibold mb-1">قيس GPT:</p>
                      <p className="text-white text-sm">{conv.aiResponse}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
