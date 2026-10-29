import { useState } from 'react'
import { adPackages } from '../data.js'

const packs = [
  { usd: 50, xats: 8000, days: 480 },
  { usd: 100, xats: 16500, days: 990 },
  { usd: 200, xats: 33000, days: 1980 },
]
const RATE = 14
const fmt = (n) => Math.round(n).toLocaleString('en-US')
const pkgs = adPackages.map((p) => ({ name: p.name, xats: Number(p.price.replace(/[^0-9]/g, '')) }))

export default function Calculator() {
  const [p, setP] = useState(2)
  const [qty, setQty] = useState(1)
  const pk = packs[p]
  const xats = pk.xats * qty, days = pk.days * qty, dayVal = days * RATE, total = xats + dayVal, usd = pk.usd * qty
  const per1k = usd / (total / 1000), perUsd = total / usd
  return (
    <div className="overflow-hidden rounded-2xl border border-gold/30 bg-gradient-to-b from-deep to-navy shadow-[0_40px_80px_-40px_rgba(0,0,0,.9)]">
      <div className="grid lg:grid-cols-[1fr_1.1fr]">
        <div className="border-b border-white/10 p-6 sm:p-9 lg:border-b-0 lg:border-r">
          <h3 className="font-display text-3xl font-semibold text-cream">Xat value calculator</h3>
          <p className="mt-2 text-[15px] leading-7 text-mist">Official store pack · {RATE} xats per subscriber day</p>
          <fieldset className="mt-8">
            <legend className="text-sm font-semibold text-cream/90">Store pack</legend>
            <div className="mt-3 grid grid-cols-3 gap-2">
              {packs.map((x, n) => (
                <button key={x.usd} type="button" aria-pressed={n === p} onClick={() => setP(n)}
                  className={`rounded-xl border px-3 py-4 text-center transition ${n === p ? 'border-gold bg-gold/15 text-cream' : 'border-white/15 text-cream/80 hover:border-gold/50'}`}>
                  <span className="block font-display text-3xl font-semibold">${x.usd}</span>
                  <span className="mt-1 block text-xs text-mist">{fmt(x.xats)} + {fmt(x.days)}d</span>
                </button>
              ))}
            </div>
          </fieldset>
          <div className="mt-7">
            <label htmlFor="qty" className="flex items-baseline justify-between text-sm font-semibold text-cream/90"><span>How many packs</span><span className="font-display text-2xl text-gold">{qty}</span></label>
            <input id="qty" type="range" min="1" max="10" value={qty} onChange={(e) => setQty(Number(e.target.value))} className="mt-3 w-full" />
          </div>
          <dl className="mt-8 space-y-3 text-[15px]">
            <div className="flex justify-between border-b border-white/10 pb-3"><dt className="text-mist">Xats</dt><dd className="text-cream">{fmt(xats)}</dd></div>
            <div className="flex justify-between border-b border-white/10 pb-3"><dt className="text-mist">Days × {RATE}</dt><dd className="text-cream">{fmt(days)} × {RATE} = {fmt(dayVal)}</dd></div>
            <div className="flex justify-between"><dt className="text-mist">You pay</dt><dd className="text-cream">${fmt(usd)}</dd></div>
          </dl>
        </div>
        <div className="p-6 sm:p-9" aria-live="polite">
          <p className="text-sm font-semibold text-cream/90">Total value</p>
          <p className="mt-1 font-display text-6xl font-semibold leading-none text-gold sm:text-7xl">{fmt(total)}</p>
          <p className="mt-1 text-mist">xats equivalent</p>
          <div className="mt-6 grid grid-cols-2 gap-3">
            <div className="rounded-xl border border-white/10 p-4"><p className="font-display text-3xl text-cream">${per1k.toFixed(2)}</p><p className="text-sm text-mist">per 1,000 xats</p></div>
            <div className="rounded-xl border border-white/10 p-4"><p className="font-display text-3xl text-cream">{perUsd.toFixed(1)}</p><p className="text-sm text-mist">xats per $1</p></div>
          </div>
          <p className="mt-8 text-sm font-semibold text-cream/90">What it covers</p>
          <ul className="mt-3 space-y-2">
            {pkgs.map((k) => {
              const ok = total >= k.xats, pct = Math.min(100, (total / k.xats) * 100)
              return (
                <li key={k.name}>
                  <div className="flex justify-between text-[15px]"><span className={ok ? 'text-cream' : 'text-mist'}>{k.name} · {fmt(k.xats)}</span><span className={ok ? 'text-gold' : 'text-mist'}>{ok ? `×${Math.floor(total / k.xats)}` : `${Math.round(pct)}%`}</span></div>
                  <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-white/10"><div className="h-full rounded-full bg-gold transition-all duration-500" style={{ width: `${pct}%` }} /></div>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </div>
  )
}
