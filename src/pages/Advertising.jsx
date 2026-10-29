import { PageHero, SectionHead, StaffLink, Arrow } from '../components/ui.jsx'
import Calculator from '../components/Calculator.jsx'
import { adPackages, adPromoLimits, adDollars, adStorePacks, adOutside, adSteps } from '../data.js'
import { img } from '../img.js'

const outPics = ['svc8', 'v_overlay', 'v_vision', 'v_cast']
const ext = (href, t) => <a href={href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-gold underline decoration-gold/40 underline-offset-4 hover:decoration-gold">{t}<Arrow className="size-3.5" /></a>

export default function Advertising() {
  return (
    <>
      <PageHero image="pg_ads" kicker="Market Advertising" title="We run the promo." accent="You pay once.">
        <p className="body text-lg">Choose a package and pay us once through Xat Trade. We buy the promo time and manage it for you.</p>
        <p className="mt-5 font-display text-xl italic text-goldsoft">On Xat · set prices · Outside Xat · ask for a quote</p>
      </PageHero>

      <section className="band band-a">
        <div className="wrap">
          <SectionHead kicker="On-Xat Promotion" title="Promote on Xat">We use Xat's official Store → Promotion button to put your chat on the Xat homepage.</SectionHead>
          <div className="mt-14 text-center"><p className="kicker">Choose a package</p><h3 className="h-section mt-2 text-4xl sm:text-5xl">On-Xat Packages</h3></div>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {adPackages.map((p, n) => (
              <article key={p.name} className={`relative flex flex-col overflow-hidden rounded-2xl border p-7 sm:p-9 ${n === 3 ? 'border-gold/60 bg-gradient-to-br from-[#1a2440] to-navy' : 'border-white/10 bg-navy'}`}>
                <div className="flex flex-wrap items-end justify-between gap-4 border-b border-white/10 pb-6">
                  <div><h4 className="font-display text-4xl font-semibold text-cream">{p.name}</h4><p className="mt-1 text-[15px] text-mist">{p.tag}</p></div>
                  <div className="text-right"><p className="font-display text-5xl font-semibold leading-none text-gold">{p.price}</p><p className="mt-1 text-sm text-mist">{p.per}</p></div>
                </div>
                <ul className="mt-6 space-y-3">{p.points.map((t) => <li key={t} className="flex gap-3 text-[15px] leading-7 text-cream/85"><span className="mt-[11px] size-1.5 shrink-0 rotate-45 bg-gold" />{t}</li>)}</ul>
                <div className="mt-auto pt-7"><div className="space-y-2 rounded-xl bg-ink/60 p-5 text-sm leading-6 text-mist">{p.math.map((m, k) => <p key={m} className={k === p.math.length - 1 ? 'border-t border-white/10 pt-2 text-goldsoft' : ''}>{m}</p>)}</div></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="band band-c">
        <div className="wrap grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
          <div>
            <p className="kicker">Official Xat promotion</p>
            <h2 className="h-section mt-2">Xat Promo Rules</h2>
            <p className="body mt-5">Xat's <span className="font-semibold text-gold">Store → Promotion</span> button puts a group on the homepage. We buy and manage those promo slots for you.</p>
          </div>
          <ol className="space-y-px overflow-hidden rounded-2xl border border-white/10 bg-white/10">
            {adPromoLimits.map((l, n) => <li key={l} className="flex gap-5 bg-navy px-6 py-4 text-[15px] leading-7 text-cream/85"><span className="font-display text-xl italic text-gold/80">{n + 1}</span>{l}</li>)}
          </ol>
        </div>
      </section>

      <section id="calculator" className="band band-a scroll-mt-16">
        <div className="wrap">
          <SectionHead kicker="Official Xat store" title="How We Calculate Value">
            <p>We use Xat's official prices. The $200 pack gives 33,000 xats and 1,980 subscriber days. At 14 xats per day, that is <strong className="text-cream">60,720 xats in total value</strong>. That works out to about <strong className="text-cream">$3.29 per 1,000 xats, or 303.6 xats per $1</strong>.</p>
          </SectionHead>
          <div className="mt-12"><Calculator /></div>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <div className="panel p-6 sm:p-8"><h3 className="h-card">Official store packs</h3>
              <table className="mt-5 w-full text-[15px]"><tbody>{adStorePacks.map((r) => <tr key={r.usd} className="border-b border-white/10 last:border-0"><td className="py-3 font-semibold text-cream">{r.usd}</td><td className="py-3 text-mist">{r.xats} + {r.days}d</td><td className="py-3 text-right text-goldsoft">{r.total.replace(' equivalent', '')}</td></tr>)}</tbody></table></div>
            <div className="panel p-6 sm:p-8"><h3 className="h-card">Package dollar estimates</h3>
              <table className="mt-5 w-full text-[15px]"><tbody>{adDollars.map((r) => <tr key={r.name} className="border-b border-white/10 last:border-0"><td className="py-3 font-semibold text-cream">{r.name}</td><td className="py-3 text-mist">{r.xats}</td><td className="py-3 text-right text-goldsoft">{r.base}</td></tr>)}</tbody></table></div>
          </div>
          <div className="mt-8 max-w-3xl space-y-4 text-sm leading-7 text-mist">
            <p>The 24/7 minimum is 99,999 xats. That is about $329 in total official value, or about $600 if you buy only raw xats. The cost is 72,000 xats for promotion plus 28,000+ xats for staff. Turkish and Romanian promo costs 50 xats per hour. Most other languages cost 20. Tell us if your chat is not English. We only use Xat Trade. We never ask for passwords or Transfer-first payments.</p>
            <p>Need xats? See Xat's recognized {ext('https://xat.wiki/Resellers', 'reseller list')}. Resellers often charge $3.00–$3.50 per 1,000 xats. Our package math still uses official Xat store prices.</p>
            <p>{ext('https://xat.com/store#!buyxats', 'Official Xat store')}</p>
          </div>
        </div>
      </section>

      <section className="band band-b">
        <div className="wrap">
          <SectionHead kicker="Five easy steps" title="How to Order" />
          <ol className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-5">
            {adSteps.map((s, n) => <li key={s} className="bg-navy p-6"><span className="font-display text-5xl italic text-gold/80">{n + 1}</span><p className="mt-4 text-[15px] leading-7 text-cream/85">{s}</p></li>)}
          </ol>
        </div>
      </section>

      <div className="bg-ink py-10"><div className="wrap flex items-center gap-6"><div className="rule-gold flex-1" /><p className="font-display text-xl italic text-goldsoft">Everything below is outside Xat</p><div className="rule-gold flex-1" /></div></div>

      <section className="band band-a pt-10 sm:pt-14">
        <div className="wrap">
          <SectionHead kicker="Off-Platform Advertising" title="Promote Outside Xat">
            <p>Websites, games, streams, search, and paid ads. These are custom jobs and are not included in the On-Xat packages above.</p>
            <p className="mt-3">Xat homepage promotion only reaches Xat users. To reach people elsewhere, tell us what you need and we will give you a custom quote.</p>
          </SectionHead>
          <div className="mt-14 grid gap-6 sm:grid-cols-2">
            {adOutside.map((o, n) => (
              <article key={o.title} className="img-card">
                <div className="aspect-[16/8] overflow-hidden"><img src={img(outPics[n])} alt="" loading="lazy" className="h-full w-full object-cover" /></div>
                <div className="p-6 sm:p-8"><div className="flex items-baseline justify-between gap-3"><h3 className="h-card">{o.title}</h3><span className="font-display italic text-goldsoft">Ask for a quote</span></div><p className="mt-3 text-[15px] leading-7 text-cream/75">{o.text}</p></div>
              </article>
            ))}
          </div>
          <div className="mt-14 flex gap-4 rounded-2xl border border-gold/30 bg-gold/[.06] p-6 text-[15px] leading-7 text-cream/85 sm:p-8">
            <svg viewBox="0 0 24 24" className="mt-1 size-6 shrink-0 text-gold" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><path d="M12 3 4 6v6c0 4.5 3.4 8.3 8 9 4.6-.7 8-4.5 8-9V6l-8-3Z" /><path d="m9 12 2 2 4-4" /></svg>
            <p><strong className="text-cream">Important:</strong> Market Hub is independent. Xat does not own or endorse us. We follow Xat's rules. We only accept payment through Xat's official Trade app. We never ask for your password or for payment outside Trade. You cannot sell ranks while your chat is promoted.</p>
          </div>
        </div>
      </section>

      <section className="relative isolate overflow-hidden py-28 text-center sm:py-36">
        <img src={img('role_promo')} alt="" className="absolute inset-0 -z-20 h-full w-full object-cover opacity-50" loading="lazy" />
        <div className="absolute inset-0 -z-10" style={{ background: 'radial-gradient(70% 90% at 50% 50%, rgba(6,11,24,.6) 0%, rgba(6,11,24,.95) 70%, #060b18 100%)' }} />
        <div className="wrap">
          <p className="kicker">Ready to advertise?</p>
          <h2 className="mt-3 font-display text-5xl font-semibold text-cream sm:text-6xl">Talk to Market Staff</h2>
          <p className="body mt-5">Tell us which package you want.</p>
          <p className="mt-1 text-mist">Send your group link, busiest hours, and language.</p>
          <div className="mt-9 flex justify-center"><StaffLink>Talk to online staff</StaffLink></div>
          <p className="mt-4 text-sm text-mist">Opens Xat Market in a new tab</p>
        </div>
      </section>
    </>
  )
}
