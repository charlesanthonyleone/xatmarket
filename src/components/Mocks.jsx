// xat-style visuals built from REAL xat assets (smileys, avatars, app icons, planet).
import { Link } from 'react-router-dom'
import { CHAT, SM, AV, IC } from '../img.js'
import { adPackages, services, eventIdeas, paidRoles, revivalSteps } from '../data.js'
import { ventures } from '../ventures.js'

const navy = { background: 'linear-gradient(90deg,#000099,#000050)' }
const Pill = ({ c, children }) => <span className="pill w-full" style={{ background: c }}>{children}</span>

// Faithful static recreation of the xat chat box (embed.html) for the Market group
export function HeroChat() {
  const msgs = [
    { av: 9, u: 'Market', t: <>Welcome to <b>Market</b> <img src={SM('smile')} alt="(smile)" className="inline size-5 align-middle" /></>, i: true },
    { av: 4, u: 'xat', t: <>Advertising · Community Setup · Community Revival · Get Paid · Ideas <img src={SM('party')} alt="(party)" className="inline size-5 align-middle" /></> },
  ]
  const users = [['Main Owner', '#7a4fd0', [[9, 'Market'], [4, 'Prince']]], ['Staff', '#6c757d', [[13, 'host'], [18, 'builder']]], ['Members', '#1e90ff', [[2, 'guest'], [16, 'member'], [7, 'visitor']]]]
  return (
    <div className="rounded-md bg-[#f2f2f2] p-2 text-[#212529] shadow-[0_30px_70px_-25px_rgba(0,0,0,.9)] ring-1 ring-white/20" role="img" aria-label="The Market chat box on xat">
      <div className="grid grid-cols-[1fr_118px] gap-2 sm:grid-cols-[1fr_150px]">
        <div className="flex h-[230px] flex-col border border-[#c9c9c9] bg-white sm:h-[270px]">
          <div className="flex gap-2 p-2"><img src={IC('navbar_help')} alt="" className="size-7" /><div className="text-[12.5px] leading-tight"><p>Help</p><p className="font-bold italic">Market brings Xat communities together with people who can help.</p></div></div>
          {msgs.map((m) => <div key={m.u} className="flex gap-2 px-2 py-1"><img src={AV(m.av)} alt="" className="size-[30px]" /><div className="min-w-0 text-[12.5px] leading-snug"><p className="text-[#555]">{m.u}</p><p>{m.t}</p></div></div>)}
          <div className="mt-auto flex items-center gap-1 border-t border-[#e3e3e3] px-2 py-1 text-[12px] font-bold"><img src={IC('navbar_support')} alt="" className="size-4" />Market</div>
        </div>
        <div className="flex h-[230px] flex-col gap-1 overflow-hidden border border-[#c9c9c9] bg-white p-1 sm:h-[270px]">
          {users.map(([r, c, us]) => <div key={r}><Pill c={c}>{r}</Pill>{us.map(([a, n]) => <p key={n} className="flex items-center gap-1 py-0.5 text-[12px] font-bold"><img src={AV(a)} alt="" className="size-5" />{n}</p>)}</div>)}
          <div className="mt-auto grid grid-cols-2 border-t border-[#e3e3e3] pt-1 text-[10.5px] font-bold"><span>Visitors</span><span>Friends</span></div>
        </div>
      </div>
      <div className="mt-1.5 flex items-center gap-[3px] overflow-hidden rounded bg-[#fff7c2] px-1 py-1 sm:gap-1.5">
        {['smile', 'd', 'red', 'angel', 'nerd', 'love', 'music', 'party', 'coffee', 'dance', 'hat'].map((s, k) => <img key={s} src={SM(s)} alt={`(${s})`} className={`size-6 sm:size-7 ${k > 7 ? 'max-sm:hidden' : ''}`} />)}
        <img src={IC('navbar_store')} alt="" className="ml-auto size-6" />
      </div>
      <div className="mt-1.5 grid grid-cols-[1fr_38px_118px] gap-2 sm:grid-cols-[1fr_44px_150px]">
        <div className="h-[66px] border border-[#c9c9c9] bg-white" />
        <span className="grid place-items-center rounded-full font-btn text-white" style={navy}>↩</span>
        <div className="grid gap-1.5">
          <a href={CHAT} target="_blank" rel="noopener noreferrer" className="grid place-items-center rounded-full font-btn text-[12px] font-bold text-white" style={navy}>Visit chat</a>
          <Link to="/advertising" className="grid place-items-center rounded-full font-btn text-[12px] font-bold text-white" style={navy}>Advertising</Link>
        </div>
      </div>
    </div>
  )
}

