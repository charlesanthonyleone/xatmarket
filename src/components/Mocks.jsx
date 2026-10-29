import { useEffect, useState } from 'react'
import { useInView, useTick, useReduced } from '../hooks.js'

const hues = ['#F9C931', '#02A9D2', '#00B168', '#FF8A3D', '#A717C9', '#1E90FF', '#FF3636', '#7CE0FF']
const Av = ({ n = 'A', i = 0, s = 28 }) => (
  <span className="grid shrink-0 place-items-center rounded-full text-[11px] font-semibold text-ink" style={{ width: s, height: s, background: hues[i % hues.length] }}>{n[0]}</span>
)

export function Window({ title, children, className = '', right }) {
  return (
    <div className={`window ${className}`}>
      <div className="flex h-12 items-center gap-3 border-b-[3px] border-white/15 bg-gradient-to-r from-xblue to-xcyan px-4">
        <span className="flex gap-1.5"><i className="size-3 rounded-full bg-xred" /><i className="size-3 rounded-full bg-gold" /><i className="size-3 rounded-full bg-xgreen" /></span>
        <span className="truncate text-[13px] font-bold text-white">{title}</span><span className="example-tag" title="Illustrative example: names and numbers are made up">Example</span>
        <span className="ml-auto shrink-0 text-[12px] font-bold text-white">{right}</span>
      </div>
      {children}
    </div>
  )
}

// Rolling chat feed: shows the last `show` messages, adds one every `ms` while visible.
export function ChatFeed({ lines, show = 5, ms = 2200, active = true, typing = true }) {
  const t = useTick(ms, active)
  const reduce = useReduced()
  const start = reduce ? 0 : t
  const vis = Array.from({ length: show }, (_, k) => ({ ...lines[(start + k) % lines.length], key: start + k }))
  return (
    <div className="flex flex-col gap-3.5">
      {vis.map((m, k) => (
        <div key={m.key} className={`flex items-start gap-3 ${k === show - 1 ? 'msg-in' : ''}`}>
          <Av n={m.u} i={m.c ?? m.u.length} />
          <div className="min-w-0">
            <p className="text-[12.5px] font-semibold" style={{ color: hues[(m.c ?? m.u.length) % hues.length] }}>{m.u} {m.r && <span className="ml-1 rounded bg-white/[.07] px-1.5 py-px text-[10.5px] font-medium text-mist">{m.r}</span>}</p>
            <p className="mt-0.5 text-[14px] leading-6 text-cream/85">{m.t}</p>
          </div>
        </div>
      ))}
      {typing && !reduce && <div className="flex items-center gap-2 pl-11 text-[12px] text-mist"><span className="flex gap-1"><i className="dot-b size-1.5 rounded-full bg-mist" /><i className="dot-b size-1.5 rounded-full bg-mist" style={{ animationDelay: '.2s' }} /><i className="dot-b size-1.5 rounded-full bg-mist" style={{ animationDelay: '.4s' }} /></span>someone is typing</div>}
    </div>
  )
}

const heroLines = [
  { u: 'Nova', r: 'Owner', t: 'Tonight: trivia at 9. Prize is 500 xats 🎉', c: 0 },
  { u: 'kiwi', t: 'count me in. who is hosting?', c: 1 },
  { u: 'Marlo', r: 'Host', t: 'me! bring your friends 👋', c: 2 },
  { u: 'Sable', t: 'just found this chat from the homepage promo', c: 4 },
  { u: 'Nova', r: 'Owner', t: 'welcome Sable ✦ grab a seat', c: 0 },
  { u: 'Juno', r: 'Builder', t: 'new bot is live — try !rank', c: 5 },
  { u: 'kiwi', t: 'it works 😂 rank 12 already', c: 1 },
  { u: 'Ezra', t: 'can someone help set up a wiki for us?', c: 3 },
  { u: 'Marlo', r: 'Host', t: 'ask Market staff, they set ours up', c: 2 },
  { u: 'Ivy', r: 'Manager', t: 'event schedule is pinned above ↑', c: 6 },
]
const rooms = [['Market', 128], ['Trivia Night', 46], ['Builders', 31], ['Revival HQ', 19], ['Music Lounge', 64]]

