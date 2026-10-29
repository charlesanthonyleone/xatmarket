import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { CHAT, IC } from '../img.js'
import { ventures } from '../ventures.js'
import { ArrowUpRight } from './ui.jsx'

const services = [
  { to: '/advertising', label: 'Advertising', text: 'We run the promo. You pay once.' },
  { to: '/community-setup', label: 'Community Setup', text: 'Build a chat worth coming back to.' },
  { to: '/community-revival', label: 'Community Revival', text: 'A fresh start for your Xat chat.' },
]
const ideas = [{ to: '/ideas', label: 'All active ideas', text: 'Real ventures. Built around Xat.' }, ...ventures.map((v) => ({ to: `/ideas/${v.slug}`, label: v.short }))]

function Wordmark() {
  return <Link to="/" className="group flex items-center gap-2 leading-none text-white" aria-label="XatMarket home"><img src={IC('xatplanet')} alt="" className="h-[22px] w-[44px] transition group-hover:-rotate-6" /><span className="font-btn text-[26px] font-bold lowercase tracking-tight">xat</span><span className="ml-1 font-display text-[22px] font-semibold">Market</span></Link>
}
const navCls = (on) => `flex items-center gap-1.5 rounded px-3 py-2 text-[15px] lowercase text-white transition ${on ? 'bg-white/15' : 'hover:bg-white/10'}`

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
        <img src={IC(label === 'Ideas' ? 'navbar_powers' : 'navbar_apps')} alt="" className="size-[18px]" />{label}
        <svg viewBox="0 0 12 12" className={`size-3 transition ${open ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><path d="m3 4.5 3 3 3-3" /></svg>
      </button>
      <div className={`absolute left-1/2 top-full w-80 -translate-x-1/2 pt-3 transition duration-200 ${open ? 'visible translate-y-0 opacity-100' : 'invisible -translate-y-1 opacity-0'}`}>
        <div className="overflow-hidden rounded border border-xline bg-white p-1.5 shadow-xl">
          {items.map((i) => (
            <NavLink key={i.to} to={i.to} end onClick={() => setOpen(false)} className={({ isActive }) => `block rounded px-4 py-2.5 transition hover:bg-[#f0f7ff] ${isActive ? 'bg-[#f0f7ff]' : ''}`}>
              <span className="block text-[15px] font-bold text-[#000099]">{i.label}</span>
              {i.text && <span className="mt-0.5 block text-[13px] text-[#5a606c]">{i.text}</span>}
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
      <header className={`fixed inset-x-0 top-0 z-50 transition duration-300 ${scrolled || menu ? 'bg-[#000044]/75 shadow-lg backdrop-blur-md' : 'bg-gradient-to-b from-[#000044] to-[#000088]'}`}>
        <div className="flex h-[60px] px-3 sm:px-5 items-center justify-between gap-4">
          <Wordmark />
          <nav aria-label="Main" className="ml-auto hidden items-center gap-1 lg:flex">
            <NavLink to="/" end className={({ isActive }) => navCls(isActive)}><img src={IC('navbar_home')} alt="" className="size-[18px]" />Home</NavLink>
            <Dropdown label="Services" items={services} active={svcActive} />
            <NavLink to="/get-paid" className={({ isActive }) => navCls(isActive)}><img src={IC('navbar_trade')} alt="" className="size-[18px]" />Get Paid</NavLink>
            <Dropdown label="Ideas" items={ideas} active={pathname.startsWith('/ideas')} />
          </nav>
          <div className="flex items-center gap-3">
            <a href={CHAT} target="_blank" rel="noopener noreferrer" className="inline-flex h-9 items-center gap-1.5 rounded border border-[#007bff] bg-[#1e90ff] px-3 font-display text-[14px] lowercase text-white hover:bg-[#007bff] max-sm:!hidden"><img src={IC('navbar_register')} alt="" className="size-4" />Visit chat <ArrowUpRight className="size-3.5" /></a>
            <button type="button" className="grid size-10 place-items-center rounded border border-white/40 text-white lg:hidden" aria-label={menu ? 'Close menu' : 'Open menu'} aria-expanded={menu} onClick={() => setMenu((m) => !m)}>
              <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">{menu ? <path d="M6 6l12 12M18 6 6 18" /> : <path d="M4 9h16M4 15h16" />}</svg>
            </button>
          </div>
        </div>
      </header>

      <div className={`fixed inset-0 z-40 overflow-y-auto bg-gradient-to-b from-[#000044] to-[#000088] px-6 pb-12 pt-20 text-white transition lg:hidden ${menu ? 'visible opacity-100' : 'invisible opacity-0'}`}>
        <nav aria-label="Mobile" className="mx-auto max-w-md">
          <Link to="/" className="block border-b border-white/10 py-4 font-display text-3xl font-bold lowercase text-white">Home</Link>
          <p className="mt-8 font-btn text-sm lowercase text-[#7fd6ff]">Services</p>
          {services.map((s) => <Link key={s.to} to={s.to} className="block border-b border-white/10 py-3.5 text-xl text-white">{s.label}</Link>)}
          <Link to="/get-paid" className="mt-4 block border-b border-white/10 py-4 font-display text-3xl font-bold lowercase text-white">Get Paid</Link>
          <p className="mt-8 font-btn text-sm lowercase text-[#7fd6ff]">Ideas</p>
          {ideas.map((s) => <Link key={s.to} to={s.to} className="block border-b border-white/10 py-3.5 text-xl text-white">{s.label}</Link>)}
          <a href={CHAT} target="_blank" rel="noopener noreferrer" className="btn-gold mt-10 w-full">Visit chat <ArrowUpRight /></a>
        </nav>
      </div>

      <main id="main">{children}</main>

      <footer className="tone-b border-t border-xline bg-[#f5f5f5] text-[#212529]">
        <div className="wrap grid gap-12 py-16 md:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            <div className="inline-flex rounded bg-gradient-to-b from-[#000044] to-[#000088] px-3 py-2"><Wordmark /></div>
            <p className="mt-5 max-w-sm text-[15px] leading-7 text-[#495057]">Market brings Xat communities together with people who can help. Need a better chat, a bigger crowd, or a fresh start? Start here.</p>
            <a href={CHAT} target="_blank" rel="noopener noreferrer" className="btn-ghost mt-7">Visit chat <ArrowUpRight /></a>
          </div>
          <div>
            <p className="font-btn text-[13px] lowercase text-[#000099]">Services</p>
            <ul className="mt-4 space-y-2.5 text-[15px]">{services.map((s) => <li key={s.to}><Link to={s.to} className="text-[#157ffb] hover:underline">{s.label}</Link></li>)}<li><Link to="/get-paid" className="text-[#157ffb] hover:underline">Get Paid</Link></li></ul>
          </div>
          <div>
            <p className="font-btn text-[13px] lowercase text-[#000099]">Ideas</p>
            <ul className="mt-4 space-y-2.5 text-[15px]">{ideas.map((s) => <li key={s.to}><Link to={s.to} className="text-[#157ffb] hover:underline">{s.label}</Link></li>)}</ul>
          </div>
        </div>
        <div className="border-t border-xline bg-white">
          <div className="wrap flex flex-col gap-2 py-6 text-sm text-[#6c757d] sm:flex-row sm:items-center sm:justify-between">
            <p>XatMarket <img src={IC('xatplanet')} alt="" className="mx-2 inline h-3 w-6" /> Made for Xat communities</p>
            <p>Market is independent of Xat.</p>
          </div>
        </div>
      </footer>
    </>
  )
}
