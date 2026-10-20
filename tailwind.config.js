/** @type {import('tailwindcss').Config} */
const token = (name) => `rgb(var(--${name}) / <alpha-value>)`;

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: token('bg'),
        surface: token('surface'),
        'surface-2': token('surface-2'),
        ink: token('ink'),
        'ink-soft': token('ink-soft'),
        line: token('line'),
        primary: token('primary'),
        'primary-soft': token('primary-soft'),
        'on-primary': token('on-primary'),
        accent: token('accent'),
        'accent-soft': token('accent-soft'),
        success: token('success'),
        'success-soft': token('success-soft'),
        warn: token('warn'),
        'warn-soft': token('warn-soft'),
      },
      fontFamily: {
        sans: ['Nunito', 'Segoe UI', 'Arial', 'sans-serif'],
      },
      // 1rem ekran balandligiga qarab o'sadi (index.css)
      fontSize: {
        meta: ['1.5rem', { lineHeight: '1.3' }],
        body: ['2rem', { lineHeight: '1.35' }],
        lead: ['2.5rem', { lineHeight: '1.25' }],
        title: ['3.5rem', { lineHeight: '1.1' }],
        hero: ['5rem', { lineHeight: '1' }],
      },
      borderRadius: {
        xl2: '1.5rem',
        xl3: '2rem',
      },
      minHeight: { tap: '4rem' },
      minWidth: { tap: '4rem' },
    },
  },
  plugins: [],
};
