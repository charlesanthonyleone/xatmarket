import { Link, useParams } from 'react-router-dom'
import { PageHero, Warn, Steps, Arrow } from '../components/ui.jsx'
import IdeasInvite from '../components/IdeasInvite.jsx'
import NotFound from './NotFound.jsx'
import { ventures } from '../ventures.js'
import { img } from '../img.js'

export default function Venture() {
  const { slug } = useParams()
  const n = ventures.findIndex((v) => v.slug === slug)
  if (n < 0) return <NotFound />
  const v = ventures[n], next = ventures[(n + 1) % ventures.length]
  return (
    <>
      <PageHero image={v.image} kicker={`Active Ideas · ${v.kicker}`} title={v.name} accent={v.tag}>
        {v.warning && <Warn strong={v.warning.strong}>{v.warning.text}</Warn>}
      </PageHero>

      <section className="band band-a pt-12 sm:pt-16">
        <div className="wrap">
          <p className="max-w-4xl font-display text-2xl leading-snug text-cream sm:text-3xl">{v.intro}</p>

          {v.steps && <div className="mt-16"><ol className="grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 md:grid-cols-2">
            {v.steps.map((s, k) => <li key={s.name} className="bg-navy p-7 sm:p-9"><span className="font-display text-5xl italic text-gold/80">{k + 1}</span><h3 className="h-card mt-4">{s.name}</h3><p className="mt-3 text-[15px] leading-7 text-cream/75">{s.text}</p></li>)}
          </ol></div>}

          <div className="mt-16 grid gap-6 md:grid-cols-2">
            {v.items.map((it) => (
              <article key={it.name} className="panel p-7 sm:p-9">
                <div className="h-px w-12 bg-gold" />
                <h3 className="mt-6 font-display text-3xl font-semibold text-cream">{it.name}</h3>
                <p className="mt-3 text-[15px] leading-7 text-cream/75">{it.text}</p>
              </article>
            ))}
          </div>

          {v.tiers && <div className="mt-20">
            <p className="kicker">Membership tiers</p>
            <div className="mt-6 grid gap-6 md:grid-cols-3">
              {v.tiers.map((t, k) => (
                <div key={t.price} className={`rounded-2xl border p-8 ${k === 1 ? 'border-gold/60 bg-gradient-to-b from-[#1a2440] to-navy' : 'border-white/10 bg-navy'}`}>
                  <p className="font-display text-6xl font-semibold text-gold">{t.price}<span className="text-xl text-mist"> / month</span></p>
                  <ul className="mt-6 space-y-3">{t.perks.map((p) => <li key={p} className="flex gap-3 text-[15px] text-cream/85"><span className="mt-[9px] size-1.5 shrink-0 rotate-45 bg-gold" />{p}</li>)}</ul>
                </div>
              ))}
            </div>
            <p className="mt-5 text-sm leading-6 text-mist">{v.tierNote}</p>
          </div>}

          {v.footnote && <p className="body mt-10 max-w-3xl border-l-2 border-gold pl-5">{v.footnote}</p>}
        </div>
      </section>

      <Link to={`/ideas/${next.slug}`} className="group relative isolate block overflow-hidden border-t border-white/10">
        <img src={img(next.image)} alt="" loading="lazy" className="absolute inset-0 -z-20 h-full w-full object-cover opacity-50 transition duration-700 group-hover:scale-105 group-hover:opacity-70" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink via-ink/80 to-ink/30" />
        <div className="wrap py-20 sm:py-24"><p className="kicker">Next idea</p><p className="mt-2 flex items-center gap-4 font-display text-5xl font-semibold text-cream sm:text-6xl">{next.name}<Arrow className="size-8 text-gold transition group-hover:translate-x-2" /></p></div>
      </Link>

      <IdeasInvite image={v.image} />
    </>
  )
}
