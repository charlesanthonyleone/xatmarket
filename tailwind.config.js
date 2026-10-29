const v = (n) => `rgb(var(--${n}) / <alpha-value>)`
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: { extend: {
    colors: { ink: '#0b0f2e', ink2: '#1a1f5c', cream: v('fg'), mist: v('mute'), panel: v('panel'), panel2: v('panel2'), gold: v('acc'), goldsoft: v('acc2'), warn: '#e31747',
      coral: '#FF4F7B', sun: '#FFC94D', mint: '#2EF2C2', violet: '#8B7BFF', xline: 'rgba(18,22,58,.12)' },
    fontFamily: { display: ['"Bricolage Grotesque"', 'system-ui', 'sans-serif'], sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'], mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'], btn: ['"Bricolage Grotesque"', 'sans-serif'] },
  } },
}
