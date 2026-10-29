import { PageHero, SectionHead, StaffLink, Invite } from '../components/ui.jsx'
import { revivalSteps, revivalPromises } from '../data.js'
import { img } from '../img.js'

export default function Revival() {
  return (
    <>
      <PageHero image="pg_revival" kicker="Market / Community Revival" title="A fresh start" accent="for your Xat chat.">
        <p className="body text-lg">A quiet or troubled chat can become a place people want to return to. We help you face what went wrong, rebuild trust, and make the group feel alive again.</p>
        <p className="mt-5 font-display text-xl italic text-goldsoft">Led mainly by Charles (Prince) · Custom plan · ask for a quote</p>
      </PageHero>

      <section className="band band-a">
        <div className="wrap">
          <SectionHead kicker="The work / not a quick fix" title="How we bring a chat back" />
          <ol className="relative mt-14 space-y-12 border-l border-gold/30 pl-8 sm:pl-14">
            {revivalSteps.map((s) => (
              <li key={s.number} className="relative">
                <span className="absolute -left-[calc(2rem+1px)] top-1 grid size-0 place-items-center sm:-left-[calc(3.5rem+1px)]"><span className="size-3 rotate-45 bg-gold shadow-[0_0_20px_rgba(217,179,106,.7)]" /></span>
                <span className="font-display text-2xl italic text-gold/80">{s.number}</span>
                <h3 className="mt-1 font-display text-3xl font-semibold text-cream sm:text-4xl">{s.title}</h3>
                <p className="body mt-3 max-w-2xl">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="relative isolate overflow-hidden py-28 sm:py-36">
        <img src={img('svc6')} alt="" className="absolute inset-0 -z-20 h-full w-full object-cover" loading="lazy" />
        <div className="absolute inset-0 -z-10" style={{ background: 'linear-gradient(90deg, #060b18 0%, rgba(6,11,24,.85) 45%, rgba(6,11,24,.3) 100%)' }} />
        <div className="wrap">
          <div className="max-w-2xl">
            <p className="kicker">A new name, a real new chapter</p>
            <h2 className="mt-3 font-display text-5xl font-semibold leading-[.98] text-cream sm:text-6xl">Same community.<br /><em className="font-medium text-gold">Better future.</em></h2>
            <p className="body mt-6">Your old group might have a name from 2008 that no longer fits. We can help move from something like “pokemanns_ball_” to “PokemonBall,” with a cleaner look on Xat and on outside pages. We help explain the change to members, update links where possible, and make sure the new identity stands for something better.</p>
            <div className="mt-8 flex flex-wrap items-center gap-4 font-display text-2xl sm:text-3xl" aria-hidden="true">
              <span className="text-mist line-through decoration-gold/60">pokemanns_ball_</span>
              <span className="text-gold">→</span>
              <span className="font-semibold text-cream">PokemonBall</span>
            </div>
          </div>
        </div>
      </section>

      <section className="band band-b">
        <div className="wrap">
          <SectionHead kicker="Before we begin" title="A fresh start needs honesty." />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {revivalPromises.map((p, n) => (
              <article key={p.title} className="panel p-7 sm:p-8">
                <span className="font-display text-4xl italic text-gold/80">{n + 1}</span>
                <h3 className="h-card mt-4">{p.title}</h3>
                <p className="mt-3 text-[15px] leading-7 text-cream/75">{p.text}</p>
              </article>
            ))}
          </div>
          <p className="body mt-10 max-w-3xl border-l-2 border-gold pl-5">This is hard, hands-on work. No one can promise old members will come back. We agree on the scope, timing, and price with you before starting.</p>
        </div>
      </section>

      <Invite image="pg_revival" kicker="Ready to talk?" title="Tell us your group's story."
        text="Send your Xat group link, what changed, what you hope to rebuild, and what you are willing to change. Ask online staff to connect you with Charles."
        cta="Talk to online staff" note="Opens Xat Market in a new tab" />
    </>
  )
}
