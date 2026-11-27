import { useInView, useMagnetic, useTilt } from '../hooks/useMotion'

/** Fade/slide in once when scrolled into view. */
export function Reveal({ as: Tag = 'div', delay = 0, className = '', children, ...rest }) {
  const [ref, inView] = useInView()
  return (
    <Tag ref={ref} style={{ '--d': `${delay}ms` }} className={`reveal ${inView ? 'in' : ''} ${className}`} {...rest}>
      {children}
    </Tag>
  )
}

export function SectionHeading({ eyebrow, children, align = 'left', className = '' }) {
  return (
    <Reveal className={`mb-12 md:mb-16 ${align === 'center' ? 'text-center' : ''} ${className}`}>
      <p className="font-mono text-xs sm:text-sm tracking-[0.25em] uppercase text-cyan flex items-center gap-3 mb-4"
         style={align === 'center' ? { justifyContent: 'center' } : undefined}>
        <span className="h-px w-8 bg-gradient-to-r from-violet to-cyan" aria-hidden="true" />
        {eyebrow}
      </p>
      <h2 className="font-display font-bold tracking-tight leading-[1.05] text-[clamp(2rem,6vw,4rem)]">{children}</h2>
    </Reveal>
  )
}

/** Link/button that is gently pulled toward the cursor on desktop. */
export function MagneticLink({ className = '', children, ...props }) {
  const m = useMagnetic(0.28)
  return (
    <a {...m} {...props} className={`${className}`} style={{ transition: 'transform .25s cubic-bezier(.2,.8,.2,1)' }}>
      {children}
    </a>
  )
}

/** Card with tilt + pointer-following border glow. */
export function TiltCard({ className = '', children, max = 6, ...props }) {
  const t = useTilt(max)
  return (
    <div {...t} {...props} className={`glass ${className}`}>
      {children}
    </div>
  )
}

export function Pill({ children, tone = 'violet' }) {
  const tones = {
    violet: 'border-violet/30 bg-violet/10 text-violet-200',
    cyan: 'border-cyan/30 bg-cyan/10 text-cyan',
    neutral: 'border-white/10 bg-white/5 text-slate-300',
  }
  return (
    <span className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium ${tones[tone]}`}>
      {children}
    </span>
  )
}
