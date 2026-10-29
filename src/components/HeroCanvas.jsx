import { useEffect, useRef } from 'react'

// Drifting constellations of glowing chat bubbles, with soft dust and gentle pointer parallax.
export default function HeroCanvas() {
  const ref = useRef(null)
  useEffect(() => {
    const c = ref.current, ctx = c.getContext('2d')
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let w, h, dpr, raf, bubbles = [], dust = [], mx = 0, my = 0, px = 0, py = 0
    const rnd = (a, b) => a + Math.random() * (b - a)
    const setup = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = c.clientWidth; h = c.clientHeight
      c.width = w * dpr; c.height = h * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const n = Math.round(Math.min(34, Math.max(9, w / 45)))
      bubbles = Array.from({ length: n }, () => ({ x: rnd(0, w), y: rnd(0, h * .85), r: rnd(5, 15), z: rnd(.3, 1), vx: rnd(-.08, .08), vy: rnd(-.22, -.06), ph: rnd(0, 6.28), flip: Math.random() < .5 }))
      dust = Array.from({ length: Math.round(w / 6) }, () => ({ x: rnd(0, w), y: rnd(0, h), r: rnd(.3, 1.4), z: rnd(.2, 1), vy: rnd(-.15, -.03), ph: rnd(0, 6.28) }))
    }
    const bubble = (x, y, r, flip) => {
      const bw = r * 1.5, bh = r
      ctx.beginPath()
      ctx.ellipse(x, y, bw, bh, 0, 0, Math.PI * 2)
      ctx.moveTo(x + (flip ? -1 : 1) * bw * .35, y + bh * .8)
      ctx.lineTo(x + (flip ? -1 : 1) * bw * .7, y + bh * 1.55)
      ctx.lineTo(x + (flip ? -1 : 1) * bw * .7 - (flip ? -1 : 1) * bw * .55, y + bh * .9)
    }
    const frame = (t) => {
      px += (mx - px) * .04; py += (my - py) * .04
      ctx.clearRect(0, 0, w, h)
      for (const d of dust) {
        if (!reduce) { d.y += d.vy * d.z; if (d.y < -5) { d.y = h + 5; d.x = rnd(0, w) } }
        const a = .25 + .35 * Math.sin(t / 900 + d.ph)
        ctx.fillStyle = `rgba(240,217,166,${a * d.z})`
        ctx.beginPath(); ctx.arc(d.x + px * 14 * d.z, d.y + py * 10 * d.z, d.r, 0, 6.283); ctx.fill()
      }
      const P = bubbles.map((b) => {
        if (!reduce) {
          b.x += b.vx + Math.sin(t / 3000 + b.ph) * .05; b.y += b.vy * b.z
          if (b.y < -40) { b.y = h + 40; b.x = rnd(0, w) }
          if (b.x < -40) b.x = w + 40; if (b.x > w + 40) b.x = -40
        }
        return { x: b.x + px * 30 * b.z, y: b.y + py * 20 * b.z, b }
      })
      ctx.lineWidth = .7
      for (let i = 0; i < P.length; i++) for (let j = i + 1; j < P.length; j++) {
        const dx = P[i].x - P[j].x, dy = P[i].y - P[j].y, d = Math.hypot(dx, dy), max = 190
        if (d < max) { ctx.strokeStyle = `rgba(217,179,106,${(1 - d / max) * .28})`; ctx.beginPath(); ctx.moveTo(P[i].x, P[i].y); ctx.lineTo(P[j].x, P[j].y); ctx.stroke() }
      }
      for (const p of P) {
        const { b } = p, pulse = .65 + .35 * Math.sin(t / 1400 + b.ph), r = b.r * (.6 + b.z * .5)
        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, r * 4)
        g.addColorStop(0, `rgba(255,214,140,${.32 * pulse * b.z})`); g.addColorStop(1, 'rgba(255,214,140,0)')
        ctx.fillStyle = g; ctx.beginPath(); ctx.arc(p.x, p.y, r * 4, 0, 6.283); ctx.fill()
        bubble(p.x, p.y, r, b.flip)
        ctx.fillStyle = `rgba(255,232,190,${.10 + .14 * pulse * b.z})`; ctx.fill()
        ctx.strokeStyle = `rgba(255,226,170,${.45 + .4 * pulse * b.z})`; ctx.lineWidth = 1; ctx.stroke()
      }
      if (!reduce) raf = requestAnimationFrame(frame)
    }
    const move = (e) => { mx = e.clientX / window.innerWidth - .5; my = e.clientY / window.innerHeight - .5 }
    setup(); frame(0)
    const ro = new ResizeObserver(() => { setup(); if (reduce) frame(0) }); ro.observe(c)
    if (!reduce) window.addEventListener('pointermove', move, { passive: true })
    return () => { cancelAnimationFrame(raf); ro.disconnect(); window.removeEventListener('pointermove', move) }
  }, [])
  return <canvas ref={ref} aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full" />
}
