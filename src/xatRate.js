// Single source for the USD → xats value used by the Xat value calculator (Advertising) and LeoneBot pricing.
export const packs = [
  { usd: 50, xats: 8000, days: 480 },
  { usd: 100, xats: 16500, days: 990 },
  { usd: 200, xats: 33000, days: 1980 },
]
export const RATE = 14 // xats per subscriber day
export const DEFAULT_PACK = 2 // the calculator opens on the $200 pack
export const packValue = (p) => p.xats + p.days * RATE
export const xatsPerUsd = (n = DEFAULT_PACK) => packValue(packs[n]) / packs[n].usd
export const usdToXats = (usd, n = DEFAULT_PACK) => Math.round(usd * xatsPerUsd(n))
export const fmt = (n) => Math.round(n).toLocaleString('en-US')
