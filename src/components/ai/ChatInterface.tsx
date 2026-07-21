import { useState, useRef, useEffect, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { welcomeMessage, suggestedPrompts } from '../../config/chatProfile'

interface Message {
  id: number
  sender: 'bot' | 'user'
  text: string
  time: string
}

const API_URL = '/ask'

const LINK_RE = /\[([^\]]+)\]\(([^)]+)\)/g

function renderText(text: string): ReactNode[] {
  const parts: ReactNode[] = []
  let lastIndex = 0
  let match: RegExpExecArray | null

  LINK_RE.lastIndex = 0
  while ((match = LINK_RE.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index))
    }
    const label = match[1]
    const href = match[2]
    if (href.startsWith('/') || href.startsWith('#')) {
      parts.push(
        <Link key={match.index} to={href} className="underline text-white hover:text-white/80">
          {label}
        </Link>
      )
    } else {
      parts.push(
        <a key={match.index} href={href} className="underline text-white hover:text-white/80" target="_blank" rel="noopener noreferrer">
          {label}
        </a>
      )
    }
    lastIndex = match.index + match[0].length
  }
  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex))
  }
  return parts
}

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: 'bot',
      text: welcomeMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const abortRef = useRef<AbortController | null>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages, isTyping])

  const sendMessage = async (text: string) => {
    if (!text.trim()) return

    abortRef.current?.abort()
    const controller = new AbortController()
    abortRef.current = controller

    const userMsg: Message = {
      id: Date.now(),
      sender: 'user',
      text: text.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }
    setMessages((prev) => [...prev, userMsg])
    setInput('')
    setIsTyping(true)

    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: text.trim() }),
        signal: controller.signal,
      })

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}))
        const detail = errorData.detail || errorData.message || ''
        let fallback: string
        if (res.status === 429) {
          fallback = "I'm getting a lot of questions right now. Give me a sec and try again."
        } else if (res.status === 401) {
          fallback = "Authentication failed. The API key may be invalid."
        } else {
          fallback = detail || "Something went wrong on my end. Mind trying again in a bit?"
        }
        const botMsg: Message = {
          id: Date.now() + 1,
          sender: 'bot',
          text: fallback,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        }
        setMessages((prev) => [...prev, botMsg])
        return
      }

      const data = await res.json()
      const botMsg: Message = {
        id: Date.now() + 1,
        sender: 'bot',
        text: data.answer,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      }
      setMessages((prev) => [...prev, botMsg])
    } catch (err: unknown) {
      if (err instanceof DOMException && err.name === 'AbortError') return
      const msg = err instanceof Error ? err.message : 'Unknown error'
      const botMsg: Message = {
        id: Date.now() + 1,
        sender: 'bot',
        text: `Error: ${msg}`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      }
      setMessages((prev) => [...prev, botMsg])
    } finally {
      setIsTyping(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage(input)
    }
  }

  return (
    <div className="rounded-2xl flex flex-col h-[calc(100vh-120px)] sm:h-[600px] md:h-[700px] relative"
      style={{ backgroundColor: 'transparent' }}
    >
      {/* Glass backdrop layer */}
      <div className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{ backgroundColor: 'rgba(255, 255, 255, 0.06)', backdropFilter: 'blur(0px)', WebkitBackdropFilter: 'blur(0px)' }}
      />
      {/* Chat Header */}
      <div className="p-3 sm:p-4 md:p-gutter border-b border-white/20 flex items-center justify-between relative z-[1]"
        style={{ backgroundColor: 'transparent' }}
      >
        <div className="flex items-center gap-2 sm:gap-4">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-primary flex items-center justify-center">
            <span className="material-symbols-outlined text-white text-lg sm:text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>smart_toy</span>
          </div>
          <div>
            <h4 className="font-headline-sm text-[15px] sm:text-[18px] text-white">Jawad Khan's Assistant</h4>
            <p className="text-[10px] sm:text-[12px] text-white/60 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400"></span> Online
            </p>
          </div>
        </div>
        <div className="flex gap-1 sm:gap-2">
          <button className="p-2 hover:bg-white/10 rounded-full transition-colors" aria-label="Chat history">
            <span className="material-symbols-outlined text-white/70 text-lg sm:text-xl">history</span>
          </button>
          <button className="p-2 hover:bg-white/10 rounded-full transition-colors" aria-label="Settings">
            <span className="material-symbols-outlined text-white/70 text-lg sm:text-xl">settings</span>
          </button>
        </div>
      </div>

      {/* Chat Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-3 sm:p-4 md:p-gutter flex flex-col gap-4 sm:gap-6 relative z-[1]"
        style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(255,255,255,0.2) transparent' }}
      >
        {messages.map((msg) => (
          <div key={msg.id} className={`flex gap-2 sm:gap-3 max-w-[92%] sm:max-w-[85%] ${msg.sender === 'user' ? 'self-end flex-row-reverse' : ''}`}>
            <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex-shrink-0 flex items-center justify-center ${
              msg.sender === 'bot' ? 'bg-white/20 border border-white/20' : 'bg-white'
            }`}>
              <span className={`material-symbols-outlined text-xs sm:text-sm ${msg.sender === 'bot' ? 'text-white' : 'text-black'}`}
                style={msg.sender === 'bot' ? { fontVariationSettings: "'FILL' 1" } : undefined}
              >
                {msg.sender === 'bot' ? 'smart_toy' : 'person'}
              </span>
            </div>
            <div className={`p-2.5 sm:p-4 rounded-2xl shadow-sm ${
              msg.sender === 'bot'
                ? 'rounded-tl-none border border-white/10'
                : 'bg-white rounded-tr-none'
            }`}
            style={msg.sender === 'bot' ? { backgroundColor: 'rgba(255, 255, 255, 0.15)' } : undefined}
          >
              <p className={`font-body-md text-[13px] sm:text-body-md ${msg.sender === 'bot' ? 'text-white' : 'text-on-surface'}`}>{renderText(msg.text)}</p>
              <span className={`text-[9px] sm:text-[10px] mt-2 block ${msg.sender === 'bot' ? 'text-white/50' : 'text-on-surface-variant'}`}>
                {msg.sender === 'user' && <span className="text-right block">{msg.time}</span>}
                {msg.sender === 'bot' && msg.time}
              </span>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex gap-2 sm:gap-3 items-center">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/20 border border-white/20 flex-shrink-0 flex items-center justify-center">
              <span className="material-symbols-outlined text-white text-xs sm:text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>smart_toy</span>
            </div>
            <div className="flex gap-1.5 px-4 py-3 bg-white/20 rounded-full border border-white/15">
              <div className="w-1.5 h-1.5 bg-white/60 rounded-full typing-dot"></div>
              <div className="w-1.5 h-1.5 bg-white/60 rounded-full typing-dot"></div>
              <div className="w-1.5 h-1.5 bg-white/60 rounded-full typing-dot"></div>
            </div>
          </div>
        )}
      </div>

      {/* Chat Input */}
      <div className="p-3 sm:p-4 md:p-gutter border-t border-white/20 relative z-[1]"
        style={{ backgroundColor: 'transparent' }}
      >
        {/* Suggested Pills */}
        <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4">
          {suggestedPrompts.map((prompt) => (
            <button
              key={prompt}
              onClick={() => sendMessage(prompt)}
              className="px-2.5 sm:px-4 py-2.5 sm:py-2 bg-white/15 text-white/80 hover:bg-white/25 transition-all rounded-full font-mono-label text-[10px] sm:text-[12px] md:text-[13px] border border-white/15 min-h-[44px] flex items-center"
            >
              {prompt}
            </button>
          ))}
        </div>
        <div className="relative flex items-center gap-2 sm:gap-3">
          <button className="p-2.5 sm:p-3 hover:bg-white/10 rounded-full transition-colors flex items-center justify-center shrink-0" aria-label="Voice input">
            <span className="material-symbols-outlined text-white/70 text-lg sm:text-xl">mic</span>
          </button>
          <div className="relative flex-1 min-w-0">
            <input
              className="w-full rounded-full px-4 sm:px-6 py-2.5 sm:py-3 border-none outline-none text-base sm:text-body-md font-body-md text-white placeholder-white/40"
              style={{ backgroundColor: 'rgba(255, 255, 255, 0.08)' }}
              placeholder="Type here..."
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </div>
          <button
            onClick={() => sendMessage(input)}
            className="w-11 h-11 sm:w-12 sm:h-12 bg-white rounded-full flex items-center justify-center hover:shadow-lg transition-shadow shrink-0"
            aria-label="Send message"
          >
            <span className="material-symbols-outlined text-black text-lg sm:text-xl">send</span>
          </button>
        </div>
      </div>
    </div>
  )
}
