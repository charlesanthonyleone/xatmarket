import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { CHAT, IC, SM } from '../img.js'

export const ArrowUpRight = ({ className = 'size-4' }) => (
  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" className={className} aria-hidden="true"><path d="M6 14 14 6M7 6h7v7" /></svg>
)
export const ArrowRight = ({ className = 'size-4' }) => (
  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.4" className={className} aria-hidden="true"><path d="M3.5 10h13M11 4.5 16.5 10 11 15.5" /></svg>
)
export const Arrow = ArrowRight

export function StaffLink({ children, ghost, className = '' }) {
  return <a href={CHAT} target="_blank" rel="noopener noreferrer" className={`${ghost ? 'btn-ghost' : 'btn-gold'} ${className}`}>{!ghost && <img src={IC('navbar_register')} alt="" className="size-5" />}{children}<ArrowUpRight /></a>
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
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setOn(true); io.disconnect() } }, { threshold: 0.05, rootMargin: '0px 0px -30px 0px' })
    io.observe(el); return () => io.disconnect()
  }, [])
  return <Tag ref={ref} className={`reveal ${on ? 'in' : ''} ${className}`} style={{ transitionDelay: `${delay}ms` }} {...rest}>{children}</Tag>
}
export function Tilt({ className = '', children }) { return <div className={className}>{children}</div> }

export function Sm({ n, size = 30, className = '' }) { return <img src={SM(n)} alt={`(${n})`} width={size} height={size} className={`inline-block ${className}`} loading="lazy" /> }

// Market group background: night sky, stars, cyan ringed xat planet, dark mountains
export function Space({ planet = true, mountains = true }) {
  return (
    <div className="space" aria-hidden="true">
      <div className="stars" /><div className="stars2" />
      {planet && <img src={IC('xatplanet')} alt="" className="planet right-[-60px] top-[90px] w-[300px] opacity-90 sm:right-[4%] sm:top-[110px] sm:w-[380px] lg:w-[440px]" />}
      {mountains && <div className="mtn" />}
    </div>
  )
}

export function Section({ id, tone = 'a', className = '', children }) {
  const dark = tone === 'c'
  return <section id={id} className={`section tone-${tone} isolate scroll-mt-16 ${className}`}>{dark && <Space planet={false} />}<div className="wrap relative">{children}</div></section>
}
export function SectionHead({ kicker, title, children, center }) {
  return (
    <Reveal className={center ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'}>
      {kicker && <p className="eyebrow">{kicker}</p>}
      <h2 className="h2 mt-3">{title}</h2>
      {children && <div className="lede mt-5">{children}</div>}
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
export function PageHero({ kicker, title, accent, children, visual }) {
  return (
    <section className="tone-c relative isolate overflow-hidden pb-24 pt-28 sm:pb-36 sm:pt-36">
      <Space planet={!visual} />
      <div className={`wrap grid items-center gap-10 ${visual ? 'lg:grid-cols-[1.05fr_1fr] lg:gap-14' : ''}`}>
        <div className="min-w-0 rise">
          {kicker && <p className="eyebrow">{kicker}</p>}
          <h1 className="h-display mt-4 text-[44px] sm:text-6xl lg:text-[72px]">{title}{accent && <><br /><span className="text-[#7fd6ff]">{accent}</span></>}</h1>
          <div className="mt-7 max-w-xl">{children}</div>
        </div>
        {visual && <div className="min-w-0 rise">{visual}</div>}
      </div>
    </section>
  )
}
export function Invite({ kicker, title, text, cta, note }) {
  return (
    <section className="tone-c relative isolate overflow-hidden pb-40 pt-20 sm:pb-56 sm:pt-28">
      <Space />
      <Reveal className="wrap relative text-center">
        {kicker && <p className="eyebrow">{kicker}</p>}
        <h2 className="h-display mx-auto mt-4 max-w-4xl text-[40px] sm:text-6xl">{title}</h2>
        <p className="lede mx-auto mt-6 max-w-2xl">{text}</p>
        <div className="mt-9 flex justify-center"><StaffLink>{cta}</StaffLink></div>
        {note && <p className="mt-4 text-sm text-white/75">{note}</p>}
      </Reveal>
    </section>
  )
}
const bulletSm = ['smile', 'd', 'nerd', 'party', 'music', 'angel', 'love', 'coffee', 'dance']
export function Bullets({ items }) {
  return <ul className="grid gap-2">{items.map((t, i) => <li key={t} className="flex items-start gap-3 rounded border border-xline bg-white px-4 py-3 text-[16px] leading-7 text-[#212529]"><Sm n={bulletSm[i % bulletSm.length]} size={26} className="mt-0.5 shrink-0" />{t}</li>)}</ul>
}
export function Steps({ items, cols = 3 }) {
  const grid = { 2: 'md:grid-cols-2', 3: 'md:grid-cols-3', 5: 'sm:grid-cols-2 lg:grid-cols-5' }[cols]
  return (
    <ol className={`grid gap-5 ${grid}`}>
      {items.map((s, i) => {
        const t = typeof s === 'string' ? null : s.title || s.name, txt = typeof s === 'string' ? s : s.text
        return (
          <Reveal as="li" key={t || txt} delay={(i % cols) * 70} className="h-full">
            <div className="pcard h-full">
              <span className="grid size-11 place-items-center rounded-full font-btn text-lg font-bold text-white" style={{ background: 'linear-gradient(#000099,#000050)' }}>{i + 1}</span>
              {t && <h3 className="mt-4 font-display text-[21px] font-bold text-[#212529]">{t}</h3>}
              <p className={`${t ? 'mt-2' : 'mt-4'} text-[15.5px] leading-7 text-[#495057]`}>{txt}</p>
            </div>
          </Reveal>
        )
      })}
    </ol>
  )
}
export { Link }
