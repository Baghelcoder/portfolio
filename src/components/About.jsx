import { LuMonitor, LuServer, LuCloud } from 'react-icons/lu'
import { aboutCards, stats } from '../data/content'
import { useCountUp, useInView } from '../hooks/useMotion'
import { Reveal, SectionHeading, TiltCard } from './ui'

const icons = { monitor: LuMonitor, server: LuServer, cloud: LuCloud }

function Stat({ s, i }) {
  const [ref, inView] = useInView({ threshold: 0.4 })
  const n = useCountUp(s.value ?? 0, inView)
  return (
    <div ref={ref} className={`reveal ${inView ? 'in' : ''} text-center sm:text-left`} style={{ '--d': `${i * 90}ms` }}>
      <div className={`font-display text-4xl sm:text-5xl font-bold grad-text ${inView ? '' : ''}`} aria-label={s.text ?? `${s.value}${s.suffix}`}>
        {s.text ?? `${n}${s.suffix}`}
      </div>
      <div className="mt-2 text-sm text-mute">{s.label}</div>
    </div>
  )
}

export default function About() {
  return (
    <section id="about" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading eyebrow="About Me">
          Behind The <span className="grad-text">Code</span>
        </SectionHeading>

        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <Reveal className="space-y-5 text-base sm:text-lg leading-relaxed text-mute">
            <p><span className="text-white">I&apos;m Yogesh Kumar</span>, a Full Stack Web Developer passionate about building practical and scalable web applications.</p>
            <p>With 2+ year of practical development experience, I work across frontend, backend, databases, APIs, and server deployment.</p>
            <p>I enjoy solving real-world problems through technology and building applications that make business processes easier.</p>
          </Reveal>

          <div className="grid gap-4">
            {aboutCards.map((c, i) => {
              const Icon = icons[c.icon]
              return (
                <Reveal key={c.n} delay={i * 110}>
                  <TiltCard className="flex gap-5 p-6 sm:p-7" max={4}>
                    <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-violet/30 to-cyan/20 text-cyan">
                      <Icon size={26} />
                    </div>
                    <div>
                      <div className="font-mono text-xs text-violet-300">{c.n}</div>
                      <h3 className="mt-1 font-display text-xl font-semibold">{c.title}</h3>
                      <p className="mt-2 text-sm sm:text-base leading-relaxed text-mute">{c.text}</p>
                    </div>
                  </TiltCard>
                </Reveal>
              )
            })}
          </div>
        </div>

        <div className="mt-16 grid grid-cols-2 gap-8 rounded-3xl border border-white/[0.08] bg-white/[0.02] p-8 sm:p-10 lg:grid-cols-4">
          {stats.map((s, i) => <Stat key={s.label} s={s} i={i} />)}
        </div>
      </div>
    </section>
  )
}
