import { Link, useParams } from 'react-router-dom'
import { PageHero, Warn, Section, Reveal, ArrowRight, ArrowUpRight, StaffLink } from '../components/ui.jsx'
import IdeasInvite from '../components/IdeasInvite.jsx'
import NotFound from './NotFound.jsx'
import { ventures } from '../ventures.js'

export default function Venture() {
  const { slug } = useParams()
  const n = ventures.findIndex((v) => v.slug === slug)
  if (n < 0) return <NotFound />
  const v = ventures[n], next = ventures[(n + 1) % ventures.length]
  return (
    <>
      <PageHero kicker={`Active Ideas · ${v.kicker}`} title={v.name} accent={v.tag}>
        {v.status && <p className="mb-8 inline-flex items-center gap-2 rounded-full border border-emerald-400/40 bg-emerald-500/15 px-4 py-1.5 text-[14px] font-bold uppercase tracking-widest text-emerald-400"><svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="3"><path d="m5 12.5 4.5 4.5L19 7" /></svg>{v.status}</p>}
        {v.credit && <p className="mb-6 font-display text-2xl font-semibold text-goldsoft">{v.credit}</p>}
        {v.link && <a href={v.link} target="_blank" rel="noopener noreferrer" className="btn-ghost mb-6 mr-4 inline-flex items-center gap-2">Visit XatDeck.com <ArrowUpRight className="size-4" /></a>}
        {v.warning && <div className="mb-8"><Warn strong={v.warning.strong}>{v.warning.text}</Warn></div>}
        <StaffLink>Talk to Market staff</StaffLink>
      </PageHero>

      <Section tone="b">
        <Reveal><p className="max-w-4xl font-display text-[30px] leading-[1.3] text-cream sm:text-[40px]">{v.intro}</p></Reveal>

        {v.steps && <ol className="mt-20 grid gap-x-12 gap-y-12 md:grid-cols-2">
          {v.steps.map((s, k) => <Reveal as="li" key={s.name} delay={(k % 2) * 80} className="border-t border-white/15 pt-7"><span className="font-display text-5xl text-gold">{String(k + 1).padStart(2, '0')}</span><h3 className="h3 mt-5">{s.name}</h3><p className="copy mt-3">{s.text}</p></Reveal>)}
        </ol>}

        <div className="mt-20 grid border-t border-white/[.08] md:grid-cols-2">
          {v.items.map((it, k) => (
            <Reveal as="article" key={it.name} delay={(k % 2) * 60} className={`border-b border-white/[.08] py-10 ${k % 2 === 0 ? 'md:border-r md:pr-12' : 'md:pl-12'}`}>
              <h3 className="font-display text-4xl text-cream">{it.name}</h3>
              <p className="copy mt-3 text-[16px]">{it.text}</p>
            </Reveal>
          ))}
        </div>

        {v.tiers && <div className="mt-24">
          <h3 className="font-display text-4xl text-cream sm:text-5xl">Membership tiers</h3>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {v.tiers.map((t, k) => (
              <Reveal key={t.price} delay={k * 80} className={`dcard p-8 ${k === 1 ? 'hot' : ''}`}>
                <p className="font-mono text-[11.5px] font-bold uppercase tracking-widest text-mint">Tier {k + 1}</p>
                <p className="mt-3 font-display text-6xl font-extrabold text-sun">{t.price}<span className="font-sans text-base text-mist"> / month</span></p>
                <ul className="mt-7 space-y-3 border-t border-white/[.08] pt-6">{t.perks.map((p) => <li key={p} className="flex gap-3 text-[15px] text-cream/85"><span className="mt-[11px] h-px w-3 shrink-0 bg-mint" />{p}</li>)}</ul>
              </Reveal>
            ))}
          </div>
          <p className="mt-6 text-[14px] leading-6 text-mist">{v.tierNote}</p>
        </div>}

        {v.footnote && <p className="lede mt-14 max-w-3xl border-l-2 border-gold pl-6">{v.footnote}</p>}
      </Section>

      <Link to={`/ideas/${next.slug}`} className="tone-y group block transition hover:brightness-125">
        <div className="wrap flex items-center justify-between gap-6 py-20 sm:py-24">
          <div><p className="eyebrow">Next idea</p><p className="h-display mt-3 text-5xl sm:text-7xl">{next.name}</p></div>
          <span className="grid size-16 shrink-0 place-items-center rounded-full border border-white/15 text-cream transition group-hover:border-gold group-hover:text-gold sm:size-20"><ArrowRight className="size-6 transition group-hover:translate-x-1" /></span>
        </div>
      </Link>

      <IdeasInvite />
    </>
  )
}
