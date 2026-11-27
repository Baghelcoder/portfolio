import { useEffect, useState } from 'react'
import { LuMenu, LuX } from 'react-icons/lu'
import { NAV_LINKS } from '../config'
import { useScrollSpy } from '../hooks/useMotion'
import { MagneticLink } from './ui'

const ids = NAV_LINKS.map((l) => l.href.slice(1))

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const active = useScrollSpy(ids)

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24)
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    const esc = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', esc)
    return () => { window.removeEventListener('keydown', esc); document.body.style.overflow = '' }
  }, [open])

  const go = (e, href) => {
    e.preventDefault()
    setOpen(false)
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled || open ? 'bg-bg/70 backdrop-blur-xl border-b border-white/[0.07] py-3' : 'bg-transparent py-5'
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 sm:px-8" aria-label="Primary">
        <a href="#home" onClick={(e) => go(e, '#home')} className="font-display text-lg sm:text-xl font-bold tracking-tight" aria-label="Yogesh Kumar, home">
          YOGESH<span className="grad-text">KUMAR</span>
        </a>

        <ul className="hidden lg:flex items-center gap-9">
          {NAV_LINKS.map((l) => (
            <li key={l.href}>
              <a href={l.href} onClick={(e) => go(e, l.href)} className="nav-link" data-active={active === l.href.slice(1)}>
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <MagneticLink href="#contact" onClick={(e) => go(e, '#contact')} className="btn btn-primary hidden sm:inline-flex !min-h-0 !py-2.5 !px-5 !text-sm">
            Let&apos;s Talk
          </MagneticLink>
          <button
            className="lg:hidden grid h-11 w-11 place-items-center rounded-full border border-white/15 bg-white/5"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            {open ? <LuX size={22} /> : <LuMenu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className={`lg:hidden fixed inset-x-0 top-[60px] bottom-0 bg-bg/95 backdrop-blur-xl transition-all duration-500 ${
          open ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-4'
        }`}
      >
        <ul className="flex flex-col gap-1 px-6 pt-8">
          {NAV_LINKS.map((l, i) => (
            <li key={l.href} style={{ transitionDelay: open ? `${i * 55}ms` : '0ms' }}
                className={`transition-all duration-500 ${open ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-6'}`}>
              <a href={l.href} onClick={(e) => go(e, l.href)}
                 className="flex items-baseline gap-4 border-b border-white/[0.07] py-4 font-display text-3xl font-semibold">
                <span className="font-mono text-xs text-cyan">0{i + 1}</span>
                {l.label}
              </a>
            </li>
          ))}
          <li className="pt-6">
            <a href="#contact" onClick={(e) => go(e, '#contact')} className="btn btn-primary w-full">Let&apos;s Talk</a>
          </li>
        </ul>
      </div>
    </header>
  )
}
