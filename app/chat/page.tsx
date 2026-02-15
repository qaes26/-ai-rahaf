'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { marked } from 'marked'
import { supabase } from '@/lib/supabase'

interface Message {
  role: 'user' | 'ai'
  text?: string
  imageSrc?: string
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'ai',
      text: 'أهلاً بكِ يا أميرتي رهف.. 🌹<br>أنا نسختكِ من قيس، موجود هنا لأسمعكِ وأحبكِ في كل وقت. عماذا تودين الحديث اليوم؟'
    }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [imageBase64, setImageBase64] = useState<string | null>(null)
  const [imageMimeType, setImageMimeType] = useState<string | null>(null)
  
  const chatContainerRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
    }
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const createHeart = (x: number, y: number) => {
    const heart = document.createElement('i')
    heart.classList.add('fa-solid', 'fa-heart', 'heart-particle')
    heart.style.left = x + 'px'
    heart.style.top = y + 'px'
    document.body.appendChild(heart)
    setTimeout(() => heart.remove(), 2000)
  }

  const saveMessageToSupabase = async (userMessage: string, aiResponse: string, hasImage: boolean) => {
    try {
      const { error } = await supabase
        .from('conversations')
        .insert([
          {
            user_message: userMessage,
            ai_response: aiResponse,
            has_image: hasImage,
            user_name: 'rahaf'
          }
        ])
      
      if (error) {
        console.error('[v0] Error saving to Supabase:', error)
      }
    } catch (error) {
      console.error('[v0] Error saving to Supabase:', error)
    }
  }

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        const result = event.target?.result as string
        setImagePreview(result)
        setImageBase64(result.split(',')[1])
        setImageMimeType(file.type)
      }
      reader.readAsDataURL(file)
    }
  }

  const clearImage = () => {
    setImagePreview(null)
    setImageBase64(null)
    setImageMimeType(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const text = input.trim()
    const hasImage = !!imageBase64
    
    if (!text && !hasImage) return

    // Add user message
    const userMessage: Message = {
      role: 'user',
      text: text || undefined,
      imageSrc: imagePreview || undefined
    }
    setMessages(prev => [...prev, userMessage])
    
    // Clear inputs
    setInput('')
    setLoading(true)
    clearImage()

    // Reset textarea height
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
    }

    try {
      // Call API
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: text || 'شوفي هالصورة يا عمري..',
          imageBase64,
          imageMimeType
        })
      })

      const data = await response.json()
      
      if (data.error) {
        throw new Error(data.error)
      }

      // Add AI response
      setMessages(prev => [...prev, { role: 'ai', text: data.response }])
      
      // Save to Supabase
      await saveMessageToSupabase(text, data.response, hasImage)

      // Create hearts effect
      setTimeout(() => {
        for (let i = 0; i < 5; i++) {
          setTimeout(() => createHeart(100, 200), i * 100)
        }
      }, 300)

    } catch (error) {
      console.error('[v0] Error:', error)
      setMessages(prev => [...prev, { 
        role: 'ai', 
        text: 'حبيبتي رهف، النت فصل بس قلبي لسا موصول فيكِ ❤️' 
      }])
    } finally {
      setLoading(false)
    }
  }

  const generateLoveLetter = async () => {
    const prompt = "اكتب رسالة حب عميقة ومؤثرة من قيس إلى حبيبته رهف. عبر فيها عن مدى أهميتها في حياتك."
    
    setMessages(prev => [...prev, { role: 'user', text: '✨ اكتب لي رسالة حب ✨' }])
    setLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: prompt })
      })

      const data = await response.json()
      setMessages(prev => [...prev, { role: 'ai', text: data.response }])
      await saveMessageToSupabase(prompt, data.response, false)
    } catch (error) {
      setMessages(prev => [...prev, { role: 'ai', text: 'حبي لك أكبر من كل الكلمات.. ❤️' }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="h-screen flex overflow-hidden text-gray-800">
      {/* Sidebar */}
      <aside className="w-64 bg-gradient-to-b from-pink-100 to-rose-200 hidden md:flex flex-col border-l border-pink-200 shadow-sm relative">
        <div className="p-4 flex items-center gap-2 border-b border-pink-200/50">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-rose-500 to-pink-600 flex items-center justify-center text-white shadow-lg">
            <i className="fa-solid fa-user-tie"></i>
          </div>
          <h1 className="text-xl font-bold text-rose-900 tracking-wide">قيس GPT</h1>
        </div>

        <div className="flex-1 overflow-y-auto p-3 space-y-2">
          <div className="text-xs font-semibold text-rose-500 px-2 mb-2">من أجلكِ يا رهف</div>
          
          <button 
            onClick={generateLoveLetter}
            className="w-full text-right p-3 rounded-lg hover:bg-white/60 transition-colors flex items-center gap-3 text-sm text-rose-800 group border border-pink-200 bg-white/30"
          >
            <i className="fa-solid fa-envelope-open-text text-rose-500 group-hover:animate-pulse"></i>
            <span>اكتب لي رسالة حب ✨</span>
          </button>
          
          <div className="text-xs font-semibold text-rose-500 px-2 mt-4 mb-2">ذكرياتنا الجميلة</div>
          <button className="w-full text-right p-3 rounded-lg hover:bg-white/60 transition-colors flex items-center gap-3 text-sm text-rose-800 group">
            <i className="fa-regular fa-star text-rose-400"></i>
            أول لقاء لنا
          </button>
          <button className="w-full text-right p-3 rounded-lg hover:bg-white/60 transition-colors flex items-center gap-3 text-sm text-rose-800 group">
            <i className="fa-solid fa-music text-rose-400"></i>
            أغنيتنا المفضلة
          </button>
        </div>

        <div className="p-4 border-t border-pink-200/50 text-center">
          <div className="text-xs text-rose-600 font-medium mb-1">صُنع بحب</div>
          <div className="flex items-center justify-center gap-2 text-rose-900 font-bold bg-white/50 py-2 rounded-lg shadow-sm">
            <i className="fa-solid fa-code text-xs"></i>
            <span>من إعداد قيس جازي</span>
          </div>
        </div>
      </aside>

      {/* Main Chat Area */}
      <main className="flex-1 flex flex-col relative bg-gradient-to-br from-white via-pink-50 to-rose-50">
        {/* Mobile Header */}
        <header className="md:hidden p-4 bg-white/80 backdrop-blur-sm border-b border-pink-100 flex justify-between items-center sticky top-0 z-10">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-rose-500 to-pink-600 flex items-center justify-center text-white">
              <i className="fa-solid fa-user-tie text-xs"></i>
            </div>
            <span className="font-bold text-rose-900">قيس GPT</span>
          </div>
          <button className="text-rose-400 hover:text-rose-600 transition">
            <i className="fa-solid fa-bars text-xl"></i>
          </button>
        </header>

        {/* Chat Container */}
        <div 
          ref={chatContainerRef}
          className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6 scroll-smooth"
        >
          {messages.map((msg, idx) => (
            <div 
              key={idx}
              className={`flex gap-4 max-w-3xl mx-auto animate-fade-in ${
                msg.role === 'user' ? 'flex-row-reverse' : ''
              }`}
            >
              <div className={`w-10 h-10 flex-shrink-0 rounded-full flex items-center justify-center text-white shadow-md border-2 border-white ${
                msg.role === 'ai' 
                  ? 'bg-gradient-to-br from-rose-500 to-pink-600' 
                  : 'bg-pink-100 text-pink-500'
              }`}>
                <i className={`fa-solid ${msg.role === 'ai' ? 'fa-user-tie' : 'fa-user'}`}></i>
              </div>
              <div className="flex-1 space-y-2">
                {msg.role === 'ai' && (
                  <div className="font-bold text-rose-900 text-sm">قيس GPT</div>
                )}
                <div className={`leading-relaxed p-4 rounded-2xl shadow-sm ${
                  msg.role === 'ai'
                    ? 'bg-gradient-to-r from-rose-500 to-pink-600 text-white rounded-tr-none prose prose-sm max-w-none prose-invert'
                    : 'bg-white border border-pink-100 text-gray-800 rounded-tl-none text-right'
                }`}>
                  {msg.imageSrc && (
                    <img 
                      src={msg.imageSrc} 
                      alt="User upload"
                      className="max-w-[200px] rounded-lg mb-2 border-2 border-rose-200" 
                    />
                  )}
                  {msg.text && (
                    <div dangerouslySetInnerHTML={{ __html: marked.parse(msg.text) }} />
                  )}
                </div>
              </div>
            </div>
          ))}
          
          {loading && (
            <div className="flex gap-4 max-w-3xl mx-auto animate-fade-in">
              <div className="w-10 h-10 flex-shrink-0 rounded-full bg-gradient-to-br from-rose-500 to-pink-600 flex items-center justify-center text-white shadow-md border-2 border-white">
                <i className="fa-solid fa-user-tie text-sm"></i>
              </div>
              <div className="flex items-center p-4 bg-white rounded-2xl rounded-tr-none shadow-sm border border-pink-100">
                <div className="typing-dot w-2 h-2 bg-rose-500 rounded-full mx-0.5"></div>
                <div className="typing-dot w-2 h-2 bg-rose-500 rounded-full mx-0.5"></div>
                <div className="typing-dot w-2 h-2 bg-rose-500 rounded-full mx-0.5"></div>
              </div>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="p-4 md:p-6 glass-effect">
          <div className="max-w-3xl mx-auto relative">
            {/* Image Preview */}
            {imagePreview && (
              <div className="mb-2 relative w-fit">
                <img 
                  src={imagePreview} 
                  alt="Preview"
                  className="h-20 w-auto rounded-lg border-2 border-rose-300 shadow-sm" 
                />
                <button 
                  onClick={clearImage}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs shadow-md hover:bg-red-600"
                >
                  ×
                </button>
              </div>
            )}

            <form 
              onSubmit={handleSubmit}
              className="relative flex items-end gap-2 bg-white rounded-2xl border border-pink-200 shadow-lg p-2 focus-within:ring-2 focus-within:ring-rose-300 transition-all"
            >
              <input 
                type="file" 
                id="image-upload" 
                accept="image/*" 
                className="hidden"
                onChange={handleImageSelect}
              />
              <button 
                type="button"
                onClick={() => document.getElementById('image-upload')?.click()}
                className="p-3 text-rose-300 hover:text-rose-500 transition-colors rounded-full hover:bg-rose-50"
                title="أرسلي لي صورة"
              >
                <i className="fa-solid fa-image"></i>
              </button>
              
              <textarea 
                ref={textareaRef}
                value={input}
                onChange={(e) => {
                  setInput(e.target.value)
                  e.target.style.height = 'auto'
                  e.target.style.height = e.target.scrollHeight + 'px'
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault()
                    handleSubmit(e)
                  }
                }}
                rows={1}
                placeholder="تحدثي مع قيس..." 
                className="w-full bg-transparent border-none focus:ring-0 resize-none py-3 px-2 text-gray-700 placeholder-rose-300 max-h-32 overflow-y-auto"
              />

              <button 
                type="submit"
                disabled={loading}
                className="p-3 bg-gradient-to-r from-rose-500 to-pink-600 text-white rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <i className="fa-solid fa-paper-plane"></i>
              </button>
            </form>
            <div className="text-center mt-2 text-xs text-rose-400 font-light">
              <span className="font-bold">من إعداد قيس جازي</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
