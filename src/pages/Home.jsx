import { StaffLink, Section, SectionHead, Steps, Invite, Reveal, GoLink, Tilt, Floaters, Bouncy, Smiley } from '../components/ui.jsx'
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
      <section className="tone-b relative isolate overflow-hidden pb-14 pt-28 sm:pb-28 sm:pt-40">
        <div className="dots absolute inset-0 -z-10 opacity-50" aria-hidden="true" />
        <Floaters />
        <div className="wrap grid items-center gap-10 lg:grid-cols-[1fr_1.05fr] lg:gap-14">
          <div className="min-w-0 rise">
            <p className="eyebrow">Xat Market / The place to connect</p>
            <h1 className="h-display mt-6 text-[50px] sm:text-[88px] lg:text-[100px]"><Bouncy text="Good people." /><br /><span className="rainbow">Good things to build.</span></h1>
            <p className="lede mt-7 max-w-lg">Market brings Xat communities together with people who can help. Need a better chat, a bigger crowd, or a fresh start? Start here.</p>
            <div className="mt-9 flex flex-wrap gap-4"><StaffLink>Visit chat</StaffLink><a href="#explore" className="btn-ghost">What can Market do?</a></div>
          </div>
          <Tilt className="relative min-w-0 rise" max={7}>
            <Smiley size={84} mood="grin" className="wobble absolute -left-6 -top-8 z-10 hidden sm:block" />
            <Smiley size={60} color="#02A9D2" mood="wink" className="wobble absolute -bottom-6 -right-4 z-10 hidden sm:block" />
            <HeroChat />
          </Tilt>
        </div>
      </section>
      <div className="overflow-hidden border-y-[3px] border-ink bg-gold py-3" aria-hidden="true">
        <div className="ticker flex w-max gap-10 whitespace-nowrap font-display text-xl font-bold uppercase text-ink">
          {[0, 1].map((k) => <span key={k} className="flex gap-10">{['Advertising', 'Community Setup', 'Community Revival', 'Get Paid', 'Ideas'].map((t, i) => <span key={t} className="flex items-center gap-10">{t}<Smiley size={26} color={['#02A9D2', '#00B168', '#FF3636', '#A717C9', '#1E90FF'][i]} /></span>)}</span>)}
        </div>
      </div>

      <Section id="explore" tone="a" className="!pb-4 sm:!pb-8">
        <SectionHead center kicker="Find your way in" title="What can Market do?" />
      </Section>
      {marketPaths.map((p, i) => {
        const M = mocks[p.id]
        return (
          <section key={p.id} className={`relative overflow-hidden py-14 sm:py-24 ${['tone-a', 'tone-c', 'tone-b', 'tone-y', 'tone-a'][i % 5]}`}>
            <div className="wrap grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
              <Reveal className={`min-w-0 ${i % 2 ? 'lg:order-2' : ''}`}>
                <p className="eyebrow"><span className="grid size-7 place-items-center rounded-full bg-ink text-[14px] text-gold">{i + 1}</span>{p.label}</p>
                <h3 className="h2 mt-4">{p.title}</h3>
                <p className="lede mt-6 max-w-lg">{p.text}</p>
                <p className={`mt-5 font-display text-2xl font-semibold ${i % 5 === 3 ? 'text-ink' : 'text-goldsoft'}`}>{p.detail}</p>
                <GoLink to={routes[p.id]} className="btn-ghost mt-9">Explore {p.title}</GoLink>
              </Reveal>
              <Reveal delay={120} className={`min-w-0 ${i > 0 ? 'hidden sm:block' : ''}`}><Tilt max={7}><M /></Tilt></Reveal>
            </div>
          </section>
        )
      })}

      <Section tone="y">
        <SectionHead kicker="No guesswork" title="How it works" />
        <div className="mt-10 sm:mt-16"><Steps items={marketSteps} /></div>
        <p className="copy mt-10 max-w-3xl font-semibold">Most work is priced by inquiry. Availability changes; when people are busy, we handle requests in order. Nothing is booked or paid for on this page.</p>
      </Section>

      <Section tone="a">
        <SectionHead kicker="The important stuff" title="Keep it fair. Keep it safe." />
        <div className="mt-10 grid gap-5 sm:mt-16 md:grid-cols-3">
          {principles.map((p, n) => (
            <Reveal key={p.title} delay={n * 80}><Tilt className="h-full rounded-[26px] border-[3px] border-white/25 bg-white/10 p-6 sm:p-8">
              <Smiley size={48} color={['#F9C931', '#02A9D2', '#00B168'][n]} mood={['grin', 'wink', 'grin'][n]} />
              <h3 className="h3 mt-4">{p.title}</h3>
              <p className="copy mt-2">{p.text}</p>
            </Tilt></Reveal>
          ))}
        </div>
      </Section>

      <Invite kicker="There is room for more" title="Have a skill Xat communities need?"
        text="Host games, design chats, build bots, edit wikis, help with events, or bring something else useful. Tell us what you do and how you like to work. XatMarket aims to help people find each other and trade services on Xat."
        cta="Talk to Market staff" note="Opens the Market chat in a new tab. No signup or job is promised." />
    </>
  )
}
