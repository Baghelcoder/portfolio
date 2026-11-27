import { useEffect, useRef, useState } from 'react'
import { LuArrowUp } from 'react-icons/lu'
import { useFinePointer, useReducedMotion } from '../hooks/useMotion'

/** Thin gradient bar showing page scroll progress. */
export function ScrollProgress() {
  const ref = useRef(null)
  useEffect(() => {
    let raf = 0
    const update = () => {
      raf = 0
      const h = document.documentElement.scrollHeight - window.innerHeight
      const p = h > 0 ? window.scrollY / h : 0
      if (ref.current) ref.current.style.transform = `scaleX(${p})`
    }
    const on = () => { if (!raf) raf = requestAnimationFrame(update) }
    update()
    window.addEventListener('scroll', on, { passive: true })
    window.addEventListener('resize', on)
    return () => { window.removeEventListener('scroll', on); window.removeEventListener('resize', on); cancelAnimationFrame(raf) }
  }, [])
  return (
    <div className="fixed top-0 left-0 right-0 z-[70] h-[3px] pointer-events-none" aria-hidden="true">
      <div ref={ref} className="h-full origin-left bg-gradient-to-r from-violet to-cyan" style={{ transform: 'scaleX(0)' }} />
    </div>
  )
}

/** Dot + trailing ring. Desktop (fine pointer) only, disabled for reduced motion. */
export function Cursor() {
  const fine = useFinePointer()
  const reduced = useReducedMotion()
  const dot = useRef(null)
  const ring = useRef(null)
  const enabled = fine && !reduced

  useEffect(() => {
    if (!enabled) return
    document.documentElement.classList.add('has-cursor')
    let x = -100, y = -100, rx = -100, ry = -100, raf = 0, hover = false, down = false
    const move = (e) => {
      x = e.clientX; y = e.clientY
      const t = e.target
      hover = !!(t.closest && t.closest('a, button, select, label, [data-cursor="hover"]'))
    }
    const md = () => { down = true }
    const mu = () => { down = false }
    const loop = () => {
      rx += (x - rx) * 0.16
      ry += (y - ry) * 0.16
      if (dot.current) dot.current.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%) scale(${down ? 0.6 : 1})`
      if (ring.current) {
        ring.current.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%) scale(${hover ? 1.8 : 1})`
        ring.current.style.opacity = hover ? 0.9 : 0.5
      }
      raf = requestAnimationFrame(loop)
    }
    window.addEventListener('mousemove', move, { passive: true })
    window.addEventListener('mousedown', md)
    window.addEventListener('mouseup', mu)
    raf = requestAnimationFrame(loop)
    return () => {
      document.documentElement.classList.remove('has-cursor')
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mousedown', md)
      window.removeEventListener('mouseup', mu)
      cancelAnimationFrame(raf)
    }
  }, [enabled])

  if (!enabled) return null
  return (
    <>
      <div ref={ring} aria-hidden="true" className="pointer-events-none fixed left-0 top-0 z-[90] h-9 w-9 rounded-full border border-cyan/80 transition-[opacity] duration-200" />
      <div ref={dot} aria-hidden="true" className="pointer-events-none fixed left-0 top-0 z-[91] h-2 w-2 rounded-full bg-white mix-blend-difference" />
    </>
  )
}

