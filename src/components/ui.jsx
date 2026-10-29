import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { CHAT } from '../img.js'

export const ArrowUpRight = ({ className = 'size-4' }) => (
  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" className={className} aria-hidden="true"><path d="M6 14 14 6M7 6h7v7" /></svg>
)
export const ArrowRight = ({ className = 'size-4' }) => (
  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" className={className} aria-hidden="true"><path d="M3.5 10h13M11 4.5 16.5 10 11 15.5" /></svg>
)
export const Arrow = ArrowRight

export function StaffLink({ children, ghost, className = '' }) {
  return <a href={CHAT} target="_blank" rel="noopener noreferrer" className={`${ghost ? 'btn-ghost' : 'btn-gold'} ${className}`}>{children}<ArrowUpRight /></a>
}
export function GoLink({ to, children, className = 'link' }) {
  return <Link to={to} className={`group ${className}`}>{children}<ArrowRight className="size-4 transition group-hover:translate-x-1" /></Link>
}

export function Reveal({ as: Tag = 'div', delay = 0, className = '', children, ...rest }) {
  const ref = useRef(null)
  const [on, setOn] = useState(false)
  useEffect(() => {
    const el = ref.current; if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setOn(true); return }
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setOn(true); io.disconnect() } }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' })
    io.observe(el); return () => io.disconnect()
  }, [])
  return <Tag ref={ref} className={`reveal ${on ? 'in' : ''} ${className}`} style={{ transitionDelay: `${delay}ms` }} {...rest}>{children}</Tag>
}

export function Tilt({ className = '', max = 8, children }) {
  const ref = useRef(null)
  const move = (e) => {
    const el = ref.current; if (!el || window.matchMedia('(hover: none)').matches) return
    const r = el.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5
    el.style.transform = `perspective(900px) rotateX(${-y * max}deg) rotateY(${x * max}deg) scale(1.02)`
  }
  const leave = () => { if (ref.current) ref.current.style.transform = '' }
  return <div ref={ref} onMouseMove={move} onMouseLeave={leave} className={`tilt ${className}`}>{children}</div>
}

// Hand-drawn playful shapes (original art; not xat artwork)
export function Smiley({ size = 64, color = '#F9C931', mood = 'grin', className = '', style }) {
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} className={className} style={style} aria-hidden="true">
      <circle cx="32" cy="32" r="29" fill={color} stroke="#000044" strokeWidth="3.5" />
      {mood === 'wink'
        ? <><path d="M19 26q4-4 8 0" stroke="#000044" strokeWidth="3.5" fill="none" strokeLinecap="round" /><circle cx="42" cy="25" r="3.6" fill="#000044" /></>
        : <><circle cx="23" cy="25" r="3.6" fill="#000044" /><circle cx="41" cy="25" r="3.6" fill="#000044" /></>}
      {mood === 'wow'
        ? <ellipse cx="32" cy="43" rx="6" ry="7" fill="#000044" />
        : <path d="M18 37q14 14 28 0" stroke="#000044" strokeWidth="3.8" fill="none" strokeLinecap="round" />}
    </svg>
  )
}
export function Bubble({ text, color = '#ffffff', fg = '#000044', className = '', style }) {
  return <div className={`pointer-events-none select-none rounded-[22px] rounded-bl-md border-[3px] border-ink px-4 py-2 font-display text-[15px] font-semibold shadow-[0_5px_0_#000044] ${className}`} style={{ background: color, color: fg, ...style }} aria-hidden="true">{text}</div>
}
const floaters = [
  { k: 's', c: '#F9C931', m: 'grin', x: '3%', y: '26%', s: 70, d: '5s' },
  { k: 'b', t: 'hiii! 👋', c: '#02A9D2', f: '#fff', x: '80%', y: '20%', d: '6s' },
  { k: 's', c: '#00B168', m: 'wink', x: '88%', y: '62%', s: 54, d: '4.6s' },
  { k: 'b', t: 'lol', c: '#FF3636', f: '#fff', x: '4%', y: '72%', d: '5.4s' },
  { k: 's', c: '#A717C9', m: 'wow', x: '46%', y: '86%', s: 44, d: '6.4s' },
  { k: 'b', t: 'gg 🎉', c: '#F9C931', x: '58%', y: '16%', d: '5.8s' },
]
export function Floaters({ items = floaters, className = '' }) {
  return (
    <div className={`pointer-events-none absolute inset-0 -z-10 ${className}`} aria-hidden="true">
      {items.map((f, i) => (
        <div key={i} className="floaty absolute" style={{ left: f.x, top: f.y, '--d': f.d, '--dl': `${i * .4}s`, '--r': `${i % 2 ? 6 : -6}deg` }}>
          {f.k === 's' ? <Smiley size={f.s} color={f.c} mood={f.m} /> : <Bubble text={f.t} color={f.c} fg={f.f} />}
        </div>
      ))}
    </div>
  )
}
export function Bouncy({ text, className = '', delay = 0 }) {
  return <span className={className} aria-label={text}>{text.split(' ').map((w, wi, arr) => <span key={wi} className="inline-block whitespace-nowrap" aria-hidden="true">{[...w].map((ch, i) => <span key={i} className="letter" style={{ animationDelay: `${delay + (wi * 5 + i) * 35}ms` }}>{ch}</span>)}{wi < arr.length - 1 && '\u00a0'}</span>)}</span>
}

