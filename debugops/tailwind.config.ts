import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: 'rgb(203 213 225)',
            a: {
              color: 'rgb(96 165 250)',
              '&:hover': {
                color: 'rgb(147 197 253)',
              },
            },
            h1: {
              color: 'rgb(241 245 249)',
            },
            h2: {
              color: 'rgb(241 245 249)',
            },
            h3: {
              color: 'rgb(241 245 249)',
            },
            h4: {
              color: 'rgb(241 245 249)',
            },
            strong: {
              color: 'rgb(241 245 249)',
            },
            code: {
              color: 'rgb(203 213 225)',
              backgroundColor: 'rgb(15 23 42)',
              padding: '0.25rem 0.5rem',
              borderRadius: '0.25rem',
              fontWeight: '400',
            },
            'code::before': {
              content: '""',
            },
            'code::after': {
              content: '""',
            },
            pre: {
              backgroundColor: 'rgb(15 23 42)',
              color: 'rgb(203 213 225)',
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
export default config