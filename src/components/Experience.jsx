import { LuBriefcase } from 'react-icons/lu'
import { responsibilities } from '../data/content'
import { useInView } from '../hooks/useMotion'
import { Reveal, SectionHeading, TiltCard } from './ui'

export default function Experience() {
  const [lineRef, lineIn] = useInView({ threshold: 0.05 })

  return (
    <section id="experience" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <SectionHeading eyebrow="Experience">
          My Development <span className="grad-text">Journey</span>
        </SectionHeading>

        <div ref={lineRef} className="relative pl-10 sm:pl-16">
          {/* Animated vertical line */}
          <div className="absolute bottom-0 left-[15px] top-0 w-px bg-white/10 sm:left-[23px]" aria-hidden="true">
            <div className={`tl-line h-full w-full bg-gradient-to-b from-violet via-cyan to-transparent ${lineIn ? 'in' : ''}`} />
          </div>

          {/* Roles */}
          {[
            {
              period: '1+ YEAR',
              title: 'Freelance Full Stack Web Developer',
              text: 'Developing, maintaining and deploying modern web applications across the frontend, backend, database and server.',
            },
            {
              period: 'SINCE 10 JUNE 2026 · CURRENT',
              title: 'Full Stack Developer',
              company: 'Nian Technologies',
              url: 'https://niantechnologies.com/',
              text: 'Working as a full stack developer on web applications.',
            }
          ].map((role) => (
            <Reveal key={role.title} className="relative mb-10">
              <span className="absolute -left-10 top-6 grid h-8 w-8 place-items-center rounded-full border border-cyan/50 bg-bg text-cyan shadow-[0_0_30px_rgba(34,211,238,.5)] sm:-left-16 sm:h-12 sm:w-12" aria-hidden="true">
                <LuBriefcase size={18} />
              </span>
              <TiltCard className="p-7 sm:p-9" max={3}>
                <p className="font-mono text-xs tracking-widest text-cyan">{role.period}</p>
                <h3 className="mt-2 font-display text-2xl sm:text-3xl font-semibold">{role.title}</h3>
                {role.company && (
                  <a href={role.url} target="_blank" rel="noopener noreferrer" className="mt-1 inline-block text-lg text-violet-300 underline-offset-4 hover:text-cyan hover:underline">
                    {role.company} ↗
                  </a>
                )}
                <p className="mt-3 text-mute">{role.text}</p>
              </TiltCard>
            </Reveal>
          ))}

          {/* Responsibilities */}
          <ul className="space-y-4">
            {responsibilities.map((r, i) => (
              <Reveal as="li" key={r} delay={(i % 3) * 70} className="relative">
                <span className="absolute -left-[31px] top-[1.15rem] h-3 w-3 rounded-full border-2 border-violet bg-bg sm:-left-[47px]" aria-hidden="true" />
                <div className="rounded-2xl border border-white/[0.07] bg-white/[0.025] px-5 py-4 text-[15px] text-slate-200 transition-all duration-300 hover:translate-x-1 hover:border-violet/40 hover:bg-violet/[0.06]">
                  <span className="mr-3 font-mono text-xs text-cyan">{String(i + 1).padStart(2, '0')}</span>{r}
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