export function HeroChat() {
  const [ref, on] = useInView()
  const t = useTick(2600, on)
  const online = 312 + ((t * 7) % 23)
  return (
    <div ref={ref}>
      <Window title="xat.com/Market" right={<span className="flex items-center gap-2"><span className="relative flex size-2"><span className="ping absolute inset-0 rounded-full bg-emerald-400" /><span className="relative size-2 rounded-full bg-emerald-400" /></span>{online} online</span>}>
        <div className="grid sm:grid-cols-[180px_1fr]">
          <aside className="hidden border-r border-white/[.07] p-3 sm:block">
            <p className="px-2 pb-2 pt-1 text-[11px] font-medium uppercase tracking-wider text-mist/70">Rooms</p>
            {rooms.map(([r, n], k) => (
              <div key={r} className={`flex items-center justify-between rounded-lg px-2.5 py-2 text-[13px] ${k === 0 ? 'bg-white/[.06] text-cream' : 'text-cream/60'}`}>
                <span className="truncate"># {r}</span><span className="text-[11px] text-mist">{n + ((t + k) % 5)}</span>
              </div>
            ))}
          </aside>
          <div className="flex h-[420px] flex-col">
            <div className="flex-1 overflow-hidden p-5"><ChatFeed lines={heroLines} show={6} ms={2600} active={on} /></div>
            <div className="m-4 mt-0 flex items-center gap-3 rounded-xl border border-white/10 bg-ink/60 px-4 py-3 text-[13.5px] text-mist">Say hello to the Market…<span className="ml-auto rounded-md bg-cream px-2.5 py-1 text-[12px] font-semibold text-ink">Send</span></div>
          </div>
        </div>
      </Window>
    </div>
  )
}

export function AdMock() {
  const [ref, on] = useInView()
  const t = useTick(1800, on)
  return (
    <div ref={ref}>
      <Window title="xat.com · Homepage promotion" right="Live">
        <div className="p-5 sm:p-6">
          <p className="text-[12px] font-medium uppercase tracking-wider text-mist/70">Promoted groups</p>
          <div className="mt-4 space-y-2.5">
            {['YourChat', 'Lounge', 'Gamers', 'Music'].map((g, k) => (
              <div key={g} className={`flex items-center gap-3 rounded-xl border px-4 py-3 ${k === 0 ? 'border-gold/50 bg-gold/[.07]' : 'border-white/[.07] bg-white/[.02]'}`}>
                <Av n={g} i={k} s={32} />
                <div className="min-w-0 flex-1"><p className="text-[14px] font-semibold text-cream">{g}</p><p className="text-[12px] text-mist">{k === 0 ? 'Promoted by Market' : 'Promoted'}</p></div>
                <span className="text-[13px] tabular-nums text-cream/80">{k === 0 ? 40 + ((t * 3) % 19) : 12 + k * 5} online</span>
              </div>
            ))}
          </div>
          <div className="mt-6 rounded-xl border border-white/[.07] p-4">
            <div className="flex justify-between text-[12.5px] text-mist"><span>Promo time used</span><span>Weekend package</span></div>
            <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10"><div className="progress h-full rounded-full bg-gold" /></div>
          </div>
        </div>
      </Window>
    </div>
  )
}

