import { useRef, useState } from 'react'
import { LuArrowUpRight, LuCheck } from 'react-icons/lu'
import { FILTERS, projects, previewUrl } from '../data/projects'
import { SectionHeading, Reveal, TiltCard, Pill } from './ui'

function hostOf(url) {
  try { return new URL(url).host.replace(/^www\./, '') } catch { return url }
}

function Thumbnail({ p }) {
  const [loaded, setLoaded] = useState(false)
  const [failed, setFailed] = useState(false)
  const [c1, c2] = p.hue
  const host = hostOf(p.url)

  return (
    <div className="relative aspect-[16/10] overflow-hidden bg-bg2">
      {/* Designed fallback thumbnail (always rendered underneath) */}
      <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-110"
           style={{ background: `radial-gradient(120% 90% at 20% 10%, ${c1}55, transparent 60%), radial-gradient(100% 80% at 90% 100%, ${c2}55, transparent 60%), #0d0f16` }}>
        <div className="absolute inset-0 opacity-40 grid-bg" style={{ maskImage: 'none', WebkitMaskImage: 'none', backgroundSize: '32px 32px' }} />
        <div className="absolute inset-0 grid place-items-center px-6 text-center">
          <span className="font-display text-[clamp(1.6rem,4vw,2.6rem)] font-bold leading-none tracking-tight text-white/90 drop-shadow">{p.name}</span>
        </div>
      </div>

      {/* Live preview, shown only when it loads */}
      {!failed && (
        <img
          src={previewUrl(p.url)}
          alt={`Preview of the ${p.name} website`}
          loading="lazy"
          decoding="async"
          referrerPolicy="no-referrer"
          onLoad={() => setLoaded(true)}
          onError={() => setFailed(true)}
          className={`absolute inset-0 h-full w-full object-cover object-top transition-all duration-700 ease-out group-hover:scale-110 ${loaded ? 'opacity-100' : 'opacity-0'}`}
        />
      )}

      {/* Browser chrome */}
      <div className="absolute inset-x-0 top-0 flex items-center gap-2 bg-black/55 px-3 py-2 backdrop-blur-md">
        <span className="h-2 w-2 rounded-full bg-white/30" /><span className="h-2 w-2 rounded-full bg-white/30" /><span className="h-2 w-2 rounded-full bg-white/30" />
        <span className="ml-2 truncate rounded bg-white/10 px-2 py-0.5 font-mono text-[10px] text-slate-300">{host}</span>
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-bg/70 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
    </div>
  )
}

function ProjectCard({ p, index, leaving }) {
  return (
    <div
      className="project-card"
      data-leaving={leaving}
      style={{ '--i': index }}
    >
      <TiltCard className="group flex h-full flex-col overflow-hidden !rounded-3xl" max={5}>
        <a href={p.url} target="_blank" rel="noopener noreferrer" aria-label={`Open ${p.name} website in a new tab`} tabIndex={-1}>
          <Thumbnail p={p} />
        </a>
        <div className="flex flex-1 flex-col p-6 sm:p-7">
          <div className="flex items-start justify-between gap-4">
            <h3 className="font-display text-2xl font-semibold tracking-tight">{p.name}</h3>
            <a href={p.url} target="_blank" rel="noopener noreferrer" aria-label={`Open ${p.name} in a new tab`}
               className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/15 transition-all duration-300 hover:border-cyan hover:bg-cyan/10 group-hover:rotate-45">
              <LuArrowUpRight size={18} />
            </a>
          </div>
          <p className="mt-3 text-sm sm:text-[15px] leading-relaxed text-mute">{p.description}</p>

          {p.highlights.length > 0 && (
            <ul className="mt-4 grid gap-1.5 text-sm text-slate-300">
              {p.highlights.map((h) => (
                <li key={h} className="flex items-start gap-2"><LuCheck size={16} className="mt-0.5 shrink-0 text-cyan" aria-hidden="true" />{h}</li>
              ))}
            </ul>
          )}

          <div className="mt-5 flex flex-wrap gap-2">
            {p.tech.map((t) => <Pill key={t} tone={t === 'PHP' ? 'violet' : 'cyan'}>{t}</Pill>)}
          </div>

          <a href={p.url} target="_blank" rel="noopener noreferrer" className="btn btn-ghost mt-6 w-full sm:w-auto sm:self-start">
            Live Website <LuArrowUpRight size={18} />
          </a>
        </div>
      </TiltCard>
    </div>
  )
}

export default function Projects() {
  const [active, setActive] = useState('all')   // selected filter button
  const [shown, setShown] = useState('all')     // filter currently rendered
  const [leaving, setLeaving] = useState(false)
  const timer = useRef(null)

  const choose = (id) => {
    if (id === active) return
    setActive(id)
    setLeaving(true)
    clearTimeout(timer.current)
    timer.current = setTimeout(() => { setShown(id); setLeaving(false) }, 280)
  }

  const list = projects.filter((p) => shown === 'all' || p.tags.includes(shown))

  return (
    <section id="projects" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading eyebrow="Featured Projects">
          Things I&apos;ve <span className="grad-text">Built</span>
        </SectionHeading>

        <Reveal className="-mt-4 mb-10 flex flex-wrap gap-2.5 md:-mt-8" role="group" aria-label="Filter projects">
          {FILTERS.map((f) => (
            <button key={f.id} onClick={() => choose(f.id)} aria-pressed={active === f.id}
              className={`rounded-full border px-5 py-2.5 text-sm font-medium transition-all duration-300 ${
                active === f.id ? 'border-transparent bg-gradient-to-r from-violet to-cyan text-white shadow-[0_8px_30px_-8px_rgba(139,92,246,.8)]' : 'border-white/12 bg-white/[0.03] text-slate-300 hover:border-white/30 hover:text-white'
              }`}>
              {f.label}
            </button>
          ))}
        </Reveal>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3" aria-live="polite">
          {list.map((p, i) => <ProjectCard key={`${shown}-${p.id}`} p={p} index={i} leaving={leaving} />)}
        </div>
        <p className="mt-8 text-sm text-mute">
          Showing {list.length} of {projects.length} live projects. Every card opens the live website in a new tab.
        </p>
      </div>
    </section>
  )
}
