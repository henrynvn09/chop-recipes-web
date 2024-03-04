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
      }
    },
  },
  variants: {},
  plugins: [],
};