import { useEffect, useRef } from 'react'

const TV = <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="7" width="18" height="13" rx="2.5"/><path d="M8 2.5 12 7l4-4.5"/></svg>
const MAP = <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M9 4 3 6.5v13.5L9 17.5l6 2.5 6-2.5V4l-6 2.5z"/><path d="M9 4v13.5M15 6.5V20"/></svg>

// seeded value noise + fBm
function makeNoise(seed) {
  const p = new Uint8Array(512); let s = seed
  const r = () => ((s = (s * 16807) % 2147483647) / 2147483647)
  const perm = [...Array(256).keys()].sort(() => r() - 0.5)
  for (let i = 0; i < 512; i++) p[i] = perm[i & 255]
  const v = (i, j) => p[p[i & 255] + (j & 255)] / 255
  const sm = (t) => t * t * (3 - 2 * t)
  const n = (x, y) => { const i = Math.floor(x), j = Math.floor(y), fx = sm(x - i), fy = sm(y - j)
    const a = v(i, j), b = v(i + 1, j), c = v(i, j + 1), d = v(i + 1, j + 1)
    return a + (b - a) * fx + (c - a) * fy + (a - b - c + d) * fx * fy }
  return (x, y) => { let f = 0, a = 0.5, fr = 1; for (let o = 0; o < 6; o++) { f += a * n(x * fr, y * fr); fr *= 2.03; a *= 0.5 } return f }
}

// render a moonlit volumetric cloud once into a canvas
function paint(canvas, seed, lobes) {
  const W = canvas.width, H = canvas.height, ctx = canvas.getContext('2d')
  const fbm = makeNoise(seed), img = ctx.createImageData(W, H), d = img.data
  const shape = (u, v) => { let m = 0
    for (const [cx, cy, rx, ry] of lobes) { const dx = (u - cx) / rx, dy = (v - cy) / ry; m = Math.max(m, 1 - (dx * dx + dy * dy)) }
    return m }
  const dens = (u, v) => {
    const wx = fbm(u * 3 + 11, v * 3) - 0.5, wy = fbm(u * 3, v * 3 + 7) - 0.5
    const n = fbm(u * 5 + wx * 1.2, v * 5 + wy * 1.2)
    const base = shape(u + wx * 0.08, v + wy * 0.1) - (v > 0.62 ? (v - 0.62) * 0.9 : 0)
    return Math.max(0, base * 1.25 + (n - 0.55) * 1.1)
  }
  const L = [0.035, -0.06] // moon up & right
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
    const u = x / W, v = y / H, D = dens(u, v)
    const i = (y * W + x) * 4
    if (D <= 0.001) { d[i + 3] = 0; continue }
    const towardLight = dens(u + L[0], v + L[1])
    const rim = Math.min(1, Math.max(0, D - towardLight) * 3.2 + (1 - Math.min(1, D * 2.2)) * 0.35)
    const depth = Math.min(1, D * 1.6)
    const shade = 0.30 + 0.25 * (1 - v) - 0.18 * depth * v
    let r = 52 + 70 * shade, g = 62 + 74 * shade, b = 84 + 84 * shade
    r += rim * 150; g += rim * 155; b += rim * 150
    d[i] = Math.min(255, r); d[i + 1] = Math.min(255, g); d[i + 2] = Math.min(255, b)
    d[i + 3] = 255 * Math.min(1, Math.pow(Math.min(1, D * 1.5), 1.8)) * 0.96
  }
  ctx.putImageData(img, 0, 0)
}

const clouds = [
  { cls: 'c1', href: 'https://tv.xatmarket.com', label: 'XatCast TV', icon: TV, desc: 'XatCast TV, watch live (opens in a new tab)', seed: 1337,
    lobes: [[0.30, 0.58, 0.24, 0.26], [0.50, 0.44, 0.24, 0.34], [0.70, 0.56, 0.22, 0.26], [0.50, 0.66, 0.42, 0.16], [0.16, 0.66, 0.12, 0.12], [0.86, 0.64, 0.10, 0.12]] },
  { cls: 'c2', href: 'https://maps.xatmarket.com', label: 'XatMaps', icon: MAP, desc: 'XatMaps, live world map (opens in a new tab)', seed: 4242,
    lobes: [[0.34, 0.52, 0.22, 0.30], [0.58, 0.48, 0.26, 0.30], [0.76, 0.60, 0.18, 0.20], [0.50, 0.66, 0.40, 0.15], [0.20, 0.64, 0.12, 0.12]] },
]

function Cloud({ seed, lobes }) {
  const ref = useRef(null)
  useEffect(() => { if (ref.current) paint(ref.current, seed, lobes) }, [seed, lobes])
  return <canvas ref={ref} className="cloud" width="300" height="170" aria-hidden="true" />
}

export default function SkyClouds() {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches || !window.matchMedia('(pointer: fine)').matches) return
    let raf = 0
    const move = (e) => { cancelAnimationFrame(raf); raf = requestAnimationFrame(() => {
      el.style.setProperty('--mx', ((e.clientX / innerWidth) - 0.5).toFixed(3))
      el.style.setProperty('--my', ((e.clientY / innerHeight) - 0.5).toFixed(3)) }) }
    addEventListener('pointermove', move, { passive: true })
    return () => { removeEventListener('pointermove', move); cancelAnimationFrame(raf) }
  }, [])
  const boing = (e) => { const a = e.currentTarget; a.classList.remove('boing'); void a.offsetWidth; a.classList.add('boing') }
  return (
    <nav ref={ref} className="sky-clouds" aria-label="Xat Market live projects">
      {clouds.map((c) => (
        <a key={c.cls} className={`sky-cloud ${c.cls}`} href={c.href} target="_blank" rel="noopener" aria-label={c.desc} onPointerDown={boing} onAnimationEnd={(e) => e.currentTarget.classList.remove('boing')}>
          <span className="sky-drift"><span className="sky-bob"><span className="sky-squish">
            <Cloud seed={c.seed} lobes={c.lobes} />
            <span className="cloud-label">{c.icon}{c.label}</span>
          </span></span></span>
        </a>
      ))}
    </nav>
  )
}
