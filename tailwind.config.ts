import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./client/**/*.{js,ts,jsx,tsx,mdx}', './app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        primary: '#4F9D69',
      },
      fontFamily: {
        koulen: 'var(--font-koulen)',
        roboto: 'var(--font-roboto)',
      },
    },
  },
  plugins: [],
}
export default config
