/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '4rem',
        xl: '5rem',
        '2xl': '6rem'
      }
    },
    fontFamily: {
      sans: ['Roboto', 'sans-serif'],
      serif: ['Oswald', 'serif']
    },
    extend: {
      colors: {
        primary: '#222831',
        secondary: '#393E46',
        tertiary: '#00ADB5',
        quaternary: '#EEEEEE'
      }
    }
  },
  plugins: []
}