export function SetupMock() {
  const [ref, on] = useInView()
  const t = useTick(1500, on)
  const items = ['Chat theme & layout', 'Staff and ranks', 'Welcome bot', 'Event calendar', 'Wiki page']
  const done = useReduced() ? items.length : (t % (items.length + 3))
  return (
    <div ref={ref}>
      <Window title="Community setup · checklist" right={`${Math.min(done, items.length)}/${items.length}`}>
        <div className="p-5 sm:p-6">
          {items.map((x, k) => (
            <div key={x} className="flex items-center gap-4 border-b border-white/[.06] py-3.5 last:border-0">
              <span className={`grid size-6 place-items-center rounded-full border transition ${k < done ? 'border-gold bg-gold text-ink' : 'border-white/20 text-transparent'}`}>
                <svg viewBox="0 0 16 16" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="m3.5 8.5 3 3 6-7" /></svg>
              </span>
              <span className={`text-[14.5px] transition ${k < done ? 'text-cream' : 'text-mist'}`}>{x}</span>
              {k === done && <span className="ml-auto text-[12px] text-gold">in progress</span>}
            </div>
          ))}
        </div>
      </Window>
    </div>
  )
}

export function EventsMock() {
  const ev = [['Fri', '21:00', 'Trivia night', 'Marlo'], ['Sat', '19:00', 'Music hour', 'Ivy'], ['Sat', '22:00', 'Karaoke', 'Nova'], ['Sun', '18:00', 'New member welcome', 'Juno']]
  return (
    <Window title="Events · this week">
      <div className="divide-y divide-white/[.06] p-2">
        {ev.map(([d, h, n, who], k) => (
          <div key={n} className="flex items-center gap-4 px-4 py-4">
            <div className="w-12 text-center"><p className="text-[11px] uppercase text-mist">{d}</p><p className="font-display text-2xl text-cream">{h.slice(0, 2)}</p></div>
            <div className="min-w-0 flex-1"><p className="text-[14.5px] font-semibold text-cream">{n}</p><p className="text-[12.5px] text-mist">Hosted by {who} · {h}</p></div>
            {k === 0 && <span className="rounded-full bg-gold/15 px-2.5 py-1 text-[11px] font-semibold text-gold">Next</span>}
          </div>
        ))}
      </div>
    </Window>
  )
}

export function RevivalMock() {
  const [ref, on] = useInView()
  return (
    <div ref={ref}>
      <Window title="Your chat · activity" right="last 12 weeks">
        <div className="p-5 sm:p-6">
          <div className="flex items-end justify-between">
            <div><p className="text-[12.5px] text-mist">Daily visitors</p><p className="font-display text-5xl text-cream">184</p></div>
            <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-[12.5px] font-semibold text-emerald-300">+ 3.4×</span>
          </div>
          <svg viewBox="0 0 400 150" className="mt-5 w-full" aria-hidden="true">
            {[30, 70, 110].map((y) => <line key={y} x1="0" x2="400" y1={y} y2={y} stroke="rgba(255,255,255,.06)" />)}
            <line x1="150" x2="150" y1="10" y2="140" stroke="rgba(210,173,102,.5)" strokeDasharray="3 4" />
            <text x="156" y="22" fill="#d2ad66" fontSize="11">Fresh start</text>
            {on && <path pathLength="1" className="draw" d="M0 112 L40 118 L80 124 L120 128 L150 130 L190 116 L230 98 L270 84 L310 62 L350 48 L400 30" fill="none" stroke="#f2f0eb" strokeWidth="2" />}
          </svg>
          <div className="mt-4 grid grid-cols-3 gap-3 border-t border-white/[.07] pt-4 text-center">
            {[['Returning', '61%'], ['Events / wk', '4'], ['Staff', '7']].map(([a, b]) => <div key={a}><p className="font-display text-2xl text-cream">{b}</p><p className="text-[11.5px] text-mist">{a}</p></div>)}
          </div>
        </div>
      </Window>
    </div>
  )
}