function Panel({ title, icon, children, className = '' }) {
  return (
    <div className={`window ${className}`}>
      <div className="flex h-11 items-center gap-2 px-4 text-white" style={{ background: 'linear-gradient(#000044,#000088)' }}>
        <img src={IC(icon)} alt="" className="size-5" /><span className="font-display text-[15px] font-bold lowercase">{title}</span>
        <img src={IC('xatplanet')} alt="" className="ml-auto h-3.5 w-7" />
      </div>
      <div className="bg-[#f9f9f9] p-4 sm:p-5">{children}</div>
    </div>
  )
}
function GroupCard({ title, img, sm, children, hot }) {
  return (
    <div className="gcard">
      <p className="gcard-h truncate px-2">{title}</p>
      <div className="relative mx-2 mt-2 grid h-[74px] place-items-center overflow-hidden rounded-sm" style={{ background: 'radial-gradient(circle at 70% 30%,#1b3a8a,#000014 70%)' }}>
        {img && <img src={IC(img)} alt="" className="h-12 w-auto max-w-[80%]" />}{sm && <img src={SM(sm)} alt="" className="size-11" />}
        {hot && <span className="tag-new absolute right-1 top-1">new</span>}
      </div>
      <p className="px-2 pb-2 pt-1.5 text-[12px] leading-snug text-[#495057]">{children}</p>
    </div>
  )
}

