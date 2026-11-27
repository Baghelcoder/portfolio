import { useEffect, useRef, useState } from 'react'
import { LuArrowDown, LuGithub, LuMapPin, LuArrowUpRight } from 'react-icons/lu'
import { SITE } from '../config'
import { heroTags } from '../data/content'
import { floatingTech } from '../data/skills'
import { useReducedMotion } from '../hooks/useMotion'
import { Particles } from './Effects'
import { MagneticLink } from './ui'

const HEADING = [
  ['Building', 'Digital'],
  ['Experiences', 'That'],
  ['Actually', 'Work.'],
]

const FILES = [
  {
    name: 'profile.js',
    code: `const developer = {
  name: "Yogesh Kumar",
  role: "Full Stack Web Developer",
  stack: ["React", "Node", "PHP", "MySQL"],
  location: "Rajasthan, India",
  available: true,
};`,
  },
  {
    name: 'api.js',
    code: `app.get("/api/products", async (req, res) => {
  const [rows] = await db.query(
    "SELECT * FROM products"
  );
  res.json(rows);
});`,
  },
  {
    name: 'nginx.conf',
    code: `location /api {
  proxy_pass http://127.0.0.1:5000;
  proxy_set_header Host $host;
}`,
  },
]

function colorize(line) {
  // Tiny syntax highlighter: strings, keywords, numbers
  const parts = line.split(/("[^"]*"|\b(?:const|async|await|true|false|location|proxy_pass|proxy_set_header)\b)/g)
  return parts.map((p, i) => {
    if (!p) return null
    if (p.startsWith('"')) return <span key={i} className="text-emerald-300">{p}</span>
    if (/^(const|async|await|location|proxy_pass|proxy_set_header)$/.test(p)) return <span key={i} className="text-violet-300">{p}</span>
    if (/^(true|false)$/.test(p)) return <span key={i} className="text-amber-300">{p}</span>
    return <span key={i}>{p}</span>
  })
}

function CodeCard() {
  const reduced = useReducedMotion()
  const [file, setFile] = useState(0)
  const [chars, setChars] = useState(0)
  const code = FILES[file].code

  useEffect(() => {
    if (reduced) { setChars(code.length); return }
    setChars(0)
    let n = 0
    const typing = setInterval(() => {
      n += 1
      setChars(n)
      if (n >= code.length) clearInterval(typing)
    }, 28)
    return () => clearInterval(typing)
  }, [file, code, reduced])

  // Move to the next file after finishing + a pause
  useEffect(() => {
    if (reduced || chars < code.length) return
    const t = setTimeout(() => setFile((f) => (f + 1) % FILES.length), 3200)
    return () => clearTimeout(t)
  }, [chars, code.length, reduced])

  const shown = code.slice(0, chars).split('\n')
  return (
    <div className="glass overflow-hidden !rounded-2xl shadow-[0_30px_100px_-30px_rgba(139,92,246,.55)]">
      <div className="flex items-center gap-2 border-b border-white/[0.07] bg-white/[0.03] px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-[#ff5f57]" /><span className="h-3 w-3 rounded-full bg-[#febc2e]" /><span className="h-3 w-3 rounded-full bg-[#28c840]" />
        <div className="ml-3 flex gap-1 overflow-x-auto" role="tablist" aria-label="Code samples">
          {FILES.map((f, i) => (
            <button key={f.name} role="tab" aria-selected={i === file} onClick={() => setFile(i)}
              className={`rounded-md px-2.5 py-1 font-mono text-[11px] transition-colors ${i === file ? 'bg-white/10 text-white' : 'text-mute hover:text-white'}`}>
              {f.name}
            </button>
          ))}
        </div>
      </div>
      <pre className="min-h-[220px] overflow-x-auto p-5 font-mono text-[12.5px] sm:text-[13px] leading-[1.75] text-slate-300" aria-label={`Code sample: ${FILES[file].name}`}>
        {shown.map((l, i) => (
          <div key={i} className="flex">
            <span className="mr-4 w-4 select-none text-right text-slate-600">{i + 1}</span>
            <code className={i === shown.length - 1 && chars < code.length ? 'caret' : ''}>{colorize(l)}</code>
          </div>
        ))}
      </pre>
    </div>
  )
}

export default function Hero() {
  const reduced = useReducedMotion()
  const stage = useRef(null)

  // Subtle mouse-following parallax on orbs, tech badges and the code card
  useEffect(() => {
    const el = stage.current
    if (!el || reduced || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    let raf = 0
    const onMove = (e) => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        el.style.setProperty('--px', ((e.clientX / window.innerWidth) - 0.5).toFixed(3))
        el.style.setProperty('--py', ((e.clientY / window.innerHeight) - 0.5).toFixed(3))
      })
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => { window.removeEventListener('mousemove', onMove); cancelAnimationFrame(raf) }
  }, [reduced])

  const go = (e, href) => { e.preventDefault(); document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' }) }
  const par = (k) => ({ transform: `translate(calc(var(--px, 0) * ${k}px), calc(var(--py, 0) * ${k}px))`, transition: 'transform .4s ease-out' })

  return (
    <section id="home" ref={stage} className="relative isolate flex min-h-[100svh] items-center overflow-hidden pt-28 pb-20">
      {/* Backgrounds */}
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        <div className="absolute inset-0 grid-bg" />
        <Particles />
        <div style={par(-40)} className="absolute inset-0">
          <div className="orb -left-24 top-10 h-[420px] w-[420px] bg-violet/30" />
          <div className="orb right-[-6rem] top-1/3 h-[380px] w-[380px] bg-cyan/20" style={{ animationDelay: '-6s' }} />
        </div>
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-bg to-transparent" />
      </div>

      <div className="mx-auto grid w-full max-w-7xl items-center gap-14 px-5 sm:px-8 xl:grid-cols-[1.25fr_1fr]">
        <div>
          <div className="mb-6 flex flex-wrap items-center gap-3">
            <p className="font-mono text-xs sm:text-sm tracking-[0.22em] text-cyan">HELLO, I&apos;M YOGESH KUMAR</p>
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/25 bg-emerald-400/10 px-3 py-1 text-xs text-emerald-300">
              <span className="ping h-2 w-2 rounded-full bg-emerald-400" aria-hidden="true" />
              Available for new projects
            </span>
          </div>

          <h1 className="font-display font-bold leading-[0.98] tracking-[-0.03em] text-[clamp(2.6rem,9vw,5.5rem)] xl:text-[4.25rem] 2xl:text-[4.6rem]" aria-label="Building Digital Experiences That Actually Work.">
            {HEADING.map((line, li) => (
              <span key={li} className="block" aria-hidden="true">
                {line.map((w, wi) => {
                  const last = li === HEADING.length - 1 && wi === line.length - 1
                  const d = 1700 + (li * 2 + wi) * 110
                  return (
                    <span key={w} className="word-mask mr-[0.22em]">
                      <span className={`word ${last || w === 'Digital' ? 'grad-text' : ''}`} style={{ '--d': `${reduced ? 0 : d}ms` }}>{w}</span>
                    </span>
                  )
                })}
              </span>
            ))}
          </h1>

          <p className="mt-8 max-w-xl text-base sm:text-lg leading-relaxed text-mute">
            Full Stack Web Developer crafting modern web applications, powerful APIs, and scalable digital solutions.
          </p>

          <ul className="mt-6 flex flex-wrap gap-2.5" aria-label="Core technologies">
            {heroTags.map((t, i) => (
              <li key={t} className="float-y rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 font-mono text-xs sm:text-[13px] text-slate-200 backdrop-blur"
                  style={{ '--fd': `${i * 0.35}s` }}>
                <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-gradient-to-r from-violet to-cyan" />{t}
              </li>
            ))}
          </ul>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <MagneticLink href="#projects" onClick={(e) => go(e, '#projects')} className="btn btn-primary">
              Explore My Work <LuArrowDown size={18} />
            </MagneticLink>
            <MagneticLink href="#contact" onClick={(e) => go(e, '#contact')} className="btn btn-ghost">
              Let&apos;s Work Together <LuArrowUpRight size={18} />
            </MagneticLink>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-mute">
            <a href={SITE.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 transition-colors hover:text-white">
              <LuGithub size={18} /> github.com/Baghelcoder
            </a>
            <span className="inline-flex items-center gap-2"><LuMapPin size={18} className="text-cyan" /> {SITE.location}</span>
          </div>
        </div>

        {/* Code card with floating tech */}
        <div className="relative mx-auto w-full max-w-xl" style={par(18)}>
          <div className="absolute -inset-6 -z-10 rounded-[2rem] bg-gradient-to-br from-violet/25 via-transparent to-cyan/20 blur-3xl" aria-hidden="true" />
          <div className="float-y" style={{ '--fd': '.4s' }}><CodeCard /></div>
          <div className="pointer-events-none absolute -inset-4 hidden sm:block" aria-hidden="true">
            {floatingTech.slice(0, 4).map((t, i) => {
              const pos = ['-left-6 top-6', '-right-6 top-1/3', '-left-4 bottom-10', 'right-2 -bottom-8'][i]
              const Icon = t.icon
              return (
                <div key={t.name} className={`float-y absolute ${pos} grid h-12 w-12 place-items-center rounded-2xl border border-white/10 bg-bg2/80 text-cyan backdrop-blur-md shadow-lg`} style={{ '--fd': `${i * 0.8}s` }}>
                  <Icon size={22} />
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <a href="#about" onClick={(e) => go(e, '#about')} className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-[11px] uppercase tracking-[0.3em] text-mute md:flex" aria-label="Scroll down to About">
        Scroll
        <span className="relative h-9 w-[22px] rounded-full border border-white/25">
          <span className="absolute left-1/2 top-2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-cyan" style={{ animation: 'scrollCue 1.8s ease-in-out infinite' }} />
        </span>
      </a>
    </section>
  )
}
