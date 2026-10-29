import { Link } from 'react-router-dom'
import { StaffLink, Section, SectionHead, Steps, Invite, Reveal, GoLink, Space, ArrowRight } from '../components/ui.jsx'
import { HeroChat, AdMock, SetupMock, RevivalMock, EarnMock, CastMock } from '../components/Mocks.jsx'
import { marketPaths, marketSteps } from '../data.js'
import { IC, SM } from '../img.js'

const routes = { advertising: '/advertising', setup: '/community-setup', revival: '/community-revival', earn: '/get-paid', ideas: '/ideas' }
const mocks = { advertising: AdMock, setup: SetupMock, revival: RevivalMock, earn: EarnMock, ideas: CastMock }
const icons = { advertising: 'navbar_store', setup: 'navbar_apps', revival: 'navbar_support', earn: 'apps_trade', ideas: 'navbar_powers' }
const tabs = [['General Market Info', '/'], ['Wanna Get Paid?', '/get-paid'], ['Community Management/Setup', '/community-setup'], ['Community Revival', '/community-revival'], ['Advertising', '/advertising'], ['Plans (Please Help)', '/ideas']]
const principles = [
  { title: 'Use Xat Trade', text: 'For payments in xats, use the official Trade app. Never give someone your password or pay by Transfer first.', icon: 'apps_trade' },
  { title: "Know who you're hiring", text: 'Agree on the work, price, and access before a job begins. An introduction or a vouch is not a guarantee.', icon: 'navbar_groups' },
  { title: 'Respect the space', text: "We follow Xat's rules and do not help build spaces for bullying or harassment. Market is independent of Xat.", icon: 'navbar_help' },
]
const Plus = () => <span className="grid size-[18px] shrink-0 place-items-center rounded-full bg-[#00b168] text-[14px] font-bold leading-none text-white">+</span>

export default function Home() {
  return (
    <>
      <section className="tone-c relative isolate overflow-hidden pb-16 pt-24 sm:pb-24 sm:pt-28">
        <Space />
        <div className="wrap grid items-center gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-12">
          <div className="min-w-0 rise">
            <p className="eyebrow">Xat Market / The place to connect</p>
            <h1 className="h-display mt-4 text-[46px] sm:text-[72px] lg:text-[78px]">Good people.<br /><span className="rainbow">Good things to build.</span></h1>
            <p className="lede mt-6 max-w-lg">Market brings Xat communities together with people who can help. Need a better chat, a bigger crowd, or a fresh start? Start here.</p>
            <div className="mt-8 flex flex-wrap gap-3"><StaffLink>Visit chat</StaffLink><a href="#explore" className="btn-ghost">What can Market do?</a></div>
          </div>
          <div className="min-w-0 rise" style={{ animationDelay: '.15s' }}><HeroChat /></div>
        </div>
      </section>

      <nav aria-label="Market tabs" className="sticky top-[60px] z-30 border-y border-white/10 bg-[#000088]/95 backdrop-blur-sm">
        <div className="flex items-center gap-1 overflow-x-auto px-3 py-2 text-[15px] text-white sm:px-5">
          <span className="mr-3 flex shrink-0 items-center gap-2 text-[17px] font-semibold"><img src={IC('xatplanet')} alt="" className="h-3 w-6" />Market</span>
          {tabs.map(([t, to]) => <Link key={t} to={to} className="flex shrink-0 items-center gap-1.5 rounded px-2.5 py-1 hover:bg-white/10"><Plus />{t}</Link>)}
        </div>
      </nav>

      <Section id="explore" tone="a">
        <SectionHead kicker="Find your way in" title="What can Market do?" />
        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {marketPaths.map((p) => (
            <Link key={p.id} to={routes[p.id]} className="gcard group flex flex-col">
              <p className="gcard-h">{p.title}</p>
              <div className="mx-3 mt-3 grid h-[96px] place-items-center rounded-sm" style={{ background: 'radial-gradient(circle at 70% 30%,#1b3a8a,#000014 72%)' }}><img src={IC(icons[p.id])} alt="" className="size-14 transition group-hover:scale-110" /></div>
              <p className="px-3 pb-4 pt-2 text-[13px] leading-snug text-[#495057]">{p.label}</p>
            </Link>
          ))}
        </div>
      </Section>

      {marketPaths.map((p, i) => {
        const M = mocks[p.id]
        const tone = ['b', 'y', 'a', 'c', 'b'][i]
        return (
          <Section key={p.id} tone={tone}>
            <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
              <Reveal className={`min-w-0 ${i % 2 ? 'lg:order-2' : ''}`}>
                <p className="eyebrow">{i + 1} · {p.label}</p>
                <h2 className="h2 mt-3">{p.title}</h2>
                <p className="lede mt-5 max-w-lg">{p.text}</p>
                <p className="mt-4 text-[19px] font-bold text-gold">{p.detail}</p>
                <div className="mt-8 flex items-center gap-3"><Link to={routes[p.id]} className="btn-ghost">Explore {p.title}</Link><Link to={routes[p.id]} className="arrow-r" aria-label={`Explore ${p.title}`}><ArrowRight className="size-5" /></Link></div>
              </Reveal>
              <Reveal delay={100} className="min-w-0"><M /></Reveal>
            </div>
          </Section>
        )
      })}

      <Section tone="a">
        <SectionHead kicker="No guesswork" title="How it works" />
        <div className="mt-10"><Steps items={marketSteps} /></div>
        <p className="copy mt-8 max-w-3xl font-semibold">Most work is priced by inquiry. Availability changes; when people are busy, we handle requests in order. Nothing is booked or paid for on this page.</p>
      </Section>

      <Section tone="b">
        <SectionHead kicker="The important stuff" title="Keep it fair. Keep it safe." />
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {principles.map((p, n) => (
            <Reveal key={p.title} delay={n * 80} className="pcard">
              <img src={IC(p.icon)} alt="" className="size-12" />
              <h3 className="h3 mt-4">{p.title}</h3>
              <p className="copy mt-2">{p.text}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      <Invite kicker="There is room for more" title="Have a skill Xat communities need?"
        text="Host games, design chats, build bots, edit wikis, help with events, or bring something else useful. Tell us what you do and how you like to work. XatMarket aims to help people find each other and trade services on Xat."
        cta="Talk to Market staff" note="Opens the Market chat in a new tab. No signup or job is promised." />
    </>
  )
}
