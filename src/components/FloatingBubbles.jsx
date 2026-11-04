const bubbles = [
  { href: 'https://tv.xatmarket.com', label: 'XatCast TV', sub: 'Watch live', icon: (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="6" width="18" height="13" rx="2.5"/><path d="M8 2.5 12 6l4-3.5"/><path d="m10.5 10 4 2.5-4 2.5z" fill="currentColor"/></svg>) },
  { href: 'https://maps.xatmarket.com', label: 'XatMaps', sub: 'Live world map', icon: (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M9 4 3 6.5v13.5L9 17.5l6 2.5 6-2.5V4l-6 2.5z"/><path d="M9 4v13.5M15 6.5V20"/></svg>) },
]

export default function FloatingBubbles() {
  return (
    <nav aria-label="Xat Market live projects" className="fbubbles">
      {bubbles.map((b) => (
        <a key={b.href} href={b.href} target="_blank" rel="noopener" className="fbubble" aria-label={`${b.label} — ${b.sub} (opens in a new tab)`}>
          <span className="fbubble-ico">{b.icon}</span>
          <span className="fbubble-txt"><strong>{b.label}</strong><small>{b.sub}</small></span>
        </a>
      ))}
    </nav>
  )
}
