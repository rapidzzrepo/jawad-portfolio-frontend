import { useState, useEffect } from 'react'
import TopNavBar from '../components/layout/TopNavBar'
import Footer from '../components/layout/Footer'
import Starfield from '../components/ui/Starfield'

const RECIPIENT_EMAIL = 'jawadabdulah918@gmail.com'

export default function ConnectPage() {
  const [submitted, setSubmitted] = useState(false)
  const [sending, setSending] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [inquiryType, setInquiryType] = useState('AI Engineering & LLM Integration')
  const [message, setMessage] = useState('')

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSending(true)

    const subject = encodeURIComponent(`Inquiry: ${inquiryType}`)
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\nInquiry Type: ${inquiryType}\n\nMessage:\n${message}`
    )
    window.location.href = `mailto:${RECIPIENT_EMAIL}?subject=${subject}&body=${body}`

    setTimeout(() => {
      setSending(false)
      setSubmitted(true)
      setTimeout(() => setSubmitted(false), 3000)
    }, 1500)
  }

  return (
    <>
      <TopNavBar />
      <main className="pt-20 sm:pt-32 pb-0 relative" style={{ backgroundColor: 'rgb(0, 0, 0)' }}>
        <Starfield canvasId="connect-starfield" options={{ count: 180, baseSpeed: 0.15, reactiveRadius: 200 }} />
        {/* Hero & Contact Form Section */}
        <section className="max-w-container-max mx-auto px-4 sm:px-margin-mobile md:px-gutter grid grid-cols-1 lg:grid-cols-12 gap-gutter items-stretch mb-12 sm:mb-section-gap relative z-10">
          {/* Left Side: Content */}
          <div className="lg:col-span-5 rounded-2xl p-6 sm:p-stack-lg flex flex-col justify-center"
            style={{ backgroundColor: 'rgba(255, 255, 255, 0.06)', backdropFilter: 'blur(0px)', border: '1px solid rgba(255, 255, 255, 0.12)' }}>
            <div className="inline-flex items-center font-label-caps text-label-caps uppercase tracking-widest text-white/80 bg-white/10 px-4 py-2 rounded-full border border-white/20 w-fit">
              Currently Open for Partnerships
            </div>
            <h1 className="font-display-lg text-[32px] sm:text-[44px] md:text-display-lg text-white leading-tight font-bold tracking-tighter mt-6">
              Let's Build the Future.
            </h1>
            <p className="font-body-lg text-[14px] sm:text-body-lg text-white/70 max-w-lg mt-4">
              I build production AI systems, RAG pipelines, and intelligent automation workflows. Whether you need AI integration, full-stack development, or technical leadership, let's build something remarkable.
            </p>
            <div className="flex flex-col gap-4 mt-6">
              <div className="flex items-center gap-4 p-4 rounded-xl hover:bg-white/10 transition-colors duration-300 cursor-pointer group touch-hover-reset">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined">mail</span>
                </div>
                <div>
                  <p className="font-label-caps text-[10px] uppercase text-white/50">Direct Email</p>
                  <p className="font-body-md font-medium text-white">{RECIPIENT_EMAIL}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 rounded-xl hover:bg-white/10 transition-colors duration-300 cursor-pointer group touch-hover-reset">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined">schedule</span>
                </div>
                <div>
                  <p className="font-label-caps text-[10px] uppercase text-white/50">Response Time</p>
                  <p className="font-body-md font-medium text-white">Within 24 business hours</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Form */}
          <div className="lg:col-span-7 lg:pl-gutter h-full">
            <div className="rounded-xl p-6 sm:p-stack-lg relative overflow-hidden h-full" style={{ backgroundColor: 'rgba(255, 255, 255, 0.06)', backdropFilter: 'blur(0px)', border: '1px solid rgba(255, 255, 255, 0.12)' }}>
              <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
              <form className="space-y-stack-md relative z-10" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-stack-md">
                  <div className="space-y-2">
                    <label className="font-label-caps text-label-caps uppercase text-white/70">Full Name</label>
                    <input className="w-full bg-white/10 border border-white/20 rounded-lg p-4 focus:ring-2 focus:ring-white/50 focus:border-transparent outline-none transition-all font-body-md text-white placeholder-white/40" placeholder="John Doe" type="text" value={name} onChange={(e) => setName(e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <label className="font-label-caps text-label-caps uppercase text-white/70">Email Address</label>
                    <input className="w-full bg-white/10 border border-white/20 rounded-lg p-4 focus:ring-2 focus:ring-white/50 focus:border-transparent outline-none transition-all font-body-md text-white placeholder-white/40" placeholder="john@example.com" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
              </div>
              <div className="space-y-2">
                  <label className="font-label-caps text-label-caps uppercase text-white/70">Inquiry Type</label>
                  <select className="w-full bg-white/10 border border-white/20 rounded-lg p-4 focus:ring-2 focus:ring-white/50 focus:border-transparent outline-none transition-all font-body-md text-[13px] sm:text-body-md text-white appearance-none" value={inquiryType} onChange={(e) => setInquiryType(e.target.value)}>
                    <option className="text-black">AI Engineering &amp; LLM Integration</option>
                    <option className="text-black">Full-Stack Development Project</option>
                    <option className="text-black">RAG Pipeline &amp; AI Agents</option>
                    <option className="text-black">Technical Consultation</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="font-label-caps text-label-caps uppercase text-white/70">Your Message</label>
                  <textarea className="w-full bg-white/10 border border-white/20 rounded-lg p-4 focus:ring-2 focus:ring-white/50 focus:border-transparent outline-none transition-all font-body-md text-white placeholder-white/40 resize-none" placeholder="Tell me about your project or vision..." rows={5} value={message} onChange={(e) => setMessage(e.target.value)} />
                </div>
                <button className="w-full bg-white text-black py-5 rounded-lg font-label-caps text-label-caps uppercase tracking-widest flex items-center justify-center gap-stack-sm hover:translate-y-[-2px] hover:shadow-lg transition-all duration-300" type="submit" disabled={sending || submitted}>
                  {submitted ? (
                    <>
                      <span className="material-symbols-outlined text-sm">check_circle</span>
                      Message Sent
                    </>
                  ) : sending ? (
                    <>
                      <span className="material-symbols-outlined text-sm animate-spin">sync</span>
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Inquiry
                      <span className="material-symbols-outlined text-sm">arrow_forward</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </section>

        {/* Global Connectivity & Consultation Section */}
        <section className="py-stack-lg border-y border-white/10 relative z-10">
          <div className="max-w-container-max mx-auto px-4 sm:px-margin-mobile md:px-gutter">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-gutter">
              {/* Location Card */}
              <div className="rounded-xl p-stack-md space-y-stack-sm flex flex-col justify-between group"
                style={{ backgroundColor: 'rgba(255, 255, 255, 0.06)', backdropFilter: 'blur(0px)', border: '1px solid rgba(255, 255, 255, 0.12)' }}>
                <div>
                  <div className="flex justify-between items-start">
                    <span className="material-symbols-outlined text-white text-3xl">public</span>
                    <span className="font-mono-label text-mono-label bg-white/10 text-white/70 px-2 py-1 rounded whitespace-nowrap text-[11px]">PKT Timezone</span>
                  </div>
                  <h3 className="font-headline-sm text-headline-sm mt-stack-md text-white">Global Presence</h3>
                  <p className="font-body-md text-white/70">Operating from Lahore, Pakistan. Available for fully remote roles worldwide across all timezones.</p>
                </div>
                <div className="mt-stack-md overflow-hidden rounded-lg grayscale hover:grayscale-0 transition-all duration-700 h-24 sm:h-32 relative">
                  <div className="absolute inset-0 bg-primary/10 mix-blend-multiply pointer-events-none" />
                  <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCvbIr28Rc2ToiRsrMJYHHv7qHJOxfXMSdRReUUFUctT_eUAM_5Ac4C9PGub-HStaeet44ICKveP-wIy57hVkf3lOjPNb4KZCi7YS9Eym7JvYrEdsseS11MSrmyG-Bo2O4C_wW8U6NzqvHnTuonH7u1PF13U2W4qPmTGFJPtJOBK9uSqVg0Sz8bD2UKCJE_fbEOk9z9jVdrn79NGn8xOOZeuvhtxNDVnmE8Qj769sRr800riLI5MUs')" }} />
                </div>
              </div>

              {/* Book Consultation Card */}
              <div className="rounded-xl p-stack-md space-y-stack-sm flex flex-col justify-between"
                style={{ backgroundColor: 'rgba(255, 255, 255, 0.06)', backdropFilter: 'blur(0px)', border: '1px solid rgba(255, 255, 255, 0.12)' }}>
                <div>
                  <span className="material-symbols-outlined text-white text-3xl">calendar_today</span>
                  <h3 className="font-headline-sm text-headline-sm mt-stack-md text-white">Strategic Call</h3>
                  <p className="font-body-md text-white/70">Prefer a face-to-face discussion? Book a 30-minute discovery session to align on objectives.</p>
                </div>
                <a className="mt-stack-md inline-flex items-center gap-base font-label-caps text-label-caps uppercase text-white hover:gap-stack-md transition-all py-2 -my-2" href="mailto:jawadabdulah918@gmail.com">
                  Send an Email
                  <span className="material-symbols-outlined">north_east</span>
                </a>
              </div>

              {/* Direct Reach */}
              <div className="rounded-xl p-stack-md space-y-stack-sm flex flex-col group"
                style={{ backgroundColor: 'rgba(255, 255, 255, 0.06)', backdropFilter: 'blur(0px)', border: '1px solid rgba(255, 255, 255, 0.12)' }}>
                <span className="material-symbols-outlined text-white text-3xl">diversity_3</span>
                <h3 className="font-headline-sm text-headline-sm mt-stack-md text-white">Network Hub</h3>
                <p className="font-body-md text-white/70 flex-grow">Connect through professional channels for real-time updates and industry insights.</p>
                <div className="grid grid-cols-2 gap-base mt-stack-md">
                  <a className="p-3 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors border border-white/20" href="https://linkedin.com/in/jawadabdullah" target="_blank" rel="noopener noreferrer">
                    <span className="font-label-caps text-label-caps uppercase text-white">LinkedIn</span>
                  </a>
                  <a className="p-3 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors border border-white/20" href="mailto:jawadabdulah918@gmail.com">
                    <span className="font-label-caps text-label-caps uppercase text-white">Email</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
