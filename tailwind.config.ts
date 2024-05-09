import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        pink: {
          light: '#FFD6E8',
          DEFAULT: '#FFB8D2',
          dark: '#FF8FBA',
        },
        mint: {
          light: '#D3FFEE',
          DEFAULT: '#A1FFD8',
          dark: '#6EFFC5',
        },
        blue: {
          light: '#C4D9FF',
          DEFAULT: '#96BFFF',
          dark: '#658FFF',
        },
        purple: {
          light: '#E2D1FF',
          DEFAULT: '#BC96FF',
          dark: '#8C5BFF',
        },
        red: '#FF0000',
      },
      boxShadow: {
        pink: '0px 4px 6px rgba(255, 184, 210, 0.75)',
        mint: '0px 4px 6px rgba(161, 255, 216, 0.75)',
        blue: '0px 4px 6px rgba(150, 191, 255, 0.75)',
        purple: '0px 4px 6px rgba(188, 150, 255, 0.75)',
      },
      backgroundImage: {
        login: "url('/login_background.png')",
      },
    },
  },
  plugins: [],
};
export default config;
