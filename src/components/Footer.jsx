import { LuGithub, LuMapPin, LuArrowUp } from 'react-icons/lu'
import { SITE } from '../config'

const links = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
]

export default function Footer() {
  const go = (e, href) => { e.preventDefault(); document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' }) }
  return (
    <footer className="relative border-t border-white/[0.07] pt-16 pb-10">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <div className="font-display text-3xl font-bold tracking-tight">YOGESH<span className="grad-text">KUMAR</span></div>
            <p className="mt-2 text-mute">{SITE.title}</p>
            <p className="mt-5 inline-flex items-center gap-2 text-sm text-mute"><LuMapPin size={16} className="text-cyan" />{SITE.location}</p>
          </div>
          <nav aria-label="Footer">
            <h2 className="mb-4 font-mono text-xs uppercase tracking-[0.25em] text-cyan">Links</h2>
            <ul className="space-y-3">
              {links.map((l) => (
                <li key={l.href}><a href={l.href} onClick={(e) => go(e, l.href)} className="nav-link">{l.label}</a></li>
              ))}
              <li><a href={SITE.github} target="_blank" rel="noopener noreferrer" className="nav-link">GitHub</a></li>
            </ul>
          </nav>
          <div>
            <h2 className="mb-4 font-mono text-xs uppercase tracking-[0.25em] text-cyan">GitHub</h2>
            <a href={SITE.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-3 text-sm transition-all hover:-translate-y-1 hover:border-cyan/50">
              <LuGithub size={20} /> Baghelcoder
            </a>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/[0.07] pt-8 text-sm text-mute sm:flex-row">
          <p>© {SITE.year} Yogesh Kumar. All Rights Reserved.</p>
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="group inline-flex items-center gap-2 transition-colors hover:text-white">
            Back to top
            <span className="grid h-9 w-9 place-items-center rounded-full border border-white/15 transition-transform duration-300 group-hover:-translate-y-1 group-hover:border-cyan"><LuArrowUp size={16} /></span>
          </button>
        </div>
      </div>
    </footer>
  )
}
