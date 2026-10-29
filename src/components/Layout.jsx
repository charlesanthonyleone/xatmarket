import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { CHAT } from '../img.js'
import { Ico, Mark } from './Icons.jsx'
import { ventures } from '../ventures.js'
import { ArrowUpRight } from './ui.jsx'
import IslandGL from './IslandGL.jsx'

const services = [
  { to: '/advertising', label: 'Advertising', text: 'We run the promo. You pay once.' },
  { to: '/community-setup', label: 'Community Setup', text: 'Build a chat worth coming back to.' },
  { to: '/community-revival', label: 'Community Revival', text: 'A fresh start for your Xat chat.' },
]
const ideas = [{ to: '/ideas', label: 'All active ideas', text: 'Real ventures. Built around Xat.' }, ...ventures.map((v) => ({ to: `/ideas/${v.slug}`, label: v.short }))]

function Wordmark() {
  return <Link to="/" className="wordmark group" aria-label="XatMarket home"><svg viewBox="0 0 40 40" className="wm-isle" aria-hidden="true"><circle cx="27" cy="11" r="4.2" fill="#f2e6cc" /><path d="M4 31c6-3.2 26-3.2 32 0" stroke="#8fe3d8" strokeWidth="1.6" fill="none" strokeLinecap="round" /><path d="M8 35c5-2 19-2 24 0" stroke="#8fe3d8" strokeOpacity=".5" strokeWidth="1.3" fill="none" strokeLinecap="round" /><path d="M16 30c1-6 1.5-11 4-15" stroke="#e8d6b2" strokeWidth="1.6" fill="none" strokeLinecap="round" /><path d="M20 15c-3-2-7-2-10 1M20 15c-1-3-4-5-8-5M20 15c2-3 6-3 9-1M20 15c3 0 6 2 7 5M20 15c-2 1-4 4-4 7" stroke="#e8d6b2" strokeWidth="1.5" fill="none" strokeLinecap="round" /></svg><span className="wm-text">Xat<em>Market</em></span></Link>
}
const navCls = (on) => `flex items-center gap-1.5 rounded-xl px-3 py-2 font-display text-[15.5px] font-semibold text-white/90 transition ${on ? 'bg-white/15' : 'hover:bg-white/10'}`

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
        <Ico n={label === 'Ideas' ? 'bulb' : 'grid'} className="size-[18px] text-mint" />{label}
        <svg viewBox="0 0 12 12" className={`size-3 transition ${open ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><path d="m3 4.5 3 3 3-3" /></svg>
      </button>
      <div className={`absolute left-1/2 top-full w-80 -translate-x-1/2 pt-3 transition duration-200 ${open ? 'visible translate-y-0 opacity-100' : 'invisible -translate-y-1 opacity-0'}`}>
        <div className="overflow-hidden rounded-3xl border border-white/10 bg-[#0b1d2a]/95 p-2 backdrop-blur-md shadow-2xl">
          {items.map((i) => (
            <NavLink key={i.to} to={i.to} end onClick={() => setOpen(false)} className={({ isActive }) => `block rounded-2xl px-4 py-2.5 transition hover:bg-white/[.07] ${isActive ? 'bg-white/[.07]' : ''}`}>
              <span className="block font-display text-[15.5px] font-bold text-white">{i.label}</span>
              {i.text && <span className="mt-0.5 block text-[13px] text-white/60">{i.text}</span>}
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
      <header className={`fixed inset-x-0 top-0 z-50 transition duration-300 ${scrolled || menu ? 'bg-[#06121c]/80 shadow-lg backdrop-blur-md border-b border-white/10' : 'bg-transparent'}`}>
        <div className="flex h-[68px] px-3 sm:px-5 items-center justify-between gap-4">
          <Wordmark />
          <nav aria-label="Main" className="ml-auto hidden items-center gap-1 lg:flex">
            <NavLink to="/" end className={({ isActive }) => navCls(isActive)}><Ico n="home" className="size-[18px] text-mint" />Home</NavLink>
            <Dropdown label="Services" items={services} active={svcActive} />
            <NavLink to="/get-paid" className={({ isActive }) => navCls(isActive)}><Ico n="coins" className="size-[18px] text-mint" />Get Paid</NavLink>
            <Dropdown label="Ideas" items={ideas} active={pathname.startsWith('/ideas')} />
          </nav>
          <div className="flex items-center gap-3">
            <a href={CHAT} target="_blank" rel="noopener noreferrer" className="btn-gold !h-10 !rounded-xl !px-4 !text-[14.5px] max-sm:!hidden"><Ico n="chat" className="size-4" />Visit chat <ArrowUpRight className="size-3.5" /></a>
            <button type="button" className="grid size-10 place-items-center rounded-xl border border-white/30 text-white lg:hidden" aria-label={menu ? 'Close menu' : 'Open menu'} aria-expanded={menu} onClick={() => setMenu((m) => !m)}>
              <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">{menu ? <path d="M6 6l12 12M18 6 6 18" /> : <path d="M4 9h16M4 15h16" />}</svg>
            </button>
          </div>
        </div>
      </header>

      <div className={`fixed inset-0 z-40 overflow-y-auto bg-[#07141f] px-6 pb-12 pt-20 text-white transition lg:hidden ${menu ? 'visible opacity-100' : 'invisible opacity-0'}`}>
        <nav aria-label="Mobile" className="mx-auto max-w-md">
          <Link to="/" className="block border-b border-white/10 py-4 font-display text-3xl font-extrabold text-white">Home</Link>
          <p className="mt-8 font-mono text-xs uppercase tracking-widest text-mint">Services</p>
          {services.map((s) => <Link key={s.to} to={s.to} className="block border-b border-white/10 py-3.5 text-xl text-white">{s.label}</Link>)}
          <Link to="/get-paid" className="mt-4 block border-b border-white/10 py-4 font-display text-3xl font-extrabold text-white">Get Paid</Link>
          <p className="mt-8 font-mono text-xs uppercase tracking-widest text-mint">Ideas</p>
          {ideas.map((s) => <Link key={s.to} to={s.to} className="block border-b border-white/10 py-3.5 text-xl text-white">{s.label}</Link>)}
          <a href={CHAT} target="_blank" rel="noopener noreferrer" className="btn-gold mt-10 w-full">Visit chat <ArrowUpRight /></a>
        </nav>
      </div>

      <div className="site-backdrop" aria-hidden="true"><IslandGL variant="bg" /></div>
      <main id="main">{children}</main>

      <footer className="tone-c relative isolate overflow-hidden border-t border-white/10 text-white">
        <div className="wrap grid gap-12 py-16 md:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            <Wordmark />
            <p className="mt-5 max-w-sm text-[15px] leading-7 text-white/70">Market brings Xat communities together with people who can help. Need a better chat, a bigger crowd, or a fresh start? Start here.</p>
            <a href={CHAT} target="_blank" rel="noopener noreferrer" className="btn-ghost mt-7">Visit chat <ArrowUpRight /></a>
          </div>
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-mint">Services</p>
            <ul className="mt-4 space-y-2.5 text-[15px]">{services.map((s) => <li key={s.to}><Link to={s.to} className="text-white/80 hover:text-sun">{s.label}</Link></li>)}<li><Link to="/get-paid" className="text-white/80 hover:text-sun">Get Paid</Link></li></ul>
          </div>
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-mint">Ideas</p>
            <ul className="mt-4 space-y-2.5 text-[15px]">{ideas.map((s) => <li key={s.to}><Link to={s.to} className="text-white/80 hover:text-sun">{s.label}</Link></li>)}</ul>
          </div>
        </div>
        <div className="border-t border-white/10 bg-black/20">
          <div className="wrap flex flex-col gap-3 py-7 text-sm text-white/65 sm:flex-row sm:items-center sm:justify-between">
            <p className="flex items-center gap-2">XatMarket · Made for Xat communities</p>
            <p>Market is independent of Xat.</p>
          </div>
          <p className="wrap pb-8 text-[13px] leading-6 text-white/55">XatMarket is an independent community service and is not affiliated with, endorsed by, or sponsored by xat. “xat” and the smileys shown belong to their owners.</p>
        </div>
      </footer>
    </>
  )
}
