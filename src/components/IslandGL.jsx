import { useEffect, useRef } from 'react'
/* XatMarket island — one moonlit photograph, one shader (technique from IntelOasis OasisGL).
   The photo supplies sky, Milky Way, palms, lagoon and surf. The shader adds only motion:
   rolling swell + surf wash on the photo's own water, refraction ripples, a slowly turning sky,
   breezes that bend the photo's own fronds, meteors/comets, an object that falls into the sea
   with a real ring ripple, bioluminescent sparks in the foam, film grain. A 2D overlay twinkles
   the photo's own brightest stars. Mouse = subtle depth parallax (sky moves more than shore). */
const BASE = import.meta.env.BASE_URL + 'island/'
const VS = `attribute vec2 p;varying vec2 v;void main(){v=p*.5+.5;v.y=1.-v.y;gl_Position=vec4(p,0,1);}`
const FS = `precision highp float;varying vec2 v;
uniform sampler2D uP,uS,uL,uWd,uF,uMn;uniform vec3 uMoon;uniform vec4 uG;uniform vec2 uRes,uOff,uSize,uPar;uniform float uT,uHz,uLakeOn,uRot,uDpr,uDim;uniform vec2 uPole;uniform vec4 uM[7],uMD[7],uR;
float h(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
float n(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(h(i),h(i+vec2(1,0)),f.x),mix(h(i+vec2(0,1)),h(i+vec2(1,1)),f.x),f.y);}
vec2 rot(vec2 u,float a){vec2 asp=vec2(uSize.x/uSize.y,1.);vec2 d=(u-uPole)*asp;float c=cos(a),s=sin(a);return uPole+vec2(c*d.x-s*d.y,s*d.x+c*d.y)/asp;}
vec3 met(vec2 px,float mk){vec3 c=vec3(0.);
  for(int i=0;i<7;i++){vec4 m=uM[i];if(m.w<=0.)continue;vec4 d=uMD[i];
    vec2 hp=uOff+m.xy*uSize;vec2 r=px-hp;vec2 dir=normalize(d.xy+1e-5);
    float along=-dot(r,dir);float perp=abs(r.x*dir.y-r.y*dir.x);float sz=max(m.z,.35);
    float head=exp(-dot(r,r)/(sz*sz*1.2));
    float tl=max(d.z,1.);float tw=sz*(d.w>.5?1.6:.55)*(1.+along/tl*(d.w>.5?2.5:.8));
    float tail=along>0.?exp(-along/tl*2.2)*exp(-perp*perp/(tw*tw))*(d.w>.5?.55:.8):0.;
    float coma=d.w>.5?exp(-length(r)/(sz*4.))*.18:0.;
    vec3 hc=d.w>1.5?vec3(1.,.9,.78):vec3(.86,.96,1.);
    c+=(hc*head*1.4+vec3(.75,.9,1.)*tail+vec3(.6,.9,1.)*coma)*m.w*(i==6?1.:mk);}
  return c;}
void main(){vec2 px=v*uRes;vec2 u=(px-uOff)/uSize;float t=uT;
  float sky=texture2D(uS,u).r;float lake=uLakeOn*texture2D(uL,u).r;float foam=texture2D(uF,u).r;
  vec2 uu=u;float rip=0.;vec3 wSurf=vec3(0.);
  float depth=clamp((u.y-uHz)/(1.-uHz),0.,1.);           /* 0 at horizon, 1 at bottom: perspective */
  if(lake>.01){
    /* swell: long crests travelling toward the beach, compressed toward the horizon */
    float k=mix(260.,55.,sqrt(depth));float ph=u.y*k-t*1.25+sin(u.x*7.+t*.2)*1.6;
    float sw=sin(ph)+.45*sin(ph*1.9+u.x*11.-t*.6);
    uu.y+=sw*.0011*(.25+depth*1.4)*lake;
    /* surf wash: the foam band slides up the sand and drains back */
    
    /* fine refraction chop */
    vec2 q=u*vec2(70.,170.);float a1=n(q+vec2(t*.35,t*.9)),a2=n(q*1.9-vec2(t*.5,t*1.3)),a3=n(q*.5+vec2(-t*.2,t*.5));
    uu+=vec2(a1-a2,(a2+a3-1.))*.0028*(.3+depth)*lake;}
  if(lake>.01&&uR.w>0.){float age=t-uR.z;vec2 dd=(u-uR.xy)*uSize*vec2(1.,3.4);float dr=length(dd);float R=uR.w*(5.+age*24.);
    float env=exp(-age*.7)*smoothstep(0.,.15,age)*exp(-pow((dr-R)/(uR.w*9.+age*10.),2.));
    float w=sin((dr-R)*.55/max(uR.w*.35,.6))*env;uu+=normalize(dd+1e-4)*vec2(1.,1./3.4)*w*uR.w*4./uSize;rip=w*lake;}
  if(uG.y>.001){float wv=texture2D(uWd,u).r;
    if(wv>.003){float fl=.55+.45*sin(t*2.3+u.x*23.+u.y*17.)+.35*(n(u*vec2(40.,30.)+vec2(t*3.*uG.x,t))-.5);
      float bend=uG.y*wv*wv*(.7+.5*fl);uu+=vec2(uG.x*bend*7.,bend*2.+uG.y*wv*sin(t*5.+u.x*61.)*.7)/uSize;}
    if(lake>.01){float band=exp(-pow((u.x-uG.z)/.1,2.))*uG.y;vec2 q2=u*vec2(260.,520.)+vec2(-t*6.*uG.x,t*.8);
      uu+=vec2(n(q2)-n(q2+vec2(3.1,7.7)),n(q2*1.7)-.5)*band*.0026*lake;}}
  /* breaking surf: each set builds (crest lifts & steepens), pitches and crashes, then the foam sheet
     rushes up the sand fast and drains back slowly. Arrives obliquely: phase lags along the beach. */
  {vec2 e=vec2(14.,10.)/uSize;float shore=0.;
   for(int i=0;i<8;i++){float a=float(i)*.785;shore+=texture2D(uL,u+vec2(cos(a),sin(a))*e*2.2).r;}
   shore=shore/8.;float zone=smoothstep(.02,.35,shore)*smoothstep(.25,.75,depth)*(1.-sky)*uLakeOn;
   if(zone>.001){float P=8.5;float ph=(t+u.x*6.5+n(vec2(u.x*4.,floor(t/P)))*1.2)/P;float cyc=fract(ph);float sid=floor(ph);
     float big=.7+.3*h(vec2(sid,3.));
     float build=smoothstep(.0,.32,cyc)*(1.-smoothstep(.32,.4,cyc));          /* crest rises */
     float rush=smoothstep(.34,.5,cyc);float back=1.-smoothstep(.5,1.,cyc);   /* fast run-up, slow backwash */
     float run=rush*back*back;float churn=smoothstep(.33,.42,cyc)*(1.-smoothstep(.42,.75,cyc));
     float tilt=build*build;
     /* swash: sample the photo's foam & water from further offshore so the sheet slides up the sand */
     uu+=vec2(-.0035,-.0105)*run*big*zone;
     /* the crest: pull water upward (lift) then pitch forward */
     uu+=vec2(0.,.0026)*tilt*big*zone*smoothstep(.15,.5,shore);
     /* turbulent foam boil while it crashes */
     vec2 fq=u*vec2(520.,900.)+vec2(t*.3,-t*1.6);uu+=vec2(n(fq)-.5,n(fq+7.3)-.5)*.0016*churn*zone;
     wSurf=vec3(churn*zone*big,run*zone*big,tilt*zone);}}
  /* idle breeze: fronds never quite still */
  {float wv=texture2D(uWd,u).r;if(wv>.003){float s=sin(t*.9+u.x*9.)*.6+sin(t*1.7+u.y*13.)*.4;uu+=vec2(s*2.2,s*.6)*wv*wv/uSize;}}
  vec3 col=texture2D(uP,uu).rgb;
  /* sky: slow rotation + extra parallax (deeper than the shore) */
  if(sky>.01){vec2 ru=rot(u,uRot)+uPar/uSize;float sk2=texture2D(uS,ru).r;float k=smoothstep(.8,1.,sky)*smoothstep(.8,1.,sk2)*smoothstep(uHz-.01,uHz-.08,u.y);col=mix(col,texture2D(uP,ru).rgb,k);}
  {float fo2=texture2D(uF,uu).r;float l2=dot(col,vec3(.3,.55,.15));
   col+=vec3(.82,.92,.95)*wSurf.x*smoothstep(.12,.45,l2)*(.25+fo2*.5)*.32;            /* white water at impact */
   col*=1.+wSurf.z*.06;}
  /* HD moon: real lunar disc replaces the soft photo disc, rotates with the sky; photo glow kept */
  if(sky>.01&&uMoon.z>0.){vec2 ru=rot(u,uRot)+uPar/uSize;vec2 dm=(ru-uMoon.xy)*uSize;float rp=uMoon.z*uSize.x;float dd=length(dm)/rp;
    if(dd<1.4){float disc=1.-smoothstep(1.-.9/rp,1.+.4/rp,dd);vec3 mt=texture2D(uMn,dm/rp*.5*.985+.5).rgb;
      float limb=.88+.12*sqrt(max(0.,1.-dd*dd));vec3 mc=(vec3(.74,.77,.82)+vec3(.42,.42,.42)*pow(mt,vec3(.9)))*limb*vec3(1.,1.,1.03);
      /* hide the photo's blown-out rim: take glow from just outside it, plus a soft natural halo */
      vec2 dir=dm/max(length(dm),1e-3);vec3 gw=texture2D(uP,(uMoon.xy+dir*rp*1.32/uSize)-uPar/uSize*0.).rgb;
      float rim=smoothstep(1.32,1.,dd);col=mix(col,gw*.92+vec3(.03,.035,.045)*exp(-(dd-1.)*9.),rim*smoothstep(.8,1.,sky));
      col=mix(col,mc,disc*smoothstep(.8,1.,sky));}}
  if(lake>.01){
    float fo=texture2D(uF,uu).r;
    float crest=pow(.5+.5*sin(u.y*mix(260.,55.,sqrt(depth))-t*1.25+sin(u.x*7.+t*.2)*1.6),6.);
    col+=vec3(.75,.9,.95)*crest*.07*depth*lake;
    /* bioluminescent sparks riding the foam */
    float sp=n(u*vec2(900.,500.)+vec2(t*.6,-t*.9));sp=smoothstep(.82,1.,sp)*(.5+.5*sin(t*3.+u.x*80.));
    col+=vec3(.2,.95,1.)*sp*fo*.55+vec3(.05,.55,.6)*fo*(.08+.06*sin(t*.55));
    col*=1.+rip*.5;col+=vec3(.6,.85,.95)*max(rip,0.)*.07;}
  col+=met(px,max(sky,lake*.35));
  if(lake>.01&&uR.w>0.){float age=t-uR.z;vec2 dd=(u-uR.xy)*uSize*vec2(1.,3.4);col+=vec3(.85,1.,1.)*exp(-age*3.)*exp(-dot(dd,dd)/(uR.w*uR.w*55.))*1.6*smoothstep(-.01,.03,age);}
  col*=uDim;
  float g=h(floor(px*uDpr)+fract(t*24.)*91.)-.5;col+=g*.03;
  gl_FragColor=vec4(col,1.);}`
