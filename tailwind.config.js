const v = (n) => `rgb(var(--${n}) / <alpha-value>)`
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: { extend: {
    colors: { ink: '#000044', ink2: '#000088', cream: v('fg'), mist: v('mute'), panel: v('panel'), panel2: v('panel2'), gold: v('acc'), goldsoft: v('acc2'), warn: '#e31717',
      xblue: '#1E90FF', xcyan: '#02A9D2', xgreen: '#00B168', xpurple: '#A717C9', xred: '#FF3636', xyellow: '#F9C931', xnavy: '#000044', xroyal: '#000088', xline: '#d1d2d4', xlink: '#157ffb' },
    fontFamily: { display: ['Raleway', 'Arial', 'sans-serif'], sans: ['Raleway', 'Arial', 'sans-serif'], btn: ['Aldrich', 'Raleway', 'sans-serif'] },
  } },
}
