import { StaffLink, Section, SectionHead, Steps, Invite, Reveal, GoLink } from '../components/ui.jsx'
import { HeroChat, AdMock, SetupMock, RevivalMock, EarnMock, CastMock } from '../components/Mocks.jsx'
import { marketPaths, marketSteps } from '../data.js'

const routes = { advertising: '/advertising', setup: '/community-setup', revival: '/community-revival', earn: '/get-paid', ideas: '/ideas' }
const mocks = { advertising: AdMock, setup: SetupMock, revival: RevivalMock, earn: EarnMock, ideas: CastMock }
const principles = [
  { title: 'Use Xat Trade', text: 'For payments in xats, use the official Trade app. Never give someone your password or pay by Transfer first.' },
  { title: "Know who you're hiring", text: 'Agree on the work, price, and access before a job begins. An introduction or a vouch is not a guarantee.' },
  { title: 'Respect the space', text: "We follow Xat's rules and do not help build spaces for bullying or harassment. Market is independent of Xat." },
]

export default function Home() {
  return (
    <>
      <section className="relative isolate overflow-hidden pb-24 pt-32 sm:pb-32 sm:pt-44">
        <div className="hairline-grid absolute inset-0 -z-10" aria-hidden="true" />
        <div className="absolute inset-x-0 top-0 -z-10 h-[600px] bg-[radial-gradient(50%_60%_at_70%_20%,rgba(210,173,102,.08),transparent)]" aria-hidden="true" />
        <div className="wrap grid items-center gap-16 lg:grid-cols-[1fr_1.05fr]">
          <div className="min-w-0 rise">
            <p className="eyebrow">Xat Market / The place to connect</p>
            <h1 className="h-display mt-6 text-[52px] sm:text-[84px] lg:text-[96px]">Good people.<br /><em className="text-goldsoft">Good things to build.</em></h1>
            <p className="lede mt-8 max-w-lg">Market brings Xat communities together with people who can help. Need a better chat, a bigger crowd, or a fresh start? Start here.</p>
            <div className="mt-10 flex flex-wrap gap-3"><StaffLink>Visit chat</StaffLink><a href="#explore" className="btn-ghost">What can Market do?</a></div>
          </div>
          <div className="min-w-0 rise" style={{ animationDelay: '.15s' }}><HeroChat /></div>
        </div>
      </section>

      <Section id="explore" tone="b" className="!pb-0">
        <SectionHead kicker="Find your way in" title="What can Market do?" />
      </Section>
      {marketPaths.map((p, i) => {
        const M = mocks[p.id]
        return (
          <section key={p.id} className={`py-20 sm:py-28 ${i % 2 ? 'tone-a border-y border-white/[.07]' : 'tone-b'}`}>
            <div className="wrap grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
              <Reveal className={`min-w-0 ${i % 2 ? 'lg:order-2' : ''}`}>
                <p className="eyebrow"><span className="mr-3 font-display text-2xl text-cream/40">{String(i + 1).padStart(2, '0')}</span>{p.label}</p>
                <h3 className="h2 mt-4">{p.title}</h3>
                <p className="lede mt-6 max-w-lg">{p.text}</p>
                <p className="mt-5 font-display text-2xl italic text-goldsoft">{p.detail}</p>
                <GoLink to={routes[p.id]} className="btn-ghost mt-9">Explore {p.title}</GoLink>
              </Reveal>
              <Reveal delay={120} className="min-w-0"><M /></Reveal>
            </div>
          </section>
        )
      })}

      <Section tone="b">
        <SectionHead kicker="No guesswork" title="How it works" />
        <div className="mt-16"><Steps items={marketSteps} /></div>
        <p className="copy mt-12 max-w-3xl text-mist">Most work is priced by inquiry. Availability changes; when people are busy, we handle requests in order. Nothing is booked or paid for on this page.</p>
      </Section>

      <Section tone="a">
        <SectionHead kicker="The important stuff" title="Keep it fair. Keep it safe." />
        <div className="mt-16 grid gap-12 md:grid-cols-3 md:gap-0 md:divide-x md:divide-white/10">
          {principles.map((p, n) => (
            <Reveal key={p.title} delay={n * 80} className="md:px-10 md:first:pl-0 md:last:pr-0">
              <div className="h-px w-12 bg-gold" />
              <h3 className="h3 mt-6">{p.title}</h3>
              <p className="copy mt-3">{p.text}</p>
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