const load = (s) => new Promise((r, j) => { const i = new Image(); i.onload = () => r(i); i.onerror = j; i.src = s })
const glow = () => { const c = document.createElement('canvas'); c.width = c.height = 64; const g = c.getContext('2d'); const r = g.createRadialGradient(32, 32, 0, 32, 32, 32)
  r.addColorStop(0, 'rgba(255,255,255,1)'); r.addColorStop(.12, 'rgba(225,235,255,.55)'); r.addColorStop(.4, 'rgba(190,210,255,.1)'); r.addColorStop(1, 'rgba(0,0,0,0)'); g.fillStyle = r; g.fillRect(0, 0, 64, 64); return c }
const spike = () => { const c = document.createElement('canvas'); c.width = c.height = 128; const g = c.getContext('2d')
  for (const [w, hh] of [[128, 1.2], [1.2, 128]]) { const r = g.createLinearGradient(w > 2 ? 0 : 64, w > 2 ? 64 : 0, w > 2 ? 128 : 64, w > 2 ? 64 : 128); r.addColorStop(0, 'rgba(0,0,0,0)'); r.addColorStop(.5, 'rgba(220,230,255,.8)'); r.addColorStop(1, 'rgba(0,0,0,0)'); g.fillStyle = r; g.fillRect(64 - w / 2, 64 - hh / 2, w, hh) } return c }
