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
        invert: {
          css: {
            '--tw-prose-body': 'rgb(203 213 225)',
            '--tw-prose-headings': 'rgb(241 245 249)',
            '--tw-prose-links': 'rgb(96 165 250)',
            '--tw-prose-bold': 'rgb(241 245 249)',
            '--tw-prose-code': 'rgb(203 213 225)',
            '--tw-prose-pre-bg': 'rgb(15 23 42)',
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