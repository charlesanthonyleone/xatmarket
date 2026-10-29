import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import HeroCanvas from '../components/HeroCanvas.jsx'
import { StaffLink, SectionHead, Steps, Invite, Arrow } from '../components/ui.jsx'
import { marketPaths, marketSteps } from '../data.js'
import { img } from '../img.js'

const routes = { advertising: '/advertising', setup: '/community-setup', revival: '/community-revival', earn: '/get-paid', ideas: '/ideas' }
const pics = { advertising: 'pg_ads', setup: 'pg_setup', revival: 'pg_revival', earn: 'pg_earn', ideas: 'pg_ideas' }
const principles = [
  { title: 'Use Xat Trade', text: 'For payments in xats, use the official Trade app. Never give someone your password or pay by Transfer first.' },
  { title: "Know who you're hiring", text: 'Agree on the work, price, and access before a job begins. An introduction or a vouch is not a guarantee.' },
  { title: 'Respect the space', text: "We follow Xat's rules and do not help build spaces for bullying or harassment. Market is independent of Xat." },
]

export default function Home() {
  const bg = useRef(null)
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const on = () => { if (bg.current) bg.current.style.transform = `translate3d(0, ${window.scrollY * 0.25}px, 0) scale(1.06)` }
    on(); window.addEventListener('scroll', on, { passive: true }); return () => window.removeEventListener('scroll', on)
  }, [])
  return (
    <>
      <section className="relative isolate flex min-h-[100svh] items-end overflow-hidden">
        <img ref={bg} src={img('hero')} alt="" className="absolute inset-0 -z-30 h-full w-full scale-[1.06] object-cover object-[60%_50%] will-change-transform" />
        <div className="absolute inset-0 -z-20" style={{ background: 'linear-gradient(90deg, rgba(6,11,24,.88) 0%, rgba(6,11,24,.45) 50%, rgba(6,11,24,.1) 100%), linear-gradient(180deg, rgba(6,11,24,.5) 0%, rgba(6,11,24,0) 30%, rgba(6,11,24,.3) 70%, #060b18 100%)' }} />
        <div className="absolute inset-0 -z-10"><HeroCanvas /></div>
        <div className="wrap pb-20 pt-32 sm:pb-28">
          <p className="kicker">Xat Market / The place to connect</p>
          <h1 className="mt-4 font-display text-6xl font-semibold leading-[.92] text-cream sm:text-8xl lg:text-[7.5rem]">Good people.<br /><em className="font-medium text-gold">Good things to build.</em></h1>
          <p className="body mt-8 max-w-lg text-lg">Market brings Xat communities together with people who can help. Need a better chat, a bigger crowd, or a fresh start? Start here.</p>
          <div className="mt-10 flex flex-wrap gap-3"><StaffLink>Visit chat</StaffLink><a href="#explore" className="btn-ghost">What can Market do?</a></div>
        </div>
      </section>

      <section id="explore" className="band band-a scroll-mt-16">
        <div className="wrap">
          <SectionHead kicker="Find your way in" title="What can Market do?" />
          <div className="mt-16 space-y-20 sm:space-y-28">
            {marketPaths.map((p, i) => (
              <article key={p.id} className={`grid items-center gap-8 md:grid-cols-2 md:gap-14 ${i % 2 ? 'md:[&>*:first-child]:order-2' : ''}`}>
                <Link to={routes[p.id]} className="img-card block aspect-[16/10]" aria-label={p.title}>
                  <img src={img(pics[p.id])} alt="" loading="lazy" className="h-full w-full object-cover" />
                </Link>
                <div>
                  <p className="kicker">{p.label}</p>
                  <h3 className="mt-2 font-display text-4xl font-semibold leading-none text-cream sm:text-5xl">{p.title}</h3>
                  <p className="body mt-5">{p.text}</p>
                  <p className="mt-4 font-display text-xl italic text-goldsoft">{p.detail}</p>
                  <Link to={routes[p.id]} className="mt-7 inline-flex items-center gap-2 border-b border-gold/50 pb-1 font-semibold text-cream transition hover:border-gold hover:text-gold">Explore {p.title} <Arrow /></Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="band band-c">
        <div className="wrap">
          <SectionHead kicker="No guesswork" title="How it works" />
          <div className="mt-12"><Steps items={marketSteps} /></div>
          <p className="body mt-8 max-w-3xl text-mist">Most work is priced by inquiry. Availability changes; when people are busy, we handle requests in order. Nothing is booked or paid for on this page.</p>
        </div>
      </section>

      <section className="band band-a">
        <div className="wrap">
          <SectionHead kicker="The important stuff" title="Keep it fair. Keep it safe." />
          <div className="mt-14 grid gap-10 md:grid-cols-3 md:gap-0 md:divide-x md:divide-white/10">
            {principles.map((p) => (
              <div key={p.title} className="md:px-10 md:first:pl-0 md:last:pr-0">
                <div className="h-px w-12 bg-gold" />
                <h3 className="h-card mt-6">{p.title}</h3>
                <p className="mt-3 text-[15px] leading-7 text-cream/75">{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Invite image="svc4" kicker="There is room for more" title="Have a skill Xat communities need?"
        text="Host games, design chats, build bots, edit wikis, help with events, or bring something else useful. Tell us what you do and how you like to work. XatMarket aims to help people find each other and trade services on Xat."
        cta="Talk to Market staff" note="Opens the Market chat in a new tab. No signup or job is promised." />
    </>
  )
}
