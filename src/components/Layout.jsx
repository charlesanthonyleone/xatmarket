import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { CHAT } from '../img.js'
import { ventures } from '../ventures.js'
import { Arrow } from './ui.jsx'

const services = [
  { to: '/advertising', label: 'Advertising', text: 'We run the promo. You pay once.' },
  { to: '/community-setup', label: 'Community Setup', text: 'Build a chat worth coming back to.' },
  { to: '/community-revival', label: 'Community Revival', text: 'A fresh start for your Xat chat.' },
]
const ideas = [{ to: '/ideas', label: 'All active ideas', text: 'Real ventures. Built around Xat.' }, ...ventures.map((v) => ({ to: `/ideas/${v.slug}`, label: v.short }))]

function Wordmark() {
  return <Link to="/" className="font-display text-2xl font-semibold tracking-wide text-cream" aria-label="XatMarket home">Xat<span className="text-gold">Market</span></Link>
}

function Dropdown({ label, items, active }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  const t = useRef()
  useEffect(() => {
    const close = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false) }
    const esc = (e) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('click', close); document.addEventListener('keydown', esc)
    return () => { document.removeEventListener('click', close); document.removeEventListener('keydown', esc) }
  }, [])
  return (
    <div ref={ref} className="relative" onMouseEnter={() => { clearTimeout(t.current); setOpen(true) }} onMouseLeave={() => { t.current = setTimeout(() => setOpen(false), 150) }}>
      <button type="button" aria-expanded={open} aria-haspopup="true" onClick={() => setOpen((o) => !o)}
        className={`flex items-center gap-1.5 px-3 py-2 text-[15px] font-medium transition hover:text-gold ${active ? 'text-gold' : 'text-cream/85'}`}>
        {label}
        <svg viewBox="0 0 12 12" className={`size-3 transition ${open ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><path d="m3 4.5 3 3 3-3" /></svg>
      </button>
      <div className={`absolute left-1/2 top-full w-80 -translate-x-1/2 pt-3 transition ${open ? 'visible opacity-100' : 'invisible opacity-0'}`}>
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-navy/95 p-2 shadow-2xl backdrop-blur-xl">
          {items.map((i) => (
            <NavLink key={i.to} to={i.to} end onClick={() => setOpen(false)} className={({ isActive }) => `block rounded-xl px-4 py-3 transition hover:bg-white/5 ${isActive ? 'bg-white/5' : ''}`}>
              <span className="block font-display text-xl font-semibold text-cream">{i.label}</span>
              {i.text && <span className="mt-0.5 block text-sm text-mist">{i.text}</span>}
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function Layout({ children }) {
  const [scrolled, setScrolled] = useState(false)
  const [menu, setMenu] = useState(false)
  const { pathname } = useLocation()
  useEffect(() => { setMenu(false) }, [pathname])
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40)
    on(); window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])
  useEffect(() => { document.body.style.overflow = menu ? 'hidden' : '' }, [menu])
  const svcActive = services.some((s) => pathname.startsWith(s.to))
  return (
    <>
      <header className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${scrolled || menu ? 'border-b border-white/10 bg-ink/85 backdrop-blur-xl' : 'bg-gradient-to-b from-ink/70 to-transparent'}`}>
        <div className="wrap flex h-[72px] items-center justify-between gap-4">
          <Wordmark />
          <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
            <NavLink to="/" end className={({ isActive }) => `px-3 py-2 text-[15px] font-medium transition hover:text-gold ${isActive ? 'text-gold' : 'text-cream/85'}`}>Home</NavLink>
            <Dropdown label="Services" items={services} active={svcActive} />
            <NavLink to="/get-paid" className={({ isActive }) => `px-3 py-2 text-[15px] font-medium transition hover:text-gold ${isActive ? 'text-gold' : 'text-cream/85'}`}>Get Paid</NavLink>
            <Dropdown label="Ideas" items={ideas} active={pathname.startsWith('/ideas')} />
          </nav>
          <div className="flex items-center gap-3">
            <a href={CHAT} target="_blank" rel="noopener noreferrer" className="hidden items-center gap-2 rounded-full border border-gold/60 px-5 py-2 text-sm font-semibold text-cream transition hover:bg-gold hover:text-ink sm:inline-flex">Visit chat <Arrow className="size-3.5" /></a>
            <button type="button" className="grid size-11 place-items-center rounded-full border border-white/15 text-cream lg:hidden" aria-label={menu ? 'Close menu' : 'Open menu'} aria-expanded={menu} onClick={() => setMenu((m) => !m)}>
              <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">{menu ? <path d="M6 6l12 12M18 6 6 18" /> : <path d="M4 8h16M4 16h16" />}</svg>
            </button>
          </div>
        </div>
      </header>

      <div className={`fixed inset-0 z-40 overflow-y-auto bg-ink/97 px-6 pb-12 pt-24 backdrop-blur-xl transition lg:hidden ${menu ? 'visible opacity-100' : 'invisible opacity-0'}`}>
        <nav aria-label="Mobile" className="mx-auto max-w-md">
          <Link to="/" className="block border-b border-white/10 py-4 font-display text-3xl font-semibold text-cream">Home</Link>
          <p className="kicker mt-6">Services</p>
          {services.map((s) => <Link key={s.to} to={s.to} className="block border-b border-white/10 py-3 font-display text-2xl text-cream">{s.label}</Link>)}
          <Link to="/get-paid" className="mt-4 block border-b border-white/10 py-4 font-display text-3xl font-semibold text-cream">Get Paid</Link>
          <p className="kicker mt-6">Ideas</p>
          {ideas.map((s) => <Link key={s.to} to={s.to} className="block border-b border-white/10 py-3 font-display text-2xl text-cream">{s.label}</Link>)}
          <a href={CHAT} target="_blank" rel="noopener noreferrer" className="btn-gold mt-8 w-full justify-center">Visit chat <Arrow /></a>
        </nav>
      </div>

      <main>{children}</main>

      <footer className="border-t border-white/10 bg-ink">
        <div className="wrap grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Wordmark />
            <p className="mt-4 max-w-sm text-[15px] leading-7 text-mist">Market brings Xat communities together with people who can help. Need a better chat, a bigger crowd, or a fresh start? Start here.</p>
            <a href={CHAT} target="_blank" rel="noopener noreferrer" className="btn-ghost mt-6">Visit chat <Arrow /></a>
          </div>
          <div>
            <p className="kicker">Services</p>
            <ul className="mt-3 space-y-2 text-[15px]">{services.map((s) => <li key={s.to}><Link to={s.to} className="text-cream/80 hover:text-gold">{s.label}</Link></li>)}<li><Link to="/get-paid" className="text-cream/80 hover:text-gold">Get Paid</Link></li></ul>
          </div>
          <div>
            <p className="kicker">Ideas</p>
            <ul className="mt-3 space-y-2 text-[15px]">{ideas.map((s) => <li key={s.to}><Link to={s.to} className="text-cream/80 hover:text-gold">{s.label}</Link></li>)}</ul>
          </div>
        </div>
        <div className="rule-gold" />
        <div className="wrap flex flex-col gap-2 py-6 text-sm text-mist sm:flex-row sm:items-center sm:justify-between">
          <p>XatMarket <span className="mx-2 text-gold">✦</span> Made for Xat communities</p>
          <p>Market is independent of Xat.</p>
        </div>
      </footer>
    </>
  )
}
