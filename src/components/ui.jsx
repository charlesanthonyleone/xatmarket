import { CHAT, img } from '../img.js'
import { Link } from 'react-router-dom'

export const Arrow = ({ className = 'size-4' }) => (
  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" className={className} aria-hidden="true"><path d="M6 14 14 6M7 6h7v7" /></svg>
)
export function StaffLink({ children, ghost }) {
  return <a href={CHAT} target="_blank" rel="noopener noreferrer" className={ghost ? 'btn-ghost' : 'btn-gold'}>{children}<Arrow /></a>
}
export function Warn({ strong, children }) {
  return (
    <div role="alert" className="warn">
      <svg viewBox="0 0 24 24" className="mt-1 size-5 shrink-0 text-warn" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M12 3 2 21h20L12 3Z" /><path d="M12 10v5M12 18h.01" /></svg>
      <p>{strong && <strong className="text-warn">{strong}</strong>}{children}</p>
    </div>
  )
}
export function PageHero({ image, kicker, title, accent, children, tall }) {
  return (
    <section className={`relative isolate flex items-end overflow-hidden ${tall ? 'min-h-[92vh]' : 'min-h-[78vh]'} pt-28`}>
      <img src={img(image)} alt="" className="absolute inset-0 -z-20 h-full w-full object-cover" />
      <div className="absolute inset-0 -z-10" style={{ background: 'linear-gradient(90deg, rgba(6,11,24,.92) 0%, rgba(6,11,24,.6) 45%, rgba(6,11,24,.15) 100%), linear-gradient(180deg, rgba(6,11,24,.35) 0%, rgba(6,11,24,0) 35%, rgba(6,11,24,.4) 75%, #060b18 100%)' }} />
      <div className="wrap pb-16 sm:pb-24">
        <div className="max-w-2xl">
          {kicker && <p className="kicker">{kicker}</p>}
          <h1 className="mt-3 font-display text-5xl font-semibold leading-[.95] text-cream sm:text-7xl lg:text-[5.5rem]">{title}{accent && <><br /><em className="font-medium text-gold">{accent}</em></>}</h1>
          <div className="mt-7 max-w-xl">{children}</div>
        </div>
      </div>
    </section>
  )
}
export function SectionHead({ kicker, title, children, center }) {
  return (
    <div className={center ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'}>
      {kicker && <p className="kicker">{kicker}</p>}
      <h2 className="h-section mt-2">{title}</h2>
      {children && <div className="body mt-5">{children}</div>}
    </div>
  )
}
export function Invite({ image = 'hero', kicker, title, text, cta, note }) {
  return (
    <section className="relative isolate overflow-hidden py-28 sm:py-36">
      <img src={img(image)} alt="" className="absolute inset-0 -z-20 h-full w-full object-cover opacity-60" />
      <div className="absolute inset-0 -z-10" style={{ background: 'radial-gradient(70% 90% at 50% 50%, rgba(6,11,24,.55) 0%, rgba(6,11,24,.92) 70%, #060b18 100%)' }} />
      <div className="wrap text-center">
        {kicker && <p className="kicker">{kicker}</p>}
        <h2 className="mx-auto mt-3 max-w-3xl font-display text-5xl font-semibold leading-[.98] text-cream sm:text-6xl">{title}</h2>
        <p className="body mx-auto mt-6 max-w-xl">{text}</p>
        <div className="mt-9 flex justify-center"><StaffLink>{cta}</StaffLink></div>
        {note && <p className="mt-4 text-sm text-mist">{note}</p>}
      </div>
    </section>
  )
}
export function Bullets({ items }) {
  return <ul className="space-y-4">{items.map((t) => <li key={t} className="flex gap-4 border-b border-white/10 pb-4 text-[15px] leading-7 text-cream/85"><span className="mt-[11px] size-1.5 shrink-0 rotate-45 bg-gold" aria-hidden="true" />{t}</li>)}</ul>
}
export function Steps({ items }) {
  return (
    <ol className="grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 md:grid-cols-3">
      {items.map((s, i) => (
        <li key={s.title || s.name} className="bg-navy p-7 sm:p-9">
          <span className="font-display text-5xl italic text-gold/80">{i + 1}</span>
          <h3 className="h-card mt-4">{s.title || s.name}</h3>
          <p className="mt-3 text-[15px] leading-7 text-cream/75">{s.text}</p>
        </li>
      ))}
    </ol>
  )
}
export { Link }
