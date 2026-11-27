import { LuFlaskConical, LuShoppingBag, LuPenTool, LuBox } from 'react-icons/lu'
import { extraWork } from '../data/projects'
import { Reveal, SectionHeading, TiltCard, Pill } from './ui'

const icons = { flask: LuFlaskConical, bag: LuShoppingBag, pen: LuPenTool, box: LuBox }

export default function MoreWork() {
  return (
    <section id="more-work" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading eyebrow="Additional Development Experience">
          More Than Just <span className="grad-text">Websites</span>
        </SectionHeading>

        <div className="grid gap-5 md:grid-cols-2">
          {extraWork.map((w, i) => {
            const Icon = icons[w.icon]
            return (
              <Reveal key={w.id} delay={(i % 2) * 120}>
                <TiltCard className="group relative h-full overflow-hidden p-7 sm:p-9" max={4}>
                  <span className="pointer-events-none absolute -right-4 -top-6 select-none font-display text-[9rem] font-bold leading-none text-white/[0.03] transition-colors duration-500 group-hover:text-violet/10" aria-hidden="true">
                    0{i + 1}
                  </span>
                  <div className="relative">
                    <div className="mb-6 grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-violet/35 to-cyan/20 text-cyan transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110">
                      <Icon size={26} />
                    </div>
                    <h3 className="font-display text-xl sm:text-2xl font-semibold leading-snug">{w.title}</h3>
                    <ul className="mt-5 space-y-2 text-sm sm:text-[15px] text-mute">
                      {w.points.map((p) => (
                        <li key={p} className="flex items-start gap-3">
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-r from-violet to-cyan" aria-hidden="true" />{p}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-6 flex flex-wrap gap-2">
                      {w.tech.map((t) => <Pill key={t} tone="neutral">{t}</Pill>)}
                    </div>
                  </div>
                </TiltCard>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
