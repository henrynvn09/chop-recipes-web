/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'],
        'roboto': ['Roboto', 'sans-serif']
      },
      width: {
        '1/3': '33.333333%',
      },
      height: {
        '1/2': '50%',
        '1/4screen': '60vh',
      },
      spacing: {
        '1/2': '50%',
        '10vh': '10vh',
        '15vh': '15vh',
      },
      colors: {
        'custom-red': '#FF1A1A',
        'custom-grey':'#FAFAFA',
        'custom-green': '#dfd9c5',
        'custom-darkgreen':'#CCCC99',
      },
      screens: {
        '3xl': '1930px',
        '4xl': '2560px',
      },
    },
  },
  variants: {},
  plugins: [],
};