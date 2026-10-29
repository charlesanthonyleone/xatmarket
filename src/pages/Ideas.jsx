import { Link } from 'react-router-dom'
import { PageHero, SectionHead, Steps, Warn, Arrow } from '../components/ui.jsx'
import IdeasInvite from '../components/IdeasInvite.jsx'
import { ventures } from '../ventures.js'
import { xatSuggestions, ideasWanted } from '../data.js'
import { img } from '../img.js'

export default function Ideas() {
  return (
    <>
      <PageHero image="pg_ideas" kicker="XatMarket / Active projects" title="Real ventures." accent="Built around Xat." tall>
        <p className="body text-lg">We do not build pages on Xat—we build worlds around it. First we create the experience: a news platform, a live world map, a broadcast network. Then we embed Xat at its center, and keep building the world around it. These projects are active now, and each needs managers, staff, and owners to run it.</p>
        <p className="mt-5 font-display text-xl italic text-goldsoft">Paid in real money · Registered businesses · Xat embedded at the center</p>
      </PageHero>

      <section className="band band-a">
        <div className="wrap">
          <SectionHead kicker="Read this first" title="How these projects work." />
          <div className="mt-12"><Steps items={[
            { title: 'Real pay.', text: 'These projects pay in real money, not xats. Each is registered as a formal business—an LLC, a nonprofit, or whichever structure fits the project.' },
            { title: 'Real work.', text: 'Nothing is promised on day one. Pay grows as each project earns, and it earns because the people running it show up and deliver.' },
            { title: 'Built around Xat.', text: 'We build the world first, embed Xat at its center, and keep building around it. Xat is where the community lives and gathers.' },
          ]} /></div>
        </div>
      </section>

      <section className="bg-ink">
        {ventures.map((v, n) => (
          <article key={v.slug} className={`relative isolate overflow-hidden border-t border-white/10 ${n % 2 ? 'band-b' : ''}`}>
            <div className="wrap grid items-center gap-10 py-20 sm:py-24 lg:grid-cols-[1.25fr_1fr] lg:gap-14">
              <Link to={`/ideas/${v.slug}`} className={`img-card block aspect-[16/9] ${n % 2 ? 'lg:order-2' : ''}`} aria-label={v.name}>
                <img src={img(v.image)} alt="" loading="lazy" className="h-full w-full object-cover" />
              </Link>
              <div>
                <p className="kicker">{v.kicker}{v.tag ? ` · ${v.tag}` : ''}</p>
                <h2 className="mt-2 font-display text-5xl font-semibold leading-none text-cream sm:text-6xl">{v.name}</h2>
                {v.warning && <div className="mt-6"><Warn strong={v.warning.strong}>{v.warning.text}</Warn></div>}
                <p className="body mt-6 line-clamp-5">{v.intro}</p>
                <p className="mt-5 font-display text-xl italic text-goldsoft">{v.items.map((i) => i.name).join(' · ')}</p>
                <Link to={`/ideas/${v.slug}`} className="btn-ghost mt-8">Explore {v.short} <Arrow /></Link>
              </div>
            </div>
          </article>
        ))}
      </section>

      <section className="band band-c">
        <div className="wrap">
          <SectionHead kicker="Suggestions for Xat" title="Ideas only Xat can build">These are not our projects. They are suggestions we have shared with Xat, because they need Xat itself or a large developer team to build.</SectionHead>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {xatSuggestions.map((s) => (
              <a key={s.name} href={s.href} target="_blank" rel="noopener noreferrer" className="panel group block p-7 transition hover:border-gold/50 hover:bg-white/[.05] sm:p-8">
                <h3 className="h-card">{s.name}</h3>
                <p className="mt-3 text-[15px] leading-7 text-cream/75">{s.text}</p>
                <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-gold">Read on the Xat forum <Arrow className="size-3.5" /></span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="band band-a">
        <div className="wrap">
          <SectionHead kicker="Open seats" title="Who we're looking for" />
          <div className="mt-12"><Steps items={ideasWanted} /></div>
        </div>
      </section>

      <IdeasInvite />
    </>
  )
}
