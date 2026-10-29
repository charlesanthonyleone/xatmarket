import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { CHAT } from '../img.js'
import { ventures } from '../ventures.js'
import { ArrowUpRight } from './ui.jsx'

const services = [
  { to: '/advertising', label: 'Advertising', text: 'We run the promo. You pay once.' },
  { to: '/community-setup', label: 'Community Setup', text: 'Build a chat worth coming back to.' },
  { to: '/community-revival', label: 'Community Revival', text: 'A fresh start for your Xat chat.' },
]
const ideas = [{ to: '/ideas', label: 'All active ideas', text: 'Real ventures. Built around Xat.' }, ...ventures.map((v) => ({ to: `/ideas/${v.slug}`, label: v.short }))]

function Wordmark() {
  return <Link to="/" className="group flex items-center gap-2 font-display text-[26px] font-bold leading-none text-cream" aria-label="XatMarket home"><img src={`${import.meta.env.BASE_URL}favicon.svg`} alt="" className="size-9 transition group-hover:rotate-12 group-hover:scale-110" />Xat<span className="-ml-2 text-gold">Market</span></Link>
}
const navCls = (on) => `rounded-full px-4 py-2 text-[14.5px] font-medium transition ${on ? 'bg-white/[.08] text-cream' : 'text-cream/70 hover:text-cream'}`

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
      <button type="button" aria-expanded={open} aria-haspopup="true" onClick={() => setOpen((o) => !o)} className={`${navCls(active)} flex items-center gap-1.5`}>
        {label}
        <svg viewBox="0 0 12 12" className={`size-3 transition ${open ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><path d="m3 4.5 3 3 3-3" /></svg>
      </button>
      <div className={`absolute left-1/2 top-full w-80 -translate-x-1/2 pt-3 transition duration-200 ${open ? 'visible translate-y-0 opacity-100' : 'invisible -translate-y-1 opacity-0'}`}>
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-panel/95 p-2 shadow-2xl backdrop-blur-xl">
          {items.map((i) => (
            <NavLink key={i.to} to={i.to} end onClick={() => setOpen(false)} className={({ isActive }) => `block rounded-xl px-4 py-3 transition hover:bg-white/[.05] ${isActive ? 'bg-white/[.05]' : ''}`}>
              <span className="block text-[15px] font-semibold text-cream">{i.label}</span>
              {i.text && <span className="mt-0.5 block text-[13px] text-mist">{i.text}</span>}
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
    const on = () => setScrolled(window.scrollY > 20)
    on(); window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])
  useEffect(() => { document.body.style.overflow = menu ? 'hidden' : '' }, [menu])
  const svcActive = services.some((s) => pathname.startsWith(s.to))
  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-cream focus:px-4 focus:py-2 focus:text-ink">Skip to content</a>
      <header className={`fixed inset-x-0 top-0 z-50 transition duration-300 ${scrolled || menu ? 'border-b border-white/[.07] bg-ink/80 backdrop-blur-xl' : 'border-b border-transparent'}`}>
        <div className="wrap flex h-[72px] items-center justify-between gap-4">
          <Wordmark />
          <nav aria-label="Main" className="hidden items-center gap-1 rounded-full border border-white/[.08] bg-white/[.02] p-1 lg:flex">
            <NavLink to="/" end className={({ isActive }) => navCls(isActive)}>Home</NavLink>
            <Dropdown label="Services" items={services} active={svcActive} />
            <NavLink to="/get-paid" className={({ isActive }) => navCls(isActive)}>Get Paid</NavLink>
            <Dropdown label="Ideas" items={ideas} active={pathname.startsWith('/ideas')} />
          </nav>
          <div className="flex items-center gap-3">
            <a href={CHAT} target="_blank" rel="noopener noreferrer" className="btn-primary h-10 px-5 text-[14px] max-sm:!hidden">Visit chat <ArrowUpRight className="size-3.5" /></a>
            <button type="button" className="grid size-11 place-items-center rounded-full border border-white/15 text-cream lg:hidden" aria-label={menu ? 'Close menu' : 'Open menu'} aria-expanded={menu} onClick={() => setMenu((m) => !m)}>
              <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">{menu ? <path d="M6 6l12 12M18 6 6 18" /> : <path d="M4 9h16M4 15h16" />}</svg>
            </button>
          </div>
        </div>
      </header>

      <div className={`fixed inset-0 z-40 overflow-y-auto bg-ink px-6 pb-12 pt-24 transition lg:hidden ${menu ? 'visible opacity-100' : 'invisible opacity-0'}`}>
        <nav aria-label="Mobile" className="mx-auto max-w-md">
          <Link to="/" className="block border-b border-white/10 py-4 font-display text-4xl text-cream">Home</Link>
          <p className="eyebrow mt-8">Services</p>
          {services.map((s) => <Link key={s.to} to={s.to} className="block border-b border-white/10 py-3.5 text-xl text-cream">{s.label}</Link>)}
          <Link to="/get-paid" className="mt-4 block border-b border-white/10 py-4 font-display text-4xl text-cream">Get Paid</Link>
          <p className="eyebrow mt-8">Ideas</p>
          {ideas.map((s) => <Link key={s.to} to={s.to} className="block border-b border-white/10 py-3.5 text-xl text-cream">{s.label}</Link>)}
          <a href={CHAT} target="_blank" rel="noopener noreferrer" className="btn-gold mt-10 w-full">Visit chat <ArrowUpRight /></a>
        </nav>
      </div>

      <main id="main">{children}</main>

      <footer className="border-t border-white/[.07] bg-ink">
        <div className="wrap grid gap-12 py-16 md:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            <Wordmark />
            <p className="mt-5 max-w-sm text-[15px] leading-7 text-mist">Market brings Xat communities together with people who can help. Need a better chat, a bigger crowd, or a fresh start? Start here.</p>
            <a href={CHAT} target="_blank" rel="noopener noreferrer" className="btn-ghost mt-7">Visit chat <ArrowUpRight /></a>
          </div>
          <div>
            <p className="text-[13px] font-semibold text-cream">Services</p>
            <ul className="mt-4 space-y-2.5 text-[15px]">{services.map((s) => <li key={s.to}><Link to={s.to} className="text-mist hover:text-cream">{s.label}</Link></li>)}<li><Link to="/get-paid" className="text-mist hover:text-cream">Get Paid</Link></li></ul>
          </div>
          <div>
            <p className="text-[13px] font-semibold text-cream">Ideas</p>
            <ul className="mt-4 space-y-2.5 text-[15px]">{ideas.map((s) => <li key={s.to}><Link to={s.to} className="text-mist hover:text-cream">{s.label}</Link></li>)}</ul>
          </div>
        </div>
        <div className="border-t border-white/[.07]">
          <div className="wrap flex flex-col gap-2 py-6 text-sm text-mist sm:flex-row sm:items-center sm:justify-between">
            <p>XatMarket <span className="mx-2 text-gold">✦</span> Made for Xat communities</p>
            <p>Market is independent of Xat.</p>
          </div>
        </div>
      </footer>
    </>
  )
}
