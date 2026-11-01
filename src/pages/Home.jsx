import { Link } from 'react-router-dom'
import { StaffLink, Section, SectionHead, Steps, Invite, Reveal, GoLink, Space, ArrowRight } from '../components/ui.jsx'
import { HeroChat, AdMock, SetupMock, RevivalMock, LeoneMock, EarnMock, CastMock } from '../components/Mocks.jsx'
import { marketPaths, marketSteps } from '../data.js'
import { Ico, Mark } from '../components/Icons.jsx'
import IslandGL from '../components/IslandGL.jsx'
import HeroLiveChat from '../components/HeroLiveChat.jsx'

const CARD = import.meta.env.BASE_URL + 'cards/'
const cimg = { advertising: 'c_advertising', setup: 'c_setup', revival: 'c_revival', leonebot: 'c_leonebot', earn: 'c_earn', ideas: 'c_ideas' }

const routes = { advertising: '/advertising', setup: '/community-setup', revival: '/community-revival', leonebot: '/xatbot-suite', earn: '/get-paid', ideas: '/ideas' }
const mocks = { advertising: AdMock, setup: SetupMock, revival: RevivalMock, leonebot: LeoneMock, earn: EarnMock, ideas: CastMock }
const icons = { advertising: 'megaphone', setup: 'build', revival: 'revive', leonebot: 'shield', earn: 'coins', ideas: 'bulb' }
const grads = { advertising: 'linear-gradient(135deg,#ff4f7b,#ff8a3d)', setup: 'linear-gradient(135deg,#2ef2c2,#3d8bff)', revival: 'linear-gradient(135deg,#8b7bff,#ff4f7b)', leonebot: 'linear-gradient(135deg,#ffc94d,#2ef2c2)', earn: 'linear-gradient(135deg,#ffc94d,#ff8a3d)', ideas: 'linear-gradient(135deg,#2ef2c2,#ffc94d)' }
const principles = [
  { title: 'Use Xat Trade', text: 'For payments in xats, use the official Trade app. Never give someone your password or pay by Transfer first.', icon: 'trade' },
  { title: "Know who you're hiring", text: 'Agree on the work, price, and access before a job begins. An introduction or a vouch is not a guarantee.', icon: 'users' },
  { title: 'Respect the space', text: "We follow Xat's rules and do not help build spaces for bullying or harassment. Market is independent of Xat.", icon: 'shield' },
]

export default function Home() {
  return (
    <>
      <section className="hero tone-c relative isolate overflow-hidden">
        <IslandGL variant="hero" />
        <div className="hero-veil" />
        <div className="wrap hero-inner hero-grid">
          <div className="min-w-0 max-w-[640px] rise">
            <p className="eyebrow">Xat Market / The place to connect</p>
            <h1 className="h-display mt-4 text-[52px] sm:text-[84px] lg:text-[96px]">Good people.<br /><span className="grad-text">Good things to build.</span></h1>
            <p className="lede mt-6 max-w-lg">Market brings Xat communities together with people who can help. Need a better chat, a bigger crowd, or a fresh start? Start here.</p>
            <div className="mt-8 flex flex-wrap gap-3"><StaffLink>Visit chat</StaffLink><a href="#explore" className="btn-ghost">What can Market do?</a></div>
          </div>
          <HeroLiveChat />
        </div>
        <a href="#explore" className="hero-scroll" aria-label="Scroll to What can Market do?"><span /></a>
      </section>

      <Section id="explore" tone="a">
        <SectionHead kicker="Find your way in" title="What can Market do?" />
        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {marketPaths.map((p) => (
            <Link key={p.id} to={routes[p.id]} className="isle-card group">
              <img src={`${CARD}${cimg[p.id]}.webp`} alt="" loading="lazy" width="1024" height="768" />
              <span className="isle-shade" />
              <span className="isle-text"><span className="isle-t">{p.title}</span><span className="isle-l">{p.label}</span></span>
            </Link>
          ))}
        </div>
      </Section>

      {marketPaths.map((p, i) => {
        const M = mocks[p.id]
        const tone = ['b', 'y', 'a', 'c', 'b', 'y'][i] // sand, lagoon, shallows, night, sand, lagoon
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
              <span className="p-ico"><Ico n={p.icon} className="size-7" /></span>
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
