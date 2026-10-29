import { useRef, useState } from 'react'
import { PageHero, SectionHead, Section, StaffLink, Bullets, Warn, Reveal } from '../components/ui.jsx'
import { SetupMock, EventsMock } from '../components/Mocks.jsx'
import { services, eventIdeas } from '../data.js'

export default function Setup() {
  const [i, setI] = useState(0)
  const panel = useRef(null)
  const s = services[i]
  const pick = (n) => { setI(n); if (window.innerWidth < 1024) panel.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }) }
  return (
    <>
      <PageHero kicker="Market / Community services" title="Build a chat" accent="worth coming back to." visual={<SetupMock />}>
        <p className="lede">A good Xat group needs more than a room. Find the people who can set it up, run events, reward the team, and keep it alive.</p>
        <p className="mt-6 font-display text-2xl italic text-goldsoft">9 ways to build · Real people · real Xat work</p>
        <div className="mt-9"><a href="#services" className="btn-gold">Explore the services</a></div>
      </PageHero>

      <Section id="services" tone="b">
        <SectionHead kicker="Choose what you need" title="Explore the services" />
        <div className="mt-14 grid gap-10 lg:grid-cols-[minmax(0,.72fr)_minmax(0,1.28fr)] lg:gap-14">
          <div className="border-t border-white/[.08]" role="tablist" aria-label="Services">
            {services.map((x, n) => (
              <button key={x.title} type="button" role="tab" aria-selected={n === i} onClick={() => pick(n)}
                className={`group flex w-full items-center gap-5 border-b border-white/[.08] py-4 pl-1 pr-3 text-left transition ${n === i ? 'text-cream' : 'text-cream/60 hover:text-cream'}`}>
                <span className={`w-7 font-display text-xl ${n === i ? 'text-gold' : 'text-mist'}`}>{String(n + 1).padStart(2, '0')}</span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[16.5px] font-semibold">{x.title}</span>
                  <span className="mt-0.5 block text-[14px] text-mist">{x.subtitle}</span>
                </span>
                <span className={`h-px transition-all duration-300 ${n === i ? 'w-8 bg-gold' : 'w-0'}`} />
              </button>
            ))}
          </div>
          <article ref={panel} key={s.title} className="rise scroll-mt-24 self-start rounded-2xl border border-white/10 bg-panel p-7 sm:p-10" aria-live="polite">
            <p className="eyebrow">{s.subtitle}</p>
            <h3 className="mt-3 font-display text-5xl text-cream sm:text-6xl">{s.title}</h3>
            <p className="mt-6 text-[19px] leading-8 text-cream/90">{s.lead}</p>
            {s.warning && <div className="mt-7"><Warn>{s.warning}</Warn></div>}
            <p className="mt-9 text-[15px] font-semibold text-cream">What we can do</p>
            <div className="mt-3"><Bullets items={s.offerings} /></div>
            <div className="mt-8 border-l-2 border-gold pl-5"><p className="text-[15px] font-semibold text-cream">How to start</p><p className="mt-1 text-[15.5px] leading-7 text-cream/80">{s.next}</p></div>
            <p className="mt-7 text-[14px] leading-6 text-mist">{s.note}</p>
            <div className="mt-8"><StaffLink>Ask online staff</StaffLink></div>
          </article>
        </div>
      </Section>

      <Section tone="a">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <SectionHead kicker="Games / Gatherings / Good company" title="Give the room a reason to meet">A host gives your members something to do together. Staff can help arrange these events while the booking page is being planned.</SectionHead>
            <dl className="mt-10 divide-y divide-white/[.08] border-y border-white/[.08]">
              {eventIdeas.map((e) => <div key={e.title} className="py-5"><dt className="h3">{e.title}</dt><dd className="copy mt-1.5">{e.text}</dd></div>)}
            </dl>
          </div>
          <Reveal delay={120}><EventsMock /></Reveal>
        </div>
      </Section>

      <Section tone="b">
        <SectionHead kicker="Before you begin" title="Simple terms. Clear expectations." />
        <div className="mt-16 grid gap-12 md:grid-cols-3 md:gap-0 md:divide-x md:divide-white/[.08]">
          {[['Ask for a quote.', 'Most services have a minimum price, but the final cost depends on the job.'], ['Allow time.', 'Planning can take a few hours to a few days. When experts are busy, requests are handled in order.'], ['Stay safe.', "Agree on duties, payment, and access first. Follow Xat's rules, and use official Trade for Xat payments."]].map(([t, d], k) => (
            <Reveal key={t} delay={k * 80} className="md:px-10 md:first:pl-0 md:last:pr-0"><h3 className="h3">{t}</h3><p className="copy mt-3">{d}</p></Reveal>
          ))}
        </div>
        <div className="mt-14"><StaffLink ghost>Talk to Market staff</StaffLink></div>
      </Section>
    </>
  )
}