export function Section({ id, tone = 'a', className = '', children }) {
  return <section id={id} className={`section tone-${tone} scroll-mt-16 ${className}`}><div className="dots pointer-events-none absolute inset-0 opacity-40" aria-hidden="true" /><div className="wrap relative">{children}</div></section>
}
export function SectionHead({ kicker, title, children, center }) {
  return (
    <Reveal className={center ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'}>
      {kicker && <p className="eyebrow">{kicker}</p>}
      <h2 className="h2 mt-5">{title}</h2>
      {children && <div className="lede mt-6">{children}</div>}
    </Reveal>
  )
}
export function Warn({ strong, children }) {
  return (
    <div role="alert" className="warn">
      <svg viewBox="0 0 24 24" className="mt-1 size-6 shrink-0 text-warn" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden="true"><path d="M12 3 2 21h20L12 3Z" /><path d="M12 10v5M12 18h.01" /></svg>
      <p>{strong && <strong className="text-warn">{strong}</strong>}{children}</p>
    </div>
  )
}
const heroFloat = [
  { k: 's', c: '#F9C931', m: 'grin', x: '2%', y: '24%', s: 56, d: '5s' },
  { k: 'b', t: 'brb 🍕', c: '#02A9D2', f: '#fff', x: '86%', y: '22%', d: '6s' },
  { k: 's', c: '#00B168', m: 'wink', x: '92%', y: '78%', s: 46, d: '4.6s' },
  { k: 's', c: '#FF3636', m: 'wow', x: '44%', y: '90%', s: 38, d: '6.4s' },
]
export function PageHero({ kicker, title, accent, children, visual }) {
  return (
    <section className="tone-b relative isolate overflow-hidden pb-16 pt-28 sm:pb-24 sm:pt-40">
      <div className="dots absolute inset-0 -z-10 opacity-50" aria-hidden="true" />
      <Floaters items={heroFloat} className="hidden opacity-90 sm:block" />
      <div className="wrap grid items-center gap-10 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
        <div className="min-w-0 rise">
          {kicker && <p className="eyebrow">{kicker}</p>}
          <h1 className="h-display mt-5 text-[46px] sm:text-7xl lg:text-[80px]"><Bouncy text={title} />{accent && <><br /><span className="rainbow">{accent}</span></>}</h1>
          <div className="mt-7 max-w-xl">{children}</div>
        </div>
        {visual && <Tilt className="min-w-0 rise" max={6}>{visual}</Tilt>}
      </div>
    </section>
  )
}
export function Invite({ kicker, title, text, cta, note }) {
  return (
    <section className="tone-c relative isolate overflow-hidden py-20 sm:py-32">
      <div className="dots absolute inset-0 -z-10 opacity-60" aria-hidden="true" />
      <Floaters className="hidden sm:block" />
      <Reveal className="wrap text-center">
        {kicker && <p className="eyebrow">{kicker}</p>}
        <h2 className="h-display mx-auto mt-5 max-w-4xl text-[42px] sm:text-7xl">{title}</h2>
        <p className="lede mx-auto mt-7 max-w-2xl !text-white">{text}</p>
        <div className="mt-10 flex justify-center"><StaffLink>{cta}</StaffLink></div>
        {note && <p className="mt-5 text-sm font-semibold text-white/85">{note}</p>}
      </Reveal>
    </section>
  )
}
const dotHues = ['#F9C931', '#02A9D2', '#00B168', '#FF3636', '#A717C9', '#1E90FF']
export function Bullets({ items }) {
  return <ul className="grid gap-3">{items.map((t, i) => <li key={t} className="flex gap-4 rounded-2xl bg-white/10 px-5 py-4 text-[16px] font-semibold leading-7 text-cream transition hover:translate-x-1 hover:bg-white/15"><span className="mt-1.5 size-4 shrink-0 rounded-full border-2 border-ink" style={{ background: dotHues[i % 6] }} aria-hidden="true" />{t}</li>)}</ul>
}
export function Steps({ items, cols = 3 }) {
  const grid = { 2: 'md:grid-cols-2', 3: 'md:grid-cols-3', 5: 'sm:grid-cols-2 lg:grid-cols-5' }[cols]
  return (
    <ol className={`grid gap-6 ${grid}`}>
      {items.map((s, i) => {
        const t = typeof s === 'string' ? null : s.title || s.name, txt = typeof s === 'string' ? s : s.text
        return (
          <Reveal as="li" key={t || txt} delay={(i % cols) * 90} className="h-full">
            <Tilt className="h-full rounded-[26px] border-[3px] border-ink bg-white p-5 text-ink shadow-[0_8px_0_#000044] sm:p-7">
              <span className="grid size-12 sm:size-14 place-items-center rounded-full border-[3px] border-ink font-display text-2xl font-bold text-ink" style={{ background: dotHues[i % 6] }}>{i + 1}</span>
              {t && <h3 className="mt-5 font-display text-[22px] font-semibold text-ink sm:text-[24px]">{t}</h3>}
              <p className={`${t ? 'mt-2' : 'mt-4'} text-[16px] font-semibold leading-7 text-ink/75`}>{txt}</p>
            </Tilt>
          </Reveal>
        )
      })}
    </ol>
  )
}
export { Link }
