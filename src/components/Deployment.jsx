import { SiReact, SiNginx, SiNodedotjs, SiMysql } from 'react-icons/si'
import { architecture, serverChips } from '../data/content'
import { Reveal, SectionHeading } from './ui'

const icons = { react: SiReact, nginx: SiNginx, node: SiNodedotjs, mysql: SiMysql }

function Connector({ i }) {
  return (
    <div className="relative mx-auto h-14 w-[2px]" aria-hidden="true">
      <div className="flow-line absolute inset-0 rounded" />
      <span className="flow-dot absolute left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-cyan shadow-[0_0_14px_#22d3ee]" style={{ '--dl': `${i * 0.5}s` }} />
    </div>
  )
}

export default function Deployment() {
  return (
    <section id="deployment" className="relative py-24 md:py-32">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-bg2/60 to-transparent" aria-hidden="true" />
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading eyebrow="Deployment & Server Experience">
          From Code To <span className="grad-text">Production</span>
        </SectionHeading>

        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          {/* Architecture diagram */}
          <div className="mx-auto w-full max-w-md" role="img" aria-label="Architecture: React Frontend, then Nginx Web Server, then Node.js / Express API, then MySQL Database">
            {architecture.map((a, i) => {
              const Icon = icons[a.id]
              return (
                <div key={a.id}>
                  <Reveal delay={i * 140}>
                    <div className="glass flex items-center gap-5 p-5 sm:p-6">
                      <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-violet/35 to-cyan/20 text-cyan"><Icon size={26} /></div>
                      <div>
                        <div className="font-display text-lg font-semibold">{a.label}</div>
                        <div className="text-sm text-mute">{a.sub}</div>
                      </div>
                      <span className="ml-auto font-mono text-xs text-white/30">0{i + 1}</span>
                    </div>
                  </Reveal>
                  {i < architecture.length - 1 && <Connector i={i} />}
                </div>
              )
            })}
          </div>

          {/* Chips */}
          <div>
            <Reveal>
              <p className="mb-8 max-w-lg text-base sm:text-lg leading-relaxed text-mute">
                I deploy React applications on Linux VPS servers: configuring Nginx as a reverse proxy, running Node.js services with PM2, and managing the server over SSH.
              </p>
            </Reveal>
            <ul className="grid grid-cols-2 gap-3 sm:gap-4">
              {serverChips.map((c, i) => (
                <Reveal as="li" key={c} delay={i * 80}>
                  <div className="group flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.035] px-4 py-4 text-sm sm:text-[15px] font-medium transition-all duration-300 hover:-translate-y-1 hover:border-cyan/50 hover:bg-cyan/[0.07]">
                    <span className="h-2 w-2 shrink-0 rounded-full bg-gradient-to-r from-violet to-cyan transition-transform group-hover:scale-150" aria-hidden="true" />
                    {c}
                  </div>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
