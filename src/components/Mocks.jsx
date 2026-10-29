// XatMarket's own showcase visuals. Names/handles/numbers marked "Example" are invented.
import { Link } from 'react-router-dom'
import { CHAT, SM } from '../img.js'
import { adPackages, services, eventIdeas, paidRoles, revivalSteps } from '../data.js'
import { ventures } from '../ventures.js'
import { Ico, Mark } from './Icons.jsx'

const G = ['linear-gradient(135deg,#ff4f7b,#ff8a3d)', 'linear-gradient(135deg,#2ef2c2,#3d8bff)', 'linear-gradient(135deg,#ffc94d,#ff8a3d)', 'linear-gradient(135deg,#8b7bff,#ff4f7b)', 'linear-gradient(135deg,#2ef2c2,#ffc94d)', 'linear-gradient(135deg,#5fb8ff,#8b7bff)']
const Ex = () => <span className="example-tag">Example</span>
function Av({ name, k = 0, size = 'size-9' }) {
  return <span className={`grid ${size} shrink-0 place-items-center rounded-xl font-display text-[14px] font-extrabold text-[#1a0b1f]`} style={{ background: G[k % G.length] }}>{name.slice(0, 1)}</span>
}
const S = ({ n }) => <img src={SM(n)} alt={`(${n})`} className="inline size-5 align-[-4px]" />

// The Market board: XatMarket's own take on a live community feed of requests and offers.
export function HeroChat() {
  const posts = [
    { u: 'NovaHosts', tag: 'Get Paid', to: '/get-paid', c: '#2ef2c2', t: <>Offering {paidRoles[0].title.toLowerCase()} for weekend game nights <S n="party" /></> },
    { u: 'PixelLounge', tag: 'Advertising', to: '/advertising', c: '#ff8a3d', t: <>Booked the {adPackages[0].name} promo · {adPackages[0].price} xats</> },
    { u: 'QuietCove', tag: 'Revival', to: '/community-revival', c: '#8b7bff', t: <>Our chat went quiet. Step {revivalSteps[0].number}: {revivalSteps[0].title.toLowerCase()} <S n="heart" /></> },
    { u: 'StarRoom', tag: 'Setup', to: '/community-setup', c: '#5fb8ff', t: <>{services[0].title} done, opening tonight <S n="d" /></> },
  ]
  return (
    <div className="window p-0" role="img" aria-label="Example of the Market community board: requests and offers for Market services">
      <div className="flex items-center gap-3 border-b border-white/10 px-5 py-4">
        <Mark className="size-8" />
        <div className="min-w-0"><p className="font-display text-[17px] font-extrabold leading-tight">Market board</p><p className="text-[12px] text-white/60">Requests &amp; offers from the community</p></div>
        <span className="ml-auto flex items-center gap-2 rounded-full bg-mint/15 px-3 py-1 font-mono text-[11px] font-bold uppercase text-mint"><i className="pulse size-2 rounded-full bg-mint" />live<Ex /></span>
      </div>
      <ul className="space-y-2.5 p-4 sm:p-5">
        {posts.map((p, k) => (
          <li key={p.u} className="flex gap-3 rounded-2xl bg-white/[.05] p-3 ring-1 ring-white/[.06]">
            <Av name={p.u} k={k} />
            <div className="min-w-0 flex-1 text-[14px] leading-snug">
              <p className="flex flex-wrap items-center gap-x-2 gap-y-1"><span className="font-bold">{p.u}</span><Ex /><Link to={p.to} className="ml-auto rounded-full px-2 py-0.5 font-mono text-[10.5px] font-bold uppercase text-[#0b0f2e]" style={{ background: p.c }}>{p.tag}</Link></p>
              <p className="mt-1 text-white/80">{p.t}</p>
            </div>
          </li>
        ))}
      </ul>
      <div className="flex items-center gap-2 border-t border-white/10 bg-black/20 px-4 py-3 sm:px-5">
        <span className="flex min-w-0 flex-1 items-center gap-2 truncate rounded-xl bg-white/[.06] px-3 py-2.5 text-[13.5px] text-white/50"><S n="smile" />Ask Market staff anything…</span>
        <a href={CHAT} target="_blank" rel="noopener noreferrer" className="btn-gold !h-10 !rounded-xl !px-4 !text-[14px]"><Ico n="send" className="size-4" />Visit chat</a>
      </div>
    </div>
  )
}

function Panel({ title, icon, children, className = '' }) {
  return (
    <div className={`window ${className}`}>
      <div className="flex h-14 items-center gap-3 border-b border-white/10 px-5">
        <span className="grid size-8 place-items-center rounded-xl text-[#1a0b1f]" style={{ background: G[title.length % G.length] }}><Ico n={icon} className="size-[18px]" strokeWidth={2.2} /></span>
        <span className="font-display text-[16px] font-extrabold">{title}</span>
        <Mark className="ml-auto size-6 opacity-80" />
      </div>
      <div className="p-4 sm:p-5">{children}</div>
    </div>
  )
}
function Tile({ title, icon, sm, children, hot, k = 0 }) {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-white/[.06] p-3 text-left ring-1 ring-white/10 transition hover:ring-sun/60">
      <span className="grid size-10 place-items-center rounded-xl text-[#1a0b1f]" style={{ background: G[k % G.length] }}>{sm ? <img src={SM(sm)} alt="" className="size-7" /> : <Ico n={icon} className="size-5" strokeWidth={2.2} />}</span>
      {hot && <span className="tag-new absolute right-2 top-2">new</span>}
      <p className="mt-2.5 truncate font-display text-[15px] font-bold">{title}</p>
      {children && <p className="mt-0.5 text-[12.5px] leading-snug text-white/65">{children}</p>}
    </div>
  )
}