/** Lightweight canvas particle field with connecting lines. */
export function Particles({ className = '' }) {
  const canvas = useRef(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    const c = canvas.current
    if (!c) return
    const ctx = c.getContext('2d')
    let w = 0, h = 0, raf = 0, running = true, pts = []
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const mouse = { x: -999, y: -999 }

    const resize = () => {
      w = c.clientWidth; h = c.clientHeight
      c.width = w * dpr; c.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const count = Math.max(24, Math.min(70, Math.floor((w * h) / 22000)))
      pts = Array.from({ length: count }, () => ({
        x: Math.random() * w, y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.28, vy: (Math.random() - 0.5) * 0.28,
        r: Math.random() * 1.4 + 0.6, c: Math.random() > 0.5 ? '139,92,246' : '34,211,238',
      }))
      draw()
    }

    const draw = () => {
      ctx.clearRect(0, 0, w, h)
      for (let i = 0; i < pts.length; i++) {
        const p = pts[i]
        if (!reduced) {
          p.x += p.vx; p.y += p.vy
          if (p.x < 0 || p.x > w) p.vx *= -1
          if (p.y < 0 || p.y > h) p.vy *= -1
        }
        ctx.beginPath()
        ctx.fillStyle = `rgba(${p.c},0.75)`
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fill()
        for (let j = i + 1; j < pts.length; j++) {
          const q = pts[j]
          const dx = p.x - q.x, dy = p.y - q.y
          const d = dx * dx + dy * dy
          if (d < 120 * 120) {
            ctx.strokeStyle = `rgba(139,92,246,${(1 - Math.sqrt(d) / 120) * 0.16})`
            ctx.lineWidth = 1
            ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.stroke()
          }
        }
        // gentle repel from pointer
        const mx = p.x - mouse.x, my = p.y - mouse.y
        const md = mx * mx + my * my
        if (!reduced && md < 140 * 140 && md > 1) { p.x += (mx / Math.sqrt(md)) * 0.6; p.y += (my / Math.sqrt(md)) * 0.6 }
      }
    }

    const loop = () => { if (running) { draw(); raf = requestAnimationFrame(loop) } }
    const onMove = (e) => {
      const r = c.getBoundingClientRect()
      mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top
    }
    // Pause when tab hidden or canvas off-screen
    const io = new IntersectionObserver(([en]) => {
      const vis = en.isIntersecting
      if (vis && !running && !reduced) { running = true; raf = requestAnimationFrame(loop) }
      if (!vis) { running = false; cancelAnimationFrame(raf) }
    })
    const onVis = () => {
      if (document.hidden) { running = false; cancelAnimationFrame(raf) }
      else if (!reduced) { running = true; raf = requestAnimationFrame(loop) }
    }

    resize()
    io.observe(c)
    window.addEventListener('resize', resize)
    window.addEventListener('mousemove', onMove, { passive: true })
    document.addEventListener('visibilitychange', onVis)
    if (!reduced) raf = requestAnimationFrame(loop)
    return () => {
      running = false; cancelAnimationFrame(raf); io.disconnect()
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('visibilitychange', onVis)
    }
  }, [reduced])

  return <canvas ref={canvas} aria-hidden="true" className={`absolute inset-0 h-full w-full ${className}`} />
}

/** Brief branded intro, then slides away. Skipped for reduced motion. */
export function PageLoader() {
  const reduced = useReducedMotion()
  const [gone, setGone] = useState(false)
  useEffect(() => {
    const t = setTimeout(() => setGone(true), reduced ? 0 : 1900)
    return () => clearTimeout(t)
  }, [reduced])
  if (gone || reduced) return null
  return (
    <div className="loader-out fixed inset-0 z-[100] grid place-items-center bg-bg" aria-hidden="true">
      <div className="text-center">
        <div className="font-display text-3xl sm:text-5xl font-bold tracking-tight">
          YOGESH<span className="grad-text">KUMAR</span>
        </div>
        <div className="mx-auto mt-6 h-[2px] w-40 overflow-hidden rounded bg-white/10">
          <div className="loader-bar h-full bg-gradient-to-r from-violet to-cyan" />
        </div>
      </div>
    </div>
  )
}

export function BackToTop() {
  const [show, setShow] = useState(false)
  useEffect(() => {
    const on = () => setShow(window.scrollY > 700)
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Back to top"
      className={`fixed bottom-5 right-5 sm:bottom-8 sm:right-8 z-40 grid h-12 w-12 place-items-center rounded-full border border-white/15 bg-bg2/80 backdrop-blur-md text-white shadow-[0_10px_40px_-10px_rgba(139,92,246,.8)] transition-all duration-500 hover:-translate-y-1 hover:border-cyan ${
        show ? 'opacity-100 translate-y-0' : 'pointer-events-none opacity-0 translate-y-6'
      }`}
    >
      <LuArrowUp size={20} />
    </button>
  )
}
