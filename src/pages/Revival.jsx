import { PageHero, SectionHead, Section, Invite, Reveal, StaffLink } from '../components/ui.jsx'
import { RevivalMock } from '../components/Mocks.jsx'
import { revivalSteps, revivalPromises } from '../data.js'

export default function Revival() {
  return (
    <>
      <PageHero kicker="Market / Community Revival" title="A fresh start" accent="for your Xat chat." visual={<RevivalMock />}>
        <p className="lede">A quiet or troubled chat can become a place people want to return to. We help you face what went wrong, rebuild trust, and make the group feel alive again.</p>
        <p className="mt-6 font-display text-2xl italic text-goldsoft">Led mainly by Charles (Prince) · Custom plan · ask for a quote</p>
        <div className="mt-9"><StaffLink>Talk to online staff</StaffLink></div>
      </PageHero>

      <Section tone="b">
        <SectionHead kicker="The work / not a quick fix" title="How we bring a chat back" />
        <ol className="mt-16 border-t border-white/[.08]">
          {revivalSteps.map((s, k) => (
            <Reveal as="li" key={s.number} delay={k * 50} className="grid gap-4 border-b border-white/[.08] py-10 md:grid-cols-[120px_1fr_1.3fr] md:gap-10">
              <span className="font-display text-6xl leading-none text-gold">{s.number}</span>
              <h3 className="font-display text-4xl leading-tight text-cream">{s.title}</h3>
              <p className="copy text-[16px]">{s.text}</p>
            </Reveal>
          ))}
        </ol>
      </Section>

      <Section tone="a">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <p className="eyebrow">A new name, a real new chapter</p>
            <h2 className="h2 mt-4">Same community.<br /><em className="text-gold">Better future.</em></h2>
            <p className="lede mt-7">Your old group might have a name from 2008 that no longer fits. We can help move from something like “pokemanns_ball_” to “PokemonBall,” with a cleaner look on Xat and on outside pages. We help explain the change to members, update links where possible, and make sure the new identity stands for something better.</p>
          </Reveal>
          <Reveal delay={120} className="window p-8 sm:p-12">
            <p className="text-[13px] text-mist">Before</p>
            <p className="mt-2 break-all font-display text-4xl text-mist line-through decoration-gold/60 sm:text-5xl">pokemanns_ball_</p>
            <div className="my-8 flex items-center gap-4"><div className="h-px flex-1 bg-white/10" /><span className="font-display text-3xl text-gold">→</span><div className="h-px flex-1 bg-white/10" /></div>
            <p className="text-[13px] text-mist">After</p>
            <p className="mt-2 font-display text-5xl text-cream sm:text-6xl">PokemonBall</p>
          </Reveal>
        </div>
      </Section>

      <Section tone="b">
        <SectionHead kicker="Before we begin" title="A fresh start needs honesty." />
        <div className="mt-16 grid gap-12 md:grid-cols-3 md:gap-0 md:divide-x md:divide-white/[.08]">
          {revivalPromises.map((p, n) => (
            <Reveal key={p.title} delay={n * 80} className="md:px-10 md:first:pl-0 md:last:pr-0">
              <span className="font-display text-4xl text-gold">{String(n + 1).padStart(2, '0')}</span>
              <h3 className="h3 mt-5">{p.title}</h3>
              <p className="copy mt-3">{p.text}</p>
            </Reveal>
          ))}
        </div>
        <p className="lede mt-14 max-w-3xl border-l-2 border-gold pl-6">This is hard, hands-on work. No one can promise old members will come back. We agree on the scope, timing, and price with you before starting.</p>
      </Section>

      <Invite kicker="Ready to talk?" title="Tell us your group's story."
        text="Send your Xat group link, what changed, what you hope to rebuild, and what you are willing to change. Ask online staff to connect you with Charles."
        cta="Talk to online staff" note="Opens Xat Market in a new tab" />
    </>
  )
}
