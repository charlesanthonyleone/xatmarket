const v = (n) => `rgb(var(--${n}) / <alpha-value>)`
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: { extend: {
    colors: { ink: '#0b0f2e', ink2: '#1a1f5c', cream: v('fg'), mist: v('mute'), panel: v('panel'), panel2: v('panel2'), gold: v('acc'), goldsoft: v('acc2'), warn: '#e31747',
      coral: '#E9C99A', sun: '#F2DDB4', mint: '#7FE6DA', violet: '#9FB8D8', xline: 'rgba(18,22,58,.12)' },
    fontFamily: { display: ['"Cormorant Garamond"', 'Georgia', 'system-ui', 'sans-serif'], sans: ['Manrope', 'system-ui', 'sans-serif'], mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'], btn: ['Manrope', 'sans-serif'] },
  } },
}
