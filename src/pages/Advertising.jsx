import { PageHero, Section, SectionHead, StaffLink, Steps, Reveal, ArrowUpRight } from '../components/ui.jsx'
import { AdMock } from '../components/Mocks.jsx'
import Calculator from '../components/Calculator.jsx'
import { adPackages, adPromoLimits, adDollars, adStorePacks, adOutside, adSteps } from '../data.js'

const ext = (href, t) => <a href={href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-cream underline decoration-gold/50 underline-offset-4 hover:decoration-gold">{t}<ArrowUpRight className="size-3.5" /></a>

export default function Advertising() {
  return (
    <>
      <PageHero kicker="Market Advertising" title="We run the promo." accent="You pay once." visual={<AdMock />}>
        <p className="lede">Choose a package and pay us once through Xat Trade. We buy the promo time and manage it for you.</p>
        <p className="mt-5 font-display text-2xl italic text-goldsoft">On Xat · set prices · Outside Xat · ask for a quote</p>
        <div className="mt-9 flex flex-wrap gap-3"><StaffLink>Talk to online staff</StaffLink><a href="#calculator" className="btn-ghost">Xat value calculator</a></div>
      </PageHero>

      <Section tone="b">
        <SectionHead kicker="On-Xat Promotion" title="Promote on Xat">We use Xat's official Store → Promotion button to put your chat on the Xat homepage.</SectionHead>
        <h3 className="mt-16 font-display text-4xl text-cream sm:text-5xl">On-Xat Packages</h3>
        <p className="mt-2 text-mist">Choose a package</p>
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {adPackages.map((p, n) => (
            <Reveal as="article" key={p.name} delay={(n % 2) * 80} className={`flex flex-col rounded-2xl border p-7 sm:p-9 ${n === 3 ? 'border-gold/50 bg-panel2' : 'border-white/10 bg-panel'}`}>
              <div className="flex flex-wrap items-end justify-between gap-4 border-b border-white/[.08] pb-6">
                <div><h4 className="font-display text-4xl text-cream">{p.name}</h4><p className="mt-1 text-[15px] text-mist">{p.tag}</p></div>
                <div className="text-right"><p className="font-display text-5xl leading-none text-gold">{p.price}</p><p className="mt-1.5 text-sm text-mist">{p.per}</p></div>
              </div>
              <ul className="mt-6 space-y-3">{p.points.map((t) => <li key={t} className="flex gap-3 text-[15px] leading-7 text-cream/85"><span className="mt-[13px] h-px w-3 shrink-0 bg-gold" />{t}</li>)}</ul>
              <div className="mt-auto pt-7"><div className="space-y-2 rounded-xl border border-white/[.06] bg-ink/50 p-5 text-sm leading-6 text-mist">{p.math.map((m, k) => <p key={m} className={k === p.math.length - 1 ? 'border-t border-white/10 pt-2 text-goldsoft' : ''}>{m}</p>)}</div></div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section tone="a">
        <div className="grid gap-14 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
          <SectionHead kicker="Official Xat promotion" title="Xat Promo Rules"><p>Xat's <span className="font-semibold text-cream">Store → Promotion</span> button puts a group on the homepage. We buy and manage those promo slots for you.</p></SectionHead>
          <ol className="border-t border-white/10">
            {adPromoLimits.map((l, n) => <Reveal as="li" key={l} delay={n * 40} className="flex gap-6 border-b border-white/10 py-5 text-[15.5px] leading-7 text-cream/85"><span className="w-8 shrink-0 font-display text-2xl text-gold">{String(n + 1).padStart(2, '0')}</span>{l}</Reveal>)}
          </ol>
        </div>
      </Section>

      <Section id="calculator" tone="b">
        <SectionHead kicker="Official Xat store" title="How We Calculate Value">
          <p>We use Xat's official prices. The $200 pack gives 33,000 xats and 1,980 subscriber days. At 14 xats per day, that is <strong className="text-cream">60,720 xats in total value</strong>. That works out to about <strong className="text-cream">$3.29 per 1,000 xats, or 303.6 xats per $1</strong>.</p>
        </SectionHead>
        <Reveal className="mt-14"><Calculator /></Reveal>
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-panel p-6 sm:p-8"><h3 className="h3">Official store packs</h3>
            <table className="mt-5 w-full text-[15px]"><tbody>{adStorePacks.map((r) => <tr key={r.usd} className="border-b border-white/[.08] last:border-0"><td className="py-3 font-semibold text-cream">{r.usd}</td><td className="py-3 text-mist">{r.xats} + {r.days}d</td><td className="py-3 text-right text-goldsoft">{r.total.replace(' equivalent', '')}</td></tr>)}</tbody></table></div>
          <div className="rounded-2xl border border-white/10 bg-panel p-6 sm:p-8"><h3 className="h3">Package dollar estimates</h3>
            <table className="mt-5 w-full text-[15px]"><tbody>{adDollars.map((r) => <tr key={r.name} className="border-b border-white/[.08] last:border-0"><td className="py-3 font-semibold text-cream">{r.name}</td><td className="py-3 text-mist">{r.xats}</td><td className="py-3 text-right text-goldsoft">{r.base}</td></tr>)}</tbody></table></div>
        </div>
        <div className="mt-10 max-w-3xl space-y-4 text-[14.5px] leading-7 text-mist">
          <p>The 24/7 minimum is 99,999 xats. That is about $329 in total official value, or about $600 if you buy only raw xats. The cost is 72,000 xats for promotion plus 28,000+ xats for staff. Turkish and Romanian promo costs 50 xats per hour. Most other languages cost 20. Tell us if your chat is not English. We only use Xat Trade. We never ask for passwords or Transfer-first payments.</p>
          <p>Need xats? See Xat's recognized {ext('https://xat.wiki/Resellers', 'reseller list')}. Resellers often charge $3.00–$3.50 per 1,000 xats. Our package math still uses official Xat store prices.</p>
          <p>{ext('https://xat.com/store#!buyxats', 'Official Xat store')}</p>
        </div>
      </Section>

      <Section tone="a">
        <SectionHead kicker="Five easy steps" title="How to Order" />
        <div className="mt-16"><Steps items={adSteps} cols={5} /></div>
      </Section>

      <div className="border-t border-white/[.07] bg-ink2 py-16"><div className="wrap flex items-center gap-6"><div className="h-px flex-1 bg-gold/40" /><p className="text-center font-display text-3xl italic text-goldsoft sm:text-4xl">Everything below is outside Xat</p><div className="h-px flex-1 bg-gold/40" /></div></div>

      <Section tone="a">
        <SectionHead kicker="Off-Platform Advertising" title="Promote Outside Xat">
          <p>Websites, games, streams, search, and paid ads. These are custom jobs and are not included in the On-Xat packages above.</p>
          <p className="mt-3">Xat homepage promotion only reaches Xat users. To reach people elsewhere, tell us what you need and we will give you a custom quote.</p>
        </SectionHead>
        <div className="mt-16 grid border-t border-white/[.08] md:grid-cols-2">
          {adOutside.map((o, n) => (
            <Reveal as="article" key={o.title} delay={(n % 2) * 60} className={`border-b border-white/[.08] py-10 ${n % 2 === 0 ? 'md:border-r md:pr-12' : 'md:pl-12'}`}>
              <div className="flex items-baseline justify-between gap-3"><h3 className="font-display text-4xl text-cream">{o.title}</h3><span className="shrink-0 text-[13px] text-goldsoft">Ask for a quote</span></div>
              <p className="copy mt-3">{o.text}</p>
            </Reveal>
          ))}
        </div>
        <div className="mt-14 flex gap-4 rounded-2xl border border-gold/30 bg-gold/[.05] p-6 text-[15px] leading-7 text-cream/85 sm:p-8">
          <svg viewBox="0 0 24 24" className="mt-1 size-6 shrink-0 text-gold" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><path d="M12 3 4 6v6c0 4.5 3.4 8.3 8 9 4.6-.7 8-4.5 8-9V6l-8-3Z" /><path d="m9 12 2 2 4-4" /></svg>
          <p><strong className="text-cream">Important:</strong> Market Hub is independent. Xat does not own or endorse us. We follow Xat's rules. We only accept payment through Xat's official Trade app. We never ask for your password or for payment outside Trade. You cannot sell ranks while your chat is promoted.</p>
        </div>
      </Section>

      <section className="relative isolate overflow-hidden border-t border-white/[.07] bg-ink2 py-28 text-center sm:py-40">
        <div className="hairline-grid absolute inset-0 -z-10" aria-hidden="true" />
        <Reveal className="wrap">
          <p className="eyebrow">Ready to advertise?</p>
          <h2 className="h-display mt-5 text-[46px] sm:text-7xl">Talk to Market Staff</h2>
          <p className="lede mt-6">Tell us which package you want.</p>
          <p className="mt-1 text-mist">Send your group link, busiest hours, and language.</p>
          <div className="mt-10 flex justify-center"><StaffLink>Talk to online staff</StaffLink></div>
          <p className="mt-5 text-sm text-mist">Opens Xat Market in a new tab</p>
        </Reveal>
      </section>
    </>
  )
}
