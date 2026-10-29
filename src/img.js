export const CHAT = 'https://xat.com/Market'
// A handful of real xat smileys kept as fan touches (public/xat/smw). Everything else is XatMarket's own art.
const B = import.meta.env.BASE_URL + 'xat/'
export const KEEP = ['smile', 'd', 'party', 'love', 'heart', 'music']
export const SM = (n) => `${B}smw/${KEEP.includes(n) ? n : KEEP[n.length % KEEP.length]}.png`