export function EarnMock() {
  const [ref, on] = useInView()
  const t = useTick(2000, on)
  const jobs = [['Host a trivia night', '600 xats'], ['Design a chat theme', '1,200 xats'], ['Build a welcome bot', '2,000 xats'], ['Manage weekend events', '3,500 xats'], ['Edit a group wiki', '800 xats']]
  return (
    <div ref={ref}>
      <Window title="Market · open requests" right={`${jobs.length} new`}>
        <div className="p-3">
          {jobs.map(([j, p], k) => (
            <div key={j} className={`flex items-center gap-4 rounded-xl px-4 py-3.5 transition ${k === t % jobs.length ? 'bg-white/[.05]' : ''}`}>
              <Av n={j} i={k + 2} s={30} />
              <p className="min-w-0 flex-1 truncate text-[14.5px] text-cream">{j}</p>
              <span className="font-display text-xl text-gold">{p}</span>
            </div>
          ))}
        </div>
      </Window>
    </div>
  )
}

export function ProfileMock() {
  return (
    <Window title="Profile · Marlo">
      <div className="p-6">
        <div className="flex items-center gap-4"><Av n="Marlo" i={2} s={56} /><div><p className="font-display text-3xl text-cream">Marlo</p><p className="text-[13px] text-mist">Host · Event manager</p></div></div>
        <div className="mt-6 grid grid-cols-3 gap-3 border-y border-white/[.07] py-5 text-center">
          {[['Events', '42'], ['Chats helped', '9'], ['Vouches', '17']].map(([a, b]) => <div key={a}><p className="font-display text-3xl text-cream">{b}</p><p className="text-[11.5px] text-mist">{a}</p></div>)}
        </div>
        <p className="mt-5 text-[12px] font-medium uppercase tracking-wider text-mist/70">Recent work</p>
        {['Trivia night · Lounge', 'Karaoke weekend · Music', 'Welcome team · Gamers'].map((x) => <p key={x} className="flex items-center gap-3 border-b border-white/[.06] py-3 text-[14px] text-cream/85 last:border-0"><span className="h-px w-3 bg-gold" />{x}</p>)}
      </div>
    </Window>
  )
}

export function CastMock() {
  const [ref, on] = useInView()
  const t = useTick(1700, on)
  const pins = [[22, 38], [48, 30], [55, 52], [72, 40], [80, 62], [33, 60]]
  const dots = []
  for (let y = 0; y < 12; y++) for (let x = 0; x < 30; x++) {
    const nx = x / 30, ny = y / 12
    const land = (nx > .1 && nx < .32 && ny > .15 && ny < .55) || (nx > .2 && nx < .32 && ny > .55 && ny < .9) || (nx > .42 && nx < .6 && ny > .12 && ny < .45) || (nx > .45 && nx < .58 && ny > .45 && ny < .85) || (nx > .6 && nx < .88 && ny > .12 && ny < .55) || (nx > .78 && nx < .9 && ny > .65 && ny < .85)
    if (land) dots.push([x, y])
  }
  const news = ['Markets open higher in Asia', 'Storm system tracked over Atlantic', 'Oil holds steady after talks', 'Ceasefire talks resume', 'Heat record set in Europe']
  return (
    <div ref={ref}>
      <Window title="XatCast · NewsCast" right={<span className="text-warn">● LIVE</span>}>
        <div className="relative border-b border-white/[.07] p-4">
          <svg viewBox="0 0 300 120" className="w-full" aria-hidden="true">
            {dots.map(([x, y]) => <circle key={`${x}-${y}`} cx={x * 10 + 5} cy={y * 10 + 5} r="1.6" fill="rgba(242,240,235,.22)" />)}
            {pins.map(([x, y], k) => (
              <g key={k} transform={`translate(${x * 3} ${y * 1.2})`}>
                {k === t % pins.length && <circle r="4" fill="none" stroke="#d2ad66" className="ping" style={{ transformOrigin: 'center', transformBox: 'fill-box' }} />}
                <circle r="2.6" fill={k === t % pins.length ? '#d2ad66' : '#f2f0eb'} />
              </g>
            ))}
          </svg>
        </div>
        <div className="overflow-hidden border-b border-white/[.07] py-2.5">
          <div className="ticker flex w-max gap-10 whitespace-nowrap text-[12.5px] text-cream/70">{[...news, ...news].map((n, k) => <span key={k}><span className="mr-2 text-gold">◆</span>{n}</span>)}</div>
        </div>
        <div className="h-[178px] overflow-hidden p-4"><ChatFeed active={on} show={3} ms={2400} typing={false} lines={[
          { u: 'atlas', t: 'that storm track just shifted north', c: 5 }, { u: 'Rhea', r: 'Manager', t: 'filter: weather · atlantic — pinned', c: 6 }, { u: 'tomas', t: 'markets reacting already', c: 3 }, { u: 'Lin', t: 'source? want to read it', c: 1 }, { u: 'Rhea', r: 'Manager', t: 'linked in the feed ↑', c: 6 }]} /></div>
      </Window>
    </div>
  )
}

