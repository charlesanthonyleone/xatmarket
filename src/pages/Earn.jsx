import { Ico } from '../components/Icons.jsx'
import { PageHero, SectionHead, Section, Steps, Invite, Reveal, StaffLink } from '../components/ui.jsx'
import { EarnMock, ProfileMock } from '../components/Mocks.jsx'
import { paidRoles, paidStart, ownerIdeas } from '../data.js'

export default function Earn() {
  return (
    <>
      <PageHero kicker="Xat Market / For the people who make things happen" title="Wanna get paid?" accent="Bring what you do best." visual={<EarnMock />}>
        <p className="lede">Hang out. Meet people. Offer a skill. When a community needs help, you could turn good work into xats. Owners can build income for their groups too.</p>
        <p className="mt-6 font-display text-2xl font-semibold text-goldsoft">People earn · Communities grow</p>
        <div className="mt-9"><StaffLink>Visit Market chat</StaffLink></div>
      </PageHero>

      <Section tone="b">
        <SectionHead kicker="Your skills have a place here" title="Ways you can earn xats">You do not need to do everything. Choose a service, tell people what you offer, and set a fair price for each job.</SectionHead>
        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {paidRoles.map((r, n) => (
            <Reveal as="article" key={r.title} delay={(n % 3) * 70} className="group relative overflow-hidden rounded-2xl border border-white/10 bg-panel p-7 transition duration-300 hover:-translate-y-1.5 hover:border-gold/50 hover:shadow-[0_18px_50px_-20px_rgba(255,201,77,.45)]">
              <div className="flex items-center gap-4">
                <span className="grid size-12 shrink-0 place-items-center rounded-xl border border-white/10 bg-white/[.04] text-gold transition duration-300 group-hover:rotate-[-6deg] group-hover:scale-110 group-hover:text-mint"><Ico n={r.icon} className="size-6" /></span>
                <span className="font-display text-2xl text-gold/60">{String(n + 1).padStart(2, '0')}</span>
              </div>
              <h3 className="h3 mt-5">{r.title}</h3><p className="copy mt-2">{r.text}</p>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-12 rounded-2xl border border-gold/30 bg-gold/[.06] p-7 text-center"><p className="font-display text-2xl font-semibold text-goldsoft">These are just examples.</p><p className="copy mt-2">Got a different idea? Bring it. Anyone can pitch whatever they're great at.</p></Reveal>
      </Section>

      <Section tone="c">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <Reveal className="lg:order-2">
            <p className="eyebrow">Make a name for yourself</p>
            <h2 className="h2 mt-4">Be someone people remember.</h2>
            <p className="lede mt-7">Pick a name you like and use it consistently. A shortname and a memorable registered ID can make it easier for people to recognize you. They are optional, not proof that someone is trusted.</p>
            <p className="copy mt-5">Shortnames and IDs may come up in Xat auctions or be offered by people around Market, Trade, and Xat. Check the current owner, price, and Xat's rules before any deal. Never share your password, and use official Trade for xat payments.</p>
          </Reveal>
          <Reveal delay={120}><ProfileMock /></Reveal>
        </div>
      </Section>

      <Section tone="b">
        <SectionHead kicker="A reputation is earned" title="Start small. Stay around." />
        <div className="mt-16"><Steps items={paidStart} /></div>
      </Section>

      <Section tone="a">
        <SectionHead kicker="For community owners" title="Your chat can earn, too.">A healthy community costs time and xats to run. Find ways to fund the work without making every conversation a sale.</SectionHead>
        <div className="mt-16 grid gap-5 md:grid-cols-3">
          {ownerIdeas.map((o, n) => (
            <Reveal as="article" key={o.title} delay={n * 80} className="rounded-2xl border border-white/10 bg-panel p-8">
              <h3 className="font-display text-3xl leading-tight text-cream">{o.title}</h3>
              <p className="copy mt-4">{o.text}</p>
            </Reveal>
          ))}
        </div>
        <p className="lede mt-14 max-w-3xl border-l-2 border-gold pl-6">None of these are guaranteed income. Agree on prices and delivery, keep records, and check platform rules. An economist can help you make a plan.</p>
      </Section>

      <Invite kicker="Your next connection starts here" title="Come meet the Market."
        text="Tell staff what you do—or what your chat needs. Bring a few examples and an idea of your price. We can talk through the next step together."
        cta="Visit Market chat" note="Opens Xat Market in a new tab. No job, buyer, or earnings are promised." />
    </>
  )
}
