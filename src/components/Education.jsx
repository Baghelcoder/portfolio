import { LuGraduationCap } from 'react-icons/lu'
import { Reveal, SectionHeading, TiltCard } from './ui'

export default function Education() {
  return (
    <section id="education" className="relative py-16 md:py-24">
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <SectionHeading eyebrow="Education">
          Academic <span className="grad-text">Background</span>
        </SectionHeading>
        <Reveal>
          <TiltCard className="flex flex-col gap-6 p-7 sm:flex-row sm:items-center sm:p-10" max={3}>
            <div className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-violet/35 to-cyan/20 text-cyan">
              <LuGraduationCap size={30} />
            </div>
            <div className="flex-1">
              <h3 className="font-display text-xl sm:text-2xl font-semibold">Bachelor of Technology (B.Tech.)</h3>
              <p className="mt-1 text-slate-300">Rajasthan Technical University (RTU)</p>
              <dl className="mt-4 flex flex-wrap gap-x-10 gap-y-3 text-sm">
                <div><dt className="text-mute">Enrollment Year</dt><dd className="font-mono text-white">2020</dd></div>
                <div><dt className="text-mute">Academic Status</dt><dd className="font-mono text-white">Degree Not Completed</dd></div>
              </dl>
            </div>
          </TiltCard>
        </Reveal>
      </div>
    </section>
  )
}