const HZ = { land: .646, landm: .601 }

/* variant: 'hero' (full plate, impact + ripples), 'page' (inner-page header), 'bg' (fixed site sky) */
export default function IslandGL({ variant = 'hero' }) {
  const wrap = useRef(null)
  useEffect(() => {
    const hero = variant === 'hero', bg = variant === 'bg', el = wrap.current, cv = el.querySelector('canvas.gl'), ov = el.querySelector('canvas.tw')
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const gl = cv.getContext('webgl', { antialias: false, premultipliedAlpha: false }); const o2 = ov.getContext('2d')
    if (!gl) { el.classList.add('no-gl'); return }
    let alive = true, raf, io, set = {}, mob, W, H, dpr, off, size, img, stars, G, S, lakePts = [], BW = 2560, pole = [-.4, -1.2], hz = .646
    const par = { x: 0, y: 0, tx: 0, ty: 0 }
    const gust = { t0: -99, d: 4, s: 0, dir: 1, next: 4 }
    const sim = { obj: [], next: 1.2, imp: null, impNext: 1.5, rip: [0, 0, -99, 0] }
    const sh = (t, s) => { const x = gl.createShader(t); gl.shaderSource(x, s); gl.compileShader(x); if (!gl.getShaderParameter(x, gl.COMPILE_STATUS)) console.error(gl.getShaderInfoLog(x)); return x }
    const pr = gl.createProgram(); gl.attachShader(pr, sh(gl.VERTEX_SHADER, VS)); gl.attachShader(pr, sh(gl.FRAGMENT_SHADER, FS)); gl.linkProgram(pr); gl.useProgram(pr)
    const b = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, b); gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW)
    const lp = gl.getAttribLocation(pr, 'p'); gl.enableVertexAttribArray(lp); gl.vertexAttribPointer(lp, 2, gl.FLOAT, false, 0, 0)
    const U = (n) => gl.getUniformLocation(pr, n)
    const tex = (i, im) => { const t = gl.createTexture(); gl.activeTexture(gl.TEXTURE0 + i); gl.bindTexture(gl.TEXTURE_2D, t)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, im); return t }
    const setup = async () => {
      const r = el.getBoundingClientRect(); const m = window.innerWidth < 768
      if (m !== mob || !set.p) { mob = m; const k = mob ? 'landm' : 'land'
        const want = Math.min(window.devicePixelRatio || 1, 2) * window.innerWidth * (mob ? 1.9 : 1.1)
        const res = bg ? (mob ? 1440 : 2560) : mob ? (want > 1500 ? 2560 : 1440) : (want > 2700 ? 3840 : 2560)
        const [p, s, l, st, wd, fo, mn] = await Promise.all([load(BASE + k + '-photo-' + res + '.webp'), load(BASE + k + '-sky.png'), load(BASE + k + '-lake.png'), fetch(BASE + k + '-stars.json').then(x => x.json()), load(BASE + k + '-wind.png'), load(BASE + k + '-foam.png'), load(BASE + 'moon-hd.webp')])
        if (!alive) return false; img = p; stars = st; tex(0, p); tex(1, s); tex(2, l); tex(3, wd); tex(4, fo); tex(5, mn); set.p = 1; set.moon = mob ? [.8303, .2419, .0226] : [.7701, .309, .0126]; BW = mob ? 1440 : 2560; hz = HZ[k]; pole = mob ? [.3, 1.5] : [.35, 1.9]
        const c = document.createElement('canvas'); c.width = l.width; c.height = l.height; const g = c.getContext('2d'); g.drawImage(l, 0, 0)
        const dd = g.getImageData(0, 0, c.width, c.height).data; lakePts = []
        for (let y = 0; y < c.height; y += 4) for (let x = 0; x < c.width; x += 4) if (dd[(y * c.width + x) * 4] > 230) lakePts.push([x / c.width, y / c.height]) }
      W = r.width; H = r.height; dpr = Math.min(window.devicePixelRatio || 1, mob ? 1.5 : 2)
      for (const c of [cv, ov]) { c.width = W * dpr; c.height = H * dpr }
      gl.viewport(0, 0, cv.width, cv.height)
      const iw = img.width, ih = img.height
      let s = Math.max(W / iw, H / ih) * (bg ? 1.04 : 1.03); size = [iw * s, ih * s]
      if (hero) off = [(W - size[0]) * (mob ? .5 : .35), H - size[1]]
      else if (bg) { s = Math.max(W / iw, H / (ih * hz * 1.02)); size = [iw * s, ih * s]; off = [(W - size[0]) * .5, H - size[1] * hz * 1.02 - 0] }
      else { s = Math.max(W / iw, H / (ih * Math.min(1, hz + .2))); size = [iw * s, ih * s]; off = [(W - size[0]) * .4, H - size[1] * Math.min(1, hz + .2)] }
      for (const [n, i] of [['uP', 0], ['uS', 1], ['uL', 2], ['uWd', 3], ['uF', 4], ['uMn', 5]]) gl.uniform1i(U(n), i)
      gl.uniform3f(U('uMoon'), ...set.moon)
      gl.uniform2f(U('uRes'), W, H); gl.uniform2f(U('uOff'), off[0], off[1]); gl.uniform2f(U('uSize'), size[0], size[1])
      gl.uniform1f(U('uHz'), hz); gl.uniform1f(U('uLakeOn'), 1); gl.uniform1f(U('uDpr'), dpr); gl.uniform2f(U('uPole'), pole[0], pole[1]); gl.uniform1f(U('uDim'), 1)
      G = G || glow(); S = S || spike(); return true }
    const R = Math.random, vis = () => [Math.max(0, -off[0] / size[0]), Math.min(1, (W - off[0]) / size[0]), Math.max(0, -off[1] / size[1])]
    const step = (t) => {
      const [x0, x1, y0] = vis()
      if (t > sim.next) { sim.next = t + (bg ? 5 : 2.5) + R() * 5; const kind = R() < .62 ? 0 : R() < .7 ? 1 : 2; const dir = R() < .5 ? 1 : -1
        const dur = kind === 1 ? 4 + R() * 4 : kind === 0 ? .5 + R() * 1.1 : 1 + R() * 1.2; const span = (x1 - x0) * (kind === 1 ? .35 + R() * .3 : .2 + R() * .35)
        const xs = x0 + (x1 - x0) * (.1 + R() * .8); const ys = y0 + (hz - y0) * (.06 + R() * .5); const app = R() < .5
        const big = kind === 2 ? 2.2 + R() * 2 : kind === 1 ? 1.4 + R() * 1.6 : .8 + R() * 1.8
        sim.obj.push({ t0: t, dur, kind, a: [xs, ys], b: [xs + dir * span, ys + (R() * .5 + .05) * span * size[0] / size[1] * .35], s0: app ? .35 : big, s1: app ? big : .35, br: kind === 1 ? .55 : .85 + R() * .3 }) }
      if (!sim.imp && t > sim.impNext && hero && lakePts.length) {
        const vp = lakePts.filter(([x, y]) => x > x0 + .06 && x < x1 - .06 && y > hz + .02 && y < hz + .12 && off[1] + y * size[1] < H - 40); const e = vp[Math.floor(R() * vp.length)]
        if (e) { const dir = e[0] > (x0 + x1) / 2 ? 1 : -1; const sx = Math.min(x1 - .03, Math.max(x0 + .03, e[0] - dir * (x1 - x0) * (.5 + R() * .2)))
          sim.imp = { t0: t, dur: location.search.includes('demo') ? 8 : 55 + R() * 8, a: [sx, y0 + (hz - y0) * (.08 + R() * .15)], e, sz: 2.4 + R() * 1.6 } } }
      const im = sim.imp; if (im && t - im.t0 > im.dur) { sim.rip = [im.e[0], im.e[1], t, im.sz]; sim.imp = null; sim.impNext = t + 10 + R() * 12 }
      sim.obj = sim.obj.filter(o => t - o.t0 < o.dur) }
    const M = new Float32Array(28), MD = new Float32Array(28)
    const upload = (t) => { M.fill(0); MD.fill(0); let i = 0
      for (const o of sim.obj) { if (i > 5) break; const p = (t - o.t0) / o.dur, q = o.s0 < o.s1 ? p * p : Math.sqrt(p)
        const x = o.a[0] + (o.b[0] - o.a[0]) * p, y = o.a[1] + (o.b[1] - o.a[1]) * (p * p * .6 + p * .4); const sz = o.s0 + (o.s1 - o.s0) * q
        const vx = (o.b[0] - o.a[0]) * size[0], vy = (o.b[1] - o.a[1]) * size[1] * (1.2 * p + .4); const sp = Math.hypot(vx, vy) / o.dur
        const fade = Math.min(1, p * 6) * Math.min(1, (1 - p) * (o.kind === 1 ? 3 : 5))
        M.set([x, y, sz, o.br * fade * (o.s0 < o.s1 ? .45 + .55 * q : 1 - .55 * q)], i * 4)
        MD.set([vx, vy, (o.kind === 1 ? 70 : o.kind === 2 ? 30 : 16 + sp * .06) * sz, o.kind === 1 ? 1 : o.kind === 2 ? 2 : 0], i * 4); i++ }
      const im = sim.imp; if (im) { const p = (t - im.t0) / im.dur, q = Math.pow(p, 3.2)
        const x = im.a[0] + (im.e[0] - im.a[0]) * p, y = im.a[1] + (im.e[1] - im.a[1]) * (.25 * p + .75 * p * p)
        const vx = (im.e[0] - im.a[0]) * size[0], vy = (im.e[1] - im.a[1]) * size[1] * (.25 + 1.5 * p)
        M.set([x, y, .35 + im.sz * 1.8 * q, Math.min(1, p * 8) * (.35 + .9 * q)], 24); MD.set([vx, vy, 4 + 120 * q, 2], 24) }
      gl.uniform4fv(U('uM'), M); gl.uniform4fv(U('uMD'), MD); gl.uniform4f(U('uR'), ...sim.rip) }
    const onMove = (e) => { par.tx = (e.clientX / window.innerWidth - .5) * 2; par.ty = (e.clientY / window.innerHeight - .5) * 2 }
    if (!reduce && !bg) window.addEventListener('pointermove', onMove, { passive: true })
    const frame = (ms) => {
      if (!alive) return; const t = reduce ? 30 : ms / 1000 + 40
      gl.uniform1f(U('uT'), t); const rot = reduce ? 0 : (t - 40) * .0009 + Math.sin(t * .021) * .006; gl.uniform1f(U('uRot'), rot)
      par.x += (par.tx - par.x) * .04; par.y += (par.ty - par.y) * .04
      gl.uniform2f(U('uPar'), -par.x * 7, -par.y * 4)
      el.style.setProperty('--px', (-par.x * 6).toFixed(2) + 'px'); el.style.setProperty('--py', (-par.y * 3).toFixed(2) + 'px')
      if (!reduce) step(t); upload(t)
      if (!reduce && t > gust.next + 40 && t - gust.t0 > gust.d) { gust.t0 = t; gust.d = 3 + R() * 3; gust.s = .6 + R() * .4; gust.dir = R() < .5 ? -1 : 1; gust.next = t + gust.d + 6 + R() * 8 - 40 }
      { const p = (t - gust.t0) / gust.d, on = p > 0 && p < 1; const [x0, x1] = vis(); const e = on ? Math.pow(Math.sin(Math.PI * p), 1.5) * gust.s * (.85 + .15 * Math.sin(t * 7.3)) : 0
        gl.uniform4f(U('uG'), gust.dir, e, gust.dir > 0 ? x0 + (x1 - x0) * (p * 1.3 - .15) : x1 - (x1 - x0) * (p * 1.3 - .15), 0) }
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
      o2.setTransform(dpr, 0, 0, dpr, 0, 0); o2.clearRect(0, 0, W, H); o2.globalCompositeOperation = 'lighter'
      const asp = size[0] / size[1], cr = Math.cos(rot), sr = Math.sin(rot)
      for (let i = 0; i < stars.length; i++) { const [x, y, m, d] = stars[i]; const dx = (x - pole[0]) * asp, dy = y - pole[1]
        const rx = pole[0] + (cr * dx - sr * dy) / asp, ry = pole[1] + (sr * dx + cr * dy); const sx = off[0] + rx * size[0] - par.x * 7, sy = off[1] + ry * size[1] - par.y * 4
        if (sx < -20 || sy < -20 || sx > W + 20 || sy > H + 20 || ry > hz - .01) continue
        const p = i * 2.399, sc = reduce ? .7 : Math.max(0, .55 + .45 * Math.sin(t * (2.3 + (i % 7) * .9) + p) * Math.sin(t * (5.1 + (i % 5) * 1.7) + p * 1.7) + .25 * Math.sin(t * (11 + i % 9) + p * 3))
        const r = (1.4 + m * 3.2) * (.7 + .6 * sc), lim = d * size[0] / BW
        const rr = Math.min(r, lim); if (rr < .5) continue; o2.globalAlpha = Math.min(1, (.22 + .55 * m) * sc); o2.drawImage(G, sx - rr, sy - rr, rr * 2, rr * 2)
        if (i < 6 && m > .8) { const L = Math.min(lim, (12 + 14 * m) * (.6 + .5 * sc)); o2.globalAlpha = .45 * sc; o2.drawImage(S, sx - L, sy - L, L * 2, L * 2) } }
      raf = reduce ? 0 : requestAnimationFrame(frame) }
    ;(async () => { try { if (!(await setup())) return } catch (e) { el.classList.add('no-gl'); return } el.classList.add('ready'); raf = requestAnimationFrame(frame)
      io = new IntersectionObserver(([e]) => { cancelAnimationFrame(raf); if (e.isIntersecting && !reduce) raf = requestAnimationFrame(frame) }); io.observe(el) })()
    const onVis = () => { cancelAnimationFrame(raf); if (!document.hidden && !reduce && set.p) raf = requestAnimationFrame(frame) }
    document.addEventListener('visibilitychange', onVis)
    let tm; const onR = () => { clearTimeout(tm); tm = setTimeout(async () => { if (await setup()) frame(performance.now()) }, 120) }
    window.addEventListener('resize', onR)
    return () => { alive = false; cancelAnimationFrame(raf); io && io.disconnect(); window.removeEventListener('resize', onR); window.removeEventListener('pointermove', onMove); document.removeEventListener('visibilitychange', onVis) }
  }, [variant])
  return <div ref={wrap} className={`island-gl ig-${variant}`} aria-hidden="true">
    <img className="ig-fallback" alt="" src={`${BASE}land-photo-1280.webp`} />
    <canvas className="gl" /><canvas className="tw" /></div>
}
