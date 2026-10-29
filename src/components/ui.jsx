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

export function Section({ id, tone = 'a', className = '', children }) {
  return <section id={id} className={`section tone-${tone} scroll-mt-16 ${className}`}><div className="wrap">{children}</div></section>
}
export function SectionHead({ kicker, title, children, center }) {
  return (
    <Reveal className={center ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'}>
      {kicker && <p className="eyebrow">{kicker}</p>}
      <h2 className="h2 mt-4">{title}</h2>
      {children && <div className="lede mt-6">{children}</div>}
    </Reveal>
  )
}
export function Warn({ strong, children }) {
  return (
    <div role="alert" className="warn">
      <svg viewBox="0 0 24 24" className="mt-1 size-5 shrink-0 text-warn" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M12 3 2 21h20L12 3Z" /><path d="M12 10v5M12 18h.01" /></svg>
      <p>{strong && <strong className="text-warn">{strong}</strong>}{children}</p>
    </div>
  )
}
export function PageHero({ kicker, title, accent, children, visual }) {
  return (
    <section className="relative isolate overflow-hidden pb-20 pt-32 sm:pb-28 sm:pt-40">
      <div className="hairline-grid absolute inset-0 -z-10" aria-hidden="true" />
      <div className="wrap grid items-center gap-14 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
        <div className="min-w-0 rise">
          {kicker && <p className="eyebrow">{kicker}</p>}
          <h1 className="h-display mt-5 text-[46px] sm:text-7xl lg:text-[80px]">{title}{accent && <><br /><em className="text-goldsoft">{accent}</em></>}</h1>
          <div className="mt-8 max-w-xl">{children}</div>
        </div>
        {visual && <div className="min-w-0 rise" style={{ animationDelay: '.15s' }}>{visual}</div>}
      </div>
    </section>
  )
}
export function Invite({ kicker, title, text, cta, note }) {
  return (
    <section className="relative isolate overflow-hidden border-t border-white/[.07] bg-ink2 py-28 sm:py-40">
      <div className="hairline-grid absolute inset-0 -z-10" aria-hidden="true" />
      <Reveal className="wrap text-center">
        {kicker && <p className="eyebrow">{kicker}</p>}
        <h2 className="h-display mx-auto mt-5 max-w-4xl text-[46px] sm:text-7xl">{title}</h2>
        <p className="lede mx-auto mt-7 max-w-2xl">{text}</p>
        <div className="mt-10 flex justify-center"><StaffLink>{cta}</StaffLink></div>
        {note && <p className="mt-5 text-sm text-mist">{note}</p>}
      </Reveal>
    </section>
  )
}
export function Bullets({ items }) {
  return <ul>{items.map((t) => <li key={t} className="flex gap-4 border-b border-white/[.08] py-4 text-[15.5px] leading-7 text-cream/85"><span className="mt-[13px] h-px w-4 shrink-0 bg-gold" aria-hidden="true" />{t}</li>)}</ul>
}
export function Steps({ items, cols = 3 }) {
  const grid = { 2: 'md:grid-cols-2', 3: 'md:grid-cols-3', 5: 'sm:grid-cols-2 lg:grid-cols-5' }[cols]
  return (
    <ol className={`grid gap-x-10 gap-y-12 ${grid}`}>
      {items.map((s, i) => {
        const t = typeof s === 'string' ? null : s.title || s.name, txt = typeof s === 'string' ? s : s.text
        return (
          <Reveal as="li" key={t || txt} delay={(i % cols) * 80} className="border-t border-white/15 pt-7">
            <span className="font-display text-5xl text-gold">{String(i + 1).padStart(2, '0')}</span>
            {t && <h3 className="h3 mt-5">{t}</h3>}
            <p className={`${t ? 'mt-3' : 'mt-5'} copy`}>{txt}</p>
          </Reveal>
        )
      })}
    </ol>
  )
}
export { Link }