export function AdMock() {
  const sm = ['smile', 'party', 'love', 'd']
  return (
    <Panel title="promoted groups" icon="navbar_groups">
      <div className="grid grid-cols-2 gap-3">
        {adPackages.slice(0, 4).map((p, k) => <GroupCard key={p.name} title={p.name} sm={sm[k]} hot={k === 3}>{p.price}</GroupCard>)}
      </div>
      <p className="mt-3 text-center text-[13px] text-[#212529]">Promoted groups: <a href={CHAT} target="_blank" rel="noopener noreferrer" className="text-[#157ffb]">Market</a></p>
    </Panel>
  )
}
const appIcons = ['apps_trade', 'navbar_settings', 'apps_media', 'navbar_apps', 'navbar_groups', 'navbar_wiki', 'navbar_globe', 'apps_doodle', 'navbar_powers']
export function SetupMock() {
  return (
    <Panel title="community setup" icon="navbar_apps">
      <div className="grid grid-cols-3 gap-2.5">
        {services.slice(0, 9).map((s, k) => <div key={s.title} className="gcard flex flex-col items-center gap-1.5 px-1 py-3"><img src={IC(appIcons[k % 9])} alt="" className="size-9" /><span className="text-[11.5px] font-bold leading-tight">{s.title}</span></div>)}
      </div>
    </Panel>
  )
}
export function EventsMock() {
  const sm = ['party', 'heart', 'coffee', 'music', 'dance', 'hat']
  return (
    <Panel title="events" icon="navbar_powers">
      <div className="grid gap-2.5 sm:grid-cols-2">
        {eventIdeas.map((e, k) => <div key={e.title} className="flex items-center gap-3 rounded-[1.25rem] border border-xline bg-white px-3 py-2.5 transition hover:border-[#157ffb]"><img src={SM(sm[k % 6])} alt="" className="size-9" /><span className="text-[14px] font-bold text-[#212529]">{e.title}</span></div>)}
      </div>
    </Panel>
  )
}
export function RevivalMock() {
  return (
    <Panel title="community revival" icon="navbar_support">
      <ol className="grid gap-2">
        {revivalSteps.map((s, k) => <li key={s.number} className="flex items-center gap-3 rounded border border-xline bg-white px-3 py-2"><span className="grid size-8 shrink-0 place-items-center rounded-full font-btn text-[13px] text-white" style={navy}>{s.number}</span><span className="text-[14px] font-bold text-[#212529]">{s.title}</span>{k === 0 && <img src={SM('angel')} alt="" className="ml-auto size-7" />}</li>)}
      </ol>
    </Panel>
  )
}
const rank = ['#7a4fd0', '#e31717', '#00b168', '#1e90ff', '#ff9f1a', '#a717c9', '#6c757d', '#02a9d2', '#000099', '#c3409b']
export function EarnMock() {
  return (
    <Panel title="wanna get paid?" icon="navbar_trade">
      <div className="grid grid-cols-2 gap-x-4 gap-y-2">
        {paidRoles.map((r, k) => <div key={r.title} className="flex items-center gap-2"><img src={AV([3, 6, 8, 11, 14, 17, 19, 20, 5, 12][k % 10])} alt="" className="size-[30px] shrink-0" /><span className="pill flex-1 truncate py-1 text-[11.5px]" style={{ background: rank[k % 10] }}>{r.title}</span></div>)}
      </div>
      <div className="mt-4 flex items-center justify-center gap-2 rounded-full py-2 font-btn text-[13px] font-bold text-white" style={navy}><img src={IC('apps_trade')} alt="" className="size-5" />Xat Trade</div>
    </Panel>
  )
}
export function ProfileMock() {
  return (
    <Panel title="profile" icon="navbar_register">
      <div className="flex items-center gap-4 rounded border border-xline bg-white p-4">
        <img src={AV(9)} alt="" className="size-20 [image-rendering:pixelated]" />
        <div><p className="text-[20px] font-bold text-[#212529]">Market<span className="example-tag">Example</span></p><p className="text-[13px] text-[#6c757d]">shortname · registered ID</p>
          <div className="mt-2 flex gap-1">{['smile', 'nerd', 'love', 'music'].map((s) => <img key={s} src={SM(s)} alt="" className="size-6" />)}</div></div>
      </div>
    </Panel>
  )
}
const vIcons = { xatcast: 'navbar_globe', xatvision: 'apps_media', 'multi-chatting': 'navbar_groups', xatcodex: 'navbar_settings', 'xat-overlay': 'navbar_powers' }
export function CastMock() {
  return (
    <Panel title="active ideas" icon="navbar_powers">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {ventures.map((v, k) => <Link key={v.slug} to={`/ideas/${v.slug}`}><GroupCard title={v.short} img={vIcons[v.slug]} hot={k === 0}>{v.kicker}</GroupCard></Link>)}
      </div>
    </Panel>
  )
}
export function VentureMock({ slug }) {
  const v = ventures.find((x) => x.slug === slug) || ventures[0]
  const sm = ['smile', 'nerd', 'music', 'party', 'love', 'd']
  return (
    <Panel title={v.short} icon={vIcons[v.slug]}>
      <div className="grid grid-cols-2 gap-3">
        {v.items.slice(0, 4).map((it, k) => <GroupCard key={it.name} title={it.name} sm={sm[k % 6]} />)}
      </div>
    </Panel>
  )
}
export const VisionMock = () => <VentureMock slug="xatvision" />
export const MultiMock = () => <VentureMock slug="multi-chatting" />
export const CodexMock = () => <VentureMock slug="xatcodex" />
export const OverlayMock = () => <VentureMock slug="xat-overlay" />
