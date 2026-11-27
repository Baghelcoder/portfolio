import { skillGroups } from '../data/skills'
import { Reveal, SectionHeading, TiltCard } from './ui'

export default function Skills() {
  // Names for the scrolling strip (unique)
  const names = [...new Set(skillGroups.flatMap((g) => g.skills.map((s) => s.name)))]

  return (
    <section id="skills" className="relative py-24 md:py-32">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-bg2/60 to-transparent" aria-hidden="true" />
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading eyebrow="Technical Skills">
          My Technical <span className="grad-text">Arsenal</span>
        </SectionHeading>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((g, gi) => (
            <Reveal key={g.id} delay={(gi % 3) * 100} className={g.id === 'database' || g.id === 'backend' ? '' : ''}>
              <TiltCard className="h-full p-6 sm:p-7" max={4}>
                <div className="mb-5 flex items-center justify-between">
                  <h3 className="font-display text-xl font-semibold">{g.title}</h3>
                  <span className={`font-mono text-xs ${g.accent === 'cyan' ? 'text-cyan' : 'text-violet-300'}`}>{String(g.skills.length).padStart(2, '0')}</span>
                </div>
                <ul className="flex flex-wrap gap-2.5">
                  {g.skills.map((s) => {
                    const Icon = s.icon
                    return (
                      <li key={s.name}
                          className="group inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 text-sm text-slate-200 transition-all duration-300 hover:-translate-y-0.5 hover:border-cyan/50 hover:bg-cyan/10 hover:text-white">
                        {Icon && <Icon size={16} className="text-violet-300 transition-colors group-hover:text-cyan" aria-hidden="true" />}
                        {s.name}
                      </li>
                    )
                  })}
                </ul>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Marquee strip */}
      <div className="mt-20 overflow-hidden border-y border-white/[0.06] py-5" aria-hidden="true">
        <div className="marquee font-display text-2xl sm:text-4xl font-bold text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.25)]">
          {[0, 1].map((k) => (
            <div key={k} className="flex shrink-0 items-center">
              {names.map((n) => (
                <span key={n + k} className="flex items-center whitespace-nowrap px-6">
                  {n}<span className="ml-12 h-2 w-2 rounded-full bg-gradient-to-r from-violet to-cyan" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
