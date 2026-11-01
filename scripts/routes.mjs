// Copy index.html to every route so deep links return 200 on GitHub Pages.
import fs from 'fs'
const routes = ['advertising','community-setup','community-revival','xatbot-suite','get-paid','ideas','ideas/xatcast','ideas/xatvision','ideas/multi-chatting','ideas/xatcodex','ideas/xat-overlay']
const html = fs.readFileSync('dist/index.html')
for (const r of routes) { fs.mkdirSync(`dist/${r}`, { recursive: true }); fs.writeFileSync(`dist/${r}/index.html`, html) }
fs.writeFileSync('dist/404.html', html)
// Old URL: /leonebot/ → /xatbot-suite/
fs.mkdirSync('dist/leonebot', { recursive: true })
fs.writeFileSync('dist/leonebot/index.html', '<!doctype html><meta charset="utf-8"><title>XatBot Suite</title><link rel="canonical" href="/xatbot-suite/"><meta http-equiv="refresh" content="0; url=/xatbot-suite/"><script>location.replace("/xatbot-suite/"+location.search+location.hash)</script><a href="/xatbot-suite/">XatBot Suite</a>')
