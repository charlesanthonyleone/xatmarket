import { useEffect, useRef, useState } from 'react'

export const XAT_GROUP = 'Market'
export const XAT_ID = '5610462'
const SRC = `https://xat.com/embed/chat.php#id=${XAT_ID}&gn=${XAT_GROUP}`

export default function HeroLiveChat() {
  const ref = useRef(null)
  const [show, setShow] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el || !('IntersectionObserver' in window)) { setShow(true); return }
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setShow(true); io.disconnect() } }, { rootMargin: '200px' })
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return (
    <aside ref={ref} className="hero-chat rise" aria-label="Live Market chat">
      <div className="hero-chat-bar">
        <span className="hero-chat-live"><i />Live now · Market chat</span>
        <a href={`https://xat.com/${XAT_GROUP}`} target="_blank" rel="noopener noreferrer">Open ↗</a>
      </div>
      <div className="hero-chat-frame">
        {show && <iframe src={SRC} title="Market xat chat" loading="lazy" allow="autoplay; clipboard-write" referrerPolicy="no-referrer-when-downgrade" />}
      </div>
    </aside>
  )
}
