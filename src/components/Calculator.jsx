import { useEffect, useRef, useState } from 'react'
import { adPackages } from '../data.js'
import { useReduced } from '../hooks.js'

const packs = [
  { usd: 50, xats: 8000, days: 480 },
  { usd: 100, xats: 16500, days: 990 },
  { usd: 200, xats: 33000, days: 1980 },
]
const RATE = 14
const fmt = (n) => Math.round(n).toLocaleString('en-US')
const pkgs = adPackages.map((p) => ({ name: p.name, xats: Number(p.price.replace(/[^0-9]/g, '')) }))

function useCount(target) {
  const reduce = useReduced()
  const [v, setV] = useState(target)
  const from = useRef(target)
  useEffect(() => {
    if (reduce) { setV(target); from.current = target; return }
    const a = from.current, t0 = performance.now(); let raf
    const step = (now) => { const k = Math.min(1, (now - t0) / 600), e = 1 - Math.pow(1 - k, 3); const x = a + (target - a) * e; setV(x); from.current = x; if (k < 1) raf = requestAnimationFrame(step) }
    raf = requestAnimationFrame(step); return () => cancelAnimationFrame(raf)
  }, [target, reduce])
  return v
}

export default function Calculator() {
  const [p, setP] = useState(2)
  const [qty, setQty] = useState(1)
  const pk = packs[p]
  const xats = pk.xats * qty, days = pk.days * qty, dayVal = days * RATE, total = xats + dayVal, usd = pk.usd * qty
  const per1k = usd / (total / 1000), perUsd = total / usd
  const shown = useCount(total)
  const xPct = (xats / total) * 100
  return (
    <div className="window">
      <div className="flex h-12 items-center justify-between border-b border-white/[.07] px-6">
        <span className="text-[13px] font-semibold text-cream">Xat value calculator</span>
        <span className="text-[12.5px] text-mist">Official store pack · {RATE} xats per subscriber day</span>
      </div>
      <div className="grid lg:grid-cols-[1fr_1.15fr]">
        <div className="border-b border-white/[.07] p-6 sm:p-9 lg:border-b-0 lg:border-r">
          <p className="text-[13px] font-semibold text-cream/90">Store pack</p>
          <div role="radiogroup" aria-label="Store pack" className="mt-3 grid grid-cols-3 gap-1 rounded-xl border border-white/10 bg-ink/60 p-1">
            {packs.map((x, n) => (
              <button key={x.usd} type="button" role="radio" aria-checked={n === p} onClick={() => setP(n)}
                className={`rounded-lg px-2 py-3 text-center transition ${n === p ? 'bg-cream text-ink' : 'text-cream/75 hover:bg-white/[.05]'}`}>
                <span className="block font-display text-3xl leading-none">${x.usd}</span>
                <span className={`mt-1.5 block text-[11px] ${n === p ? 'text-ink/60' : 'text-mist'}`}>{fmt(x.xats)} + {fmt(x.days)}d</span>
              </button>
            ))}
          </div>
          <div className="mt-8">
            <label htmlFor="qty" className="text-[13px] font-semibold text-cream/90">How many packs</label>
            <div className="mt-3 flex items-center gap-4">
              <button type="button" aria-label="Fewer packs" onClick={() => setQty((q) => Math.max(1, q - 1))} className="grid size-11 place-items-center rounded-full border border-white/15 text-xl text-cream hover:border-white/35">−</button>
              <span className="w-10 text-center font-display text-4xl text-cream tabular-nums">{qty}</span>
              <button type="button" aria-label="More packs" onClick={() => setQty((q) => Math.min(10, q + 1))} className="grid size-11 place-items-center rounded-full border border-white/15 text-xl text-cream hover:border-white/35">+</button>
              <input id="qty" type="range" min="1" max="10" value={qty} onChange={(e) => setQty(Number(e.target.value))} className="ml-2 min-w-0 flex-1" />
            </div>
          </div>
          <dl className="mt-9 text-[15px]">
            <div className="flex justify-between border-b border-white/[.08] py-3.5"><dt className="text-mist">Xats</dt><dd className="tabular-nums text-cream">{fmt(xats)}</dd></div>
            <div className="flex justify-between border-b border-white/[.08] py-3.5"><dt className="text-mist">Days × {RATE}</dt><dd className="tabular-nums text-cream">{fmt(days)} × {RATE} = {fmt(dayVal)}</dd></div>
            <div className="flex justify-between py-3.5"><dt className="text-mist">You pay</dt><dd className="tabular-nums text-cream">${fmt(usd)}</dd></div>
          </dl>
        </div>
        <div className="p-6 sm:p-9" aria-live="polite">
          <p className="text-[13px] font-semibold text-cream/90">Total value</p>
          <p className="mt-2 font-display text-[64px] leading-none text-gold tabular-nums sm:text-[88px]">{fmt(shown)}</p>
          <p className="mt-2 text-mist">xats equivalent</p>
          <div className="mt-6 flex h-2 overflow-hidden rounded-full bg-white/10">
            <div className="h-full bg-cream transition-all duration-500" style={{ width: `${xPct}%` }} />
            <div className="h-full bg-gold transition-all duration-500" style={{ width: `${100 - xPct}%` }} />
          </div>
          <div className="mt-2.5 flex justify-between text-[12.5px] text-mist"><span><i className="mr-1.5 inline-block size-2 rounded-full bg-cream" />Xats {fmt(xats)}</span><span><i className="mr-1.5 inline-block size-2 rounded-full bg-gold" />Days value {fmt(dayVal)}</span></div>
          <div className="mt-7 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-white/10 bg-white/10">
            <div className="bg-panel p-4"><p className="font-display text-3xl text-cream tabular-nums">${per1k.toFixed(2)}</p><p className="text-[13px] text-mist">per 1,000 xats</p></div>
            <div className="bg-panel p-4"><p className="font-display text-3xl text-cream tabular-nums">{perUsd.toFixed(1)}</p><p className="text-[13px] text-mist">xats per $1</p></div>
          </div>
          <p className="mt-8 text-[13px] font-semibold text-cream/90">What it covers</p>
          <ul className="mt-3 space-y-3">
            {pkgs.map((k) => {
              const ok = total >= k.xats, pct = Math.min(100, (total / k.xats) * 100)
              return (
                <li key={k.name}>
                  <div className="flex justify-between text-[14px]"><span className={ok ? 'text-cream' : 'text-mist'}>{k.name} · {fmt(k.xats)}</span><span className={`tabular-nums ${ok ? 'text-gold' : 'text-mist'}`}>{ok ? `×${Math.floor(total / k.xats)}` : `${Math.round(pct)}%`}</span></div>
                  <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-white/10"><div className={`h-full rounded-full transition-all duration-500 ${ok ? 'bg-gold' : 'bg-white/40'}`} style={{ width: `${pct}%` }} /></div>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </div>
  )
}
