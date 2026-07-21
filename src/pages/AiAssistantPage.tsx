import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import ChatInterface from '../components/ai/ChatInterface'
import Starfield from '../components/ui/Starfield'

export default function AiAssistantPage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="bg-black min-h-screen flex items-center justify-center px-4 sm:px-margin-mobile md:px-gutter relative overflow-hidden pt-[env(safe-area-inset-top)]">
      <Starfield
        canvasId="ai-chat-starfield"
        options={{ count: 180, baseSpeed: 0.15, reactiveRadius: 200 }}
      />
      <Link
        className="fixed top-5 right-5 sm:top-6 sm:right-6 z-20 text-white/60 hover:text-white px-4 py-2 rounded-full font-label-caps text-[12px] uppercase tracking-widest transition-all border border-white/15 hover:border-white/30 hover:bg-white/5"
        to="/"
      >
        ← Back to Portfolio
      </Link>
      <div className="w-full max-w-4xl z-10">
        <ChatInterface />
      </div>
    </div>
  )
}
