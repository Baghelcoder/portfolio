import { useEffect, useRef, useState, useCallback } from 'react'

const REDUCED_QUERY = '(prefers-reduced-motion: reduce)'
const FINE_POINTER_QUERY = '(hover: hover) and (pointer: fine)'

function useMedia(query, initial = false) {
  const [matches, setMatches] = useState(() =>
    typeof window === 'undefined' ? initial : window.matchMedia(query).matches,
  )
  useEffect(() => {
    const mq = window.matchMedia(query)
    const on = () => setMatches(mq.matches)
    on()
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [query])
  return matches
}

export const useReducedMotion = () => useMedia(REDUCED_QUERY)
export const useFinePointer = () => useMedia(FINE_POINTER_QUERY)

/** True once the element has scrolled into view (fires once). */
export function useInView(options = {}) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)
  const { threshold = 0.15, rootMargin = '0px 0px -8% 0px' } = options
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (typeof IntersectionObserver === 'undefined') { setInView(true); return }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setInView(true); io.disconnect() }
      },
      { threshold, rootMargin },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [threshold, rootMargin])
  return [ref, inView]
}

/** Animates 0 → target when `start` becomes true. */
export function useCountUp(target, start, duration = 1600) {
  const reduced = useReducedMotion()
  const [value, setValue] = useState(0)
  useEffect(() => {
    if (!start) return
    if (reduced) { setValue(target); return }
    let raf
    const t0 = performance.now()
    const tick = (now) => {
      const p = Math.min((now - t0) / duration, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      setValue(Math.round(target * eased))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [start, target, duration, reduced])
  return value
}

/** Magnetic pull toward the pointer. Returns a ref + handlers. */
export function useMagnetic(strength = 0.3) {
  const ref = useRef(null)
  const reduced = useReducedMotion()
  const fine = useFinePointer()
  const enabled = fine && !reduced
  const onMove = useCallback((e) => {
    if (!enabled || !ref.current) return
    const r = ref.current.getBoundingClientRect()
    const x = (e.clientX - (r.left + r.width / 2)) * strength
    const y = (e.clientY - (r.top + r.height / 2)) * strength
    ref.current.style.transform = `translate(${x}px, ${y}px)`
  }, [enabled, strength])
  const onLeave = useCallback(() => {
    if (ref.current) ref.current.style.transform = 'translate(0,0)'
  }, [])
  return { ref, onMouseMove: onMove, onMouseLeave: onLeave }
}

/** 3D tilt + moving glow for cards. Sets CSS vars --mx / --my for the glow. */
export function useTilt(max = 8) {
  const ref = useRef(null)
  const reduced = useReducedMotion()
  const fine = useFinePointer()
  const enabled = fine && !reduced
  const onMove = useCallback((e) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width
    const py = (e.clientY - r.top) / r.height
    el.style.setProperty('--mx', `${px * 100}%`)
    el.style.setProperty('--my', `${py * 100}%`)
    if (enabled) {
      el.style.transform = `perspective(900px) rotateX(${(0.5 - py) * max}deg) rotateY(${(px - 0.5) * max}deg) translateZ(0)`
    }
  }, [enabled, max])
  const onLeave = useCallback(() => {
    if (ref.current) ref.current.style.transform = ''
  }, [])
  return { ref, onMouseMove: onMove, onMouseLeave: onLeave }
}

/** Which section id is currently in view (for navbar highlighting).
 *  Scroll-based so it also works for lazily mounted sections. */
export function useScrollSpy(ids) {
  const [active, setActive] = useState(ids[0])
  useEffect(() => {
    let raf = 0
    const update = () => {
      raf = 0
      const line = window.innerHeight * 0.4
      let current = ids[0]
      for (const id of ids) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= line) current = id
      }
      setActive(current)
    }
    const on = () => { if (!raf) raf = requestAnimationFrame(update) }
    update()
    window.addEventListener('scroll', on, { passive: true })
    window.addEventListener('resize', on)
    return () => { window.removeEventListener('scroll', on); window.removeEventListener('resize', on); cancelAnimationFrame(raf) }
  }, [ids])
  return active
}
