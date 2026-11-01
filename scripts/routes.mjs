// Copy index.html to every route so deep links return 200 on GitHub Pages.
import fs from 'fs'
const routes = ['advertising','community-setup','community-revival','leonebot','get-paid','ideas','ideas/xatcast','ideas/xatvision','ideas/multi-chatting','ideas/xatcodex','ideas/xat-overlay']
const html = fs.readFileSync('dist/index.html')
for (const r of routes) { fs.mkdirSync(`dist/${r}`, { recursive: true }); fs.writeFileSync(`dist/${r}/index.html`, html) }
fs.writeFileSync('dist/404.html', html)
