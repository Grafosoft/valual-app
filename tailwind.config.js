// tailwind.config.js
import { nextui } from '@nextui-org/react'

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './layout/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      gridTemplateRows: {
       
        '12': 'repeat(12, minmax(0, 1fr))',

      },
      gridRow: {
        'span-11': 'span 11 / span 11',
      }
    
 
    }
  },
  darkMode: 'class',
  plugins: [nextui()]
}