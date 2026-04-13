/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      fontFamily: {
        titillium: ['"Titillium Web"', 'sans-serif'],
      },
      colors: {
        primary: '#0C8495',
      },
    },
  },
  plugins: [],
}
