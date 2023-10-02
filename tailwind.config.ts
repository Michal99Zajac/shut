import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./client/**/*.{js,ts,jsx,tsx,mdx}', './app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        primary: 'rgba(79, 157, 105)',
        'primary-50': 'rgba(79, 157, 105, 0.05)',
        'primary-100': 'rgba(79, 157, 105, 0.12)',
        'primary-200': 'rgba(79, 157, 105, 0.2)',
        'primary-300': 'rgba(79, 157, 105, 0.3)',
        'primary-400': 'rgba(79, 157, 105, 0.4)',
        'primary-500': 'rgba(79, 157, 105, 0.5)',
      },
      fontFamily: {
        koulen: 'var(--font-koulen)',
        roboto: 'var(--font-roboto)',
      },
      gridTemplateColumns: {
        dashboard: 'minmax(200px, 400px) 1fr',
      },
    },
  },
  plugins: [],
}
export default config
