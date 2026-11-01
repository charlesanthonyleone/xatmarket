// Photo cards: each service/idea is a small moonlit island photograph, framed like a print.
const B = import.meta.env.BASE_URL + 'cards/'
export function PhotoCard({ img, label, caption, className = '' }) {
  return (
    <figure className={`photo-card ${className}`}>
      <div className="pc-img"><img src={`${B}${img}.webp`} alt="" loading="lazy" width="1024" height="768" /></div>
      {(label || caption) && <figcaption>{label && <span className="pc-label">{label}</span>}{caption && <span className="pc-cap">{caption}</span>}</figcaption>}
    </figure>
  )
}
export const HeroChat = () => <PhotoCard img="c_ideas" />
export const AdMock = () => <PhotoCard img="c_advertising" label="Advertising" caption="We run the promo. You pay once." />
export const SetupMock = () => <PhotoCard img="c_setup" label="Community Setup" caption="Build a chat worth coming back to." />
export const EventsMock = () => <PhotoCard img="c_setup" label="Community Setup" />
export const RevivalMock = () => <PhotoCard img="c_revival" label="Community Revival" caption="A fresh start for your Xat chat." />
export const LeoneMock = () => <PhotoCard img="c_leonebot" label="LeoneBot" caption="Sleeps until real trouble starts." />
export const EarnMock = () => <PhotoCard img="c_earn" label="Get Paid" caption="Bring what you do best." />
export const ProfileMock = () => <PhotoCard img="c_earn" label="Get Paid" />
export const CastMock = () => <PhotoCard img="c_ideas" label="Ideas" caption="Real ventures. Built around Xat." />
const vimg = { xatcast: 'v_cast', xatvision: 'v_vision', xatdeck: 'v_multi', xatcodex: 'v_codex', 'xat-overlay': 'v_overlay' }
export function VentureMock({ slug }) { return <PhotoCard img={vimg[slug] || 'c_ideas'} /> }
export const VisionMock = () => <VentureMock slug="xatvision" />
export const MultiMock = () => <VentureMock slug="xatdeck" />
export const CodexMock = () => <VentureMock slug="xatcodex" />
export const OverlayMock = () => <VentureMock slug="xat-overlay" />