export function AdMock() {
  return (
    <Panel title="Promotion packages" icon="megaphone">
      <div className="grid grid-cols-2 gap-3">
        {adPackages.slice(0, 4).map((p, k) => <Tile key={p.name} title={p.name} icon="star" k={k} hot={k === 3}>{p.price} {p.per}</Tile>)}
      </div>
      <p className="mt-4 text-center text-[13px] text-white/70">Talk to staff in <a href={CHAT} target="_blank" rel="noopener noreferrer" className="font-bold text-sun hover:underline">Market</a></p>
    </Panel>
  )
}
const svcIcons = ['build', 'users', 'shield', 'calendar', 'star', 'chat', 'layers', 'code', 'spark']
export function SetupMock() {
  return (
    <Panel title="Community setup" icon="build">
      <div className="grid grid-cols-3 gap-2.5">
        {services.slice(0, 9).map((s, k) => <div key={s.title} className="flex flex-col items-center gap-2 rounded-2xl bg-white/[.06] px-1 py-3 text-center ring-1 ring-white/10"><span className="grid size-9 place-items-center rounded-xl text-[#1a0b1f]" style={{ background: G[k % 6] }}><Ico n={svcIcons[k % 9]} className="size-[18px]" strokeWidth={2.2} /></span><span className="text-[11.5px] font-bold leading-tight">{s.title}</span></div>)}
      </div>
    </Panel>
  )
}
export function EventsMock() {
  const sm = ['party', 'heart', 'music', 'd', 'love', 'smile']
  return (
    <Panel title="Events" icon="calendar">
      <div className="grid gap-2.5 sm:grid-cols-2">
        {eventIdeas.map((e, k) => <div key={e.title} className="flex items-center gap-3 rounded-2xl bg-white/[.06] px-3 py-2.5 ring-1 ring-white/10"><img src={SM(sm[k % 6])} alt="" className="size-8" /><span className="text-[14px] font-bold">{e.title}</span></div>)}
      </div>
    </Panel>
  )
}
export function RevivalMock() {
  return (
    <Panel title="Community revival" icon="revive">
      <ol className="grid gap-2">
        {revivalSteps.map((s, k) => <li key={s.number} className="flex items-center gap-3 rounded-2xl bg-white/[.06] px-3 py-2.5 ring-1 ring-white/10"><span className="grid size-9 shrink-0 place-items-center rounded-xl font-display text-[13px] font-extrabold text-[#1a0b1f]" style={{ background: G[k % 6] }}>{s.number}</span><span className="text-[14px] font-bold">{s.title}</span>{k === 0 && <img src={SM('heart')} alt="" className="ml-auto size-7" />}</li>)}
      </ol>
    </Panel>
  )
}
export function EarnMock() {
  return (
    <Panel title="Wanna get paid?" icon="coins">
      <div className="grid grid-cols-2 gap-2">
        {paidRoles.map((r, k) => <div key={r.title} className="flex items-center gap-2 rounded-xl bg-white/[.05] p-1.5 ring-1 ring-white/[.08]"><Av name={r.title} k={k} size="size-7" /><span className="truncate text-[12.5px] font-bold">{r.title}</span></div>)}
      </div>
      <div className="mt-4 flex items-center justify-center gap-2 rounded-2xl bg-mint/15 py-2.5 font-display text-[14px] font-bold text-mint ring-1 ring-mint/40"><Ico n="trade" className="size-5" />Paid through Xat Trade</div>
    </Panel>
  )
}
export function ProfileMock() {
  return (
    <Panel title="Profile" icon="user">
      <div className="flex items-center gap-4 rounded-2xl bg-white/[.06] p-4 ring-1 ring-white/10">
        <Av name="Market" k={0} size="size-20 !text-3xl" />
        <div><p className="text-[20px] font-bold">Market<Ex /></p><p className="text-[13px] text-white/60">shortname · registered ID</p>
          <div className="mt-2 flex gap-1">{['smile', 'd', 'love', 'music'].map((s) => <img key={s} src={SM(s)} alt="" className="size-6" />)}</div></div>
      </div>
    </Panel>
  )
}
const vIcons = { xatcast: 'radio', xatvision: 'tv', 'multi-chatting': 'layers', xatcodex: 'code', 'xat-overlay': 'overlay' }
export function CastMock() {
  return (
    <Panel title="Active ideas" icon="bulb">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {ventures.map((v, k) => <Link key={v.slug} to={`/ideas/${v.slug}`}><Tile title={v.short} icon={vIcons[v.slug]} k={k} hot={k === 0}>{v.kicker}</Tile></Link>)}
      </div>
    </Panel>
  )
}
export function VentureMock({ slug }) {
  const v = ventures.find((x) => x.slug === slug) || ventures[0]
  return (
    <Panel title={v.short} icon={vIcons[v.slug]}>
      <div className="grid grid-cols-2 gap-3">
        {v.items.slice(0, 4).map((it, k) => <Tile key={it.name} title={it.name} icon={vIcons[v.slug]} k={k + 1} />)}
      </div>
    </Panel>
  )
}
export const VisionMock = () => <VentureMock slug="xatvision" />
export const MultiMock = () => <VentureMock slug="multi-chatting" />
export const CodexMock = () => <VentureMock slug="xatcodex" />
export const OverlayMock = () => <VentureMock slug="xat-overlay" />