export function VisionMock() {
  const [ref, on] = useInView()
  const t = useTick(3000, on)
  const ch = [['XatArt', 'Leonardo da Vinci · 1 hr'], ['XatWar', 'The Great War in photographs'], ['XatSports', 'Classic finals, on rotation'], ['XatMusic', 'Late-night jazz, 1920s–40s']]
  const a = t % ch.length
  return (
    <div ref={ref}>
      <Window title="XatVision · Broadcast" right={<span className="text-warn">● ON AIR</span>}>
        <div className="grid sm:grid-cols-[1.4fr_1fr]">
          <div className="border-b border-white/[.07] p-4 sm:border-b-0 sm:border-r">
            <div className="relative grid aspect-video place-items-center overflow-hidden rounded-xl border border-white/[.07] bg-[radial-gradient(120%_90%_at_30%_20%,#1c2438,#0a0e17)]">
              <p key={a} className="msg-in px-6 text-center font-display text-3xl text-cream sm:text-4xl">{ch[a][0]}</p>
              <span className="absolute bottom-3 left-3 rounded bg-ink/80 px-2 py-1 text-[11px] text-cream/80">Now: {ch[a][1]}</span>
            </div>
            <div className="mt-3 h-1 overflow-hidden rounded-full bg-white/10"><div className="progress h-full bg-gold" /></div>
          </div>
          <div className="p-2">
            {ch.map(([c, s], k) => (
              <div key={c} className={`rounded-lg px-3 py-3 transition ${k === a ? 'bg-white/[.06]' : ''}`}>
                <p className={`text-[13.5px] font-semibold ${k === a ? 'text-gold' : 'text-cream/80'}`}>{c}</p>
                <p className="truncate text-[12px] text-mist">{s}</p>
              </div>
            ))}
          </div>
        </div>
      </Window>
    </div>
  )
}

export function MultiMock() {
  const [ref, on] = useInView()
  const sets = [
    [{ u: 'Nova', t: 'trivia in 10!', c: 0 }, { u: 'kiwi', t: 'ready', c: 1 }, { u: 'Ivy', t: 'saving seats', c: 6 }, { u: 'Sable', t: 'hi all', c: 4 }],
    [{ u: 'Juno', t: 'bot patch pushed', c: 5 }, { u: 'Ezra', t: 'testing now', c: 3 }, { u: 'Juno', t: 'thanks!', c: 5 }, { u: 'Lin', t: 'looks good', c: 1 }],
    [{ u: 'Rhea', t: 'new track up', c: 6 }, { u: 'tomas', t: 'love this one', c: 3 }, { u: 'Marlo', t: 'turn it up', c: 2 }, { u: 'atlas', t: '🎶', c: 5 }],
  ]
  return (
    <div ref={ref}>
      <Window title="Multi-Chatting · 3 chats">
        <div className="grid grid-cols-1 divide-y divide-white/[.07] sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {['Lounge', 'Builders', 'Music'].map((r, k) => (
            <div key={r} className="h-[250px] overflow-hidden p-4 max-sm:h-[180px]">
              <p className="mb-4 text-[12.5px] font-semibold text-cream"># {r}</p>
              <ChatFeed lines={sets[k]} show={3} ms={2100 + k * 500} active={on} typing={false} />
            </div>
          ))}
        </div>
      </Window>
    </div>
  )
}

