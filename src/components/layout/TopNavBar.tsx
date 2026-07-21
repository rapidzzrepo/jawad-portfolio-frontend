import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

const sectionIds = ['hero', 'story', 'work', 'lab', 'timeline']

export default function TopNavBar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [active, setActive] = useState('')
  const location = useLocation()
  const isHome = location.pathname === '/'

  useEffect(() => {
    const observers: IntersectionObserver[] = []

    sectionIds.forEach((id) => {
      const el = document.getElementById(id)
      if (!el) return

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActive(id)
          }
        },
        { rootMargin: '-40% 0px -55% 0px' }
      )
      observer.observe(el)
      observers.push(observer)
    })

    return () => observers.forEach((o) => o.disconnect())
  }, [])

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const links = [
    { href: isHome ? '#hero' : '/#hero', label: 'Home' },
    { href: isHome ? '#story' : '/#story', label: 'Story' },
    { href: isHome ? '#work' : '/#work', label: 'Work' },
    { href: isHome ? '#lab' : '/#lab', label: 'Lab' },
    { href: isHome ? '#timeline' : '/#timeline', label: 'Timeline' },
  ]

  const sidebarBg = {
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    backdropFilter: 'blur(24px)',
    WebkitBackdropFilter: 'blur(24px)',
  }

  return (
    <>
      <nav className="fixed top-0 w-full z-50 bg-black/40 backdrop-blur-xl no-border flat no shadows">
        <div className="max-w-container-max mx-auto px-4 sm:px-margin-mobile md:px-gutter flex justify-between items-center h-16 sm:h-20">
          <a
            className="font-display-lg text-[18px] sm:text-headline-sm font-bold tracking-tighter text-white"
            href="#"
          >
            Jawad Khan
          </a>
          <div className="hidden md:flex gap-gutter items-center">
            {links.map((link) => {
              const id = link.href.split('#')[1]
              const isRouteLink = link.href.startsWith('/')
              const isHomeLink = link.label === 'Home'
              const isActive = isHomeLink ? active === 'hero' : active === id
              const cls = `font-label-caps text-label-caps uppercase tracking-widest transition-all duration-200 hover:scale-105 ${
                isActive
                  ? 'text-white font-bold border-b-2 pb-1 border-white'
                  : 'text-white/50 font-normal hover:text-white/80'
              }`
              return isRouteLink ? (
                <Link key={link.href} to={link.href} className={cls}>
                  {link.label}
                </Link>
              ) : (
                <a key={link.href} className={cls} href={link.href}>
                  {link.label}
                </a>
              )
            })}
            <Link to="/connect" className="ml-4 sm:ml-stack-md text-black px-4 sm:px-gutter py-2 sm:py-stack-sm rounded-full font-label-caps text-label-caps uppercase tracking-widest transition-all active:opacity-70 hover:scale-105 bg-white border border-white/20 shadow-lg shadow-white/10 inline-block text-center">
              Connect
            </Link>
          </div>
          <button
            className="md:hidden text-white w-11 h-11 flex items-center justify-center -mr-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            <span className="material-symbols-outlined">
              {menuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </nav>

      {/* Backdrop */}
      <div
        className="md:hidden fixed inset-0 z-[60]"
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.3)',
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? 'auto' : 'none',
          transition: 'opacity 300ms',
        }}
        onClick={() => setMenuOpen(false)}
      />

      {/* Sidebar */}
      <div
        className="md:hidden fixed top-16 sm:top-20 right-0 bottom-0 w-72 z-[70] flex flex-col border-l border-white/10 pb-[env(safe-area-inset-bottom)]"
        style={{
          ...sidebarBg,
          transform: menuOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 300ms ease-out',
        }}
      >
        <div className="flex items-center px-6 py-4 border-b border-white/5">
          <span className="font-label-caps text-[11px] uppercase tracking-[0.2em] text-white/50">Menu</span>
        </div>
        <div className="flex flex-col">
          {links.map((link) => {
            const id = link.href.split('#')[1]
            const isRouteLink = link.href.startsWith('/')
            const isHomeLink = link.label === 'Home'
            const isActive = isHomeLink ? active === 'hero' : active === id
            const cls = `w-full font-label-caps text-[13px] uppercase tracking-[0.2em] px-6 py-4 transition-colors duration-200 border-b border-white/5 ${
              isActive
                ? 'text-white bg-white/5'
                : 'text-white/70 hover:text-white hover:bg-white/5'
            }`
            return isRouteLink ? (
              <Link
                key={link.href}
                to={link.href}
                className={cls}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ) : (
              <a
                key={link.href}
                className={cls}
                href={link.href}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </a>
            )
          })}
        </div>
        <div className="px-6 pt-8">
          <Link
            to="/connect"
            className="w-full bg-white text-black py-3 rounded-full font-label-caps text-[13px] uppercase tracking-widest font-bold text-center block"
            onClick={() => setMenuOpen(false)}
          >
            Connect
          </Link>
        </div>
      </div>
    </>
  )
}
