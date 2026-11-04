import { useEffect, useRef } from 'react'

const TV = <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="7" width="18" height="13" rx="2.5"/><path d="M8 2.5 12 7l4-4.5"/></svg>
const MAP = <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M9 4 3 6.5v13.5L9 17.5l6 2.5 6-2.5V4l-6 2.5z"/><path d="M9 4v13.5M15 6.5V20"/></svg>

function Cloud({ id }) {
  return (
    <svg className="cloud" viewBox="0 0 200 110" aria-hidden="true">
      <defs>
        <linearGradient id={`cg-${id}`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#ffffff"/><stop offset=".6" stopColor="#F6EFE0"/><stop offset="1" stopColor="#E9D7B4"/></linearGradient>
        <linearGradient id={`cs-${id}`} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#7FE6DA" stopOpacity=".55"/><stop offset="1" stopColor="#9FB8D8" stopOpacity=".35"/></linearGradient>
      </defs>
      <g fill={`url(#cs-${id})`} transform="translate(4 8)"><circle cx="52" cy="62" r="30"/><circle cx="96" cy="46" r="38"/><circle cx="142" cy="60" r="30"/><rect x="26" y="60" width="148" height="34" rx="17"/></g>
      <g fill={`url(#cg-${id})`}><circle cx="50" cy="60" r="30"/><circle cx="94" cy="44" r="38"/><circle cx="140" cy="58" r="30"/><circle cx="118" cy="40" r="22"/><rect x="22" y="58" width="150" height="34" rx="17"/></g>
      <g fill="#fff" opacity=".85"><ellipse cx="82" cy="24" rx="16" ry="6"/><ellipse cx="44" cy="44" rx="9" ry="4"/></g>
    </svg>
  )
}

const clouds = [
  { cls: 'c1', href: 'https://tv.xatmarket.com', label: 'XatCast TV', icon: TV, desc: 'XatCast TV, watch live (opens in a new tab)' },
  { cls: 'c2', href: 'https://maps.xatmarket.com', label: 'XatMaps', icon: MAP, desc: 'XatMaps, live world map (opens in a new tab)' },
]

export default function SkyClouds() {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches || !window.matchMedia('(pointer: fine)').matches) return
    let raf = 0
    const move = (e) => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        el.style.setProperty('--mx', ((e.clientX / innerWidth) - 0.5).toFixed(3))
        el.style.setProperty('--my', ((e.clientY / innerHeight) - 0.5).toFixed(3))
      })
    }
    addEventListener('pointermove', move, { passive: true })
    return () => { removeEventListener('pointermove', move); cancelAnimationFrame(raf) }
  }, [])
  const boing = (e) => { const a = e.currentTarget; a.classList.remove('boing'); void a.offsetWidth; a.classList.add('boing') }
  return (
    <nav ref={ref} className="sky-clouds" aria-label="Xat Market live projects">
      {clouds.map((c) => (
        <a key={c.cls} className={`sky-cloud ${c.cls}`} href={c.href} target="_blank" rel="noopener" aria-label={c.desc} onPointerDown={boing} onAnimationEnd={(e) => e.currentTarget.classList.remove('boing')}>
          <span className="sky-drift"><span className="sky-bob"><span className="sky-squish">
            <Cloud id={c.cls} />
            <span className="cloud-label">{c.icon}{c.label}</span>
            <i className="sky-spark s1" /><i className="sky-spark s2" /><i className="sky-spark s3" />
          </span></span></span>
        </a>
      ))}
    </nav>
  )
}