export function CodexMock() {
  const [ref, on] = useInView()
  const reduce = useReduced()
  const prompt = 'Build my chat a welcome bot, an events page, and a members area.'
  const [n, setN] = useState(reduce ? prompt.length : 0)
  useEffect(() => {
    if (!on || reduce) return
    const id = setInterval(() => setN((x) => (x >= prompt.length + 40 ? 0 : x + 1)), 55)
    return () => clearInterval(id)
  }, [on, reduce])
  const steps = ['Chat page', 'Welcome bot', 'Events page', 'Members area']
  const done = Math.max(0, Math.floor((n - prompt.length) / 9))
  return (
    <div ref={ref}>
      <Window title="XatCodex · build">
        <div className="p-5 sm:p-6">
          <div className="rounded-xl border border-white/10 bg-ink/60 p-4 font-mono text-[13px] leading-6 text-cream/90">
            <span className="text-gold">›</span> {prompt.slice(0, Math.min(n, prompt.length))}<span className="dot-b ml-0.5 inline-block h-4 w-1.5 translate-y-0.5 bg-cream/70" />
          </div>
          <div className="mt-5 space-y-2">
            {steps.map((s, k) => (
              <div key={s} className="flex items-center gap-3 text-[14px]">
                <span className={`size-2 rounded-full ${k < done || reduce ? 'bg-gold' : 'bg-white/15'}`} />
                <span className={k < done || reduce ? 'text-cream' : 'text-mist'}>{s}</span>
                <span className="ml-auto text-[12px] text-mist">{k < done || reduce ? 'ready' : 'queued'}</span>
              </div>
            ))}
          </div>
        </div>
      </Window>
    </div>
  )
}

export function OverlayMock() {
  const [ref, on] = useInView()
  return (
    <div ref={ref}>
      <Window title="World of Warcraft · Xat Overlay addon">
        <div className="relative aspect-[16/10] overflow-hidden bg-[linear-gradient(180deg,#1b2333_0%,#121a28_55%,#0b1019_100%)]">
          <svg viewBox="0 0 400 250" className="absolute inset-0 h-full w-full" preserveAspectRatio="none" aria-hidden="true">
            <path d="M0 170 L60 120 L110 150 L170 90 L230 140 L290 100 L350 135 L400 110 L400 250 L0 250Z" fill="#141c2b" />
            <path d="M0 205 L80 175 L160 195 L240 170 L320 190 L400 175 L400 250 L0 250Z" fill="#0d131f" />
            <circle cx="320" cy="50" r="18" fill="#ead2a0" opacity=".5" />
          </svg>
          <div className="absolute bottom-3 left-3 w-[62%] rounded-lg border border-white/10 bg-ink/75 p-3 backdrop-blur sm:w-[48%]">
            <p className="mb-2 text-[11px] font-semibold text-gold">Xat · Guild chat</p>
            <div className="h-[104px] overflow-hidden [&_p]:!text-[12px] [&_p]:!leading-5"><ChatFeed active={on} show={3} ms={2300} typing={false} lines={[
              { u: 'Thrall', t: 'raid at 8, bring flasks', c: 2 }, { u: 'Mira', t: 'on my way', c: 6 }, { u: 'Kael', t: 'need 1 healer', c: 5 }, { u: 'Mira', t: 'I can heal', c: 6 }]} /></div>
          </div>
          <div className="absolute right-3 top-3 rounded-md bg-ink/70 px-2.5 py-1 text-[11px] text-cream/80">Lua addon · v0.1</div>
        </div>
      </Window>
    </div>
  )
}

export function VentureMock({ slug }) {
  return { xatcast: <CastMock />, xatvision: <VisionMock />, 'multi-chatting': <MultiMock />, xatcodex: <CodexMock />, 'xat-overlay': <OverlayMock /> }[slug] || null
}
