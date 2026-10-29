// XatMarket icon set: simple 24px stroke icons (Lucide-style geometry, drawn for XatMarket).
const P = {
  home: <><path d="M3 11.5 12 4l9 7.5" /><path d="M5.5 10v10h13V10" /><path d="M10 20v-5h4v5" /></>,
  grid: <><rect x="3.5" y="3.5" width="7" height="7" rx="2" /><rect x="13.5" y="3.5" width="7" height="7" rx="2" /><rect x="3.5" y="13.5" width="7" height="7" rx="2" /><rect x="13.5" y="13.5" width="7" height="7" rx="3.5" /></>,
  coins: <><ellipse cx="9" cy="7" rx="6" ry="3" /><path d="M3 7v5c0 1.7 2.7 3 6 3s6-1.3 6-3V7" /><path d="M9 15v2c0 1.7 2.7 3 6 3s6-1.3 6-3v-5c0-1.6-2.4-2.9-5.5-3" /></>,
  bulb: <><path d="M9 18h6M10 21h4" /><path d="M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2.1h5c0-.9.4-1.6 1-2.1A6 6 0 0 0 12 3Z" /></>,
  megaphone: <><path d="M3 10v4a1 1 0 0 0 1 1h3l9 5V4L7 9H4a1 1 0 0 0-1 1Z" /><path d="M19.5 9a4 4 0 0 1 0 6" /><path d="M7 15v4.5" /></>,
  wrench: <><path d="M14.5 6.5a4 4 0 0 0 5 5L21 13l-8 8-3-3 8-8-1.5-1.5a4 4 0 0 1-5-5L13 2l2 2-1.5 2.5Z" transform="rotate(0)" /></>,
  build: <><path d="M4 20h16" /><path d="M6 20V9l6-5 6 5v11" /><path d="M10 20v-6h4v6" /><path d="M9 10h6" /></>,
  revive: <><path d="M3 12a9 9 0 0 1 15.5-6.2L21 8" /><path d="M21 3v5h-5" /><path d="M21 12a9 9 0 0 1-15.5 6.2L3 16" /><path d="M3 21v-5h5" /></>,
  trade: <><path d="M7 4 3 8l4 4" /><path d="M3 8h13a4 4 0 0 1 0 8h-1" /><path d="M17 20l4-4-4-4" /><path d="M21 16H8" /></>,
  users: <><circle cx="9" cy="8" r="3.5" /><path d="M2.5 20a6.5 6.5 0 0 1 13 0" /><path d="M16 4.5a3.5 3.5 0 0 1 0 7" /><path d="M18 14a6.5 6.5 0 0 1 3.5 6" /></>,
  shield: <><path d="M12 3 4.5 6v6c0 4.5 3.2 8 7.5 9 4.3-1 7.5-4.5 7.5-9V6L12 3Z" /><path d="m9 12 2 2 4-4" /></>,
  chat: <><path d="M4 5h16a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H9l-5 4V6a1 1 0 0 1 1-1Z" /><path d="M8 10h8M8 13h5" /></>,
  spark: <><path d="M12 2.5 14 10l7.5 2-7.5 2-2 7.5-2-7.5-7.5-2L10 10Z" /></>,
  radio: <><circle cx="12" cy="12" r="2" /><path d="M8 8a5.5 5.5 0 0 0 0 8M16 8a5.5 5.5 0 0 1 0 8" /><path d="M5 5a10 10 0 0 0 0 14M19 5a10 10 0 0 1 0 14" /></>,
  tv: <><rect x="3" y="6" width="18" height="13" rx="2" /><path d="m8 2 4 4 4-4" /><path d="m10 10 5 2.5-5 2.5Z" /></>,
  layers: <><path d="m12 3 9 5-9 5-9-5 9-5Z" /><path d="m3 13 9 5 9-5" /></>,
  code: <><path d="m8 7-5 5 5 5M16 7l5 5-5 5M14 4l-4 16" /></>,
  overlay: <><rect x="3" y="4" width="18" height="13" rx="2" /><rect x="12" y="9" width="7" height="6" rx="1" /><path d="M8 21h8" /></>,
  user: <><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" /></>,
  store: <><path d="M4 9 5.5 4h13L20 9" /><path d="M4 9a2.7 2.7 0 0 0 5.3 0 2.7 2.7 0 0 0 5.4 0A2.7 2.7 0 0 0 20 9" /><path d="M5 11v9h14v-9" /></>,
  calendar: <><rect x="3.5" y="5" width="17" height="15" rx="2" /><path d="M3.5 10h17M8 3v4M16 3v4" /></>,
  help: <><circle cx="12" cy="12" r="9" /><path d="M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.6.3-1 .9-1 1.6v.6M12 17h.01" /></>,
  send: <><path d="M21 3 10 14" /><path d="m21 3-7 18-4-7-7-4Z" /></>,
  star: <><path d="m12 3 2.7 5.6 6.1.8-4.5 4.2 1.1 6L12 16.7 6.6 19.6l1.1-6L3.2 9.4l6.1-.8Z" /></>,
}
export function Ico({ n, className = 'size-5', strokeWidth = 1.9 }) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">{P[n] || P.spark}</svg>
}
// Original XatMarket mark: a chat bubble with a market tag + spark. Not derived from any xat artwork.
export function Mark({ className = 'size-9' }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="xmA" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#FF4F7B" /><stop offset=".55" stopColor="#FF8A3D" /><stop offset="1" stopColor="#FFC94D" /></linearGradient>
      </defs>
      <path d="M8 6h32a6 6 0 0 1 6 6v18a6 6 0 0 1-6 6H22l-10 8v-8H8a6 6 0 0 1-6-6V12a6 6 0 0 1 6-6Z" fill="url(#xmA)" />
      <path d="M14 14l8 8m0-8-8 8" stroke="#0B0F2E" strokeWidth="3.4" strokeLinecap="round" />
      <path d="M27 13h9.5a1.5 1.5 0 0 1 1.5 1.5V24l-8.5 8.5-8-8L30 16Z" fill="#0B0F2E" transform="translate(-1 -1) scale(.95)" />
      <circle cx="33.4" cy="17.4" r="2" fill="#2EF2C2" />
      <path d="M40 2.5l1.2 3.3 3.3 1.2-3.3 1.2L40 11.5l-1.2-3.3-3.3-1.2 3.3-1.2Z" fill="#2EF2C2" />
    </svg>
  )
}
