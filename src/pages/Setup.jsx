import { useRef, useState } from 'react'
import { PageHero, SectionHead, StaffLink, Bullets, Warn } from '../components/ui.jsx'
import { services, eventIdeas } from '../data.js'
import { img } from '../img.js'

const evPics = ['svc4', 'ev_awards', 'ev_movie', 'ev_listen']

export default function Setup() {
  const [i, setI] = useState(0)
  const panel = useRef(null)
  const s = services[i]
  const pick = (n) => { setI(n); if (window.innerWidth < 1024) panel.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }) }
  return (
    <>
      <PageHero image="pg_setup" kicker="Market / Community services" title="Build a chat" accent="worth coming back to.">
        <p className="body text-lg">A good Xat group needs more than a room. Find the people who can set it up, run events, reward the team, and keep it alive.</p>
        <p className="mt-5 font-display text-xl italic text-goldsoft">9 ways to build · Real people · real Xat work</p>
      </PageHero>

      <section className="band band-a">
        <div className="wrap">
          <SectionHead kicker="Choose what you need" title="Explore the services" />
          <div className="mt-12 grid gap-8 lg:grid-cols-[minmax(0,.75fr)_minmax(0,1.25fr)] lg:gap-12">
            <div className="grid grid-cols-1 gap-1 sm:grid-cols-2 lg:grid-cols-1" role="tablist" aria-label="Services">
              {services.map((x, n) => (
                <button key={x.title} type="button" role="tab" aria-selected={n === i} onClick={() => pick(n)}
                  className={`group flex items-center gap-4 rounded-xl px-4 py-3.5 text-left transition ${n === i ? 'bg-white/[.06] ring-1 ring-gold/40' : 'hover:bg-white/[.03]'}`}>
                  <img src={img(`svc${n + 1}`)} alt="" className="size-12 shrink-0 rounded-lg object-cover" loading="lazy" />
                  <span className="min-w-0">
                    <span className={`block font-display text-xl font-semibold leading-tight ${n === i ? 'text-gold' : 'text-cream'}`}>{x.title}</span>
                    <span className="block text-sm text-mist">{x.subtitle}</span>
                  </span>
                </button>
              ))}
            </div>
            <article ref={panel} key={s.title} className="scroll-mt-24 overflow-hidden rounded-2xl border border-white/10 bg-navy" aria-live="polite">
              <div className="relative aspect-[16/8]">
                <img src={img(`svc${i + 1}`)} alt="" className="h-full w-full object-cover" />
                <div className="shade-b absolute inset-0" />
                <div className="absolute inset-x-0 bottom-0 p-6 sm:p-9">
                  <p className="kicker">{s.subtitle}</p>
                  <h3 className="mt-1 font-display text-4xl font-semibold text-cream sm:text-5xl">{s.title}</h3>
                </div>
              </div>
              <div className="space-y-7 p-6 sm:p-9">
                <p className="font-display text-2xl leading-snug text-cream">{s.lead}</p>
                {s.warning && <Warn>{s.warning}</Warn>}
                <div><p className="kicker mb-4">What we can do</p><Bullets items={s.offerings} /></div>
                <div className="border-l-2 border-gold pl-5"><p className="kicker">How to start</p><p className="mt-1 text-[15px] leading-7 text-cream">{s.next}</p></div>
                <p className="text-sm leading-6 text-mist">{s.note}</p>
                <StaffLink>Ask online staff</StaffLink>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="band band-c">
        <div className="wrap">
          <SectionHead kicker="Games / Gatherings / Good company" title="Give the room a reason to meet">A host gives your members something to do together. Staff can help arrange these events while the booking page is being planned.</SectionHead>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {eventIdeas.map((e, n) => (
              <article key={e.title} className="img-card group">
                <div className="aspect-[4/5]"><img src={img(evPics[n])} alt="" loading="lazy" className="h-full w-full object-cover" /></div>
                <div className="shade-b absolute inset-0" />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <h3 className="h-card">{e.title}</h3>
                  <p className="mt-2 text-[15px] leading-6 text-cream/80">{e.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="band band-a">
        <div className="wrap">
          <SectionHead kicker="Before you begin" title="Simple terms. Clear expectations." />
          <div className="mt-12 grid gap-10 md:grid-cols-3">
            {[['Ask for a quote.', 'Most services have a minimum price, but the final cost depends on the job.'], ['Allow time.', 'Planning can take a few hours to a few days. When experts are busy, requests are handled in order.'], ['Stay safe.', "Agree on duties, payment, and access first. Follow Xat's rules, and use official Trade for Xat payments."]].map(([t, d]) => (
              <div key={t}><div className="h-px w-12 bg-gold" /><h3 className="h-card mt-6">{t}</h3><p className="mt-3 text-[15px] leading-7 text-cream/75">{d}</p></div>
            ))}
          </div>
          <div className="mt-12"><StaffLink ghost>Talk to Market staff</StaffLink></div>
        </div>
      </section>
    </>
  )
}
