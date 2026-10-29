import { PageHero, SectionHead, Steps, Invite } from '../components/ui.jsx'
import { paidRoles, paidStart, ownerIdeas } from '../data.js'
import { img } from '../img.js'

const rolePics = ['svc4', 'ev_awards', 'svc2', 'svc3', 'svc5', 'svc7', 'svc8', 'role_promo']
const ownerPics = ['ev_movie', 'svc6', 'ev_listen']

export default function Earn() {
  return (
    <>
      <PageHero image="pg_earn" kicker="Xat Market / For the people who make things happen" title="Wanna get paid?" accent="Bring what you do best.">
        <p className="body text-lg">Hang out. Meet people. Offer a skill. When a community needs help, you could turn good work into xats. Owners can build income for their groups too.</p>
        <p className="mt-5 font-display text-xl italic text-goldsoft">People earn · Communities grow</p>
      </PageHero>

      <section className="band band-a">
        <div className="wrap">
          <SectionHead kicker="Your skills have a place here" title="Ways you can earn xats">You do not need to do everything. Choose a service, tell people what you offer, and set a fair price for each job.</SectionHead>
          <div className="mt-14 grid gap-6 sm:grid-cols-2">
            {paidRoles.map((r, n) => (
              <article key={r.title} className="img-card flex flex-col sm:flex-row">
                <div className="aspect-[16/9] shrink-0 overflow-hidden sm:aspect-auto sm:w-[42%]"><img src={img(rolePics[n])} alt="" loading="lazy" className="h-full w-full object-cover" /></div>
                <div className="p-6 sm:p-7">
                  <h3 className="h-card">{r.title}</h3>
                  <p className="mt-3 text-[15px] leading-7 text-cream/75">{r.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative isolate overflow-hidden py-28 sm:py-36">
        <img src={img('svc9')} alt="" className="absolute inset-0 -z-20 h-full w-full object-cover" loading="lazy" />
        <div className="absolute inset-0 -z-10" style={{ background: 'linear-gradient(270deg, #060b18 0%, rgba(6,11,24,.88) 50%, rgba(6,11,24,.35) 100%)' }} />
        <div className="wrap flex justify-end">
          <div className="max-w-xl">
            <p className="kicker">Make a name for yourself</p>
            <h2 className="mt-3 font-display text-5xl font-semibold leading-[.98] text-cream sm:text-6xl">Be someone people remember.</h2>
            <p className="body mt-6">Pick a name you like and use it consistently. A shortname and a memorable registered ID can make it easier for people to recognize you. They are optional, not proof that someone is trusted.</p>
            <p className="body mt-4 text-mist">Shortnames and IDs may come up in Xat auctions or be offered by people around Market, Trade, and Xat. Check the current owner, price, and Xat's rules before any deal. Never share your password, and use official Trade for xat payments.</p>
          </div>
        </div>
      </section>

      <section className="band band-c">
        <div className="wrap">
          <SectionHead kicker="A reputation is earned" title="Start small. Stay around." />
          <div className="mt-12"><Steps items={paidStart} /></div>
        </div>
      </section>

      <section className="band band-a">
        <div className="wrap">
          <SectionHead kicker="For community owners" title="Your chat can earn, too.">A healthy community costs time and xats to run. Find ways to fund the work without making every conversation a sale.</SectionHead>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {ownerIdeas.map((o, n) => (
              <article key={o.title} className="img-card">
                <div className="aspect-[16/10] overflow-hidden"><img src={img(ownerPics[n])} alt="" loading="lazy" className="h-full w-full object-cover" /></div>
                <div className="p-6 sm:p-7"><h3 className="h-card">{o.title}</h3><p className="mt-3 text-[15px] leading-7 text-cream/75">{o.text}</p></div>
              </article>
            ))}
          </div>
          <p className="body mt-10 max-w-3xl border-l-2 border-gold pl-5">None of these are guaranteed income. Agree on prices and delivery, keep records, and check platform rules. An economist can help you make a plan.</p>
        </div>
      </section>

      <Invite image="pg_earn" kicker="Your next connection starts here" title="Come meet the Market."
        text="Tell staff what you do—or what your chat needs. Bring a few examples and an idea of your price. We can talk through the next step together."
        cta="Visit Market chat" note="Opens Xat Market in a new tab. No job, buyer, or earnings are promised." />
    </>
  )
}
