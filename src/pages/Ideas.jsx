import { PageHero, SectionHead, Section, Steps, Warn, GoLink, ArrowUpRight, Reveal } from '../components/ui.jsx'
import { CastMock, VentureMock } from '../components/Mocks.jsx'
import IdeasInvite from '../components/IdeasInvite.jsx'
import { ventures } from '../ventures.js'
import { xatSuggestions, ideasWanted } from '../data.js'

export default function Ideas() {
  return (
    <>
      <PageHero kicker="XatMarket / Active projects" title="Real ventures." accent="Built around Xat." visual={<CastMock />}>
        <p className="lede">We do not build pages on Xat—we build worlds around it. First we create the experience: a news platform, a live world map, a broadcast network. Then we embed Xat at its center, and keep building the world around it. These projects are active now, and each needs managers, staff, and owners to run it.</p>
        <p className="mt-6 font-display text-2xl italic text-goldsoft">Paid in real money · Registered businesses · Xat embedded at the center</p>
      </PageHero>

      <Section tone="b">
        <SectionHead kicker="Read this first" title="How these projects work." />
        <div className="mt-16"><Steps items={[
          { title: 'Real pay.', text: 'These projects pay in real money, not xats. Each is registered as a formal business—an LLC, a nonprofit, or whichever structure fits the project.' },
          { title: 'Real work.', text: 'Nothing is promised on day one. Pay grows as each project earns, and it earns because the people running it show up and deliver.' },
          { title: 'Built around Xat.', text: 'We build the world first, embed Xat at its center, and keep building around it. Xat is where the community lives and gathers.' },
        ]} /></div>
      </Section>

      {ventures.map((v, n) => (
        <section key={v.slug} className={`border-t border-white/[.07] py-24 sm:py-32 ${n % 2 ? 'tone-b' : 'tone-a'}`}>
          <div className="wrap grid items-center gap-14 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
            <Reveal className={`min-w-0 ${n % 2 ? 'lg:order-2' : ''}`}>
              <p className="eyebrow">{v.kicker}{v.tag ? ` · ${v.tag}` : ''}</p>
              <h2 className="h2 mt-4">{v.name}</h2>
              {v.warning && <div className="mt-7"><Warn strong={v.warning.strong}>{v.warning.text}</Warn></div>}
              <p className="lede mt-7 line-clamp-5">{v.intro}</p>
              <p className="mt-6 font-display text-2xl italic text-goldsoft">{v.items.map((i) => i.name).join(' · ')}</p>
              <GoLink to={`/ideas/${v.slug}`} className="btn-ghost mt-9">Explore {v.short}</GoLink>
            </Reveal>
            <Reveal delay={120} className="min-w-0"><VentureMock slug={v.slug} /></Reveal>
          </div>
        </section>
      ))}

      <Section tone="b">
        <SectionHead kicker="Suggestions for Xat" title="Ideas only Xat can build">These are not our projects. They are suggestions we have shared with Xat, because they need Xat itself or a large developer team to build.</SectionHead>
        <div className="mt-16 grid gap-5 md:grid-cols-3">
          {xatSuggestions.map((s, n) => (
            <Reveal key={s.name} delay={n * 80}>
              <a href={s.href} target="_blank" rel="noopener noreferrer" className="group flex h-full flex-col rounded-2xl border border-white/10 bg-panel p-8 transition hover:border-white/25">
                <h3 className="font-display text-3xl text-cream">{s.name}</h3>
                <p className="copy mt-3">{s.text}</p>
                <span className="mt-auto inline-flex items-center gap-1.5 pt-8 text-[14.5px] font-semibold text-gold">Read on the Xat forum <ArrowUpRight className="size-3.5 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></span>
              </a>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section tone="a">
        <SectionHead kicker="Open seats" title="Who we're looking for" />
        <div className="mt-16"><Steps items={ideasWanted} /></div>
      </Section>

      <IdeasInvite />
    </>
  )
}
