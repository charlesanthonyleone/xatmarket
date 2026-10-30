import { useCallback, useEffect, useRef, useState } from 'react'

export const XAT_GROUP = 'Market'
export const XAT_ID = '5610462'
const SRC = `https://xat.com/embed/chat.php#id=${XAT_ID}&gn=${XAT_GROUP}`
const MIN_W = 280, MIN_H = 300, EDGES = ['n', 's', 'e', 'w', 'ne', 'nw', 'se', 'sw']

const Lock = ({ open }) => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="5" y="11" width="14" height="10" rx="2" />
    <path d={open ? 'M8 11V7a4 4 0 0 1 7.6-1.7' : 'M8 11V7a4 4 0 0 1 8 0v4'} />
  </svg>
)

export default function HeroLiveChat() {
  const ref = useRef(null)
  const [show, setShow] = useState(false)
  const [box, setBox] = useState(null) // {x,y,w,h} when unlocked/floating
  const [unlocked, setUnlocked] = useState(false)
  const [spacer, setSpacer] = useState(0)
  const [busy, setBusy] = useState(false)
  const fix = useRef({ dx: 0, dy: 0 })

  useEffect(() => {
    const el = ref.current
    if (!el || !('IntersectionObserver' in window)) { setShow(true); return }
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setShow(true); io.disconnect() } }, { rootMargin: '200px' })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const clamp = useCallback((b) => {
    const vw = window.innerWidth, vh = window.innerHeight
    const w = Math.min(Math.max(b.w, Math.min(MIN_W, vw)), vw)
    const h = Math.min(Math.max(b.h, Math.min(MIN_H, vh)), vh)
    return { w, h, x: Math.min(Math.max(b.x, 0), vw - w), y: Math.min(Math.max(b.y, 0), vh - h) }
  }, [])

  // correct for any transformed ancestor that offsets position:fixed
  useEffect(() => {
    if (!box || !ref.current) return
    const r = ref.current.getBoundingClientRect()
    const dx = r.left - box.x, dy = r.top - box.y
    if (Math.abs(dx) > 0.5 || Math.abs(dy) > 0.5) { fix.current.dx += dx; fix.current.dy += dy; setBox({ ...box }) }
  }, [box])

  useEffect(() => {
    if (!box) return
    const onR = () => setBox((b) => b && clamp(b))
    window.addEventListener('resize', onR)
    return () => window.removeEventListener('resize', onR)
  }, [!!box, clamp])

  const toggle = () => {
    if (!unlocked && !box) {
      const r = ref.current.getBoundingClientRect()
      setSpacer(r.height)
      fix.current = { dx: 0, dy: 0 }
      setBox({ x: r.left, y: r.top, w: r.width, h: r.height })
    }
    setUnlocked((u) => !u)
  }
  const reset = () => { setBox(null); setUnlocked(false); setSpacer(0) }

  const start = (mode) => (e) => {
    if (!unlocked || !box || e.button > 0) return
    if (mode === 'move' && e.target.closest('a,button')) return
    e.preventDefault()
    const sx = e.clientX, sy = e.clientY, b0 = box
    setBusy(true)
    const move = (ev) => {
      const ddx = ev.clientX - sx, ddy = ev.clientY - sy
      if (mode === 'move') return setBox(clamp({ ...b0, x: b0.x + ddx, y: b0.y + ddy }))
      const vw = window.innerWidth, vh = window.innerHeight
      let { x, y, w, h } = b0
      if (mode.includes('e')) w = Math.min(Math.max(b0.w + ddx, MIN_W), vw - x)
      if (mode.includes('s')) h = Math.min(Math.max(b0.h + ddy, MIN_H), vh - y)
      if (mode.includes('w')) { const nx = Math.min(Math.max(b0.x + ddx, 0), b0.x + b0.w - MIN_W); w = b0.w + b0.x - nx; x = nx }
      if (mode.includes('n')) { const ny = Math.min(Math.max(b0.y + ddy, 0), b0.y + b0.h - MIN_H); h = b0.h + b0.y - ny; y = ny }
      setBox({ x, y, w, h })
    }
    const up = () => { setBusy(false); window.removeEventListener('pointermove', move); window.removeEventListener('pointerup', up); window.removeEventListener('pointercancel', up) }
    window.addEventListener('pointermove', move)
    window.addEventListener('pointerup', up)
    window.addEventListener('pointercancel', up)
  }

  const style = box ? { position: 'fixed', left: box.x - fix.current.dx, top: box.y - fix.current.dy, width: box.w, height: box.h } : undefined
  const cls = `hero-chat rise${box ? ' is-float' : ''}${unlocked ? ' is-unlocked' : ''}${busy ? ' is-busy' : ''}`

  return (
    <>
      {box && <div className="hero-chat-spacer" style={{ height: spacer }} aria-hidden="true" />}
      <aside ref={ref} className={cls} style={style} aria-label="Live Market chat">
        <div className="hero-chat-bar" onPointerDown={start('move')}>
          <span className="hero-chat-live"><i />Live now · Market chat</span>
          <span className="hero-chat-tools">
            <button type="button" className="hero-chat-lock" onClick={toggle} onDoubleClick={reset} aria-label={unlocked ? 'Lock chat' : 'Unlock chat'} aria-pressed={unlocked}><Lock open={unlocked} /></button>
            <a href={`https://xat.com/${XAT_GROUP}`} target="_blank" rel="noopener noreferrer">Open ↗</a>
          </span>
        </div>
        <div className="hero-chat-frame">
          {show && <iframe src={SRC} title="Market xat chat" loading="lazy" allow="autoplay; clipboard-write" referrerPolicy="no-referrer-when-downgrade" />}
          {busy && <div className="hero-chat-shield" />}
        </div>
        <p className="hero-chat-note">Click the <b>small arrow</b> in the user list to try <b>GIFs, smileys</b> and more.</p>
        {unlocked && EDGES.map((d) => <span key={d} className={`hc-h hc-${d}`} onPointerDown={start(d)} />)}
      </aside>
    </>
  )
}
