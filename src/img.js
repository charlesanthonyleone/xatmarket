export const CHAT = 'https://xat.com/Market'
const B = import.meta.env.BASE_URL + 'xat/'
// Real xat assets, downloaded from xat.com into public/xat/
export const SM = (n) => `${B}smw/${n}.png`        // https://xat.com/images/smw/<n>.png
export const AV = (n) => `${B}av/${n}.png`         // https://xat.com/web_gear/chat/av/<n>.png
export const IC = (n) => `${B}img/${n}.svg`        // https://xat.com/content/web/R00259/img/...
export const BG = (n) => `${B}bg/${n}`
export const SMILEYS = ['smile', 'd', 'red', 'angel', 'party', 'love', 'heart', 'nerd', 'music', 'coffee', 'dance', 'hat', 'santa', 'zip', 'flag']
