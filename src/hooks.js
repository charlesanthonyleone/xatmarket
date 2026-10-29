import { useEffect, useRef, useState } from 'react'
export function useReduced() {
  const [r, setR] = useState(() => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  useEffect(() => { const m = window.matchMedia('(prefers-reduced-motion: reduce)'); const on = () => setR(m.matches); m.addEventListener('change', on); return () => m.removeEventListener('change', on) }, [])
  return r
}
export function useInView(threshold = 0.12) {
  const ref = useRef(null)
  const [v, setV] = useState(false)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const io = new IntersectionObserver(([e]) => setV(e.isIntersecting), { threshold })
    io.observe(el); return () => io.disconnect()
  }, [threshold])
  return [ref, v]
}
export function useTick(ms, active = true) {
  const [n, setN] = useState(0)
  const reduce = useReduced()
  useEffect(() => { if (!active || reduce) return; const t = setInterval(() => setN((x) => x + 1), ms); return () => clearInterval(t) }, [ms, active, reduce])
  return n
}
